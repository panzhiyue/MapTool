<template>
	<div class="p-5">
		<div class="tips">这个向导允许你指定如何添加图层。你要选择哪种图层格式？</div>
		<div>图层类型:</div>
		<a-radio-group v-model:value="layerType">
			<a-radio
				v-for="(item, index) in layerTypes"
				:value="item.value"
				:key="index"
				:style="radioStyle">
				{{ item.label }}
			</a-radio>
		</a-radio-group>
	</div>
	<step-footer
		:pre-most-text="null"
		:pre-text="null"
		:next-most-text="null"
		:ok-text="null"
		@on-cancel="handleCancel"
		@on-next="handleNext"></step-footer>
</template>

<script setup lang="ts">
import { useWindow } from '@/hooks/electron/useWindow';
import { useVModel } from '@vueuse/core';

const props = defineProps({
	current: {
		type: Number,
	},
});

const emits = defineEmits(['update:current', 'on-change']);

const currentStep = useVModel(props, 'current', emits);

const layerTypes = ref([
	{
		label: '矢量数据(空)',
		value: 'null',
	},
	{
		label: '矢量数据(shp)',
		value: 'shp',
	},
	{
		label: '矢量数据(geojson)',
		value: 'geojson',
	},
	{
		label: '矢量数据(topojson)',
		value: 'topojson',
	},
	{
		label: '矢量数据(excel)',
		value: 'excel',
	},
	{
		label: '矢量数据(geometry-text)',
		value: 'geometry-text',
	},
	{
		label: '矢量数据(api-result)',
		value: 'api-result',
	},
	{
		label: 'wms',
		value: 'wms',
	},
	{
		label: 'wmts',
		value: 'wmts',
	},
	{
		label: 'ImageArcGISRest',
		value: 'ImageArcGISRest',
	},
]);

const layerType = ref('null');

const radioStyle = reactive({
	display: 'flex',
	height: '30px',
	lineHeight: '30px',
});

const { close } = useWindow();
const handleCancel = () => {
	close();
};

const handleNext = () => {
	currentStep.value += 1;
	emits('on-change', layerType.value);
};
</script>

<style lang="less" scoped>
.tips {
	line-height: 40px;
	font-size: 20px;
	color: rgba(0, 102, 204, 1);
	margin-bottom: 20px;
}
</style>
