<template>
	<tool-container>
		<template #content>
			<div class="w-full h-full p-5">
				<row>
					<template #title>关键字(keyWord):</template>
					<template #content
						><a-input v-model:value="keyWord" placeholder="杭州市"></a-input
					></template>
					<template #operate><a-button @click="handleSearch">查询</a-button></template>
				</row>
				<div>{{ result }}</div>
			</div>
		</template>
	</tool-container>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import ToolContainer from '@/components/tool-container';
import Row from '@/components/row';
import { geocoder } from '@/api/tianditu';
const keyWord = ref(null);
const result = ref(null);
const handleSearch = () => {
	geocoder({
		keyWord: keyWord.value,
	}).then((res) => {
		result.value = res;
	});
};
</script>
<style lang="less" scoped>
.title {
	width: 100px;
}
</style>
