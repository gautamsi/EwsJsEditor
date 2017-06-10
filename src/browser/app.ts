// import * as electron from "electron";
// declare var nodeRequire;
//const {ipcRenderer}: typeof electron = nodeRequire("electron");

import { ipcRenderer } from 'electron';
import { TreeModel } from "./models/TreeModel";

import { DialogService } from 'aurelia-dialog';
import { inject } from 'aurelia-framework';
import {PLATFORM  } from 'aurelia-pal';

//import { Prompt } from './prompt';

export class App {
  static inject = [PLATFORM]
  composeElement:string;
  constructor() {
    console.log(PLATFORM.location.hash);    
    this.composeElement = "./apps/" + (PLATFORM.location.hash.replace("#","") || "default");
  }
}
