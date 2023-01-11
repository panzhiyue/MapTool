<template>
	<tool-container>
		<template #content>
			<div class="w-full h-full p-5">
				<a-tabs v-model:active-key="activeKey">
					<a-tab-pane key="1" tab="XY 坐标系">
						<scroll-box>
							<directory-tree :urls="urls" ref="directoryTreeDom" @select="handleSelect">
								<template #title="{ title, data }">
									<a-dropdown :trigger="['contextmenu']">
										<span>{{ PATH.basename(title, '.prj') }}</span>

										<template #overlay>
											<a-menu>
												<a-menu-item
													:disabled="
														data.children ||
														data.path.indexOf('收藏夹') > -1 ||
														inFavorites(data.title)
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
							</directory-tree>
						</scroll-box>
					</a-tab-pane>
					<a-tab-pane key="2" tab="Z 坐标系">
						<scroll-box>
							<directory-tree :urls="urls2"></directory-tree>
						</scroll-box>
					</a-tab-pane>
				</a-tabs>
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
const remote = require('@electron/remote');
let sharedObject = remote.getGlobal('sharedObject');

const route = useRoute();
const urls = ref([
	PATH.join(__static, 'Coordinate Systems\\XY坐标系\\收藏夹'),
	PATH.join(__static, 'Coordinate Systems\\XY坐标系\\地理坐标系'),
	PATH.join(__static, 'Coordinate Systems\\XY坐标系\\投影坐标系'),
]);

const urls2 = ref([
	PATH.join(__static, 'Coordinate Systems\\Z坐标系\\收藏夹'),
	PATH.join(__static, 'Coordinate Systems\\Z坐标系\\垂直坐标系'),
]);

const activeKey = ref('1');
const directoryTreeDom = ref(null);

const { close, currentWindow } = useWindow();

const handleOk = () => {
	ipcRenderer.send(`changeSpatialReference_${route.query.uuid}`, selectedCoordinateSystem.value);
	close();
};

const handleCancel = () => {
	close();
};

const inFavorites = (name) => {
	return fs.existsSync(PATH.join(__static, 'Coordinate Systems\\XY坐标系\\收藏夹', name));
};

//添加到收藏夹
const handleAddToFavorites = (name: string, path: string) => {
	fs.copyFile(path, PATH.join(__static, 'Coordinate Systems\\XY坐标系\\收藏夹', name), () => {
		directoryTreeDom.value.update();
	});
};
//从收藏夹移除
const handleRemoveFromFavorites = (path: string) => {
	fs.unlink(path, () => {
		directoryTreeDom.value.update();
	});
};
//复制与修改
const handleCopyAndModify = (name: string, path: string) => {};

//另存为
const handleSaveAs = (name: string, path: string) => {
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
	const path = e.node.path;
	if (!e.node.children) {
		selectedCoordinateSystem.value = fs.readFileSync(path).toString();
	} else {
		selectedCoordinateSystem.value = null;
	}
};

const selectedCoordinateSystem = ref('');
</script>
<style lang="less" scoped>
/deep/.ant-tabs-tabpane {
	height: 400px;

	.scroll-box {
		width: 100%;
		height: 100%;
		border: 1px solid #ccc;
	}
}

/deep/ .coordinate-system-info {
	margin-top: 10px;
}
</style>
