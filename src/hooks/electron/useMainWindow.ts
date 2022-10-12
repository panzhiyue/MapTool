import { IExportAttributeTableOptions, IExportImageOptions, IExportVectorOptions, IMeasureOptions, IPlotOptions } from "#/index";
import MeasureType from "@/enum/MeasureType";
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
        ipcRenderer.sendTo(sharedObject.Main, "exportAttributeTable", options);
    }

    const panTo = (lng: number, lat: number) => {
        ipcRenderer.sendTo(sharedObject.Main, "panTo", lng, lat);
    }

    const zoomTo = (lng: number, lat: number, zoom: number) => {
        ipcRenderer.sendTo(sharedObject.Main, "zoomTo", lng, lat, zoom);
    }

    const measure = (options: IMeasureOptions) => {
        ipcRenderer.sendTo(sharedObject.Main, "measure", options)
    }

    const plot = (options: IPlotOptions) => {
        ipcRenderer.sendTo(sharedObject.Main, "plot", options)
    }

    return { refreshLayerInfos, refreshMapLayerInfos, exportImage, exportVector, exportAttributeTable, panTo, zoomTo, measure, plot }
}