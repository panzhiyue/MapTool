import { getDb as getMapToolDb } from "./MapTool"
import DbType from "./DbType"
export const getDbByType = (type) => {
    switch (type) {
        case DbType.MAPTOOL: {
            return getMapToolDb
        }
    }
}