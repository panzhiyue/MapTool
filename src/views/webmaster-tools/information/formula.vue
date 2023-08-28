<!--资料-公式-->
<template>
	<div class="container">
		<div class="header">
			<div class="btn-container">
				<a-checkbox v-model:checked="disruptOrder">打乱顺序</a-checkbox>
				<a-button class="ml-5" @click="handleClick">重新排列</a-button>
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

const originList = [{ name: '1/2', formula: '50%' }];

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

const handleClick = () => {
	list.value = [];
	list.value = originList.map((item) => {
		return {
			show: `名称:${item.name}`,
			hide: `公式:${item.formula}`,
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
