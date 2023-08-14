import { IFeature, IGeoJSON } from "#/geojson";
import { IResponseResult } from "#/index";
import SqliteColumnType from "@/enum/SqliteColumnType";
import ResponseResult from "@/utils/db/ResponseResult"
import { WKT, GeoJSON } from "ol/format"
import { IColumnStructure } from "#/database";
/**
 * 创建表
 * @param tableName 表名
 * @param tableStructure 表结构
 * @returns 
 */
export const create = async (db: any, tableName: String, tableStructure: IColumnStructure[]): Promise<IResponseResult<any>> => {
    console.log(db);
    return await db.schema.hasTable(tableName).then(async (exists: Boolean) => {
        if (!exists) {
            return await db.schema
                .createTable(tableName, (table: any) => {
                    table.increments('m_id');
                    tableStructure.forEach((structure: IColumnStructure) => {
                        switch (structure.type) {
                            case SqliteColumnType.BOOLEAN: {
                                table.boolean(structure.name);
                                break;
                            }
                            case SqliteColumnType.TEXT: {
                                table.text(structure.name)
                                break;
                            }
                            case SqliteColumnType.INTEGER: {
                                table.integer(structure.name)
                                break;
                            }
                            case SqliteColumnType.DOUBLE: {
                                table.double(structure.name)
                                break;
                            }
                            case SqliteColumnType.FLOAT: {
                                table.float(structure.name)
                                break;
                            }
                            default: {
                                table.text(structure.name)
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
export const insert = async (db: any, tableName: String, data: Object[]): Promise<IResponseResult<any>> => {
    return await db.schema.hasTable(tableName).then(async (exists: Boolean) => {
        if (exists) {
            return await db.transaction(async (trx: any) => {
                let promises = [];
                for (let i = 0; i < data.length; i++) {
                    let promise = db(tableName).insert(data[i]).transacting(trx)
                    promises.push(promise)
                }
                return await Promise.all(promises).then(async (result: any) => {
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
        } else {
            return new Promise((resolve, reject) => {
                resolve(ResponseResult.buildError(`表'${tableName}'不存在`));
            })
        }
    })
}

export const readAsGeoJSON = async (db: any, tableName: String): Promise<ResponseResult<any>> => {
    return await db.schema.hasTable(tableName).then(async (exists) => {
        if (exists) {
            return await db(tableName).select().then((result) => {
                let geojson: IGeoJSON = {
                    type: "FeatureCollection",
                    features: []
                };
                let wktFormat = new WKT();
                let geoJSONFormat = new GeoJSON();
                for (let i = 0; i < result.length; i++) {
                    let item = result[i];
                    let geom_wkt = item.geom_wkt;
                    let feature: IFeature = {
                        type: "Feature",
                        geometry: JSON.parse(geoJSONFormat.writeGeometry(wktFormat.readGeometry(geom_wkt))),
                        properties: item
                    };
                    geojson.features.push(feature);

                }
                return geojson;
            })
        }
    })
}

export const getByWhere = async (db: any, tableName: String, params: Object): Promise<ResponseResult<any>> => {
    return await db(tableName).where(params).select().then((result: any) => {
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
 * 删除表
 * @param tableName 表名
 */
export const drop = async (db: any, tableName: String): Promise<ResponseResult<any>> => {
    return await db.schema.dropTable(tableName).then((result) => {
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
 * 获取表结构
 * @param tableName 表名
 * @returns 
 */
export const getTableStruct = async (db: any, tableName: String): Promise<ResponseResult<IColumnStructure[]>> => {
    return await db.raw(`PRAGMA table_info("${tableName}")`).then((result) => {
        console.log(result);
        return new Promise((resolve, reject) => {
            resolve(ResponseResult.buildSuccess(result.map((item) => {
                return {
                    name: item.name,
                    type: SqliteColumnType[item.type.toUpperCase()],
                    notnull: item.notnull,
                    primary: item.pk,
                    default_value: item.dflt_value
                }
            })));
        })
    }).catch((err: any) => {
        return new Promise((resolve, reject) => {
            resolve(ResponseResult.buildError(err.message))
        })
    })
}

/**
 * 添加列
 * @param tableName 表名
 * @param columns 列定义
 * @returns 
 */
export const addColumns = async (db: any, tableName: string, columns: IColumnStructure[]): Promise<ResponseResult<any>> => {
    return await db.schema.alterTable(tableName, (table) => {
        columns.forEach((structure: IColumnStructure) => {
            switch (structure.type) {
                case SqliteColumnType.BOOLEAN: {
                    table.boolean(structure.name);
                    break;
                }
                case SqliteColumnType.TEXT: {
                    table.text(structure.name)
                    break;
                }
                case SqliteColumnType.INTEGER: {
                    table.integer(structure.name)
                    break;
                }
                case SqliteColumnType.DOUBLE: {
                    table.double(structure.name)
                    break;
                }
                case SqliteColumnType.FLOAT: {
                    table.float(structure.name)
                    break;
                }
                default: {
                    table.text(structure.name)
                    break;
                }
            }
        })
    }).then((result) => {
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
 * 删除列
 * @param tableName 表名 
 * @param columns 名
 * @returns 
 */
export const deleteColumns = async (db: any, tableName: string, columns: string[]): Promise<ResponseResult<any>> => {
    return await db.schema.alterTable(tableName, (table) => {
        columns.forEach((name) => {
            table.dropColumn(name);
        })
    }).then((result) => {
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
 * 字段重命名
 * @param tableName 表名
 * @param oldName 老字段名称
 * @param newName 新字段名称
 * @returns 
 */
export const renameColumn = async (db: any, tableName: string, oldName: string, newName: string): Promise<ResponseResult<any>> => {
    return await db.schema.alterTable(tableName, (table) => {
        table.renameColumn(oldName, newName);
    }).then((result) => {
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
 * 更新字段值
 * @param tableName 表名 
 * @param fieldName 字段名
 * @param sql sql语句
 * @returns 
 */
export const updateColumnBySql = async (db: any, tableName: string, fieldName: string, sql: string): Promise<ResponseResult<any>> => {
    return await db.raw(`update ${tableName} set ${fieldName} = ${sql}`).then((result) => {
        return new Promise((resolve, reject) => {
            resolve(ResponseResult.buildSuccess(result));
        })
    }).catch((err: any) => {
        return new Promise((resolve, reject) => {
            resolve(ResponseResult.buildError(err.message))
        })
    })
}


export const replaceData = async (db: any, tableName: string, data: any[]): Promise<ResponseResult<any>> => {
    return await db.transaction(async (trx: any) => {
        let promises = [];

        let promise = db(tableName).delete().transacting(trx);
        promises.push(promise)

        for (let i = 0; i < data.length; i++) {
            let promise = db(tableName).insert(data[i]).transacting(trx)
            promises.push(promise)
        }
        return await Promise.all(promises).then(async (result: any) => {
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

export const updateByWhere = async (db: any, tableName: string, data: any, where): Promise<ResponseResult<any>> => {
    return await db(tableName).where(where).update(data).then((result: any) => {
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
 * 获取数据列表
 */
export const getList = async <T extends { id?: any }>(db: any, tableName: string): Promise<IResponseResult<Array<T>>> => {
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
export const getById = async <T extends { id?: any }>(db: any, tableName: string, id: string | number): Promise<IResponseResult<T>> => {
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
export const updateById = async <T extends { id?: any }>(db: any, tableName: string, data: T): Promise<IResponseResult<any>> => {
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


/**
 * 删除指定id数据
 * @param id id
 */
export const deleteById = async (db: any, tableName: string, id: Number): Promise<IResponseResult<any>> => {
    return await db(tableName).where({ id: id }).delete().then((result: any) => {
        return new Promise((resolve, reject) => {
            resolve(ResponseResult.buildSuccess(result));
        })
    }).catch((err: any) => {
        return new Promise((resolve, reject) => {
            resolve(ResponseResult.buildError(err.message))
        })
    })
}


