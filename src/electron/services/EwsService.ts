
import { ExchangeService } from "ews-javascript-api";
import { ipcMain } from "electron";
import { ipcActions, ipcChannels } from "../../common/ipcChannelData";
import { EwsSettings } from "../settings/EwsSettings";

export class EwsService {
    static currentService: ExchangeService;
    static currentSettings:EwsSettings = null;

    NewExchangeService(settings: any) {

    }

    static registerServiceIPC() {
        ipcMain.on(ipcChannels.MainToProc, (e: { sender: Electron.WebContents }, d) => {
            console.log(d);
            e.sender.send(ipcChannels.ProcToMain, { action: ipcActions.NewExchangeServiceResponse, d: true });
        });        
    }
}
//export default (new EwsService());