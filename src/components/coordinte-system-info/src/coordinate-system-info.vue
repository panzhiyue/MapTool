<template>
	<div class="coordinate-system-info" style="white-space: pre-wrap; font-size: 12px">
		<scroll-box>{{ info }}</scroll-box>
	</div>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import SpatialReference from '@/utils/SpatialReference';
import ScrollBox from '@/components/scroll-box';
const props = defineProps({
	value: {
		type: String,
	},
});

const info = computed(() => {
	return props.value ? new SpatialReference(props.value).exportToEsriInfo() : '<未知>';
});
</script>
<style lang="less" scoped>
.coordinate-system-info {
	width: 100%;
	height: 250px;
	border: 1px solid #ccc;
	padding: 10px;
	word-wrap: break-word;
	word-break: normal;
}
</style>
