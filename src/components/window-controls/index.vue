<template>
  <div class="window-controls">
    <button class="button" id="min-button" @click="handleMin">
      <i class="icon icon-window-minimize"></i>
    </button>

    <button
      class="button"
      id="max-button"
      @click="handleMax"
      v-show="!isMaximized"
    >
      <i class="icon icon-window-maximize"></i>
    </button>
    <button
      class="button"
      id="restore-button"
      @click="handleRestore"
      v-show="isMaximized"
    >
      <i class="icon icon-window-restore"></i>
    </button>

    <button class="button" id="close-button" @click="handleClose">
      <i class="icon icon-window-close"></i>
    </button>
  </div>
</template>
<script setup lang="ts">
import { ipcRenderer } from "electron";
const remote = require("@electron/remote"); //1
defineOptions({
  name: "WindowControls",
});

const props = defineProps({
  name: {
    type: String,
    default: () => "Main",
  },
});

const window = remote.getCurrentWindow();
const isMaximized = ref(window.isMaximized());

const handleMin = () => {
  ipcRenderer.send(`${props.name}-minimize`);
};

const handleMax = () => {
  ipcRenderer.send(`${props.name}-maximize`);
};

const handleRestore = () => {
  ipcRenderer.send(`${props.name}-unmaximize`);
};

const handleClose = () => {
  ipcRenderer.send(`${props.name}-close`);
};

ipcRenderer.on(`${props.name}-maximize`, () => {
  isMaximized.value = true;
});

ipcRenderer.on(`${props.name}-unmaximize`, () => {
  isMaximized.value = false;
});
</script>
<style lang="less" scoped>
.window-controls {
  display: grid;
  grid-template-columns: repeat(3, 40px);
  padding-right: 16px;
  padding-left: 16px;

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
</style>
