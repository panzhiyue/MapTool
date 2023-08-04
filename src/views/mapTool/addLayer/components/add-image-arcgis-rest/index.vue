<template>
	<tool-container>
		<template #content>
			<div class="w-full h-full p-5">
				<a-form>
					<a-form-item label="图层名">
						<a-input v-model:value="layerName"></a-input>
					</a-form-item>
					<a-form-item label="URL">
						<a-input
							v-model:value="url"
							placeholder="https://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer"></a-input>
					</a-form-item>
				</a-form>
			</div>
		</template>
		<template #footer>
			<step-footer
				:next-most-text="null"
				:cancel-text="null"
				:next-text="null"
				@on-ok="handleOk"
				@on-pre="handlePre"
				@on-pre-most="handlePreMost"></step-footer>
		</template>
	</tool-container>
</template>
<script lang="ts" setup>
import { useWindow } from '@/hooks/electron/useWindow';
import { useVModel } from '@vueuse/core';
import { add as addLayerInfo } from '@/api/layerInfo';
import { message } from 'ant-design-vue';
import { buildUUID } from '@/utils/uuid';
import { useRoute } from 'vue-router';
import ResponseCode from '@/enum/ResponseCode';
import { useMainWindow } from '@/hooks/electron/useMainWindow';

const route = useRoute();
const props = defineProps({
	current: {
		type: Number,
	},
});

const emits = defineEmits(['update:current']);

const currentStep = useVModel(props, 'current', emits);

const layerName = ref('');
const url = ref('');

const { close } = useWindow();
const handleCancel = () => {
	close();
};

const handlePre = () => {
	currentStep.value -= 1;
};

const handlePreMost = () => {
	currentStep.value = 0;
};
const { refreshLayerInfos, refreshMapLayerInfos } = useMainWindow();
const handleOk = () => {
	addLayerInfo({
		id: buildUUID(),
		parentId: route.query.parentId as string,
		mapId: 1,
		title: layerName.value,
		type: 'layer',
		canDelete: true,
		canEdit: true,
		expand: true,
		info: {
			type: 'ImageArcGISRest',
			url: url.value,
		},
	}).then((result1) => {
		if (result1.code == ResponseCode.SUCCESS) {
			refreshLayerInfos();
			close();
		} else {
			message.error(result1.msg, 1);
		}
	});
};
</script>
