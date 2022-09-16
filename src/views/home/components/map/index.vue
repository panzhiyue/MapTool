<template>
  <vue2ol-map :options="mapOptions" @ready="onReady" @moveend="onMoveEnd">
    <vue2ol-view
      :zoom="mapInfo.zoom"
      :center="mapInfo.center"
      :options="viewOptions"
    ></vue2ol-view>
    <div v-for="(layer, index) in mapLayer" :key="index">
      <vue2ol-layer-tile
        v-if="layer.layerInfo.type === 'TDT'"
        :visible="layer.checked"
        :options="{ sysId: layer.nodeKey }"
      >
        <vue2ol-source-tdt :layer="layer.layerInfo.layer"></vue2ol-source-tdt>
      </vue2ol-layer-tile>

      <vue2ol-layer-tile
        v-else-if="layer.layerInfo.type === 'BaiDu'"
        :visible="layer.checked"
        :options="{ sysId: layer.nodeKey }"
      >
        <vue2ol-source-baidu
          :layer="layer.layerInfo.layer"
        ></vue2ol-source-baidu>
      </vue2ol-layer-tile>

      <vue2ol-layer-tile
        v-else-if="layer.layerInfo.type === 'GaoDe'"
        :visible="layer.checked"
        :options="{ sysId: layer.nodeKey }"
      >
        <vue2ol-source-gaode
          :layer="layer.layerInfo.layer"
        ></vue2ol-source-gaode>
      </vue2ol-layer-tile>

      <vue2ol-layer-tile
        v-else-if="layer.layerInfo.type === 'Geoq'"
        :visible="layer.checked"
        :options="{ sysId: layer.nodeKey }"
      >
        <vue2ol-source-geoq :layer="layer.layerInfo.layer"></vue2ol-source-geoq>
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
        v-else-if="layer.layerInfo.type === 'wmts'"
        :visible="layer.checked"
      >
        <vue2ol-source-xyz
          :url="layer.layerInfo.url"
          :projection="'EPSG:4326'"
        ></vue2ol-source-xyz>
      </vue2ol-layer-tile>
    </div>
  </vue2ol-map>
</template>
<script>
import path from 'path'
import GeoJSON from 'ol/format/GeoJSON'
import fs from 'fs'
import { useMapLayerStore } from '@/store/MapLayer.js'
import { useHomeStore } from '@/store/home.js'
let mapLayerStore = null
let homeStore = null
let format = new GeoJSON()
export default {
  data() {
    return {
      mapOptions: {
        controls: []
      },
      viewOptions: {
        projection: 'EPSG:4326'
      },
      format: new GeoJSON()
    }
  },
  filters: {
    readeGeoJSON(value) {
      let dataPath = path.join(__static, value)
      let geojson = fs.readFileSync(dataPath, 'utf-8')
      let features = format.readFeatures(geojson)
      return features
    }
  },
  computed: {
    mapLayer() {
      console.log(mapLayerStore.mapLayer);
      return mapLayerStore.mapLayer
    },
    mapInfo() {
      return homeStore.mapInfo
    }
  },
  created() {
    mapLayerStore = useMapLayerStore()
    homeStore = useHomeStore()
  },
  mounted() {
    // homeStore.setZoom(this.mapInfo.zoom);
    // homeStore.setCenter(this.mapInfo.center);
  },
  methods: {
    onReady(mapObject) {
      mapObject.updateSize()
      homeStore.setMap(mapObject)
    },
    onMoveEnd(e) {
      let center = e.target.getView().getCenter()
      let zoom = e.target.getView().getZoom()
      homeStore.setMapInfo({
        ...this.mapInfo,
        center,
        zoom
      })
    }
  }
}
</script>
<style lang="less" scoped></style>
