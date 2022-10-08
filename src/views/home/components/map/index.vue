<template>
  <vue2ol-map
    v-if="mapInfo"
    :options="mapOptions"
    @ready="handleMapReady"
    @moveend="handleMapMoveEnd"
  >
    <vue2ol-view
      :zoom="mapInfo.zoom"
      :center="[mapInfo.centerx, mapInfo.centery]"
      :options="viewOptions"
    ></vue2ol-view>
    <div v-for="layer in mapLayer" :key="layer.id.toString()">
      <vue2ol-layer-tile
        v-if="layer.info.type === 'TDT'"
        :visible="layer.checked"
        :options="{ sysId: layer.id }"
      >
        <vue2ol-source-tdt
          :layer="layer.info.layer"
          @init="onSourceInit"
        ></vue2ol-source-tdt>
      </vue2ol-layer-tile>

      <vue2ol-layer-tile
        v-else-if="layer.info.type === 'BaiDu'"
        :visible="layer.checked"
        :options="{ sysId: layer.id }"
      >
        <vue2ol-source-baidu
          :layer="layer.info.layer"
          @init="onSourceInit"
        ></vue2ol-source-baidu>
      </vue2ol-layer-tile>

      <vue2ol-layer-tile
        v-else-if="layer.info.type === 'GaoDe'"
        :visible="layer.checked"
        :options="{ sysId: layer.id }"
      >
        <vue2ol-source-gaode
          :layer="layer.info.layer"
          @init="onSourceInit"
        ></vue2ol-source-gaode>
      </vue2ol-layer-tile>

      <vue2ol-layer-tile
        v-else-if="layer.info.type === 'Geoq'"
        :visible="layer.checked"
        :options="{ sysId: layer.id }"
      >
        <vue2ol-source-geoq
          :layer="layer.info.layer"
          @init="onSourceInit"
        ></vue2ol-source-geoq>
      </vue2ol-layer-tile>

      <vector-layer
        v-else-if="layer.info.type === 'vector'"
        :visible="layer.checked"
        :options="{ sysId: layer.id }"
        :tableName="layer.info.table"
      >
      </vector-layer>
      <vue2ol-layer-tile
        v-else-if="layer.info.type === 'wmts'"
        :visible="layer.checked"
      >
        <vue2ol-source-xyz
          :url="layer.info.url"
          :projection="'EPSG:4326'"
          @init="onSourceInit"
        ></vue2ol-source-xyz>
      </vue2ol-layer-tile>

      <vue2ol-layer-image
        v-else-if="layer.info.type === 'ImageArcGISRest'"
        :visible="layer.checked"
      >
        <vue2ol-source-imagearcgisrest
          :url="layer.info.url"
          :projection="'EPSG:4326'"
        ></vue2ol-source-imagearcgisrest>
      </vue2ol-layer-image>
    </div>
    <status-bar></status-bar>
  </vue2ol-map>
</template>
<script setup lang="ts">
import GeoJSON from "ol/format/GeoJSON";
import { useHomeStore } from "@/store/home";
import { getById, updateById } from "@/api/mapInfo";
import { IMapInfo, IMapLayerInfo } from "types";
import { MapEvent } from "ol";
import { ComputedRef, Ref } from "vue";
import VectorLayer from "./components/vector-layer.vue";
import StatusBar from "@/components/status-bar/index";

let homeStore = useHomeStore();
const format = ref(new GeoJSON());

const mapOptions = reactive({
  controls: [],
});

const viewOptions = reactive({
  projection: "EPSG:4326",
});

// const format = new GeoJSON();

const mapLayer: ComputedRef<IMapLayerInfo[]> = computed(() => {
  return homeStore.mapLayerInfos.map((item: IMapLayerInfo) => {
    return {
      ...item,
      checked: item.checked ? true : false,
    };
  });
});

onMounted(() => {});

const mapInfo: ComputedRef<IMapInfo | null> = computed(() => {
  return homeStore.mapInfo;
});

const handleMapReady = (mapObject: any) => {
  mapObject.updateSize();
  homeStore.setMap(mapObject);
};

const handleMapMoveEnd = (e: MapEvent) => {
  let center: Number[] = e.target.getView().getCenter();
  let zoom: Number = e.target.getView().getZoom();

  let info: IMapInfo = {
    ...mapInfo.value,
    centerx: center[0],
    centery: center[1],
    zoom,
  };
  updateById(info).then((result) => {});

  homeStore.setMapInfo(info);
};

const onSourceInit = (source) => {
  source.setTileLoadFunction((tile, src) => {
    tile.getImage().src = src;
    tile.getImage().crossOrigin = "*";
  });
};
</script>
<style lang="less" scoped>
.vue2ol-map {
  position: relative;
}
</style>
