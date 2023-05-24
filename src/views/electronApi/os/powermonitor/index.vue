<template>
	<div id="app-base-powermonitor">
		<div class="one-block-1">
			<span> 1. 监控电源状态 </span>
		</div>
		<div class="one-block-2">
			<a-space>
				<p>* 当前状态：{{ currentStatus }}</p>
			</a-space>
			<p>* 拔掉电源，使用电池供电</p>
			<p>* 接入电源</p>
			<p>* 锁屏</p>
			<p>* 解锁</p>
		</div>
	</div>
</template>
<script>
const { powerMonitor } = require('@electron/remote');

export default {
	data() {
		return {
			currentStatus: '无',
		};
	},
	mounted() {
		this.init();
	},
	methods: {
		init() {
			powerMonitor.on('on-ac', (e) => {
				let data = {
					type: 'on-ac',
					msg: '接入了电源',
				};
				alert(JSON.stringify(data));
			});

			powerMonitor.on('on-battery', (e) => {
				let data = {
					type: 'on-battery',
					msg: '使用电池中',
				};
				alert(JSON.stringify(data));
			});

			powerMonitor.on('lock-screen', (e) => {
				let data = {
					type: 'lock-screen',
					msg: '锁屏了',
				};
				alert(JSON.stringify(data));
			});

			powerMonitor.on('unlock-screen', (e) => {
				let data = {
					type: 'unlock-screen',
					msg: '解锁了',
				};
				alert(JSON.stringify(data));
			});
		},
	},
};
</script>
<style lang="less" scoped>
#app-base-powermonitor {
	padding: 0px 10px;
	text-align: left;
	width: 100%;
	.one-block-1 {
		font-size: 16px;
		padding-top: 10px;
	}
	.one-block-2 {
		padding-top: 10px;
	}
}
</style>
