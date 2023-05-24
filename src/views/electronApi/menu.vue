<template>
	<a-layout id="app-menu">
		<a-layout-sider theme="light" class="layout-sider">
			<a-menu
				theme="light"
				mode="inline"
				:default-selected-keys="[default_key]"
				:selected-keys="[current]"
				@click="menuClick">
				<a-menu-item v-for="(menuInfo, subIndex) in menu" :key="subIndex">
					<router-link :to="{ name: menuInfo.pageName, params: menuInfo.params }">
						<span>{{ menuInfo.title }}</span>
					</router-link>
				</a-menu-item>
			</a-menu>
		</a-layout-sider>
		<a-layout>
			<a-layout-content>
				<router-view />
			</a-layout-content>
		</a-layout>
	</a-layout>
</template>
<script>
// import subMenu from '@/config/subMenu';
const subMenu = {
	framework: {
		menu_100: {
			icon: 'profile',
			title: '通信',
			pageName: 'ElectronApiFrameworkSocketIpc',
			params: {},
		},
		// menu_101: {
		// 	icon: 'profile',
		// 	title: 'http服务',
		// 	pageName: 'ElectronApiFrameworkSocketHttpServer',
		// 	params: {},
		// },
		// menu_102: {
		// 	icon: 'profile',
		// 	title: 'socket服务',
		// 	pageName: 'ElectronApiFrameworkSocketSocketServer',
		// 	params: {},
		// },
		// menu_103: {
		// 	icon: 'profile',
		// 	title: 'json数据库',
		// 	pageName: 'ElectronApiFrameworkDBIndex',
		// 	params: {},
		// },
		// menu_104: {
		// 	icon: 'profile',
		// 	title: 'sqlite数据库',
		// 	pageName: 'ElectronApiFrameworkSqliteDBIndex',
		// 	params: {},
		// },
		// menu_105: {
		// 	icon: 'profile',
		// 	title: '任务',
		// 	pageName: 'ElectronApiFrameworkJobsIndex',
		// 	params: {},
		// },
		menu_106: {
			icon: 'profile',
			title: '自动更新',
			pageName: 'ElectronApiFrameworkUpdater',
			params: {},
		},
		menu_107: {
			icon: 'profile',
			title: '软件调用',
			pageName: 'ElectronApiFrameworkSoftware',
			params: {},
		},
		// menu_108: {
		// 	icon: 'profile',
		// 	title: 'java',
		// 	pageName: 'ElectronApiFrameworkJavaIndex',
		// 	params: {},
		// },
		// menu_109: {
		// 	icon: 'profile',
		// 	title: '测试',
		// 	pageName: 'ElectronApiFrameworkTestApiIndex',
		// 	params: {},
		// },
	},
	os: {
		menu_100: {
			icon: 'profile',
			title: '文件',
			pageName: 'ElectronApiOsFile',
			params: {},
		},
		menu_101: {
			icon: 'profile',
			title: '视图',
			pageName: 'ElectronApiOsWindowview',
			params: {},
		},
		menu_102: {
			icon: 'profile',
			title: '窗口',
			pageName: 'ElectronApiOsWindow',
			params: {},
		},
		menu_103: {
			icon: 'profile',
			title: '桌面通知',
			pageName: 'ElectronApiOsNotification',
			params: {},
		},
		menu_104: {
			icon: 'profile',
			title: '电源监控',
			pageName: 'ElectronApiOsPowerMonitor',
			params: {},
		},
		menu_105: {
			icon: 'profile',
			title: '屏幕信息',
			pageName: 'ElectronApiOsScreen',
			params: {},
		},
	},
	hardware: {
		menu_100: {
			icon: 'profile',
			title: '打印机',
			pageName: 'ElectronApiHardwarePrinter',
			params: {},
		},
	},
	effect: {
		menu_100: {
			icon: 'profile',
			title: '视频播放器',
			pageName: 'ElectronApiEffectVideo',
			params: {},
		},
	},
};

export default {
	props: {
		id: {
			type: String,
			default: '',
		},
	},
	data() {
		return {
			menu: {},
			default_key: 'menu_100',
			current: '',
			keys: [],
		};
	},
	watch: {
		id: function () {
			this.menuHandle();
		},
	},
	created() {},
	mounted() {
		this.menuHandle();
	},
	methods: {
		menuHandle() {
			this.current = this.default_key;
			this.menu = subMenu[this.id];
			// switch (this.id) {
			//   case 'base' :
			//     this.menu = subMenu.base;
			//     break;
			//   case 'other' :
			//     this.menu = subMenu.other;
			//     break;
			// }
			console.log(this.menu);
			const linkInfo = this.menu[this.current];
			this.$router.push({ name: linkInfo.pageName, params: linkInfo.params });
		},
		menuClick(e) {
			this.current = e.key;
		},
	},
};
</script>
<style lang="less" scoped>
#app-menu {
	height: 100%;
	text-align: center;
	.layout-sider {
		border-top: 1px solid #e8e8e8;
		border-right: 1px solid #e8e8e8;
		background-color: #fafafa;
		overflow: auto;
	}
}
</style>
