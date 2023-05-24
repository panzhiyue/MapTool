<template>
	<div id="app-base-software-open">
		<div class="one-block-1">
			<span> 1. 调用其它软件（exe、bash等可执行程序） </span>
		</div>
		<div class="one-block-2">
			<a-button @click="handleSelect">选择文件</a-button>
		</div>
	</div>
</template>
<script>
import fs from 'fs';
import { exec } from 'child_process';
import path from 'path';
const { dialog } = require('@electron/remote');
const data = [
	{
		content: 'powershell.exe',
		id: 'powershell.exe',
	},
];

export default {
	data() {
		return {
			data,
		};
	},
	methods: {
		handleSelect() {
			dialog
				.showOpenDialog({
					title: '请选择文件',
					properties: ['openFile'],
				})
				.then((res) => {
					console.log('res:', res);
					if (res) {
						this.openSoft(res.filePaths.join(';'));
						// p.value.switchURL(res.filePaths.join(';'));
					} else {
						// this.$message.warning('请选择视频');
					}
				})
				.catch((err) => {
					console.log(err);
				});
		},
		openSoft(softPath) {
			if (!softPath) {
				alert('程序不存在！');
			}

			let softwarePath = softPath;
			// Log.info('[openSoftware] softwarePath:', softwarePath);

			// 检查程序是否存在
			if (!fs.existsSync(softwarePath)) {
				alert('程序不存在！');
			}
			// 命令行字符串 并 执行
			let cmdStr = 'start ' + softwarePath;
			exec(cmdStr);
		},
	},
};
</script>
<style lang="less" scoped>
#app-base-software-open {
	padding: 0px 10px;
	text-align: left;
	width: 100%;
	.one-block-1 {
		font-size: 16px;
		padding-top: 10px;
		.sub-content {
			font-size: 14px;
		}
	}
	.one-block-2 {
		padding-top: 10px;
	}
}
</style>
