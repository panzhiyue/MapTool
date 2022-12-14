<template>
	<select-format
		v-if="current == 0"
		@on-change="handleChangeFormat"
		v-model:current="current"></select-format>
	<add-null v-if="current == 1 && format == 'null'" v-model:current="current"> </add-null>
	<add-shp v-if="current == 1 && format == 'shp'" v-model:current="current"> </add-shp>
	<add-geojson v-if="current == 1 && format == 'geojson'" v-model:current="current"> </add-geojson>
	<add-topojson v-if="current == 1 && format == 'topojson'" v-model:current="current">
	</add-topojson>
	<add-geometry-text v-if="current == 1 && format == 'geometry-text'" v-model:current="current">
	</add-geometry-text>
	<add-api-result v-if="current == 1 && format == 'api-result'" v-model:current="current">
	</add-api-result>
	<add-image-arcgis-rest
		v-if="current == 1 && format == 'ImageArcGISRest'"
		v-model:current="current">
	</add-image-arcgis-rest>
	<add-excel v-if="current == 1 && format == 'excel'" v-model:current="current"> </add-excel>
</template>

<script setup lang="ts">
import { deleteById } from '@/api/mapLayerInfo';
import { useHomeStore } from '@/store/home';
import { ipcRenderer } from 'electron';
import SysHeader from '@/components/header/index.vue';
import SelectFormat from './components/select-format/index.vue';
import AddNull from './components/add-null/index.vue';
import AddShp from './components/add-shp/index.vue';
import AddGeojson from './components/add-geojson/index.vue';
import AddTopojson from './components/add-topojson/index.vue';
import AddImageArcgisRest from './components/add-image-arcgis-rest/index.vue';
import AddExcel from './components/add-excel/index.vue';
import AddGeometryText from './components/add-geometry-text/index.vue';
import AddApiResult from './components/add-api-result/index.vue';
const remote = require('@electron/remote');
const homeStore = useHomeStore();

const current = ref(0);
const format = ref('');

const handleChangeFormat = (data) => {
	format.value = data;
};
</script>
<style lang="less" scoped></style>
