export class PropertyInterpretation {
        
        public Name: string = string.Empty;
        
        public Value: string = string.Empty;
        
        public SmartView: string = string.Empty;
        
        public TypeName: string = string.Empty;
        
        public AlternateNames: string = string.Empty;
        
        public Comments: string = string.Empty;
        
        private constructor () {
            
        }
        
        ///  <summary>
        ///  Get property information for a first class property using
        ///  Reflection.
        ///  </summary>
        ///  <remarks>
        ///  This is an old interpretation style using Reflection which
        ///  is currently only used by the ExchangeService display in the
        ///  FolderTreeForm.  It would be nice to special case that logic and
        ///  remove this constructor from this class so we don't continue
        ///  to use Reflection.
        ///  </remarks>
        ///  <param name="ownerInstance">An instance of the owner type of the
        ///  property.</param>
        ///  <param name="prop">Property on the ownerInstance which we will
        ///  pull type and value information from.</param>
        public constructor (ownerInstance: Object, propInfo: PropertyInfo) {
            this.Name = PropertyInterpretation.GetPropertyName(propInfo);
            this.Value = PropertyInterpretation.GetPropertyValue(ownerInstance, propInfo, /* out */this.TypeName);
        }
        
        ///  <summary>
        ///  Get property information for a schema property or extended property
        ///  using a ServiceObject and a PropertyDefinitionBase.
        ///  </summary>
        ///  <param name="owner">The ServiceObject whose owns the property to interpret.</param>
        ///  <param name="propDef">Property definition used to get type and value information
        ///  from.</param>
        public constructor (owner: ServiceObject, propDef: PropertyDefinitionBase) {
            this.Name = PropertyInterpretation.GetPropertyName(propDef);
            this.Value = PropertyInterpretation.GetPropertyValue(owner, propDef, /* out */this.TypeName);
            this.SmartView = PropertyInterpretation.GetSmartView(owner, propDef);
            let exPropDef: ExtendedPropertyDefinition = (<ExtendedPropertyDefinition>(propDef));
            if ((exPropDef != null)) {
                let propInfo: KnownExtendedPropertyInfo? = KnownExtendedProperties.Instance().GetKnownExtendedPropertyInfo(exPropDef);
                if (propInfo.HasValue) {
                    this.AlternateNames = PropertyInterpretation.GetAlternateNames(propInfo.Value);
                    this.Comments = PropertyInterpretation.GetComments(propInfo.Value);
                }
                
            }
            
        }
        
        public ToXML(xmlDoc: XmlDocument): XmlNode {
            let property: XmlNode = xmlDoc.CreateNode(XmlNodeType.Element, "Property", "");
            let propName: XmlNode = xmlDoc.CreateNode(XmlNodeType.Element, "PropertyName", "");
            propName.InnerText = this.Name;
            property.AppendChild(propName);
            let propType: XmlNode = xmlDoc.CreateNode(XmlNodeType.Element, "PropertyType", "");
            propType.InnerText = this.TypeName;
            property.AppendChild(propType);
            if ((this.Value.Length > 0)) {
                let propValue: XmlNode = xmlDoc.CreateNode(XmlNodeType.Element, "PropertyValue", "");
                let propValueData: XmlNode = xmlDoc.CreateNode(XmlNodeType.CDATA, "", "");
                propValueData.InnerText = this.Value;
                propValue.AppendChild(propValueData);
                property.AppendChild(propValue);
            }
            
            if ((this.SmartView.Length > 0)) {
                let propSmartView: XmlNode = xmlDoc.CreateNode(XmlNodeType.Element, "SmartView", "");
                propSmartView.InnerText = this.SmartView;
                property.AppendChild(propSmartView);
            }
            
            if ((this.AlternateNames.Length > 0)) {
                let propKnownNames: XmlNode = xmlDoc.CreateNode(XmlNodeType.Element, "KnownNames", "");
                propKnownNames.InnerText = this.AlternateNames;
                property.AppendChild(propKnownNames);
            }
            
            if ((this.Comments.Length > 0)) {
                let propComments: XmlNode = xmlDoc.CreateNode(XmlNodeType.Element, "Comments", "");
                propComments.InnerText = this.Comments;
                property.AppendChild(propComments);
            }
            
            return property;
        }
        
        ///  <summary>
        ///  Return text to describe the property name of a FirstClass property.
        ///  </summary>
        ///  <param name="prop">The PropertyInfo used to formulate the name.</param>
        ///  <returns>The name to be displayed in EWSEditor for this property.</returns>
        public static GetPropertyName(prop: PropertyInfo): string {
            return prop.Name;
        }
        
        ///  <summary>
        ///  Return text to describe a PropertyDefinitionBase object, whether a
        ///  PropertyDefinition or ExtendedPropertyDefinition.  If a PropertyDefintion
        ///  return the Name.  If an ExtendedPropertyDefinition, call use the same
        ///  logic in GetPropertyName(ExtendedPropertyDefintion)
        ///  </summary>
        ///  <param name="exPropDef">Property defintion to examine</param>
        ///  <returns>
        ///  Name for a PropertyDefinition.  See the GetPropertyName() overloads
        ///  for ExtendedPropertyDefinition format.
        ///  </returns>
        public static GetPropertyName(propDefBase: PropertyDefinitionBase): string {
            if ((propDefBase == null)) {
                return null;
            }
            
            let exPropDef: ExtendedPropertyDefinition;
            let propDef: PropertyDefinition;
            if ((null != (<ExtendedPropertyDefinition>(propDefBase)))) {
                return PropertyInterpretation.GetPropertyName(exPropDef);
            }
            else if ((null != (<PropertyDefinition>(propDefBase)))) {
                return (<PropertyDefinition>(propDef)).Name;
            }
            
            return propDefBase.ToString();
        }
        
        ///  <summary>
        ///  Return text to describe the property name of an 
        ///  ExtendedPropertyDefiniton based on the type of MAPI property defined.
        ///  <remarks>
        ///  This is *not* the same as a "well known" name.  This is the name 
        ///  of the raw property definition to be displayed along side any 
        ///  other, more descriptive names.
        ///  </remarks>
        ///  </summary>
        ///  <param name="exPropDef">Property defintion to examine</param>
        ///  <returns>
        ///  PidTags display as - "Tag: 0x0000"
        ///  PidLids display as - "Id: 0x0000 PropSet: [known set name or GUID]"
        ///  PidNames display as - "Name: 0x0000 PropSet: [known set name or GUID]"
        ///  </returns>
        public static GetPropertyName(exPropDef: ExtendedPropertyDefinition): string {
            let name: string = string.Empty;
            if ((exPropDef.Tag != null)) {
                name = string.Format(System.Globalization.CultureInfo.CurrentCulture, "[Tag:] 0x{0}, 0n{1}", Convert.ToString(Convert.ToInt32(exPropDef.Tag), 16), Convert.ToString(exPropDef.Tag));
            }
            else if ((exPropDef.Name != null)) {
                if ((exPropDef.PropertySetId != null)) {
                    name = string.Format(System.Globalization.CultureInfo.CurrentCulture, "[Name:] {0} 
[PropSet:] {1}", exPropDef.Name, exPropDef.PropertySetId.ToString());
                }
                else {
                    name = string.Format(System.Globalization.CultureInfo.CurrentCulture, "[Name:] {0} 
[PropSet:] {1}", exPropDef.Name, exPropDef.PropertySet.ToString());
                }
                
            }
            else if ((exPropDef.PropertySetId != null)) {
                name = string.Format(System.Globalization.CultureInfo.CurrentCulture, "[PropId:] 0x{0}, 0n{1} 
[PropSet:] {2}", Convert.ToString(Convert.ToInt32(exPropDef.Id), 16), Convert.ToString(exPropDef.Id), exPropDef.PropertySetId.ToString());
            }
            else {
                name = string.Format(System.Globalization.CultureInfo.CurrentCulture, "[PropId:] 0x{0}, 0n{1} 
[PropSet:] {2}", Convert.ToString(Convert.ToInt32(exPropDef.Id), 16), Convert.ToString(exPropDef.Id), exPropDef.PropertySet.ToString());
            }
            
            return name;
        }
        
        public static GetPropertyType(propDef: PropertyDefinitionBase): string {
            let exPropDef: ExtendedPropertyDefinition = (<ExtendedPropertyDefinition>(propDef));
            if ((exPropDef != null)) {
                return PropertyInterpretation.GetPropertyType(exPropDef);
            }
            
            return propDef.GetType().Name;
        }
        
        ///  <summary>
        ///  Return the MapiType enumeration name of the ExtendedPropertyDefintion.
        ///  </summary>
        ///  <param name="exPropDef">Property defintion to examine</param>
        ///  <returns>
        ///  The name of the specified MapiType for the given exPropDef
        ///  </returns>
        public static GetPropertyType(exPropDef: ExtendedPropertyDefinition): string {
            return exPropDef.MapiType.ToString();
        }
        
        public static GetPropertyValue(exProp: ExtendedProperty): string {
            switch (exProp.PropertyDefinition.MapiType) {
                case MapiPropertyType.ApplicationTimeArray:
                case MapiPropertyType.BinaryArray:
                case MapiPropertyType.CLSIDArray:
                case MapiPropertyType.CurrencyArray:
                case MapiPropertyType.DoubleArray:
                case MapiPropertyType.FloatArray:
                case MapiPropertyType.IntegerArray:
                case MapiPropertyType.LongArray:
                case MapiPropertyType.ObjectArray:
                case MapiPropertyType.ShortArray:
                case MapiPropertyType.StringArray:
                case MapiPropertyType.SystemTimeArray:
                    if ((exProp.Value instanceof  string)) {
                        return (<string>(exProp.Value));
                    }
                    else if ((exProp.Value instanceof  string[])) {
                        let propValues: string = string.Empty;
                        let values: string[] = (<string[]>(exProp.Value));
                        for (let propValue: string in values) {
                            propValues = string.Format(System.Globalization.CultureInfo.CurrentCulture, "{0}
{1}", propValues, propValue);
                        }
                        
                        return propValues;
                    }
                    
                    break;
            }
            
            return exProp.Value.ToString();
        }
        
        ///  <summary>
        ///  Return text representation of a property value.  Some property types have
        ///  specialized logic, if so then dispatch to the appropriate method for
        ///  translation.
        ///  </summary>
        ///  <param name="ownerInstance">Property owner instance to pull the value from.</param>
        ///  <param name="propInfo">Property to pull from the owner</param>
        ///  <returns>
        ///  Text representation of a property value.
        ///  </returns>
        public static GetPropertyValue(ownerInstance: Object, propInfo: PropertyInfo): string {
            let dummy: string;
            return PropertyInterpretation.GetPropertyValue(ownerInstance, propInfo, /* out */dummy);
        }
        
        ///  <summary>
        ///  Return text representation of a property value.  Some property types have
        ///  specialized logic, if so then dispatch to the appropriate method for
        ///  translation.  Also return the type name of the property.
        ///  </summary>
        ///  <param name="ownerInstance">Property owner instance to pull the value from.</param>
        ///  <param name="propInfo">Property to pull from the owner</param>
        ///  <param name="typeName">Text representing the type of the property.</param>
        ///  <returns>
        ///  Text representation of a property value.
        ///  </returns>
        public static GetPropertyValue(ownerInstance: Object, propInfo: PropertyInfo, /* out */typeName: string): string {
            let value: string = string.Empty;
            try {
                typeName = propInfo.PropertyType.FullName;
                //  See if we have any special type interpreters for this
                //  type.
                let interpreter: ITypeValue = TypeValueFinder.GetTypeInterpreter(propInfo.PropertyType);
                if ((interpreter != null)) {
                    value = interpreter.GetValue(ownerInstance, propInfo);
                }
                else {
                    //  If no interpreters are found, simply return the
                    //  ToString() value of the object.
                    if ((propInfo.GetValue(ownerInstance, null) != null)) {
                        value = propInfo.GetValue(ownerInstance, null).ToString();
                    }
                    
                }
                
            }
            catch (tie /*:TargetInvocationException*/) {
                //  Special handling for this exception because
                //  the inner exception text is nice
                typeName = tie.InnerException.GetType().Name;
                value = tie.InnerException.Message;
                DebugLog.WriteVerbose("Handled TargetInvocationException", tie);
            }
            catch (ex /*:Exception*/) {
                typeName = ex.GetType().Name;
                value = ex.Message;
                DebugLog.WriteVerbose("Handled exception", ex);
            }
            
            return value;
        }
        
        ///  <summary>
        ///  Get text representation of a property value and the property value's type. Some
        ///  property types have specialized logic, if so then dispatch to the appropriate method
        ///  for translation.
        ///  </summary>
        ///  <param name="owner">ServiceObject which is the owner of the property</param>
        ///  <param name="propDef">Definition of the property</param>
        ///  <param name="typeName">Output: The type name of the property value.</param>
        ///  <returns>
        ///  Text representation of a property value and the property value's type.  If 
        ///  TryGetProperty() fails for this property, no values is returned.
        ///  </returns>
        public static GetPropertyValue(owner: ServiceObject, propDef: PropertyDefinitionBase, /* out */typeName: string): string {
            let value: Object = null;
            typeName = string.Empty;
            if (owner.TryGetProperty(propDef, /* out */value)) {
                let extProp: ExtendedPropertyDefinition = (<ExtendedPropertyDefinition>(propDef));
                if ((extProp != null)) {
                    typeName = string.Format(System.Globalization.CultureInfo.CurrentCulture, "{0}.{1}", extProp.MapiType.GetType().FullName, extProp.MapiType.ToString());
                }
                else {
                    typeName = value.GetType().FullName;
                }
                
                //  See if we have any special type interpreters for this type.
                if ((value != null)) {
                    let interpreter: ITypeValue = TypeValueFinder.GetTypeInterpreter(value.GetType());
                    if ((interpreter != null)) {
                        return interpreter.GetValue(value);
                    }
                    else {
                        //  If no interpreters are found, simply return the
                        //  ToString() value of the object.
                        return value.ToString();
                    }
                    
                }
                
            }
            
            return string.Empty;
        }
        
        ///  <summary>
        ///  Return text respresentation of the object.
        ///  </summary>
        ///  <param name="rawValue">Object to get value from.</param>
        ///  <returns>
        ///  Text representation of the object and object's properties.
        ///  </returns>
        public static GetPropertyValue(rawValue: Object): string {
            let value: string = string.Empty;
            try {
                //  See if we have any special type interpreters for this
                //  type.
                let interpreter: ITypeValue = TypeValueFinder.GetTypeInterpreter(rawValue.GetType());
                if ((interpreter != null)) {
                    value = interpreter.GetValue(rawValue);
                }
                else {
                    //  If no interpreters are found, simply return the
                    //  ToString() value of the object.
                    value = rawValue.ToString();
                }
                
            }
            catch (tie /*:TargetInvocationException*/) {
                //  Special handling for this exception because
                //  the inner exception text is nice
                value = tie.InnerException.Message;
                DebugLog.WriteVerbose("Handled TargetInvocationException", tie);
            }
            catch (ex /*:Exception*/) {
                value = ex.Message;
                DebugLog.WriteVerbose("Handled exception", ex);
            }
            
            return value;
        }
        
        public static GetAlternateNames(propDef: PropertyDefinitionBase): string {
            let exPropDef: ExtendedPropertyDefinition = (<ExtendedPropertyDefinition>(propDef));
            if ((exPropDef != null)) {
                return PropertyInterpretation.GetAlternateNames(KnownExtendedProperties.Instance().GetKnownExtendedPropertyInfo(exPropDef));
            }
            
            return string.Empty;
        }
        
        private static GetAlternateNames(propInfo: KnownExtendedPropertyInfo?): string {
            //  Bail out if we don't have info.
            if (!propInfo.HasValue) {
                return string.Empty;
            }
            
            if ((propInfo.Value.AlternateNames.Length == 0)) {
                return propInfo.Value.CanonicalNames;
            }
            
            return string.Format(System.Globalization.CultureInfo.CurrentCulture, "{0}, {1}", propInfo.Value.CanonicalNames, propInfo.Value.AlternateNames);
        }
        
        public static GetSmartView(owner: ServiceObject, propDef: PropertyDefinitionBase): string {
            let exPropDef: ExtendedPropertyDefinition = (<ExtendedPropertyDefinition>(propDef));
            if ((exPropDef != null)) {
                let value: Object = null;
                if (owner.TryGetProperty(propDef, /* out */value)) {
                    //  See if we have any SmartViews for this property.
                    if ((value != null)) {
                        let smartView: ISmartView = SmartViewFinder.GetSmartView(exPropDef);
                        if ((smartView != null)) {
                            return smartView.GetSmartView(value);
                        }
                        
                    }
                    
                }
                
            }
            
            return string.Empty;
        }
        
        public static GetComments(owner: ServiceObject, propDef: PropertyDefinitionBase): string {
            let exPropDef: ExtendedPropertyDefinition = (<ExtendedPropertyDefinition>(propDef));
            if ((exPropDef != null)) {
                return PropertyInterpretation.GetComments(KnownExtendedProperties.Instance().GetKnownExtendedPropertyInfo(exPropDef));
            }
            
            return string.Empty;
        }
        
        private static GetComments(propInfo: KnownExtendedPropertyInfo?): string {
            //  Bail out if we don't have info.
            if (!propInfo.HasValue) {
                return string.Empty;
            }
            
            let output: StringBuilder = new StringBuilder();
            if ((propInfo.Value.Areas.Length > 0)) {
                output.Append("Areas: ");
                output.AppendLine(propInfo.Value.Areas);
            }
            
            if ((propInfo.Value.References.Length > 0)) {
                if ((output.ToString().Length > 0)) {
                    output.AppendLine();
                }
                
                output.Append("References: ");
                output.AppendLine(propInfo.Value.References);
            }
            
            return output.ToString();
        }
    }