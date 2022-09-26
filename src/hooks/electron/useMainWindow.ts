import { ipcRenderer } from "electron"
const remote = require("@electron/remote")
let sharedObject = remote.getGlobal("sharedObject");

export function useMainWindow() {
    const refreshLayerInfo = () => {
        ipcRenderer.sendTo(sharedObject.Main, "refresh-layerInfo");
    }
    return {refreshLayerInfo}
}