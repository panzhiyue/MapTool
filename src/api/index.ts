import { IResponseResult } from "#/index";
import { IStructure } from "@/components/table-structure";
import SqliteColumnType from "@/enum/SqliteColumnType";
import { getDB } from "@/utils/db/index"
import ResponseResult from "@/utils/db/ResponseResult"
/**
 * 创建表
 * @param tableStructure 表结构
 * @returns 
 */
export const createTable = async (tableName: String, tableStructure: IStructure[]): Promise<IResponseResult<any>> => {
    console.log(tableName, tableStructure);
    const db = await getDB();
    return db.schema.hasTable(tableName).then((exists: Boolean) => {
        if (!exists) {
            db.schema
                .createTable(tableName, (table: any) => {
                    tableStructure.forEach((structure: IStructure) => {
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
                            case SqliteColumnType.JSON: {
                                table.json(structure.name)
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
        }
    });

}
