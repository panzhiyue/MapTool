<template>
	<div class="main">
		<div class="item">
			<span class="name"> 控件 </span>
			<div class="btnbox">
				<a-checkbox class="chk"></a-checkbox>
				<span class="btnbox-name">图层管理</span>
			</div>
			<div class="btnbox">
				<a-checkbox
					class="chk"
					:checked="cesiumViewerStore.viewOpts.showNavigation"
					@click="toggleShowNavigation"></a-checkbox>
				<span class="btnbox-name">导航控件</span>
			</div>
			<div class="btnbox">
				<a-checkbox
					class="chk"
					:checked="cesiumViewerStore.viewOpts.showDistanceLegend"
					@click="toggleShowDistanceLegend"></a-checkbox>
				<span class="btnbox-name">比例尺</span>
			</div>
			<div class="btnbox">
				<a-checkbox
					class="chk"
					:checked="cesiumViewerStore.viewOpts.showStatusBar"
					@click="toggleShowStatusBar"></a-checkbox>
				<span class="btnbox-name">状态栏</span>
			</div>
			<div class="btnbox">
				<a-checkbox class="chk"></a-checkbox>
				<span class="btnbox-name">时间线</span>
			</div>
		</div>
	</div>
</template>
<script setup>
import { useCesiumViewerStore } from '@/store/cesiumViewer';
const viewer = inject('viewer').value;

const cesiumViewerStore = useCesiumViewerStore();

const toggleShowStatusBar = () => {
	cesiumViewerStore.viewOpts.showStatusBar = !cesiumViewerStore.viewOpts.showStatusBar;
};

const toggleShowDistanceLegend = () => {
	cesiumViewerStore.viewOpts.showDistanceLegend = !cesiumViewerStore.viewOpts.showDistanceLegend;
};

const toggleShowNavigation = () => {
	cesiumViewerStore.viewOpts.showNavigation = !cesiumViewerStore.viewOpts.showNavigation;
};

watch(
	() => {
		return cesiumViewerStore.viewOpts.showNavigation;
	},
	() => {
		console.log(viewer);
	},
);
</script>

<style lang="less" scoped>
.main {
	width: 100%;
	height: 100%;
	display: flex;
	overflow-x: visible;
	overflow-y: hidden;
	.item {
		width: auto;
		height: 72px;
		position: relative;
		margin: 12px 5px;
		border-right: 2px solid #474747;
		padding-right: 25px;
		padding-left: 12px;
		display: flex;

		.name {
			display: inline-block;
			min-width: 57px;
			height: 18px;
			background: #474747;
			border-radius: 3px;
			font-size: 12px;
			color: #ddd;
			text-align: center;
			position: absolute;
			left: 16px;
			top: -2px;
		}

		.btnbox {
			height: 72px;
			width: 60px;
			float: left;
			margin-top: 5px;
			margin-left: 5px;
			position: relative;

			.btn {
				width: 34px;
				height: 34px;
				margin: 5px auto;
				margin-top: 20px;
				background-position: 50% !important;
				cursor: pointer;
			}

			.chk {
				margin-top: 20px;
				margin-left: 20px;
				display: block;
			}
			.btnbox-name {
				position: absolute;
				bottom: 0;
				display: inline-block;
				width: 100%;
				font-size: 12px;
				text-align: center;
			}
		}
	}
}
</style>
