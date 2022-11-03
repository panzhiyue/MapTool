<template>
	<a-layout class="main" v-if="homeStore.mapInfo">
		<a-layout-header class="header">
			<sys-header></sys-header>
			<sys-menu></sys-menu>
			<tool-bar></tool-bar>
		</a-layout-header>
		<a-layout>
			<a-layout-sider
				width="300"
				style="background: #fff"
				class="scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
				<a-collapse>
					<a-collapse-Panel key="1" header="图层管理">
						<layer-manager></layer-manager>
					</a-collapse-Panel>
					<a-collapse-Panel key="2" header="地图管理">
						<map-layer-manager></map-layer-manager>
					</a-collapse-Panel>
				</a-collapse>
			</a-layout-sider>
			<a-layout style="padding: 0 24px 24px">
				<a-layout-content
					:style="{
						background: '#fff',
						margin: 0,
						minHeight: '280px',
					}">
					<Map></Map>
				</a-layout-content>
			</a-layout>
		</a-layout>
	</a-layout>
</template>
<script setup lang="ts">
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons-vue';
import { defineComponent, ref } from 'vue';
import Map from './components/map/index.vue';
import MapLayerManager from './components/map-layer-manager/index.vue';
import LayerManager from './components/layer-manager/index';
import SysHeader from './components/header/index';
import { useHomeStore } from '@/store/home';
import { ipcRenderer } from 'electron';
import ToolBar from './components/tool-bar/index.vue';
import SysMenu from './components/menu/index.vue';
import {
	IExportAttributeTableOptions,
	IExportImageOptions,
	IExportVectorOptions,
	IMeasureOptions,
	IPlotOptions,
} from '#/index';
import domtoimage from 'dom-to-image';
import path from 'path';
import { getByWhere } from '@/api/mapLayerInfo';
import ResponseResult from '@/utils/db/ResponseResult';
import { IMapLayerInfo } from '#/index';
import ResponseCode from '@/enum/ResponseCode';
import { readAsGeoJSON } from '@/api/table';
import { GeoJSON, TopoJSON } from 'ol/format';
import fs from 'fs';
import { GeoJson2Shp } from '@gis-js/geojson2shp';
import * as TableApi from '@/api/table';
import * as UtilsCommon from '@panzhiyue/utilscommon';
import { notification } from 'ant-design-vue';
import { message } from 'ant-design-vue';
import { Point } from 'ol/geom';
import MeasureType from '@/enum/MeasureType';
import { getArea, getLength } from '@/utils/gis';

let homeStore = useHomeStore();

const selectedKeys1 = ref(['2']);
const selectedKeys2 = ref(['1']);
const collapsed = ref(false);
const openKeys = ref(['sub1']);

onMounted(() => {
	homeStore.initData('1');

	ipcRenderer.on('refresh-mapLayerInfo', () => {
		homeStore.getMapLayerInfos(1).then(() => {});
	});

	ipcRenderer.on('refresh-layerInfo', () => {
		homeStore.getLayerInfos(1).then(() => {});
	});

	ipcRenderer.on('exportImage', async (event, options: IExportImageOptions) => {
		let hide = message.loading({
			content: '正在导出图片！',
			duration: 0,
		});
		let dom = homeStore.map.getTarget() as HTMLElement;
		if (options.control == false) {
			dom = dom.getElementsByClassName('ol-layers')[0];
		}
		let funcEnu = {
			png: domtoimage.toPng,
			jpg: domtoimage.toJpeg,
		};

		const imgData = await funcEnu[options.format](dom, { quality: 0.95 });
		var base64 = imgData.split(',')[1]; //去掉图片base64码前面部分data:image/png;base64
		const imageBuffer = new Buffer(base64, 'base64');
		fs.writeFileSync(options.path as string, imageBuffer);
		event.sender.send(`${options.fromWindowName}-close`);
		hide();
		notification.success({
			message: `导出图片！`,
			duration: 5,
		});
	});

	ipcRenderer.on('exportVector', async (event, options: IExportVectorOptions) => {
		let hide = message.loading({
			content: '正在导出矢量！',
			duration: 0,
		});

		const result = await getByWhere({ id: options.layerId as Number });
		const info = JSON.parse(result.data[0].info);
		const result2 = await readAsGeoJSON(info.table);
		let features = new GeoJSON().readFeatures(result2);
		switch (options.format) {
			case 'shp': {
				let g2s = new GeoJson2Shp(result2);
				const shpPath: string = options.savePath as string;
				const dirPath = path.dirname(shpPath);
				const fileName = path.basename(shpPath, '.shp');

				const cpgPath = path.join(dirPath, fileName + '.cpg');
				const dbfPath = path.join(dirPath, fileName + '.dbf');
				const prjPath = path.join(dirPath, fileName + '.prj');
				const shxPath = path.join(dirPath, fileName + '.shx');

				g2s.writePoint(function (err, files) {
					fs.writeFileSync(shpPath, files.shp);
					fs.writeFileSync(shxPath, files.shx);
					fs.writeFileSync(dbfPath, files.dbf);
					fs.writeFileSync(
						prjPath,
						`GEOGCS["GCS_WGS_1984",DATUM["D_WGS_1984",SPHEROID["WGS_1984",6378137.0,298.257223563]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433],AUTHORITY["EPSG",4326]]`,
					);
					fs.writeFileSync(cpgPath, 'UTF-8');
				});

				g2s.writePolyline(function (err, files) {
					fs.writeFileSync(shpPath, files.shp);
					fs.writeFileSync(shxPath, files.shx);
					fs.writeFileSync(dbfPath, files.dbf);
					fs.writeFileSync(
						prjPath,
						`GEOGCS["GCS_WGS_1984",DATUM["D_WGS_1984",SPHEROID["WGS_1984",6378137.0,298.257223563]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433],AUTHORITY["EPSG",4326]]`,
					);
					fs.writeFileSync(cpgPath, 'UTF-8');
				});

				g2s.writePolygon(function (err, files) {
					fs.writeFileSync(shpPath, files.shp);
					fs.writeFileSync(shxPath, files.shx);
					fs.writeFileSync(dbfPath, files.dbf);
					fs.writeFileSync(
						prjPath,
						`GEOGCS["GCS_WGS_1984",DATUM["D_WGS_1984",SPHEROID["WGS_1984",6378137.0,298.257223563]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433],AUTHORITY["EPSG",4326]]`,
					);
					fs.writeFileSync(cpgPath, 'UTF-8');
				});
				break;
			}
			case 'geojson': {
				fs.writeFileSync(options.savePath as string, JSON.stringify(result2));
				break;
			}
			case 'topojson': {
				fs.writeFileSync(
					options.savePath as string,
					JSON.stringify(new TopoJSON().writeFeatures(features)),
				);
				break;
			}
		}

		event.sender.send(`${options.fromWindowName}-close`);
		hide();
		notification.success({
			message: `导出矢量！`,
			duration: 5,
		});
	});

	const EXCEL_TYPE =
		'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

	ipcRenderer.on('exportAttributeTable', async (event, options: IExportAttributeTableOptions) => {
		let hide = message.loading({
			content: '正在导出属性表！',
			duration: 0,
		});
		const result: ResponseResult<IMapLayerInfo[]> = await getByWhere({
			id: options.layerId as number,
		});
		let info = JSON.parse(result.data[0].info);
		const result2: ResponseResult<any> = await TableApi.getByWhere(info.table, {});
		let data = result2.data;
		data.forEach((item) => {
			delete item.geom_wkt;
		});
		let excel = UtilsCommon.excel.json2Excel([
			{
				data: data,
				name: 'sheet1',
				header: options.header,
			},
		]);
		const excelData = await excel.xlsx.writeBuffer();
		const blob = new Blob([excelData], { type: EXCEL_TYPE });
		var buffer = await blob.arrayBuffer();
		fs.writeFileSync(options.savePath as string, new DataView(buffer));
		event.sender.send(`${options.fromWindowName}-close`);
		hide();
		notification.success({
			message: `导出属性表！`,
			duration: 5,
		});
	});

	ipcRenderer.on('panTo', (e, lng, lat) => {
		homeStore.map.getView().fit(new Point([lng, lat]), {
			maxZoom: homeStore.map.getView().getZoom(),
			duration: 1000,
		});
	});

	ipcRenderer.on('zoomTo', (e, lng, lat, zoom) => {
		homeStore.map.getView().fit(new Point([lng, lat]), {
			maxZoom: zoom,
			duration: 1000,
		});
	});

	ipcRenderer.on('measure', (e, options: IMeasureOptions) => {
		homeStore.setMeasureType(options.type);
		homeStore.setMeasureCallback((geometry) => {
			let result = [];
			if (options.type == MeasureType.LINESTRING) {
				result.push({
					label: '长度',
					value: getLength(geometry) + '米',
				});
			} else if (options.type == MeasureType.POLYGON) {
				result.push({
					label: '周长',
					value: getLength(geometry) + '米',
				});

				result.push({
					label: '面积',
					value: getArea(geometry) + '平方米',
				});
			}

			ipcRenderer.sendTo(options.fromWindowId, 'measure-result', result);
		});
	});

	ipcRenderer.on('plot', (e, options: IPlotOptions) => {
		homeStore.setPlotType(options.type);
	});
});
</script>
<style>
.main {
	width: 100%;
	height: 100%;
}

.ant-layout-header {
	background-color: rgba(0, 0, 0, 0);
	padding: 0px;
	margin: 0px;
	height: 80px;
}

/* 
.ant-row-rtl #components-layout-demo-top-side-2 .logo {
  float: right;
  margin: 16px 0 16px 24px;
} */

/* .site-layout-background {
  background: #fff;
} */
</style>
