import * as electron from "electron";
declare var nodeRequire;
const {ipcRenderer}: typeof electron = nodeRequire("electron");
export class App2 {
  message = 'Hello World!';
  constructor(){
  }
}
