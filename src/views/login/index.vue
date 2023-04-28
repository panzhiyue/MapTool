<template>
	<div class="main w-full h-full">
		<video
			src="../../assets/images/login_bg.mp4"
			style="width: 100%; height: 100%; object-fit: cover; position: absolute; top: 0; left: 0"
			:autoplay="true"
			:loop="true"
			:muted="true"></video>

		<div class="move" v-mouse-drag="changePosition"></div>
		<!-- <button class="close" id="close-button" @click="handleClose">
			<i class="icon icon-window-close"></i>
		</button> -->
		<div class="login-container">
			<div class="user-logo">
				<img src="@/assets/images/default_user_logo.jfif" />
			</div>
			<div class="username">
				{{ userName }}
			</div>
			<div class="password">
				<a-input-search placeholder="请输入密码" v-model:value="password" @search="onSubmit">
					<template #enterButton>
						<a-button>ok</a-button>
					</template>
				</a-input-search>
			</div>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { useWindow } from '@/hooks/electron/useWindow';
import { useRouter } from 'vue-router';

const router = useRouter();
const { close, changePosition, currentWindow } = useWindow();
const handleClose = () => {
	close();
};
const userName = ref('Administrator');
const password = ref('');
const onSubmit = () => {
	if (userName.value === 'Administrator' && password.value === '123456') {
		router.push({
			path: '/home',
		});
		currentWindow.resizable = true;
	}
};
</script>
<style lang="less" scoped>
.main {
	position: relative;
	// background-image: url('../../assets/images/login_bg.png');
	// background-size: 100%;

	.close {
		width: 20px;
		height: 20px;
		position: absolute;
		right: 40px;
		top: 20px;
		font-size: 25px;
		color: white;
	}

	.move {
		position: absolute;
		width: 100%;
		height: 40px;
		top: 0px;
	}

	.login-container {
		position: relative;
		width: 200px;
		height: 300px;
		// background-color: white;
		margin: auto;
		top: calc(50% - 150px);
	}

	.user-logo {
		width: 120px;
		height: 120px;
		border-radius: 60px;
		overflow: hidden;
		margin: 0px auto;
		img {
			width: 100%;
			height: 100%;
		}
	}

	.username {
		text-align: center;
		margin-top: 16px;
		font-size: 30px;
		color: white;
	}
	.password {
		margin-top: 10px;
	}
}
</style>
