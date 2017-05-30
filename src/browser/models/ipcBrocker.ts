import { ipcChannelNames } from "../../ipc/ipcChannelNames";
import {ipcRenderer} from "electron";
export class ipcBrocker{
    static channels: string[];

    sendIpc(channel:ipcChannelNames, data:any){
        ipcRenderer.send(channel);
    }
    subscrible(channel:ipcChannelNames, callback:Electron.IpcRendererEventListener){
        ipcRenderer.on(channel,callback);
    }
}