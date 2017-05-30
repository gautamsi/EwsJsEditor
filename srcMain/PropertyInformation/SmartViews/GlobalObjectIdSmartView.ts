import { ISmartView } from "./ISmartView";
import { ExtendedPropertyDefinition, DateTime, StringHelper } from "ews-javascript-api";
export class GlobalObjectIdStruct {
        
        public Id: number[];
        
        public Year: number; //Int32;
        
        public Month: number;
        
        public Day: number;
        
        public CreationTime: number; //Int64;
        
        public X: number; //Int64;
        
        public Size: number; //Int32;
        
        public lpData: number[];
        
        public Junk: number[];
    }
    
    ///  <summary>
    ///  Display a smart view of properties based on GlobalObjectId such as:
    ///  
    ///  PidLidGlobalObjectId
    ///  http://msdn.microsoft.com/en-us/library/cc815676.aspx
    ///  
    ///  PidLidCleanGlobalObjectId
    ///  http://msdn.microsoft.com/en-us/library/cc839502.aspx
    ///  </summary>
    export class GlobalObjectIdSmartView implements ISmartView {
        
        public get SupportedProperties(): ExtendedPropertyDefinition[] {
            return [
                    KnownExtendedProperties.Instance().PidLidGlobalObjectId,
                    KnownExtendedProperties.Instance().PidLidCleanGlobalObjectId];
        }
        
        public GetSmartView(rawValue: Object): string {
            let goidStruct: GlobalObjectIdStruct = GlobalObjectIdSmartView.GetGlobalObjectIdStruct((<number[]>(rawValue)));
            let sb: string = '';
            sb +="GlobalObjectId:";
            sb+= "\n" + StringHelper.Format("Byte Array ID = c: {0} b: {1}", goidStruct.Id.length, ConversionHelper.GetStringFromBytes(goidStruct.Id));
            sb+= "\n" + StringHelper.Format("Year = 0x{0}, {1}", ConversionHelper.GetBase16(goidStruct.Year), goidStruct.Year);
            sb+= "\n" + StringHelper.Format("Month = 0x{0}, {1}", ConversionHelper.GetBase16(goidStruct.Month), goidStruct.Month);
            sb+= "\n" + StringHelper.Format("Day = 0x{0}, {1}", ConversionHelper.GetBase16(goidStruct.Day), goidStruct.Day);
            sb+= "\n" + StringHelper.Format("CreationTime = {0}, {1}", goidStruct.CreationTime, DateTime.Parse(goidStruct.CreationTime));// .FromFileTimeUtc(goidStruct.CreationTime)));
            sb+= "\n" + StringHelper.Format("X = {0}", goidStruct.X);
            sb+= "\n" + StringHelper.Format("Size = 0x{0}, {1}", ConversionHelper.GetBase16(goidStruct.Size), goidStruct.Size);
            sb+= "\n" + StringHelper.Format("Data = c:{0} b: {1}", goidStruct.lpData.Length, ConversionHelper.GetStringFromBytes(goidStruct.lpData));
            sb+= "\n" + );
            return sb.ToString();
        }
        
        public static GetGlobalObjectIdStruct(rawValue: number[]): GlobalObjectIdStruct {
            let stream: System.IO.MemoryStream = new System.IO.MemoryStream(rawValue);
            let reader: System.IO.BinaryReader = new System.IO.BinaryReader(stream);
            let goid: GlobalObjectIdStruct = new GlobalObjectIdStruct();
            goid.Id = reader.ReadBytes(16);
            let b1: number = reader.ReadByte();
            let b2: number = reader.ReadByte();
            goid.Year = ((b1 + 8) 
                        | b2);
            goid.Month = reader.ReadByte();
            goid.Day = reader.ReadByte();
            goid.CreationTime = reader.ReadInt64();
            goid.X = reader.ReadInt64();
            goid.Size = reader.ReadInt32();
            goid.lpData = reader.ReadBytes((<number>(goid.Size)));
            //  Junk data is all that is left
            let junk: List<number> = new List<number>();
            while ((reader.PeekChar() > 0)) {
                junk.Add(reader.ReadByte());
            }
            
            goid.Junk = junk.ToArray();
            return goid;
        }
    }