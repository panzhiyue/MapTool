<template>
	<a-input-number class="input-number" v-model:value="value2"></a-input-number>
</template>
<script setup lang="ts">
import { useVModel } from '@vueuse/core';

const props = defineProps({
	value: {
		type: Number,
	},
});

const emits = defineEmits(['update:value']);
const value2 = useVModel(props, 'value', emits);
</script>
<style lang="less" scoped>
.input-number {
	width: 100%;
	text-align: right;

	/deep/.ant-input-number-handler-wrap {
		display: none;
	}
}
</style>
