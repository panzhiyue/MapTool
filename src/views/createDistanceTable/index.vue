<template>
	<div class="w-full p-5">
		<a-form :label-col="{ style: { width: '80px' } }" layout="horizontal">
			<a-form-item label="输入图层:">
				<map-layer-select v-model:value="layerId1" key="map-layer-select1"></map-layer-select>
			</a-form-item>
			<a-form-item label="近邻图层:">
				<map-layer-select v-model:value="layerId2" key="map-layer-select2"></map-layer-select>
			</a-form-item>
			<a-form-item label="输出路径:">
				<input-save-path v-model:value="savePath" title="" :filters="filters"></input-save-path>
			</a-form-item>
		</a-form>
	</div>
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
<script lang="ts" setup>
import { ref, watch, computed } from 'vue';
import MapLayerSelect from '@/components/map-layer-select';
import path from 'path';
import { useWindow } from '@/hooks/electron/useWindow';
import { useMainWindow } from '@/hooks/electron/useMainWindow';
import WindowName from '@/enum/WindowName';
const remote = require('@electron/remote');
let sharedObject = remote.getGlobal('sharedObject');

const layerId1 = ref();
const layerId2 = ref();
const savePath = ref();
const filters = ref([
	{
		name: 'excel',
		extensions: ['xlsx'], // 只选择jsp, png
	},
]);

const { close } = useWindow();
const { createDistanceTable } = useMainWindow();
const handleOk = () => {
	createDistanceTable({
		layerId1: layerId1.value,
		layerId2: layerId2.value,
		savePath: savePath.value,
		fromWindowId: sharedObject[WindowName.EXPORT_VECTOR],
		fromWindowName: WindowName.EXPORT_VECTOR,
		toWindowId: sharedObject[WindowName.MAIN],
		toWindowName: WindowName.MAIN,
	});
};

const handleCancel = () => {
	close();
};
</script>
<style lang="less" scoped></style>
