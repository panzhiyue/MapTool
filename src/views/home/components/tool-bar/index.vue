<template>
	<div class="toolbar">
		<a-space style="margin-top: -4px">
			<!-- <i class="icon icon-pre-step" title="前视图"></i
			><i class="icon icon-next-step" title="后视图"></i> -->
			<i
				class="icon icon-zoom-in"
				:class="{ active: mapInfo.dragZoomIn }"
				title="选框放大"
				@click="handleDragZoomIn"></i
			><i
				class="icon icon-zoom-out"
				:class="{ active: mapInfo.dragZoomOut }"
				title="选框缩小"
				@click="handleDragZoomOut"></i>
			<i
				class="icon icon-select"
				:class="{ active: mapInfo.select }"
				title="选择"
				@click="handleSelect"></i
			><i class="icon icon-pan" :class="{ active: mapInfo.pan }" title="漫游" @click="handlePan"></i
			><i class="icon icon-help" title="帮助" @click="handleHelp"></i
		></a-space>
	</div>
</template>
<script lang="ts" setup>
import { useHomeStore } from '@/store/home';

const homeStore = useHomeStore();

const mapInfo = computed(() => {
	return homeStore.mapInfo;
});

const handlePan = () => {
	homeStore.setPan(true);
};

const handleSelect = () => {
	homeStore.setSelect(true);
};

const handleDragZoomIn = () => {
	homeStore.setDragZoomIn(true);
};

const handleDragZoomOut = () => {
	homeStore.setDragZoomOut(true);
};

const handleHelp = () => {};
</script>
<style lang="less" scoped>
.toolbar {
	background-color: rgba(240, 242, 245, 1);
	color: #000;
	font-size: 16px;
	height: 30px;
	line-height: 30px;
	padding-left: 12px;
	box-sizing: border-box;

	i {
		cursor: pointer;
		border: 1px solid #fff;
	}

	i.active {
		background-color: rgba(141, 179, 210, 0.3);
		border: 1px solid #2d6faa;
	}

	i:hover {
		background-color: rgba(141, 179, 210, 0.5);
		border: 1px solid #2d6faa;
	}
}
</style>
