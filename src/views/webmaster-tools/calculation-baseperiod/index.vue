<!--计算基期-->
<template>
	<div class="container">
		<div class="header">
			<div class="config">
				<div class="item">现期整数位：<a-input v-model:value="integerDigit"></a-input></div>
				<div class="item">现期小数位：<a-input v-model:value="decimalDigit"></a-input></div>
				<div class="item">现期最大值：<a-input v-model:value="maxValue"></a-input></div>
				<div class="item">增长率整数位：<a-input v-model:value="integerDigit2"></a-input></div>
				<div class="item">增长率小数位：<a-input v-model:value="decimalDigit2"></a-input></div>
				<div class="item">增长率最大值：<a-input v-model:value="maxValue2"></a-input></div>
				<div class="item">生成数量：<a-input v-model:value="count"></a-input></div>
				<timer class="item"></timer>
			</div>

			<div class="btn-container">
				<a-button @click="handleClick">生成</a-button>
				<a-button class="ml-5" @click="handleShow">显示答案</a-button>
				<a-button class="ml-5" @click="handleHide">隐藏答案</a-button>
			</div>
		</div>
		<div class="content">
			<a-card
				v-for="(item, index) in list"
				class="item"
				:title="`已知现期${item.current},增长率${item.growthRate}%`">
				<p>
					基期：{{ item.check ? item.basePeriod : '...' }} 增长量：{{
						item.check ? item.growth : '...'
					}}
				</p>
				<template #extra>
					<a-checkbox v-model:checked="item.check">答案</a-checkbox>
					<a-checkbox v-model:checked="item.showCanvas">画布</a-checkbox>
				</template>
				<!-- <div v-if="item.showCanvas" class="w-full h-full" style="position: relative">
					<graffiti-board></graffiti-board>
				</div> -->
				<a-modal
					v-model:visible="item.showCanvas"
					:footer="null"
					width="100%"
					height="100%"
					:bodyStyle="{ width: '100%', height: '100%' }"
					:dialogStyle="{ width: '100%', height: '100%' }"
					style="width: 100%; height: 100%"
					wrap-class-name="graffiti-board-modal">
					<div class="w-full h-full" style="min-height: 400px">
						<graffiti-board></graffiti-board>
					</div>
				</a-modal>
			</a-card>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { Ref, ref } from 'vue';
import timer from '@/components/timer/index.vue';
import GraffitiBoard from '@/components/graffiti-board/index.vue';
const integerDigit = ref(3);
const decimalDigit = ref(0);
const maxValue = ref(999);
const maxValue2 = ref(20);

const integerDigit2 = ref(2);
const decimalDigit2 = ref(1);

const count = ref(10);

const list: Ref<any> = ref([]);
const handleClick = () => {
	list.value = [];
	for (let i = 0; i < 10000; i++) {
		let item: any = {
			current: (Math.random() * Math.pow(10, integerDigit.value)).toFixed(decimalDigit.value),
			growthRate: (Math.random() * Math.pow(10, integerDigit2.value)).toFixed(decimalDigit2.value),
		};
		if (item.current <= maxValue.value && item.growthRate <= maxValue2.value) {
			item.basePeriod = (item.current / (1 + item.growthRate / 100)).toFixed(3);
			item.growth = (item.current - item.basePeriod).toFixed(3);
			item.check = false;
			list.value.push(item);
		}
		if (list.value.length === count.value) {
			return;
		}
	}
};

const handleShow = () => {
	list.value.forEach((item) => {
		item.check = true;
	});
};

const handleHide = () => {
	list.value.forEach((item) => {
		item.check = false;
	});
};
</script>
<style lang="less" scoped>
.container :deep {
	width: 100%;
	height: 100%;
	overflow: auto;

	.config {
		display: flex;
		flex-wrap: wrap;
		.ant-input {
			width: 200px;
		}

		.item {
			margin-left: 10px;
			margin-top: 10px;
		}
	}

	.btn-container {
		text-align: right;
		padding-right: 100px;
		margin-top: 10px;
	}
	.content {
		width: 100%;

		display: flex;
		flex-wrap: wrap;
		align-content: flex-start;
		overflow: auto;

		.ant-card {
			width: 400px;
			height: 140px;
			margin-left: 12px;
			margin-top: 10px;
		}
	}
}

.full-modal {
	margin-top: 10px;
}
</style>
<style lang="less">
.graffiti-board-modal {
	margin: 0px;
	padding: 0px;
	.ant-modal {
		margin: 0px;
		top: 0px;
		left: 0;
		right: 0;
		padding: 0px;
		height: 100%;
		background-color: rgba(f, 0, 0, 0);
		max-width: 100%;

		.ant-modal-content {
			margin: 0px;
			top: 0px;
			padding: 0px;
			height: 100%;
			background-color: rgba(0, 0, 0, 0);

			.ant-modal-body {
				padding: 0px;
				margin: 0px;
				padding: 10px;
			}
		}
	}

	.ant-modal-close-x {
		color: #fff;
	}
}
</style>
