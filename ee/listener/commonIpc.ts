import { app, ipcMain } from "electron";

/**
 * 窗口事件监听
 * @param {Object} window 指定窗口对象
 * @param {String} name 窗口名称
 */
export function windowListener(window, name) {

    //窗口最小化
    ipcMain.removeAllListeners(`${name}-minimize`);
    ipcMain.addListener(`${name}-minimize`, (event, arg) => {
        window.minimize();
        event.sender.send(`${name}-minimize`);
    })

    //窗口最大化
    ipcMain.removeAllListeners(`${name}-maximize`);
    ipcMain.addListener(`${name}-maximize`, (event, arg) => {
        window.maximize()
        event.sender.send(`${name}-maximize`);
    })

    //将最小化的窗口恢复为之前的状态.
    ipcMain.removeAllListeners(`${name}-restore`);
    ipcMain.addListener(`${name}-restore`, (event, arg) => {
        window.restore()
        event.sender.send(`${name}-restore`);
    })

    //取消窗口最大化.
    ipcMain.removeAllListeners(`${name}-unmaximize`);
    ipcMain.addListener(`${name}-unmaximize`, (event, arg) => {
        window.unmaximize()
        event.sender.send(`${name}-unmaximize`);
    })

    //尝试关闭窗口，这与用户点击关闭按钮的效果一样. 虽然网页可能会取消关闭
    ipcMain.removeAllListeners(`${name}-close`);
    ipcMain.addListener(`${name}-close`, (event, arg) => {
        window.close()
        event.sender.send(`${name}-close`);
    })

    //窗口全屏
    ipcMain.removeAllListeners(`${name}-fullscreen`);
    ipcMain.addListener(`${name}-fullscreen`, (event, arg) => {
        window.setFullScreen(true)
        event.sender.send(`${name}-fullscreen`);
    })

    // //窗口隐藏
    // ipcMain.removeAllListeners(`${name}-hide`);
    // ipcMain.addListener(`${name}-hide`, (event, arg) => {
    //     window.hide()
    //     event.sender.send(`${name}-hide`);
    // })

    // //窗口显示
    // ipcMain.removeAllListeners(`${name}-show`);
    // ipcMain.addListener(`${name}-show`, (event, arg) => {
    //     window.show()
    //     event.sender.send(`${name}-show`);
    // })
}
