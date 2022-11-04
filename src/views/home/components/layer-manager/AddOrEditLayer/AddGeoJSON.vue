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
			<Button
				type="primary"
				style="margin-top: 10px; margin-left: 400px"
				@click="sure"
				:disabled="!name || !data"
				>确定</Button
			>
		</Row>
		<Spin fix v-if="loading">
			<div class="loader">
				<svg class="circular" viewBox="25 25 50 50">
					<circle
						class="path"
						cx="50"
						cy="50"
						r="20"
						fill="none"
						stroke-width="5"
						stroke-miterlimit="10"></circle>
				</svg>
			</div>
		</Spin>
	</div>
</template>

<script>
import * as utilsol from '@gis-js/utilsol';
import GeoJSON from 'ol/format/GeoJSON';
import * as proj from 'ol/proj';
import fs from 'fs';
import dayjs from 'dayjs';
import path from 'path';
const format = new GeoJSON();
export default {
	data() {
		return {
			name: '',
			accept: '.shp',
			data: null,
			loading: false,
		};
	},
	mounted() {},
	methods: {
		selectFiles() {
			//加载shapefile文件
			this.getFile(false, (files) => {
				var reader = new FileReader();
				reader.onloadstart = () => {
					this.loading = true;
				};
				reader.onload = (evt) => {
					this.data = format.readFeatures(evt.target.result);
				};
				reader.onloadend = () => {
					this.loading = false;
				};
				reader.readAsText(files[0], 'utf-8');
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
			file.accept = '.json';
			file.multiple = multiple;
			file.onchange = function (event) {
				if (typeof callback == 'function') {
					callback(event.path[0].files);
				}
			};
			file.click();
		},
		sure() {
			let geojson = format.writeFeatures(this.data);
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
