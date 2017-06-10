import { TimeZoneInfo } from "ews-javascript-api";

export let Settings = {
    "DebugOutputFile": {
        "value": "",
        "type": "string",
        "scope": "User"
    },
    "ShouldSaveDebugOutput": {
        "value": true,
        "type": "boolean",
        "scope": "User"
    },
    "ShowSplash": {
        "value": true,
        "type": "boolean",
        "scope": "User"
    },
    "AllowAutodiscoverRedirect": {
        "value": true,
        "type": "boolean",
        "scope": "User"
    },
    "DumpFolderViewSize": {
        "value": 50,
        "type": "number",
        "scope": "User"
    },
    "FindItemViewSize": {
        "value": 50,
        "type": "number",
        "scope": "User"
    },
    "FindFolderViewSize": {
        "value": 50,
        "type": "number",
        "scope": "User"
    },
    "CalendarViewSize": {
        "value": 50,
        "type": "number",
        "scope": "User"
    },
    "EnableSslDetailLogging": {
        "value": false,
        "type": "boolean",
        "scope": "User"
    },
    "UserAgent": {
        "value": "EWSEditor",
        "type": "string",
        "scope": "User"
    },
    "EnableScpLookups": {
        "value": true,
        "type": "boolean",
        "scope": "User"
    },
    "OverrideCertValidation": {
        "value": true,
        "type": "boolean",
        "scope": "User"
    },
    "Timeout": {
        "value": 100000,
        "type": "number",
        "scope": "User"
    },
    "OverrideTimeout": {
        "value": false,
        "type": "boolean",
        "scope": "User"
    },
    "PreAuthenticate": {
        "value": false,
        "type": "boolean",
        "scope": "User"
    },
    "OverrideTimezone": {
        "value": false,
        "type": "boolean",
        "scope": "User"
    },
    "SelectedTimeZoneId": {
        "value": "",
        "type": "string",
        "scope": "User"
    },
    "ProxyServerName": {
        "value": "127.0.0.1",
        "type": "string",
        "scope": "User"
    },
    "ProxyServerPort": {
        "value": 8888,
        "type": "number",
        "scope": "User"
    },
    "ProxyServerUser": {
        "value": "",
        "type": "string",
        "scope": "User"
    },
    "ProxyServerPassword": {
        "value": "",
        "type": "string",
        "scope": "User"
    },
    "ProxyServerDomain": {
        "value": "",
        "type": "string",
        "scope": "User"
    },
    "SpecifyProxySettings": {
        "value": false,
        "type": "boolean",
        "scope": "User"
    },
    "OverrideProxyCredentials": {
        "value": false,
        "type": "boolean",
        "scope": "User"
    },
    "SetDefaultProxy": {
        "value": false,
        "type": "boolean",
        "scope": "User"
    },
    "BypassProxyForLocalAddress": {
        "value": false,
        "type": "boolean",
        "scope": "User"
    },
    "AddTimeZoneContext": {
        "value": false,
        "type": "boolean",
        "scope": "User"
    },
    "SelectedTimeZoneContextId": {
        "value": "",
        "type": "string",
        "scope": "User"
    },
    "EnableAdditionalHeader1": {
        "value": false,
        "type": "boolean",
        "scope": "User"
    },
    "AdditionalHeader1": {
        "value": "",
        "type": "string",
        "scope": "User"
    },
    "AdditionalHeaderValue1": {
        "value": "",
        "type": "string",
        "scope": "User"
    },
    "EnableAdditionalHeader2": {
        "value": false,
        "type": "boolean",
        "scope": "User"
    },
    "AdditionalHeader2": {
        "value": "",
        "type": "string",
        "scope": "User"
    },
    "AdditionalHeaderValue2": {
        "value": "",
        "type": "string",
        "scope": "User"
    },
    "EnableAdditionalHeader3": {
        "value": false,
        "type": "boolean",
        "scope": "User"
    },
    "AdditionalHeader3": {
        "value": "",
        "type": "string",
        "scope": "User"
    },
    "AdditionalHeaderValue3": {
        "value": "",
        "type": "string",
        "scope": "User"
    }
}

export let UserAgents = [
    "EWSEditor",
    "Microsoft Office/15.0 (Windows NT 6.1; Microsoft Outlook 15.0.4551; Pro)",
    "Microsoft Office/14.0 (Windows NT 5.1; Microsoft Outlook 14.0.4536; Pro; MSOffice 14)",
    "Microsoft Office/14.0 (Windows NT 6.1; Microsoft Outlook 14.0.5128; Pro)",
    "Microsoft Office/12.0 (Windows NT 6.1; Microsoft Office Word 12.0.6425; Pro)",
    "Microsoft Office/12.0 (Windows NT 5.1; Microsoft Office Outlook 12.0.6554; Pro)",
    "Microsoft Office/12.0 (Windows NT 5.2; Pro)",
    "MacOutlook/14.2.0.101115 (Intel Mac OS X 10.6.7)",
    "MOWAHost-iPhone/929.19 CFNetwork/672.1.14 Darwin/14.0.0",
];

export let ListWindowsTimeZones: () => string[] = () => TimeZoneInfo.ListWindowsTimeZones();
export let GuessLocalTimeZoneId: () => string = () => TimeZoneInfo.Local.Id;
export let __nodedir = __dirname;