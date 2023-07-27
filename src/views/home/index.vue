<template>
	<a-layout class="main">
		<a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible width="130px">
			<div class="sider-container">
				<div class="item">
					<home-outlined class="icon" title="首页" @click="toHome" /><span class="name">首页</span>
				</div>
			</div>
		</a-layout-sider>

		<a-layout>
			<a-layout-header class="layout_header" v-mouse-drag="changePosition">
				<div class="header_left">
					<div>
						<strong>潘知悦的工具集合</strong>
					</div>
					<p class="version">v1.0.0</p>
				</div>
				<div class="header_right">
					<div class="header_user">
						<a-dropdown :trigger="['click']">
							<template #overlay>
								<a-menu>
									<a-menu-item key="1">授权信息</a-menu-item>
									<a-menu-item key="2">修改密码</a-menu-item>
									<a-menu-item key="3">退出</a-menu-item>
								</a-menu>
							</template>
						</a-dropdown>
						<window-controls :name="'Main'"></window-controls>
					</div>
				</div>
			</a-layout-header>
			<a-layout-content
				:style="{ margin: '0px 0px', padding: '0px', background: '#fff', minHeight: '280px' }">
				<router-view></router-view>
			</a-layout-content>
		</a-layout>
	</a-layout>
</template>
<script setup>
import { HomeOutlined } from '@ant-design/icons-vue';
import { useRouter } from 'vue-router';
import WindowControls from '@/components/window-controls/index.vue';
import { useWindow } from '@/hooks/electron/useWindow';
const router = useRouter();
const collapsed = ref(false);

const toHome = () => {
	router.push({
		path: '/modelSelect',
	});
};

const { changePosition } = useWindow();
</script>
<style lang="less" scoped>
.main {
	width: 100%;
	height: 100%;
	overflow: hidden;
	color: #1f1f1f;
	// background-image: url('./images/bg.png');

	img {
		image-rendering: -moz-crisp-edges;
		image-rendering: -o-crisp-edges;
		image-rendering: -webkit-optimize-contrast;
		image-rendering: crisp-edges;
		-ms-interpolation-mode: nearest-neighbor;
	}
	.layout_header {
		display: flex;
		align-items: center;
		height: 50px;
		background: rgb(255, 255, 255);
		justify-content: space-between;
		color: #1f1f1f;
		font-size: 12px;
		padding: 0 0px;
		// box-shadow: 10px 8px 16px #000;

		.header_left {
			cursor: pointer;
			min-width: 350px;
			margin-left: 10px;
			font-size: 20px;
			font-family: MicrosoftYaHei;
			display: flex;
			align-items: center;

			& > div {
				padding-left: 24px;
			}

			& > p {
				font-size: 14px;
				margin: 0;
				margin-left: 10px;
			}

			.version {
				font-size: 12px;
				margin-top: 10px;
			}
		}
		.header_right {
			min-width: 200px;
			display: flex;
			justify-content: space-around;
			align-items: center;
			color: #1f1f1f;

			& > div {
				flex-grow: 1;
			}
			.header_user {
				display: flex;
				justify-content: space-around;
				align-items: center;
				cursor: pointer;
				margin-left: 50px;
			}
		}
	}

	.ant-layout-sider {
		background: linear-gradient(to bottom, #e1f1ff, #fff);
		border-right: 1px solid #ccc;
		.sider-container {
			width: 100%;
			text-align: center;
			padding-top: 10px;
			padding-top: 50px;
			.item {
				height: 40px;
				line-height: 40px;
				.icon {
					display: inline-block;
					color: #4171ff;
					cursor: pointer;
					font-size: 20px;
					margin-right: 10px;
					margin-top: -7px;
				}

				.name {
					display: inline-block;
					height: 40px;
					line-height: 40px;
					font-size: 16px;
					font-weight: bold;
				}
			}
		}
	}
}
</style>
