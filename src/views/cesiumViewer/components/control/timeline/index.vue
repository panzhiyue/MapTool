<template>
	<div class="timeline-container" ref="dom"></div>
</template>
<script setup>
const viewer = inject('viewer').value;
import { Timeline } from 'cesium';
const dom = ref(null);

let timeline = null;
onMounted(() => {
	timeline = new Timeline(dom.value, viewer.clock);
});
onUnmounted(() => {
	timeline.destroy();
});
</script>
<style lang="less" scoped>
.timeline-container {
	position: absolute;
	width: 100%;
	bottom: 0px;
	z-index: 900;
}
</style>
