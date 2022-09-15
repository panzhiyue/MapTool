import { defineStore } from 'pinia'
import fs from 'fs'
import path from 'path'
// console.log(__static2)
export const useMapInfoStore = defineStore({
  id: 'map-info',
  state: () => ({
    mapInfo: JSON.parse(
      fs.readFileSync(
        path.join(__static, '/static/config/mapInfo.json'),
        'utf-8'
      )
    )
  }),
  getters: {},
  actions: {
    read() {
      return JSON.parse(
        fs.readFileSync(
          path.join(__static, '/static/config/mapInfo.json'),
          'utf-8'
        )
      )
    },
    write(data) {
      // fs.writeFileSync(path.join(__static, '/static/config/mapInfo.json'), data)
    },
    setMapInfo(data) {
      this.mapInfo = data
      this.write(JSON.stringify(this.mapInfo))
    }
  }
})
