import { IExportImageOptions } from "#/index";
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

    const exportImage = (options: IExportImageOptions) => {
        ipcRenderer.sendTo(sharedObject.Main, "exportImage", options);
    }

    const exportVector = (options: IExportVectorOptions) => {
        ipcRenderer.sendTo(sharedObject.Main, "exportVector", options);
    }

    const exportAttributeTable = (options: IExportAttributeTableOptions) => {
        console.log(11);
        ipcRenderer.sendTo(sharedObject.Main, "exportAttributeTable", options);
    }



    return { refreshLayerInfos, refreshMapLayerInfos, exportImage,exportVector, exportAttributeTable }
}