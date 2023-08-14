<!--计算基期-->
<template>
	<div class="container">
		<div class="header">
			<div class="btn-container">
				<a-checkbox v-model:checked="disruptOrder">打乱顺序</a-checkbox>
				<a-button class="ml-5" @click="handleClick1">百分数背小数</a-button>
				<a-button class="ml-5" @click="handleClick2">小数背百分数</a-button>
				<a-button class="ml-5" @click="handleShow">显示答案</a-button>
				<a-button class="ml-5" @click="handleHide">隐藏答案</a-button>
			</div>
		</div>
		<div class="content">
			<a-card v-for="(item, index) in list" class="item" :title="`已知${item.show}`">
				<p>{{ item.check ? item.hide : '...' }}</p>
				<template #extra>
					<a-checkbox v-model:checked="item.check">显示答案</a-checkbox>
				</template>
			</a-card>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { Ref, ref } from 'vue';

const disruptOrder = ref(true);
const list: Ref<any> = ref([]);

const originList = [
	{ fraction: '1/2', percentage: '50%' },
	{ fraction: '1/4', percentage: '25%' },
	{ fraction: '1/8', percentage: '12.5%' },
	{ fraction: '1/16', percentage: '6.25%' },
	{ fraction: '1/3', percentage: '33.3%' },
	{ fraction: '1/6', percentage: '16.7%' },
	{ fraction: '1/12', percentage: '8.3%' },
	{ fraction: '1/5', percentage: '20%' },
	{ fraction: '1/10', percentage: '10%' },
	{ fraction: '1/20', percentage: '5%' },
	{ fraction: '1/7', percentage: '14.3%' },
	{ fraction: '1/14', percentage: '7.1%' },
	{ fraction: '1/9', percentage: '11.1%' },
	{ fraction: '1/13', percentage: '7.7%' },
	{ fraction: '1/15', percentage: '6.7%' },
	{ fraction: '1/17', percentage: '5.9%' },
	{ fraction: '1/18', percentage: '5.6%' },
	{ fraction: '1/19', percentage: '5.3%' },
];

const shuffle = (arr) => {
	let length = arr.length,
		randomIndex,
		temp;
	while (length) {
		randomIndex = Math.floor(Math.random() * length--);
		temp = arr[randomIndex];
		arr[randomIndex] = arr[length];
		arr[length] = temp;
	}
	return arr;
};
const handleClick2 = () => {
	list.value = [];

	list.value = originList.map((item) => {
		return {
			show: `小数:${item.fraction}`,
			hide: `百分数:${item.percentage}`,
		};
	});
	if (disruptOrder.value) {
		list.value = shuffle(list.value);
	}
};

const handleClick1 = () => {
	list.value = [];
	list.value = originList.map((item) => {
		return {
			hide: `小数:${item.fraction}`,
			show: `百分数:${item.percentage}`,
		};
	});
	if (disruptOrder.value) {
		list.value = shuffle(list.value);
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
			width: 300px;
			height: 140px;
			margin-left: 12px;
			margin-top: 10px;
		}
	}
}
</style>
