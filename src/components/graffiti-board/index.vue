<template>
	<div class="w-full h-full">
		<div class="tool-container">
			<a-button type="button" class="btn btn-warning" id="drawPen" @click="draw(1)">画笔</a-button>
			<a-button type="button" class="btn btn-warning" id="drawLine" @click="draw(2)"
				>绘制线条</a-button
			>
			<a-button type="button" class="btn btn-warning" id="drawArror" @click="draw(21)"
				>绘制箭头</a-button
			>
			<a-button type="button" class="btn btn-warning" id="drawTriangle" @click="draw(3)"
				>绘制三角形</a-button
			>
			<a-button type="button" class="btn btn-warning" id="drawRect" @click="draw(4)"
				>绘制矩形</a-button
			>
			<a-button type="button" class="btn btn-warning" id="drawParallel" @click="draw(41)"
				>绘制平行四边形</a-button
			>
			<a-button type="button" class="btn btn-warning" id="drawTrape" @click="draw(42)"
				>绘制梯形</a-button
			>
			<a-button type="button" class="btn btn-warning" id="drawPolygon" @click="draw(5)"
				>绘制多边形</a-button
			>
			<a-button type="button" class="btn btn-warning" id="drawCircle" @click="draw(6)"
				>绘制圆</a-button
			>
			<a-button type="button" class="btn btn-danger" id="clearAll" @click="clearAll()"
				>清空</a-button
			>
			<a-button type="button" class="btn btn-danger" id="clearAll" @click="draw(-1)">擦除</a-button>
		</div>
		<canvas class="main" ref="dom"></canvas>
	</div>
</template>
<script setup>
import { ref, onMounted, reactive } from 'vue';
import GraffitiCanvas from './index.ts';

const dom = ref(null);
const drawUtil = new GraffitiCanvas();

const resizeCanvas = () => {
	console.log(dom.value.parentNode);
	console.log(dom.value.parentNode.clientWidth);
	dom.value.width = dom.value.parentNode.clientWidth;
	dom.value.height = dom.value.parentNode.clientHeight;
};
window.addEventListener('resize', resizeCanvas, false);

onMounted(() => {
	resizeCanvas();
	if (drawUtil.init({ dom: dom.value })) {
		console.log(3333);
		drawUtil.setPaintConfig({
			shadowBlur: 0.1,
			lineWidth: 1,
			strokeStyle: '#000',
		});
	}
	drawUtil.begin(1);
});

onUnmounted(() => {
	window.removeEventListener('resize', resizeCanvas, false);
});

const clearAll = drawUtil.clear;

const draw = (type) => {
	drawUtil.begin(type);
};
</script>
<style lang="less" scoped>
.tool-container {
	position: absolute;
}
</style>
