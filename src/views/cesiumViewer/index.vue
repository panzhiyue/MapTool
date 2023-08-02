<template>
	<viewer @ready="handleReady">
		<Nav></Nav>
		<image-layer-tianditu layer="img"></image-layer-tianditu>
		<image-layer-tianditu layer="cia"></image-layer-tianditu>
		<status-bar v-if="cesiumViewerStore.viewOpts.showStatusBar"></status-bar>
		<distance-legend v-if="cesiumViewerStore.viewOpts.showDistanceLegend"></distance-legend>
		<navigation></navigation>
	</viewer>
</template>
<script setup>
import * as Cesium from 'cesium';
import StatusBar from './components/control/status-bar/index.vue';
import Viewer from './components/viewer/index.vue';
import ImageLayerTianditu from './components/image-provider/tianditu';
import { useCesiumViewerStore } from '@/store/cesiumViewer';
import Nav from './components/nav';
import DistanceLegend from './components/control/distance-legend';
import Navigation from './components/control/navigation';

const cesiumViewerStore = useCesiumViewerStore();

window.Cesium = Cesium;

const isReady = ref(false);

const handleReady = (viewer) => {
	viewer._cesiumWidget._creditContainer.style.display = 'none';
	isReady.value = true;
};
</script>
