import { defineStore } from "pinia";
import { getList as getLayerInfoList } from "@/api/layerInfo";
import { getList as getMapLayerInfoList } from "@/api/mapLayerInfo";
import { getById as getMapInfoById } from "@/api/mapInfo";
import olMap from "ol/Map"
import Collection from "ol/Collection"
import BaseLayer from "ol/layer/Base"
import { ILayerInfo, IMapInfo, IMapLayerInfo, Nullable } from "types";

interface IState {
  map: Nullable<olMap>,
  mapInfo: Nullable<IMapInfo>,
  layerInfos: ILayerInfo[],
  mapLayerInfos: IMapLayerInfo[]
}

export const useHomeStore = defineStore({
  id: "home",
  state: (): IState => ({
    map: null,
    mapInfo: null,
    layerInfos: [],
    mapLayerInfos: [],
  }),
  actions: {
    setMap(data: Nullable<olMap>) {
      this.map = data;
    },
    setMapInfo(data: IMapInfo) {
      this.mapInfo = data;
    },
    async getMapInfo(mapId: Number, callback?: Function) {
      getMapInfoById(1).then((result) => {
        console.log(result);
        this.mapInfo = result.data;
        if (callback instanceof Function) {
          callback();
        }
      });
    },
    setLayerInfos(data: ILayerInfo[]) {
      this.layerInfos = data;
    },
    async getLayerInfos(mapId: Number, callback?: Function) {
      getLayerInfoList(mapId).then((result) => {
        this.layerInfos = result.data;
        if (callback instanceof Function) {
          callback();
        }
      });
    },
    setMapLayerInfos(data: IMapLayerInfo[]) {
      this.mapLayerInfos = data;
    },
    async getMapLayerInfos(mapId: Number, callback?: Function) {
      getMapLayerInfoList(mapId).then((result) => {
        console.log(result);
        this.mapLayerInfos = result.data;
        if (callback instanceof Function) {
          callback();
        }
      });
    },
    async initData(mapId: Number) {
      await this.getMapInfo(mapId);
      await this.getLayerInfos(mapId);
      await this.getMapLayerInfos(mapId);
    },
    getLayerBySysId(layerId: any) {
      if (!layerId) {
        return null;
      }
      let lyr = null;
      let layers: Nullable<Collection<BaseLayer>> = this.map?.getLayers();
      layers?.forEach((layer, index) => {
        if (layer.get("sysId") == layerId) {
          lyr = layer;
        }
      });
      return lyr;
    },
  },
});
