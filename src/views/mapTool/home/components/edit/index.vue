<template>
	<panel
		class="main"
		placement="center-center"
		width="200px"
		height="400px"
		:draggable="{ target: $parent.$el }"
		:resizable="false">
		<template #toolbar>
			<span class="close" @click="handleClose"></span>
		</template>
		<div>
			<a-button>开始编辑</a-button>
			<a-button>创建图斑</a-button>
			<a-button>删除图斑</a-button>
			<a-button>结束编辑</a-button>
		</div>
		<vue2ol-interaction-draw></vue2ol-interaction-draw>
	</panel>
</template>
<script setup>
import Panel from '@/components/panel';
import { useMapToolStore } from '@/store/mapTool';

const mapToolStore = useMapToolStore();
const map = inject('map').mapObject;

const editLayer = computed(() => {
	return mapToolStore.getLayerBySysId(mapToolStore.editLayerId);
});
console.log(editLayer);
</script>
<style lang="less" scoped>
.main :deep {
	z-index: 100;
	background: rgba(71, 71, 71, 0.8);
	width: auto;
	height: auto;
	.panel__header {
		cursor: all-scroll;
		word-break: keep-all;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		position: relative;
		top: 0;
		left: 0;
		min-height: 40px;
		line-height: 40px;
		border-bottom: 4px solid rgba(0, 0, 0, 0.4);
		color: #ddd;
		font-size: 14px;
		font-family: \5fae\8f6f\96c5\9ed1;
		padding: 0 31px 0 18px;
		text-align: left;
		user-select: none;
		background: none;

		.panel__toolbar {
			height: 100%;
			top: 0px;
			right: 0px;
		}
		.arrow {
			cursor: pointer;
			position: absolute;
			top: 50%;
			margin-top: -5.5px;
			right: 50px;
			width: 16px;
			height: 12px;
			line-height: 12px;
			background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAOCAYAAAA1+Nx+AAAAhElEQVQ4ja2U0QrAIAhFb2P/bftyR9sii0yrXRB8iHO0BwMzAwDhzYV/UnjMTFySemxWxTsABDFzFPaV0MfICXnayHVWNqGGEZ/vFw92JF14K1iVqPCeYFYyhGsCr8SEjwSWxAW3BJrEDfcIehI33CvQJCZ8RtBKXPBU58Q5kCdA9noA3DnLac7QowMEAAAAAElFTkSuQmCC)
				no-repeat;
			background-size: contain;
			transition: all 0.5s linear;
		}
		.closestatus {
			transform: rotate(-180deg);
			-ms-transform: rotate(-180deg);
			-moz-transform: rotate(-180deg);
			-webkit-transform: rotate(-180deg);
			-o-transform: rotate(-180deg);
		}

		.close {
			cursor: pointer;
			position: absolute;
			top: 50%;
			margin-top: -6.5px;
			right: 20px;
			width: 13px;
			height: 13px;
			line-height: 13px;
			background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA10lEQVQ4jY2TTQrCMBBGX2sUPaAgCrrpQlwInkJBdy5EQah/vVUv4aKuBJmSQrCTpN8u07zHJNMkZVnugDXwAFbAl3AMcAEmwF4EH2BokRewCEgELoCxXVcp8HQ2zIAb0OsAS64iWNoPIYkG58DG2Hbntjh1JNjjJB44E9bYQkgy8MFNa3SQqLAk/dvQSAraacGaAHvmvlLXai2BdttN1BGnETiPjdhE4MxZayOuxxiCmwvz/icCnyOwxDfitzymChgFYDdy9rsjqR/TQUzAMQK7nZxqBrY/6rpKQrpmG/wAAAAASUVORK5CYII=)
				no-repeat;
			background-size: contain;
		}
	}

	.panel__body {
		position: relative;
		padding: 5px;
		text-align: left;
		width: calc(100% - 10px);
		transition: all 0.5s linear;
	}
}
</style>
