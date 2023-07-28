<template>
	<div class="main">
		<div class="item" v-for="(item, index) in data">
			<div class="title">{{ item.title }}</div>
			<div class="children-container">
				<div
					class="children-item"
					v-for="(item2, index) in item.children"
					@click="openTool({ name: item2.name, url: item2.url, params: { ...item2.params } })">
					{{ item2.title }}
				</div>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { ipcRenderer } from 'electron';
import WindowName from '@/enum/WindowName';

const router = useRouter();

const list = [
	{
		title: '常用功能',
		children: [
			{
				title: '地图管理工具',
				describe: '一个用于管理地图数据的工具',
				name: WindowName.MAPTOOL,
				url: '/mapTool',
				params: {
					minWidth: 1024,
					minHeight: 600,
					frame: true,
					fullscreen: false,
					parent: null,
				},
			},
			{
				title: 'Electron Api',
				describe: '用于展示ElectronApi功能',
				name: 'ELECTRON_API',
				url: '/electronApi',
				params: {
					minWidth: 1024,
					minHeight: 600,
					frame: true,
					fullscreen: false,
					parent: null,
				},
			},
			{
				title: '站长工具',
				describe: '站长工具',
				name: 'WEBMASTER_TOOLS',
				url: '/webmaster-tools',
				params: {
					minWidth: 1024,
					minHeight: 600,
					frame: true,
					fullscreen: false,
					parent: null,
				},
			},
			{
				title: 'Api',
				describe: '集成API地址',
				name: 'API',
				url: '/api',
				params: {
					minWidth: 1024,
					minHeight: 600,
					frame: true,
					fullscreen: false,
					parent: null,
				},
			},
			{
				title: 'CesiumViewer',
				describe: '三维可视化',
				name: 'CesiumViewer',
				url: '/cesiumViewer',
				params: {
					minWidth: 1024,
					minHeight: 600,
					frame: true,
					fullscreen: false,
					parent: null,
				},
			},
		],
	},
];

const data = ref(list);

const openTool = (params) => {
	console.log('open-win', params.name, params.url, params.params, {}, false);
	ipcRenderer.send('open-win', params.name, params.url, params.params, {}, false);
};
</script>
<style lang="less" scoped>
.main {
	background-color: #fff;
	padding: 20px;
	width: 100%;
	height: 100%;

	.item {
		width: 100%;
		.title {
			font-size: 20px;
			font-weight: bold;
		}
		.children-container {
			display: flex;
			flex-wrap: wrap;
			align-content: flex-start;
			.children-item {
				width: calc(25% - 20px);
				max-width: 320px;
				height: 80px;
				border-radius: 10px;
				background-color: rgba(243, 249, 253);
				margin-right: 20px;
				margin-top: 20px;
				line-height: 80px;
				font-size: 20px;
				padding-left: 10px;
				font-weight: bold;
				cursor: pointer;
			}
		}
	}
}
</style>
