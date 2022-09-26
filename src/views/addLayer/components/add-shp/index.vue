<template>
  <div
    class="content p-5 w-full scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 scrollbar-thumb-rounded-full scrollbar-track-rounded-full"
  >
    <a-row type="flex">
      <a-col flex="70px">图层名称:</a-col>
      <a-col flex="auto"><a-input v-model:value="layerName"></a-input></a-col>
    </a-row>
    <a-row>
      <input-select-path
        class="w-full"
        pathType="File"
        v-model:value="path"
        :filters="filters"
      ></input-select-path>
    </a-row>
    <a-row type="flex">
      <a-col flex="70px">表名:</a-col>
      <a-col flex="auto"><a-input v-model:value="tableName"></a-input></a-col>
    </a-row>
    <a-row>
      <table-structure-compare
        class="tableStructureCompare w-full mt-20px scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 scrollbar-thumb-rounded-full scrollbar-track-rounded-full"
        v-model:value="tableData"
      ></table-structure-compare>
    </a-row>
  </div>
  <step-footer
    :next-most-text="null"
    :cancel-text="null"
    :next-text="null"
    ok-text="开始"
    @on-ok="handleOk"
    @on-pre="handlePre"
    @on-pre-most="handlePreMost"
  ></step-footer>
</template>
<script lang="ts" setup>
import { dirname, basename, extname, join } from "path";
import { getFile } from "@/utils/file";
import { EShapeFile } from "@gis-js/utilsol";
import * as olProj from "ol/proj";
import { message } from "ant-design-vue";
import GeoJSON from "ol/format/GeoJSON";
import { getStructure, getTableData } from "@/utils/json";
import { IFeature, IGeoJSON } from "#/geojson";
import TableStructureCompare, {
  ITableStructureCompare,
} from "@/components/table-structure-compare";
import SqliteColumnType from "@/enum/SqliteColumnType";
import { ReactiveEffect } from "vue";
import { buildUUID } from "@/utils/uuid";
import { useVModel } from "@vueuse/core";
import ResponseResult from "@/utils/db/ResponseResult";
import ResponseCode from "@/enum/ResponseCode";
import { create as createTable, insert as insertTable } from "@/api/table";
import { add as insertLayerInfo } from "@/api/layerInfo";
import { useRoute } from "vue-router";
import { useHomeStore } from "@/store/home";
import { useMainWindow } from "@/hooks/electron/useMainWindow";
import { useWindow } from "@/hooks/electron/useWindow";

const route = useRoute();

const props = defineProps({
  current: {
    type: Number,
  },
});

const emits = defineEmits(["update:current"]);

const currentStep = useVModel(props, "current", emits);

const homeStore = useHomeStore();

const path = ref("");

const filters = ref([
  {
    name: "shp",
    extensions: ["shp"], // 只选择jsp, png
    buttonLabel: "确认",
  },
]);

const layerName = ref("");

const tableName = ref("");

let tableData: any = reactive([]);

const attributes = ref(null);

watch(tableData, (value) => {
  console.log(value);
});

watch(path, () => {
  const shpPath = path.value;
  const dirPath = dirname(shpPath);
  const fileName = basename(shpPath, ".shp");

  const cpgPath = join(dirPath, fileName + ".cpg");
  const dbfPath = join(dirPath, fileName + ".dbf");
  const prjPath = join(dirPath, fileName + ".prj");
  const shxPath = join(dirPath, fileName + ".shx");

  Promise.all([
    getFile(shpPath),
    getFile(cpgPath),
    getFile(dbfPath),
    getFile(prjPath),
    getFile(shxPath),
  ]).then((result) => {
    const files = result.filter((item) => {
      return item != null;
    });
    const eShapeFile: any = new EShapeFile({
      projection: olProj.get("EPSG:4326"),
    });
    eShapeFile.on("loaded", () => {
      const features = eShapeFile.getFeatures();
      console.log(features);
      const jsons: IGeoJSON = JSON.parse(new GeoJSON().writeFeatures(features));

      const data = getTableData(
        jsons.features.map((item: IFeature) => {
          let obj = {};
          for (let field in item.properties) {
            obj[field.trim()] = item.properties[field];
          }
          return obj;
        })
      );
      data.fields.forEach((item) => {
        tableData.push({
          key: buildUUID(),
          originName: item.name,
          destName: item.name,
          type: item.type,
          length: item.length,
          scale: item.scale,
          primary: item.primary,
          selected: true,
        });
      });

      attributes.value = data.attributes;
    });

    eShapeFile.on("error", (err: any) => {
      message.error(err.message);
    });
    eShapeFile.readFile(files);
  });
});

const handlePre = () => {
  currentStep.value -= 1;
};

const handlePreMost = () => {
  currentStep.value = 0;
};

const { refreshLayerInfo } = useMainWindow();
const { close } = useWindow();
const handleOk = () => {
  createTable(
    tableName.value,
    tableData
      .filter((item) => {
        return item.selected;
      })
      .map((item) => {
        return {
          ...item,
          name: item.destName,
        };
      })
  ).then((result: ResponseResult<any>) => {
    if (result.code == ResponseCode.SUCCESS) {
      insertTable(
        tableName.value,
        attributes.value.map((item1) => {
          let obj = {};
          tableData
            .filter((item) => {
              return item.selected;
            })
            .forEach((item2) => {
              obj[item2.destName] = item1[item2.originName];
            });
          return obj;
        })
      ).then((result) => {
        console.log(result.msg);
        if (result.code == ResponseCode.SUCCESS) {
          insertLayerInfo({
            id: buildUUID(),
            parentId: route.query.parentId as String,
            mapId: 1,
            title: layerName.value,
            type: "vector",
            canDelete: true,
            canEdit: true,
            expand: true,
            info: {
              table: tableName.value,
            },
          }).then((result) => {
            if (result.code == ResponseCode.SUCCESS) {
              refreshLayerInfo();
              close();
              // message.success("添加成功！");
              // homeStore.getLayerInfos(1).then((result2: any) => {
              //   if (result2.code == ResponseCode.SUCCESS) {
              //     close();
              //   } else {
              //     message.error(result2.msg, 1);
              //   }
              // });
            } else {
              message.error(result.msg as string, 1);
            }
          });
        } else {
          message.error(result.msg as string, 1);
        }
      });
    } else {
      message.error(result.msg as string, 1);
    }
  });
};
</script>
<style lang="less" scoped>
.tableStructureCompare {
  height: calc(100% - 180px);
  box-sizing: border-box;
}
.ant-row {
  margin-top: 10px;
  line-height: 32px;
}

.content {
  height: calc(100% - 40px);
}
</style>
