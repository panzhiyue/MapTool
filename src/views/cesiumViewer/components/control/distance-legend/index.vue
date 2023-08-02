<template>
	<button
		class="distance-legend"
		style="
			transform: translate(0px, 0px);
			background: rgb(63, 72, 84);
			color: rgb(255, 255, 255);
			width: 100px;
		">
		<span class="focus-helper"></span
		><span class="content"
			><label>{{ distanceLabel }}</label>
			<div class="bar" :style="barStyle"></div
		></span>
	</button>
</template>
<script setup>
import * as Cesium from 'cesium';
import throttle from '@/utils/private/throttle';
const viewer = inject('viewer').value;
const rootStyle = reactive({});
const distanceLabel = ref('');
let lastLegendUpdate = 0;
const barWidth = ref(0);
const defaultWidth = ref(100);
let distance = 0;
const distances = [
	1, 2, 3, 5, 10, 20, 30, 50, 100, 200, 300, 500, 1000, 2000, 3000, 5000, 10000, 20000, 30000,
	50000, 100000, 200000, 300000, 500000, 1000000, 2000000, 3000000, 5000000, 10000000, 20000000,
	30000000, 50000000,
];
const barStyle = computed(() => {
	return {
		width: `${barWidth.value}px`,
		left: `${5 + (defaultWidth.value + 15 - barWidth.value) / 2}px`,
		height: '2px',
		background: '#fff',
	};
});

onMounted(() => {
	viewer.scene.postRender.addEventListener(onScenePostRender);
});

onUnmounted(() => {
	viewer.scene.postRender.removeEventListener(onScenePostRender);
});

const onScenePostRender = throttle((scene) => {
	const { Cartesian2, defined, getTimestamp, EllipsoidGeodesic } = Cesium;
	const now = getTimestamp();
	if (now < lastLegendUpdate + 250) {
		return;
	}
	lastLegendUpdate = now;
	const geodesic = new EllipsoidGeodesic();
	// Find the distance between two pixels at the bottom center of the screen.
	const width = scene.canvas.clientWidth;
	const height = scene.canvas.clientHeight;

	const left = scene.camera.getPickRay(new Cartesian2((width / 2) | 0, height - 1));
	const right = scene.camera.getPickRay(new Cartesian2((1 + width / 2) | 0, height - 1));

	const globe = scene.globe;
	const leftPosition = globe.pick(left, scene);
	const rightPosition = globe.pick(right, scene);
	if (!defined(leftPosition) || !defined(rightPosition)) {
		barWidth.value = 0;
		distanceLabel.value = '';
		return;
	}
	const leftCartographic = globe.ellipsoid.cartesianToCartographic(leftPosition);
	const rightCartographic = globe.ellipsoid.cartesianToCartographic(rightPosition);

	geodesic.setEndPoints(leftCartographic, rightCartographic);
	const pixelDistance = geodesic.surfaceDistance;

	// Find the first distance that makes the scale bar less than 100 pixels.
	const maxBarWidth = defaultWidth.value - 10;
	let _distance;
	for (let i = distances.length - 1; !defined(_distance) && i >= 0; --i) {
		if (distances[i] / pixelDistance < maxBarWidth) {
			_distance = distances[i];
			if (distance !== _distance) {
				distance = _distance;
			}
		}
	}

	if (defined(_distance)) {
		let label;
		if (distance >= 1000) {
			label = (_distance / 1000).toString() + ' km';
		} else {
			label = _distance.toString() + ' m';
		}

		barWidth.value = (_distance / pixelDistance) | 0;
		distanceLabel.value = label;
	} else {
		barWidth.value = 0;
		distanceLabel.value = '';
	}
}, 500);
</script>
<style lang="less" scoped>
.distance-legend {
	position: absolute;
	margin-right: 5px;
	box-sizing: border-box;
	float: left;
	padding: 5px 5px;
	font-size: 0.7rem;
	text-align: center;
	line-height: 1;
	border: 0;
	outline: 0;
	font-family: monospace, sans-serif;
	max-height: 21px;
	margin-top: 5px;
	height: 21px;
	bottom: 30px;
	right: 10px;
	z-index: 999;
	background: rgb(63, 72, 84);
	.bar {
		margin: 0 auto;
		display: block;
		transition: all 0.5s ease-in-out;
	}
}
</style>
