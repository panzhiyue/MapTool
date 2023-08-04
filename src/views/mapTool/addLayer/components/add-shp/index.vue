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
					<a-space
						>几何类型：
						<a-select v-model:value="geometryType" class="w-120px">
							<a-select-option
								v-for="(item, index) in geometryTypeList"
								:value="item"
								:key="`geometryType${index}`"
								>{{ item }}</a-select-option
							>
						</a-select>
					</a-space>
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
import { dirname, basename, join } from 'path';
import { getFile } from '@/utils/file';
import { EShapeFile } from '@gis-js/utilsol';
import * as olProj from 'ol/proj';
import { message } from 'ant-design-vue';
import { useVModel } from '@vueuse/core';
import { useRoute } from 'vue-router';
import dayjs from 'dayjs';
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

const path = ref('');

const filters = ref([
	{
		name: 'shp',
		extensions: ['shp'], // 只选择jsp, png
		buttonLabel: '确认',
	},
]);

const layerName = ref('');

const tableName = ref('vector_' + dayjs().unix().toString());

const { features, geometryType, geometryTypeList, tableData, attributes } = useAddLayer();

watch(path, () => {
	const shpPath = path.value;
	const dirPath = dirname(shpPath);
	const fileName = basename(shpPath, '.shp');

	const cpgPath = join(dirPath, fileName + '.cpg');
	const dbfPath = join(dirPath, fileName + '.dbf');
	const prjPath = join(dirPath, fileName + '.prj');
	const shxPath = join(dirPath, fileName + '.shx');

	Promise.all([
		getFile(shpPath),
		getFile(cpgPath),
		getFile(dbfPath),
		getFile(prjPath),
		getFile(shxPath),
	]).then((result) => {
		const files = result.filter((item) => {
			return item != null;
		});
		const eShapeFile: any = new EShapeFile({
			projection: olProj.get('EPSG:4490'),
		});
		eShapeFile.on('loaded', () => {
			features.value = eShapeFile.getFeatures();
		});

		eShapeFile.on('error', (err: any) => {
			message.error(err.message);
		});
		eShapeFile.readFile(files);
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
