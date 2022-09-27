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
    return {refreshLayerInfos,refreshMapLayerInfos}
}