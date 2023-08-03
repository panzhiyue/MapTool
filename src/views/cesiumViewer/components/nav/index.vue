<template>
	<a-tabs class="nav" v-model:activeKey="activeKey">
		<a-tab-pane key="1" tab="漫游"><Roam></Roam></a-tab-pane>
		<a-tab-pane key="2" tab="视图"><View></View></a-tab-pane>
		<a-tab-pane key="3" tab="影像">Content of Tab Pane 3</a-tab-pane>
		<a-tab-pane key="4" tab="瓦片">Content of Tab Pane 3</a-tab-pane>
		<a-tab-pane key="5" tab="地形">Content of Tab Pane 3</a-tab-pane>
		<a-tab-pane key="6" tab="分析">Content of Tab Pane 3</a-tab-pane>
		<a-tab-pane key="7" tab="效果">Content of Tab Pane 3</a-tab-pane>
		<a-tab-pane key="8" tab="标绘">Content of Tab Pane 3</a-tab-pane>
		<a-tab-pane key="9" tab="其他">Content of Tab Pane 3</a-tab-pane>
	</a-tabs>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import View from './components/view/index.vue';
import Roam from './components/roam/index.vue';
const activeKey = ref('1');
</script>
<style lang="less" scoped>
.nav :deep {
	z-index: 9999;
	position: relative;
	font-size: 12px;
	line-height: 1.5;
	color: white;
	width: 100%;
	background: #6b6b6b;

	.ant-tabs-tab {
	}
	.ant-tabs-nav {
		margin: 0px;
	}
	.ant-tabs-nav-list {
		background: #474747;
		height: 41px;
		min-width: 656px;
		width: 100%;
		margin: 0px;
		padding-left: 20px;
	}

	.ant-tabs-content-holder {
		height: 96px;
	}
}
</style>
