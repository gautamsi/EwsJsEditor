import { ExtendedPropertyDefinition } from "ews-javascript-api";
export interface ISmartView {
    /** get property only */
    SupportedProperties: ExtendedPropertyDefinition[];
    GetSmartView(rawValue:any): string;
}