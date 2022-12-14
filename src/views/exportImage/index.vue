<template>
	<tool-container>
		<template #content>
			<div class="w-full h-full p-5">
				<input-save-path v-model:value="filePath" :filters="filters"></input-save-path>
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
<script setup lang="ts">
import InputSavePath from '@/components/input-save-path';
import { useWindow } from '@/hooks/electron/useWindow';
import { useMainWindow } from '@/hooks/electron/useMainWindow';
import { useHomeStore } from '@/store/home';
import WindowName from '@/enum/WindowName';
import path from 'path';
import ToolContainer from '@/components/tool-container';
const remote = require('@electron/remote');
let sharedObject = remote.getGlobal('sharedObject');

const homeStore = useHomeStore();
const filePath = ref('');
const filters = [
	{
		name: 'PNG',
		extensions: ['png'], // 只选择jsp, png
	},
	{
		name: 'JPG',
		extensions: ['jpg'], // 只选择jsp, png
	},
];

const { close } = useWindow();
const { exportImage } = useMainWindow();
const handleOk = () => {
	let ext = path.extname(filePath.value).slice(1);
	exportImage({
		path: filePath.value,
		control: false,
		format: ext,
		fromWindowId: sharedObject[WindowName.EXPORT_IMAGE],
		fromWindowName: WindowName.EXPORT_IMAGE,
		toWindowId: sharedObject[WindowName.MAIN],
		toWindowName: WindowName.MAIN,
	});
};

onMounted(() => {});

const handleCancel = () => {
	close();
};
</script>
