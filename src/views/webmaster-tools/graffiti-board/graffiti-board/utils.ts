const getDom = (dom): any => {
    if (typeof dom === "string") {
        return document.getElementById(dom)
    } else if (dom instanceof HTMLElement) {
        return dom
    }
    return null
}
const isNull = function (s) { return s == undefined || typeof (s) == 'undefined' || s == null || s == 'null' || s === '' || s.length < 1 }  //是否为null或空或underfind
const isTure = function (s) { return s == true || s == 'true' }//是否为true
const hideDefRM = function () { document.oncontextmenu = function () { return false } };//屏蔽浏览器默认鼠标事件