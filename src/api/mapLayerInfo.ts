import { getDB } from "@/utils/db/index"
import ResponseResult from "@/utils/db/ResponseResult"
import { IMapLayerInfo, IResponseResult } from "types";


export const getList = async (mapId: Number): Promise<IResponseResult<IMapLayerInfo[]>> => {
    const db = await getDB();
    return await db('MapLayerInfo').select().whereIn('mapId', [0, mapId]).then((result: any) => {
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

export const add = async (data: IMapLayerInfo) => {
    const db = await getDB();
    return await db('MapLayerInfo').insert(data).then((result: any) => {
        return new Promise((resolve, reject) => {
            resolve(ResponseResult.buildSuccess(result));
        })
    }).catch((err: any) => {
        return new Promise((resolve, reject) => {
            resolve(ResponseResult.buildError(err.message))
        })
    })
}

export const updateChecked = async (checkedKeys: Array<Number>) => {
    const db = await getDB();
    await db.transaction((trx: any) => {
        const query1 = db("MapLayerInfo").whereIn('id', checkedKeys).update({
            checked: true
        }).transacting(trx)
        const query2 = db("MapLayerInfo").whereNotIn('id', checkedKeys).update({
            checked: false
        }).transacting(trx)
        Promise.all([query1, query2]).then((result: any) => {
            trx.commit();
            return new Promise((resolve, reject) => {
                resolve(ResponseResult.buildSuccess(result));
            })
        }).catch((err: any) => {
            trx.rollback();
            return new Promise((resolve, reject) => {
                resolve(ResponseResult.buildError(err.message))
            })
        })
    })
}


/**
 * 删除指定id数据
 * @param id id
 */
export const deleteById = async (id: Number): Promise<IResponseResult<any>> => {
    const db = await getDB();
    return await db('MapLayerInfo').where({ id: id }).delete().then((result: any) => {
        return new Promise((resolve, reject) => {
            resolve(ResponseResult.buildSuccess(result));
        })
    }).catch((err: any) => {
        return new Promise((resolve, reject) => {
            resolve(ResponseResult.buildError(err.message))
        })
    })
}
