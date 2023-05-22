const { getCurrentWindow, getGlobal } = require("@electron/remote")
let sharedObject = getGlobal("sharedObject");


export function useWindow() {
    //当前窗口
    let currentWindow = getCurrentWindow();
    //窗口id
    const windowId = currentWindow.webContents.id
    //获取窗口title
    const getWindowTitle = () => {
        for (let f in sharedObject) {
            if (sharedObject[f] == windowId) {
                return f;
            }
        }
    }

    //最小化
    const minimize = () => {
        currentWindow.minimize();
    }
    //最大化
    const maximize = () => {
        currentWindow.maximize();
    }
    //还原
    const restore = () => {
        currentWindow.restore();
    }
    //取消最大化
    const unmaximize = () => {
        currentWindow.unmaximize();
    }

    //关闭
    const close = () => {
        currentWindow.close();
    }

    //全屏
    const fullscreen = () => {
        currentWindow.fullscreen();
    }

    //修改位置
    const changePosition = (pos) => {
        currentWindow.setBounds({ x: pos.x, y: pos.y })
    }


    return { currentWindow, windowId, getWindowTitle, minimize, maximize, restore, unmaximize, close, fullscreen, changePosition }
}