import { getDb as getMapToolDb } from "./MapTool"
import DbType from "./DbType"
export const getDbByType = async (type) => {
    switch (type) {
        case DbType.MAPTOOL: {
            return await getMapToolDb()
        }
    }
    return null
}