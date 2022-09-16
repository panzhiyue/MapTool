import { getDB } from "@/utils/db/index"
import ResponseResult from "@/utils/db/ResponseResult.ts"
const db = await getDB();

export const getList = async () => {
  return await db('MapInfo').select().then((result: any) => {
    return new Promise((resolve, reject) => {
      resolve(ResponseResult.buildSuccess(result));
    })
  }).catch((err: any) => {
    return new Promise((resolve, reject) => {
      resolve(ResponseResult.buildError(err))
    })
  })
}

export const getById = async (id: Number) => {
  return await db('MapInfo').select().where({ id: id }).first().then((result: any) => {
    return new Promise((resolve, reject) => {
      resolve(ResponseResult.buildSuccess(result));
    })
  }).catch((err: any) => {
    return new Promise((resolve, reject) => {
      resolve(ResponseResult.buildError(err))
    })
  })
}

