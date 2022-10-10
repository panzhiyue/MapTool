
import { BrowserWindow } from "electron"
/**
 * 根据title获取window的id
 */
export const getWindowIdByTitle = (title) => {
    return global.sharedObject[title];
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
