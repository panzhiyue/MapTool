<template>
	<div>
		<Row style="margin-top: 10px">
			<Col flex="100px" class-name="name">图层名称</Col>
			<Col flex="auto"> <Input v-model="name" placeholder="图层名称" /></Col>
		</Row>
		<Row style="margin-top: 10px">
			<Col flex="100px" class-name="name">选择文件</Col>
			<Col flex="auto">
				<Icon type="ios-cloud-upload-outline" @click="selectFiles" />
			</Col>
		</Row>
		<Row>
			<Button type="primary" style="margin-top: 10px; margin-left: 400px" @click="sure"
				>确定</Button
			>
		</Row>
	</div>
</template>

<script>
import * as utilsol from '@gis-js/utilsol';
import GeoJSON from 'ol/format/GeoJSON';
import * as proj from 'ol/proj';
import fs from 'fs';
import dayjs from 'dayjs';
import path from 'path';

import SpatialReference from '@/utils/SpatialReference';
export default {
	data() {
		return {
			name: '',
			accept: '.shp',
			data: null,
		};
	},
	methods: {
		selectFiles() {
			//加载shapefile文件
			this.getFile(true, (files) => {
				var eShapeFile = new utilsol.EShapeFile({
					projection: new SpatialReference(homeStore.mapInfo.src).getProjection(),
				});
				eShapeFile.on('loaded', () => {
					var features = eShapeFile.getFeatures();
					this.data = features;
				});

				eShapeFile.on('error', () => {});
				eShapeFile.readFile(files);
			});
		},
		/**
		 * 获取文件
		 * @param {boolean} 是否选择多个文件
		 * @param {Function} 回调函数
		 */
		getFile(multiple, callback) {
			let file = document.createElement('input');
			file.type = 'file';
			file.accept = '.shp,.prj,.dbf,.shx,.cpg';
			file.multiple = multiple;
			file.onchange = function (event) {
				if (typeof callback == 'function') {
					callback(event.path[0].files);
				}
			};
			file.click();
		},
		sure() {
			let geojson = new GeoJSON().writeFeatures(this.data);
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
