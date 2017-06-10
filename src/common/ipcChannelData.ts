export type ipcChannelType = "ProcToMain" | "MainToProc" | "NewServiceDialogToProc" | "ProcToNewServiceDialog";


export const ipcChannels = {
    "ProcToMain": <ipcChannelType>"ProcToMain",
    "MainToProc": <ipcChannelType>"MainToProc",
    "NewServiceDialogToProc": <ipcChannelType>"NewServiceDialogToProc",
    "ProcToNewServiceDialog": <ipcChannelType>"ProcToNewServiceDialog",
}

export type ipcActionType = "OpenWindow" | "CloseWindow" | "AddPage" | "RemovePage" | "NewExchangeServiceRequest" | "NewExchangeServiceResponse";

export const ipcActions = {
    "OpenWindow": <ipcActionType>"OpenWindow",
    "CloseWindow": <ipcActionType>"CloseWindow",
    "AddPage": <ipcActionType>"AddPage",
    "RemovePage": <ipcActionType>"RemovePage",
    "NewExchangeServiceRequest": <ipcActionType>"NewExchangeServiceRequest",
    "NewExchangeServiceResponse": <ipcActionType>"NewExchangeServiceResponse",
}