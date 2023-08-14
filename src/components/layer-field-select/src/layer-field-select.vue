<template>
	<a-select v-model:value2="value2" show-search :options="options" mode="multiple"></a-select>
</template>

<script lang="ts" setup>
import { IColumnStructure } from '#/database';
import { getTableStruct } from '@/api/table';
import ResponseResult from '@/utils/db/ResponseResult';
import { useVModel } from '@vueuse/core';
import { getDB } from '@/utils/db/MapTool';

const props = defineProps({
	/**
	 * 表名
	 */
	tableName: {
		type: String,
	},
	/**
	 * 选择的字段值
	 */
	value: {},
});

const emits = defineEmits(['update:value']);
const value2 = useVModel(props, 'value', emits);
const options = ref(null);

const initOptions = async () => {
	const db = await getDB();
	getTableStruct(db, props.tableName).then((result: ResponseResult<IColumnStructure[]>) => {
		options.value = result.data.map((item) => {
			return {
				value: item.name,
				label: item.name,
			};
		});
	});
};

onMounted(() => {
	initOptions();
});

watch(
	() => {
		return props.tableName;
	},
	() => {
		initOptions();
	},
);
</script>
