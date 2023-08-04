import PATH from "path"
const remote = require('@electron/remote'); //1

/**
 * 获取静态文件夹路径
 * @returns {string}
 */
export function getStaticPath() {
    return PATH.join(process.cwd(), "static")
}


/**
 * 获取db数据库文件路径
 * @returns {string}
 * @examples
 * getDbPath('MapTool.db')
 */
export function getDbPath(name: string) {
    console.log(remote.app.getPath('userData'));
    // return PATH.join(getStaticPath(), "sqlite.db");
    return PATH.join(remote.app.getPath('userData'), name);
}

/**
 * 返回当前应用所在的文件路径。
 * @returns 当前应用所在的文件路径。
 */
export function getAppPath() {
    return PATH.dirname(remote.app.getAppPath())
}