import { ExchangeVersion } from "ews-javascript-api";
export class EwsSettings {
    useAutodisocver: boolean = false;
    autodEmail: string = '';
    serviceUrl: string = 'https://outlook.office365.com/ews.exchange.asmx';
    exchangeVersion: string = "Exchange2013";
    exchangeVersions:string[];
    credentialType: string = "given";
    userName: string = '';
    password: string = '';
    domain: string = '';
    oauthRedirectUri: string = "https://EwsJsEditor";
    oauthClientAppId: string = "0e4bf2e2-aa7d-46e8-aa12-263adeb3a62b";
    oauthServerName: string = "https://outlook.office365.com";
    oauthAuthAuthority: string = "https://login.windows.net/common";
    useImpersonation: boolean = false;
    impersonationType: string = "SmtpAddress";
    impersonationId: string = '';
    setXAnchorMailboxHeader: boolean = false;
    xAnchorHeaderSMTP: string = ''
    setXPublicFolderMailboxHeader: boolean = false;
    xPublicFolderHeaderSMTP: string = '';

    constructor() {
        this.exchangeVersions = Object.keys(ExchangeVersion).filter(x => isNaN(<any>x) && x !== 'Exchange_Version_Not_Updated')

    }
}
