import ResponseCode from "@/enum/ResponseCode.ts";
declare module '@gis-js/vue2ol'
declare module '@gis-js/vue2ol-extend'
declare module '@panzhiyue/utilscommon'

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
    centery?: number
}

/**
 * electron通讯参数
 */
interface IElectronCommunicationOptions {
    fromWindowId: string | number,
    fromWindowName: string | number,
    toWindowId: string | number,
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
    format: string
}


/**
 * 导出属性表
 */
export interface IExportAttributeTableOptions extends IElectronCommunicationOptions {
    layerId: string | number,  //导出图层Id
    savePath: string,  //保存路径
    header: boolean  //是否添加表头
}

