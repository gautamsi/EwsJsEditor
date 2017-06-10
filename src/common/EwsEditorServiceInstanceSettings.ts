import { ExchangeVersion, ImpersonatedUserId, ExchangeService } from "ews-javascript-api";

export interface EwsEditorAppSettings {

    MailboxBeingAccessed: string;

    //  calc
    AccountAccessingMailbox: string;

    //  calc
    UrlHost: string;

    AuthenticationMethod: RequestedAuthType;

    //  Default, UserSpecified, oAuth
    UseAutoDiscover: boolean;

    RequestedAutodiscoverEmail: string;

    RequestedExchangeServiceURL: string;

    RequestedExchangeVersion?: ExchangeVersion;

    UserName: string;

    Password: string;

    Domain: string;

    UserImpersonationSelected: boolean;

    UserToImpersonate: ImpersonatedUserId;

    ImpersonationType: string;

    ImpersonatedId: string;

    UseoAuth?: boolean;

    oAuthRedirectUrl: string;

    oAuthClientId: string;

    oAuthServerName: string;

    oAuthAuthority: string;

    EnableAdditionalHeader1: boolean;

    AdditionalHeader1: string;

    AdditionalHeaderValue1: string;

    EnableAdditionalHeader2: boolean;

    AdditionalHeader2: string;

    AdditionalHeaderValue2: string;

    EnableAdditionalHeader3: boolean;

    AdditionalHeader3: string;

    AdditionalHeaderValue3: string;
}

export enum RequestedAuthType {

    DefaultAuth,

    SpecifiedCredentialsAuth,

    oAuth,
}

export interface EwsSession {

    SessionService: ExchangeService;

    SessionEwsEditorAppSettings: EwsEditorAppSettings;
}