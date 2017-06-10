import { ipcChannelType, ipcActionType } from "../../common/ipcChannelData";
import { ipcRenderer } from "electron";
export class IPCBroker {
    static channels: string[];

    static sendIpc(channel: ipcChannelType, data: { action: ipcActionType, data: any }) {
        ipcRenderer.send(channel, data);
    }
    static subscrible(channel: ipcChannelType, callback: (event: {sender:Electron.IpcRenderer}, data: {action: ipcActionType, data: any}) => void) {
        ipcRenderer.on(channel, callback);
    }
}