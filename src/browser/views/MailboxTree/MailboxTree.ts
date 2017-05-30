import { customElement, bindable } from 'aurelia-framework';
import { TreeModel } from "../../models/TreeModel";

//@customElement(=)
export class MailboxTree {
    treeModel = new TreeModel("root");
    @bindable selectedTreeNode:TreeModel = this.treeModel;
    
    selectedTreeNodeChanged(newTreeModel){
        console.log(newTreeModel);
    }
  constructor(){
    //ipcRenderer.send("open");
    this.treeModel.canClose = false;
    this.treeModel.childrens.push(new TreeModel("Node 1"));
    this.treeModel.childrens.push(new TreeModel("Node 2"));
    this.treeModel.childrens.push(new TreeModel("Node 3"));
    this.treeModel.childrens.push(new TreeModel("Node 4"));
    let chTree = new TreeModel(this.treeModel);
    chTree.display = "Node 5";
    this.treeModel.childrens.push(chTree);
  }
}