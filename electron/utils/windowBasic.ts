import { ipcMain } from "electron";

/**
 * 窗口事件监听
 * @param {Object} window 指定窗口对象
 * @param {String} name 窗口名称
 */
export function windowListener(window, name) {
    //窗口最小化
    ipcMain.addListener(`${name}-minimize`, (event, arg) => {
        window.minimize();
        event.sender.send(`${name}-minimize`);
    })

    //窗口最大化
    ipcMain.addListener(`${name}-maximize`, (event, arg) => {
        window.maximize()
        event.sender.send(`${name}-maximize`);
    })

    //将最小化的窗口恢复为之前的状态.
    ipcMain.addListener(`${name}-restore`, (event, arg) => {
        window.restore()
        event.sender.send(`${name}-restore`);
    })

    //取消窗口最大化.
    ipcMain.addListener(`${name}-unmaximize`, (event, arg) => {
        window.unmaximize()
        event.sender.send(`${name}-unmaximize`);
    })

    //尝试关闭窗口，这与用户点击关闭按钮的效果一样. 虽然网页可能会取消关闭
    ipcMain.addListener(`${name}-close`, (event, arg) => {
        window.close()
        event.sender.send(`${name}-close`);
    })

    //窗口全屏
    ipcMain.addListener(`${name}-fullscreen`, (event, arg) => {
        window.setFullScreen(true)
        event.sender.send(`${name}-fullscreen`);
    })
}