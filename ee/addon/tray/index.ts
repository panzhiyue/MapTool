import * as electronPath from "../../../electron/utils/path"
const { Tray, Menu, shell, app } = require('electron');
const path = require('path');

/**
 * 托盘插件
 * @class
 */
class TrayAddon {

    public tray: any;
    public mainWindow: any;
    constructor(mainWindow: any) {
        this.tray = null;
        this.mainWindow = mainWindow;
    }

    /**
     * 创建托盘
     */
    create() {
        // 开发环境，代码热更新开启时，会导致托盘中有残影
        // if (Ps.isDev() && Ps.isHotReload()) return;

        // Log.info('[addon:tray] load');

        const cfg = {
            icon: "logo.png",
            title: "管理工具"
        };

        // 托盘图标
        let iconPath = path.join(electronPath.getAppPath(), cfg.icon);

        // 托盘菜单功能列表
        let trayMenuTemplate = [
            {
                label: '显示',
                click: () => {
                    this.mainWindow.show();
                }
            },
            {
                label: '退出',
                click: () => {
                    app.quit();
                    app.exit()
                }
            }
        ]

        // 点击关闭，最小化到托盘
        this.mainWindow.on('close', (event) => {
            // const extraObj = Electron.extra;
            // if (extraObj.closeWindow == true) {
            //     return;
            // }

            this.mainWindow.hide();
            event.preventDefault();
        });

        // 实例化托盘
        this.tray = new Tray(iconPath);
        this.tray.setToolTip(cfg.title);
        const contextMenu = Menu.buildFromTemplate(trayMenuTemplate);
        this.tray.setContextMenu(contextMenu);

        this.tray.on("double-click", () => {
            this.mainWindow.show();
        });

        // 使用默认浏览器打开链接
        this.mainWindow.webContents.setWindowOpenHandler(({ url }) => {
            shell.openExternal(url);
            return { action: 'deny' }
        })
    }
}

TrayAddon.toString = () => '[class TrayAddon]';
export default TrayAddon;