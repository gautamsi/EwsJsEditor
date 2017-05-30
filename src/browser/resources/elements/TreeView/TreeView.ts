import { customElement, bindable, computedFrom } from 'aurelia-framework';
import { TreeModel } from "../../../models/TreeModel";

@customElement("tree-view")
export class TreeView {
    @bindable treeModel: TreeModel;
    @bindable selectedTreeNode: TreeModel;
    @computedFrom("selectedTreeNode")
    get selected():boolean {
        return this.treeModel == this.selectedTreeNode;
    }
    get hasChild(): boolean {
        return this.treeModel.hasChild;
    }
    attached() {
        if (!this.treeModel) {
            this.treeModel = new TreeModel();
            this.treeModel.display = "sample Tree"
        }
    }

    selectNode(element){
        console.log(element);
        this.selectedTreeNode = this.treeModel;
    }
}