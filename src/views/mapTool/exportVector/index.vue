<template>
	<tool-container>
		<template #content>
			<div class="w-full h-full p-5">
				<a-form :label-col="{ style: { width: '80px' } }" layout="horizontal">
					<a-form-item label="输入图层:">
						<map-layer-select v-model:value="selectLayer"></map-layer-select>
					</a-form-item>
					<a-form-item label="输出路径:">
						<input-save-path v-model:value="savePath" title="" :filters="filters"></input-save-path>
					</a-form-item>
					<a-form-item label="坐标系:">
						<select-coordinate-system
							title=""
							v-model:value="coordinateSystem"></select-coordinate-system>
					</a-form-item>
				</a-form>
			</div>
		</template>
		<template #footer>
			<step-footer
				:next-most-text="null"
				:next-text="null"
				:pre-most-text="null"
				:pre-text="null"
				ok-text="确定"
				cancel-text="取消"
				@on-ok="handleOk"
				@on-cancel="handleCancel"></step-footer>
		</template>
	</tool-container>
</template>
<script setup lang="ts">
import MapLayerSelect from '@/components/map-layer-select';
import InputSavePath from '@/components/input-save-path';
import path from 'path';
import { useWindow } from '@/hooks/electron/useWindow';
import { useMainWindow } from '@/hooks/electron/useMainWindow';
import WindowName from '@/enum/WindowName';
import ToolContainer from '@/components/tool-container';
import { useHomeStore } from '@/store/home';
import { IMapInfo } from '#/index';
const remote = require('@electron/remote');
let sharedObject = remote.getGlobal('sharedObject');

const homeStore = useHomeStore();
const selectLayer = ref();

const savePath = ref('');

const filters = ref([
	{
		name: 'shp',
		extensions: ['shp'], // 只选择jsp, png
	},
	{
		name: 'geojson',
		extensions: ['geojson'], // 只选择jsp, png
	},
	{
		name: 'topojson',
		extensions: ['topojson'], // 只选择jsp, png
	},
	{
		name: 'excel',
		extensions: ['xlsx'], // 只选择jsp, png
	},
]);
const { close } = useWindow();
const { exportVector } = useMainWindow();
const handleOk = () => {
	let ext = path.extname(savePath.value).slice(1);
	exportVector({
		layerId: selectLayer.value,
		savePath: savePath.value,
		format: ext,
		destSpatialReference: coordinateSystem.value,
		fromWindowId: sharedObject[WindowName.EXPORT_VECTOR],
		fromWindowName: WindowName.EXPORT_VECTOR,
		toWindowId: sharedObject[WindowName.MAPTOOL],
		toWindowName: WindowName.MAPTOOL,
	});
};

const handleCancel = () => {
	close();
};

const coordinateSystem = ref(null);

homeStore.getMapInfo('1').then((mapInfo: IMapInfo) => {
	coordinateSystem.value = mapInfo.srs;
});
</script>
<style lang="less" scoped></style>
