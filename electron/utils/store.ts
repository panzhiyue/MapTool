import Store from "electron-store"
const store = new Store();
/**
 * 获取用户信息
 */
export function getUserInfo() {
    return store.get("userInfo")
}

/**
 * 设置用户信息
 * @param {Object} userInfo 用户信息
 */
export function setUserInfo(userInfo) {
    store.set("userInfo", userInfo)
}

