<template>
	<div class="vue2cesium-viewer" ref="container">
		<slot v-if="ready" />
	</div>
</template>

<script setup>
import { ref, getCurrentInstance } from 'vue';
import * as Cesium from 'cesium';

const instance = getCurrentInstance().proxy;
const ready = ref(false);
const cesiumObject = ref(null);
const container = ref(null);

const emits = defineEmits(['beforeLoad', 'ready', 'destroyed']);

onUnmounted(() => {
	cesiumObject.value.destroy();
	emits('destroyed');
});

onMounted(() => {
	emits('beforeLoad', cesiumObject.value);
	let options = {
		animation: false,
		homeButton: false,
		geocoder: false,
		sceneModePicker: false,
		baseLayerPicker: false,
		timeline: false,
		infoBox: false,
		navigationHelpButton: false,
		selectionIndicator: false,
		terrainProvider: null,
		imageryProvider: false,
		baseLayerPicker: false,
	};
	cesiumObject.value = new Cesium.Viewer(container.value, options);

	ready.value = true;
	instance.$nextTick(() => {
		/**
		 * 当组件加载完时触发
		 * @type {object}
		 * @property {object} cesiumObject
		 */
		emits('ready', cesiumObject.value);
	});
});
provide('viewer', cesiumObject);
provide('cesiumObject', cesiumObject);
</script>
<style type="text/css">
.vue2cesium-viewer {
	height: 100%;
	width: 100%;
}
</style>
