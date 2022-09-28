import { getDB } from "@/utils/db/index"
import ResponseResult from "@/utils/db/ResponseResult"
import { IMapInfo, IResponseResult } from "types";

/**
 * 获取数据列表
 */
export const getList = async () => {
  const db = await getDB();
  return await db('MapInfo').select().then((result: any) => {
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
export const getById = async (id: Number): Promise<IResponseResult<IMapInfo>> => {
  const db = await getDB();
  return await db('MapInfo').select().where({ id: id }).first().then((result: any) => {
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
export const updateById = async (data: IMapInfo): Promise<IResponseResult<any>> => {
  let id = data.id;
  let param: any = data;
  delete param.id;
  const db = await getDB();
  return await db('MapInfo').where({ id: id }).update(param).then((result: any) => {
    return new Promise((resolve, reject) => {
      resolve(ResponseResult.buildSuccess(result));
    })
  }).catch((err: any) => {
    return new Promise((resolve, reject) => {
      resolve(ResponseResult.buildError(err.message))
    })
  })
}



