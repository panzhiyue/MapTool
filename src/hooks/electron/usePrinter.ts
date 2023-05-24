import { join } from "path"
import { getAppPath } from "./usePath"
const { getCurrentWindow, BrowserWindow } = require("@electron/remote")

export function usePrinter() {

    //当前窗口
    let currentWindow = getCurrentWindow();
    /**
     * 获取打印机列表
     */
    const getPrinterList = () => {
        console.log(1212)
        //主线程获取打印机列表
        const list = currentWindow.webContents.getPrinters();

        return list;
    }

    /**
 * 打印
 */
    const print = (args: any, callback?: Function) => {
        const { view, deviceName } = args;
        let content = null;
        if (view.type == 'html') {
            content = join('file://', getAppPath(), view.content)
        } else {
            content = view.content;
        }

        // const addonWindow = null; //this.app.addon.window;
        let opt = {
            title: 'printer window',
            x: 10,
            y: 10,
            width: 980,
            height: 650
        }
        const name = 'window-printer';
        const printWindow = new BrowserWindow(opt) //addonWindow.create(name, opt);

        printWindow.loadURL(content);
        printWindow.webContents.once('did-finish-load', () => {
            // 页面完全加载完成后，开始打印
            printWindow.webContents.print({
                silent: false, // 显示打印对话框
                printBackground: true,
                deviceName,
            }, (success, failureReason) => {
                if (callback) {
                    callback({ success, failureReason });
                }
                printWindow.close();
            });
        });

        return true;
    }

    return { getPrinterList, print }
}
