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
          <template v-if="column.key == 'originName'">
            <a-input placeholder="" :value="value" />
          </template>
          <template v-if="column.key == 'destName'">
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
  </div>
</template>

<script setup lang="ts">
import { useVModel } from "@vueuse/core";
import { Key } from "ant-design-vue/lib/_util/type";
import { ComputedRef, Ref } from "vue";
import { ITableStructureCompare } from "./typing";

const columns: Ref<any> = ref([
  {
    title: "源字段",
    align: "center",
    dataIndex: "originName",
    width: 120,
    key: "originName",
  },
  {
    title: "目标字段",
    align: "center",
    dataIndex: "destName",
    width: 120,
    key: "destName",
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
    type: Array<ITableStructureCompare>,
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
  //   selectedRowKeys.value = keys;
  tableData.value.forEach((item: ITableStructureCompare, index) => {
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
</script>
<style lang="less" scoped>
/deep/.ant-table {
  .ant-table-cell {
    padding: 0;
    margin: 0;
  }
}
</style>
