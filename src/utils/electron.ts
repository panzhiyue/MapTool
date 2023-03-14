import os from 'os';
import path from 'path';
import newGithubIssueUrl from 'new-github-issue-url';
import { AboutPanelOptionsOptions } from 'electron';
// import isDev from 'electron-is-dev';
export const api = require("@electron/remote")

const isEnvSet = 'ELECTRON_IS_DEV' in process.env;
const getFromEnv = Number.parseInt(process.env.ELECTRON_IS_DEV, 10) === 1;
const isDev = isEnvSet ? getFromEnv : !api.app.isPackaged;


export const is = {
    macos: process.platform === 'darwin',
    linux: process.platform === 'linux',
    windows: process.platform === 'win32',
    main: process.type === 'browser',
    renderer: process.type === 'renderer',
    usingAsar: 'electron' in process.versions && require.main && require.main.filename && require.main.filename.includes('app.asar'),
    development: isDev,
    macAppStore: process.mas === true,
    windowsStore: process.windowsStore === true
}

export const electronVersion = process.versions.electron || '0.0.0'

export const chromeVersion = process.versions.chrome.replace(/\.\d+$/, '');

// export const platform = object => {
//     let { platform } = process;

//     if (platform === 'darwin') {
//         platform = 'macos';
//     } else if (platform === 'win32') {
//         platform = 'windows';
//     }

//     const fn = platform in object ? object[platform] : object.default;

//     return typeof fn === 'function' ? fn() : fn;
// };

export const activeWindow = () => {
    return api.getCurrentWindow();
}

export const runJS = (code, win = activeWindow()) => win.webContents.executeJavaScript(code);

export const fixPathForAsarUnpack = path => exports.isUsingAsar ? path.replace('app.asar', 'app.asar.unpacked') : path;

export const enforceMacOSAppLocation = () => {
    if (is.development || !is.macos) {
        return;
    }

    if (api.app.isInApplicationsFolder()) {
        return;
    }

    const appName = 'name' in api.app ? api.app.name : api.app.getName();

    const clickedButtonIndex = api.dialog.showMessageBoxSync({
        type: 'error',
        message: 'Move to Applications folder?',
        detail: `${appName} must live in the Applications folder to be able to run correctly.`,
        buttons: [
            'Move to Applications folder',
            `Quit ${appName}`
        ],
        defaultId: 0,
        cancelId: 1
    });

    if (clickedButtonIndex === 1) {
        api.app.quit();
        return;
    }

    api.app.moveToApplicationsFolder({
        conflictHandler: conflict => {
            if (conflict === 'existsAndRunning') { // Can't replace the active version of the app
                api.dialog.showMessageBoxSync({
                    type: 'error',
                    message: `Another version of ${api.app.getName()} is currently running. Quit it, then launch this version of the app again.`,
                    buttons: [
                        'OK'
                    ]
                });

                api.app.quit();
            }

            return true;
        }
    });
};

export const menuBarHeight = () => is.macos ? api.screen.getPrimaryDisplay().workArea.y : 0;

export const getWindowBoundsCentered = options => {
    options = {
        window: activeWindow(),
        ...options
    };

    const currentDisplay = api.screen.getDisplayNearestPoint(api.screen.getCursorScreenPoint());
    const [width, height] = options.window.getSize();
    const windowSize = options.size || { width, height };
    const screenSize = options.useFullBounds ?
        currentDisplay.bounds :
        currentDisplay.workArea;
    const x = Math.floor(screenSize.x + ((screenSize.width / 2) - (windowSize.width / 2)));
    const y = Math.floor(((screenSize.height + screenSize.y) / 2) - (windowSize.height / 2));

    return {
        x,
        y,
        width: windowSize.width,
        height: windowSize.height
    };
};

export const centerWindow = options => {
    options = {
        window: activeWindow(),
        animated: false,
        ...options
    };

    const bounds = exports.getWindowBoundsCentered(options);
    options.window.setBounds(bounds, options.animated);
};

export const disableZoom = (win = activeWindow()) => {
    const { webContents } = win;

    const run = () => {
        webContents.setZoomFactor(1);
        webContents.setLayoutZoomLevelLimits(0, 0);
    };

    webContents.on('did-finish-load', run);
    run();
};

export const appLaunchTimestamp = Date.now();

export const darkMode = {
    get isEnabled() {
        if (!is.macos) {
            return false;
        }

        return api.nativeTheme.shouldUseDarkColors;
    },

    onChange(callback) {
        if (!is.macos) {
            return () => { };
        }

        const handler = () => {
            callback();
        };

        api.nativeTheme.on('updated', handler);

        return () => {
            api.nativeTheme.off(handler);
        };
    }
}

export const setContentSecurityPolicy = async (policy, options) => {
    await api.app.whenReady();

    if (!policy.split('\n').filter(line => line.trim()).every(line => line.endsWith(';'))) {
        throw new Error('Each line must end in a semicolon');
    }

    policy = policy.replace(/[\t\n]/g, '').trim();

    options = {
        session: api.session.defaultSession,
        ...options
    };

    options.session.webRequest.onHeadersReceived((details, callback) => {
        callback({
            responseHeaders: {
                ...details.responseHeaders,
                'Content-Security-Policy': [policy]
            }
        });
    });
};


export const openNewGitHubIssue = options => {
    const url = newGithubIssueUrl(options);
    api.shell.openExternal(url);
};

export const openUrlMenuItem = (options: {
    url?: string,
    click?: Function
} = {}) => {
    if (!options.url) {
        throw new Error('The `url` option is required');
    }

    const { url } = options;
    delete options.url;

    const click = (...args) => {
        if (options.click) {
            options.click(...args);
        }

        api.shell.openExternal(url);
    };

    return {
        ...options,
        click
    };
};

/**
 * 显示关于框
 */
export const showAboutWindow = (options: {
    icon?: string,  //应用程序图标的绝对路径。
    copyright?: string, //版权文本。
    text?: string,  //如果需要，一些额外的文字。版权信息如下所示。
    website?: string, //应用程序网站的 URL。
    title?: string  //标题
} = {}) => {

    const appName = api.app.getName();
    const appVersion = api.app.getVersion();

    const aboutPanelOptions: AboutPanelOptionsOptions = {
        applicationName: appName,
        applicationVersion: appVersion
    };

    if (options.icon) {
        aboutPanelOptions.iconPath = options.icon;
    }

    if (options.copyright) {
        aboutPanelOptions.copyright = options.copyright;
    }

    if (options.text) {
        aboutPanelOptions.copyright = (options.copyright || '') + '\n\n' + options.text;
    }

    if (options.website) {
        aboutPanelOptions.website = options.website;
    }

    api.app.setAboutPanelOptions(aboutPanelOptions);
    api.app.showAboutPanel();
};

// export const aboutMenuItem = (options = {}) => {
//     console.log(333);
//     options = {
//         title: 'About',
//         ...options
//     };

//     return {
//         label: `${options.title} ${api.app.getName()}`,
//         click() {
//             exports.showAboutWindow(options);
//         }
//     };
// };

export const debugInfo = () => `
${api.app.getName()} ${api.app.getVersion()}
Electron ${exports.electronVersion}
${process.platform} ${os.release()}
Locale: ${api.app.getLocale()}
`.trim();

export const appMenu = (menuItems = []) => {
    return {
        label: api.app.getName(),
        submenu: [
            {
                role: 'about'
            },
            {
                type: 'separator'
            },
            ...menuItems,
            {
                type: 'separator'
            },
            {
                role: 'services'
            },
            {
                type: 'separator'
            },
            {
                role: 'hide'
            },
            {
                role: 'hideothers'
            },
            {
                role: 'unhide'
            },
            {
                type: 'separator'
            },
            {
                role: 'quit'
            }
        ].filter(Boolean)
    };
};

export const openSystemPreferences = async (pane, section) => {
    if (is.macos) {
        await api.shell.openExternal(`x-apple.systempreferences:com.apple.preference.${pane}${section ? `?${section}` : ''}`);
    } else if (is.windows) {
        await api.shell.openExternal(`ms-settings:${pane}`);
    }
};