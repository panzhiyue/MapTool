<template>
	<div id="app-hw-bluetooth">
		<div class="one-block-1">
			<span> 1. 打印机设备 </span>
		</div>
		<div class="one-block-2">
			<a-button @click="getPrinter()"> 获取打印机列表 </a-button>
		</div>
		<div class="one-block-2">
			<a-list size="small" bordered :data-source="printerList">
				<template #header>设备列表</template>
				<template #renderItem="{ item }">
					<a-list-item slot="renderItem" slot-scope="item">
						{{ item.displayName }} {{ defaultDevice(item) }}
					</a-list-item>
				</template>
			</a-list>
		</div>
		<div class="one-block-1">
			<span> 2. 打印内容 </span>
		</div>
		<div class="one-block-2">
			<a-button @click="doPrintCurrent(0)"> 打印当前页面 </a-button>
		</div>
		<div class="one-block-2">
			<a-button @click="doPrintPdf()"> 打印为PDF </a-button>
		</div>
	</div>
</template>
<script lang="ts" setup>
// import { ipcApiRoute } from '@/api/main';
import { usePrinter } from '@/hooks/electron/usePrinter';
import { useWindow } from '@/hooks/electron/useWindow';
import { join } from 'path';
import { getHomePath } from '@/hooks/electron/usePath';
import fs from 'fs';

const route = useRoute();
const { getPrinterList, print } = usePrinter();
const { currentWindow } = useWindow();
const printerList = ref([]);
const getPrinter = () => {
	printerList.value = getPrinterList();
};
const defaultDeviceName = ref('');

const defaultDevice = (item) => {
	let desc = '';
	if (item.isDefault) {
		desc = '- 默认';
		defaultDeviceName.value = item.name;
	}

	return desc;
};

// const indexHtml = join(process.env.DIST, 'index.html')

const views = [
	{
		type: 'url',
		content: process.env.VITE_DEV_SERVER_URL + '\\' + route.path,
	},
];
const doPrintCurrent = (index) => {
	currentWindow.webContents.print(
		{
			silent: false, // 显示打印对话框
			printBackground: true,
			deviceName: defaultDeviceName.value,
		},
		(success, failureReason) => {
			console.log(3);
		},
	);
};

const doPrintPdf = () => {
	const pdfPath = join(getHomePath(), 'Desktop', 'temp.pdf');
	currentWindow.webContents.printToPDF({}).then((data) => {
		fs.writeFile(pdfPath, data, (error) => {
			if (error) throw error;
			alert('打印成功！');
		});
	});
};
</script>
<style lang="less" scoped>
#app-hw-bluetooth {
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
