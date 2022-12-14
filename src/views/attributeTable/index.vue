<template>
	<div class="w-full h-full p-5" @click="handleClick">
		<a-space class="pb-5">
			<a-button @click="handleAddColumn">添加字段</a-button>
		</a-space>
		<div class="table-warp w-full">
			<a-table
				v-if="columnStructs"
				:columns="columns"
				:data-source="tableData"
				:pagination="{
					pageSize: 50,
				}"
				:scroll="{}"
				@resizeColumn="handleResizeColumn">
				<template #headerCell="{ column }">
					<div @contextmenu="(e) => handleContextMenu(e, column)" class="w-full h-full" title="">
						<smile-outlined />
						{{ column.title }}
					</div>
				</template>

				<template #bodyCell="{ value, index, column }">
					<template v-if="column.columnType == SqliteColumnType.TEXT">
						<a-input
							placeholder=""
							:value="value"
							@change="(e) => handleChange(e.target.value, index, column)" />
					</template>
					<template
						v-if="
							column.columnType == SqliteColumnType.DOUBLE ||
							column.columnType == SqliteColumnType.FLOAT ||
							column.columnType == SqliteColumnType.INTEGER
						">
						<a-input-number
							placeholder=""
							:value="value"
							@change="(e) => handleChange(e, index, column)" />
					</template>
					<template v-if="column.columnType == SqliteColumnType.BOOLEAN">
						<a-checkbox
							:checked="!!value"
							@change="(e) => handleChange(e.target.checked, index, column)" />
					</template>
				</template>
			</a-table>
		</div>
		<header-menu v-if="menuVisible" :style="menuStyle" @click="handleClickMenu"></header-menu>
	</div>
</template>
<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { getByWhere } from '@/api/mapLayerInfo';
import * as TableApi from '@/api/table';
import { IColumnStructure } from '#/database';
import { Ref } from 'vue';
import { TableColumnType, TableProps } from 'ant-design-vue';
import SqliteColumnType from '@/enum/SqliteColumnType';
import HeaderMenu from './components/HeaderMenu.vue';
import { ipcRenderer } from 'electron';
import WindowName from '@/enum/WindowName';
import ColumnMenuType from '@/enum/ColumnMenuType';
import ResponseCode from '@/enum/ResponseCode';
// const unhandled = require('electron-unhandled');

// unhandled();
// const unhandled = require('electron-unhandled');

// unhandled({
// 	logger: () => {
// 		console.error('222111');
// 	},
// 	showDialog: true,
// 	reportButton: (error) => {
// 		console.log('Report Button Initialized');
// 	},
// });

// console.log(unhandled);
const route = useRoute();

const layerId = route.query.layerId as string;

const tableData = ref();
const columnStructs: Ref<IColumnStructure[]> = ref();

const columns = ref();
const layerInfo = ref();

onMounted(async () => {
	init();
});

const init = async () => {
	let result1 = await getByWhere({ id: layerId });
	layerInfo.value = JSON.parse(result1.data[0].info);
	tableData.value = (await TableApi.getByWhere(layerInfo.value.table, {})).data;
	columnStructs.value = (await TableApi.getTableStruct(layerInfo.value.table)).data;

	columns.value = columnStructs.value
		.filter((item: IColumnStructure) => {
			return item.name != 'geom_wkt';
		})
		.map((item) => {
			return {
				title: item.name,
				dataIndex: item.name,
				key: item.name,
				resizable: true,
				columnType: item.type,
				width: 150,
				minWidth: 150,
				maxWidth: 800,
				ellipsis: true,
				sorter: {
					compare: (a: any, b: any) => {
						return a[item.name] > b[item.name] ? 1 : -1;
					},
				},
			} as TableColumnType;
		});
};

const handleResizeColumn = (w, col) => {
	col.width = w;
};

const handleChange = (value, index, column): void => {
	let newData = tableData.value.concat([]);
	newData[index][column.dataIndex] = value;
	tableData.value = newData;
};

//#region 右键菜单相关
const menuData = ref(null);
const menuStyle = reactive({
	top: '0',
	left: '0',
});

const menuVisible = ref(false);

const handleContextMenu = (e, column) => {
	e.preventDefault();
	menuData.value = column;
	menuVisible.value = true;
	menuStyle.top = e.clientY + 'px';
	menuStyle.left = e.clientX + 'px';
	// document.body.addEventListener("click", this.cancelClick);
};

const handleClick = () => {
	menuVisible.value = false;
};

const handleClickMenu = (type: ColumnMenuType) => {
	switch (type) {
		case ColumnMenuType.FIELD_CALCULATOR: {
			console.log(menuData.value);
			ipcRenderer.send(
				'open-win',
				WindowName.FIELD_CALCULATOR,
				`/fieldCalculator?tableName=${layerInfo.value.table}&fieldName=${menuData.value.title}&fieldType=${menuData.value.columnType}`,
				{
					width: 460,
					height: 560,
					frame: true,
					resizable: true,
					parent: WindowName.ATTRIBUTE_TABLE,
				},
			);
			break;
		}
		case ColumnMenuType.COMPUTATIONAL_GEOMETRY: {
			ipcRenderer.send(
				'open-win',
				WindowName.COMPUTATIONAL_GEOMETRY,
				`/computationalGeometry?tableName=${layerInfo.value.table}&fieldName=${menuData.value.title}&fieldType=${menuData.value.columnType}`,
				{
					width: 430,
					height: 300,
					frame: true,
					resizable: true,
					parent: WindowName.ATTRIBUTE_TABLE,
				},
			);
			break;
		}
		case ColumnMenuType.DELETE: {
			TableApi.deleteColumns(layerInfo.value.table, [menuData.value.title]).then((result) => {
				if (result.code == ResponseCode.SUCCESS) {
					init();
				} else {
					alert(result.msg);
				}
			});
			break;
		}
		case ColumnMenuType.EDIT: {
			console.log(menuData.value);
			ipcRenderer.send(
				'open-win',
				WindowName.EDIT_COLUMNN,
				`/editColumn?tableName=${layerInfo.value.table}&name=${menuData.value.title}&type=${menuData.value.columnType}`,
				{
					width: 300,
					height: 300,
					frame: true,
					resizable: false,
					parent: WindowName.ATTRIBUTE_TABLE,
				},
			);
			break;
		}
	}
};

//#endregion

const handleAddColumn = () => {
	console.log(process.type);
	let a = JSON.parse('aaaa');
	// throw new Error('THIS IS AN ERROR');
	ipcRenderer.send(
		'open-win',
		WindowName.ADD_COLUMNN,
		'/addColumn?tableName=' + layerInfo.value.table,
		{
			width: 300,
			height: 300,
			frame: true,
			resizable: false,
			parent: WindowName.ATTRIBUTE_TABLE,
		},
	);
};

ipcRenderer.on('refresh', () => {
	init();
});
</script>
<style lang="less" scoped>
/deep/ .ant-table-cell {
	padding: 0px;
	text-align: center;
}

.ant-input {
	border: 0px;
}

/deep/ .ant-input-number {
	border: 0px;
}

.table-warp {
	height: calc(100% - 50px);
}

/deep/ .ant-table-wrapper {
	width: 100%;
	height: calc(100% - 40px);

	.ant-spin-nested-loading,
	.ant-spin-container {
		width: 100%;
		height: 100%;
	}
	.ant-table {
		width: 100%;
		max-height: 100%;
		overflow-x: auto;

		.ant-table-container {
			width: 100%;
			height: 100%;

			.ant-table-content {
				width: 100%;
				height: 100%;

				table {
					width: 100% !important;
					height: 100% !important;
					overflow: scroll;

					.ant-table-thead {
						position: sticky;
						top: -1px;
						background-color: #7dc3ff;
						table-layout: fixed;
						z-index: 1000;
					}
				}
			}
		}
	}
}
</style>
