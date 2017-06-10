 enum EwsApiVersions {
        
        OnePointZero,
        
        OnePointZeroHot,
        
        OnePointOne,
        
        OnePointOneHot,
        
        OnePointTwo,
        
        Unknown,
    }
    
    class EnvironmentInfo {
        
        private /* internal */ /* const */ static BuiltForEwsManagedApiVersion: string = "15.00.0516.014";
        
        // internal const string Framework35RegistryPath = @"SOFTWARE\Microsoft\NET Framework Setup\NDP\v3.5";
        private /* internal */ /* const */ static Framework4RegistryPath: string = "SOFTWARE\Microsoft\NET Framework Setup\NDP\v4\Full";
        
        private /* internal */ /* const */ static EwsManagedApiInstallPath: string = "C:\Program Files\Microsoft\Exchange\Web Services\2.0\Microsoft.Exchange.WebServices.dll";
        
        private /* internal */ /* const */ static EwsManagedApiDownloadUrl: string = "http://www.microsoft.com/en-us/download/details.aspx?id=35371";
        
        private /* internal */ /* const */ static EwsEditorProjectUrl: string = "http://ewseditor.codeplex.com";
        
        private /* internal */ /* const */ static EwsEditorBlogPostsUrl: string = "http://blogs.msdn.com/mstehle/archive/tags/EWSEditor/default.aspx";
        
        private /* internal */ static get EwsEditorVersion(): string {
            return Assembly.GetExecutingAssembly().GetName().Version.ToString();
        }
        
        private /* internal */ static get EwsEditorTitle(): string {
            let attributes: Object[] = Assembly.GetExecutingAssembly().GetCustomAttributes(typeof(AssemblyTitleAttribute), false);
            if ((attributes.Length > 0)) {
                let titleAttribute: AssemblyTitleAttribute = (<AssemblyTitleAttribute>(attributes[0]));
                if ((titleAttribute.Title != string.Empty)) {
                    return titleAttribute.Title;
                }
                
            }
            
            return System.IO.Path.GetFileNameWithoutExtension(Assembly.GetExecutingAssembly().CodeBase);
        }
        
        private /* internal */ static get EwsEditorDescription(): string {
            let attributes: Object[] = Assembly.GetExecutingAssembly().GetCustomAttributes(typeof(AssemblyDescriptionAttribute), false);
            if ((attributes.Length == 0)) {
                return string.Empty;
            }
            
            return (<AssemblyDescriptionAttribute>(attributes[0])).Description;
        }
        
        private /* internal */ static get EwsEditorProduct(): string {
            let attributes: Object[] = Assembly.GetExecutingAssembly().GetCustomAttributes(typeof(AssemblyProductAttribute), false);
            if ((attributes.Length == 0)) {
                return string.Empty;
            }
            
            return (<AssemblyProductAttribute>(attributes[0])).Product;
        }
        
        private /* internal */ static get EwsEditorCopyright(): string {
            let attributes: Object[] = Assembly.GetExecutingAssembly().GetCustomAttributes(typeof(AssemblyCopyrightAttribute), false);
            if ((attributes.Length == 0)) {
                return string.Empty;
            }
            
            return (<AssemblyCopyrightAttribute>(attributes[0])).Copyright;
        }
        
        private /* internal */ static get EwsEditorCompany(): string {
            let attributes: Object[] = Assembly.GetExecutingAssembly().GetCustomAttributes(typeof(AssemblyCompanyAttribute), false);
            if ((attributes.Length == 0)) {
                return string.Empty;
            }
            
            return (<AssemblyCompanyAttribute>(attributes[0])).Company;
        }
        
        private /* internal */ static get EwsApiVersion(): EwsApiVersions {
            if (((EnvironmentInfo.EwsApiFileVersion.FileMajorPart == 14) 
                        && (EnvironmentInfo.EwsApiFileVersion.FileMinorPart == 0))) {
                if (((EnvironmentInfo.EwsApiFileVersion.FileBuildPart == 650) 
                            && (EnvironmentInfo.EwsApiFileVersion.FilePrivatePart == 7))) {
                    return EwsApiVersions.OnePointZero;
                }
                else if ((EnvironmentInfo.EwsApiFileVersion.FileBuildPart > 650)) {
                    return EwsApiVersions.OnePointZeroHot;
                }
                
            }
            else if (((EnvironmentInfo.EwsApiFileVersion.FileMajorPart == 14) 
                        && (EnvironmentInfo.EwsApiFileVersion.FileMinorPart == 2))) {
                return EwsApiVersions.OnePointOneHot;
            }
            else if (((EnvironmentInfo.EwsApiFileVersion.FileMajorPart == 14) 
                        && (EnvironmentInfo.EwsApiFileVersion.FileMinorPart == 3))) {
                return EwsApiVersions.OnePointTwo;
            }
            
            return EwsApiVersions.Unknown;
        }
        
        private /* internal */ static get EwsApiFileVersion(): FileVersionInfo {
            let ewsapi: System.Reflection.Assembly = System.Reflection.Assembly.GetAssembly(typeof(Microsoft.Exchange.WebServices.Data.ExchangeService));
            let info: System.Diagnostics.FileVersionInfo = System.Diagnostics.FileVersionInfo.GetVersionInfo(ewsapi.Location);
            return info;
        }
        
        private /* internal */ static get EwsApiPath(): string {
            let ewsapi: System.Reflection.Assembly = System.Reflection.Assembly.GetAssembly(typeof(Microsoft.Exchange.WebServices.Data.ExchangeService));
            return ewsapi.Location;
        }
        
        // internal static bool IsDotNetFramework35SP1
        // {
        //     get
        //     {
        //         try
        //         {
        //             Microsoft.Win32.RegistryKey key = null;
        //             key = Microsoft.Win32.Registry.LocalMachine.OpenSubKey(Framework35RegistryPath);
        //             if (key != null)
        //             {
        //                 return Convert.ToInt32(key.GetValue("SP")) == 1;
        //             }
        //             return false;
        //         }
        //         catch (Exception ex)
        //         {
        //             DebugLog.WriteVerbose("Handled exception and returned false.", ex);
        //             return false;
        //         }
        //     }
        // }
        private /* internal */ static get IsDotNetFramework4(): boolean {
            try {
                let key: Microsoft.Win32.RegistryKey = null;
                key = Microsoft.Win32.Registry.LocalMachine.OpenSubKey(Framework4RegistryPath);
                if ((key != null)) {
                    return true;
                }
                
                return false;
            }
            catch (ex /*:Exception*/) {
                DebugLog.WriteVerbose("Handled exception and returned false.", ex);
                return false;
            }
            
        }
        
        private /* internal */ static get DotNetFrameworkVersion(): string {
            let key: Microsoft.Win32.RegistryKey = null;
            key = Microsoft.Win32.Registry.LocalMachine.OpenSubKey(Framework4RegistryPath);
            if ((key != null)) {
                return key.GetValue("Version").ToString();
            }
            
            return string.Empty;
        }
    }