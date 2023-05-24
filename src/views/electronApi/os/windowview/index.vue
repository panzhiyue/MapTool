<template>
	<div id="app-base-window-view">
		<div class="one-block-1">
			<span> 1. 嵌入web内容 </span>
		</div>
		<div class="one-block-2">
			<a-space>
				<a-button @click="loadViewContent(0)">加载百度页面</a-button>
				<a-button @click="removeViewContent()">移除百度页面</a-button>
			</a-space>
		</div>
		<div class="one-block-1">
			<span> 2. 嵌入html内容 </span>
		</div>
		<div class="one-block-2">
			<a-space>
				<a-button @click="loadViewContent(1)">加载html页面</a-button>
				<a-button @click="removeViewContent()">移除html页面</a-button>
			</a-space>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { join } from 'path';
import { useWindow } from '@/hooks/electron/useWindow';
const { app: electronApp, BrowserView } = require('@electron/remote');
const views = ref([
	{
		type: 'web',
		content: 'http://www.baidu.com/',
	},
	{
		type: 'html',
		content: '/public/html/view_example.html',
	},
]);
const { currentWindow } = useWindow();
let myBrowserView;
const loadViewContent = (index) => {
	const { type, content } = views.value[index];
	let contentUrl = content;
	if (type == 'html') {
		contentUrl = join('file://', electronApp.getAppPath(), content);
	}
	myBrowserView = new BrowserView();
	currentWindow.setBrowserView(myBrowserView);
	myBrowserView.setBounds({
		x: 300,
		y: 170,
		width: 650,
		height: 400,
	});
	myBrowserView.webContents.loadURL(contentUrl);
};

const removeViewContent = () => {
	currentWindow.removeBrowserView(myBrowserView);
};
</script>
<style lang="less" scoped>
#app-base-window-view {
	padding: 0px 10px;
	text-align: left;
	width: 100%;
	.one-block-1 {
		font-size: 16px;
		padding-top: 10px;
	}
	.one-block-2 {
		padding-top: 10px;
	}
}
</style>
