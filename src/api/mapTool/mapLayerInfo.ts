import ResponseResult from "@/utils/db/ResponseResult"
import { IMapLayerInfo, IResponseResult } from "types";
import * as TableApi from "../table"
import { getDB } from "@/utils/db/MapTool";

const _tableName = 'MapLayerInfo';



/**
 * 获取列表
 * @param mapId 
 * @returns 
 */
export const getList = async (mapId: string | number): Promise<IResponseResult<IMapLayerInfo[]>> => {
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
 * @param data 
 * @returns 
 */
export const add = async (data: IMapLayerInfo) => {
    const db = await getDB();
    return await db(_tableName).insert(data).then((result: any) => {
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
 * 更新checked值
 * @param checkedKeys 
 * @returns 
 */
export const updateChecked = async (checkedKeys: Array<Number>) => {
    const db = await getDB();
    return await db.transaction(async (trx: any) => {
        const query1 = db(_tableName).whereIn('id', checkedKeys).update({
            checked: true
        }).transacting(trx)
        const query2 = db(_tableName).whereNotIn('id', checkedKeys).update({
            checked: false
        }).transacting(trx)
        return await Promise.all([query1, query2]).then(async (result: any) => {
            trx.commit();
        }).catch(async (err: any) => {
            trx.rollback();
            throw err;
        })

    }).then(() => {
        return new Promise((resolve, reject) => {
            resolve(ResponseResult.buildSuccess("成功"));
        })
    }).catch((err) => {
        return new Promise((resolve, reject) => {
            resolve(ResponseResult.buildError(err.message))
        })
    })
}


/**
 * 删除指定id数据
 * @param id id
 */
export const deleteById = async (id: Number): Promise<IResponseResult<any>> => {
    const db = await getDB();
    return TableApi.deleteById(db, _tableName, id);
}


/**
 * 自定义查询
 * @param params
 */
export const getByWhere = async (params: IMapLayerInfo): Promise<ResponseResult<IMapLayerInfo[]>> => {
    const db = await getDB();
    return TableApi.getByWhere(db, _tableName, params)
}
