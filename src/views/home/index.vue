<template>
  <a-layout class="main">
    <a-layout-header class="header">
      <div class="logo" />
      <a-menu
        v-model:selectedKeys="selectedKeys1"
        theme="dark"
        mode="horizontal"
        :style="{ lineHeight: '64px' }"
      >
        <a-menu-item key="1">nav 1</a-menu-item>
        <a-menu-item key="2">nav 2</a-menu-item>
        <a-menu-item key="3">nav 3</a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout>
      <a-layout-sider width="300" style="background: #fff">
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
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>Home</a-breadcrumb-item>
          <a-breadcrumb-item>List</a-breadcrumb-item>
          <a-breadcrumb-item>App</a-breadcrumb-item>
        </a-breadcrumb>
        <a-layout-content
          :style="{
            background: '#fff',
            padding: '24px',
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
<script setup>
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons-vue";
import { defineComponent, ref } from "vue";
import Map from "./components/map/index.vue";
import MapLayerManager from "./components/map-layer-manager/index.vue";
import LayerManager from "./components/layer-manager/index";
import { useHomeStore } from "@/store/home";

let homeStore = useHomeStore();

const selectedKeys1 = ref(["2"]);
const selectedKeys2 = ref(["1"]);
const collapsed = ref(false);
const openKeys = ref(["sub1"]);

onMounted(() => {
  homeStore.initData(1);
});
</script>
<style>
.main {
  width: 100%;
  height: 100%;
}
#components-layout-demo-top-side-2 .logo {
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
}

.ant-row-rtl #components-layout-demo-top-side-2 .logo {
  float: right;
  margin: 16px 0 16px 24px;
}

.site-layout-background {
  background: #fff;
}
</style>
