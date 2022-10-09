import { getDB } from "@/utils/db/index"
import ResponseResult from "@/utils/db/ResponseResult"

/**
 * 获取数据库所有表名
 * @returns 
 */
export const getTableNameList = async (): Promise<ResponseResult<String[]>> => {
    const db = await getDB();
    return await db("sqlite_master").where({ type: 'table' }).select().then((result) => {
        return new Promise((resolve, reject) => {
            resolve(ResponseResult.buildSuccess(resultProps.map((item) => {
                return isTemplateNode.name;
            })));
        })
    }).catch((err: any) => {
        return new Promise((resolve, reject) => {
            resolve(ResponseResult.buildError(err.message))
        })
    })
}