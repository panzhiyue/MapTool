<template>
  <a-select :options="options" v-model:value="selectedLayer"></a-select>
</template>
<script setup lang="ts">
import { IMapLayerInfo } from "#/index";
import { useHomeStore } from "@/store/home";
import { useVModel } from "@vueuse/core";

const props = defineProps({
  value: String,
  layerTypes: {
    type: Array,
    default: () => ["vector"],
  },
});

const emits = defineEmits(["update:value"]);

const selectedLayer = useVModel(props, "value", emits);

const homeStore = useHomeStore();
const options = ref([]);

onMounted(() => {
  homeStore.getMapLayerInfos(1).then((result: IMapLayerInfo[]) => {
    options.value = result
      .filter((item: IMapLayerInfo) => {
        return props.layerTypes.indexOf(item.info.type) > -1;
      })
      .map((item) => {
        return {
          label: item.title,
          value: item.id,
        };
      });
  });
});
</script>
<style lang="less" scoped>
.ant-select {
  width: 100%;
}
</style>
