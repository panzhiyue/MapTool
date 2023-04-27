<template>
	<a-layout class="main" v-if="homeStore.ready">
		<a-layout-header class="header">
			<!-- <sys-header></sys-header> -->
			<sys-menu></sys-menu>
			<tool-bar></tool-bar>
		</a-layout-header>
		<a-layout>
			<a-layout-sider
				width="300"
				style="background: #fff"
				class="scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
				<a-collapse>
					<a-collapse-panel key="1" header="图层管理">
						<layer-manager></layer-manager>
					</a-collapse-panel>
					<a-collapse-panel key="2" header="地图管理">
						<map-layer-manager></map-layer-manager>
					</a-collapse-panel>
				</a-collapse>
			</a-layout-sider>
			<a-layout style="padding: 0 6px 6px">
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
import { defineComponent, ref } from 'vue';
import Map from './components/map/index.vue';
import MapLayerManager from './components/map-layer-manager/index.vue';
import LayerManager from './components/layer-manager/index.vue';
import SysHeader from './components/header/index.vue';
import { useHomeStore } from '@/store/home';
import { ipcRenderer } from 'electron';
import ToolBar from './components/tool-bar/index.vue';
import SysMenu from './components/menu/index.vue';
import {
	IExportAttributeTableOptions,
	IExportKneePointTableOptions,
	IExportImageOptions,
	IExportVectorOptions,
	IMeasureOptions,
	IPlotOptions,
	ICreateDistanceTableOptions,
} from '#/index';
import domtoimage from 'dom-to-image';
import path from 'path';
import { getByWhere } from '@/api/mapLayerInfo';
import ResponseResult from '@/utils/db/ResponseResult';
import { IMapLayerInfo } from '#/index';
import { readAsGeoJSON } from '@/api/table';
import { GeoJSON, TopoJSON, WKT } from 'ol/format';
import fs from 'fs';
import { GeoJson2Shp } from '@gis-js/geojson2shp';
import * as TableApi from '@/api/table';
import * as UtilsCommon from '@panzhiyue/utilscommon';
import { notification } from 'ant-design-vue';
import { message } from 'ant-design-vue';
import { Point } from 'ol/geom';
import MeasureType from '@/enum/MeasureType';
import { getArea, getLength } from '@/utils/gis';
import * as turf from '@turf/turf';
import LengthUnits from '@/enum/LengthUnits';
import { Blob } from 'buffer';
import { useCoordinateSystem } from '@/hooks/useCoordinateSystem';
import * as utilsol from '@gis-js/utilsol';
// const gdal = require('gdal-async');
// const gdal = require('gdal');
// console.log(path);
// console.log(gdal);
const { getByAuth } = useCoordinateSystem();

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
		let dom: any = homeStore.map.getTarget();
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

		const result = await getByWhere({ id: options.layerId as number });
		const info = JSON.parse(result.data[0].info);
		const result2 = await readAsGeoJSON(info.table);
		const destSpatialReference = getByAuth(options.destSpatialReference);
		let features = new GeoJSON({
			dataProjection: 'EPSG:4490',
			featureProjection: destSpatialReference.getProjection(),
		}).readFeatures(result2);

		let resultGeojson = new GeoJSON().writeFeatures(features);

		switch (options.format) {
			case 'shp': {
				let g2s = new GeoJson2Shp(JSON.parse(resultGeojson));
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
					fs.writeFileSync(prjPath, destSpatialReference.srtext);
					fs.writeFileSync(cpgPath, 'UTF-8');
				});

				g2s.writePolyline(function (err, files) {
					fs.writeFileSync(shpPath, files.shp);
					fs.writeFileSync(shxPath, files.shx);
					fs.writeFileSync(dbfPath, files.dbf);
					fs.writeFileSync(prjPath, destSpatialReference.srtext);
					fs.writeFileSync(cpgPath, 'UTF-8');
				});

				g2s.writePolygon(function (err, files) {
					fs.writeFileSync(shpPath, files.shp);
					fs.writeFileSync(shxPath, files.shx);
					fs.writeFileSync(dbfPath, files.dbf);
					fs.writeFileSync(prjPath, destSpatialReference.srtext);
					fs.writeFileSync(cpgPath, 'UTF-8');
				});
				break;
			}
			case 'geojson': {
				fs.writeFileSync(options.savePath as string, resultGeojson);
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
		const excelData: any = await excel.xlsx.writeBuffer();
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

	ipcRenderer.on('exportKneePointTable', async (event, options: IExportKneePointTableOptions) => {
		let hide = message.loading({
			content: '正在导出拐点坐标！',
			duration: 0,
		});
		const result = await getByWhere({ id: options.layerId as number });
		console.log(options, result);
		const info = JSON.parse(result.data[0].info);
		const result2 = await readAsGeoJSON(info.table);
		const destSpatialReference = getByAuth(options.destSpatialReference);
		let features = new GeoJSON({
			dataProjection: 'EPSG:4490',
			featureProjection: 'EPSG:4490', // destSpatialReference.getProjection(),
		}).readFeatures(result2);

		let kneePointData = []; //拐点数据列表
		let wkt = new WKT();
		for (let i = 0; i < features.length; i++) {
			let feature = features[i];

			let properties = Object.assign({}, feature.getProperties());
			let flatCoordinate = utilsol.helper.coordinateHelper.getFlatCoordinates(
				feature.getGeometry().getCoordinates(),
			);

			properties.geometry = wkt.writeGeometry(feature.getGeometry());
			for (let flatIndex = 0; flatIndex < flatCoordinate.length; flatIndex += 2) {
				let properties2 = Object.assign({}, properties);
				properties2.KneePointX = flatCoordinate[flatIndex] + '';
				properties2.KneePointY = flatCoordinate[flatIndex + 1] + '';
				kneePointData.push(properties2);
			}
		}
		switch (options.format) {
			case 'xlsx': {
				let excel = UtilsCommon.excel.json2Excel([
					{
						data: kneePointData,
						name: 'sheet1',
						header: true,
					},
				]);
				const excelData: any = await excel.xlsx.writeBuffer();
				const blob = new Blob([excelData], { type: EXCEL_TYPE });
				var buffer = await blob.arrayBuffer();
				fs.writeFileSync(options.savePath as string, new DataView(buffer));
				event.sender.send(`${options.fromWindowName}-close`);
				// utilscommon.excel.download({
				// 	name: 'download',
				// 	worksheets: [
				// 		{
				// 			data: data, //要导出的数据
				// 			name: '属性表', //文件名称
				// 			header: true,
				// 		},
				// 		{
				// 			data: kneePointData, //要导出的数据
				// 			name: '拐点', //文件名称
				// 			header: true,
				// 		},
				// 	],
				// });
				// fs.writeFileSync(options.savePath as string, resultGeojson);
				break;
			}
		}

		event.sender.send(`${options.fromWindowName}-close`);
		hide();
		notification.success({
			message: `导出拐点坐标！`,
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

	ipcRenderer.on('createDistanceTable', async (e, options: ICreateDistanceTableOptions) => {
		e.sender.send(`${options.fromWindowName}-hide`);
		let hide = message.loading({
			content: '正在生成距离表！',
			duration: 0,
		});

		const mapLayerInfo1 = await getByWhere({ id: options.layerId1 });
		const info1 = JSON.parse(mapLayerInfo1.data[0].info);
		const layerResult1 = await readAsGeoJSON(info1.table);
		let features1 = new GeoJSON().readFeatures(layerResult1);

		const mapLayerInfo2 = await getByWhere({ id: options.layerId2 });
		const info2 = JSON.parse(mapLayerInfo2.data[0].info);
		const layerResult2 = await readAsGeoJSON(info2.table);
		let features2 = new GeoJSON().readFeatures(layerResult2);

		let result = [];
		for (let i = 0; i < features1.length; i++) {
			let tempResults = [];
			for (let j = 0; j < features2.length; j++) {
				let feature1 = features1[i];
				let feature2 = features2[j];
				// console.log(i, j, feature1, feature2);
				let turfObj1 = new GeoJSON().writeFeature(feature1);
				let turfObj2 = new GeoJSON().writeFeature(feature2);

				let distance = turf.distance(JSON.parse(turfObj1), JSON.parse(turfObj2), {
					units: LengthUnits.米,
				});
				if (distance <= turf.convertLength(options.radius, options.radiusUnit, LengthUnits.米)) {
					let tempResult = {};
					JSON.parse(options.layerFields1).forEach((item) => {
						tempResult[item.destName] = feature1.get(item.originName);
					});

					JSON.parse(options.layerFields2).forEach((item) => {
						tempResult[item.destName] = feature2.get(item.originName);
					});
					tempResult['calc_distance'] = distance;
					tempResults.push(tempResult);
				}
			}

			tempResults = tempResults.sort((item1, item2) => {
				return item1.calc_distance - item2.calc_distance;
			});
			// console.log(tempResults);
			tempResults = tempResults.slice(0, options.maxCount);
			result = result.concat(tempResults);
		}
		// result = result.filter((item) => {
		// 	return item.in_bh != item.out_bh;
		// });

		let excel = UtilsCommon.excel.json2Excel([
			{
				data: result,
				name: 'sheet1',
				header: true,
			},
		]);
		const excelData: any = await excel.xlsx.writeBuffer();
		const blob = new Blob([excelData], { type: EXCEL_TYPE });
		var buffer = await blob.arrayBuffer();
		fs.writeFileSync(options.savePath as string, new DataView(buffer));
		e.sender.send(`${options.fromWindowName}-close`);
		hide();
		notification.success({
			message: `生成距离表！`,
			duration: 5,
		});
	});
});
</script>
<style>
.main {
	width: 100%;
	height: 100%;
}

.ant-layout-header {
	background-color: rgba(255, 255, 255, 1);
	padding: 0px;
	margin: 0px;
	height: 60px;
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
