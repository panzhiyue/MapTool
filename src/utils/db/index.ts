import { getDB as getMapToolDB } from "./MapTool"
import DbType from "./DbType"
export const getDbByType = async (type) => {
    switch (type) {
        case DbType.MAPTOOL: {
            return await getMapToolDB()
        }
    }
    return null
}