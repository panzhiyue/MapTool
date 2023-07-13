<template>
	<a-layout class="main">
		<a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible width="30px">
		</a-layout-sider>
		<a-layout>
			<!-- <a-layout-header style="background: #fff; padding: 0">
				<menu-unfold-outlined
					v-if="collapsed"
					class="trigger"
					@click="() => (collapsed = !collapsed)" />
				<menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
			</a-layout-header> -->
			<a-layout-content
				:style="{ margin: '0px 0px', padding: '0px', background: '#fff', minHeight: '280px' }">
				<router-view></router-view>
			</a-layout-content>
		</a-layout>
	</a-layout>
</template>
<script setup>
const collapsed = ref(false);
</script>
<style lang="less" scoped>
.main {
	width: 100%;
	height: 100%;
	overflow: hidden;

	.sider {
		width: 30px;
	}
}
</style>
