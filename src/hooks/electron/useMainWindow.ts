import { ipcRenderer } from "electron"
const remote = require("@electron/remote")
let sharedObject = remote.getGlobal("sharedObject");

export function useMainWindow() {
    const refreshLayerInfos = () => {
        ipcRenderer.sendTo(sharedObject.Main, "refresh-layerInfo");
    }

    const refreshMapLayerInfos = () => {
        ipcRenderer.sendTo(sharedObject.Main, "refresh-mapLayerInfo");
    }

    const exportImage = (options: IExportImageOptions): String => {
        ipcRenderer.sendTo(sharedObject.Main, "exportImage", options);
    }

    const getParams = (name) => {
        ipcRenderer.sendTo(sharedObject.Main, "getParams", name);
    }
    return { refreshLayerInfos, refreshMapLayerInfos, exportImage, getParams }
}