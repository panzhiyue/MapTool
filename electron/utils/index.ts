import { app } from "electron"

/**
 * 返回加载应用程序的版本。如果应用程序的 package.json 文件中没有写版本号， 将会返回当前包或者可执行文件的版本。
 * @returns 
 */
export function getVersion() {
    return app.getVersion();
}

/**
 * 返回当前应用程序的 package.json 文件中的名称。
 * 由于 npm 的命名规则，通常 name 字段是一个短的小写字符串。
 * 但是应用名的完整名称通常是首字母大写的，你应该单独使用一个 productName 字段，用于表示你的应用程序的完整名称。Electron 会优先使用这个字段作为应用名。
 * @returns 
 */
export function getName(){
    return app.getName();
}

/**
 * 重写当前应用的名字
 * @param {String} name 
 */
export function setName(name){
    app.setName(name);
}