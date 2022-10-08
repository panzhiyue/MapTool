<template>
  <a-layout class="main">
    <a-layout-header class="header">
      <sys-header></sys-header>
      <sys-menu></sys-menu>
      <tool-bar></tool-bar>
    </a-layout-header>
    <a-layout>
      <a-layout-sider
        width="300"
        style="background: #fff"
        class="scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 scrollbar-thumb-rounded-full scrollbar-track-rounded-full"
      >
        <a-collapse>
          <a-collapse-Panel key="1" header="图层管理">
            <layer-manager></layer-manager>
          </a-collapse-Panel>
          <a-collapse-Panel key="2" header="地图管理">
            <map-layer-manager></map-layer-manager>
          </a-collapse-Panel>
        </a-collapse>
      </a-layout-sider>
      <a-layout style="padding: 0 24px 24px">
        <a-layout-content
          :style="{
            background: '#fff',
            margin: 0,
            minHeight: '280px',
          }"
        >
          <Map></Map>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script setup lang="ts">
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons-vue";
import { defineComponent, ref } from "vue";
import Map from "./components/map/index.vue";
import MapLayerManager from "./components/map-layer-manager/index.vue";
import LayerManager from "./components/layer-manager/index";
import SysHeader from "./components/header/index";
import { useHomeStore } from "@/store/home";
import { ipcRenderer } from "electron";
import ToolBar from "./components/tool-bar/index.vue";
import SysMenu from "./components/menu/index.vue";
import { IExportImageOptions } from "#/index";
import domtoimage from "dom-to-image";
import fs from "fs";

let homeStore = useHomeStore();

const selectedKeys1 = ref(["2"]);
const selectedKeys2 = ref(["1"]);
const collapsed = ref(false);
const openKeys = ref(["sub1"]);

onMounted(() => {
  homeStore.initData(1);

  ipcRenderer.on("refresh-mapLayerInfo", () => {
    homeStore.getMapLayerInfos(1).then(() => {});
  });

  ipcRenderer.on("refresh-layerInfo", () => {
    homeStore.getLayerInfos(1).then(() => {});
  });

  ipcRenderer.on("exportImage", (event, options: IExportImageOptions) => {
    let dom = homeStore.map.getTarget() as Element;
    if (options.control == false) {
      dom = dom.getElementsByClassName("ol-layers")[0];
    }
    console.log(options.format);
    let funcEnu = {
      png: domtoimage.toPng,
      jpg: domtoimage.toJpeg,
    };

    funcEnu[options.format](dom, { quality: 0.95 }).then(function (data) {
      var base64 = data.split(",")[1]; //去掉图片base64码前面部分data:image/png;base64
      const imageBuffer = new Buffer(base64, "base64");
      fs.writeFileSync(options.path as string, imageBuffer);
    });
    event.sender.send(`${options.fromWindowName}-close`);
  });
});
</script>
<style>
.main {
  width: 100%;
  height: 100%;
}

.ant-layout-header {
  background-color: rgba(0, 0, 0, 0);
  padding: 0px;
  margin: 0px;
  height: 80px;
}

/* 
.ant-row-rtl #components-layout-demo-top-side-2 .logo {
  float: right;
  margin: 16px 0 16px 24px;
} */

/* .site-layout-background {
  background: #fff;
} */
</style>
