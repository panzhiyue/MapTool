<template>
	<vue2ol-map
		v-if="viewOptions"
		:options="mapOptions"
		@ready="handleMapReady"
		@moveend="handleMapMoveEnd">
		<vue2ol-view
			:zoom="mapInfo.zoom"
			:center="[mapInfo.centerx, mapInfo.centery]"
			:options="viewOptions"></vue2ol-view>
		<template v-if="isReady">
			<vue2ol-renderer-canvasclip :polygon="mapOptions.clipPolygon"></vue2ol-renderer-canvasclip>

			<div v-for="(layer, index) in mapLayer" :key="layer.id.toString()">
				<vue2ol-layer-tile
					v-if="layer.info.type === 'TDT'"
					:visible="layer.checked"
					:options="{ sysId: layer.id }"
					:zIndex="index">
					<vue2ol-source-tdt
						:layer="layer.info.layer"
						:options="{ maxZoom: layer.info.maxZoom, minZoom: layer.info.minZoom }"
						@init="onSourceInit"></vue2ol-source-tdt>
				</vue2ol-layer-tile>

				<vue2ol-layer-tile
					v-else-if="layer.info.type === 'BaiDu'"
					:visible="layer.checked"
					:options="{ sysId: layer.id }"
					:zIndex="index">
					<vue2ol-source-baidu
						:layer="layer.info.layer"
						:projection="viewOptions.projection"
						:options="{ maxZoom: layer.info.maxZoom, minZoom: layer.info.minZoom }"
						@init="onSourceInit"></vue2ol-source-baidu>
				</vue2ol-layer-tile>

				<vue2ol-layer-tile
					v-else-if="layer.info.type === 'GaoDe'"
					:visible="layer.checked"
					:options="{ sysId: layer.id }"
					:zIndex="index">
					<vue2ol-source-gaode
						:layer="layer.info.layer"
						:projection="viewOptions.projection"
						:options="{ maxZoom: layer.info.maxZoom, minZoom: layer.info.minZoom }"
						@init="onSourceInit"></vue2ol-source-gaode>
				</vue2ol-layer-tile>

				<vue2ol-layer-tile
					v-else-if="layer.info.type === 'Geoq'"
					:visible="layer.checked"
					:options="{ sysId: layer.id }"
					:zIndex="index">
					<vue2ol-source-geoq
						:layer="layer.info.layer"
						:projection="viewOptions.projection"
						:options="{ maxZoom: layer.info.maxZoom, minZoom: layer.info.minZoom }"
						@init="onSourceInit"></vue2ol-source-geoq>
				</vue2ol-layer-tile>

				<vector-layer
					v-else-if="layer.info.type === 'vector'"
					:visible="layer.checked"
					:options="{ sysId: layer.id }"
					:tableName="layer.info.table"
					:zIndex="index"
					:style-obj="getStyle(layer.info)"
					:dataProjection="'EPSG:4490'"
					:featureProjection="viewOptions.projection">
				</vector-layer>
				<vue2ol-layer-tile
					v-else-if="layer.info.type === 'wmts'"
					:visible="layer.checked"
					:zIndex="index">
					<vue2ol-source-xyz
						:url="layer.info.url"
						:projection="viewOptions.projection"
						@init="onSourceInit"></vue2ol-source-xyz>
				</vue2ol-layer-tile>

				<vue2ol-layer-image
					v-else-if="layer.info.type === 'ImageArcGISRest'"
					:visible="layer.checked"
					:zIndex="index">
					<vue2ol-source-imagearcgisrest
						:projection="viewOptions.projection"></vue2ol-source-imagearcgisrest>
				</vue2ol-layer-image>

				<grid-layer v-if="showGrid" :zIndex="9999"></grid-layer>
			</div>
			<!-- <edit v-if="mapToolStore.editLayerId"></edit> -->
			<status-bar v-show="mapToolStore.config.isShowStatusbar"></status-bar>
			<div v-if="measureType">
				<vue2ol-interaction-measure :type="measureType" :active="true"></vue2ol-interaction-measure>
				<!-- <vue2ol-layer-vector :zIndex="901">
					<vue2ol-source-vector>
						<vue2ol-interaction-draw
							:type="measureType"
							:active="true"
							@drawend="handleMeasureDrawEnd"></vue2ol-interaction-draw>
					</vue2ol-source-vector>
				</vue2ol-layer-vector> -->
			</div>
			<div v-if="plotType">
				<vue2ol-layer-vector :zIndex="901">
					<vue2ol-source-vector>
						<vue2ol-interaction-plotdraw
							:type="plotType"
							:active="true"></vue2ol-interaction-plotdraw>
					</vue2ol-source-vector>
				</vue2ol-layer-vector>
			</div>
			<vue2ol-interaction-dragpan v-if="mapInfo.pan" :active="true"></vue2ol-interaction-dragpan>
			<vue2ol-interaction-dragzoom
				v-if="mapToolStore.mapInfo.dragZoomIn"
				:active="true"
				:options="{
					condition: () => {
						return true;
					},
				}"></vue2ol-interaction-dragzoom>
			<vue2ol-interaction-dragzoom
				v-if="mapInfo.dragZoomOut"
				:active="true"
				:options="{
					out: true,
					condition: () => {
						return true;
					},
				}"></vue2ol-interaction-dragzoom>
			<vue2ol-interaction-doubleclickzoom
				v-if="mapInfo.doubleclickzoom"
				:active="!measureType"></vue2ol-interaction-doubleclickzoom>
			<vue2ol-interaction-mousewheelzoom
				v-if="mapInfo.mousewheelzoom"
				:active="true"></vue2ol-interaction-mousewheelzoom>
			<vue2ol-interaction-select v-if="mapInfo.select" :active="true"></vue2ol-interaction-select>
		</template>
	</vue2ol-map>
</template>
<script setup lang="ts">
import GeoJSON from 'ol/format/GeoJSON';
import { useMapToolStore } from '@/store/mapTool';
import { IMapInfo, IMapLayerInfo } from 'types';
import { MapEvent } from 'ol';
import { ComputedRef, Ref } from 'vue';
import VectorLayer from './components/vector-layer.vue';
import StatusBar from '@/components/status-bar/index';
import GridLayer from './components/grid-layer.vue';
import { getOLStyle } from '@/utils/style';
import { useCoordinateSystem } from '@/hooks/useCoordinateSystem';
// import Edit from '../edit/index';

const { getByAuth } = useCoordinateSystem();
let proj = getByAuth('EPSG:4490').getProjection();
let mapToolStore = useMapToolStore();
const format = ref(new GeoJSON());
const mapOptions = reactive({
	controls: [],
	interactions: [],
	clipPolygon: null,
});
const viewOptions = reactive({
	projection: getByAuth(mapToolStore.mapInfo.srs).getProjection(),
});

const mapLayer: ComputedRef<IMapLayerInfo[]> = computed(() => {
	return mapToolStore.mapLayerInfos.map((item: IMapLayerInfo) => {
		return {
			...item,
			checked: item.checked ? true : false,
		};
	});
});

onMounted(() => {});

const mapInfo: ComputedRef<IMapInfo | null> = computed(() => {
	return mapToolStore.mapInfo;
});
const isReady = ref(false);
const handleMapReady = (mapObject: any) => {
	mapObject.updateSize();
	mapToolStore.setMap(mapObject);
	isReady.value = true;
};

const handleMapMoveEnd = (e: MapEvent) => {
	let center: number[] = e.target.getView().getCenter();
	let zoom: number = e.target.getView().getZoom();

	let info: IMapInfo = {
		...mapInfo.value,
		centerx: center[0],
		centery: center[1],
		zoom,
	};

	mapToolStore.setMapInfo(info);
};

const onSourceInit = (source) => {
	source.setTileLoadFunction((tile, src) => {
		tile.getImage().src = src;
		tile.getImage().crossOrigin = '*';
	});
};

const measureType = computed(() => {
	return mapToolStore.measureType;
});

const handleMeasureDrawEnd = (event) => {
	event.target.source_.clear();
	if (mapToolStore.measureCallback) {
		mapToolStore.measureCallback(event.feature.getGeometry());
	}
};

const plotType = computed(() => {
	return mapToolStore.plotType;
});

const showGrid = computed(() => {
	return mapToolStore.showGrid;
});

const getStyle = (info) => {
	let styles = info.styles.map((item) => {
		return getOLStyle(item);
	});
	return styles;
};
</script>
<style lang="less" scoped>
.vue2ol-map {
	position: relative;
}
</style>
