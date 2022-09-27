<template>
  <vue2ol-layer-vector>
    <vue2ol-source-vector :features="features"></vue2ol-source-vector>
  </vue2ol-layer-vector>
</template>
<script lang="ts" setup>
import { GeoJSON } from "ol/format";
import { readAsGeoJSON } from "@/api/table";
import { Ref } from "vue";
const props = defineProps({
  tableName: {
    type: String,
  },
});

const features: Ref<any[]> = ref([]);

onMounted(() => {
  readAsGeoJSON(props.tableName).then((result) => {
    features.value = new GeoJSON().readFeatures(result);
  });
});
</script>
