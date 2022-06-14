const { app, BrowserWindow, ipcMain, dialog } = require("electron")
const path = require("path")

   // --- initialize app

const createWindow = () => {
   var index = path.join(__dirname, "renderer", "index.html")
   var preload = path.join(__dirname, "renderer", "preload.js")
   var webPreferences = { preload, spellcheck: false }
   var mainWindow = new BrowserWindow({ webPreferences })
   mainWindow.loadFile(index)
}

const handleFileOpen = async (event, ...args) => {
   var { canceled, filePaths } = await dialog.showOpenDialog()
   if (canceled)  return null
   else           return filePaths[0]
}

app.on("ready", (event) => {
   ipcMain.handle("dialog:openFile", handleFileOpen)
   createWindow()
})

   // --- for Unix-based OS

app.on("activate", (event) => {
   var windowsCounter = BrowserWindow.getAllWindows().length
   if (windowsCounter != 0)   /* do nothing */;
   else                       createWindow()
})

app.on("window-all-closed", (event) => {
   var hostOS = process.platform
   if (hostOS == "darwin")    /* do nothing */;
   else                       app.quit()
})
