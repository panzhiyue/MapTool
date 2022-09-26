import { IResponseResult } from "#/index";
import { ITableStructure } from "@/components/table-structure";
import SqliteColumnType from "@/enum/SqliteColumnType";
import { getDB } from "@/utils/db/index"
import ResponseResult from "@/utils/db/ResponseResult"
/**
 * 创建表
 * @param tableName 表名
 * @param tableStructure 表结构
 * @returns 
 */
export const create = async (tableName: String, tableStructure: ITableStructure[]): Promise<IResponseResult<any>> => {
    console.log("create", tableName, tableStructure);
    const db = await getDB();
    return await db.schema.hasTable(tableName).then(async (exists: Boolean) => {
        if (!exists) {
            return await db.schema
                .createTable(tableName, (table: any) => {
                    tableStructure.forEach((structure: ITableStructure) => {
                        switch (structure.type) {
                            case SqliteColumnType.BOOLEAN: {
                                table.boolean(structure.name);
                                break;
                            }
                            case SqliteColumnType.VARCHAR: {
                                table.string(structure.name)
                                break;
                            }
                            case SqliteColumnType.INTEGER: {
                                table.integer(structure.name)
                                break;
                            }
                            case SqliteColumnType.DECIMAL: {
                                table.decimal(structure.name)
                                break;
                            }
                            case SqliteColumnType.JSON: {
                                table.json(structure.name)
                                break;
                            }
                            default: {
                                table.string(structure.name)
                                break;
                            }
                        }
                    })

                    let primary = tableStructure.filter((item) => {
                        return item.primary
                    }).map((item) => {
                        return item.name;
                    })
                    if (primary.length > 0) {
                        table.primary(primary);
                    }
                })
                .then((result) => {
                    return new Promise((resolve, reject) => {
                        resolve(ResponseResult.buildSuccess(result));
                    })
                }).catch((err: any) => {
                    return new Promise((resolve, reject) => {
                        resolve(ResponseResult.buildError(err.message))
                    })
                });
        } else {
            return new Promise((resolve, reject) => {
                resolve(ResponseResult.buildError(`表'${tableName}'已存在！`))
            })
        }
    });

}

/**
 * 往表中插入数据
 * @param tableName 表名
 */
export const insert = async (tableName: String, data: Object[]): Promise<IResponseResult<any>> => {
    console.log(tableName, data);
    const db = await getDB();
    return db.schema.hasTable(tableName).then((exists: Boolean) => {
        if (exists) {
            return db(tableName).insert(data).then((result) => {
                return new Promise((resolve, reject) => {
                    resolve(ResponseResult.buildSuccess(result));
                })
            }).catch((err: any) => {
                return new Promise((resolve, reject) => {
                    resolve(ResponseResult.buildError(err.message))
                })
            })
        } else {
            return new Promise((resolve, reject) => {
                resolve(ResponseResult.buildError(`表'${tableName}'不存在`));
            })
        }
    })
}
