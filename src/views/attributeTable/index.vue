<template>
  <a-table
    v-if="columnStructs"
    :columns="columns"
    :data-source="tableData"
    @resizeColumn="handleResizeColumn"
    @change="handleChange"
  >
    <template #bodyCell="{ column, text }">
      <template v-if="column.dataIndex === 'name'">
        <a>{{ text }}</a>
      </template>
    </template>
  </a-table>
</template>
<script lang="ts" setup>
import { useRoute } from "vue-router";
import { getByWhere } from "@/api/mapLayerInfo";
import * as TableApi from "@/api/table";
import { IColumnStructure } from "#/database";
import { Ref } from "vue";
import { TableColumnType, TableProps } from "ant-design-vue";
const route = useRoute();

const layerId = route.query.layerId as string;

// const columns = ref();

// const data = ref();

const tableData = ref();
const columnStructs: Ref<IColumnStructure[]> = ref();
const filteredInfo = ref();
const sortedInfo = ref();

const columns = computed<TableColumnType[]>(() => {
  const filtered = filteredInfo.value || {};
  const sorted = sortedInfo.value || {};
  return columnStructs.value
    .filter((item: IColumnStructure) => {
      return item.name != "geom_wkt";
    })
    .map((item) => {
      return {
        title: item.name,
        dataIndex: item.name,
        key: item.name,
        resizable: true,
        width: 100,
        minWidth: 100,
        maxWidth: 500,
        sorter: (a:any, b:any) => a[item.name as string] - b[item.name as string],
        sortOrder: sorted.columnKey === "age" && sorted.order,
      } as TableColumnType;
    });
});

onMounted(async () => {
  let result1 = await getByWhere({ id: layerId });
  let layerInfo = JSON.parse(result1.data[0].info);
  tableData.value = (await TableApi.getByWhere(layerInfo.table, {})).data;
  columnStructs.value = (await TableApi.getTableStruct(layerInfo.table)).data;
});

const handleResizeColumn = (w, col) => {
  col.width = w;
};

const handleChange: TableProps["onChange"] = (pagination, filters, sorter) => {
  console.log("Various parameters", pagination, filters, sorter);
  filteredInfo.value = filters;
  sortedInfo.value = sorter;
};
</script>
