<template>
	<vc-config-provider :cesiumPath="''">
		<vc-viewer
			:access-token="'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlNmZlMThiNC05MjZjLTRhMzQtYjk1NC04Mzk1OWUzNGQyNDYiLCJpZCI6MTE2NjEsInNjb3BlcyI6WyJhc2wiLCJhc3IiLCJhc3ciLCJnYyJdLCJpYXQiOjE1NTk1NTEwODh9.1sP9cG15Apatkf1x1g1_P_86wc3gFNOZM66XoWLUsxc'"
			@ready="handleReady"
			:showCredit="false"
			:infoBox="false">
			<!-- <vc-ajax-bar position="bottom" color="#21BA45" size="5px" positioning="fixed"></vc-ajax-bar> -->
			<!-- <vc-terrain-provider-arcgis ref="provider"></vc-terrain-provider-arcgis> -->
			<!-- <vc-layer-imagery>
				<vc-imagery-provider-arcgis></vc-imagery-provider-arcgis>
			</vc-layer-imagery> -->

			<template v-if="isReady">
				<status-bar></status-bar>
			</template>
		</vc-viewer>
	</vc-config-provider>
</template>
<script setup>
import * as Cesium from 'cesium';
import StatusBar from './components/status-bar';
import { useCesiumViewerStore } from '@/store/cesiumViewer';

const cesiumViewerStore = useCesiumViewerStore();

window.Cesium = Cesium;

const isReady = ref(false);

const handleReady = async ({ Cesium, viewer }) => {
	console.log(Cesium);
	// var target = new Cesium.Cartesian3(300770.50872389384, 5634912.131394585, 2978152.2865545116);
	// var offset = new Cesium.Cartesian3(6344.974098678562, -793.3419798081741, 2499.9508860763162);
	// viewer.camera.lookAt(target, offset);
	// viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
	viewer.terrainProvider = Cesium.createWorldTerrainAsync({
		requestWaterMask: true,
		requestVertexNormals: true,
	});
	isReady.value = true;
};
</script>
