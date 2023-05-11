<template>
	<tool-container>
		<template #content>
			<div class="style-selector w-full h-full p-3" v-if="layerInfo">
				<div class="left">
					<list-box class="style-save"></list-box>
				</div>
				<div class="right">
					<group-box class="style-current" title="当前符号">
						<div class="style-box">
							<style-icon :info="layerInfo.info"></style-icon>
						</div>
						<a-space v-if="styleInfo.type == StyleType.POINT || styleInfo.type == StyleType.POLYGON"
							>填充色：<color-picker
								v-model:value="styleInfo.fillColor"
								style="z-index: 200"></color-picker
						></a-space>
						<br />
						<a-space
							>边框色：<color-picker
								v-model:value="styleInfo.lineColor"
								style="z-index: 199"></color-picker
						></a-space>
						<a-space
							>边框宽度：<a-input-number v-model:value="styleInfo.lineWidth"></a-input-number
						></a-space>
						<a-space v-if="styleInfo.type == StyleType.POINT"
							>大小：<a-input-number v-model:value="styleInfo.size"></a-input-number
						></a-space>
					</group-box>
				</div>
			</div>
		</template>
		<template #footer>
			<step-footer
				pre-most-text=""
				pre-text=""
				next-text=""
				next-most-text=""
				@on-cancel="handleCancel"
				@on-ok="handleOk">
			</step-footer>
		</template>
	</tool-container>
</template>
<script lang="ts" setup>
import ListBox from '@/components/list-box';
import { useRoute } from 'vue-router';
import { getByWhere } from '@/api/mapLayerInfo';
import StyleIcon from '@/components/style-icon';
import ColorPicker from '@/components/color-picker';
import { useWindow } from '@/hooks/electron/useWindow';
import * as TableApi from '@/api/table';
import { useMainWindow } from '@/hooks/electron/useMainWindow';
import StyleType from '@/enum/StyleType';
import ToolContainer from '@/components/tool-container';

const route = useRoute();
const id = route.query.id as string;

const layerInfo = ref(null);
// const color = ref('#ff0000');

// const styleInfo = computed(() => {
// 	return layerInfo.value.info.styles[0];
// });

let styleInfo = ref(null);

onMounted(async () => {
	layerInfo.value = (await getByWhere({ id: id })).data[0];
	layerInfo.value.info = JSON.parse(layerInfo.value.info);
	styleInfo.value = layerInfo.value.info.styles[0];
});
const { close } = useWindow();
const { refreshMapLayerInfos } = useMainWindow();
const handleCancel = () => {
	close();
};

const handleOk = () => {
	const data = Object.assign({}, layerInfo.value);

	data.info.styles[0] = styleInfo.value;
	data.info = JSON.stringify(data.info);
	// console.log(layerInfo.value);
	TableApi.updateByWhere('MapLayerInfo', data, { id: data.id }).then((result) => {
		refreshMapLayerInfos();
		close();
	});
};
</script>
<style lang="less" scoped>
@import '@/styles/index.less';
.style-selector {
	background-color: @bgColor;
	.left {
		width: 280px;
		height: calc(100% - 40px);
		float: left;

		.list-box {
			width: 100%;
			height: 100%;
		}
	}
	.right {
		width: 200px;
		height: calc(100% - 40px);
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

/deep/.picker-box {
	left: -300px !important;
	top: -50px !important;
}
</style>
