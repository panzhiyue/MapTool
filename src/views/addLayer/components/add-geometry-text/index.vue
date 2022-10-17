<template>
	<div class="p-5 w-full h-full">
		<div class="tips">表结构？</div>
		<a-row type="flex">
			<a-col flex="70px">图层名称:</a-col>
			<a-col flex="auto"><a-input v-model:value="layerName"></a-input></a-col>
		</a-row>
		<a-row type="flex">
			<a-col flex="70px">表名:</a-col>
			<a-col flex="auto"><a-input v-model:value="tableName"></a-input></a-col>
		</a-row>
		<a-row type="flex">
			<a-col flex="70px">文本:</a-col>
			<a-col flex="auto"
				><a-textarea
					v-model:value="geometryText"
					:placeholder="formatOptions.placeholder"></a-textarea
			></a-col>
		</a-row>
		<a-row type="flex">
			<a-col flex="70px">格式:</a-col>
			<a-col flex="auto"><a-select v-model:value="format" :options="formatList"></a-select></a-col>
		</a-row>
	</div>
	<step-footer
		:next-most-text="null"
		:cancel-text="null"
		:next-text="null"
		@on-ok="handleOk"
		@on-pre="handlePre"
		@on-pre-most="handlePreMost"></step-footer>
</template>
<script lang="ts" setup>
import { useWindow } from '@/hooks/electron/useWindow';
import { useVModel } from '@vueuse/core';
import { create as createTable } from '@/api/table';
import SqliteColumnType from '@/enum/SqliteColumnType';
import { add as addLayerInfo } from '@/api/layerInfo';
import { useRoute } from 'vue-router';
import { useHomeStore } from '@/store/home';
import { message } from 'ant-design-vue';
import ResponseCode from '@/enum/ResponseCode';
import { buildUUID } from '@/utils/uuid';
import { useMainWindow } from '@/hooks/electron/useMainWindow';
import dayjs from 'dayjs';
import { useAddLayer } from '../../useAddLayer';
import { importVector } from '@/utils';
import { WKT, GeoJSON } from 'ol/format';
import { Feature } from 'ol';
import { Item } from 'ant-design-vue/lib/menu';

const route = useRoute();
const props = defineProps({
	current: {
		type: Number,
	},
});
const emits = defineEmits(['update:current']);
const currentStep = useVModel(props, 'current', emits);

const formatList = ref([
	{
		label: 'wkt',
		value: 'wkt',
		format: new WKT(),
		placeholder: 'POINT(120 28)',
	},
	{
		label: 'geojson',
		value: 'geojson',
		format: new GeoJSON(),
		placeholder: '{"type":"Point","coordinates":[120,28]}',
	},
]);
const format = ref('wkt');
const formatOptions = computed(() => {
	return formatList.value.filter((item) => {
		return item.label == format.value;
	})[0];
});

watch(format, () => {
	console.log(format.value);
});

const layerName = ref('');
const tableName = ref('vector_' + dayjs().unix().toString());
const { features, geometryType, geometryTypeList, tableData, attributes } = useAddLayer();

const geometryText = ref('');

const { close } = useWindow();
const handleCancel = () => {
	close();
};

const handlePre = () => {
	currentStep.value -= 1;
};

const handlePreMost = () => {
	currentStep.value = 0;
};
const handleOk = () => {
	features.value = [
		new Feature({
			geometry: formatOptions.value.format.readGeometry(geometryText.value),
		}),
	];
	setTimeout(() => {
		importVector(
			route.query.parentId as string,
			geometryType.value,
			tableName.value,
			tableData,
			attributes.value,
			layerName.value,
		);
	}, 200);
};
</script>
<style lang="less" scoped>
.tableStructure {
	height: calc(100% - 140px);
	box-sizing: border-box;
}
.tips {
	line-height: 40px;
	font-size: 20px;
	color: rgba(0, 102, 204, 1);
	margin-bottom: 20px;
}

.ant-row {
	margin-top: 10px;
	line-height: 32px;
}

textarea {
	height: 200px;
}

.ant-select {
	width: 120px;
}
</style>
