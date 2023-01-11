<template>
	<div class="coordinate-system-info">{{ info }}</div>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import WktParser from 'wkt-parser';
const props = defineProps({
	value: {
		type: String,
	},
});

const info = computed(() => {
	if (props.value) {
		console.log(WktParser(props.value));
	}

	return props.value ? WktParser(props.value).pretty_wkt : '<未知>';
});
</script>
<style lang="less" scoped>
.coordinate-system-info {
	width: 100%;
	height: 200px;
	border: 1px solid #ccc;
	padding: 10px;
	word-wrap: break-word;
	word-break: normal;
}
</style>
