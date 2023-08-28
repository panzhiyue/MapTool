<template>
	<a-layout id="app-layout-sider">
		<a-layout-sider v-model="collapsed" theme="light" class="layout-sider">
			<!-- <div class="logo">
				<img class="pic-logo" src="~@/assets/logo.png" />
			</div> -->
			<a-menu class="menu-item" theme="light" mode="inline">
				<a-menu-item v-for="(item, index) in menus" :key="index">
					<router-link :to="{ path: item.path, params: {} }">
						{{ item.title }}
					</router-link>
				</a-menu-item>
			</a-menu>
		</a-layout-sider>
		<a-layout>
			<a-layout-content class="layout-content">
				<router-view />
			</a-layout-content>
		</a-layout>
	</a-layout>
</template>
<script lang="ts" setup>
import { ref, reactive } from 'vue';
const collapsed = ref(false);
const menus = reactive([
	{
		title: '计算基期',
		path: '/webmaster-tools/calculation-baseperiod',
	},
	{
		title: '百化分背诵',
		path: '/webmaster-tools/percentile/recite',
	},
	{
		title: '资料-公式',
		path: '/webmaster-tools/information-formula',
	},
	{
		title: '数学运算-公式',
		path: '/webmaster-tools/math-formula',
	},
	{
		title: '涂鸦板',
		path: '/webmaster-tools/graffiti-board',
	},
]);
</script>
<style lang="less" scoped>
#app-layout-sider {
	width: 100%;
	height: 100%;

	.layout-content {
		padding: 10px;
	}
}
</style>
