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
					<a-checkbox v-model:checked="item.check">显示答案</a-checkbox>
				</template>
			</a-card>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { Ref, ref } from 'vue';
const integerDigit = ref(4);
const decimalDigit = ref(0);
const maxValue = ref(100);
const maxValue2 = ref(100);

const integerDigit2 = ref(2);
const decimalDigit2 = ref(2);

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
.container {
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
</style>
