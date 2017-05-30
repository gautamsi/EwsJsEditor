import { Menu, MenuItem } from "electron";
export class MenuService {
    private _mainmenu: Electron.Menu = null;
    constructor() {
        this.install();
    }


    private install() {
        // Menus
		const menubar = new Menu();

		// Mac: Application
		// let macApplicationMenuItem: Electron.MenuItem;
		// if (isMacintosh) {
		// 	const applicationMenu = new Menu();
		// 	macApplicationMenuItem = new MenuItem({ label: product.nameShort, submenu: applicationMenu });
		// 	this.setMacApplicationMenu(applicationMenu);
		// }

		// File
		const fileMenu = new Menu();
		const fileMenuItem = new MenuItem({ label: "&&File", submenu: fileMenu });
		this.setFileMenu(fileMenu);

		// Edit
		const editMenu = new Menu();
		const editMenuItem = new MenuItem({ label: this.mnemonicLabel(nls.localize({ key: 'mEdit', comment: ['&& denotes a mnemonic'] }, "&&Edit")), submenu: editMenu });
		this.setEditMenu(editMenu);


    }

    private setFileMenu(fileMenu:Electron.Menu):void{
        
    }
}