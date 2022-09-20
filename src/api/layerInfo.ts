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

/**
 * 添加数据
 * @param layerInfo 
 * @returns 
 */
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

/**
 * 更新数据
 */
export const updateById = async (data: ILayerInfo) => {
    let id = data.id;
    let param = data;
    delete param.id;
    return await db('LayerInfo').where({ id: id }).update(param).then((result: any) => {
        console.log(9999);
        return new Promise((resolve, reject) => {
            resolve(ResponseResult.buildSuccess(result));
        })
    }).catch((err: any) => {
        return new Promise((resolve, reject) => {
            resolve(ResponseResult.buildError(err))
        })
    })
}

/**
 * 自定义查询
 * @param params
 */
export const getByWhere = async (params: ILayerInfo): Promise<ResponseResult<ILayerInfo[]>> => {
    return await db('LayerInfo').where(params).select().then((result: any) => {
        return new Promise((resolve, reject) => {
            resolve(ResponseResult.buildSuccess(result));
        })
    }).catch((err: any) => {
        return new Promise((resolve, reject) => {
            resolve(ResponseResult.buildError(err))
        })
    })
}

