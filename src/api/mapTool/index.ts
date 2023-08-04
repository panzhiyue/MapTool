import { getDbByType } from "@/utils/db";
import DbType from "@/utils/db/DbType";

export const getDB = async () => {
    return await getDbByType(DbType.MAPTOOL)
}

