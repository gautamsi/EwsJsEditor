import { app, BrowserWindow, globalShortcut } from "electron";

export class WindowService {
    static Instance = new WindowService();
    static MainWindow: Electron.BrowserWindow;
    static baseUrl: string = null;
    static windowMap: Map<string, Electron.BrowserWindow | Electron.BrowserWindow[]> = new Map<string, Electron.BrowserWindow | Electron.BrowserWindow[]>();
    static convertWindowTypeToName(id: WindowTypeIds): string {
        let winHash: string = null;
        switch (id) {
            case WindowTypeIds.NewExchService:
                winHash = "newExchangeService";
                break;
            case WindowTypeIds.ConfigureDetailPropertySet:
                winHash = "configurePropertySet";
                break;
            case WindowTypeIds.LogViewer:
                winHash = "logViewer";
                break;
            case WindowTypeIds.Options:
                winHash = "options";
                break;
            case WindowTypeIds.AutoDViewer:
                winHash = "autoDViewer";
                break;
            case WindowTypeIds.DomainSettings:
                winHash = "domaiSettings";
                break;
            case WindowTypeIds.SCPLookup:
                winHash = "scpLookup";
                break;
            case WindowTypeIds.EwsPost:
                winHash = "ewsPost";
                break;
            case WindowTypeIds.TimeZoneHelper:
                winHash = "timeZoneHelper";
                break;
            case WindowTypeIds.ResolveName:
                winHash = "resolveName";
                break;
            case WindowTypeIds.ExtendedPropertyResolver:
                winHash = "extenderPropertyResolver";
                break;
            case WindowTypeIds.PullNotificationViewer:
                winHash = "pullNotificationViewer";
                break;
            case WindowTypeIds.StreamingNotificationViewer:
                winHash = "streamingNotificationViewer";
                break;
            case WindowTypeIds.ItemSynchronizationViewer:
                winHash = "itemSynchronizationViewer";
                break;
            case WindowTypeIds.UserOOFSetting:
                winHash = "userOOFSetting";
                break;
            case WindowTypeIds.UserAvailability:
                winHash = "userAvailability";
                break;
            case WindowTypeIds.UserRetentionTags:
                winHash = "userRetentionTags";
                break;
            case WindowTypeIds.UserConfiguration:
                winHash = "userConfiguration";
                break;
            case WindowTypeIds.CheckErrorInLoadingProps:
                winHash = "checkErrorInLoadingProperties";
                break;
            case WindowTypeIds.DelegateInformation:
                winHash = "delegateInformation";
                break;
            case WindowTypeIds.MeetingRooms:
                winHash = "meetingRooms";
                break;
            case WindowTypeIds.DLExpansion:
                winHash = "dlExpansion";
                break;
            case WindowTypeIds.InboxRules:
                winHash = "inboxRules";
                break;
            case WindowTypeIds.ConvertId:
                winHash = "convertId";
                break;
            case WindowTypeIds.ServerTimeZones:
                winHash = "serverTimeZone";
                break;
            case WindowTypeIds.eDiscoverySearch:
                winHash = "eDiscoverySearch";
                break;
            case WindowTypeIds.MailApps:
                winHash = "mailApps";
                break;
            case WindowTypeIds.mailTips:
                winHash = "mailTips";
                break;
            case WindowTypeIds.DeveloperServiceTestWindow:
                winHash = "devServiceTestWindow";
                break;
            case WindowTypeIds.OpenItemsById:
                winHash = "openItemsById";
                break;
            case WindowTypeIds.OpenFolderById:
                winHash = "openFolderById";
                break;
            case WindowTypeIds.OpenConversationById:
                winHash = "openConversationById";
                break;
            case WindowTypeIds.FindAppointments:
                winHash = "findAppointments";
                break;
            case WindowTypeIds.RuntimeInfo:
                winHash = "runtimeInfo";
                break;
            case WindowTypeIds.SMTPMailSender:
                winHash = "smtpMailSender";
                break;
            case WindowTypeIds.EncodingHelper:
                winHash = "encodingHelper";
                break;
            case WindowTypeIds.FileContentHelper:
                winHash = "fileContentHelper";
                break;
            case WindowTypeIds.ViewInBrowser:
                winHash = "viewInBrowser";
                break;
            case WindowTypeIds.MIMEParser:
                winHash = "mimeParser";
                break;
            case WindowTypeIds.About:
                winHash = "about";
                break;

            default:
                winHash = "newTab";
                break;
        }
        return winHash;
    }

    // static ShowWindow(win: Electron.BrowserWindow) {
    //     win.on('close', (e) => {
    //         win = null;
    //     });
    //     //win.loadURL("http://localhost:9000/#newExchangeService");
    //     //win.show();

    // }
    static createModalChildWindow(parent: Electron.BrowserWindow, winType: WindowTypeIds, options?: Electron.BrowserWindowConstructorOptions): Electron.BrowserWindow {
        return this.createChildWindow(winType, false, { parent: parent, modal: true, skipTaskbar: true, })
    }

    static createChildWindow(winType: WindowTypeIds, multiInstance: boolean = true, options?: Electron.BrowserWindowConstructorOptions): Electron.BrowserWindow {
        let windowName = this.convertWindowTypeToName(winType);
        let existing = this.windowMap.get(windowName);
        if (existing && !multiInstance) return null;

        let _options: Electron.BrowserWindowConstructorOptions = Object.assign({}, options);
        let _bw = new BrowserWindow(_options);
        if (multiInstance) {
            if (existing) {
                if (Array.isArray(existing)) {
                    existing.push(_bw);
                }
                else {
                    this.windowMap.set(windowName, [existing, _bw]);
                }
            }
            else {
                this.windowMap.set(windowName, [_bw]);
            }
        }
        _bw.on('close', (e) => {
            _bw = null;
            let _existing = this.windowMap.get(windowName);
            if (Array.isArray(_existing)) {
                let _i = _existing.indexOf(_bw);
                if (_i >= 0) {
                    _existing.splice(_i, 1);
                }
            }
            else {
                if (!_existing || (_existing && _bw === _existing))
                    this.windowMap.delete(windowName);
            }
        });
        _bw.setMenu(null);
        _bw.loadURL(this.baseUrl + "#" + windowName);
        return _bw;
    }

    static RegisterShortcuts() {
        globalShortcut.register('CommandOrControl+`', () => {
            app.relaunch();
            app.exit();
        });

        globalShortcut.register('CommandOrControl+Shift+I', () => {
            let win = BrowserWindow.getFocusedWindow();
            win.webContents.openDevTools();
        });
    }
    static sendIpcTomainWindow(channel: string, ...args:any[]): void {
        let webCon = this.MainWindow.webContents;
        if(webCon){
            webCon.send(channel, ...args);
        }
    }
}

export enum WindowTypeIds {
    NewExchService,
    ConfigureDetailPropertySet,
    LogViewer,
    Options,
    AutoDViewer,
    DomainSettings,
    SCPLookup,
    EwsPost,
    TimeZoneHelper,
    ResolveName,
    ExtendedPropertyResolver,
    PullNotificationViewer,
    StreamingNotificationViewer,
    ItemSynchronizationViewer,
    UserOOFSetting,
    UserAvailability,
    UserRetentionTags,
    UserConfiguration,
    CheckErrorInLoadingProps,
    DelegateInformation,
    MeetingRooms,
    DLExpansion,
    InboxRules,
    ConvertId,
    ServerTimeZones,
    eDiscoverySearch,
    MailApps,
    mailTips,
    DeveloperServiceTestWindow,
    OpenItemsById,
    OpenFolderById,
    OpenConversationById,
    FindAppointments, //can use ItemListViewer With different view
    RuntimeInfo,
    SMTPMailSender,
    EncodingHelper,
    FileContentHelper,
    ViewInBrowser,
    MIMEParser,
    About,
    /** This hosts list of items in the folder or custom list */
    ItemListViewer,
};

