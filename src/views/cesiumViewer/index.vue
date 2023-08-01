<template>
	<viewer @ready="handleReady">
		<image-layer-tianditu></image-layer-tianditu>
		<status-bar></status-bar>
	</viewer>
</template>
<script setup>
import * as Cesium from 'cesium';
import StatusBar from './components/control/status-bar/index.vue';
import Viewer from './components/viewer/index.vue';
import ImageLayerTianditu from './components/image-provider/tianditu';
import { useCesiumViewerStore } from '@/store/cesiumViewer';

const cesiumViewerStore = useCesiumViewerStore();

window.Cesium = Cesium;

const isReady = ref(false);

const handleReady = (viewer) => {
	// viewer.terrainProvider = Cesium.Terrain.fromWorldTerrain({
	// 	requestWaterMask: true,
	// 	requestVertexNormals: true,
	// });
	isReady.value = true;
};
</script>
