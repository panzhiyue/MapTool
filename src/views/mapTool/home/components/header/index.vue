<template>
	<div class="home-header" v-mouse-drag="changePosition">
		<div class="left">
			<img :src="iconUrl" />
			<span class="title">{{ title }}</span>
			<slot name="left"></slot>
		</div>
		<div class="right">
			<window-controls :name="windowName"></window-controls>
		</div>
	</div>
</template>
<script setup lang="ts">
import { ipcRenderer } from 'electron';

import {
	DownloadOutlined,
	SyncOutlined,
	SettingFilled,
	QuestionCircleFilled,
} from '@ant-design/icons-vue';
import { onMounted, computed, ref } from 'vue';
import WindowControls from '@/components/window-controls/index.vue';
import icon from '@/assets/vite.svg';
import { useWindow } from '@/hooks/electron/useWindow';
const remote = require('@electron/remote'); //1

const props = defineProps({
	iconUrl: {
		type: String,
		default: () => icon,
	},
	title: {
		type: String,
		default: () => 'MapTool',
	},
	windowName: {
		type: String,
		default: () => 'Main',
	},
});

onMounted(() => {});

const { changePosition } = useWindow();

// const changePosition=(pos)=>{
//   console.log(pos);
//   // assistWindow.setBounds({ x: pos.x, y: pos.y, width: 320, height: 720 })
//   // ipcRenderer.send('move-assistWindow', {
//   //   x: pos.x,
//   //   y: pos.y,
//   //   isWindow: 'horse'
//   // })
// }
</script>
<style lang="less" scoped>
.home-header {
	height: 30px;
	display: flex;
	justify-content: space-between;

	.left {
		display: flex;

		img {
			width: 20px;
			margin-left: 16px;
		}

		.title {
			line-height: 30px;
			margin-left: 8px;
		}
	}
	.right {
		display: flex;
		height: 100%;
		overflow: hidden;
		-webkit-app-region: no-drag;
		align-items: center;

		.ant-btn {
			display: inline-flex;
			justify-content: center;
			align-items: center;
			line-height: 100%;
			margin-right: 0.5rem;
		}
		.ant-avatar {
			margin-left: 4px;
			margin-right: 0px;
		}
	}
}
</style>
