const remote = require("@electron/remote")

export const getIdByTitle = (title) => {
    const allWindows = remote.BrowserWindow.getAllWindows()
    for (let i = 0; i < allWindows.length; i++) {
        let item = allWindows[i];
        if (item.webContents.getTitle() == title) {
            return item.webContents.id;
        }
    }
}