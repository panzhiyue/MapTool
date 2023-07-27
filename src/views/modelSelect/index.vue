<!--假设分配法-->
<template>
	<div class="main">
		<div class="item" v-for="(item, index) in data">
			<div class="title">{{ item.title }}</div>
			<div class="children-container">
				<div class="children-item" v-for="(item2, index) in item.children" @click="openTool(item2)">
					{{ item2.title }}
				</div>
			</div>
		</div>
		<!-- <a-card title="地图管理工具" :bordered="false">
			<p>一个用于管理地图数据的工具</p>
			<template #extra>
				<a-button type="link" @click="handleIn('./home')">进入</a-button>
			</template>
		</a-card>

		<a-card title="Electron Api" :bordered="false">
			<p>用于展示ElectronApi功能</p>
			<template #extra>
				<a-button type="link" @click="handleIn('./electronApi')">进入</a-button>
			</template>
		</a-card>

		<a-card title="Webmaster Tools" :bordered="false">
			<p>站长工具</p>
			<template #extra>
				<a-button type="link" @click="handleIn('/webmaster-tools')">进入</a-button>
			</template>
		</a-card>

		<a-card title="API" :bordered="false">
			<p>集成API地址</p>
			<template #extra>
				<a-button type="link" @click="handleIn('./api')">进入</a-button>
			</template>
		</a-card> -->
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const handleIn = (url) => {
	router.push(url);
};

const data = ref([
	{
		title: '常用功能',
		children: [
			{
				title: '地图管理工具',
				describe: '一个用于管理地图数据的工具',
				url: './home',
			},
			{
				title: 'Electron Api',
				describe: '用于展示ElectronApi功能',
				url: './electronApi',
			},
			{
				title: '站长工具',
				describe: '站长工具',
				url: '/webmaster-tools',
			},
			{
				title: 'Api',
				describe: '集成API地址',
				url: './api',
			},
		],
	},
]);

const openTool = (params) => {};
</script>
<style lang="less" scoped>
.main {
	background-color: #fff;
	padding: 20px;
	width: 100%;
	height: 100%;

	.item {
		width: 100%;
		.title {
			font-size: 20px;
			font-weight: bold;
		}
		.children-container {
			display: flex;
			flex-wrap: wrap;
			align-content: flex-start;
			.children-item {
				width: calc(25% - 20px);
				max-width: 320px;
				height: 80px;
				border-radius: 10px;
				background-color: rgba(243, 249, 253);
				margin-right: 20px;
				margin-top: 20px;
				line-height: 80px;
				font-size: 20px;
				padding-left: 10px;
				font-weight: bold;
			}
		}
	}
}
</style>
