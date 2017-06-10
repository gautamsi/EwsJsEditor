import { Menu, MenuItem, app, BrowserWindow, ipcMain } from "electron";
import { WindowService, WindowTypeIds } from "./WindowService";
import { ipcChannels, ipcActions } from "../../common/ipcChannelData";

export class MenuService {
	static Instance = new MenuService();
	private _mainmenu: Electron.Menu = null;
	private _menuMap = new Map<string, Electron.MenuItem>();
	constructor() {
		//this.install();
	}

	disableMenuItem(name: string) {
		var m = this._menuMap.get(name);
		if (m) {
			m.enabled = false;
		}
	}

	ExecuteMenuAction(menuId: string, menuItem: Electron.MenuItem, browserWindow: Electron.BrowserWindow, event: Electron.Event) {
		switch (menuId) {
			case "_relaunch":
				app.relaunch();
				app.exit();
				break;
			case menuIds.File_NewExchangeService:
				WindowService.createModalChildWindow(WindowService.MainWindow, WindowTypeIds.NewExchService, {height:600, width:1000, resizable:false});
				//WindowService.sendIpcTomainWindow(ipcChannels.MainToProc, {action:ipcActions.OpenWindow, data:menuId});
				//ipcMain.emit("open");
				break;
			default:
				break;
		}
	}

	install(win: Electron.BrowserWindow) {
		// Menus
		const menubar = this._mainmenu = new Menu();

		// Mac: Application
		// let macApplicationMenuItem: Electron.MenuItem;
		// if (isMacintosh) {
		// 	const applicationMenu = new Menu();
		// 	macApplicationMenuItem = new MenuItem({ label: product.nameShort, submenu: applicationMenu });
		// 	this.setMacApplicationMenu(applicationMenu);
		// }

		// File
		const fileMenu = new Menu();
		const fileMenuItem = new MenuItem({ label: "&File", submenu: fileMenu });
		this.setFileMenu(fileMenu);



		// View
		const viewMenu = new Menu();
		const viewMenuItem = new MenuItem({ label: "&View", submenu: viewMenu });
		this.setViewMenu(viewMenu);

		// Tools
		const toolsMenu = new Menu();
		const toolsMenuItem = new MenuItem({ label: "&Tools", submenu: toolsMenu });
		this.setToolsMenu(toolsMenu);

		// Other
		const otherMenu = new Menu();
		const otherMenuItem = new MenuItem({ label: "&Other", submenu: otherMenu });
		this.setOtherMenu(otherMenu);


		// Help Menu
		const helpMenu = new Menu();
		const helpMenuItem = new MenuItem({ label: "&Help", submenu: helpMenu });
		this.createMenuItem(menuIds.File_NewExchangeService, "About EWSJsEditor", helpMenu);
		this.createMenuItem("_relaunch", "Relaunch", helpMenu, { accelerator: "CommandOrControl+`" });
		this.createMenuItem("_reload", "Reload", helpMenu, { role: "reload" });

		menubar.append(fileMenuItem);
		menubar.append(viewMenuItem);
		menubar.append(toolsMenuItem);
		menubar.append(otherMenuItem);
		menubar.append(helpMenuItem);
		win.setMenu(menubar);
	}

	private setFileMenu(fileMenu: Electron.Menu): void {
		this.createMenuItem(menuIds.File_NewExchangeService, "New Exchange Service...", fileMenu);
		this.createMenuItem(menuIds.File_OpenDefaultExchangeService, "Open Default Exchange Service", fileMenu);
		this.createMenuItem(menuIds.File_CloseExchangeService, "Close Exchange Service", fileMenu, { enabled: false });
		this.createMenuItem(menuIds.File_CloseExchangeService, "Exit", fileMenu, { role: "close" });
	}

	private setViewMenu(viewMenu: Electron.Menu): void {
		this.createMenuItem(menuIds.View_ConfigureDetailPropertySet, "Configure Detail Property Set...", viewMenu, { enabled: false });
		this.createMenuItem(menuIds.View_ResetDetailPropertySet, "Reset Detail Property Set", viewMenu, { enabled: false });
		this.createMenuItem(menuIds.View_Refresh, "Refresh", viewMenu, { enabled: false });
	}

	private setToolsMenu(toolsMenu: Electron.Menu): void {

		this.createMenuItem(menuIds.Tools_EdirotLogViewer, "EWSEditor Log Viewer...", toolsMenu, { enabled: true });
		this.createMenuItem(menuIds.Tools_OptionsWindow, "Options...", toolsMenu, { enabled: true });

		let toolsDiscoverySubMenu = new Menu();
		this.createMenuItem(menuIds.Tools_Discovery, "Discovery", toolsMenu, { enabled: true, type: "submenu", submenu: toolsDiscoverySubMenu }, false);

		this.createMenuItem(menuIds.Tools_Discovery_AutoDiscoveryViewer, "Autodiscover Viewer...", toolsDiscoverySubMenu, { enabled: true });
		this.createMenuItem(menuIds.Tools_Discovery_DomainSettings, "Domain Settings...", toolsDiscoverySubMenu, { enabled: true });
		this.createMenuItem(menuIds.Tools_Discovery_SCPLookup, "SCP Lookups...", toolsDiscoverySubMenu, { enabled: true });
		this.createMenuItem(menuIds.Tools_EwsPost, "EWS POST...", toolsMenu, { enabled: true });
		this.createMenuItem(menuIds.Tools_TimeZoneHelper, "TimeZone Helper...", toolsMenu, { enabled: true });

		this.createMenuItem(null, "", toolsMenu, { type: "separator" }, false);

		this.createMenuItem(menuIds.Tools_ResolveName, "Resolve Name...", toolsMenu, { enabled: false });
		this.createMenuItem(menuIds.Tools_ExtendedPropertyResolver, "Extended Property Resolver...", toolsMenu, { enabled: false });

		let toolsNotificationSubMenu = new Menu();
		this.createMenuItem(menuIds.Tools_Notifications, "Notifications", toolsMenu, { enabled: false, type: "submenu", submenu: toolsNotificationSubMenu }, false);

		this.createMenuItem(menuIds.Tools_Notifications_PullNotificationViewer, "Pull Notifications Viewer...", toolsNotificationSubMenu, { enabled: false });
		this.createMenuItem(menuIds.Tools_Notifications_StreamingNotificationViewer, "Streaming Notifications Viewer...", toolsNotificationSubMenu, { enabled: false });
		this.createMenuItem(menuIds.Tools_Notifications_ItemSyncViewer, "Item Synchronization Viewer...", toolsNotificationSubMenu, { enabled: false });

		this.createMenuItem(null, "", toolsMenu, { type: "separator" }, false);

		let toolsUserSettingsSubMenu = new Menu();
		this.createMenuItem(menuIds.Tools_UserSettings, "User Settings", toolsMenu, { enabled: false, type: "submenu", submenu: toolsUserSettingsSubMenu }, false);
		this.createMenuItem(menuIds.Tools_UserSettings_OOFSettings, "User OOF Settings...", toolsUserSettingsSubMenu, { enabled: false });
		this.createMenuItem(menuIds.Tools_UserSettings_Availability, "User Availability...", toolsUserSettingsSubMenu, { enabled: false });
		this.createMenuItem(menuIds.Tools_UserSettings_RetentionTags, "User Retention Tags...", toolsUserSettingsSubMenu, { enabled: false });
		this.createMenuItem(menuIds.Tools_UserSettings_Configuration, "User Configuration...", toolsUserSettingsSubMenu, { enabled: false });

		this.createMenuItem(menuIds.Tools_CheckForErrorInLoadingProps, "Check for errors loading properties on Items...", toolsMenu, { enabled: false });
		this.createMenuItem(menuIds.Tools_DelegateInfo, "Delegate Information...", toolsMenu, { enabled: false });
		this.createMenuItem(menuIds.Tools_MeetingRooms, "Meeting Rooms...", toolsMenu, { enabled: false });
		this.createMenuItem(menuIds.Tools_DLExpansion, "Distibution List Expansion...", toolsMenu, { enabled: false });
		this.createMenuItem(menuIds.Tools_InboxRules, "Inbox Rules...", toolsMenu, { enabled: false });
		this.createMenuItem(menuIds.Tools_ConvertId, "ConvertId...", toolsMenu, { enabled: false });
		this.createMenuItem(menuIds.Tools_ServerTimeZone, "Server TimeZone...", toolsMenu, { enabled: false });
		this.createMenuItem(menuIds.Tools_eDiscoverySearch, "eDiscoverySearch...", toolsMenu, { enabled: false });
		this.createMenuItem(menuIds.Tools_MailApps, "Mail Apps...", toolsMenu, { enabled: false });
		this.createMenuItem(menuIds.Tools_MailTips, "Mail Tips...", toolsMenu, { enabled: false });

		this.createMenuItem(null, "", toolsMenu, { type: "separator" }, false);

		this.createMenuItem(menuIds.Tools_DevServiceTestWindow, "Developer Service Test Window...", toolsMenu, { enabled: false });
	}

	private setOtherMenu(otherMenu: Electron.Menu): void {

		this.createMenuItem(menuIds.Other_OpenItemById, "Open Item by Id...", otherMenu, { enabled: false });
		this.createMenuItem(menuIds.Other_OpenFolderById, "Open Folder by Id...", otherMenu, { enabled: false });
		this.createMenuItem(menuIds.Other_GetItemsByConversationId, "Get Items by Conversation Id...", otherMenu, { enabled: false });

		this.createMenuItem(null, "", otherMenu, { type: "separator" }, false);

		this.createMenuItem(menuIds.Other_FindAppointments, "Find Appointments (CalendarView)...", otherMenu, { enabled: false });

		this.createMenuItem(null, "", otherMenu, { type: "separator" }, false);

		this.createMenuItem(menuIds.Other_RunTimeInfo, "Run-time Information...", otherMenu, { enabled: true });
		this.createMenuItem(menuIds.OtherSystemNetMailClient, "System.Net.Mail Client...", otherMenu, { enabled: true });
		this.createMenuItem(menuIds.Other_EncodingHelper, "Encoding Helper...", otherMenu, { enabled: true });
		this.createMenuItem(menuIds.Other_FileContentHelper, "File Content Helper...", otherMenu, { enabled: true });
		this.createMenuItem(menuIds.Other_ViewInBrowser, "View In Browser", otherMenu, { enabled: true });
		this.createMenuItem(menuIds.Other_MIMEParser, "MIME Parser", otherMenu, { enabled: true });
	}
	private createMenuItem(id: string, label: string, menuToAppendTo: Electron.Menu, options?: Electron.MenuItemConstructorOptions, bindClick: boolean = true): void {

		let _menuOptions: Electron.MenuItemConstructorOptions = { label: label, id: menuIds.File_CloseExchangeService };
		Object.assign(_menuOptions, options)

		if (bindClick && typeof _menuOptions.role !== "string" && typeof _menuOptions.click !== "function") {
			_menuOptions.click = this.ExecuteMenuAction.bind(this, id);
		}

		let _menuItem = new MenuItem(_menuOptions);
		menuToAppendTo.append(_menuItem);
		if (id && _menuOptions.type !== "submenu") {
			this._menuMap.set(id, _menuItem);
		}
	}
}

export var menuIds = {
	"File_NewExchangeService": "NewExchangeService",
	"File_OpenDefaultExchangeService": "File_OpenDefaultExchangeService",
	"File_CloseExchangeService": "File_CloseExchangeService",

	"View_ConfigureDetailPropertySet": "View_ConfigureDetailPropertySet",
	"View_ResetDetailPropertySet": "View_ResetDetailPropertySet",
	"View_Refresh": "View_Refresh",

	"Tools_EdirotLogViewer": "Tools_EdirotLogViewer",
	"Tools_OptionsWindow": "Tools_OptionsWindow",
	"Tools_Discovery": "Tools_Discovery",
	"Tools_Discovery_AutoDiscoveryViewer": "Tools_Discovery_AutoDiscoveryViewer",
	"Tools_Discovery_DomainSettings": "Tools_Discovery_DomainSettings",
	"Tools_Discovery_SCPLookup": "Tools_Discovery_SCPLookup",
	"Tools_EwsPost": "Tools_EwsPost",
	"Tools_TimeZoneHelper": "Tools_TimeZoneHelper",
	// --------------seperator---------------
	"Tools_ResolveName": "Tools_ResolveName",
	"Tools_ExtendedPropertyResolver": "Tools_ExtendedPropertyResolver",
	"Tools_Notifications": "Tools_Notifications",
	"Tools_Notifications_PullNotificationViewer": "Tools_Notifications_PullNotificationViewer",
	"Tools_Notifications_StreamingNotificationViewer": "Tools_Notifications_StreamingNotificationViewer",
	"Tools_Notifications_ItemSyncViewer": "Tools_Notifications_ItemSyncViewer",
	// --------------seperator---------------
	"Tools_UserSettings": "Tools_UserSettings",
	"Tools_UserSettings_OOFSettings": "Tools_UserSettings_OOFSettings",
	"Tools_UserSettings_Availability": "Tools_UserSettings_Availability",
	"Tools_UserSettings_RetentionTags": "Tools_UserSettings_RetentionTags",
	"Tools_UserSettings_Configuration": "Tools_UserSettings_Configuration",
	"Tools_CheckForErrorInLoadingProps": "Tools_CheckForErrorInLoadingProps",
	"Tools_DelegateInfo": "Tools_DelegateInfo",
	"Tools_MeetingRooms": "Tools_MeetingRooms",
	"Tools_DLExpansion": "Tools_DLExpansion",
	"Tools_InboxRules": "Tools_InboxRules",
	"Tools_ConvertId": "Tools_ConvertId",
	"Tools_ServerTimeZone": "Tools_ServerTimeZone",
	"Tools_eDiscoverySearch": "Tools_eDiscoverySearch",
	"Tools_MailApps": "Tools_MailApps",
	"Tools_MailTips": "Tools_MailTips",
	// --------------seperator---------------
	"Tools_DevServiceTestWindow": "Tools_DevServiceTestWindow",

	"Other_OpenItemById": "Other_OpenItemById",
	"Other_OpenFolderById": "Other_OpenFolderById",
	"Other_GetItemsByConversationId": "Other_GetItemsByConversationId",
	// --------------seperator---------------
	"Other_FindAppointments": "Other_FindAppointments",
	// --------------seperator---------------
	"Other_RunTimeInfo": "Other_RunTimeInfo",
	"OtherSystemNetMailClient": "OtherSystemNetMailClient",
	"Other_EncodingHelper": "Other_EncodingHelper",
	"Other_FileContentHelper": "Other_FileContentHelper",
	"Other_ViewInBrowser": "Other_ViewInBrowser",
	"Other_MIMEParser": "Other_MIMEParser",

	"Help_About": "Help_About"
}