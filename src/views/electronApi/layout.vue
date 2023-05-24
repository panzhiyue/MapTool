<template>
	<a-layout id="app-layout-sider">
		<a-layout-sider v-model="collapsed" theme="light" class="layout-sider">
			<div class="logo">
				<img class="pic-logo" src="~@/assets/logo.png" />
			</div>
			<a-menu class="menu-item" theme="light" mode="inline" :default-selected-keys="[default_key]">
				<a-menu-item :key="'1'">
					<template #icon>
						<DesktopOutlined />
					</template>
					<router-link :to="{ name: 'ElectronApiFramework', params: {} }"> 框架 </router-link>
				</a-menu-item>
				<a-menu-item :key="'2'">
					<template #icon>
						<DesktopOutlined />
					</template>
					<router-link :to="{ name: 'ElectronApiOs', params: {} }"> 系统 </router-link>
				</a-menu-item>
				<a-menu-item :key="'3'">
					<template #icon>
						<DesktopOutlined />
					</template>
					<router-link :to="{ name: 'ElectronApiHardware', params: {} }"> 硬件 </router-link>
				</a-menu-item>
				<a-menu-item :key="'4'">
					<template #icon>
						<DesktopOutlined />
					</template>
					<router-link :to="{ name: 'ElectronApiEffect', params: {} }"> 特效 </router-link>
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
import { DesktopOutlined } from '@ant-design/icons-vue';
const collapsed = ref(true);
const default_key = ref('1');
// const current = ref('');
// const router = useRouter();
// const menu = reactive({
// 	menu_1: {
// 		icon: 'home',
// 		title: '框架',
// 		pageName: 'Framework',
// 		params: {},
// 	},
// 	menu_2: {
// 		icon: 'DesktopOutlined',
// 		title: '系统',
// 		pageName: 'Os',
// 		params: {},
// 	},
// 	menu_3: {
// 		icon: 'control',
// 		title: '硬件',
// 		pageName: 'Hardware',
// 		params: {},
// 	},
// 	menu_4: {
// 		icon: 'bulb',
// 		title: '特效',
// 		pageName: 'Effect',
// 		params: {},
// 	},
// });
// onMounted(() => {
// 	menuHandle();
// });

// const menuHandle = (e?) => {
// 	current.value = e ? e.key : default_key.value;
// 	const linkInfo = menu[current.value];
// 	console.log('[home] load page:', linkInfo.pageName);
// 	router.push({ name: linkInfo.pageName, params: linkInfo.params });
// };
</script>
<style lang="less" scoped>
// 嵌套
#app-layout-sider {
	height: 100%;
	.logo {
		border-bottom: 1px solid #e8e8e8;
	}
	.pic-logo {
		height: 32px;
		//background: rgba(139, 137, 137, 0.2);
		margin: 10px;
	}
	.layout-sider {
		border-top: 1px solid #e8e8e8;
		border-right: 1px solid #e8e8e8;
	}
	.menu-item {
		.ant-menu-item {
			background-color: #fff;
			margin-top: 0px;
			margin-bottom: 0px;
			padding: 0 0px !important;
		}
	}
	.layout-content {
		//background-color: #fff;
	}
}
</style>
