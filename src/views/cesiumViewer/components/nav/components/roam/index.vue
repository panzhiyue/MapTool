<template>
	<div class="main">
		<div class="item">
			<span class="name"> 场景 </span>
			<div class="btnbox">
				<div class="btn">
					<save-outlined class="chk" />
				</div>
				<span class="btnbox-name">保存</span>
			</div>
			<div class="btnbox">
				<div class="btn">
					<a-button type="primary" :size="'small'" @click="print">截屏</a-button>
				</div>
			</div>
		</div>
		<div class="item">
			<span class="name"> 视角 </span>
			<div class="btnbox">
				<div class="btn">
					<a-button type="primary" :size="'small'" @click="flyToGlobal">全球</a-button>
				</div>
			</div>
			<div class="btnbox">
				<div class="btn">
					<a-button type="primary" :size="'small'" @click="flyToChina">中国</a-button>
				</div>
			</div>
			<div class="btnbox">
				<div class="btn">
					<a-button
						type="primary"
						:size="'small'"
						@click="cesiumViewerStore.roamOpts.showViewManager = true"
						>自定义</a-button
					>
				</div>
			</div>
		</div>
	</div>
</template>
<script setup>
import { useCesiumViewerStore } from '@/store/cesiumViewer';
import { SaveOutlined } from '@ant-design/icons-vue';
import { Cartesian3, Math as CesiumMath } from 'cesium';
import { sceneToPng } from '../../../../utils/cesium-helpers';
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

const toggleShowTimeline = () => {
	cesiumViewerStore.viewOpts.showTimeline = !cesiumViewerStore.viewOpts.showTimeline;
};

const flyToGlobal = () => {
	viewer.camera.flyTo({
		destination: Cartesian3.fromDegrees(-82.5, 35.2, 24908123),
		orientation: {
			pitch: CesiumMath.toRadians(-90),
			roll: CesiumMath.toRadians(0),
			heading: CesiumMath.toRadians(360),
		},
		duration: 3,
	});
};

const flyToChina = () => {
	viewer.camera.flyTo({
		destination: Cartesian3.fromDegrees(116.435314, 40.960521, 10000000.0),
		duration: 3,
	});
};

const print = async () => {
	sceneToPng(viewer.scene);
};
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
				.ant-checkbox-wrapper {
					margin-left: 7px;
				}

				.anticon {
					font-size: 30px;
					margin-left: 2px;
				}
			}

			// .chk {
			// 	margin-top: 20px;
			// 	margin-left: 20px;
			// 	display: block;
			// }
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
