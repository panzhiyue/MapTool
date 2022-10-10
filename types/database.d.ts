

/**
 * 列结构
 */
 export interface IColumnStructure {
    name: string,  //名称
    type: SqliteColumnType,  //类型
    notnull?: boolean,  //不为空
    default_value?: any,  //默认值
    primary?: boolean  //是否为主键
}