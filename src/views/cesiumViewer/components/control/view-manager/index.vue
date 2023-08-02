<template>
	<panel
		class="view-manager"
		title="视图管理器"
		placement="center-center"
		width="450px"
		height="300px"
		:draggable="{ target: $el }"
		resizable
		>画板占位内容</panel
	>
</template>
<script setup>
import Panel from '../panel';
</script>
<style lang="less" scoped>
.view-manager :deep {
	top: 200px;
	min-width: 450px;
}
</style>
