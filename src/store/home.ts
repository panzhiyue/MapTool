import { defineStore } from "pinia";
import { getList as getLayerInfoList } from "@/api/layerInfo";
import { getList as getMapLayerInfoList } from "@/api/mapLayerInfo";
import { getById as getMapInfoById } from "@/api/mapInfo";
import olMap from "ol/Map"
import Collection from "ol/Collection"
import BaseLayer from "ol/layer/Base"
import { ILayerInfo, IMapInfo, IMapLayerInfo, Nullable, Undefinerable } from "types";
import MeasureType from "@/enum/MeasureType";

interface IState {
  map: Nullable<olMap>,
  mapInfo: Nullable<IMapInfo>,
  layerInfos: ILayerInfo[],
  mapLayerInfos: IMapLayerInfo[],
  measureType: MeasureType,
  measureCallback: Function,
  plotType: string,
  showGrid: boolean,
}

export const useHomeStore = defineStore({
  id: "home",
  state: (): IState => ({
    map: null,
    mapInfo: null,
    layerInfos: [],
    mapLayerInfos: [],
    measureType: null,
    measureCallback: null,
    plotType: null,
    showGrid: false
  }),
  actions: {
    setMap(data: Nullable<olMap>) {
      this.map = data;
    },
    setMapInfo(data: IMapInfo) {
      this.mapInfo = data;
    },
    async getMapInfo(mapId: string | number): Promise<IMapInfo> {
      return new Promise((inject, reject) => {
        getMapInfoById(mapId).then((result) => {
          this.mapInfo = result.data;
          console.log(result);
          inject(this.mapInfo);
        }).catch((err) => {
          reject(err);
        });
      })
    },
    setLayerInfos(data: ILayerInfo[]) {
      this.layerInfos = data;
    },
    async getLayerInfos(mapId: string | number): Promise<ILayerInfo[]> {
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
    async getMapLayerInfos(mapId: string | number): Promise<IMapLayerInfo[]> {
      return new Promise((inject, reject) => {
        getMapLayerInfoList(mapId).then((result) => {
          this.mapLayerInfos = result.data;
          inject(this.mapLayerInfos);
        }).catch((err) => {
          reject(err);
        });
      })
    },

    async initData(mapId: string | number) {
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
    setMeasureType(data) {
      this.measureType = data;
    },
    setMeasureCallback(data) {
      this.measureCallback = data;
    },
    setPlotType(data) {
      this.plotType = data;
    },
    setShowGrid(data: boolean) {
      this.showGrid = data;
    },
    //放大
    zoomIn(z: number = 1) {
      this.setMapInfo({
        ...this.mapInfo,
        zoom: this.mapInfo.zoom + z
      });
    },
    //缩小
    zoomOut(z: number = 1) {
      this.setMapInfo({
        ...this.mapInfo,
        zoom: this.mapInfo.zoom - z
      });
    },
    /**
     * 设置平移
     * @param pan
     */
    setPan(pan: boolean) {
      this.setMapInfo({
        ...this.mapInfo,
        pan: pan,
        select: false,
        dragZoomIn: false,
        dragZoomOut: false,
      });
    },
    /**
     * 设置选择
     * @param select
     */
    setSelect(select: boolean) {
      this.setMapInfo({
        ...this.mapInfo,
        select: select,
        pan: false,
        dragZoomIn: false,
        dragZoomOut: false,
      });
    },
    /**
     * 设置选框放大
     * @param dragZoomIn 
     */
    setDragZoomIn(dragZoomIn: boolean) {
      this.setMapInfo({
        ...this.mapInfo,
        select: false,
        pan: false,
        dragZoomIn: dragZoomIn,
        dragZoomOut: false,
      });
    },
    /**
     * 设置选框缩小
     * @param dragZoomOut 
     */
    setDragZoomOut(dragZoomOut: boolean) {
      this.setMapInfo({
        ...this.mapInfo,
        select: false,
        pan: false,
        dragZoomIn: false,
        dragZoomOut: dragZoomOut,
      });
    }
  },
});
