import MeasureType from "@/enum/MeasureType";
import ResponseCode from "@/enum/ResponseCode.ts";
import { IColumnStructure } from "./database";
import { TableStructureCompare } from "@/components/table-structure-compare"
declare module '@gis-js/utilsol'
declare module '@gis-js/vue2ol'
declare module '@gis-js/vue2ol-extend'
declare module '@panzhiyue/utilscommon'
declare global {
    __static: string;
}

declare type Nullable<T> = T | null;  //类型T或Null
declare type Undefinerable<T> = T | undefined
declare type NullAndUndefineable<T> = Undefinerable<Nullable<T>>

export interface IResponseResult<T> {
    data: T;
    code: ResponseCode;
    msg: string;
}

export interface ILayerInfo {
    id?: string,
    parentId?: string,
    mapId?: number,
    title?: string,
    type?: string,
    canDelete?: boolean,
    canEdit?: boolean,
    expand?: boolean,
    info?: object
}

export interface IMapLayerInfo {
    id?: number | string,
    layerId?: string,
    mapId?: number | string,
    title?: string,
    info?: any,
    checked?: boolean
}

export interface IMapInfo {
    id?: number | string,
    name?: string,
    zoom?: number,
    centerx?: number,
    centery?: number,
    pan: boolean, //平移交互
    select: boolean, //选择
    doubleclickzoom: boolean, //双击缩放
    mousewheelzoom: boolean, //滚轮缩放
    dragZoomIn: boolean,  //选框放大
    dragZoomOut: boolean, //选框缩小
    srs: string, //坐标系
}

/**
 * electron通讯参数
 */
interface IElectronCommunicationOptions {
    fromWindowId: number,
    fromWindowName: string | number,
    toWindowId: number,
    toWindowName: string | number,
}

/**
 * 导出图片参数
 */
export interface IExportImageOptions extends IElectronCommunicationOptions {
    path: string,  //图片路径
    control?: boolean,
    format: string
}

/**
 * 导出矢量参数
 */
export interface IExportVectorOptions extends IElectronCommunicationOptions {
    layerId: string | number,  //导出图层Id
    savePath: string,  //保存路径
    format: string,
    destSpatialReference: any
}


/**
 * 导出属性表
 */
export interface IExportAttributeTableOptions extends IElectronCommunicationOptions {
    layerId: string | number,  //导出图层Id
    savePath: string,  //保存路径
    header: boolean  //是否添加表头
}

/**
 * 量算
 */
export interface IMeasureOptions extends IElectronCommunicationOptions {
    type: MeasureType
}

/**
 * 绘标
 */
export interface IPlotOptions extends IElectronCommunicationOptions {
    type: string
}

/**
 * 创建距离表
 */
export interface ICreateDistanceTableOptions extends IElectronCommunicationOptions {
    layerId1: string,
    layerId2: string,
    savePath: string,
    layerFields1: string,
    layerFields2: string,
    radius: number,
    radiusUnit: LengthUnits,
    maxCount: number,
}

/**
 * 样式
 */
export type IStyle = IPointStyle | ILineStringStyle | IPolygonStyle;




/**
 * 点样式
 */
export interface IPointStyle {
    type: "point",
    fillColor: string,
    size: number,
    lineWidth: number,
    lineColor: string;
}

/**
 * 线样式
 */
export interface ILineStringStyle {
    type: "linestring",
    lineWidth: number,
    lineColor: string;
}

/**
 * 面样式
 */
export interface IPolygonStyle {
    type: "polygon",
    fillColor: string,
    lineWidth: number,
    lineColor: string;
}
