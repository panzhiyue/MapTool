import ResponseCode from "@/enum/ResponseCode.ts";
declare module '@gis-js/vue2ol'
declare module '@gis-js/vue2ol-extend'

declare type Nullable<T> = T | null;  //类型T或Null
declare type Undefinerable<T> = T | undefined
declare type NullAndUndefineable<T> = Undefinerable<Nullable<T>>

export interface IResponseResult<T> {
    data: T;
    code: ResponseCode;
    msg: String;
}

export interface ILayerInfo {
    id?: String,
    parentId?: String,
    mapId?: Number,
    title?: String,
    type?: String,
    canDelete?: Boolean,
    canEdit?: Boolean,
    expand?: Boolean,
    info?: Object
}

export interface IMapLayerInfo {
    id?: Number,
    layerId?: String,
    mapId?: Number,
    title?: String,
    info?: any,
    checked?: Boolean
}

export interface IMapInfo {
    id?: Number,
    name?: String,
    zoom?: Number,
    centerx?: Number,
    centery?: Number
}





