<template>
	<div class="flex">
		<span v-if="title" class="title">{{ title }}:</span>
		<a-input class="input" :value="name" :disabled="!editable"></a-input
		><a-button class="btn" @click="handleSelect">...</a-button>
	</div>
</template>
<script lang="ts" setup>
import { useVModel } from '@vueuse/core';
import { ipcRenderer } from 'electron';
import { useWindow } from '@/hooks/electron/useWindow';
import SpatialReference from '@/utils/SpatialReference';
import { buildUUID } from '@/utils/uuid';
const remote = require('@electron/remote');
const props = defineProps({
	title: {
		type: String,
		default: () => '选择文件',
	},
	value: {
		type: String,
	},
	editable: {
		type: Boolean,
	},
});

const emits = defineEmits(['update:value']);

const value = useVModel(props, 'value', emits);
const name = computed(() => {
	return value.value ? new SpatialReference(value.value).getName() : '';
});

const { getWindowTitle } = useWindow();

const uuid = buildUUID();
const handleSelect = () => {
	ipcRenderer.send('open-win', '选择坐标系', `coordinateSystem?uuid=${uuid}`, {
		width: 700,
		height: 800,
		frame: true,
		parent: getWindowTitle(),
	});
};

onMounted(() => {
	remote.ipcMain.on(`changeSpatialReference_${uuid}`, async (event, spatialReference) => {
		value.value = spatialReference;
	});
});
</script>
<style lang="less" scoped>
.title {
	display: flex;
	line-height: 32px;
}

.input {
	display: flex;
	flex: 1;
	margin-right: 10px;
}

.btn {
	display: flex;
}
</style>
