// import * as electron from "electron";
// declare var nodeRequire;
//const {ipcRenderer}: typeof electron = nodeRequire("electron");

import { remote } from 'electron';
import { IPCBroker } from "../models/ipcBroker";
import { ipcChannels, ipcActions } from "../../common/ipcChannelData";
import * as newEwsSettings from "../../electron/settings/EwsSettings";

import { TreeModel } from "../models/TreeModel";

import { inject } from 'aurelia-framework';
import 'kendo-ui-core/js/kendo.window';
import 'kendo-ui-core/js/kendo.button';


export class NewExchangeService {
    settings: newEwsSettings.EwsSettings;
    private window: kendo.ui.Window;
    private optionsVM = "browser/apps/options";
    constructor() {
        let settings: typeof newEwsSettings = remote.require("./src/electron/settings/EwsSettings");
        this.settings = new  settings.EwsSettings();
    }

    openOptions() {
        this.window.open();
        //this.window.center();
    }
    ok() {
        IPCBroker.subscrible(ipcChannels.ProcToMain, (e, d) => {
            if (d.data instanceof Error) {
                console.log(d.data);
                return;
            }

            remote.getCurrentWindow().close();

        });
        IPCBroker.sendIpc(ipcChannels.MainToProc, { action: ipcActions.NewExchangeServiceRequest, data: { settings: this.settings } });
    }
    cancel() {
        remote.getCurrentWindow().close();
    }
}
