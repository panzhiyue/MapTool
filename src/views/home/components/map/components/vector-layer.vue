<template>
	<vue2ol-layer-vector>
		<vue2ol-source-vector :features="features"></vue2ol-source-vector>
	</vue2ol-layer-vector>
</template>
<script lang="ts" setup>
import { GeoJSON } from 'ol/format';
import { readAsGeoJSON } from '@/api/table';
import { Ref } from 'vue';
const props = defineProps({
	tableName: {
		type: String,
	},
	dataProjection: {
		type: String,
	},
	featureProjection: {
		type: String,
	},
});
console.log(props.dataProjection);
const features: Ref<any[]> = ref([]);

onMounted(() => {
	readAsGeoJSON(props.tableName).then((result) => {
		features.value = new GeoJSON({
			dataProjection: props.dataProjection,
			featureProjection: props.featureProjection,
		}).readFeatures(result);
	});
});
</script>
