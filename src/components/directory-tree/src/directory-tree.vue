<template>
	<a-directory-tree
		:tree-data="treeData"
		class="demo-tree-render"
		ref="tree"
		:trigger="['contextmenu']"
		draggable
		show-icon>
		<template v-for="(_, slot) in $slots" v-slot:[slot]="data">
			<slot :name="slot" v-bind="data"></slot>
		</template>
	</a-directory-tree>
</template>
<script lang="ts" setup>
import DirTree from '@/utils/directory-tree';
import { PropType } from 'vue';

const props = defineProps({
	urls: {
		type: Array as PropType<string[]>,
	},
});
const dirTree = ref(null);
const treeData = computed(() => {
	return dirTree.value
		? dirTree.value.map((item) => {
				return getTreeDataItem(item);
		  })
		: [];
});

const getTreeDataItem = (item) => {
	return !item.children
		? { title: item.name, path: item.path }
		: {
				title: item.name,
				path: item.path,
				children: item.children.map((childrenItem) => {
					return getTreeDataItem(childrenItem);
				}),
		  };
};

const update = () => {
	dirTree.value = props.urls.map((item) => {
		return DirTree(item);
	});
};

update();

defineExpose({ update });
</script>
<style lang="less" scoped></style>
