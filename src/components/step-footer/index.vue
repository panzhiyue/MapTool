<template>
	<div class="step-footer">
		<a-button
			v-if="preMostText"
			class="pre-most"
			@click="handlePreMost"
			:disabled="preMostDisabled"
			>{{ preMostText }}</a-button
		>
		<a-button v-if="preText" class="pre" @click="handlePre" :disabled="preDisabled">{{
			preText
		}}</a-button>
		<a-button v-if="nextText" class="next" @click="handleNext" :disabled="nextMostDisabled">{{
			nextText
		}}</a-button>
		<a-button
			v-if="nextMostText"
			class="right-most"
			@click="handleNextMost"
			:disabled="nextDisabled"
			>{{ nextMostText }}</a-button
		>
		<a-button v-if="okText" class="ok" @click="handleOk" :disabled="okDisabled">{{
			okText
		}}</a-button>
		<a-button v-if="cancelText" class="cancel" @click="handleCancel" :disabled="cancelDisabled">{{
			cancelText
		}}</a-button>
	</div>
</template>
<script lang="ts" setup>
const props = defineProps({
	preMostText: {
		type: String,
		default: () => '<<',
	},
	preText: {
		type: String,
		default: () => '上一步',
	},
	nextText: {
		type: String,
		default: () => '下一步',
	},
	nextMostText: {
		type: String,
		default: () => '>>',
	},
	cancelText: {
		type: String,
		default: () => '取消',
	},
	okText: {
		type: String,
		default: () => '确定',
	},
	preMostDisabled: {
		type: Boolean,
		default: false,
	},
	preDisabled: {
		type: Boolean,
		default: false,
	},
	nextMostDisabled: {
		type: Boolean,
		default: false,
	},
	nextDisabled: {
		type: Boolean,
		default: false,
	},
	cancelDisabled: {
		type: Boolean,
		default: false,
	},
	okDisabled: {
		type: Boolean,
		default: false,
	},
});

const emits = defineEmits([
	'on-pre-most',
	'on-pre',
	'on-next',
	'on-next-most',
	'on-cancel',
	'on-ok',
]);

const handlePreMost = () => {
	emits('on-pre-most');
};

const handlePre = () => {
	emits('on-pre');
};

const handleNext = () => {
	emits('on-next');
};

const handleNextMost = () => {
	emits('on-next-most');
};

const handleCancel = () => {
	emits('on-cancel');
};

const handleOk = () => {
	emits('on-ok');
};
</script>
<style lang="less" scoped>
.step-footer {
	// position: absolute;
	width: 100%;
	height: 40px;
	line-height: 40px;
	background-color: rgba(240, 240, 240, 1);
	// bottom: 0px;
	display: flex;
	justify-content: flex-end;
	z-index: 1000;

	.ant-btn {
		display: flex;
		margin-right: 5px;
		margin-top: 7px;
		font-size: 12px;
		height: 26px;
		line-height: 26px;
		padding: 0px 7px;
	}
}
</style>
