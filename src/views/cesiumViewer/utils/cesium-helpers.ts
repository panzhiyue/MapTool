/**
 * 高度计算为层级
 * @param altitude 
 * @returns 
 */
export function heightToLevel(altitude: number) {
    // 粗略计算
    const A = 40487.57
    const B = 0.00007096758
    const C = 91610.74
    const D = -40467.74

    return Math.round(D + (A - D) / (1 + Math.pow(altitude / C, B)))
}

/**
 * 场景导出为png图片
 * @param scene 
 */
export const sceneToPng = (scene) => {
    let image = getSceneImageData(scene)

    let link = document.createElement("a");
    let blob = dataURLtoBlob(image);
    let objurl = URL.createObjectURL(blob);
    link.download = "scene.png";
    link.href = objurl;
    link.click();

}

export const getSceneImageData = (scene) => {
    let canvas = scene.canvas;
    let image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    return image
}

/**
 * DataURL转为Blob
 */
const dataURLtoBlob = (dataurl) => {
    let arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
}