const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

// var output = path.join(__dirname, "output");
// require('electron-reload')(output);

function isDev() {
  if (process.env.ELECTRON_ENV === "debug")
    return true;

  // if (process.mainModule == undefined)
  //   return true;

  // return process.mainModule.filename.indexOf('app.asar') === -1;
}

app.on('window-all-closed', function () {
  if (process.platform != 'darwin')
    app.quit();
});

app.on('ready', function () {
  var main_width = 800;
  var main_height = 600;

  var mainWindow = new BrowserWindow({
    width: main_width,
    height: main_height,
    frame: true
  });

  mainWindow.loadURL(isDev() ? 'http://localhost:9000/' : 'file://' + __dirname + '/index.html');
  //mainWindow.loadURL('http://localhost:9000');

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
});

ipcMain.on("openX", _ => {
  var main_width = 800;
  var main_height = 600;

  var childWindow = new BrowserWindow({
    width: main_width,
    height: main_height,
    frame: true, webPreferences:{webSecurity: "off"}
  });
  childWindow  

  childWindow.loadURL(isDev() ? 'http://localhost:9000/windows/index2.html' : 'file://' + __dirname + '/index2.html');
  //childWindow.loadURL('http://localhost:9000/index2.html');

  childWindow.on('closed', function () {
    childWindow = null;
  });
});