<template>
	<div></div>
</template>
<script lang="ts" setup>
import TileLayer from 'ol/layer/Tile';
import TileDebugSource from 'ol/source/TileDebug';
import XYZSource from 'ol/source/XYZ';
import { findParentMap } from '@gis-js/vue2ol';
import { getCurrentInstance } from 'vue';
import { useMapToolStore } from '@/store/mapTool';
import { useCoordinateSystem } from '@/hooks/useCoordinateSystem';

const { getByAuth } = useCoordinateSystem();

const mapToolStore = useMapToolStore();
const instance: any = getCurrentInstance();

const props = defineProps({
	zIndex: {
		type: Number,
		default: 9999,
	},
});

var xyzSource = new XYZSource({
	projection: getByAuth(mapToolStore.mapInfo.srs).getProjection(), //地图投影坐标系
});

const layer = new TileLayer({
	source: new TileDebugSource({
		projection: getByAuth(mapToolStore.mapInfo.srs).getProjection(), //地图投影坐标系
		tileGrid: xyzSource.getTileGrid(), //获取瓦片图层数据对象（osmSource）的网格信息
	}),
});
layer.setZIndex(props.zIndex);

let map = null;
onMounted(() => {
	map = findParentMap(instance.ctx).mapObject;
	map.addLayer(layer);
});

onBeforeUnmount(() => {
	map.removeLayer(layer);
});
</script>
