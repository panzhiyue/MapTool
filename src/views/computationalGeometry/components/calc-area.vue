<template>
	<div class="unit-box flex pl-5 pr-5">
		<span>单位：</span>
		<enum-select v-model:value="unitSelected" :enum="AreaUnits" :mode="'name-value'"></enum-select>
	</div>
	<step-footer
		pre-most-text=""
		pre-text=""
		next-text=""
		next-most-text=""
		@on-ok="handleOk"
		@on-cancel="handleCancel"></step-footer>
</template>
<script lang="ts" setup>
import { useWindow } from '@/hooks/electron/useWindow';
import { useRoute } from 'vue-router';
import * as TableApi from '@/api/table';
import ResponseCode from '@/enum/ResponseCode';
import { WKT } from 'ol/format';
import { getArea } from '@/utils/gis';
import { ipcRenderer } from 'electron';
import WindowName from '@/enum/WindowName';
import EnumSelect from '@/components/enum-select';
import AreaUnits from '@/enum/AreaUnits';
import { conversionAreaUnit } from '@/utils/unit';
const remote = require('@electron/remote');
let sharedObject = remote.getGlobal('sharedObject');

const route = useRoute();

const formatWKT = new WKT();

const tableName = ref(route.query.tableName as string);
const fieldName = ref(route.query.fieldName as string);

const unitSelected = ref();

const { close } = useWindow();
const handleOk = async () => {
	let result = await TableApi.getByWhere(tableName.value, {});
	let data = result.data.concat([]);
	data.forEach((item, index) => {
		const area = conversionAreaUnit(
			getArea(formatWKT.readGeometry(item.geom_wkt)),
			AreaUnits.平方米,
			unitSelected.value,
		);
		item[fieldName.value] = area;
	});

	TableApi.replaceData(tableName.value, data).then((result) => {
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
<style lang="less" scoped>
.unit-box {
	span {
		line-height: 30px;
	}
	.ant-select {
		flex: 1;
	}
}
</style>
