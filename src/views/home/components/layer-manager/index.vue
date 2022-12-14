<template>
	<div>
		<a-tree
			v-model:tree-data="treeData"
			class="demo-tree-render"
			:trigger="['contextmenu']"
			ref="tree"
			draggable
			@drop="handleDrop">
			<template #title="{ key: treeKey, id, title, type, canDelete, canEdit, data }">
				<a-dropdown :trigger="['contextmenu']">
					<span>{{ title }}</span>
					<template #overlay>
						<a-menu v-if="type == 'root'">
							<a-menu-item @click="handleContextMenuAddMenu(data)">添加菜单</a-menu-item>
							<a-menu-item @click="handleContextMenuAddLayer(data)">添加图层</a-menu-item>
						</a-menu>

						<a-menu v-else-if="type == 'menu'">
							<a-menu-item @click="handleContextMenuAddMenu(data)">添加菜单</a-menu-item>
							<a-menu-item @click="handleContextMenuAddLayer(data)">添加图层</a-menu-item
							><a-menu-item v-if="canDelete" @click="handleDelete(data)">删除</a-menu-item>
						</a-menu>

						<a-menu v-else-if="type == 'layer'">
							<a-menu-item @click="handleAddToMap(data)">添加到地图</a-menu-item>
							<a-menu-item v-if="canDelete" @click="handleDelete(data)">删除</a-menu-item>
						</a-menu>
					</template>
				</a-dropdown>
			</template>
		</a-tree>
		<add-or-edit-menu :ref="'addOrEditMenu'" @sure="updateLayer"></add-or-edit-menu>
	</div>
</template>
<script setup lang="ts">
import { ipcRenderer } from 'electron';
import { useHomeStore } from '@/store/home';

import { ILayerInfo } from 'types';
import { onMounted, Ref } from 'vue';
import { add as addMapLayerInfo } from '@/api/mapLayerInfo';
import { getByWhere, deleteById } from '@/api/layerInfo';
import { drop as dropTable } from '@/api/table';
import AddOrEditMenu from './AddOrEditMenu.vue';
import ResponseCode from '@/enum/ResponseCode';
import { message } from 'ant-design-vue';
import * as MapLayerInfoApi from '@/api/mapLayerInfo';
import { buildUUID } from '@/utils/uuid';
import tree, { AntTreeNodeDropEvent } from 'ant-design-vue/lib/tree';
import * as TableApi from '@/api/table';
import { getDefaultStyle } from '@/utils/style';
import WindowName from '@/enum/WindowName';
const remote = require('@electron/remote');

let homeStore = useHomeStore();

const layerInfos = computed(() => {
	return homeStore.layerInfos;
});

const treeData = computed(() => {
	let children = !layerInfos.value
		? []
		: layerInfos.value
				.filter((item) => {
					return item.parentId === '0';
				})
				.map((item) => {
					return getTreeDataItem(item);
				});

	let data = [
		{
			id: '0',
			title: '图层',
			key: '0',
			type: 'root',
			children,
			data: {
				id: '0',
			},
		},
	];
	return data;
});

const getTreeDataItem = (data) => {
	let treeDataItem = {
		...data,
		key: data.id,
		data,
		children: layerInfos.value
			.filter((item) => {
				return item.parentId === data.id;
			})
			.map((item) => {
				return getTreeDataItem(item);
			}),
	};
	return treeDataItem;
};

onMounted(() => {});

const addOrEditMenu = ref(null);

/**
 * 添加菜单
 */
const handleContextMenuAddMenu = (data) => {
	addOrEditMenu.value!.show('add', data.data);
};

const handleContextMenuAddLayer = (data: any) => {
	ipcRenderer.send('open-win', WindowName.ADD_LAYER, `addLayer?parentId=${data.id}`, {
		width: 700,
		height: 500,
		// frame: false,
		parent: WindowName.MAIN,
	});
};

const updateLayer = () => {};

/**
 * 添加到地图
 */
const handleAddToMap = (data: ILayerInfo) => {
	data.info['styles'] = [getDefaultStyle(data.info['geometryType'])];
	console.log(data.info);
	addMapLayerInfo({
		id: buildUUID(),
		layerId: data.id!,
		mapId: 1,
		title: data.title,
		info: data.info,
		checked: true,
	}).then((result) => {
		if (result.code == ResponseCode.SUCCESS) {
			homeStore.getMapLayerInfos(1);
		} else {
			remote.dialog.showErrorBox('添加到地图', result.msg);
		}
	});
};

const handleDelete = async (data: any) => {
	const id = data.data.id;
	getByWhere({ parentId: id }).then((result) => {
		if (result.code == ResponseCode.SUCCESS) {
			if (result.data.length > 0) {
				message.error('请先删除子菜单！');
				return;
			}

			MapLayerInfoApi.getByWhere({
				layerId: id,
			}).then((result) => {
				if (result.data.length > 0) {
					message.error('图层已添加到地图！');
					return;
				} else {
					deleteById(id).then(async (result) => {
						if (data.data.info?.table) {
							await dropTable(data.data.info.table).then((r) => {});
						}
						homeStore.getLayerInfos(1).then(() => {});
					});
				}
			});
		}
	});
};

onMounted(() => {
	ipcRenderer.addListener('addLayer-close', () => {
		homeStore.getMapLayerInfos(1).then(() => {});
	});
});

const handleDrop = (info: AntTreeNodeDropEvent) => {
	const dragNodeData = info.dragNode.data; //被拖拽节点数据
	const dropNodeData = info.node.data; //松开节点数据

	if (info.node.expanded) {
		dragNodeData.parentId = dropNodeData.id;
	} else {
		dragNodeData.parentId = dropNodeData.parentId;
	}

	const newLayerInfos = layerInfos.value.filter((item) => {
		return item.id != dragNodeData.id;
	});

	let index = newLayerInfos
		.map((item) => {
			return item.id;
		})
		.indexOf(dropNodeData.id);
	if (info.dropPosition == -1) {
		newLayerInfos.splice(index, 0, dragNodeData);
	} else {
		newLayerInfos.splice(index + 1, 0, dragNodeData);
	}

	newLayerInfos.forEach((item) => {
		delete item['m_id'];
	});

	TableApi.replaceData('LayerInfo', newLayerInfos).then(async (result) => {
		if (result.code == ResponseCode.SUCCESS) {
			await homeStore.getLayerInfos(1);
		}
	});
};
</script>
<style></style>
