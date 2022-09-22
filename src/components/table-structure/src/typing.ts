import SqliteColumnType from "@/enum/SqliteColumnType";

export interface IStructure {
    key: Number,
    name: String,
    type: SqliteColumnType,
    length: String | Number,
    scale: String | Number,
    primary: Boolean,
    selected: Boolean
}