import SqliteColumnType from "@/enum/SqliteColumnType";

/**
 * 根据js类型获取SqliteType类型
 * @param jsType js中的类型
 * @returns Sqlite类型
 */
export const getSqliteTypeFromJsType = (jsType: String):SqliteColumnType => {
    switch (jsType) {
        case "string": {
            return SqliteColumnType.VARCHAR;
        }
        case "number": {
            return SqliteColumnType.DECIMAL

        }
        case "boolean": {
            return SqliteColumnType.BOOLEAN;
        }
        default: {
            return SqliteColumnType.VARCHAR;
        }
    }
}