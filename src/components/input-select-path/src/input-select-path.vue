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
  pathType: {
    type: String as PropType<"File" | "Directory">,
    default: "File",
  },
  multiple: {
    type: Boolean,
    default: false,
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
    .showOpenDialog({
      title: "请选择文件",
      defaultPath: path.value,
      filters: props.filters,
      properties: [
        props.pathType == "Directory" ? "openDirectory" : "openFile ",
        props.multiple ? "multiSelections" : "",
      ],
    })
    .then((result) => {
      if (result && result.filePaths.length) {
        path.value = result.filePaths.join(";");
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
  margin-right: 10px;
}

.btn {
  display: flex;
}
</style>
