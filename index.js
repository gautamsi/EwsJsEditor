const { app, BrowserWindow, ipcMain, globalShortcut } = require('electron');
const { EwsService } = require("./src/electron/services/EwsService")
const { MenuService } = require("./src/electron/services/MenuService")
const { WindowService } = require("./src/electron/services/WindowService")
const path = require('path');

//var childWindow;


// var output = path.join(__dirname, "output");
// require('electron-reload')(output);

function isDev() {
  if (process.env.ELECTRON_ENV === "debug")
    return true;

  if (process.argv.indexOf("--dev") >= 0) {
    return true;
  }

  return false;
  // if (process.mainModule == undefined)
  //   return true;

  // return process.mainModule.filename.indexOf('app.asar') === -1;
}

app.on('window-all-closed', function () {
  if (process.platform != 'darwin')
    app.quit();
});

var mainWindow;
var baseUrl = WindowService.baseUrl = isDev() ? 'http://localhost:9000/' : 'file://' + __dirname + '/index.html'
app.on('ready', function () {
  var main_width = 800;
  var main_height = 600;

  //BrowserWindow.addDevToolsExtension("C:\\Users\\gs\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Extensions\\ofemgdknaajmpeoblfdjkenbpcfbdefg\\1.2.0_0");

  WindowService.RegisterShortcuts();
  EwsService.registerServiceIPC();

  mainWindow = WindowService.MainWindow = new BrowserWindow({
    width: main_width,
    height: main_height,
    frame: true
  });

  MenuService.Instance.install(mainWindow);
  
  mainWindow.openDevTools();
  console.log("isdev - " + isDev());
  mainWindow.loadURL(baseUrl);
  mainWindow.on('closed', function () {
    mainWindow = null;
    BrowserWindow.getAllWindows().forEach(_ => {
      if (_.isClosable()) {
        _.getChildWindows().forEach(__ => {
          __.close();
        })
        _.close();
      }
    });
  });
});

ipcMain.on("open", _ => {
  console.log("received open event");
  console.log(EwsService);
  console.log((new EwsService).NewExchangeService());

  //return;
  var main_width = 800;
  var main_height = 600;

  var childWindow = WindowService.createModalChildWindow(mainWindow, {
    width: main_width,
    height: main_height
  });

  childWindow.setMenu(null);

  childWindow.openDevTools();
  //childWindow.loadURL(isDev() ? 'http://localhost:9000/electron/index2.html' : 'file://' + __dirname + '/win/index2.html');
  //childWindow.loadURL(isDev() ? 'http://localhost:9000/src/electron/windows/index2.html' : 'file://' + __dirname + '/src/electron/windows/index2.html');
  //let url = isDev() ? 'http://localhost:9000/src/electron/windows/NewExchangeService.html' : 'file://' + __dirname + '/src/electron/windows/NewExchangeService.html';
  let url = isDev() ? 'http://localhost:9000/' : 'file://' + __dirname + '/index.html';
  url += "#ExchangeServiceParameters";
  childWindow.loadURL(url);
  //childWindow.loadURL('http://localhost:9000/index2.html');

  childWindow.on('closed', function () {
    // childWindow.setAlwaysOnTop(false);
    // childWindow.setParentWindow(null);    
    // childWindow.destroy();
    childWindow = null;
    MenuService.Instance.disableMenuItem("New Exchange Service...");
  });
});