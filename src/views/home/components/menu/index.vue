<template>
  <div class="menu">
    <a-dropdown>
      <span>文件</span>
      <template #overlay>
        <a-menu>
          <a-menu-item key="0">
            <a> 新建</a>
          </a-menu-item>
          <a-menu-item key="1">
            <a> 打开 </a>
          </a-menu-item>
          <a-menu-divider />
          <a-sub-menu key="g1">
            <template #title>添加数据</template>
            <a-menu-item key="1">x</a-menu-item>
            <a-menu-item key="2">y</a-menu-item>
          </a-sub-menu>
        </a-menu>
      </template>
    </a-dropdown>

    <a-dropdown>
      <span>窗口</span>
      <template #overlay>
        <a-menu>
          <a-menu-item key="0">
            <span @click="handleShowTool"> 工具</span>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>
<script lang="ts" setup>
import { ipcRenderer } from "electron";
const handleShowTool = () => {
  ipcRenderer.send("open-win", "Tool", `tool`, {
    width: 400,
    height: 700,
    frame: true,
  });
};
</script>
<style lang="less" scoped>
.menu {
  height: 20px;
  line-height: 20px;

  /deep/ .ant-dropdown-trigger {
    display: inline-block;
    width: 40px;
    text-align: center;
  }
}
</style>
