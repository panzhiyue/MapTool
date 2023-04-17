import PATH from "path"
const remote = require('@electron/remote'); //1

/**
 * 获取静态文件夹路径
 * @returns {string}
 */
export function getStaticPath() {
    console.log(process.cwd());
    return PATH.join(process.cwd(), "static")
}


/**
 * 获取db数据库文件路径
 * @returns {string}
 */
export function getDbPath() {
    return PATH.join(getStaticPath(), "sqlite.db");
}

/**
 * 返回当前应用所在的文件路径。
 * @returns 当前应用所在的文件路径。
 */
export function getAppPath() {
    return PATH.dirname(remote.app.getAppPath())
}