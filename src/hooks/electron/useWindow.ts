const { getCurrentWindow } = require("@electron/remote")

export function useWindow() {
    let currentWindow = getCurrentWindow();

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
    return { currentWindow, minimize, maximize, restore, unmaximize, close, fullscreen, changePosition }
}