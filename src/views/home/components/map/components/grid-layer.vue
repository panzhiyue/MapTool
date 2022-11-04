<template>
	<div></div>
</template>
<script lang="ts" setup>
import TileLayer from 'ol/layer/Tile';
import TileDebugSource from 'ol/source/TileDebug';
import XYZSource from 'ol/source/XYZ';
import { findParentMap } from '@gis-js/vue2ol';
import { getCurrentInstance } from 'vue';
import { useHomeStore } from '@/store/home';

const homeStore = useHomeStore();
const instance: any = getCurrentInstance();

const props = defineProps({
	zIndex: {
		type: Number,
		default: 9999,
	},
});

var xyzSource = new XYZSource({
	projection: homeStore.mapInfo.projection, //地图投影坐标系
});

const layer = new TileLayer({
	source: new TileDebugSource({
		projection: homeStore.mapInfo.projection, //地图投影坐标系
		tileGrid: xyzSource.getTileGrid(), //获取瓦片图层数据对象（osmSource）的网格信息
	}),
});
layer.setZIndex(props.zIndex);

const map = findParentMap(instance.ctx).mapObject;

onMounted(() => {
	map.addLayer(layer);
});

onUnmounted(() => {
	map.removeLayer(layer);
});
</script>
