<template>
	<tool-container>
		<template #footer>
			<step-footer
				pre-most-text=""
				pre-text=""
				next-text=""
				next-most-text=""
				@on-ok="handleOk"
				@on-cancel="handleCancel"></step-footer>
		</template>
	</tool-container>
</template>
<script lang="ts" setup>
import { useWindow } from '@/hooks/electron/useWindow';
import { useRoute } from 'vue-router';
import * as TableApi from '@/api/table';
import ResponseCode from '@/enum/ResponseCode';
import { WKT } from 'ol/format';
import { getCenterOfMass } from '@/utils/gis';
import { ipcRenderer } from 'electron';
import WindowName from '@/enum/WindowName';
import { getDB } from '@/api/mapTool/index';
const remote = require('@electron/remote');
let sharedObject = remote.getGlobal('sharedObject');

const route = useRoute();

const formatWKT = new WKT();

const tableName = ref(route.query.tableName as string);
const fieldName = ref(route.query.fieldName as string);

const { close } = useWindow();
const handleOk = async () => {
	const db = await getDB();
	let result = await TableApi.getByWhere(db, tableName.value, {});
	let data = result.data.concat([]);
	data.forEach((item, index) => {
		const center = getCenterOfMass(formatWKT.readGeometry(item.geom_wkt));
		item[fieldName.value] = center[1];
	});

	TableApi.replaceData(db, tableName.value, data).then((result) => {
		if (result.code == ResponseCode.SUCCESS) {
			close();
			ipcRenderer.sendTo(sharedObject[WindowName.ATTRIBUTE_TABLE], 'refresh');
		} else {
			remote.dialog.showErrorBox('计算几何', result.msg);
		}
	});
};

const handleCancel = () => {
	close();
};
</script>
<style lang="less" scoped></style>
