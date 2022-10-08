<template>
  <div class="toolbar">
    <a-space style="margin-top: -4px"
      ><i class="icon icon-pre-step" title="前视图"></i
      ><i class="icon icon-next-step" title="后视图"></i
      ><i class="icon icon-select" title="选择"></i
      ><i class="icon icon-pan" title="漫游" @click="handlePan"></i
      ><i class="icon icon-zoom-in" title="放大" @click="handleZoomIn"></i
      ><i class="icon icon-zoom-out" title="缩小" @click="handleZoomOut"></i
      ><i class="icon icon-help" title="帮助" @click="handleHelp"></i
    ></a-space>
  </div>
</template>
<script lang="ts" setup>
import { useHomeStore } from "@/store/home";

const homeStore = useHomeStore();

const handlePan=()=>{

}

const handleZoomIn=()=>{

}

const handleZoomOut=()=>{

}

const handleHelp=()=>{
    
}
</script>
<style lang="less" scoped>
.toolbar {
  background-color: rgba(1, 115, 199, 1);
  color: white;
  font-size: 16px;
  height: 30px;
  line-height: 30px;
}
</style>
