<template>
  <div>
    <div class="table-wrapper">
      <!--每个列的宽度必须比列名总长度大才能使表格所有列对齐，留一个列不设置宽度-->
      <a-table
        :rowSelection="{
          selectedRowKeys: selectedRowKeys,
          onChange: onSelectChange,
        }"
        :columns="columns"
        :dataSource="tableData"
        bordered
        size="middle"
        :loading="tableLoading"
        :pagination="false"
      >
        <template #bodyCell="{ value, index, column }">
          <template v-if="column.key == 'name'">
            <a-input
              placeholder=""
              :value="value"
              @change="(e) => handleChange(e.target.value, index, column)"
            />
          </template>

          <template v-if="column.key == 'type'">
            <sqlite-column-type
              class="w-11/12"
              :value="value"
              @change="(e) => handleChange(e, index, column)"
            ></sqlite-column-type>
          </template>
          <template v-if="column.key == 'length'">
            <a-input
              placeholder=""
              :value="value"
              @change="(e) => handleChange(e.target.value, index, column)"
            />
          </template>
          <template v-if="column.key == 'scale'">
            <a-input
              placeholder=""
              :value="value"
              @change="(e) => handleChange(e.target.value, index, column)"
            />
          </template>
          <template v-if="column.key == 'primary'">
            <div
              class="w-full h-30px"
              @click="handleChange(!value, index, column)"
            >
              <i
                v-if="value"
                class="icon icon-primary text-30px text-yellow-500"
              ></i>
            </div>
          </template>
        </template>
      </a-table>
    </div>
    <a-button class="w-full mt-10px" @click="handleAddRow">+</a-button>
  </div>
</template>

<script setup lang="ts">
import { useVModel } from "@vueuse/core";
import { ITableStructure } from "./typing";
import { buildUUID } from "@/utils/uuid";
import { ComputedRef, Ref } from "vue";
import { Key } from "ant-design-vue/lib/_util/type";
import { table } from "console";

const columns: any = ref([
  {
    title: "名称",
    align: "center",
    dataIndex: "name",
    width: 120,
    key: "name",
  },
  {
    title: "类型",
    align: "center",
    dataIndex: "type",
    width: 120,
    key: "type",
  },
  {
    title: "长度",
    align: "center",
    dataIndex: "length",
    width: 120,
    key: "length",
  },
  {
    title: "比例",
    align: "center",
    dataIndex: "scale",
    width: 120,
    key: "scale",
  },
  {
    title: "主键",
    align: "center",
    dataIndex: "primary",
    width: 120,
    key: "primary",
  },
]);

const emits = defineEmits(["update:value"]);
const props = defineProps({
  value: {
    type: Array<ITableStructure>,
  },
});

const tableData = useVModel(props, "value", emits);

const selectedRowKeys: ComputedRef<Key[]> = computed(() => {
  return tableData.value
    ?.filter((item) => {
      return item.selected;
    })
    .map((item) => {
      return item.key as Key;
    });
});

const onSelectChange = (keys: Key[]) => {
  // selectedRowKeys.value = keys;
  tableData.value.forEach((item: ITableStructure, index) => {
    if (keys.indexOf(item.key as Key) > -1) {
      item.selected = true;
    } else {
      item.selected = false;
    }
  });
};

const handleChange = (value, index, column): void => {
  tableData.value[index][column.dataIndex] = value;
};

const tableLoading = ref(false);

const handleAddRow = () => {
  tableData.value.push({
    key: buildUUID(),
    name: "",
    type: null,
    length: "",
    scale: "",
    primary: false,
    selected: true,
  });
};
</script>
<style lang="less" scoped>
/deep/.ant-table {
  .ant-table-cell {
    padding: 0;
    margin: 0;
  }
}
</style>
