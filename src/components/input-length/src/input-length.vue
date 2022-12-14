<template>
	<div class="input-length">
		<input-number v-model:value="value2"></input-number>
		<enum-select v-model:value="unit2" :enum="LengthUnits" :mode="'name-value'"></enum-select>
	</div>
</template>
<script setup lang="ts">
import LengthUnits from '@/enum/LengthUnits';
import { PropType } from 'vue';
import { useVModel } from '@vueuse/core';

const props = defineProps({
	value: {
		type: Number,
	},
	unit: {
		type: String as PropType<LengthUnits>,
	},
});

const emits = defineEmits(['update:value', 'update:unit']);
const value2 = useVModel(props, 'value', emits);
const unit2 = useVModel(props, 'unit', emits);
</script>
<style lang="less" scoped>
.input-length {
	/deep/.ant-input-number {
		width: calc(100% - 110px);
		text-align: right;

		.ant-input-number-handler-wrap {
			display: none;
		}
	}
	.ant-select {
		width: 100px;
		margin-left: 10px;
	}
}
</style>
