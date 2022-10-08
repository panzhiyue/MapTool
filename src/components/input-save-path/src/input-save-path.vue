<template>
  <div class="flex">
    <span v-if="title" class="title">{{ title }}:</span>
    <a-input class="input" v-model:value="value" :disabled="!editable"></a-input
    ><a-button class="btn" @click="handleSelect">...</a-button>
  </div>
</template>
<script lang="ts" setup>
import { useVModel } from "@vueuse/core";
import { PropType } from "vue";
const remote = require("@electron/remote");
const props = defineProps({
  title: {
    type: String,
    default: () => "选择文件",
  },
  filters: {
    type: Array,
  },
  value: {
    type: String,
  },
  editable: {
    type: Boolean,
  },
});

const emits = defineEmits(["update:value"]);

const path = useVModel(props, "value", emits);

const handleSelect = () => {
  remote.dialog
    .showSaveDialog({
      title: "请选择文件",
      defaultPath: path.value,
      filters: props.filters,
    })
    .then((result) => {
      if (result) {
        path.value = result.filePath;
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
</script>
<style lang="less" scoped>
.title {
  display: flex;
  line-height: 32px;
}

.input {
  display: flex;
  flex: 1;
  margin-left: 10px;
  margin-right: 10px;
}

.btn {
  display: flex;
}
</style>
