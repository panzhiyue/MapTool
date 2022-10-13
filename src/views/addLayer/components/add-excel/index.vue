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
      <a-space>
        格式:
        <a-select v-model:value="format" class="w-200px">
          <a-select-option
            v-for="(item, index) in formatList"
            :value="item"
            :key="`format${index}`"
            >{{ item }}</a-select-option
          >
        </a-select>
        <div v-if="format == '经纬度'">
          经度字段
          <a-select v-model:value="lngField" class="w-120px">
            <a-select-option
              v-for="(item, index) in header"
              :value="item"
              :key="`lng${index}`"
              >{{ item }}</a-select-option
            >
          </a-select>
          纬度字段
          <a-select v-model:value="latField" class="w-120px">
            <a-select-option
              v-for="(item, index) in header"
              :value="item"
              :key="`lat${index}`"
              >{{ item }}</a-select-option
            >
          </a-select>
        </div>
        <div v-if="format != '经纬度'">
          几何字段
          <a-select v-model:value="geometryField" class="w-120px">
            <a-select-option
              v-for="(item, index) in header"
              :value="item"
              :key="`geom${index}`"
              >{{ item }}</a-select-option
            >
          </a-select>
        </div>
      </a-space>
    </a-row>
    <a-row>
      <a-space
        >几何类型：
        <a-select v-model:value="geometryType" class="w-120px">
          <a-select-option
            v-for="(item, index) in geometryTypeList"
            :value="item"
            :key="`geometryType${index}`"
            >{{ item }}</a-select-option
          >
        </a-select></a-space
      >
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
import { useRoute } from "vue-router";
import { useHomeStore } from "@/store/home";
import { useMainWindow } from "@/hooks/electron/useMainWindow";
import { useWindow } from "@/hooks/electron/useWindow";
import dayjs from "dayjs";
import { WKT } from "ol/format";
import fs from "fs";
import { excel2json } from "@/utils/excel";
import { Point } from "ol/geom";
import Feature from "ol/Feature";
import { WKT as FormatWKT } from "ol/format";
import { getVectorType } from "@/utils/gis";
import { importVector } from "@/utils";

const route = useRoute();

const props = defineProps({
  current: {
    type: Number,
  },
});

const emits = defineEmits(["update:current"]);
const currentStep = useVModel(props, "current", emits);
const homeStore = useHomeStore();
const formatList = ref(["经纬度", "wkt", "geojson"]);
const format = ref("经纬度");
const lngField = ref("");
const latField = ref("");
const geometryField = ref("");
const path = ref("");
const filters = ref([
  {
    name: "excel",
    extensions: ["xlsx"],
    buttonLabel: "确认",
  },
]);
const layerName = ref("");
const tableName = ref("vector_" + dayjs().unix().toString());
let tableData: any = reactive([]);
const attributes = ref(null);
const geometryType = ref("");
const geometryTypeList = ref();

const header = ref([]);

const excelData = ref(null);
const features = ref(null);

watch(features, () => {
  console.log(features);
  if (!features.value && features.value.length > 0) {
    geometryTypeList.value = [];
    geometryType.value = "";
  } else {
    geometryTypeList.value = features.value.map((feature) => {
      return getVectorType(feature.getGeometry());
      // return {
      //   label: getVectorType(feature.getGeometry()),
      //   value: getVectorType(feature.getGeometry()),
      // };
    });
    geometryTypeList.value = Array.from(new Set(geometryTypeList.value));
    geometryType.value = getVectorType(features.value[0].getGeometry());
  }
});
watch([excelData, format, lngField, latField, geometryField], () => {
  console.log(format.value,geometryField.value);
  if (
    excelData.value &&
    format.value == "经纬度" &&
    lngField.value &&
    latField.value
  ) {
    let fs = [];
    for (let i = 0; i < excelData.value.length; i++) {
      let item = excelData.value[i];
      try {
        let geometry = new Point([
          parseFloat(item[lngField.value]),
          parseFloat(item[latField.value]),
        ]);
        delete item.geometry;
        let feature = new Feature({
          geometry,
        });
        feature.setProperties(item);

        fs.push(feature);
      } catch {
        console.log("error:" + i, item.geometry);
      }
    }
    features.value = fs;
  } else if (
    excelData.value &&
    format.value != "经纬度" &&
    geometryField.value
  ) {
    let fs = [];
    for (let i = 0; i < excelData.value.length; i++) {
      let item = excelData.value[i];
      try {
        let geometry = new FormatWKT().readGeometry(
          typeof item.geometry == "string"
            ? item.geometry
            : item.geometry.result
        );
        delete item.geometry;
        let feature = new Feature({
          geometry,
        });
        feature.setProperties(item);
        fs.push(feature);
      } catch {
        console.log("error:" + i, item.geometry);
      }
    }
    features.value = fs;
  } else {
    features.value = null;
  }
});

watch(path, () => {
  fs.readFile(path.value, (err, result) => {
    excel2json(result).then((res) => {
      if (res.length > 0) {
        let data = res[0];
        header.value = data.header;
        excelData.value = data.data;
      }
    });
  });
});

watch(features, () => {
  if (features.value) {
    let wktFormat = new WKT();
    const data = getTableData(
      features.value.map((item) => {
        let obj = {};
        for (let field in item.getProperties()) {
          if (field == "geometry") {
            obj["geom_wkt"] = wktFormat.writeGeometry(item.getGeometry());
          } else {
            obj[field.trim()] = item.get(field);
          }
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
  } else {
    tableData.value = [];
    attributes.value = null;
  }
});

const handlePre = () => {
  currentStep.value -= 1;
};

const handlePreMost = () => {
  currentStep.value = 0;
};

const handleOk = () => {
  importVector(
    route.query.parentId as string,
    geometryType.value,
    tableName.value,
    tableData,
    attributes.value,
    layerName.value
  );
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
