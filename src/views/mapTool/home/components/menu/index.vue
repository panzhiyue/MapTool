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
			<span>视图</span>
			<template #overlay>
				<a-menu>
					<a-menu-item key="0">
						<span @click="handleToggleStatusbar"> 状态栏</span>
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
			<span>天地图</span>
			<template #overlay>
				<a-menu>
					<a-menu-item key="0">
						<span @click="handleShowSearch">地名搜索</span>
					</a-menu-item>
					<a-menu-item key="0">
						<span @click="handleShowDrive">驾车规划</span>
					</a-menu-item>
					<a-menu-item key="0">
						<span @click="handleShowBusline">公交规划</span>
					</a-menu-item>
					<a-menu-item key="0">
						<span @click="handleShowGeocoder">地理编码查询</span>
					</a-menu-item>
					<a-menu-item key="0">
						<span @click="handleShowReverseGeocoder">逆地理编码查询</span>
					</a-menu-item>
					<a-menu-item key="0">
						<span @click="handleShowAdministrative">行政区划</span>
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
const homeStore = useHomeStore();
const handleShowTool = () => {
	ipcRenderer.send(
		'open-win',
		WindowName.TOOLBOX,
		`toolbox`,
		{
			width: 400,
			height: 700,
			frame: true,
			parent: WindowName.MAIN,
		},
		{},
	);
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

/**
 * 切换状态栏显示与隐藏
 */
const handleToggleStatusbar = () => {
	homeStore.setConfig({
		...homeStore.config,
		isShowStatusbar: !homeStore.config.isShowStatusbar,
	});
};

/**
 * 天地图地名搜索
 */
const handleShowSearch = () => {};
/**
 * 天地图驾车规划
 */
const handleShowDrive = () => {};

/**
 * 天地图公交规划
 */
const handleShowBusline = () => {};

/**
 * 天地图地理编码查询
 */
const handleShowGeocoder = () => {
	ipcRenderer.send('open-win', WindowName.TDT_GEOCODER, `tdt/geocoder`, {
		width: 700,
		height: 400,
		frame: true,
		parent: WindowName.MAIN,
		close: true,
	});
};

/**
 * 天地图逆地理编码查询
 */
const handleShowReverseGeocoder = () => {
	ipcRenderer.send('open-win', WindowName.TDT_REVERSE_GEOCODER, `tdt/reverseGeocoder`, {
		width: 700,
		height: 400,
		frame: true,
		parent: WindowName.MAIN,
		close: true,
	});
};

/**
 * 天地图行政区划
 */
const handleShowAdministrative = () => {
	ipcRenderer.send('open-win', WindowName.ADMINISTRATIVE, `tdt/administrative`, {
		width: 700,
		height: 400,
		frame: true,
		parent: WindowName.MAIN,
		close: true,
	});
};
</script>
<style lang="less" scoped>
.menu {
	height: 20px;
	line-height: 20px;
	margin-left: 8px;

	/deep/ .ant-dropdown-trigger {
		display: inline-block;
		min-width: 40px;
		text-align: center;
	}
}
</style>
