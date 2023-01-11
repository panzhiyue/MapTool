<template>
	<tool-container>
		<template #content>
			<div class="w-full h-full p-5">
				<a-row type="flex">
					<a-col flex="70px">图层名称:</a-col>
					<a-col flex="auto"><a-input v-model:value="layerName"></a-input></a-col>
				</a-row>
				<a-row>
					<input-select-path
						class="w-full"
						pathType="File"
						v-model:value="path"
						:filters="filters"></input-select-path>
				</a-row>
				<a-row type="flex">
					<a-col flex="70px">表名:</a-col>
					<a-col flex="auto"><a-input v-model:value="tableName"></a-input></a-col>
				</a-row>
				<a-row>
					<a-space>
						格式:
						<a-select v-model:value="format" class="w-200px">
							<a-select-option
								v-for="(item, index) in formatList"
								:value="item"
								:key="`format${index}`"
								>{{ item }}</a-select-option
							>
						</a-select>
						<div v-if="format == '经纬度'">
							经度字段
							<a-select v-model:value="lngField" class="w-120px">
								<a-select-option
									v-for="(item, index) in header"
									:value="item"
									:key="`lng${index}`"
									>{{ item }}</a-select-option
								>
							</a-select>
							纬度字段
							<a-select v-model:value="latField" class="w-120px">
								<a-select-option
									v-for="(item, index) in header"
									:value="item"
									:key="`lat${index}`"
									>{{ item }}</a-select-option
								>
							</a-select>
						</div>
						<div v-if="format != '经纬度'">
							几何字段
							<a-select v-model:value="geometryField" class="w-120px">
								<a-select-option
									v-for="(item, index) in header"
									:value="item"
									:key="`geom${index}`"
									>{{ item }}</a-select-option
								>
							</a-select>
						</div>
					</a-space>
				</a-row>
				<a-row>
					<a-space
						>几何类型：
						<a-select v-model:value="geometryType" class="w-120px">
							<a-select-option
								v-for="(item, index) in geometryTypeList"
								:value="item"
								:key="`geometryType${index}`"
								>{{ item }}</a-select-option
							>
						</a-select></a-space
					>
				</a-row>
				<a-row>
					<table-structure-compare
						class="tableStructureCompare w-full mt-20px scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 scrollbar-thumb-rounded-full scrollbar-track-rounded-full"
						v-model:value="tableData"></table-structure-compare>
				</a-row>
			</div>
		</template>
		<template #footer>
			<step-footer
				:next-most-text="null"
				:cancel-text="null"
				:next-text="null"
				ok-text="开始"
				@on-ok="handleOk"
				@on-pre="handlePre"
				@on-pre-most="handlePreMost"></step-footer>
		</template>
	</tool-container>
</template>
<script lang="ts" setup>
import { useVModel } from '@vueuse/core';
import { useRoute } from 'vue-router';
import dayjs from 'dayjs';
import fs from 'fs';
import { excel2json } from '@/utils/excel';
import { Point } from 'ol/geom';
import Feature from 'ol/Feature';
import { WKT as FormatWKT } from 'ol/format';
import { importVector } from '@/utils';
import { useAddLayer } from '../../useAddLayer';

const route = useRoute();

const props = defineProps({
	current: {
		type: Number,
	},
});

const emits = defineEmits(['update:current']);
const currentStep = useVModel(props, 'current', emits);
const formatList = ref(['经纬度', 'wkt', 'geojson']);
const format = ref('经纬度');
const lngField = ref('');
const latField = ref('');
const geometryField = ref('');
const path = ref('');
const filters = ref([
	{
		name: 'excel',
		extensions: ['xlsx', 'xls'],
		buttonLabel: '确认',
	},
]);
const layerName = ref('');
const tableName = ref('vector_' + dayjs().unix().toString());

const header = ref([]);

const excelData = ref(null);

const { features, geometryType, geometryTypeList, tableData, attributes } = useAddLayer();

watch([excelData, format, lngField, latField, geometryField], () => {
	if (excelData.value && format.value == '经纬度' && lngField.value && latField.value) {
		let fs = [];
		for (let i = 0; i < excelData.value.length; i++) {
			let item = excelData.value[i];
			try {
				let geometry = new Point([
					parseFloat(item[lngField.value]),
					parseFloat(item[latField.value]),
				]);
				delete item[lngField.value];
				delete item[latField.value];
				let feature = new Feature({
					geometry,
				});
				feature.setProperties(item);

				fs.push(feature);
			} catch {
				console.log('error:' + i, item[lngField.value], item[latField.value]);
			}
		}
		features.value = fs;
	} else if (excelData.value && format.value != '经纬度' && geometryField.value) {
		let fs = [];
		for (let i = 0; i < excelData.value.length; i++) {
			let item = excelData.value[i];
			try {
				let geometry = new FormatWKT().readGeometry(
					typeof item[geometryField.value] == 'string'
						? item[geometryField.value]
						: item[geometryField.value].result,
				);
				delete item[geometryField.value];
				let feature = new Feature({
					geometry,
				});
				feature.setProperties(item);
				fs.push(feature);
			} catch {
				console.log('error:' + i, item[geometryField.value]);
			}
		}
		features.value = fs;
	} else {
		features.value = null;
	}
});

watch(path, () => {
	fs.readFile(path.value, (err, result) => {
		excel2json(result).then((res) => {
			if (res.length > 0) {
				let data = res[0];
				header.value = data.header;
				excelData.value = data.data;
			}
		});
	});
});

const handlePre = () => {
	currentStep.value -= 1;
};

const handlePreMost = () => {
	currentStep.value = 0;
};

const handleOk = () => {
	importVector(
		route.query.parentId as string,
		geometryType.value,
		tableName.value,
		tableData,
		attributes.value,
		layerName.value,
	);
};
</script>
<style lang="less" scoped>
.tableStructureCompare {
	height: calc(100% - 180px);
	box-sizing: border-box;
}
.ant-row {
	margin-top: 10px;
	line-height: 32px;
}

.content {
	height: calc(100% - 40px);
}
</style>
