<template>
	<a-select
		v-model:value="value2"
		show-search
		:options="options"
		:filter-option="filterOption"></a-select>
</template>

<script lang="ts" setup>
import { useVModel } from '@vueuse/core';
import { PropType } from 'vue';

const props = defineProps({
	value: {
		type: String,
	},
	enum: {
		type: Object,
	},
	mode: {
		type: String as PropType<'value-value' | 'name-name' | 'value-name' | 'name-value'>,
		default: 'value-value',
	},
});

const emits = defineEmits(['update:value']);
const value2 = useVModel(props, 'value', emits);

const options = computed(() => {
	let values: any = [];
	console.log(props.enum);
	for (let name in props.enum) {
		console.log(name, props.mode);
		let value = props.enum[name];
		switch (props.mode) {
			case 'value-value': {
				values.push({ label: value, value: value });
				break;
			}
			case 'value-name': {
				values.push({ label: value, value: name });
				break;
			}
			case 'name-value': {
				values.push({ label: name, value: value });
				break;
			}
			case 'name-name': {
				values.push({ label: name, value: name });
				break;
			}
		}
	}
	console.log(values);
	return values;
});
const filterOption = (input: string, option: any) => {
	return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};
</script>
<style lang="less" scoped>
.ant-select {
	width: 100px;
}
</style>
