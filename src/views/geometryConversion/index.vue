<template>
	<tool-container>
		<template #content>
			<div class="w-full h-full p-5">
				<a-form :label-col="{ style: { width: '80px' } }" layout="horizontal">
					<a-form-item label="几何类型:">
						<a-select v-model:value="geometryFormat">
							<a-select-option value="geometry">geometry</a-select-option>
							<a-select-option value="feature">feature</a-select-option>
							<a-select-option value="features">features</a-select-option>
						</a-select>
					</a-form-item>
					<a-form-item label="输入格式:">
						<enum-select v-model:value="formatType1" :enum="GeometryFormatEnum"></enum-select>
					</a-form-item>
					<a-form-item label="输出格式:">
						<enum-select v-model:value="formatType2" :enum="GeometryFormatEnum"></enum-select>
					</a-form-item>
					<a-form-item label="输入数据:">
						<a-textarea v-model:value="input"></a-textarea>
					</a-form-item>
					<a-form-item label="输出数据:">
						<a-textarea :value="output"> </a-textarea>
					</a-form-item>
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
<script setup lang="ts">
import { ref } from 'vue';
import { useWindow } from '@/hooks/electron/useWindow';
import GeometryFormatEnum from '@/enum/GisFormatType';
import { convertGisFormat } from '@/utils/gis';
const geometryFormat = ref('features');
const formatType1 = ref(GisFormatType.geojson);
const formatType2 = ref(GisFormatType.geojson);

const input = ref('');
const output = ref('');

const { close } = useWindow();
const handleOk = () => {
	output.value = convertGisFormat(
		input.value,
		formatType1.value,
		formatType2.value,
		geometryFormat.value,
	);
};

const handleCancel = () => {
	close();
};
</script>
<style lang="less" scoped></style>
