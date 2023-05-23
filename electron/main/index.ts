import { app, BrowserWindow, shell, ipcMain, Menu } from 'electron'
import { release } from 'os'
import { join } from 'path'
import { windowListener } from "../../ee/listener/commonIpc"
import electronDebug from 'electron-debug'
import { getWindowByTitle } from '../utils/window'
import Application from "../../ee/core/Application"
import config from "../../ee/config"
const remote = require("@electron/remote/main") //1 

electronDebug({ showDevTools: false })

// Disable GPU Acceleration for Windows 7
if (release().startsWith('6.1')) app.disableHardwareAcceleration()

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName())
let p = new Application(config);


// Remove electron security warnings
// This warning only shows in development mode
// Read more on https://www.electronjs.org/docs/latest/tutorial/security
// process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

process.env.DIST = join(__dirname, '../..')
process.env.PUBLIC = app.isPackaged ? process.env.DIST : join(process.env.DIST, '../public')


const url = process.env.VITE_DEV_SERVER_URL as string
const indexHtml = join(process.env.DIST, 'index.html')
/**
 * 创建新窗口
 */
ipcMain.on('open-win', (event, windowName, arg, opt_options, webPreferences, close = false) => {

  let win = getWindowByTitle(windowName)
  if (win) {
    win.show();
  } else {



    let options = Object.assign({
      title: windowName,
      icon: join(process.env.PUBLIC, 'logo.png'),
      // parent: options.parent ? getWindowByTitle(options.parent) : null,
      webPreferences: {
        ...webPreferences,

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

    //隐藏窗口不关闭
    if (close == false) {
      childWindow.on("close", (event) => {
        childWindow.hide();
        event.preventDefault();
      });
    }

    // 保存win2窗口的 id
    global.sharedObject[windowName] = childWindow.webContents.id

    windowListener(childWindow, windowName);

    remote.enable(childWindow.webContents);
  }
})
