<template>
	<div class="container">
		<vue2ol-map :options="{ interactions: [] }" @ready="handleReady">
			<vue2ol-view :options="viewOptions"></vue2ol-view>
			<!-- <vue2ol-layer-tile>
				<vue2ol-source-tdt></vue2ol-source-tdt>
			</vue2ol-layer-tile> -->
			<vue2ol-layer-vector :zIndex="901" :style-obj="style1">
				<vue2ol-source-vector>
					<vue2ol-interaction-plotdraw
						:active="true"
						type="finearrow"
						:style-obj="style1"></vue2ol-interaction-plotdraw>
				</vue2ol-source-vector>
			</vue2ol-layer-vector>
		</vue2ol-map>
	</div>
</template>
<script setup>
import { ref, onMounted, reactive } from 'vue';
import * as style from 'ol/style';

const viewOptions = reactive({
	projection: 'EPSG:4326',
	center: [0, 0],
	zoom: 0,
});

const style1 = new style.Style({
	stroke: new style.Stroke({
		color: '#ff0000',
		width: 1,
	}),
	// fill: new style.Fill({
	// 	color: 'rgba(255,0,0,0.4)',
	// }),
});
// (paintConfig = {
// 	//绘图基础配置
// 	lineWidth: 1, //线条宽度，默认1
// 	strokeStyle: '#ff0000', //画笔颜色，默认红色
// 	fillStyle: '#ff0000', //填充色
// 	shadowBlur: 5, //阴影模糊级别
// 	lineJoin: 'round', //线条交角样式，默认圆角
// 	lineCap: 'round', //线条结束样式，默认圆角
// 	enableFill: false, //不允许填充颜色
// }),
onMounted(() => {
	// let graffitiBoard = new GraffitiBoard({
	// 	canvas: canvas.value,
	// });
});
const isReady = ref(false);
const handleReady = () => {
	isReady.value = true;
};
</script>
<style lang="less" scoped>
.container {
	width: 100%;
	height: 100%;
}
</style>
