import SqliteColumnType from "@/enum/SqliteColumnType";

export interface ITableStructureCompare {
    key?: Number|String,
    originName: String,
    destName: String,
    type: SqliteColumnType,
    length?: String | Number,
    scale?: String | Number,
    primary?: Boolean,
    selected?: Boolean
}