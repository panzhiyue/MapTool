<template>
	<tool-container>
		<template #content>
			<div class="w-full h-full p-5">
				<a-form :label-col="{ style: { width: '80px' } }" layout="horizontal">
					<a-form-item label="">
						<input-select-path
							v-model:value="input"
							pathType="Directory"
							title="输入文件夹"></input-select-path>
					</a-form-item>
					<a-form-item label="">
						<input-select-path
							v-model:value="output"
							pathType="Directory"
							title="输出文件夹"></input-select-path>
					</a-form-item>
					<a-form-item label="输入格式:">
						<enum-select v-model:value="formatType1" :enum="GeometryFormatEnum"></enum-select>
					</a-form-item>
					<a-form-item label="输出格式:">
						<enum-select v-model:value="formatType2" :enum="GeometryFormatEnum"></enum-select>
					</a-form-item>
					<a-form-item label="输出文件后缀:">
						<a-input v-model:value="outputExt"></a-input>
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
import fs from 'fs';
import path from 'path';
import { convertGisFormat } from '@/utils/gis';
import GisFormatType from '@/enum/GisFormatType';
const geometryFormat = ref('geometry');
const formatType1 = ref(GisFormatType.geojson);
const formatType2 = ref(GisFormatType.geojson);
const outputExt = ref('.json');

const input = ref('');
const output = ref('');

const { close } = useWindow();
const handleOk = () => {
	fs.readdir(input.value, (err, files) => {
		files.forEach((file) => {
			let ext = path.extname(file);
			let name = path.basename(file, ext);
			let filePath = path.join(input.value, file);
			fs.readFile(filePath, (err, data) => {
				let outputData = '';
				if (data.toString()) {
					outputData = convertGisFormat(
						data.toString(),
						formatType1.value,
						formatType2.value,
						'features',
					);
				}

				let outputPath = path.join(output.value, name + (outputExt.value ? outputExt.value : ext));
				fs.writeFile(outputPath, outputData, () => {});
			});
		});
	});
};

const handleCancel = () => {
	close();
};
</script>
<style lang="less" scoped></style>
