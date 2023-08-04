<template>
	<vue2ol-layer-vector>
		<vue2ol-source-vector :features="features"></vue2ol-source-vector>
	</vue2ol-layer-vector>
</template>
<script lang="ts" setup>
import { GeoJSON } from 'ol/format';
import { readAsGeoJSON } from '@/api/table';
import { PropType, Ref } from 'vue';
import { getDB } from '@/utils/db/MapTool';
const props = defineProps({
	tableName: {
		type: String,
	},
	dataProjection: {
		type: Object as PropType<any>,
	},
	featureProjection: {
		type: Object as PropType<any>,
	},
});
const features: Ref<any[]> = ref([]);

onMounted(async () => {
	const db = await getDB();
	readAsGeoJSON(db, props.tableName).then((result) => {
		features.value = new GeoJSON({
			dataProjection: props.dataProjection,
			featureProjection: props.featureProjection,
		}).readFeatures(result);
	});
});
</script>
