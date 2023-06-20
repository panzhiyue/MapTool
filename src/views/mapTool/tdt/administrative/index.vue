<template>
	<tool-container>
		<template #content>
			<div class="w-full h-full p-5">
				<a-form ref="formRef">
					<a-row :gutter="24">
						<a-col :span="12">
							<a-form-item
								:name="`searchWord`"
								:label="`searchWord`"
								:rules="[{ required: true, message: 'searchWord' }]">
								<a-input
									v-model:value="formState['searchWord']"
									placeholder="placeholder"></a-input>
							</a-form-item>
						</a-col>
						<a-col :span="12">
							<a-form-item
								:name="`searchType`"
								:label="`searchType`"
								:rules="[{ required: true, message: 'searchType' }]">
								<a-input
									v-model:value="formState['searchType']"
									placeholder="placeholder"></a-input>
							</a-form-item>
						</a-col>
					</a-row>
					<a-row :gutter="24">
						<a-col :span="12">
							<a-form-item
								:name="`needSubInfo`"
								:label="`needSubInfo`"
								:rules="[{ required: true, message: 'needSubInfo' }]">
								<a-checkbox v-model:value="formState['needAll']"></a-checkbox>
							</a-form-item>
						</a-col>
						<a-col :span="12">
							<a-form-item
								:name="`searchType`"
								:label="`searchType`"
								:rules="[{ required: true, message: 'searchType' }]">
								<a-input
									v-model:value="formState['searchType']"
									placeholder="placeholder"></a-input>
							</a-form-item>
						</a-col>
					</a-row>
				</a-form>

				<div>{{ result }}</div>
			</div>
		</template>
	</tool-container>
</template>
<script lang="ts" setup>
import { ref, reactive } from 'vue';
import ToolContainer from '@/components/tool-container';
import Row from '@/components/row';
import { reverseGeocoder } from '@/api/tianditu';
const formState = reactive({});
const result = ref(null);
const handleSearch = () => {};
</script>
<style lang="less" scoped>
.title {
	width: 100px;
}
</style>
