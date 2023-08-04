<template>
	<tool-container>
		<template #content>
			<div class="field-calculator w-full h-full p-5">
				<group-box class="parser-group" title="解析程序">
					<a-radio-group v-model:value="parser">
						<a-radio value="sqlite">Sqlite</a-radio>
					</a-radio-group>
				</group-box>
				<a-space>
					<group-box class="field-group" title="字段：" :border-width="0">
						<list-box
							:items="fieldItems"
							@dblclick="(item, index) => handleJoinSql(item.value)"></list-box>
					</group-box>
					<group-box class="type-group" title="类型：" :border-width="0">
						<a-radio-group v-model:value="type">
							<a-radio value="math">数字</a-radio>
							<a-radio value="string">字符串</a-radio>
						</a-radio-group>
					</group-box>
					<group-box class="function-group" title="功能：" :border-width="0">
						<list-box
							:items="functionItems"
							@dblclick="(item, index) => handleJoinSql(item.value)"></list-box>
					</group-box>
				</a-space>
				<div class="operator-box mb-3">
					<span>{{ fieldName }}=</span>
					<a-button
						v-for="operator in operatorList"
						size="small"
						@click="() => handleJoinSql(operator)"
						>{{ operator }}</a-button
					>
				</div>

				<textarea class="txtSql" v-model="sqlText" :rows="4" ref="txtSqlDom"></textarea>
			</div>
		</template>
		<template #footer>
			<step-footer
				pre-most-text=""
				pre-text=""
				next-text=""
				next-most-text=""
				:ok-disabled="canOk"
				@on-ok="handleOk"
				@on-cancel="handleCancel">
			</step-footer>
		</template>
	</tool-container>
</template>
<script lang="ts" setup>
import GroupBox from '@/components/group-box';
import ListBox from '@/components/list-box';
import { useRoute } from 'vue-router';
import * as TableApi from '@/api/table';
import { useWindow } from '@/hooks/electron/useWindow';
import ResponseCode from '@/enum/ResponseCode';
import { ipcRenderer } from 'electron';
import WindowName from '@/enum/WindowName';
import { getDB } from '@/utils/db/MapTool';
const remote = require('@electron/remote');
let sharedObject = remote.getGlobal('sharedObject');

const route = useRoute();

const tableName = ref(route.query.tableName as string);
const fieldName = ref(route.query.fieldName as string);
const fieldType = ref(route.query.fieldType as string);

const sqlText = ref('');
const columnStructs = ref([]);
onMounted(async () => {
	const db = await getDB();
	columnStructs.value = (await TableApi.getTableStruct(db, tableName.value)).data;
});

const fieldItems = computed(() => {
	return columnStructs.value
		.filter((item) => {
			return item.name != 'geom_wkt';
		})
		.map((item) => {
			return {
				label: item.name,
				value: item.name,
			};
		});
});
const type = ref('math');

const parser = ref('sqlite');

const operatorList = ref(['||', '%', '/', '*', '-', '+']);
const txtSqlDom = ref();

const mathFunctionItems = reactive([
	{
		label: 'abs ( )',
		value: 'abs ( )',
	},
	{
		label: 'max ( )',
		value: 'max ( )',
	},
	{
		label: 'min ( )',
		value: 'min ( )',
	},
	{
		label: 'round ( )',
		value: 'round ( )',
	},
	{
		label: 'random ( )',
		value: 'random ( )',
	},
]);

const stringFunctionItems = reactive([
	{
		label: 'lower ( )',
		value: 'lower ( )',
	},
	{
		label: 'upper ( )',
		value: 'upper ( )',
	},
	{
		label: 'length ( )',
		value: 'length ( )',
	},
	{
		label: 'substr ( )',
		value: 'substr ( )',
	},
]);

const functionItems = computed(() => {
	if (type.value == 'math') {
		return mathFunctionItems;
	} else {
		return stringFunctionItems;
	}
});

const handleJoinSql = (text) => {
	sqlText.value =
		sqlText.value.substring(0, txtSqlDom.value.selectionStart) +
		' ' +
		text +
		' ' +
		sqlText.value.substring(txtSqlDom.value.selectionEnd);
};

const canOk = computed(() => {
	return !sqlText.value;
});

const { close } = useWindow();
const handleOk = () => {
	const db = await getDB();
	TableApi.updateColumnBySql(db, tableName.value, fieldName.value, sqlText.value).then((result) => {
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
.field-calculator {
	background-color: #f0f0f0;
	/deep/ .parser-group {
		width: 200px;
		height: 40px;
	}

	/deep/ .field-group {
		width: 140px;

		.group-box-content {
			padding-left: 0px;
			padding-right: 0px;
			.list-box {
				width: 100%;
				height: 100%;
			}
		}
	}

	/deep/ .type-group {
		width: 120px;
	}

	/deep/ .function-group {
		width: 140px;
		.list-box {
			width: 100%;
			height: 100%;
		}
	}

	.operator-box {
		.ant-btn {
			float: right;
			margin-right: 10px;
		}
	}

	.txtSql {
		width: 100%;
	}
}
</style>
