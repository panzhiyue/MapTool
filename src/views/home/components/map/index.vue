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
    <div v-for="(layer, index) in mapLayer" :key="index">
      <vue2ol-layer-tile
        v-if="layer.info.type === 'TDT'"
        :visible="layer.checked"
        :options="{ sysId: layer.nodeKey }"
      >
        <vue2ol-source-tdt :layer="layer.info.layer"></vue2ol-source-tdt>
      </vue2ol-layer-tile>

      <vue2ol-layer-tile
        v-else-if="layer.info.type === 'BaiDu'"
        :visible="layer.checked"
        :options="{ sysId: layer.nodeKey }"
      >
        <vue2ol-source-baidu :layer="layer.info.layer"></vue2ol-source-baidu>
      </vue2ol-layer-tile>

      <vue2ol-layer-tile
        v-else-if="layer.info.type === 'GaoDe'"
        :visible="layer.checked"
        :options="{ sysId: layer.nodeKey }"
      >
        <vue2ol-source-gaode :layer="layer.info.layer"></vue2ol-source-gaode>
      </vue2ol-layer-tile>

      <vue2ol-layer-tile
        v-else-if="layer.info.type === 'Geoq'"
        :visible="layer.checked"
        :options="{ sysId: layer.nodeKey }"
      >
        <vue2ol-source-geoq :layer="layer.info.layer"></vue2ol-source-geoq>
      </vue2ol-layer-tile>

      <!-- <vue2ol-layer-vector
        v-else-if="layer.layerInfo.type === 'vector'"
        :visible="layer.checked"
        :options="{ sysId: layer.nodeKey }"
      >
        <vue2ol-source-vector
          :features="layer.layerInfo.path | readeGeoJSON"
        ></vue2ol-source-vector>
      </vue2ol-layer-vector> -->
      <vue2ol-layer-tile
        v-else-if="layer.info.type === 'wmts'"
        :visible="layer.checked"
      >
        <vue2ol-source-xyz
          :url="layer.info.url"
          :projection="'EPSG:4326'"
        ></vue2ol-source-xyz>
      </vue2ol-layer-tile>
    </div>
  </vue2ol-map>
</template>
<script setup lang="ts">
import GeoJSON from "ol/format/GeoJSON";
import { useHomeStore } from "@/store/home";
import { getById, updateById } from "@/api/mapInfo";
import { IMapInfo, IMapLayerInfo } from "types";
import { MapEvent } from "ol";
import { ComputedRef, Ref } from "vue";
let homeStore = useHomeStore();
const format = ref(new GeoJSON());

const mapOptions = reactive({
  controls: [],
});

const viewOptions = reactive({
  projection: "EPSG:4326",
});

// const format = new GeoJSON();

const mapLayer = computed(() => {
  return homeStore.mapLayerInfos.map((item: IMapLayerInfo) => {
    return {
      ...item,
      checked: item.checked ? true : false,
    };
  });
});

const mapInfo: ComputedRef<IMapInfo|null> = computed(() => {
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
  updateById(info).then((result) => {
    console.log(result);
  });

  homeStore.setMapInfo(info);
};
</script>
<style lang="less" scoped></style>
