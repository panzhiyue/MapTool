<template>
	<div id="app-base-screen">
		<div class="one-block-1">
			<span> 1. 屏幕信息 </span>
		</div>
		<div class="one-block-2">
			<a-space>
				<a-button @click="getScreen(0)">获取当前鼠标位置</a-button>
				<a-button @click="getScreen(1)">获取主屏幕</a-button>
				<a-button @click="getScreen(2)">获取所有屏幕</a-button>
				<a-button @click="clear()">清空</a-button>
			</a-space>
		</div>
		<div class="one-block-1">
			<span> 结果： </span>
		</div>
		<div class="one-block-2">
			<div v-for="item in data">
				<a-descriptions title="">
					<a-descriptions-item v-for="(info, index) in item" :key="index" :label="info.title">
						{{ info.desc }}
					</a-descriptions-item>
				</a-descriptions>
			</div>
		</div>
	</div>
</template>
<script>
const { screen } = require('@electron/remote');
export default {
	data() {
		return {
			data: [],
		};
	},
	mounted() {},
	methods: {
		clear() {
			this.data = [];
		},
		getScreen(args) {
			let data = [];
			let res = {};
			if (args == 0) {
				let res = screen.getCursorScreenPoint();
				data = [
					[
						{
							title: '横坐标',
							desc: res.x,
						},
						{
							title: '纵坐标',
							desc: res.y,
						},
					],
				];

				this.data = data;
				return;
			}
			if (args == 1) {
				res = screen.getPrimaryDisplay();

				let data = this.getDisplay(res);
				this.data = [data];
				console.log(this.data);
			}
			if (args == 2) {
				let resArr = screen.getAllDisplays();
				// 数组，只取一个吧
				this.data = resArr.map((item) => {
					return this.getDisplay(item);
				});
				console.log(resArr);
			}
		},
		getDisplay(res) {
			let data = [
				{
					title: 'id',
					desc: res.id,
				},
				{
					title: '分辨率',
					desc: res.bounds.width + ' x ' + res.bounds.height,
				},
				{
					title: '单色显示器',
					desc: res.monochrome ? '是' : '否',
				},
				{
					title: '色深',
					desc: res.colorDepth,
				},
				{
					title: '色域',
					desc: res.colorSpace,
				},
				{
					title: 'scaleFactor',
					desc: res.scaleFactor,
				},
				{
					title: '加速器',
					desc: res.accelerometerSupport,
				},
				{
					title: '触控',
					desc: res.touchSupport == 'unknown' ? '不支持' : '支持',
				},
			];
			return data;
		},
	},
};
</script>
<style lang="less" scoped>
#app-base-screen {
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
