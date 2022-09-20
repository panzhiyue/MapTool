<template>
  <div class="global-header">
    <div class="right">
      <a-button type="primary" shape="circle">
        <template #icon>
          <SyncOutlined />
        </template>
      </a-button>
      <a-button type="text ">
        <template #icon>
          <SettingFilled
            style="color: rgba(24, 24, 25, 0.42); font-size: 20px"
          />
        </template>
      </a-button>
      <a-button type="text ">
        <template #icon>
          <QuestionCircleFilled
            style="color: rgba(24, 24, 25, 0.42); font-size: 20px"
          />
        </template>
      </a-button>
      <a-avatar
        :size="'small'"
        src="https://thirdwx.qlogo.cn/mmopen/vi_32/Z0jd6kA5A09zwBxMHme5lCPjmYictBt7nKqwgl2TyohDaEkvUDFibQZKgR2HA39cE2OiaIsMqaN0gz84n2lD4nI7Q/132"
      />
      <window-controls></window-controls>
      <!-- <div id="window-controls">
        <button class="button" id="min-button" @click="handleMin">
          <i class="iconfont icon-windowminimize"></i>
        </button>

        <button
          class="button"
          id="max-button"
          @click="handleMax"
          v-show="!isMaximized"
        >
          <i class="iconfont icon-windowmaximize"></i>
        </button>
        <button
          class="button"
          id="restore-button"
          @click="handleRestore"
          v-show="isMaximized"
        >
          <i class="iconfont icon-windowrestore"></i>
        </button>

        <button class="button" id="close-button" @click="handleClose">
          <i class="iconfont icon-windowclose"></i>
        </button>
      </div> -->
    </div>
  </div>
</template>
<script setup>
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

onMounted(() => {
  console.log(remote);
});

const window = remote.getCurrentWindow();
const isMaximized = ref(window.isMaximized());

const handleMin = () => {
  ipcRenderer.send("main-minimize");
};

const handleMax = () => {
  ipcRenderer.send("main-maximize");
};

const handleRestore = () => {
  ipcRenderer.send("main-unmaximize");
};

const handleClose = () => {
  ipcRenderer.send("main-close");
};

ipcRenderer.on("main-maximize", () => {
  isMaximized.value = true;
});

ipcRenderer.on("main-unmaximize", () => {
  isMaximized.value = false;
});
</script>
<style lang="less" scoped>
.global-header {
  height: 48px;
  display: flex;
  justify-content: flex-end;
  .right {
    display: flex;
    height: 100%;
    overflow: hidden;
    -webkit-app-region: no-drag;
    padding-right: 0.75rem;
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
    #window-controls {
      display: grid;
      grid-template-columns: repeat(3, 25px);
      padding-right: 16px;
      padding-left: 16px;
      // height: var(--safe-window-control-height);

      .button {
        display: flex;
        grid-row: 1 / span 1;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        border-radius: 0.375rem;
        user-select: none;
        -webkit-app-region: no-drag;
        background-color: rgba(0, 0, 0, 0);
        border: 0px;
        cursor: pointer;

        i {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 21px;
          height: 21px;
          font-size: 18px;
          border-radius: 4px;
          fill: currentColor;
          -webkit-app-region: no-drag;
          padding: 2px;
        }

        i:hover {
          background-color: rgba(224, 224, 224, 1);
        }
      }

      #min-button {
        grid-column: 1;
      }

      #max-button {
        grid-column: 2;
      }

      #restore-button {
        grid-column: 2;
      }

      #close-button {
        grid-column: 3;
      }
    }
  }
}
</style>
