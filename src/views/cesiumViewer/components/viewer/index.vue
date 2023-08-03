<template>
	<div class="vue2cesium-viewer" ref="container">
		<slot v-if="ready" />
	</div>
</template>

<script setup>
import { ref, getCurrentInstance } from 'vue';
import { Viewer, Clock } from 'cesium';

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
		animation: false, //是否创建动画小器件，左下角仪表
		homeButton: false, //是否显示Home按钮
		geocoder: false, //是否显示geocoder小器件，右上角查询按钮
		sceneModePicker: false, //是否显示3D/2D选择器
		baseLayerPicker: false, //是否显示图层选择器
		timeline: false, //是否显示时间轴
		infoBox: false, //是否显示信息框
		navigationHelpButton: false, //是否显示右上角的帮助按钮
		selectionIndicator: false, //是否显示选取指示器组件
		scene3DOnly: true, //如果设置为true，则所有几何图形以3D模式绘制以节约GPU资源
		terrainProvider: null, //new EllipsoidTerrainProvider(), //地形图层提供者
		imageryProvider: false,
		baseLayerPicker: false,
		fullscreenButton: false, //是否显示全屏按钮
		clock: new Clock(),
		contextOptions: {
			id: 'cesiumCanvas', //must
			webgl: {
				preserveDrawingBuffer: true, //此处为true，即可
			},
		},
	};
	cesiumObject.value = new Viewer(container.value, options);

	//使用太阳作为光源，可以照亮地球。
	cesiumObject.value.scene.globe.enableLighting = false;
	//关闭地面大气效果，（默认为开启状态）
	cesiumObject.value.scene.globe.showGroundAtmosphere = false;

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
	position: relative;
	height: 100%;
	width: 100%;
}
</style>
