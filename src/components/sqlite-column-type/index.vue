<template>
	<a-select :value="value" show-search :options="options" :filter-option="filterOption"></a-select>
</template>

<script lang="ts" setup>
import type { SelectProps } from 'ant-design-vue';
import { defineComponent, ref } from 'vue';
import SqliteColumnType from '@/enum/SqliteColumnType';

const props = defineProps({
	value: {
		type: String,
	},
});
const options = computed(() => {
	let values: any = [];
	for (let i in SqliteColumnType) {
		values.push({ value: SqliteColumnType[i], label: SqliteColumnType[i] });
	}
	return values;
});
const filterOption = (input: string, option: any) => {
	return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};
</script>
