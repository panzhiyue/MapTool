import { getDB } from "@/utils/db/MapTool"
import ResponseResult from "@/utils/db/ResponseResult"
import { ILayerInfo, IResponseResult } from "types";
import * as TableApi from "./table"

const _tableName = 'LayerInfo';
/**
 * 获取图层列表
 * @param mapId 地图id
 * @returns 
 */
export const getList = async (mapId: string | number): Promise<IResponseResult<ILayerInfo[]>> => {
    const db = await getDB();
    return await db(_tableName).select().whereIn('mapId', [0, mapId]).then((result: any) => {
        result.forEach((item: any) => {
            item.info = JSON.parse(item.info)
        });
        return new Promise((resolve, reject) => {
            resolve(ResponseResult.buildSuccess(result));
        })
    }).catch((err: any) => {
        return new Promise((resolve, reject) => {
            resolve(ResponseResult.buildError(err.message))
        })
    })
}

/**
 * 添加数据
 * @param layerInfo 
 * @returns 
 */
export const add = async (layerInfo: ILayerInfo) => {
    const db = await getDB();
    return await db(_tableName).insert(layerInfo).then((result: any) => {
        return new Promise((resolve, reject) => {
            resolve(ResponseResult.buildSuccess(result));
        })
    }).catch((err: any) => {
        return new Promise((resolve, reject) => {
            resolve(ResponseResult.buildError(err.message))
        })
    })
}

/**
 * 更新数据
 */
export const updateById = async (data: ILayerInfo) => {
    const db = await getDB();
    let id = data.id;
    let param = data;
    delete param.id;
    return await db(_tableName).where({ id: id }).update(param).then((result: any) => {
        return new Promise((resolve, reject) => {
            resolve(ResponseResult.buildSuccess(result));
        })
    }).catch((err: any) => {
        return new Promise((resolve, reject) => {
            resolve(ResponseResult.buildError(err.message))
        })
    })
}

/**
 * 自定义查询
 * @param params
 */
export const getByWhere = async (params: ILayerInfo): Promise<ResponseResult<ILayerInfo[]>> => {
    return TableApi.getByWhere(_tableName, params)
}

/**
 * 根据id删除菜单与子菜单
 * @param id 
 */
export const deleteById = async (id: String): Promise<ResponseResult<any>> => {
    const db = await getDB();
    return await db(_tableName).where({ id: id }).orWhere({ parentId: id }).delete().then((result: any) => {
        return new Promise((resolve, reject) => {
            resolve(ResponseResult.buildSuccess(result));
        })
    }).catch((err: any) => {
        return new Promise((resolve, reject) => {
            resolve(ResponseResult.buildError(err.message))
        })
    })
}

