import { getDB } from "@/utils/db/index"
import ResponseResult from "@/utils/db/ResponseResult"
import { ILayerInfo, IResponseResult } from "types";
const db = await getDB();

/**
 * 获取图层列表
 * @param mapId 地图id
 * @returns 
 */
export const getList = async (mapId: Number): Promise<IResponseResult<ILayerInfo[]>> => {
    return await db('LayerInfo').select().whereIn('mapId', [0, mapId]).then((result: any) => {
        result.forEach((item: any) => {
            item.info = JSON.parse(item.info)
        });
        return new Promise((resolve, reject) => {
            resolve(ResponseResult.buildSuccess(result));
        })
    }).catch((err: any) => {
        return new Promise((resolve, reject) => {
            resolve(ResponseResult.buildError(err))
        })
    })
}

export const add = async (layerInfo: ILayerInfo) => {
    return await db('LayerInfo').insert(layerInfo).then((result: any) => {
        return new Promise((resolve, reject) => {
            resolve(ResponseResult.buildSuccess(result));
        })
    }).catch((err: any) => {
        return new Promise((resolve, reject) => {
            resolve(ResponseResult.buildError(err))
        })
    })
}

