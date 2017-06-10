// import * as electron from "electron";
// declare var nodeRequire;
// const { ipcRenderer }: typeof electron = nodeRequire("electron");
import { ipcRenderer } from "electron";

import * as _ from "lodash";
import { remote } from "electron";
import * as EWSEditorSettings from "../../electron/settings/internal/DefaultSettings";

export class Options {
    settings: typeof EWSEditorSettings.Settings;
    userAgents: string[]
    timeZones: string[];
    constructor() {
        let settings: typeof EWSEditorSettings = remote.require("./src/electron/settings/internal/DefaultSettings");
        this.settings = settings.Settings;
        this.userAgents = settings.UserAgents;
        this.timeZones = settings.ListWindowsTimeZones();
        this.settings.SelectedTimeZoneId.value = this.settings.SelectedTimeZoneId.value || settings.GuessLocalTimeZoneId();
        this.settings.SelectedTimeZoneContextId.value = this.settings.SelectedTimeZoneContextId.value || settings.GuessLocalTimeZoneId();
        this.settings.DebugOutputFile.value = settings.__nodedir + "EwsJsEditor-log.json";
    }
}
