<template>
	<div class="computational-geometry w-full h-full flex flex-col">
		<div class="attribute-box flex p-5">
			<span>属性：</span>
			<a-select v-model:value="attributeSelect" :options="attributeOptions"></a-select>
		</div>
		<div class="content">
			<x v-if="attributeSelect == 'X'"></x>
			<y v-if="attributeSelect == 'Y'"></y>
			<inside-x v-if="attributeSelect == 'InsideX'"></inside-x>
			<inside-y v-if="attributeSelect == 'InsideY'"></inside-y>
			<calc-area v-if="attributeSelect == 'Area'"></calc-area>
			<length v-if="attributeSelect == 'Length'"></length>
		</div>
	</div>
</template>
<script lang="ts" setup>
import X from './components/x.vue';
import Y from './components/y.vue';
import CalcArea from './components/calc-area.vue';
import Length from './components/length.vue';
import InsideX from './components/inside-x.vue';
import InsideY from './components/inside-y.vue';

const attributeOptions = ref([
	{
		label: '质心的X坐标',
		value: 'X',
	},
	{
		label: '质心的Y坐标',
		value: 'Y',
	},
	{
		label: '内部点的X坐标',
		value: 'InsideX',
	},
	{
		label: '内部点的Y坐标',
		value: 'InsideY',
	},
	{
		label: '面积',
		value: 'Area',
	},
	{
		label: '长度',
		value: 'Length',
	},
]);

const attributeSelect = ref(attributeOptions.value[0].value);
</script>
<style lang="less" scoped>
@import '@/styles/index.less';
.computational-geometry {
	background-color: @bgColor;

	.attribute-box {
		span {
			line-height: 30px;
		}
		.ant-select {
			flex: 1;
		}
	}

	.content {
		flex: 1;
	}
}
</style>
