import { IResponseResult } from "#/index";
import ResponseResult from "@/utils/db/ResponseResult";

export interface IBaseFun {
    getList: Function,
    getById: Function,
    updateById: Function
}
/**
 * 获取基础操作
 * @param tableName 表名 
 * @returns 
 */
export const getBaseFun = <T extends { id?: any }>(db: any, tableName: string): IBaseFun => {
    console.log(db);
    /**
     * 获取数据列表
     */
    const getList = async (): Promise<IResponseResult<Array<T>>> => {
        return await db(tableName).select().then((result: any) => {
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
     * 获取指定id数据
     * @param id 指定Id
     */
    const getById = async (id: string | number): Promise<IResponseResult<T>> => {
        return await db(tableName).select().where({ id: id }).first().then((result: any) => {
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
     * 更新指定id数据
     * @param data 
     */
    const updateById = async (data: T): Promise<IResponseResult<any>> => {
        let id = data.id;
        let param: any = Object.assign({}, data);
        delete param.id;
        return await db(tableName).where({ id: id }).update(param).then((result: any) => {
            return new Promise((resolve, reject) => {
                resolve(ResponseResult.buildSuccess(result));
            })
        }).catch((err: any) => {
            return new Promise((resolve, reject) => {
                resolve(ResponseResult.buildError(err.message))
            })
        })
    }



    return {
        getList,
        getById,
        updateById
    }
}



