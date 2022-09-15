import { defineStore } from 'pinia'
import fs from 'fs'
import path from 'path'

export const useLayerStore = defineStore({
  id: 'layer',
  state: () => ({
    layer: JSON.parse(
      fs.readFileSync(path.join(__static, '/static/config/layer.json'), 'utf-8')
    )
  }),
  getters: {},
  actions: {
    read() {
      return JSON.parse(
        fs.readFileSync(
          path.join(__static, '/static/config/layer.json'),
          'utf-8'
        )
      )
    },
    write(data) {
      // fs.writeFileSync(path.join(__static, '/static/config/layer.json'), data)
    }
  }
})
