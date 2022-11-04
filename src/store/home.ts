import { defineStore } from "pinia";
import { getList as getLayerInfoList } from "@/api/layerInfo";
import { getList as getMapLayerInfoList } from "@/api/mapLayerInfo";
import { getById as getMapInfoById } from "@/api/mapInfo";
import olMap from "ol/Map"
import Collection from "ol/Collection"
import BaseLayer from "ol/layer/Base"
import { ILayerInfo, IMapInfo, IMapLayerInfo, Nullable, Undefinerable } from "types";
import MeasureType from "@/enum/MeasureType";
import { updateById } from "@/api/mapInfo"
import * as TableApi from "@/api/table"
import * as utilsol from "@gis-js/utilsol"
import proj4 from "proj4"
import * as olProj4 from "ol/proj/proj4";
import Projection from "ol/proj/Projection";
import * as proj from "ol/proj";
import Units from "ol/proj/Units"

interface IState {
  map: Nullable<olMap>,
  mapInfo: Nullable<IMapInfo>,
  layerInfos: ILayerInfo[],
  mapLayerInfos: IMapLayerInfo[],
  measureType: MeasureType,
  measureCallback: Function,
  plotType: string,
  showGrid: boolean,
  ready: boolean  //是否准备完毕
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
    showGrid: false,
    ready: false
  }),
  actions: {
    setMap(data: Nullable<olMap>) {
      this.map = data;
    },
    setMapInfo(data: IMapInfo) {
      this.mapInfo = data;
      updateById(this.mapInfo).then((result) => { });
    },
    async getMapInfo(mapId: string | number): Promise<IMapInfo> {
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

      await this.getMapInfo(mapId);
      await this.getLayerInfos(mapId);
      await this.getMapLayerInfos(mapId);
      await this.initProjection();
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
    async initProjection() {

      let result = await TableApi.getByWhere("spatial_ref_sys", { auth_name: "EPSG", srid: parseInt(this.mapInfo.projection.split(":")[1]) });
      console.log(result);
      for (let i = 0; i < result.data.length; i++) {
        let item = result.data[i];
        if (item.srid && item.proj4text) {
          proj4.defs("EPSG:" + item.srid, item.proj4text);
          // const def = proj4.defs("EPSG:" + item.srid);
          // console.log("EPSG:" + item.srid, def, item.proj4text);
          // let units = def.units;
        }

        // proj4.register(item.proj4text);
        // console.log("EPSG:" + item.srid);
        // proj4.defs("EPSG:" + item.srid, item.srtext);
        // let newProj = new Projection({
        //   code: "EPSG:" + item.srid,
        // });
        // proj.addProjection(newProj);
        // utilsol.coordinateSystem.addCoordinateTransforms("4326", item.srid);
        // utilsol.coordinateSystem.addCoordinateTransforms("3857", item.srid);
      }
      olProj4.register(proj4);
      //  .then((result) => {
      //     for (let i = 0; i < result.data.length; i++) {
      //       let item = result.data[i];
      //       if (item.srid && item.proj4text) {
      //         proj4.defs("EPSG:" + item.srid, item.proj4text);
      //         // const def = proj4.defs("EPSG:" + item.srid);
      //         // console.log("EPSG:" + item.srid, def, item.proj4text);
      //         // let units = def.units;
      //       }

      //       // proj4.register(item.proj4text);
      //       // console.log("EPSG:" + item.srid);
      //       // proj4.defs("EPSG:" + item.srid, item.srtext);
      //       // let newProj = new Projection({
      //       //   code: "EPSG:" + item.srid,
      //       // });
      //       // proj.addProjection(newProj);
      //       // utilsol.coordinateSystem.addCoordinateTransforms("4326", item.srid);
      //       // utilsol.coordinateSystem.addCoordinateTransforms("3857", item.srid);
      //     }
      //     olProj4.register(proj4);

      //     // const projCodes = Object.keys(proj4.defs);
      //     // const len = projCodes.length;
      //     // let i, j;
      //     // for (i = 0; i < len; ++i) {
      //     //   const code = projCodes[i];
      //     //   console.log(code);
      //     //   if (!proj.get(code)) {
      //     //     const def = proj4.defs(code);
      //     //     let units = def.units;
      //     //     if (!units && def.projName === 'longlat') {
      //     //       units = Units.DEGREES;
      //     //     }
      //     //     proj.addProjection(
      //     //       new Projection({
      //     //         code: code,
      //     //         axisOrientation: def.axis,
      //     //         metersPerUnit: def.to_meter,
      //     //         units,
      //     //       })
      //     //     );
      //     //   }
      //     // }

      //     // for (i = 0; i < len; ++i) {
      //     //   const code1 = projCodes[i];
      //     //   const proj1 = proj.get(code1);
      //     //   for (j = 0; j < len; ++j) {
      //     //     const code2 = projCodes[j];
      //     //     const proj2 = proj.get(code2);
      //     //     if (!proj.getTransform(code1, code2)) {
      //     //       if (proj4.defs[code1] === proj4.defs[code2]) {
      //     //         proj.addEquivalentProjections([proj1, proj2]);
      //     //       } else {
      //     //         const transform = proj4(code1, code2);
      //     //         proj.addCoordinateTransforms(
      //     //           proj1,
      //     //           proj2,
      //     //           proj.createSafeCoordinateTransform(proj1, proj2, transform.forward),
      //     //           proj.createSafeCoordinateTransform(proj2, proj1, transform.inverse)
      //     //         );
      //     //       }
      //     //     }
      //     //   }
      //     // }
      //   })
    }
  },
});
