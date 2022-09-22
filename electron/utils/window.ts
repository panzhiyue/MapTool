const remote = require("@electron/remote")

export const getIdByTitle = (title) => {
    const allWindows = remote.BrowserWindow.getAllWindows()
    console.log(allWindows);
    for (let i = 0; i < allWindows.length; i++) {
        let item = allWindows[i];
        console.log(item.webContents.getTitle(),title);
        if (item.webContents.getTitle() == title) {
            console.log(item.webContents.id);
            return item.webContents.id;
        }
    }
}