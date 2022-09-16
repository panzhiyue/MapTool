import { defineStore } from "pinia";

export const useHomeStore = defineStore({
  id: "home",
  state: () => ({
    map: null,
    mapInfo: null,
  }),
  actions: {
    setMap(data) {
      this.map = data;
    },
    setMapInfo(data) {
      this.mapInfo = data;
    },
    getLayerBySysId(layerId) {
      if (!layerId) {
        return null;
      }
      let lyr = null;
      let layers = this.map.getLayers();
      layers.forEach((layer, index) => {
        if (layer.get("sysId") == layerId) {
          lyr = layer;
        }
      });
      return lyr;
    },
  },
});
