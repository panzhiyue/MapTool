<template>
  <div class="global-header">
    <div class="left">
      <img :src="iconUrl" />
      <span class="title">{{ title }}</span>
    </div>
    <div class="right">
      <window-controls :name="windowName"></window-controls>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ipcRenderer } from "electron";
const remote = require("@electron/remote"); //1
import {
  DownloadOutlined,
  SyncOutlined,
  SettingFilled,
  QuestionCircleFilled,
} from "@ant-design/icons-vue";
import { onMounted, computed, ref } from "vue";
import WindowControls from "@/components/window-controls";
import icon from "@/assets/vite.svg";

const props = defineProps({
  iconUrl: {
    type: String,
    default: () => icon,
  },
  title: {
    type: String,
    default: () => "MapTool",
  },
  windowName: {
    type: String,
    default: () => "Main",
  },
});

onMounted(() => {});

</script>
<style lang="less" scoped>
.global-header {
  height: 48px;
  display: flex;
  justify-content: space-between;

  .left {
    display: flex;

    img {
      width: 20px;
      margin-left: 16px;
    }

    .title {
      line-height: 48px;
      margin-left: 8px;
    }
  }
  .right {
    display: flex;
    height: 100%;
    overflow: hidden;
    -webkit-app-region: no-drag;
    align-items: center;

    .ant-btn {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      line-height: 100%;
      margin-right: 0.5rem;
    }
    .ant-avatar {
      margin-left: 4px;
      margin-right: 0px;
    }
  }
}
</style>
