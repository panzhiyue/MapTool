<template>
	<div class="coordinate-system-info" style="white-space: pre-wrap; font-size: 12px">
		<scroll-box>{{ info }}</scroll-box>
	</div>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import ScrollBox from '@/components/scroll-box';
import { useCoordinateSystem } from '@/hooks/useCoordinateSystem';

const { getByAuth } = useCoordinateSystem();
const props = defineProps({
	value: {
		type: String,
	},
});

const info = computed(() => {
	return props.value ? getByAuth(props.value).exportToArcMap() : '<未知>';
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
