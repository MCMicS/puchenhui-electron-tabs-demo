// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain, ipcRenderer} = require('electron')
const path = require('path')
let mainWindow
function createWindow() {
  mainWindow = new BrowserWindow({
    frame: process.platform === 'darwin',
    webPreferences: {
      webviewTag: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  mainWindow.maximize()
  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

ipcMain.on('window-min', function () {
  mainWindow.minimize();
})
ipcMain.on('window-max', function () {
  if (mainWindow.isMaximized()) {
      mainWindow.restore();
  } else {
      mainWindow.maximize();
  }
})
ipcMain.on('window-close', function (e) {
  // mainWindow.close()
  e.preventDefault();
  if (process.platform == 'darwin') {
      //  如果是mac系统
      mainWindow.minimize();
  } else if (process.platform == 'win32') {
      //  如果是win系统
      mainWindow.hide();
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
