
import * as electron from "electron";
declare var nodeRequire;
const { ipcRenderer }: typeof electron = nodeRequire("electron");

import { ChromeTabs } from "../models/ChromeTabsController";

import * as $ from 'jquery';
import 'kendo-ui-core/js/kendo.tabstrip';
import 'kendo-ui-core/js/kendo.window';
import 'kendo-ui-core/js/kendo.splitter';

import { BindingEngine } from "aurelia-framework";
import { IPCBroker } from "../models/ipcBroker";
import { ipcChannels } from "../../common/ipcChannelData";

export class App2 {
    myTabs: any[];
    myModel: any;
    message = 'Hello World!';
    private tabStrip: kendo.ui.TabStrip;
    private window: kendo.ui.Window;
    private winVM = null;
    private chtab: any;
    chromeTabs: ChromeTabs;
    static inject = [BindingEngine]
    constructor(public bindingEngine: BindingEngine) {
        this.chromeTabs = new ChromeTabs();
        this.myModel = { target: 'World' };
        this.myTabs = [
            { id: 'defaulttab', label: 'Home', active: true, tab: "browser/views/MailboxTree/MailboxTree", canClose: false },
            { id: 'tab2', label: 'Props', tab: "browser/views/PropertyTable/PropertyTable" },
            { id: 'tab3', label: 'Options', tab: "browser/apps/options" }
        ];
        this.bindingEngine.collectionObserver(this.myTabs).subscribe(this.myTabChaged)
    }
    i: number = 0;
    id: number = 4
    opendlg() {

        this.tabStrip.append({
            text: "tab" + this.id + '<i show.bind="tab.canClose === undefined? true : tab.canClose" class="glyphicon glyphicon-remove-sign au-target" style="cursor: pointer;font-size:smaller" click.delegate="tabClose(tab.id)" au-target-id="27"></i>',
            encoded: false,
            content: '<div><mailbox-tree></mailbox-tree></div>'
            //content: '<compose view-model.bind="myTabs[2].tab"></compose>'
        });

        this.myTabs.push({ id: 'tab' + this.id, label: 'Options' + this.id, tab: "browser/apps/options" })
        this.id++;
        //this.winVM = "browser/apps/options";
        //this.window.open();


    }
    tabClose(tabId) {
        console.log(tabId);
        var tab = this.myTabs.find(x => x.id === tabId);
        this.myTabs.splice(this.myTabs.indexOf(tab), 1);

    }
    attached() {
        console.log("attaching - in default");
        console.log(this.chtab);

        IPCBroker.subscrible(ipcChannels.MainToProc, (event, data) => {
            this.winVM = `browser/apps/${data.data}/${data.data}`;
            console.log(event);
            console.log(data.action + " : " + data.data);
            this.window.open();
            this.window.center();
        });

        // this.tabStrip.activateTab($(this.tabStrip.tabGroup.children()[0]));
    }

    myTabChaged(changeRecords: any) {
        //debugger;
        console.log(changeRecords);
    }



}
