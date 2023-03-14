<template>
	<tool-container>
		<template #content>
			<div class="w-full h-full p-5">
				<a-input-search
					v-model:value="filterStr"
					placeholder="input search text"
					style="width: 200px" />
				<scroll-box>
					<a-directory-tree
						v-if="treeData"
						:tree-data="treeData"
						ref="tree"
						:trigger="['contextmenu']"
						draggable
						show-icon
						:height="350"
						@select="handleSelect">
						<template #title="{ title, data }">
							<a-dropdown :trigger="['contextmenu']">
								<span>{{ title }}</span>

								<template #overlay>
									<a-menu>
										<a-menu-item
											:disabled="
												data.children || data.path.indexOf('收藏夹') > -1 || inFavorites(data.title)
											"
											@click="handleAddToFavorites(data.title, data.path)"
											>添加到收藏夹</a-menu-item
										>
										<a-menu-item
											:disabled="data.children || data.path.indexOf('收藏夹') == -1"
											@click="handleRemoveFromFavorites(data.path)"
											>从收藏夹中移除</a-menu-item
										>
										<a-menu-item
											:disabled="data.children"
											@click="handleCopyAndModify(data.title, data.path)"
											>复制并修改</a-menu-item
										>
										<a-menu-item
											:disabled="data.children"
											@click="handleSaveAs(data.title, data.path)"
											>另存为</a-menu-item
										>
									</a-menu>
								</template>
							</a-dropdown>
						</template>
					</a-directory-tree>
				</scroll-box>
				<coordinate-system-info :value="selectedCoordinateSystem"></coordinate-system-info>
			</div>
		</template>
		<template #footer>
			<step-footer
				:next-most-text="null"
				:next-text="null"
				:pre-most-text="null"
				:pre-text="null"
				ok-text="确定"
				cancel-text="取消"
				:ok-disabled="!selectedCoordinateSystem"
				@on-ok="handleOk"
				@on-cancel="handleCancel"></step-footer>
		</template>
	</tool-container>
</template>
<script lang="ts" setup>
import ToolContainer from '@/components/tool-container';
import DirectoryTree from '@/components/directory-tree';
import ScrollBox from '@/components/scroll-box';
import PATH from 'path';
import fs from 'fs';
import { useWindow } from '@/hooks/electron/useWindow';
import CoordinateSystemInfo from '@/components/coordinte-system-info';
import { ipcRenderer } from 'electron';
import { useRoute } from 'vue-router';
import { useHomeStore } from '@/store/home';
const remote = require('@electron/remote');
let sharedObject = remote.getGlobal('sharedObject');
const __static = global.__static;
const homeStore = useHomeStore();
const route = useRoute();
homeStore.initProjection();
const filterStr = ref('');
const treeData = computed(() => {
	let spatial_ref_sys = homeStore.spatial_ref_sys;
	if (!spatial_ref_sys) {
		return [];
	}
	if (filterStr.value) {
		spatial_ref_sys = spatial_ref_sys.filter((item) => {
			return item.auth_srid == filterStr.value || item.name.indexOf(filterStr.value) > -1;
		});
	}

	let temp = {};
	spatial_ref_sys.forEach((item) => {
		if (!temp[item.type]) {
			temp[item.type] = [];
		}
		temp[item.type].push({
			title: item.name,
			data: item,
			path: '',
		});
	});
	let result = [];
	for (let i in temp) {
		result.push({
			title: i,
			path: '',
			children: temp[i],
		});
	}
	return result;

	// return homeStore.spatial_ref_sys.map()
});

const directoryTreeDom = ref(null);

const { close } = useWindow();

const handleOk = () => {
	ipcRenderer.send(`changeSpatialReference_${route.query.uuid}`, selectedCoordinateSystem.value);
	close();
};

const handleCancel = () => {
	close();
};

const inFavorites: Function = (name) => {
	return fs.existsSync(PATH.join(__static, 'Coordinate Systems\\XY坐标系\\收藏夹', name));
};

//添加到收藏夹
const handleAddToFavorites: Function = (name: string, path: string) => {
	fs.copyFile(path, PATH.join(__static, 'Coordinate Systems\\XY坐标系\\收藏夹', name), () => {
		directoryTreeDom.value.update();
	});
};
//从收藏夹移除
const handleRemoveFromFavorites: Function = (path: string) => {
	fs.unlink(path, () => {
		directoryTreeDom.value.update();
	});
};
//复制与修改
const handleCopyAndModify: Function = (name: string, path: string) => {};

//另存为
const handleSaveAs: Function = (name: string, path: string) => {
	remote.dialog
		.showSaveDialog({
			title: '请选择文件',
			defaultPath: name,
			filters: [
				{
					name: '坐标系',
					extensions: ['prj'], // 只选择jsp, png
				},
			],
		})
		.then((result) => {
			console.log(result);
			if (result) {
				fs.copyFile(path, result.filePath, () => {});
			}
		});
};

const handleSelect = (selectedKeys, e) => {
	console.log(e.node.data);
	const auth = `${e.node.data.auth_name}:${e.node.data.auth_srid}`;
	if (!e.node.children) {
		selectedCoordinateSystem.value = auth;
	} else {
		selectedCoordinateSystem.value = null;
	}
};

const selectedCoordinateSystem = ref('');
</script>
<style lang="less" scoped>
.scroll-box {
	width: 100%;
	height: 355px;
	border: 1px solid #ccc;
}

/deep/ .coordinate-system-info {
	margin-top: 10px;
}
</style>
