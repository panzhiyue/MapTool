import { getDB } from "@/utils/db/MapTool"
import ResponseResult from "@/utils/db/ResponseResult"

/**
 * 获取数据库所有表名
 * @returns 
 */
export const getTableNameList = async (): Promise<ResponseResult<String[]>> => {
    const db = await getDB();
    return await db("sqlite_master").where({ type: 'table' }).select().then((result) => {
        return new Promise((resolve, reject) => {
            resolve(ResponseResult.buildSuccess(result.map((item) => {
                return item.name;
            })));
        })
    }).catch((err: any) => {
        return new Promise((resolve, reject) => {
            resolve(ResponseResult.buildError(err.message))
        })
    })
}