<template>
  <sys-header :windowName="'AddLayer'"></sys-header>
  <div class="content">
    <select-format
      v-if="current == 0"
      @on-change="handleChangeFormat"
      v-model:current="current"
    ></select-format>
    <add-null v-if="current == 1 && format == 'null'" v-model:current="current">
    </add-null>
    <add-shp v-if="current == 1 && format == 'shp'" v-model:current="current">
    </add-shp>
  </div>
</template>

<script setup lang="ts">
import { deleteById } from "@/api/mapLayerInfo";
import { useHomeStore } from "@/store/home";
import { ipcRenderer } from "electron";
import SysHeader from "@/components/header";
import SelectFormat from "./components/select-format/index";
import AddNull from "./components/add-null/index";
import AddShp from "./components/add-shp/index";
const remote = require("@electron/remote");
const homeStore = useHomeStore();

const current = ref(0);
const format = ref("");

const handleChangeFormat = (data) => {
  format.value = data;
};
</script>
<style lang="less" scoped>
.content {
  height: calc(100% - 48px);
}
</style>
