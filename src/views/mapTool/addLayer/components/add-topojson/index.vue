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
import { importVector } from '@/utils';
import { useAddLayer } from '../../useAddLayer';
import { TopoJSON } from 'ol/format';

const route = useRoute();
const props = defineProps({
	current: {
		type: Number,
	},
});
const emits = defineEmits(['update:current']);
const currentStep = useVModel(props, 'current', emits);

const path = ref('');
const filters = ref([]);
const layerName = ref('');
const tableName = ref('vector_' + dayjs().unix().toString());

const { features, geometryType, geometryTypeList, tableData, attributes } = useAddLayer();

watch(path, () => {
	fs.readFile(path.value, (err, result) => {
		features.value = new TopoJSON().readFeatures(result.toString());
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
