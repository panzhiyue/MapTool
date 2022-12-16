<template>
	<div class="tool-container">
		<scroll-box class="tool-container-content">
			<slot name="content"></slot>
		</scroll-box>
		<div v-if="$slots['footer']" class="tool-container-footer">
			<slot name="footer"></slot>
		</div>
	</div>
</template>
<script lang="ts" setup>
import ScrollBox from '@/components/scroll-box';
</script>
<style lang="less" scoped>
.tool-container {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	overflow: hidden;

	.tool-container-content {
		flex-grow: 1;
	}

	.tool-container-footer {
		width: 100%;
		height: 40px;
	}
}
</style>
