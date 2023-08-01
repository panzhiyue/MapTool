<template>
	<div></div>
</template>
<script setup>
const viewer = inject('viewer').value;
const cesiumObject = ref(null);
const props = defineProps({
	layer: {
		/**
		 * 'cia': 天地图全球中文注记服务（经纬度坐标系）。
'cta': 天地图全球地形中文注记服务（经纬度坐标系）。
'cva': 天地图全球矢量中文注记服务（经纬度坐标系）。
'eia': 天地图全球影像英文注记服务（经纬度坐标系）。
'eva': 天地图全球矢量英文注记服务（经纬度坐标系）。
'img': 天地图全球影像地图服务（经纬度坐标系）。
'ter': 天地图全球地形晕渲服务（经纬度坐标系）。
'vec': 天地图全球矢量地图服务（经纬度坐标系）。
'ibo': 天地图全球矢量地图服务（经纬度坐标系）。
		 */
		type: String,
		default: 'img',
	},
	token: {
		type: String,
		default: '6703c18da8b111f1ac38fdcfc4a138d8',
	},
	/**
	 * 'w':墨卡托投影坐标系
	 * 'c':经纬度坐标系
	 */
	tileMatrixSetID: {
		type: String,
		default: 'w',
	},
});
onMounted(() => {
	console.log(props.layer);
	const options = {
		url: `http://{s}.tianditu.com/${props.layer}_${props.tileMatrixSetID}/wmts?tk=${props.token}`,
		subdomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7'],
		layer: props.layer,
		style: 'default',
		tileMatrixSetID: props.tileMatrixSetID,
		format: 'tiles',
		maximumLevel: 18,
	};
	cesiumObject.value = new Cesium.WebMapTileServiceImageryProvider(options);
	viewer.imageryLayers.addImageryProvider(cesiumObject.value);
});

onUnmounted(() => {
	viewer.imageryLayers.remove(cesiumObject.value);
});
</script>
