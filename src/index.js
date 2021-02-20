const {
  app,
  ipcMain,
  BrowserWindow,
  globalShortcut
} = require('electron');
const os = require('os');
const si = require('systeminformation');
const us = require('underscore'); 
//const jsonServer = require('json-server')
//var sv = jsonServer.create();
//var router = jsonServer.router(path.join(__dirname, 'database.json'));
//const middlewares = jsonServer.defaults();
//const excel = require('node-excel-export');
//const fs = require('fs');
//var splash;

const path = require('path');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    frame: false,
    width: 1000,
    height: 700,
    webPreferences: {
      nodeIntegration: false,
      preload: path.join(__dirname, 'preload.js'),
      webviewTag:true
    }
  });
  globalShortcut.register('CommandOrControl+Shift+I', () => {
    mainWindow.webContents.openDevTools();
  })
 
  //mainWindow.maximize();
 
  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));
 
  // Open the DevTools.
  //mainWindow.webContents.openDevTools();
  mainWindow.removeMenu();
  
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.

app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
ipcMain.on('close-app', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

ipcMain.on('system-info', function (event) {
  si.currentLoad()
  .then(function(data){
    si.processes()
    .then(function(pdata){
      var sysinfo = {};
      sysinfo.OS = os.type();
      sysinfo.version = os.version();
      sysinfo.hostname = os.hostname();
      sysinfo.home = os.homedir();
      sysinfo.freeMem = os.freemem();
      sysinfo.totalMem = os.totalmem();
      sysinfo.cpus = os.cpus();
      sysinfo.network = os.networkInterfaces();
      for (let index = 0; index < sysinfo.cpus.length; index++) {
        sysinfo.cpus[index]['load'] = data.cpus[index].load;
      } 
      sysinfo.processesCpu = us.sortBy(pdata.list,function(pc){
        return Number(pc.pcpu);
      });
      sysinfo.processesCpu = us.first(sysinfo.processesCpu.reverse(),5);
      sysinfo.processesMem = us.sortBy(pdata.list,'pmem');
      sysinfo.processesMem = us.first(sysinfo.processesMem.reverse(),5);
      
      event.reply('system-info-response',sysinfo);
    }).catch(function(err){
      console.error(err);
    });
    
  
  })
  .catch(function(err){
    console.error(err);
  });
 
});