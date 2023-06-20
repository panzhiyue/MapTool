<template>
	<div class="container">
		<a-space
			>整数位：<a-input v-model:value="integerDigit"></a-input>小数位：<a-input
				v-model:value="decimalDigit"></a-input
		></a-space>
		<a-space
			>整数位：<a-input v-model:value="integerDigit2"></a-input>小数位：<a-input
				v-model:value="decimalDigit2"></a-input
		></a-space>
		<a-space>生成数量：<a-input v-model:value="count"></a-input></a-space>
		<a-button @click="handleClick">生成</a-button>
	</div>
</template>
<script lang="ts" setup>
import { Ref, ref } from 'vue';
const integerDigit = ref(4);
const decimalDigit = ref(0);

const integerDigit2 = ref(2);
const decimalDigit2 = ref(2);

const count = ref(10);

const list: Ref<Object[]> = ref([]);
const handleClick = () => {
	for (let i = 0; i < count.value; i++) {
		list.value.push({
			current: (Math.random() * Math.pow(10, integerDigit.value)).toFixed(decimalDigit.value),
			growthRate: (Math.random() * Math.pow(10, integerDigit2.value)).toFixed(decimalDigit2.value),
		});
	}
};
</script>
