<template>
	<tool-container>
		<template #content>
			<div class="w-full h-full p-5">
				<a-form :label-col="{ style: { width: '80px' } }">
					<a-form-item label="名称："><a-input v-model:value="name"></a-input></a-form-item>
					<a-form-item label="类型："
						><sqlite-column-type v-model:value="type" disabled></sqlite-column-type
					></a-form-item>
				</a-form>
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
import SqliteColumnType from '@/components/sqlite-column-type/index.vue';
import { useWindow } from '@/hooks/electron/useWindow';
import * as TableApi from '@/api/table';
import { useRoute } from 'vue-router';
import ResponseCode from '@/enum/ResponseCode';
import { ipcRenderer } from 'electron';
import WindowName from '@/enum/WindowName';
import { getDB } from '@/api/mapTool/index';
const remote = require('@electron/remote');
let sharedObject = remote.getGlobal('sharedObject');

const route = useRoute();
const tableName: string = route.query.tableName as string;
const name = ref(route.query.name as string);
const oldName = ref(route.query.name as string);
const type = ref(route.query.type as string);

const { close } = useWindow();
const handleOk = async () => {
	const db = await getDB();
	if (oldName.value != name.value) {
		TableApi.renameColumn(db, tableName, oldName.value, name.value).then((result) => {
			if (result.code == ResponseCode.SUCCESS) {
				close();
				ipcRenderer.sendTo(sharedObject[WindowName.ATTRIBUTE_TABLE], 'refresh');
			} else {
				alert(result.msg);
			}
		});
	} else {
		close();
	}
};

const handleCancel = () => {
	close();
};
</script>
