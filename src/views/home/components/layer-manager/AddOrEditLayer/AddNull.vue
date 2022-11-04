<template>
	<span>这个向导允许你指定如何导入数据。你要选择那种数据导入格式？</span>
	<div>
		<a-row style="margin-top: 10px">
			<a-col flex="100px" class-name="name">图层名称</a-col>
			<a-col flex="auto"> <a-input v-model="name" placeholder="图层名称" /></a-col>
		</a-row>
		<a-row>
			<a-button type="primary" style="margin-top: 10px; margin-left: 400px" @click="sure"
				>确定</a-button
			>
		</a-row>
	</div>
</template>

<script>
import fs from 'fs';
import dayjs from 'dayjs';
import path from 'path';
export default {
	data() {
		return {
			name: '',
			accept: '.shp',
			data: null,
		};
	},
	mounted() {},
	methods: {
		sure() {
			let geojson = '{type: "FeatureCollection",features: [],}';
			let rPath = `/data/${dayjs().valueOf()}.json`;

			let str = geojson;
			fs.writeFileSync(path.join(__static, rPath), str);
			let info = {
				type: 'layer',
				title: this.name,
				contextmenu: true,
				canEdit: true,
				canDelete: true,
				layerInfo: {
					type: 'vector',
					path: rPath,
				},
			};
			this.$emit('sure', info);
		},
	},
};
</script>

<style></style>
