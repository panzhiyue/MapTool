<template>
	<tool-container>
		<template #content>
			<div class="w-full h-full p-5">
				<a-row class="mt-2">
					<a-col> 输入图层：</a-col>
					<a-col :span="18">
						<map-layer-select v-model:value="selectLayer"></map-layer-select>
					</a-col>
				</a-row>
				<a-row class="mt-6">
					<a-col>x坐标字段名：</a-col><a-col><a-input :value.async="xField"></a-input></a-col
					><a-col>y坐标字段名：</a-col><a-col><a-input :value.async="yField"></a-input></a-col>
				</a-row>
				<a-row class="mt-6">
					<a-col> 输出路径：</a-col>
					<a-col :span="18">
						<input-save-path v-model:value="savePath" title="" :filters="filters"></input-save-path>
					</a-col>
				</a-row>
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
import { ref } from 'vue';
import { useWindow } from '@/hooks/electron/useWindow';
import { useMapToolWindow } from '@/hooks/electron/useMapToolWindow';
import MapLayerSelect from '@/components/map-layer-select';
import path from 'path';
import WindowName from '@/enum/WindowName';
const remote = require('@electron/remote');
let sharedObject = remote.getGlobal('sharedObject');
const xField = ref('KneePointX');
const yField = ref('KneePointY');
const selectLayer = ref();
const filters = ref([
	{
		name: 'excel',
		extensions: ['xlsx'], // 只选择jsp, png
	},
]);
const savePath = ref('');

const { close } = useWindow();
const { exportKneePointTable } = useMapToolWindow();
const handleOk = () => {
	let ext = path.extname(savePath.value).slice(1);
	exportKneePointTable({
		layerId: selectLayer.value,
		savePath: savePath.value,
		format: ext,
		kneePointXField: xField.value,
		kneePointYField: yField.value,
		fromWindowId: sharedObject[WindowName.EXPORT_KNEEPOINT_TABLE],
		fromWindowName: WindowName.EXPORT_KNEEPOINT_TABLE,
		toWindowId: sharedObject[WindowName.MAPTOOL],
		toWindowName: WindowName.MAPTOOL,
	});
};

const handleCancel = () => {
	close();
};
</script>
<style lang="less" scoped></style>
