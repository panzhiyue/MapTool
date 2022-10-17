<template>
	<div class="style-selector w-full h-full p-3" v-if="layerInfo">
		<div class="left">
			<list-box class="style-save"></list-box>
		</div>
		<div class="right">
			<group-box class="style-current" title="当前符号">
				<div class="style-box">
					<style-icon :info="layerInfo.info"></style-icon>
				</div>
				<a-space>填充色：<color-picker></color-picker></a-space>
				<a-space>边框色：<a-button>3333</a-button></a-space>
				<a-space
					>边框宽度：<a-input-number v-model:value="styleInfo.lineWidth"></a-input-number
				></a-space>
				<a-space>大小：<a-input-number v-model:value="styleInfo.size"></a-input-number></a-space>
			</group-box>
		</div>
	</div>
</template>
<script lang="ts" setup>
import ListBox from '@/components/list-box';
import { useRoute } from 'vue-router';
import { getByWhere } from '@/api/mapLayerInfo';
import StyleIcon from '@/components/style-icon';
import ColorPicker from '@/components/color-picker';

const route = useRoute();
const id = route.query.id as string;

const layerInfo = ref(null);
const colors = ref('#ff0000');

const styleInfo = computed(() => {
	return layerInfo.value.info.styles[0];
});

// const layerInfo = (await getByWhere({ id: id })).data[0];
onMounted(async () => {
	layerInfo.value = (await getByWhere({ id: id })).data[0];
	layerInfo.value.info = JSON.parse(layerInfo.value.info);
	console.log(layerInfo.value.info);
});
</script>
<style lang="less" scoped>
@import '@/styles/index.less';
.style-selector {
	background-color: @bgColor;
	.left {
		width: 280px;
		height: 100%;
		float: left;

		.list-box {
			width: 100%;
			height: 100%;
		}
	}
	.right {
		width: 200px;
		height: 100%;
		float: left;
		margin-left: 10px;

		.group-box {
			width: 100%;
			height: 100%;

			.style-box {
				width: 100%;
				height: 80px;
				position: relative;
				text-align: center;
				vertical-align: middle;

				.style-icon {
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
				}
			}
		}
	}
}
</style>
