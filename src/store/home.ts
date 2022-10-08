import { defineStore } from "pinia";
import { getList as getLayerInfoList } from "@/api/layerInfo";
import { getList as getMapLayerInfoList } from "@/api/mapLayerInfo";
import { getById as getMapInfoById } from "@/api/mapInfo";
import olMap from "ol/Map"
import Collection from "ol/Collection"
import BaseLayer from "ol/layer/Base"
import { ILayerInfo, IMapInfo, IMapLayerInfo, Nullable, Undefinerable } from "types";

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
    async getMapInfo(mapId: Number): Promise<IMapInfo> {
      return new Promise((inject, reject) => {
        getMapInfoById(mapId).then((result) => {
          this.mapInfo = result.data;
          inject(this.mapInfo);
        }).catch((err) => {
          reject(err);
        });
      })
    },
    setLayerInfos(data: ILayerInfo[]) {
      this.layerInfos = data;
    },
    async getLayerInfos(mapId: Number): Promise<ILayerInfo[]> {
      return new Promise((inject, reject) => {
        getLayerInfoList(mapId).then((result) => {
          this.layerInfos = result.data;
          inject(this.layerInfos);
        }).catch((err) => {
          reject(err);
        });
      })

    },
    setMapLayerInfos(data: IMapLayerInfo[]) {
      this.mapLayerInfos = data;
    },
    async getMapLayerInfos(mapId: Number): Promise<IMapLayerInfo[]> {
      return new Promise((inject, reject) => {
        getMapLayerInfoList(mapId).then((result) => {
          this.mapLayerInfos = result.data;
          inject(this.mapLayerInfos);
        }).catch((err) => {
          reject(err);
        });
      })
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
      let layers: Undefinerable<Collection<BaseLayer>> = this.map?.getLayers();
      layers?.forEach((layer, index) => {
        if (layer.get("sysId") == layerId) {
          lyr = layer;
        }
      });
      return lyr;
    },
  },
});
