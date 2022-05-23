const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const path = require('path')

   // --- display main window

const createWindow = () => {
   var preload = path.join(__dirname, 'preload.js')
   var mainWindow = new BrowserWindow({
      frame: true,
      width: 800,
      height: 600,
      webPreferences: { preload }
   })
   mainWindow.loadFile('index.html')
}

app.on('ready', (event) => {
   var handleFileOpen = async (event, ...args) => {
      var { canceled, filePaths } = await dialog.showOpenDialog()
      if (canceled)  return null
      else           return filePaths[0]
   }
   ipcMain.handle('dialog:openFile', handleFileOpen)
   createWindow()
})

   // --- for unix-based OS

app.on('activate', (event) => {
   var windowsCounter = BrowserWindow.getAllWindows().length
   if (windowsCounter != 0)   /* do nothing */;
   else                       createWindow()
})

app.on('window-all-closed', (event) => {
   var hostOS = process.platform
   if (hostOS == 'darwin')    /* do nothing */;
   else                       app.quit()
})
