<template>
	<div class="container w-full flex">
		<span class="title"><slot name="title"></slot></span>
		<div class="content"><slot name="content"></slot></div>
		<div class="operate"><slot name="operate"></slot></div>
	</div>
</template>
<style lang="less" scoped>
.container {
	height: 40px;
	line-height: 40px;
	.title {
		height: 40px;
		line-height: 40px;
	}
	.content {
		flex: 1;
		margin-left: 10px;
		margin-right: 10px;
	}
}
</style>
