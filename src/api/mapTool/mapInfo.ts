import { IConfig, IResponseResult } from "types";
import * as TableApi from "../table"
import { getDB } from "@/utils/db/MapTool";

const tableName = "MapInfo";

/**
 * 获取数据列表
 */
export const getList = async (): Promise<IResponseResult<Array<IConfig>>> => {
    const db = await getDB();
    return TableApi.getList(db, tableName);
}

/**
 * 获取指定id数据
 * @param id 指定Id
 */
export const getById = async (id: string | number): Promise<IResponseResult<IConfig>> => {
    const db = await getDB();
    return TableApi.getById(db, tableName, id);
}

/**
 * 更新指定id数据
 * @param data 
 */
export const updateById = async (data: IConfig): Promise<IResponseResult<any>> => {
    const db = await getDB();
    return TableApi.updateById(db, tableName, data);
}


