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
					<a-form-item>
						<a-checkbox v-model:checked="header">表头</a-checkbox>
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

import { useMapToolWindow } from '@/hooks/electron/useMapToolWindow';
import WindowName from '@/enum/WindowName';
import { useWindow } from '@/hooks/electron/useWindow';
import ToolContainer from '@/components/tool-container';
const remote = require('@electron/remote');
const sharedObject = remote.getGlobal('sharedObject');

const selectLayer = ref();

const savePath = ref('');

const filters = ref([
	{
		name: 'excel',
		extensions: ['xlsx'], // 只选择jsp, png
	},
]);

const header = ref(true);

const { exportAttributeTable } = useMapToolWindow();
const { close } = useWindow();
const handleOk = () => {
	exportAttributeTable({
		fromWindowId: sharedObject[WindowName.EXPORT_ATTRIBUTE_TABLE],
		fromWindowName: WindowName.EXPORT_ATTRIBUTE_TABLE,
		toWindowId: sharedObject[WindowName.MAPTOOL],
		toWindowName: WindowName.MAPTOOL,
		layerId: selectLayer.value,
		savePath: savePath.value,
		header: header.value,
	});
};

const handleCancel = () => {
	close();
};
</script>
<style lang="less" scoped></style>
