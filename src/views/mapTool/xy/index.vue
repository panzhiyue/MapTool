<template>
	<div class="xy w-full h-full p-2">
		<a-space
			><i class="icon icon-pan" title="平移至" @click="handlePanTo"></i
			><i class="icon icon-zoom-in" title="缩放至" @click="handleZoomTo"></i
		></a-space>
		<a-space
			>经度：<a-input v-model:value="lng"></a-input>纬度：<a-input v-model:value="lat"></a-input
		></a-space>
	</div>
</template>
<script lang="ts" setup>
import { useMapToolWindow } from '@/hooks/electron/useMapToolWindow';

const lng = ref();
const lat = ref();
const { panTo, zoomTo } = useMapToolWindow();
const handlePanTo = () => {
	panTo(parseFloat(lng.value), parseFloat(lat.value));
};

const handleZoomTo = () => {
	zoomTo(parseFloat(lng.value), parseFloat(lat.value), 16);
};
</script>
<style lang="less" scoped>
@import '@/styles/index.less';
.xy {
	background-color: @bgColor;
	/deep/ .ant-input {
		width: 100px;
		height: 20px;
	}
}
</style>
