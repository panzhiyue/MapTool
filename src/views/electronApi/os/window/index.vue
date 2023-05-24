<template>
	<div id="app-base-window">
		<div class="one-block-1">
			<span> 1. 新窗口中加载web内容 </span>
		</div>
		<div class="one-block-2">
			<a-space>
				<a-button @click="createWindow(0)">打开哔哩哔哩</a-button>
			</a-space>
		</div>
		<div class="one-block-1">
			<span> 2. 新窗口中加载html内容 </span>
		</div>
		<div class="one-block-2">
			<a-space>
				<a-button @click="createWindow(1)">打开html页面</a-button>
			</a-space>
		</div>
		<div class="one-block-1">
			<span> 3. 新窗口中加载当前项目页面 </span>
		</div>
		<div class="one-block-2">
			<a-space>
				<a-button @click="createWindow(2)">打开vue页面</a-button>
			</a-space>
		</div>
	</div>
</template>
<script>
//   import { ipcApiRoute } from '@/api/main'
const { app: electronApp, BrowserWindow } = require('@electron/remote');
import { join } from 'path';

export default {
	data() {
		return {
			views: [
				{
					type: 'web',
					content: 'https://www.bilibili.com/',
					windowName: 'window-web',
					windowTitle: 'bilibili',
				},
				{
					type: 'html',
					content: '/public/html/view_example.html',
					windowName: 'window-html',
					windowTitle: 'html window',
				},
				{
					type: 'vue',
					content: '/electronApiT/os/subwindow',
					windowName: 'window-vue',
					windowTitle: 'vue window',
				},
			],
		};
	},
	methods: {
		createWindow(index) {
			let args = this.views[index];
			const { type, content, windowName, windowTitle } = args;
			let contentUrl = null;
			if (type == 'html') {
				contentUrl = join('file://', electronApp.getAppPath(), content);
			} else if (type == 'web') {
				contentUrl = content;
			} else if (type == 'vue') {
				// let addr = 'http://127.0.0.1:5173';
				// if (Ps.isProd()) {
				// 	const mainServer = Conf.getValue('mainServer');
				// 	addr = mainServer.protocol + mainServer.host + ':' + mainServer.port;
				// }

				contentUrl = process.env.VITE_DEV_SERVER_URL + content;
			} else {
				// some
			}

			console.log('contentUrl: ', contentUrl);
			// const addonWindow = this.app.addon.window;
			let opt = {
				title: windowTitle,
				webPreferences: {
					nodeIntegration: true,
					contextIsolation: false,
				},
			};
			const win = new BrowserWindow(opt);
			const winContentsId = win.webContents.id;

			// load page
			win.loadURL(contentUrl);
			return winContentsId;
			// this.$ipc.invoke(ipcApiRoute.createWindow, this.views[index]).then(r => {
			//   console.log(r);
			// })
		},
	},
};
</script>
<style lang="less" scoped>
#app-base-window {
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
