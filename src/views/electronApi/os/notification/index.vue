<template>
	<div id="app-base-notification">
		<div class="one-block-1">
			<span> 1. 弹出桌面通知 </span>
		</div>
		<div class="one-block-2">
			<a-space>
				<a-button @click="sendNotification(0)">默认</a-button>
				<a-button @click="sendNotification(1)">发出提示音</a-button>
				<a-button @click="sendNotification(2)">点击通知触发事件</a-button>
				<a-button @click="sendNotification(3)">关闭通知触发事件</a-button>
			</a-space>
		</div>
	</div>
</template>
<script>
const { Notification } = require('@electron/remote');

export default {
	data() {
		return {
			views: [
				{
					type: 'main',
					title: '通知标题',
					subtitle: '副标题', // macOS系统专有属性
					body: '这是通知内容-默认',
					silent: true,
				},
				{
					type: 'main',
					title: '提示音',
					subtitle: '副标题-提示音',
					body: '这是通知内容-提示音',
					silent: false,
				},
				{
					type: 'main',
					title: '点击通知事件',
					subtitle: '副标题-点击通知事件',
					body: '这是通知内容-点击通知事件',
					clickEvent: true,
				},
				{
					type: 'main',
					title: '关闭通知事件',
					subtitle: '副标题-关闭通知事件',
					body: '这是通知内容-点击通知事件',
					closeEvent: true,
				},
			],
			myNotification: null,
		};
	},
	mounted() {
		this.init();
	},
	methods: {
		init() {
			// // 避免重复监听，或者将 on 功能写到一个统一的地方，只加载一次
			// this.$ipc.removeAllListeners(ipcApiRoute.sendNotification);
			// this.$ipc.on(ipcApiRoute.sendNotification, (event, result) => {
			//   if (Object.prototype.toString.call(result) == '[object Object]') {
			//     this.$message.info(result.msg);
			//   }
			// })
		},
		sendNotification(index) {
			let args = this.views[index];
			const { title, subtitle, body, silent } = args;

			if (!Notification.isSupported()) {
				return '当前系统不支持通知';
			}

			let options = {};
			if (!!title) {
				options.title = title;
			}
			if (!!subtitle) {
				options.subtitle = subtitle;
			}
			if (!!body) {
				options.body = body;
			}
			if (!!silent) {
				options.silent = silent;
			}

			this.myNotification = new Notification(options);

			// if (options.clickEvent) {
			this.myNotification.on('click', (e) => {
				let data = {
					type: 'click',
					msg: '您点击了通知消息',
				};
				alert('您点击了通知消息');
				// event.reply(`${channel}`, data);
			});
			// }

			// if (options.closeEvent) {
			this.myNotification.on('close', (e) => {
				let data = {
					type: 'close',
					msg: '您关闭了通知消息',
				};
				alert('您关闭了通知消息');
				// event.reply(`${channel}`, data);
			});
			// }

			this.myNotification.show();
		},
	},
};
</script>
<style lang="less" scoped>
#app-base-notification {
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
