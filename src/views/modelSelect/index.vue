<template>
	<div class="main">
		<a-row :gutter="16">
			<a-col :span="8">
				<a-card title="地图管理工具" :bordered="false">
					<p>一个用于管理地图数据的工具</p>
					<template #extra>
						<a-button type="link" @click="handleIn('./home')">进入</a-button>
					</template>
				</a-card>
			</a-col>
			<a-col :span="8">
				<a-card title="Electron Api" :bordered="false">
					<p>用于展示ElectronApi功能</p>
					<template #extra>
						<a-button type="link" @click="handleIn('./electronApi')">进入</a-button>
					</template>
				</a-card>
			</a-col>
			<a-col :span="8">
				<a-card title="Webmaster Tools" :bordered="false">
					<p>站长工具</p>
					<template #extra>
						<a-button type="link" @click="handleIn('/webmaster-tools')">进入</a-button>
					</template>
				</a-card>
			</a-col>
		</a-row>
	</div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();
const handleIn = (url) => {
	router.push(url);
};
</script>
<style lang="less" scoped>
.main {
	background-color: #ececec;
	padding: 20px;
	width: 100%;
	height: 100%;
}
</style>
