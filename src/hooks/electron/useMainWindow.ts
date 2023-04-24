import { IExportAttributeTableOptions, IExportImageOptions, IExportVectorOptions, IMeasureOptions, IPlotOptions, ICreateDistanceTableOptions } from "#/index";
import MeasureType from "@/enum/MeasureType";
import { ipcRenderer } from "electron"
const remote = require("@electron/remote")
let sharedObject = remote.getGlobal("sharedObject");

export function useMainWindow() {
    /**
     * 刷新图层信息
     */
    const refreshLayerInfos = () => {
        ipcRenderer.sendTo(sharedObject.Main, "refresh-layerInfo");
    }

    /**
     * 刷新地图图层信息
     */
    const refreshMapLayerInfos = () => {
        ipcRenderer.sendTo(sharedObject.Main, "refresh-mapLayerInfo");
    }

    /**
     * 导出图片
     */
    const exportImage = (options: IExportImageOptions) => {
        ipcRenderer.sendTo(sharedObject.Main, "exportImage", options);
    }

    /**
     * 导出矢量
     */
    const exportVector = (options: IExportVectorOptions) => {
        ipcRenderer.sendTo(sharedObject.Main, "exportVector", options);
    }

    /**
     * 导出属性表
     */
    const exportAttributeTable = (options: IExportAttributeTableOptions) => {
        ipcRenderer.sendTo(sharedObject.Main, "exportAttributeTable", options);
    }

    /**
     * 平移到
     * @param lng 经度
     * @param lat 纬度
     */
    const panTo = (lng: number, lat: number) => {
        ipcRenderer.sendTo(sharedObject.Main, "panTo", lng, lat);
    }

    /**
     * 缩放到
     * @param lng 经度 
     * @param lat 纬度
     * @param zoom 层级
     */
    const zoomTo = (lng: number, lat: number, zoom: number) => {
        ipcRenderer.sendTo(sharedObject.Main, "zoomTo", lng, lat, zoom);
    }

    /**
     * 量算
     * @param options 
     */
    const measure = (options: IMeasureOptions) => {
        ipcRenderer.sendTo(sharedObject.Main, "measure", options)
    }

    /**
     * 绘标
     * @param options 
     */
    const plot = (options: IPlotOptions) => {
        ipcRenderer.sendTo(sharedObject.Main, "plot", options)
    }


    const createDistanceTable = (options: ICreateDistanceTableOptions) => {
        ipcRenderer.sendTo(sharedObject.Main, "createDistanceTable", options)
    }

    const exportKneePointTable = (options) => {
        ipcRenderer.sendTo(sharedObject.Main, "exportKneePointTable", options)
    }

    return { refreshLayerInfos, refreshMapLayerInfos, exportImage, exportVector, exportAttributeTable, panTo, zoomTo, measure, plot, createDistanceTable, exportKneePointTable }
}