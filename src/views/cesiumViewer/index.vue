<template>
	<viewer @ready="handleReady">
		<Nav></Nav>
		<image-layer-tianditu layer="vec"></image-layer-tianditu>
		<image-layer-tianditu layer="cva"></image-layer-tianditu>
		<status-bar v-if="cesiumViewerStore.viewOpts.showStatusBar"></status-bar>
		<distance-legend v-if="cesiumViewerStore.viewOpts.showDistanceLegend"></distance-legend>
		<navigation v-if="cesiumViewerStore.viewOpts.showNavigation"></navigation>
		<timeline v-if="cesiumViewerStore.viewOpts.showTimeline"></timeline>
		<view-manager></view-manager>
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
import Timeline from './components/control/timeline';
import ViewManager from './components/control/view-manager';

const cesiumViewerStore = useCesiumViewerStore();

window.Cesium = Cesium;

const isReady = ref(false);

const handleReady = (viewer) => {
	viewer._cesiumWidget._creditContainer.style.display = 'none';
	isReady.value = true;
};
</script>
