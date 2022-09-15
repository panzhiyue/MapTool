import { defineStore } from 'pinia'
import fs from 'fs'
import path from 'path'
export const useMapLayerStore = defineStore({
  id: 'map-layer',
  state: () => ({
    mapLayer: JSON.parse(
      fs.readFileSync(
        path.join(__static, '/static/config/mapLayer.json'),
        'utf-8'
      )
    )
  }),
  getters: {},
  actions: {
    addLayer(layer) {
      this.mapLayer.push(layer)
      this.write(JSON.stringify(this.mapLayer))
    },
    removeLayer(layer) {
      let index = this.mapLayer.indexOf(layer)

      this.mapLayer.splice(index, 1)
      this.write(JSON.stringify(this.mapLayer))
    },
    read() {
      return JSON.parse(
        fs.readFileSync(
          path.join(__static, '/static/config/mapLayer.json'),
          'utf-8'
        )
      )
    },
    write(data) {
      // fs.writeFileSync(
      //   path.join(__static, '/static/config/mapLayer.json'),
      //   data
      // )
    }
  }
})
