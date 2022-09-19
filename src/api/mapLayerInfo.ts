import { getDB } from "@/utils/db/index"
import ResponseResult from "@/utils/db/ResponseResult"
import { transformExpression } from "@vue/compiler-core";
import { IMapLayerInfo, IResponseResult } from "types";
const knex = require("knex");
const db = await getDB();

export const getList = async (mapId: Number): Promise<IResponseResult<IMapLayerInfo[]>> => {
    return await db('MapLayerInfo').select().whereIn('mapId', [0, mapId]).then((result: any) => {
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

export const add = async (data: IMapLayerInfo) => {
    return await db('MapLayerInfo').insert(data).then((result: any) => {
        return new Promise((resolve, reject) => {
            resolve(ResponseResult.buildSuccess(result));
        })
    }).catch((err: any) => {
        return new Promise((resolve, reject) => {
            resolve(ResponseResult.buildError(err))
        })
    })
}

export const updateChecked = async (checkedKeys: Array<Number>) => {
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
                resolve(ResponseResult.buildError(err))
            })
        })
    })
}


/**
 * 删除指定id数据
 * @param id id
 */
export const deleteById = async (id: Number): Promise<IResponseResult<any>> => {
    console.log(id);
    const db = await getDB();
    return await db('MapLayerInfo').where({ id: id }).delete().then((result: any) => {
        return new Promise((resolve, reject) => {
            resolve(ResponseResult.buildSuccess(result));
        })
    }).catch((err: any) => {
        return new Promise((resolve, reject) => {
            resolve(ResponseResult.buildError(err))
        })
    })
}
