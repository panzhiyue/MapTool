import SqliteColumnType from "@/enum/SqliteColumnType";

export interface ITableStructure {
    key?: Number | String,
    name: String,
    type: SqliteColumnType,
    length?: String | Number,
    scale?: String | Number,
    primary?: Boolean,
    selected?: Boolean
}