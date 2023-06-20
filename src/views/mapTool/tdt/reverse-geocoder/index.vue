<template>
	<tool-container>
		<template #content>
			<div class="w-full h-full p-5">
				<a-form layout="horizontal">
					<a-form-item>
						<row>
							<template #title>经度:</template>
							<template #content
								><a-input v-model:value="lon" placeholder="120"></a-input
							></template>
						</row>
					</a-form-item>
					<a-form-item>
						<row>
							<template #title>纬度:</template>
							<template #content><a-input v-model:value="lat" placeholder="28"></a-input></template>
						</row>
					</a-form-item>
				</a-form>

				<row>
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
import { reverseGeocoder } from '@/api/tianditu';
const lon = ref(null);
const lat = ref(null);
const result = ref(null);
const handleSearch = () => {
	reverseGeocoder({
		lon: lon.value,
		lat: lat.value,
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
