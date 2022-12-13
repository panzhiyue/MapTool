<template>
	<div
		class="w-full h-full p-5 pb-10 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
		<a-form :label-col="{ style: { width: '80px' } }" layout="horizontal">
			<a-form-item label="输入图层:">
				<map-layer-select v-model:value="mapLayerId1" key="map-layer-select1"></map-layer-select>
				<table-structure-compare
					v-if="tableCompare1"
					class="tableStructureCompare w-full mt-20px scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 scrollbar-thumb-rounded-full scrollbar-track-rounded-full"
					v-model:value="tableCompare1"
					:columns="columns"
					style="max-height: 200px"></table-structure-compare>
			</a-form-item>
			<a-form-item label="近邻图层:">
				<map-layer-select v-model:value="mapLayerId2" key="map-layer-select2"></map-layer-select>
				<table-structure-compare
					v-if="tableCompare2"
					class="tableStructureCompare w-full mt-20px scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 scrollbar-thumb-rounded-full scrollbar-track-rounded-full"
					v-model:value="tableCompare2"
					:columns="columns"
					style="max-height: 200px"></table-structure-compare>
			</a-form-item>
			<a-form-item label="输出路径:">
				<input-save-path v-model:value="savePath" title="" :filters="filters"></input-save-path>
			</a-form-item>
			<a-form-item label="搜索半径:">
				<a-input-number></a-input-number>
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
import { ref, watch, computed, Ref } from 'vue';
import MapLayerSelect from '@/components/map-layer-select';
import { useWindow } from '@/hooks/electron/useWindow';
import { useMainWindow } from '@/hooks/electron/useMainWindow';
import WindowName from '@/enum/WindowName';
import TableStructureCompare, {
	ITableStructureCompare,
} from '@/components/table-structure-compare';
import { useMapLayerInfo } from '@/hooks/useMapLayerInfo';
import { useTable } from '@/hooks/useTable';
import { IColumnStructure } from '#/database';
import InputSavePath from '@/components/input-save-path';
import { Nullable } from '#/';
import { buildUUID } from '@/utils/uuid';
const remote = require('@electron/remote');
let sharedObject = remote.getGlobal('sharedObject');

const mapLayerId1 = ref();
const mapLayerId2 = ref();
const savePath = ref();

const filters = ref([
	{
		name: 'excel',
		extensions: ['xlsx'], // 只选择jsp, png
	},
]);
const { mapLayerInfo: mapLayerInfo1 } = useMapLayerInfo(mapLayerId1);
const { mapLayerInfo: mapLayerInfo2 } = useMapLayerInfo(mapLayerId2);

const tableName1 = computed(() => {
	if (mapLayerInfo1.value) {
		return mapLayerInfo1.value.info.table;
	}
	return '';
});

const tableName2 = computed(() => {
	if (mapLayerInfo2.value) {
		return mapLayerInfo2.value.info.table;
	}
	return '';
});

const { tableStructure: tableStructure1, tableData: tableData1 } = useTable(tableName1);
const { tableStructure: tableStructure2, tableData: tableData2 } = useTable(tableName2);

const columns = ref([
	{
		title: '源字段',
		align: 'center',
		dataIndex: 'originName',
		width: 120,
		key: 'originName',
	},
	{
		title: '目标字段',
		align: 'center',
		dataIndex: 'destName',
		width: 120,
		key: 'destName',
	},
]);
const tableCompare1: Ref<Nullable<ITableStructureCompare>> = ref(null);
const tableCompare2: Ref<Nullable<ITableStructureCompare>> = ref(null);
watch(tableStructure1, () => {
	tableCompare1.value = tableStructure1.value.map((item: IColumnStructure) => {
		return {
			key: buildUUID(),
			originName: item.name,
			destName: item.name,
			selected: Boolean,
		};
	});
});

watch(tableStructure2, () => {
	tableCompare2.value = tableStructure2.value.map((item: IColumnStructure) => {
		return {
			key: buildUUID(),
			originName: item.name,
			destName: item.name,
			selected: Boolean,
		};
	});
});
const { close } = useWindow();
const { createDistanceTable } = useMainWindow();
const handleOk = () => {
	createDistanceTable({
		layerId1: mapLayerId1.value,
		layerId2: mapLayerId2.value,
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
