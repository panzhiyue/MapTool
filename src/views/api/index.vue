<template>
	<a-layout id="app-layout-sider">
		<a-layout-sider v-model="collapsed" theme="light" class="layout-sider">
			<a-menu class="menu-item" theme="light" mode="inline">
				<a-menu-item v-for="(item, index) in menus" @click="handleTo(item.url)" :key="index">
					{{ item.title }}
				</a-menu-item>
			</a-menu>
		</a-layout-sider>
		<a-layout>
			<a-layout-content class="layout-content">
				<iframe :src="currentUrl"></iframe>
			</a-layout-content>
		</a-layout>
	</a-layout>
</template>
<script lang="ts" setup>
import { ref, reactive } from 'vue';
const collapsed = ref(false);
const menus = reactive([
	{
		title: 'OL(本地部署)',
		url: 'http://api.panzhiyue.website/openlayers/',
	},
	{
		title: 'OL(官网)',
		url: 'https://openlayers.org/',
	},
]);
const currentUrl = ref('');
const handleTo = (url) => {
	currentUrl.value = url;
};
</script>
<style lang="less" scoped>
#app-layout-sider {
	width: 100%;
	height: 100%;

	.layout-content {
		padding: 10px;

		iframe {
			width: 100%;
			height: 100%;
		}
	}
}
</style>
