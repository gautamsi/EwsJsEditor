export class TreeModel {
    display: string = null;
    id: any = null;
    childrens: TreeModel[] = []
    isOpen: boolean = false;
    get hasChild(): boolean {
        return this.childrens && this.childrens.length > 0;
    }
    private _canClose:boolean = true;
    get canClose(){
        return this._canClose;
    }
    set canClose(value){
            this._canClose = value;
            if(!value){
                this.isOpen = !value;
            }
    }
    constructor(display?: string, id?: string);
    constructor(treeModel: TreeModel);
    constructor(displayOrModel?: string | TreeModel, id?: string) {
        if (displayOrModel instanceof TreeModel) {
            this.display = displayOrModel.display;
            this.id = displayOrModel.id;
            if (displayOrModel.hasChild) {
                displayOrModel.childrens.forEach(c => this.childrens.push(new TreeModel(c)));
            }
        } else {
            this.display = displayOrModel;
            this.id = id;
        }
    }
}