
import { BrowserWindow, app, shell, ipcMain, Menu } from "electron"
import { join } from 'path'
import TrayAddon from "../../ee/addon/tray/index"
const remote = require("@electron/remote/main") //1 
remote.initialize()//2
import { windowListener } from "../listener/commonIpc"
let installExtension = require('electron-devtools-installer')
/**
 * 
 */
class Application {
    public mainWindow: BrowserWindow;
    public addons: {
        tray?: TrayAddon
    }
    public config: any;
    constructor(config) {
        this.addons = {};
        this.config = config;
        this.initialize();
    }

    /**
     * 初始化
     */
    async initialize() {
        await this.createElectronApp();
    }

    /**
     * 创建electron应用
     */
    async createElectronApp() {
        //限制应用多开
        const gotTheLock = app.requestSingleInstanceLock();
        if (!gotTheLock) {
            await this.appQuit();
            return;
        }

        app.on('second-instance', (event) => {
            this.restoreMainWindow();
        })

        app.whenReady().then(() => {
            installExtension.default(installExtension.VUEJS_DEVTOOLS)
                .then(() => { })
                .catch(err => {
                    console.log('Unable to install `vue-devtools`: \n', err)
                })
            this.createWindow();
            app.on('activate', () => {
                this.restoreMainWindow();
            })
        })

        app.on('window-all-closed', () => {
            if (process.platform !== 'darwin') {
                //   Log.coreLogger.info('[ee-core] [lib/eeApp] window-all-closed quit');
                this.appQuit();
            }
        })

        app.on('before-quit', () => {
            // Electron.extra.closeWindow = true;
        })

        await this.electronAppReady();


    }

    /**
     * 创建应用主窗口
     */
    async createWindow() {

        // 初始化一个主窗口
        this.mainWindow = this.getMainWindow();

        await this.windowReady();

        await this._loderAddons();

        await this._loderPreload();

        this.selectAppType();
    }

    /**
     * 
     */
    getMainWindow() {
        let preload = join(__dirname, '../preload/index.js')
        let win = new BrowserWindow({
            title: '地图管理工具',

            icon: 'logo.png',
            frame: false,
            // fullscreen: true,
            width: 1024,
            height: 580,
            minWidth: 1024,
            minHeight: 580,
            resizable: true,
            show: false,
            webPreferences: {
                preload,
                webSecurity: true,
                // Warning: Enable nodeIntegration and disable contextIsolation is not secure in production
                // Consider using contextBridge.exposeInMainWorld
                // Read more on https://www.electronjs.org/docs/latest/tutorial/context-isolation
                nodeIntegration: true,
                contextIsolation: false,

            },
        })
        win.once('ready-to-show', () => {
            win.show();
        })
        global.sharedObject = {
            Main: win.webContents.id
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
        return win;
    }

    /**
     * 预加载模块
     */
    async _loderPreload() {
        // join(__dirname, '../preload/index.js'),
        //  let filepath = this.loader.resolveModule(path.join(this.config.baseDir, 'preload', 'index'));
        // if (!filepath) return;
        // const fileObj = this.loader.loadFile(filepath);
        // if (is.function(fileObj) && !is.generatorFunction(fileObj) && !is.asyncFunction(fileObj)) {
        //     fileObj();
        // } else if (is.asyncFunction(fileObj)) {
        //     await fileObj();
        // }
    }

    /**
   * 加载插件
   */
    async _loderAddons() {
        if (this.config.tray && this.config.tray.enable) {
            this.addons.tray = new TrayAddon(this.mainWindow);
            this.addons.tray.create();
        }

    }

    /**
     * electron app已经准备好，主窗口还未创建
     */
    async electronAppReady() {
        // do some things
    }

    /**
     * 主应用窗口已经创建
     */
    async windowReady() {
        // do some things
    }

    /**
     * 还原窗口
     */
    restoreMainWindow() {
        if (this.mainWindow) {
            if (this.mainWindow.isMinimized()) {
                this.mainWindow.restore();
            }
            this.mainWindow.show();
            this.mainWindow.focus();
        }
    }

    /**
     * electron app退出
     */
    async appQuit() {
        await this.beforeClose();
        app.quit();
        process.exit(0)
    }

    /**
     * app关闭之前
     */
    async beforeClose() {
        // do some things
    }

    /**
 * 应用类型 （远程、html、单页应用）
 */
    selectAppType() {
        const url = process.env.VITE_DEV_SERVER_URL as string
        const indexHtml = join(process.env.DIST, 'index.html')
        if (app.isPackaged) {
            this.mainWindow.loadFile(indexHtml)
            // 打开开发工具
            this.mainWindow.webContents.openDevTools();
        } else {
            this.mainWindow.loadURL(url)
            // Open devTool if the app is not packaged
            this.mainWindow.webContents.openDevTools()
        }
    }
}

export default Application;