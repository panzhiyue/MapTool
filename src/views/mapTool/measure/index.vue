<template>
	<div class="measure h-full w-full p-3">
		<div>
			<a-space
				><a-button @click="hanldeMeasureLineString"> 线</a-button
				><a-button @click="hanldeMeasurePolygon">面</a-button></a-space
			>
		</div>
		<div>
			<a-space v-for="(item, index) in measureResult" :key="index">
				{{ item.label }}：{{ item.value }}
			</a-space>
		</div>
	</div>
</template>
<script lang="ts" setup>
import MeasureType from '@/enum/MeasureType';
import { useMapToolWindow } from '@/hooks/electron/useMapToolWindow';
import WindowName from '@/enum/WindowName';
import { ipcRenderer } from 'electron';
import { useWindow } from '@/hooks/electron/useWindow';
const remote = require('@electron/remote');
const sharedObject = remote.getGlobal('sharedObject');

const { measure } = useMapToolWindow();
const hanldeMeasureLineString = () => {
	measure({
		fromWindowId: sharedObject[WindowName.MEASURE],
		fromWindowName: WindowName.MEASURE,
		toWindowId: sharedObject[WindowName.MAPTOOL],
		toWindowName: WindowName.MAPTOOL,
		type: MeasureType.LINESTRING,
	});
};

const hanldeMeasurePolygon = () => {
	measure({
		fromWindowId: sharedObject[WindowName.MEASURE],
		fromWindowName: WindowName.MEASURE,
		toWindowId: sharedObject[WindowName.MAPTOOL],
		toWindowName: WindowName.MAPTOOL,
		type: MeasureType.POLYGON,
	});
};
const measureResult = ref([]);
ipcRenderer.on('measure-result', (e, result) => {
	measureResult.value = result;
});

const { currentWindow } = useWindow();
currentWindow.on('close', () => {
	measure({
		fromWindowId: sharedObject[WindowName.MEASURE],
		fromWindowName: WindowName.MEASURE,
		toWindowId: sharedObject[WindowName.MAPTOOL],
		toWindowName: WindowName.MAPTOOL,
		type: null,
	});
});
</script>
<style lang="less" scoped></style>
