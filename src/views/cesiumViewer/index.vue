<template>
	<vc-config-provider :cesiumPath="''">
		<vc-viewer
			:access-token="'cc4ded9c8fa65c654611568acc889439'"
			@ready="handleReady"
			:showCredit="false">
			<vc-ajax-bar position="bottom" color="#21BA45" size="5px" positioning="fixed"></vc-ajax-bar>
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

const handleReady = (event) => {
	console.log(event);
	isReady.value = true;
};
</script>
