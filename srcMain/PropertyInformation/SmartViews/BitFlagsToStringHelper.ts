import { StringHelper } from "ews-javascript-api";
export class BitFlagDefinition {
        
        /* internal */ FlagName: string;
        
        /* internal */ FlagValue: number;
        
        /* internal */ constructor (value: number, name: string) {
            this.FlagName = name;
            this.FlagValue = value;
        }
    }
    
    export class BitFlagsToStringHelper {
        
        /* internal */ static ToString(value: number, flags: BitFlagDefinition[]): string {
            let output: string = '';
            for (let flag of flags) {
                if (((value & flag.FlagValue) 
                            > 0)) {
                    if ((output.length > 0)) {
                        output += (StringHelper.Format(" | {0}", flag.FlagName));
                    }
                    else {
                        output += flag.FlagName;
                    }
                    
                }
                
            }
            
            return StringHelper.Format("Flags: {0}", output);
        }
    }