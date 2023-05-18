
import { BrowserWindow } from "electron"
/**
 * 根据title获取window的id
 * @param title 窗口title
 * @returns 窗口id
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

/**
 * 根据窗口title获取窗口
 * @param title 窗口title
 * @returns 窗口对象
 */
export const getWindowByTitle = (title) => {
    let id = getWindowIdByTitle(title);
    return getWindowById(id);
}

/**
 * 根据窗口id获取窗口
 * @param id 窗口Id
 * @returns 窗口
 */
export const getWindowById = (id) => {
    const allWindows = BrowserWindow.getAllWindows()
    for (let i = 0; i < allWindows.length; i++) {
        let item = allWindows[i];
        if (item.webContents.id == id) {
            return item;
        }
    }
}
