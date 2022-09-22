<template>
  <div class="p-5 w-full h-full">
    <div class="tips">表结构？</div>
    <a-space>图层名 <a-input v-model:value="layerName"></a-input></a-space>
    <a-space>表名 <a-input v-model:value="tableName"></a-input></a-space>
    <table-structure
      class="tableStructure mt-20px scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 scrollbar-thumb-rounded-full scrollbar-track-rounded-full"
      v-model:value="tableData"
    ></table-structure>
  </div>
  <step-footer
    :next-most-text="null"
    :cancel-text="null"
    :next-text="null"
    @on-ok="handleOk"
    @on-pre="handlePre"
    @on-pre-most="handlePreMost"
  ></step-footer>
</template>
<script lang="ts" setup>
import TableStructure, { IStructure } from "@/components/table-structure/index";
import { useWindow } from "@/hooks/electron/useWindow";
import { useVModel } from "@vueuse/core";
import { createTable } from "@/api/index";
import SqliteColumnType from "@/enum/SqliteColumnType";
import { add as addLayerInfo } from "@/api/layerInfo";
import { useRoute } from "vue-router";
import { useHomeStore } from "@/store/home";
import { message } from "ant-design-vue";
import ResponseResult from "@/utils/db/ResponseResult";
import ResponseCode from "@/enum/ResponseCode";

const route = useRoute();
const homeStore = useHomeStore();
const props = defineProps({
  current: {
    type: Number,
  },
});

const emits = defineEmits(["update:current"]);

const currentStep = useVModel(props, "current", emits);

const layerName = ref("");
const tableName = ref("vector");
const tableData: Reactive<IStructure[]> = reactive([
  {
    key: 1,
    name: "name",
    type: SqliteColumnType.VARCHAR,
    length: "",
    scale: "",
    primary: true,
    selected: true,
  },
  {
    key: 2,
    name: "type",
    type: SqliteColumnType.VARCHAR,
    length: "",
    scale: "",
    primary: false,
    selected: true,
  },
  {
    key: 3,
    name: "info",
    type: SqliteColumnType.JSON,
    length: "",
    scale: "",
    primary: false,
    selected: true,
  },
]);

watch(tableData, (newValue) => {
  console.log(newValue);
});

const { close } = useWindow();
const handleCancel = () => {
  close();
};

const handlePre = () => {
  currentStep.value -= 1;
};

const handlePreMost = () => {
  currentStep.value = 0;
};

const handleOk = () => {
  createTable(tableName.value, tableData)
    .then((result) => {
      addLayerInfo({
        parentId: route.query.parentId,
        mapId: 1,
        title: layerName.value,
        type: "vector",
        canDelete: true,
        canEdit: true,
        expand: true,
        info: {
          table: tableName,
        },
      }).then((result1) => {
        console.log(result1);
        if (result1 == ResponseCode.SUCCESS) {
          homeStore.getLayerInfos(1).then((result2: ResponseResult) => {
            if (result2.code == ResponseCode.SUCCESS) {
              close();
            } else {
              message.error(result2.msg, 1);
            }
          });
        } else {
          message.error(result1.msg, 1);
        }
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
</script>
<style lang="less" scoped>
.tableStructure {
  height: calc(100% - 140px);
  box-sizing: border-box;
}
.tips {
  line-height: 40px;
  font-size: 20px;
  color: rgba(0, 102, 204, 1);
  margin-bottom: 20px;
}
</style>
