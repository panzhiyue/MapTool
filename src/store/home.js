import { defineStore } from 'pinia'

export const useHomeStore = defineStore({
  id: 'home',
  state: () => ({
    map: null
    // center: null,
    // zoom: null,
  }),
  actions: {
    setMap(data) {
      this.map = data
    },
    // setCenter(data) {
    //   this.center = data;
    // },
    // setZoom(data) {
    //   this.zoom = data;
    // },
    getLayerBySysId(layerId) {
      if (!layerId) {
        return null
      }
      let lyr = null
      let layers = this.map.getLayers()
      layers.forEach((layer, index) => {
        if (layer.get('sysId') == layerId) {
          lyr = layer
        }
      })
      return lyr
    }
  }
})
