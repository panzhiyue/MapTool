<template>
	<div class="color-selector">
		<div class="w-5 h-5" :style="{ 'background-color': value }" @click="handleClick"></div>
		<div class="picker-box" v-show="visible" style="position: absolute; left: -100px; top: 30px">
			<Sketch
				v-model="colors"
				v-model:rgb="colorObj.rgb"
				v-model:rgba="colorObj.rgba"
				v-model:hsl="colorObj.hsl"
				v-model:hsla="colorObj.hsla"
				v-model:hex="colorObj.hex"
				v-model:hex8="colorObj.hex8"
				v-model:hsv="colorObj.hsv"
				v-model:hsva="colorObj.hsva"></Sketch>
			<div class="btn-box">
				<a-button @click="handleSure">确定</a-button>
				<a-button @click="handleCancel">取消</a-button>
			</div>
		</div>
	</div>
</template>
<script lang="ts" setup>
const props = defineProps({
	value: {
		type: String,
		default: '',
	},
});

const emits = defineEmits(['update:value']);
const color = useVModel(props, 'value', emits);

const colors = ref(props.value);
const colorObj = reactive({
	hex: '',
	hex8: props.value,
	rgb: {},
	rgba: {},
	hsl: {},
	hsla: {},
	hsv: {},
	hsva: {},
});

const visible = ref(false);
const handleClick = () => {
	visible.value = !visible.value;
};
const handleCancel = () => {
	visible.value = false;
};
const handleSure = () => {
	color.value = colorObj.hex8;
	visible.value = false;
};
</script>
<style lang="less" scoped>
.color-selector {
	display: inline-block;
	position: relative;
	z-index: 1000;

	.picker-box {
		box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 8px 16px rgb(0 0 0 / 15%);

		.vc-sketch {
			box-shadow: none;
			border-radius: 4px 4px 0px 0px;
		}

		.btn-box {
			background-color: #fff;
			display: flex;
			justify-content: flex-end;
			background: #fff;
			border-radius: 4px;
			box-shadow: none;

			z-index: 3000;

			.ant-btn {
				display: flex;
				margin-right: 5px;
				margin-top: 7px;
				margin-bottom: 7px;
				font-size: 12px;
				height: 26px;
				line-height: 26px;
				padding: 0px 7px;
			}
		}
	}
}
</style>
