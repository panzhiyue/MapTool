import { defineStore } from "pinia";
import { getList as getLayerInfoList } from "@/api/mapTool/layerInfo";
import { getList as getMapLayerInfoList } from "@/api/mapTool/mapLayerInfo";
import { getById as getMapInfoById, updateById as updateMapInfoById } from "@/api/mapTool/mapInfo";
import { getById as getConfigById, updateById as updateConfigById } from "@/api/mapTool/config";
import olMap from "ol/Map"
import Collection from "ol/Collection"
import BaseLayer from "ol/layer/Base"
import { ILayerInfo, IMapInfo, IMapLayerInfo, Nullable, Undefinerable, IConfig } from "types";
import MeasureType from "@/enum/MeasureType";
import fs from "fs"
import PATH from "path"
import { excel2json, json2Excel, download } from '@/utils/excel';
import { WktInfo } from "@/utils/SpatialReference";
import { getStaticPath } from "@/utils/path"
// import { testRegexr } from "windicss/utils";

const staticPath = getStaticPath();
console.log(staticPath);
interface IState {
  map: Nullable<olMap>,
  mapInfo: Nullable<IMapInfo>,
  config: Nullable<IConfig>,
  layerInfos: ILayerInfo[],
  mapLayerInfos: IMapLayerInfo[],
  measureType: MeasureType,
  measureCallback: Function,
  plotType: string,
  showGrid: boolean,
  ready: boolean,  //是否准备完毕
  spatial_ref_sys: any,
  staticPath: string,
  editLayerId: string
}

export const useMapToolStore = defineStore({
  id: "home",
  state: (): IState => ({
    map: null,
    mapInfo: null,
    config: null,
    layerInfos: [],
    mapLayerInfos: [],
    measureType: null,
    measureCallback: null,
    plotType: null,
    showGrid: false,
    ready: false,
    spatial_ref_sys: null,
    staticPath: staticPath,
    editLayerId: null
  }),
  actions: {
    setMap(data: Nullable<olMap>) {
      this.map = data;
    },
    setMapInfo(data: IMapInfo) {
      this.mapInfo = data;
      updateMapInfoById(this.mapInfo).then((result) => { });
    },
    async getMapInfo(mapId: string | number): Promise<IMapInfo> {
      return new Promise((inject, reject) => {
        getMapInfoById(mapId).then((result) => {
          console.log("getMapInfoById", result);
          this.mapInfo = result.data;
          inject(this.mapInfo);
        }).catch((err) => {
          reject(err);
        });
      })
    },

    setConfig(data: IConfig) {
      this.config = data;
      updateConfigById(this.config).then((result) => { });
    },
    async getConfig(id: string | number): Promise<IConfig> {
      return new Promise((inject, reject) => {
        getConfigById(id).then((result) => {
          this.config = result.data;
          inject(this.config);
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
      this.ready = false;
      await this.initProjection();
      await this.getMapInfo(mapId);
      await this.getLayerInfos(mapId);
      await this.getMapLayerInfos(mapId);
      await this.getConfig("1");
      this.ready = true;
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
    },
    setSpatialRefSys(data) {
      this.spatial_ref_sys = data;
    },

    getSpatialRefSys() {
      return new Promise((inject, reject) => {
        let result = fs.readFileSync(PATH.join(this.staticPath, "spatial_ref_sys.xlsx"));

        excel2json(result).then((res: any) => {
          if (res.length > 0) {
            let data = res[0].data;
            inject(data);
            // this.setSpatialRefSys(data);
          }
        });
      })
    },


    async initProjection() {

      let result = fs.readFileSync(PATH.join(this.staticPath, "spatial_ref_sys.xlsx"));

      await excel2json(result).then((res: any) => {
        if (res.length > 0) {
          let data = res[0].data;
          data = data.sort((a, b) => {
            return a.name[0] > b.name[0] ? 1 : -1;
          })
          this.setSpatialRefSys(data);
        }
      });

    },
    async handlePrjData() {
      let result = fs.readFileSync(PATH.join(this.staticPath, "spatial_ref_sys.xlsx"));
      await excel2json(result).then((res: any) => {
        if (res.length > 0) {
          let data = res[0].data;
          data = data.filter((item) => {
            return item.srid && item.auth_name && item.auth_srid && item.srtext && item.proj4text;
          })
          data.forEach((item) => {
            item.name = new WktInfo(item.srtext).wktParserResult.name;
            item.type = new WktInfo(item.srtext).wktParserResult.type;
          })
          download({
            name: "test",
            worksheets: [{
              data: data,  //要导出的数据

              name: "sheet1",  //文件名称
            }]
          });
          this.setSpatialRefSys(data);
        }
      });
    }

  },
});
