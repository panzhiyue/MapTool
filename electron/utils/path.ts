import { app } from "electron"

/**
 * 返回当前应用所在的文件路径。
 * @returns 当前应用所在的文件路径。
 */
export function getAppPath() {
    return app.getAppPath();
}

/**
 * 返回用户的 home 文件夹（主目录）
 * @returns  
 */
export function getHomePath() {
    return app.getPath("home")
}

/**
 * 返回当前用户的应用数据文件夹，默认对应：
 *  %APPDATA% Windows 中
 *  $XDG_CONFIG_HOME or ~/.config Linux 中
 *  ~/Library/Application Support OS X 中
 * @returns 
 */
export function getAppDataPath() {
    return app.getPath("appData")
}

/**
 * 储存你应用程序设置文件的文件夹，默认是 appData 文件夹附加应用的名称
 * @returns  
 */
 export function getUserDataPath() {
    return app.getPath("userData")
}

/**
 * 返回临时文件夹
 * @returns  
 */
export function getTempPath() {
    return app.getPath("temp")
}

/**
 * 返回当前的可执行文件
 * @returns  
 */
 export function getExePath() {
    return app.getPath("exe")
}


/**
 * libchromiumcontent 库
 * @returns  
 */
 export function getModulePath() {
    return app.getPath("module")
}


/**
 * 当前用户的桌面文件夹
 * @returns  
 */
 export function getDesktopPath() {
    return app.getPath("desktop")
}


/**
 * 用户文档目录的路径
 * @returns  
 */
 export function getDocumentsPath() {
    return app.getPath("documents")
}


/**
 * 用户下载目录的路径
 * @returns  
 */
 export function getDownloadsPath() {
    return app.getPath("downloads")
}


/**
 * 用户音乐目录的路径.
 * @returns  
 */
 export function getMusicPath() {
    return app.getPath("music")
}


/**
 * 用户图片目录的路径.
 * @returns  
 */
 export function getPicturesPath() {
    return app.getPath("pictures")
}


/**
 * 用户视频目录的路径.
 * @returns  
 */
 export function getVideosPath() {
    return app.getPath("videos")
}