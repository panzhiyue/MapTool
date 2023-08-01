<template>
	<div class="status-bar">
		<button class="btn">
			<span class="focus-helper"></span>
			<span class="content justify-center">
				<div class="section-short ellipsis">
					<span>带号</span><span>{{ mouseCoordsInfo2?.utmZone }}</span>
				</div>
				<div class="section ellipsis">
					<span>X</span><span>{{ mouseCoordsInfo2?.east }}</span>
				</div>
				<div class="section ellipsis">
					<span>Y</span><span>{{ mouseCoordsInfo2?.north }}</span>
				</div>
				<div class="section ellipsis">
					<span>高程</span><span>{{ mouseCoordsInfo2?.elevation }}</span>
				</div>
				<div class="section-short-mini ellipsis">
					<span>层级</span><span>{{ cameraInfo.level }}</span>
				</div>
				<div class="section-short ellipsis">
					<span>方位</span><span>{{ cameraInfo.heading }}°</span>
				</div>
				<div class="section-short ellipsis">
					<span>俯仰</span><span>{{ cameraInfo.pitch }}°</span>
				</div>
				<div class="section-short ellipsis">
					<span>侧翻</span><span>{{ cameraInfo.roll }}°</span>
				</div>
				<div class="section ellipsis">
					<span>视高</span><span>{{ cameraInfo.height }}m</span>
				</div>
				<div class="section-short-mini ellipsis">
					<span>{{ performanceInfo.ms }}</span>
				</div>
				<div class="section-short-mini ellipsis">
					<span>{{ performanceInfo.fps }}</span>
				</div>
			</span>
		</button>
	</div>
</template>
<script setup>
import { heightToLevel } from '../../../utils/cesium-helpers';
import throttle from '@/utils/private/throttle';
import MouseCoords, { extendForMouseCoords } from './MouseCoords';
const viewer = inject('viewer').value;

//相机信息
const cameraInfo = reactive({
	heading: 'NaN',
	pitch: 'NaN',
	roll: 'NaN',
	height: 'NaN',
	level: 'NaN',
});

//性能信息
const performanceInfo = reactive({
	fps: 'NaN',
	ms: 'NaN',
});
let lastMouseX = -1;
let lastMouseY = -1;
let debugShowFramesPerSecond = false;

const mouseCoordsInfo = ref(null);

const mouseCoordsInfo2 = computed(() => {
	return {
		elevation: mouseCoordsInfo.value?.elevation,
		utmZone: mouseCoordsInfo.value?.utmZone,
		latitude: mouseCoordsInfo.value?.latitude,
		longitude: mouseCoordsInfo.value?.longitude,
		north: mouseCoordsInfo.value?.north,
		east: mouseCoordsInfo.value?.east,
	};
});

onMounted(() => {
	const viewerElement = viewer._element;
	mouseCoordsInfo.value = new MouseCoords({
		gridFileUrl: 'https://zouyaoji.top/vue-cesium/SampleData/WW15MGH.DAC',
		proj4Projection: '+proj=utm +ellps=GRS80 +units=m +no_defs',
		projectionUnits: 'm',
		proj4longlat: '+proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees +no_defs',
		decimal: 6,
		rangeType: 0,
	});
	viewerElement.addEventListener('wheel', onMouseMove, false);
	viewerElement.addEventListener('mousemove', onMouseMove, false);
	viewerElement.addEventListener('touchmove', onMouseMove, false);
	extendForMouseCoords();
	viewer.camera.changed.addEventListener(onCameraChanged);
	onCameraChanged();

	debugShowFramesPerSecond = viewer.scene.debugShowFramesPerSecond;
	viewer.scene.debugShowFramesPerSecond = true;
	viewer.scene.postRender.addEventListener(onScenePostRender);
});

onUnmounted(() => {
	const viewerElement = viewer._element;
	viewerElement.removeEventListener('wheel', onMouseMove);
	viewerElement.removeEventListener('mousemove', onMouseMove);
	viewerElement.removeEventListener('touchmove', onMouseMove);

	viewer.camera.changed.removeEventListener(onCameraChanged);

	if (debugShowFramesPerSecond) {
		viewer.scene._performanceDisplay._container.style.display = 'block';
	} else {
		viewer.scene.debugShowFramesPerSecond = false;
	}

	viewer.scene.postRender.removeEventListener(onScenePostRender);
});

const onCameraChanged = () => {
	const scene = viewer.scene;
	const sscc = scene.screenSpaceCameraController;
	if (scene.mode === Cesium.SceneMode.MORPHING || !sscc.enableInputs) {
		return;
	}

	const { Math: CesiumMath } = Cesium;
	cameraInfo.heading = CesiumMath.toDegrees(viewer.camera.heading).toFixed(1);
	cameraInfo.pitch = CesiumMath.toDegrees(viewer.camera.pitch).toFixed(1);
	cameraInfo.roll = CesiumMath.toDegrees(viewer.camera.roll).toFixed(1);
	cameraInfo.height = viewer.camera.positionCartographic.height.toFixed(2);
	cameraInfo.level = heightToLevel(Number(cameraInfo.height)).toFixed(0);
};

const onScenePostRender = throttle((scene) => {
	performanceInfo.fps = scene._performanceDisplay?._fpsText.nodeValue;
	performanceInfo.ms = scene._performanceDisplay?._msText.nodeValue;
	scene._performanceDisplay._container.style.display = 'none';
}, 250);

const onMouseMove = (e) => {
	const { Cartesian2, SceneMode } = Cesium;

	if (viewer.scene.mode === SceneMode.MORPHING) return;

	const clientX =
		e.type === 'mousemove' || e.type === 'wheel' ? e.clientX : e.changedTouches[0].clientX;
	const clientY =
		e.type === 'mousemove' || e.type === 'wheel' ? e.clientY : e.changedTouches[0].clientY;

	if (clientX === lastMouseX && clientY === lastMouseY) {
		return;
	}

	lastMouseX = clientX;
	lastMouseY = clientY;

	const viewerElement = viewer._element;

	if (viewer) {
		const rect = viewerElement.getBoundingClientRect();
		const position = new Cartesian2(clientX - rect.left, clientY - rect.top);
		mouseCoordsInfo.value?.updateCoordinatesFromCesium(viewer, position);
	}
};
</script>
<style lang="less" scoped>
.status-bar {
	width: 100%;
	height: 30px;
	background: rgba(71, 71, 71, 0.8);
	position: absolute;
	bottom: 0px;
	font-size: 14px;
	line-height: 30px;
	z-index: 9999;
	color: white;
	transform: translate(0px, 0px);
	background: rgb(63, 72, 84);
	color: rgb(255, 255, 255);
	cursor: pointer;
	position: absolute;
	z-index: 1000;
	margin-right: 5px;
	box-sizing: border-box;
	float: left;
	padding: 5px;
	font-size: 0.7rem;
	text-align: center;
	line-height: 1;
	border: 0;
	outline: 0;
	font-family: monospace, sans-serif;
	max-height: 21px;
	margin-top: 5px;

	div {
		display: inline-block;
		padding: 0 5px;
		text-align: left;
	}

	span {
		padding: 0 5px;
	}

	// .btn {
	// 	transform: translate(0px, 0px);
	// 	background: rgb(63, 72, 84);
	// 	color: rgb(255, 255, 255);
	// 	cursor: pointer;
	// 	position: absolute;
	// 	z-index: 1000;
	// 	margin-right: 5px;
	// 	box-sizing: border-box;
	// 	float: left;
	// 	padding: 5px;
	// 	font-size: 0.7rem;
	// 	text-align: center;
	// 	line-height: 1;
	// 	border: 0;
	// 	outline: 0;
	// 	font-family: monospace, sans-serif;
	// 	max-height: 21px;
	// 	margin-top: 5px;

	.focus-helper {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		border-radius: inherit;
		opacity: 0;
		pointer-events: none;
		transition: background-color 0.3s cubic-bezier(0.25, 0.8, 0.5, 1),
			opacity 0.4s cubic-bezier(0.25, 0.8, 0.5, 1);
	}
	.content {
		align-items: center;
		flex: 10000 1 0%;
		display: flex;
		flex-wrap: wrap;
		.section {
			width: 135px;
		}
		.section-short {
			width: 100px;
		}
		.ellipsis {
			text-overflow: ellipsis;
			white-space: nowrap;
			overflow: hidden;
		}
	}
	// }
}
</style>
