<template>
  <div class="w-full p-5">
    <a-form :label-col="{ style: { width: '80px' } }" layout="horizontal">
      <a-form-item label="输入图层:">
        <map-layer-select v-model:value="selectLayer"></map-layer-select>
      </a-form-item>
      <a-form-item label="输出路径:">
        <input-save-path
          v-model:value="savePath"
          title=""
          :filters="filters"
        ></input-save-path>
      </a-form-item>
    </a-form>
  </div>
  <step-footer
    :next-most-text="null"
    :next-text="null"
    :pre-most-text="null"
    :pre-text="null"
    ok-text="确定"
    cancel-text="取消"
    @on-ok="handleOk"
    @on-cancel="handleCancel"
  ></step-footer>
</template>
<script setup lang="ts">
import MapLayerSelect from "@/components/map-layer-select";
import InputSavePath from "@/components/input-save-path";
import path from "path";
import { useWindow } from "@/hooks/electron/useWindow";
import { useMainWindow } from "@/hooks/electron/useMainWindow";
import { getByWhere } from "@/api/mapLayerInfo";
import ResponseResult from "@/utils/db/ResponseResult";
import { IMapLayerInfo } from "#/index";
import ResponseCode from "@/enum/ResponseCode";
import { readAsGeoJSON } from "@/api/table";
import { GeoJSON, TopoJSON } from "ol/format";
import fs from "fs";
import { GeoJson2Shp } from "@gis-js/geojson2shp";
import WindowName from "@/enum/WindowName";
const remote = require("@electron/remote");
let sharedObject = remote.getGlobal("sharedObject");

const selectLayer = ref();

const savePath = ref("");

const filters = ref([
  {
    name: "shp",
    extensions: ["shp"], // 只选择jsp, png
  },
  {
    name: "geojson",
    extensions: ["geojson"], // 只选择jsp, png
  },
  {
    name: "topojson",
    extensions: ["topojson"], // 只选择jsp, png
  },
  {
    name: "excel",
    extensions: ["xlsx"], // 只选择jsp, png
  },
]);
const { close } = useWindow();
const { exportVector } = useMainWindow();
const handleOk = () => {
  let ext = path.extname(savePath.value).slice(1);
  exportVector({
    layerId: selectLayer.value,
    savePath: savePath.value,
    format: ext,
    fromWindowId: sharedObject["ExportVector"],
    fromWindowName: WindowName.EXPORT_VECTOR,
    toWindowId: sharedObject["Main"],
    toWindowName: WindowName.MAIN,
  });
  // let ext = path.extname(savePath.value).slice(1);
  // getByWhere({ id: selectLayer.value }).then(
  //   (result: ResponseResult<IMapLayerInfo[]>) => {
  //     if (result.code == ResponseCode.SUCCESS) {
  //       let info = JSON.parse(result.data[0].info);
  //       readAsGeoJSON(info.table).then((result2: Object) => {
  //         let features = new GeoJSON().readFeatures(result2);

  //         switch (ext) {
  //           case "shp": {
  //             let g2s = new GeoJson2Shp(result2);
  //             const shpPath = savePath.value;
  //             const dirPath = path.dirname(shpPath);
  //             const fileName = path.basename(shpPath, ".shp");

  //             const cpgPath = path.join(dirPath, fileName + ".cpg");
  //             const dbfPath = path.join(dirPath, fileName + ".dbf");
  //             const prjPath = path.join(dirPath, fileName + ".prj");
  //             const shxPath = path.join(dirPath, fileName + ".shx");

  //             g2s.writePoint(
  //               function (err, files) {
  //                 console.log(files);
  //                 fs.writeFileSync(shpPath, files.shp);
  //                 fs.writeFileSync(shxPath, files.shx);
  //                 fs.writeFileSync(dbfPath, files.dbf);
  //                 fs.writeFileSync(
  //                   prjPath,
  //                   `GEOGCS["GCS_WGS_1984",DATUM["D_WGS_1984",SPHEROID["WGS_1984",6378137.0,298.257223563]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433],AUTHORITY["EPSG",4326]]`
  //                 );
  //                 fs.writeFileSync(cpgPath, "UTF-8");
  //               }.bind(this)
  //             );
  //             break;
  //           }
  //           case "geojson": {
  //             fs.writeFile(savePath.value, JSON.stringify(result2), () => {
  //             });
  //             break;
  //           }
  //           case "topojson": {
  //             fs.writeFile(
  //               savePath.value,
  //               JSON.stringify(new TopoJSON().writeFeatures(features)),
  //               () => {}
  //             );
  //             break;
  //           }
  //           case "excel": {
  //             break;
  //           }
  //         }
  //       });
  //     }
  //   }
  // );
};

const handleCancel = () => {
  close();
};
</script>
<style lang="less" scoped></style>
