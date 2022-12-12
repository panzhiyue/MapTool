<template>
	<editor :itemInfos="editItemInfos" @active="handleEditorActive"></editor>
</template>
<script lang="ts" setup>
import EditType from '@/enum/EditType';
import EditState from './EditState';
import Editor from './editor.vue';

const editItemInfos = ref([
	{
		id: '4',
		parentId: '1',
		disableTitle: '开始编辑',
		enableTitle: '开始编辑',
		selectedTitle: '开始编辑',
		type: EditType.START,
		cannotSel: false,
		state: EditState.ENABLE,
	},
	{
		id: '14',
		parentId: '1',
		disableTitle: '结束编辑',
		enableTitle: '结束编辑',
		selectedTitle: '结束编辑',
		type: EditType.STOP,
		cannotSel: false,
		state: EditState.HIDE,
	},
	{
		id: '5',
		parentId: '1',
		disableTitle: '选取图斑',
		enableTitle: '选取图斑',
		selectedTitle: '选取图斑',
		type: EditType.SELECT,
		cannotSel: false,
		state: EditState.DISABLE,
	},
	{
		id: '14',
		parentId: '1',
		disableTitle: '创建图斑',
		enableTitle: '创建图斑',
		selectedTitle: '创建图斑',
		type: EditType.CREATE,
		cannotSel: false,
		state: EditState.DISABLE,
	},
	{
		id: '6',
		parentId: '1',
		disableTitle: '切割图斑',
		enableTitle: '切割图斑',
		selectedTitle: '切割图斑',
		type: EditType.CUTTING,
		cannotSel: false,
		state: EditState.DISABLE,
	},
	{
		id: '7',
		parentId: '1',
		disableTitle: '编辑图斑',
		enableTitle: '编辑图斑',
		selectedTitle: '编辑图斑',
		type: EditType.EDIT,
		cannotSel: false,
		state: EditState.DISABLE,
	},
	{
		id: '1',
		parentId: '0',
		isLine: true,
	},

	{
		id: '10',
		parentId: '2',
		disableTitle: '合并图斑',
		enableTitle: '合并图斑',
		selectedTitle: '合并图斑',
		type: EditType.MERGE,
		cannotSel: false,
		state: EditState.DISABLE,
	},
	{
		id: '11',
		parentId: '2',
		disableTitle: '删除图斑',
		enableTitle: '删除图斑',
		selectedTitle: '删除图斑',
		type: EditType.DELETE,
		cannotSel: false,
		state: EditState.DISABLE,
	},
	// {
	// 	id: '12',
	// 	parentId: '2',
	// 	disableTitle: '取消选择',
	// 	enableTitle: '取消选择',
	// 	selectedTitle: '取消选择',
	// 	type: EditType.,
	// 	cannotSel: false,
	// 	state: EditState.DISABLE,
	// },
	{
		id: '2',
		parentId: '0',
		isLine: true,
	},

	{
		id: '13',
		parentId: '3',
		disableTitle: '保存图斑',
		enableTitle: '保存图斑',
		selectedTitle: '保存图斑',
		type: EditType.SAVE,
		cannotSel: false,
		state: EditState.DISABLE,
	},
]);

const isEdit = ref(false);

const getItemInfoByType = (type) => {
	for (let i = 0; i < editItemInfos.value.length; i++) {
		let itemInfo = editItemInfos.value[i];
		if (itemInfo.type == type) {
			return itemInfo;
		}
	}
	return null;
};

/**
 * 更新编辑项状态
 */
const updateItemState = (type, itemState) => {
	let itemInfo = getItemInfoByType(type);
	if (itemInfo) {
		itemInfo.state = itemState;
	} else {
		console.log('警告:没有找到' + type + '对应的编辑项');
	}
};

const handleEditorActive = (itemInfo) => {
	if (itemInfo.type == EditType.START) {
		if (itemInfo.state == EditState.SELECTED) {
			updateItemState(itemInfo.type, EditState.HIDE);
			updateItemState(EditType.STOP, EditState.ENABLE);
			isEdit.value = true;
			updateItemState(EditType.SELECT, EditState.ENABLE);
		}
	} else if (itemInfo.type == EditType.STOP) {
		if (itemInfo.state == EditState.SELECTED) {
			updateItemState(itemInfo.type, EditState.HIDE);
			updateItemState(EditType.START, EditState.ENABLE);
			isEdit.value = false;
			updateItemState(EditType.SELECT, EditState.DISABLE);
		}
	} else {
		if (isEdit.value != true) {
			alert('还未选择开始编辑图斑！');
			return;
		}
		if (itemInfo.cannotSel == true) {
			return;
		}
		if (itemInfo.state == true) {
			return;
		}
	}
};
</script>
