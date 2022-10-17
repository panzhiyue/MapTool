<template>
	<a-select
		v-model:value="value2"
		show-search
		:options="options"
		:filter-option="filterOption"></a-select>
</template>

<script lang="ts" setup>
import { useVModel } from '@vueuse/core';

const props = defineProps({
	value: {
		type: String,
	},
	enum: {
		type: Object,
	},
});

const emits = defineEmits(['update:value']);
const value2 = useVModel(props, 'value', emits);

const options = computed(() => {
	let values: any = [];
	for (let i in props.enum) {
		values.push({ value: props.enum[i], label: props.enum[i] });
	}
	return values;
});
const filterOption = (input: string, option: any) => {
	return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};
</script>
