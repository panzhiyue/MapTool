import { app, BrowserWindow, ipcMain } from "electron";
import { join } from 'path'
import { windowListener } from "./listenCommonIpc";
const remote = require("@electron/remote/main") //1 


process.env.DIST = join(__dirname, '../..')
const indexHtml = join(process.env.DIST, 'index.html/#/addLayer')
const url = process.env.VITE_DEV_SERVER_URL as string + '#/addLayer'
const createAddLayerWindow = () => {
    const addLayerWindow = new BrowserWindow({
        title: 'AddLayerWindow',
        show: false,
        frame: false,
        resizable: false,
        width: 1024,
        height: 576,
        center: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            webSecurity: false,
        }
    })

    if (app.isPackaged) {
        addLayerWindow.loadFile(indexHtml)
    } else {
        addLayerWindow.loadURL(url)
        // Open devTool if the app is not packaged
        addLayerWindow.webContents.openDevTools()
    }
    remote.enable(addLayerWindow.webContents);
}



export const addLayerIpc = async () => {
    let addLayerWindow;
    // 展示战力分析窗口
    ipcMain.on("showAddLayer", async () => {
        addLayerWindow = await createAddLayerWindow();
    });
    windowListener(addLayerWindow, 'addLayer');
    // // 移动游戏历史窗口
    // ipcMain.on("move-match-history-window", (event, pos) => {
    //     addLayerWindow.setBounds({
    //         x: pos.x,
    //         y: pos.y,
    //         width: 1024,
    //         height: 576,
    //     });
    // });
    // // 最小化游戏历史窗口
    // ipcMain.on("match-history-window-min", () => {
    //     addLayerWindow.minimize();
    // });
    // // 关闭游戏历史窗口
    // ipcMain.on("close-match-history-window", () => {
    //     for (const currentWindow of BrowserWindow.getAllWindows()) {
    //         if (currentWindow.title === "MatchHistory") {
    //             currentWindow.close();
    //         }
    //     }
    // });
};
