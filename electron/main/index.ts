import { app, BrowserWindow, shell, ipcMain, Menu } from 'electron'
import { release } from 'os'
import { join } from 'path'
import { windowListener, commonListener } from "../utils/listenCommonIpc"
import electronDebug from 'electron-debug'
import { getWindowByTitle } from '../utils/window'

electronDebug({ showDevTools: false })
const remote = require("@electron/remote/main") //1 
remote.initialize()//2
let installExtension = require('electron-devtools-installer')



// Disable GPU Acceleration for Windows 7
if (release().startsWith('6.1')) app.disableHardwareAcceleration()

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName())

if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}

// Remove electron security warnings
// This warning only shows in development mode
// Read more on https://www.electronjs.org/docs/latest/tutorial/security
// process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

process.env.DIST = join(__dirname, '../..')
process.env.PUBLIC = app.isPackaged ? process.env.DIST : join(process.env.DIST, '../public')

let win: BrowserWindow | null = null
// Here, you can also use other preload
const preload = join(__dirname, '../preload/index.js')
const url = process.env.VITE_DEV_SERVER_URL as string
const indexHtml = join(process.env.DIST, 'index.html')

async function createWindow() {
  win = new BrowserWindow({
    title: 'Main',

    icon: join(process.env.PUBLIC, 'favicon.ico'),
    frame: false,
    webPreferences: {
      preload,

      // Warning: Enable nodeIntegration and disable contextIsolation is not secure in production
      // Consider using contextBridge.exposeInMainWorld
      // Read more on https://www.electronjs.org/docs/latest/tutorial/context-isolation
      nodeIntegration: true,
      contextIsolation: false,
    },
  })
  global.sharedObject = {
    Main: win.webContents.id
  }
  if (app.isPackaged) {
    win.loadFile(indexHtml)
    // // 打开开发工具
    win.webContents.openDevTools();
  } else {
    win.loadURL(url)
    // Open devTool if the app is not packaged
    // win.webContents.openDevTools()
  }

  // Test actively push message to the Electron-Renderer
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', new Date().toLocaleString())
  })

  // Make all links open with the browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:')) shell.openExternal(url)
    return { action: 'deny' }
  })
  Menu.setApplicationMenu(null)
  windowListener(win, "Main");
  remote.enable(win.webContents);

}

app.whenReady().then(() => {
  installExtension.default(installExtension.VUEJS_DEVTOOLS)
    .then(() => { })
    .catch(err => {
      console.log('Unable to install `vue-devtools`: \n', err)
    })
  createWindow();
  commonListener();
})

app.on('window-all-closed', () => {
  win = null
  if (process.platform !== 'darwin') app.quit()
})

app.on('second-instance', () => {
  if (win) {
    // Focus on the main window if the user tried to open another
    if (win.isMinimized()) win.restore()
    win.focus()
  }
})

app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows()
  if (allWindows.length) {
    allWindows[0].focus()
  } else {
    createWindow()
  }
})

// new window example arg: new windows url
ipcMain.on('open-win', (event, windowName, arg, opt_options, webPreferences) => {
  let options = Object.assign({
    title: windowName,
    // parent: options.parent ? getWindowByTitle(options.parent) : null,
    webPreferences: {
      ...webPreferences,
      // preload,
      nodeIntegration: true,
      contextIsolation: false,

    },
  }, opt_options)

  if (options.parent) {
    options.parent = getWindowByTitle(options.parent)
  }
  const childWindow = new BrowserWindow(options)
  if (app.isPackaged) {
    childWindow.loadFile(indexHtml, { hash: arg })
  } else {
    childWindow.loadURL(`${url}#${arg}`)
  }

  // 保存win2窗口的 id
  global.sharedObject[windowName] = childWindow.webContents.id

  windowListener(childWindow, windowName);

  remote.enable(childWindow.webContents);
})
