<template>
	<tool-container>
		<template #content>
			<div class="w-full h-full p-5">
				<div class="tips">表结构？</div>
				<a-space>图层名 <a-input v-model:value="layerName"></a-input></a-space>
				<a-space>表名 <a-input v-model:value="tableName"></a-input></a-space>
				<table-structure
					class="tableStructure mt-20px scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 scrollbar-thumb-rounded-full scrollbar-track-rounded-full"
					v-model:value="tableData"></table-structure>
			</div>
		</template>
		<template #footer>
			<step-footer
				:next-most-text="null"
				:cancel-text="null"
				:next-text="null"
				@on-ok="handleOk"
				@on-pre="handlePre"
				@on-pre-most="handlePreMost"></step-footer>
		</template>
	</tool-container>
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

const route = useRoute();
const homeStore = useHomeStore();
const props = defineProps({
	current: {
		type: Number,
	},
});

const emits = defineEmits(['update:current']);

const currentStep = useVModel(props, 'current', emits);

const layerName = ref('');
const tableName = ref('vector');
const tableData = reactive([
	{
		key: 1,
		name: 'name',
		type: SqliteColumnType.TEXT,
		length: '',
		scale: '',
		primary: true,
		selected: true,
	},
	{
		key: 2,
		name: 'type',
		type: SqliteColumnType.TEXT,
		length: '',
		scale: '',
		primary: false,
		selected: true,
	},
]);

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
const { refreshLayerInfos } = useMainWindow();
const handleOk = () => {
	createTable(tableName.value, tableData)
		.then((result) => {
			addLayerInfo({
				id: buildUUID(),
				parentId: route.query.parentId as string,
				mapId: 1,
				title: layerName.value,
				type: 'layer',
				canDelete: true,
				canEdit: true,
				expand: true,
				info: {
					type: 'vector',
					table: tableName.value,
				},
			}).then((result1) => {
				if (result1.code == ResponseCode.SUCCESS) {
					refreshLayerInfos();
					close();
				} else {
					message.error(result1.msg, 1);
				}
			});
		})
		.catch((err) => {
			console.log(err);
		});
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
</style>
