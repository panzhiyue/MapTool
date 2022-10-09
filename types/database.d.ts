

/**
 * 列结构
 */
 export interface IColumnStructure {
    name: String,  //名称
    type: SqliteColumnType,  //类型
    notnull: Boolean,  //不为空
    default_value: any,  //默认值
    primary: Boolean  //是否为主键
}