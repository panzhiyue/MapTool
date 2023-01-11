
import { BrowserWindow } from "electron"
/**
 * 根据title获取window的id
 */
export const getWindowIdByTitle = (title) => {
    return global.sharedObject[title];
}

/**
 * 获取当前窗口的id
 * @param window 当前窗口
 * @returns 当前窗口的id
 */
export const getWindowId = (window) => {
    return window.webContents.id;
}

/**
 * 获取当前窗口的title
 * @param window 当前窗口
 * @returns 当前窗口的title
 */
export const getWindowTitle = (window) => {
    let id = getWindowId(window);
    for (let f in global.sharedObject) {
        if (global.sharedObject[f] == id) {
            return f;
        }
    }
}

export const getWindowByTitle = (title) => {
    let id = getWindowIdByTitle(title);
    return getWindowById(id);
}

export const getWindowById = (id) => {
    const allWindows = BrowserWindow.getAllWindows()
    for (let i = 0; i < allWindows.length; i++) {
        let item = allWindows[i];
        if (item.webContents.id == id) {
            return item;
        }
    }
}
