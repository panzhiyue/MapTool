<template>
  <div>
    <a-radio-group v-model:value="layerType">
      <a-radio
        v-for="(item, index) in layerTypes"
        :value="item.value"
        :key="index"
        :style="radioStyle"
      >
        {{ item.label }}
      </a-radio>
    </a-radio-group>

    <a-button
      type="primary"
      style="margin-top: 10px; margin-left: 400px"
      @click="next"
      >下一步</a-button
    >
  </div>
</template>

<script setup lang="ts">
const layerTypes = ref([
  {
    label: "矢量数据(空)",
    value: "null",
  },
  {
    label: "矢量数据(.shp)",
    value: "shp",
  },
  {
    label: "矢量数据(.geojson)",
    value: "geojson",
  },
  {
    label: "矢量数据(.topojson)",
    value: "topojson",
  },
  {
    label: "wms",
    value: "wms",
  },
  {
    label: "wmts",
    value: "wmts",
  },
]);

const layerType = ref("null");

const radioStyle = reactive({
  display: "flex",
  height: "30px",
  lineHeight: "30px",
});

const emit = defineEmits(["sure"]);
const next = () => {
  emit("sure", layerType.value);
};
</script>

<style lang="less" scoped></style>
