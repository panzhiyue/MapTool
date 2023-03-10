import { Ref } from "vue"
import { getTableStruct, getByWhere } from "@/api/table"
import { IResponseResult } from "#/index";
import { IColumnStructure } from "#/database";
export function useTable(tableName: Ref<string>) {
    const tableStructure = ref(null);
    const tableData = ref(null);

    const init = () => {
        if (!tableName.value) {
            tableStructure.value = null;
            tableData.value = null;
            return;
        }
        getTableStruct(tableName.value).then((result: IResponseResult<IColumnStructure[]>) => {
            tableStructure.value = result.data;
        })

        getByWhere(tableName.value, {}).then((result: IResponseResult<any>) => {
            tableData.value = result.data;
        })
    }

    init();

    watch(tableName, () => {
        init();
    })

    return { tableStructure, tableData }
}