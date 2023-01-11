<template>
	<div class="flex">
		<span v-if="title" class="title">{{ title }}:</span>
		<a-input class="input" v-model:value="value" :disabled="!editable"></a-input
		><a-button class="btn" @click="handleSelect">...</a-button>
	</div>
</template>
<script lang="ts" setup>
import { useVModel } from '@vueuse/core';
import { ipcRenderer } from 'electron';
import { useWindow } from '@/hooks/electron/useWindow';
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

const path = useVModel(props, 'value', emits);

const { currentWindow, getWindowTitle } = useWindow();

const handleSelect = () => {
	ipcRenderer.send('open-win', '选择坐标系', 'coordinateSystem', {
		width: 700,
		height: 800,
		frame: true,
		parent: getWindowTitle(),
	});
};
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
