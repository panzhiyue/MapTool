const { getCurrentWindow, getGlobal } = require("@electron/remote")
let sharedObject = getGlobal("sharedObject");



export function useWindow() {
    let currentWindow = getCurrentWindow();
    const windowId = currentWindow.webContents.id

    const getWindowTitle = () => {
        for (let f in sharedObject) {
            if (sharedObject[f] == windowId) {
                return f;
            }
        }
    }


    const minimize = () => {
        currentWindow.minimize();
    }

    const maximize = () => {
        currentWindow.maximize();
    }

    const restore = () => {
        currentWindow.restore();
    }

    const unmaximize = () => {
        currentWindow.unmaximize();
    }

    const close = () => {
        currentWindow.close();
    }

    const fullscreen = () => {
        currentWindow.fullscreen();
    }

    const changePosition = (pos) => {
        currentWindow.setBounds({ x: pos.x, y: pos.y })
    }


    return { currentWindow, windowId, getWindowTitle, minimize, maximize, restore, unmaximize, close, fullscreen, changePosition }
}