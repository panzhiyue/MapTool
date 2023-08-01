<template>
	<viewer @ready="handleReady">
		<Nav></Nav>
		<image-layer-tianditu></image-layer-tianditu>
		<status-bar v-if="cesiumViewerStore.viewOpts.showStatusBar"></status-bar>
	</viewer>
</template>
<script setup>
import * as Cesium from 'cesium';
import StatusBar from './components/control/status-bar/index.vue';
import Viewer from './components/viewer/index.vue';
import ImageLayerTianditu from './components/image-provider/tianditu';
import { useCesiumViewerStore } from '@/store/cesiumViewer';
import Nav from './components/nav';

const cesiumViewerStore = useCesiumViewerStore();

window.Cesium = Cesium;

const isReady = ref(false);

const handleReady = (viewer) => {
	viewer._cesiumWidget._creditContainer.style.display = 'none';
	// viewer.terrainProvider = Cesium.Terrain.fromWorldTerrain({
	// 	requestWaterMask: true,
	// 	requestVertexNormals: true,
	// });
	isReady.value = true;
};
</script>
