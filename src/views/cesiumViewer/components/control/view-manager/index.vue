<template>
	<panel
		class="view-manager"
		title="视图管理器"
		placement="center-center"
		width="450px"
		height="300px"
		:draggable="{ target: $parent.$el }"
		resizable
		>画板占位内容</panel
	>
</template>
<script setup>
import Panel from '../panel';
</script>
<style lang="less" scoped>
.view-manager :deep {
	min-width: 450px;
}
</style>
