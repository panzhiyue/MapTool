<template>
	<tool-container>
		<template #content>
			<div class="w-full h-full p-5">
				<a-form :label-col="{ style: { width: '80px' } }" layout="horizontal">
					<a-form-item label="输入图层:">
						<map-layer-select
							v-model:value="mapLayerId1"
							key="map-layer-select1"></map-layer-select>
						<scroll-box>
							<table-structure-compare
								v-if="tableCompare1"
								class="w-full h-full mt-20px"
								v-model:value="tableCompare1"
								:columns="columns"
								style="max-height: 200px"></table-structure-compare>
						</scroll-box>
					</a-form-item>
					<a-form-item label="近邻图层:">
						<map-layer-select
							v-model:value="mapLayerId2"
							key="map-layer-select2"></map-layer-select>
						<scroll-box>
							<table-structure-compare
								v-if="tableCompare2"
								class="w-full mt-20px"
								v-model:value="tableCompare2"
								:columns="columns"
								style="max-height: 200px"></table-structure-compare>
						</scroll-box>
					</a-form-item>
					<a-form-item label="输出路径:">
						<input-save-path v-model:value="savePath" title="" :filters="filters"></input-save-path>
					</a-form-item>
					<a-form-item label="搜索半径:">
						<input-length v-model:value="lengthValue" v-model:unit="lengthUnit"></input-length>
					</a-form-item>
					<a-form-item label="最大数量:">
						<input-number v-model:value="countValue"></input-number>
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
import { Nullable } from '#/index';
import { buildUUID } from '@/utils/uuid';
import LengthUnits from '@/enum/LengthUnits';
import InputNumber from '@/components/input-number';
import ToolContainer from '@/components/tool-container';
import ScrollBox from '@/components/scroll-box';
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
const tableCompare1: Ref<Nullable<Array<ITableStructureCompare>>> = ref(null);
const tableCompare2: Ref<Nullable<Array<ITableStructureCompare>>> = ref(null);
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

const lengthValue = ref(0);
const lengthUnit = ref(LengthUnits.米);
const countValue = ref(1);
const { close } = useWindow();
const { createDistanceTable } = useMainWindow();
const handleOk = () => {
	createDistanceTable({
		layerId1: mapLayerId1.value,
		layerId2: mapLayerId2.value,
		savePath: savePath.value,
		layerFields1: JSON.stringify(
			tableCompare1.value.filter((item) => {
				return item.selected == true;
			}),
		),
		layerFields2: JSON.stringify(
			tableCompare2.value.filter((item) => {
				return item.selected == true;
			}),
		),
		radius: lengthValue.value,
		radiusUnit: lengthUnit.value,
		maxCount: countValue.value,
		fromWindowId: sharedObject[WindowName.CREATE_DISTANCE_TABLE],
		fromWindowName: WindowName.CREATE_DISTANCE_TABLE,
		toWindowId: sharedObject[WindowName.MAPTOOL],
		toWindowName: WindowName.MAPTOOL,
	});
};

const handleCancel = () => {
	close();
};
</script>
<style lang="less" scoped></style>
