<template>
	<drag v-if="visible" class="panel" v-bind="dragOptions" :style="wrapperStyle">
		<div v-if="title || $slots.title || $slots.toolbar" ref="header" class="panel__header">
			<div class="panel__title">
				<slot name="title">{{ title }}</slot>
			</div>
			<div v-if="$slots.toolbar" :class="toolbarClass">
				<slot name="toolbar"></slot>
			</div>
			<div v-if="closable" @click="handleClose" class="panel__close">×</div>
		</div>
		<!-- <resize v-show="showBody" v-bind="resizeOptions" :style="panelSize"> -->
		<div v-show="showBody" :style="panelSize">
			<div class="panel__body">
				<slot></slot>
			</div>
			<div v-if="$slots.footer" ref="footer" :class="footerClass">
				<slot name="footer"></slot>
			</div>
			<slot name="append"></slot>
		</div>
		<!-- </resize> -->
	</drag>
</template>
<script>
import Resize from '../resize';
import Drag from '../drag';

/**
 * 面板组件
 * @module $ui/map/panel
 */
export default {
	name: 'Panel',
	components: {
		Resize,
		Drag,
	},

	props: {
		/**
		 * 宽度
		 */
		width: {
			type: String,
		},
		/**
		 * 高度
		 */
		height: {
			type: String,
		},
		/**
		 * 拖拽配置，参考Drag组件
		 */
		draggable: {
			type: [Boolean, Object],
		},
		/**
		 * resize配置,参考Resize组件
		 */
		resizable: {
			type: [Boolean, Object],
		},
		/**
		 * 标题文本，可以用插槽定义
		 */
		title: {
			type: String,
		},
		/**
		 * 是否显示关闭按钮,visible需要加sync才有效
		 */
		closable: {
			type: Boolean,
		},
		/**
		 * 是否可见
		 */
		visible: {
			type: Boolean,
			default: true,
		},
		/**
		 * 底部对齐方式
		 * @typeName 'left'|'right'|'center'
		 */
		footerAlign: {
			type: String,
			validator(val) {
				return ['left', 'right', 'center'].includes(val);
			},
		},
		/**
		 * 是否显示内容
		 */
		showBody: {
			type: Boolean,
			default: true,
		},
	},
	data() {
		return {
			footerHeight: 0,
			mapWarp: null,
		};
	},
	computed: {
		dragOptions() {
			return {
				disabled: !this.draggable,
				handle: () => {
					return this.$refs.header || this.$el;
				},
				target: this.mapWarp,
				...this.draggable,
			};
		},
		resizeOptions() {
			return {
				disabled: !this.resizable,
				minWidth: parseInt(this.width || 0),
				minHeight: parseInt(this.height || 0),
				...this.resizable,
			};
		},
		panelSize() {
			return this.resizable
				? {
						minWidth: this.width,
						minHeight: this.height,
						paddingBottom: `${this.footerHeight}px`,
				  }
				: {
						width: this.width,
						height: this.height,
						paddingBottom: `${this.footerHeight}px`,
				  };
		},
		toolbarClass() {
			return {
				panel__toolbar: true,
				'is-closable': this.closable,
			};
		},
		wrapperStyle() {
			return {
				...this.styles,
				width: this.width === '100%' ? this.width : null,
				height: this.height === '100%' ? this.height : null,
			};
		},
		footerClass() {
			return {
				panel__footer: true,
				[`is-${this.footerAlign}`]: !!this.footerAlign,
			};
		},
	},
	methods: {
		setFooterHeight() {
			if (this.$refs.footer) {
				this.footerHeight = this.$refs.footer.getBoundingClientRect().height;
			}
		},
		handleClose() {
			this.$emit('update:visible', false);
			/**
			 * 点击关闭按钮触发
			 * @event close
			 */
			this.$emit('close');
		},
	},
	mounted() {
		this.setFooterHeight();
		this.mapWarp = this.$parent.$el;
	},
};
</script>
<style>
.panel {
	position: absolute;
	border-radius: 2px;
	background: hsla(0, 0%, 100%, 0.9);
	color: #5f6477;
	-webkit-box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
	box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
}
.panel.drag.is-dragged {
	-webkit-transform: initial;
	transform: none;
}
.panel.drag:not(.is-disabled) {
	right: auto;
	bottom: auto;
}
.panel .resize {
	overflow: hidden;
}
.panel__header {
	height: 40px;
	padding: 0 14px;
	position: relative;
}
.panel__title {
	font-size: 16px;
	line-height: 40px;
}
.panel__close {
	font-size: 30px;
	position: absolute;
	top: 0px;
	right: 10px;
	cursor: pointer;
}
.panel__close:hover {
	opacity: 0.7;
}
.panel__toolbar {
	position: absolute;
	right: 10px;
	top: 5px;
}
.panel__toolbar.is-closable {
	right: 35px;
}
.panel__body {
	padding: 10px 16px;
	height: calc(100% - 40px);
	overflow: auto;
}
.panel__footer {
	padding: 10px 10px 5px;
	width: 100%;
	position: absolute;
	bottom: 0;
}
.panel__footer.is-right {
	text-align: right;
}
.panel__footer.is-center {
	text-align: center;
}
.panel .panel__header {
	background: #ebeef5;
	color: #222;
}
.panel .panel__footer {
	border-top: 1px solid #ebeef5;
}
</style>
