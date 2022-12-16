<template>
	<div class="menu">
		<a-dropdown>
			<span>文件</span>
			<template #overlay>
				<a-menu>
					<a-menu-item key="0">
						<a> 新建</a>
					</a-menu-item>
					<a-menu-item key="1">
						<a> 打开 </a>
					</a-menu-item>
					<a-menu-divider />
					<a-sub-menu key="g1">
						<template #title>添加数据</template>
						<a-menu-item key="1">x</a-menu-item>
						<a-menu-item key="2">y</a-menu-item>
					</a-sub-menu>
				</a-menu>
			</template>
		</a-dropdown>

		<a-dropdown>
			<span>窗口</span>
			<template #overlay>
				<a-menu>
					<a-menu-item key="0">
						<span @click="handleShowTool"> 工具箱</span>
					</a-menu-item>
				</a-menu>
			</template>
		</a-dropdown>
		<a-dropdown>
			<span>工具</span>
			<template #overlay>
				<a-menu>
					<a-menu-item key="0">
						<span @click="handleShowXY">转到XY</span>
					</a-menu-item>
					<a-menu-item key="0">
						<span @click="handleShowMeasure">量算</span>
					</a-menu-item>
					<a-menu-item key="0">
						<span @click="handleShowPlot">绘标</span>
					</a-menu-item>
					<a-menu-item key="0">
						<span @click="handleShowGrid">网格信息</span>
					</a-menu-item>
					<a-menu-item key="0">
						<span @click="handleShowCoordinateConversion">坐标换算</span>
					</a-menu-item>
					<a-menu-item key="0">
						<span @click="handleShowGeometryConversion">几何格式转换</span>
					</a-menu-item>
					<a-menu-item key="0">
						<span @click="handleShowGeometryConversionBatch">几何格式转换(批量)</span>
					</a-menu-item>
				</a-menu>
			</template>
		</a-dropdown>
		<a-dropdown>
			<span>帮助</span>
			<template #overlay>
				<a-menu>
					<a-menu-item key="0">
						<span @click="showAboutWindow">关于MapTool</span>
					</a-menu-item>
				</a-menu>
			</template>
		</a-dropdown>
	</div>
</template>
<script lang="ts" setup>
import { ipcRenderer } from 'electron';
import WindowName from '@/enum/WindowName';
import { useHomeStore } from '@/store/home';
import * as ElectronUtil from '@/utils/electron';
console.log(ElectronUtil);
const homeStore = useHomeStore();
const handleShowTool = () => {
	ipcRenderer.send('open-win', WindowName.TOOLBOX, `toolbox`, {
		width: 400,
		height: 700,
		frame: true,
		parent: WindowName.MAIN,
	});
};

const handleShowXY = () => {
	ipcRenderer.send('open-win', WindowName.XY, `xy`, {
		width: 360,
		height: 100,
		frame: true,
		parent: WindowName.MAIN,
	});
};

const handleShowMeasure = () => {
	ipcRenderer.send('open-win', WindowName.MEASURE, `measure`, {
		width: 400,
		height: 200,
		frame: true,
		parent: WindowName.MAIN,
	});
};

const handleShowPlot = () => {
	ipcRenderer.send('open-win', WindowName.PLOT, `plot`, {
		width: 500,
		height: 250,
		frame: true,
		parent: WindowName.MAIN,
	});
};

const handleShowGrid = () => {
	homeStore.setShowGrid(!homeStore.showGrid);
};

const handleShowCoordinateConversion = () => {
	ipcRenderer.send('open-win', WindowName.COORDINATE_CONVERSION, `coordinateConversion`, {
		width: 500,
		height: 250,
		frame: true,
		parent: WindowName.MAIN,
	});
};

const handleShowGeometryConversion = () => {
	ipcRenderer.send('open-win', WindowName.GEOMETRY_CONVERSION, `geometryConversion`, {
		width: 600,
		height: 400,
		frame: true,
		parent: WindowName.MAIN,
	});
};

const handleShowGeometryConversionBatch = () => {
	ipcRenderer.send('open-win', WindowName.GEOMETRY_CONVERSION_BATCH, `geometryConversionBatch`, {
		width: 600,
		height: 400,
		frame: true,
		parent: WindowName.MAIN,
	});
};

const showAboutWindow = () => {
	ElectronUtil.showAboutWindow({
		title: '关于MapTool',
		copyright: 'Copyright © Sindre Sorhus',
		text: 'Some more info.',
	});
};
</script>
<style lang="less" scoped>
.menu {
	height: 20px;
	line-height: 20px;

	/deep/ .ant-dropdown-trigger {
		display: inline-block;
		width: 40px;
		text-align: center;
	}
}
</style>
