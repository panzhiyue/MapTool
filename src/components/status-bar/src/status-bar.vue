<template>
	<div class="status-bar">
		<a-space
			>坐标系:<span class="cursor-pointer" @click="handleChangeCoordinateSystem">{{
				getByAuth(homeStore.mapInfo.srs).name
			}}</span
			>分辨率:<span>{{ resolution }}</span
			>层级<span>{{ zoom }}</span> X:<span>{{ x }}</span> Y:<span>{{ y }}</span></a-space
		>
	</div>
</template>
<script lang="ts" setup>
import { findParentMap } from '@gis-js/vue2ol';
import { getCurrentInstance } from 'vue';
import { useHomeStore } from '@/store/home';
import { transform } from 'ol/proj';
import { useCoordinateSystem } from '@/hooks/useCoordinateSystem';

const homeStore = useHomeStore();

const instance: any = getCurrentInstance();
const map = ref(null);

const x = ref(0);
const y = ref(0);
const resolution = ref(0);
const zoom = ref(0);

onMounted(() => {
	map.value = homeStore.map;
	map.value.on('pointermove', (evt) => {
		let pixel = map.value.getEventPixel(evt.originalEvent); //鼠标当前像素坐标
		let coordinate = map.value.getCoordinateFromPixel(pixel); //鼠标当前坐标位置
		x.value = coordinate[0].toFixed(3);
		y.value = coordinate[1].toFixed(3);
	});

	map.value.on('moveend', () => {
		resolution.value = map.value.getView().getResolution();
		zoom.value = map.value.getView().getZoom().toFixed(3);
		let center = map.value.getView().getCenter();
		x.value = center[0].toFixed(3);
		y.value = center[1].toFixed(3);
	});
});

const { selectCoordinateSystem, getByAuth } = useCoordinateSystem();

const handleChangeCoordinateSystem = () => {
	selectCoordinateSystem((spatialReference) => {
		let destCoor = transform(
			[homeStore.mapInfo.centerx, homeStore.mapInfo.centery],
			getByAuth(homeStore.mapInfo.srs).getProjection(),
			getByAuth(spatialReference).getProjection(),
		);
		homeStore.setMapInfo({
			...homeStore.mapInfo,
			srs: spatialReference,
			centerx: destCoor[0],
			centery: destCoor[1],
		});
		homeStore.map.render();
	});
};
</script>
<style lang="less" scoped>
.status-bar {
	height: 24px;
	line-height: 24px;
	text-align: center;
	font-family: 宋体;
	font-size: 12px;
	bottom: 0px;
	position: absolute;
	z-index: 200;
	width: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	text-shadow: 0 1px 1px rgba(0, 0, 0, 0.75);
	color: #fff;
	overflow: hidden;
	span {
		font-weight: 500;
		color: #ffff33;
		text-shadow: 0 1px 1px rgba(0, 0, 0, 0.75);
	}
}
</style>
