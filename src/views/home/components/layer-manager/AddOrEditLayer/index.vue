<template>
  <a-modal
    v-model:visible="visible"
    title="添加图层"
    @ok="ok"
    @cancel="cancel"
    :footer="null"
  >
    <div class="content">
      <layer-type v-show="current == 0" @sure="selectLayerType"> </layer-type>
      <add-shp
        v-show="(current == 1) & (layerType == 'shp')"
        @sure="addLayer"
      ></add-shp>
      <add-null
        v-show="(current == 1) & (layerType == 'null')"
        @sure="addLayer"
      ></add-null>
      <add-geoJSON
        v-show="(current == 1) & (layerType == 'geojson')"
        @sure="addLayer"
      ></add-geoJSON>
      <add-topoJSON
        v-show="(current == 1) & (layerType == 'topojson')"
        @sure="addLayer"
      ></add-topoJSON>
      <AddWMTS
        v-show="(current == 1) & (layerType == 'wmts')"
        @sure="addLayer"
      ></AddWMTS>
    </div>
  </a-modal>
</template>

<script>
import LayerType from "./LayerType.vue";
import { buildUUID } from "@/utils/uuid";
import AddShp from "./AddShp.vue";
import AddNull from "./AddNull.vue";
import AddGeoJSON from "./AddGeoJSON.vue";
import AddWMTS from "./AddWMTS.vue";
import AddTopoJSON from "./AddTopoJSON.vue";

export default {
  components: {
    LayerType,
    AddShp,
    AddNull,
    AddGeoJSON,
    AddTopoJSON,
    AddWMTS,
  },
  data() {
    return {
      visible: false,
      name: "菜单名称",
      expand: false,
      type: "", // add,edit

      current: 0,
      layerType: null,
    };
  },
  props: {
    //菜单
    contextData: {
      type: Object,
    },
  },
  methods: {
    show(type) {
      this.visible = true;
      this.type = type;
      if (this.type == "edit") {
        this.name = this.contextData.title;
        this.expand = this.contextData.expand;
      } else if (this.type == "add") {
      } else {
        throw "type必须是add或edit";
      }
    },
    ok() {
      let menu = {
        id: buildUUID(),
        title: this.name,
        expand: this.expand,
        type: "menu",
        contextmenu: true,
      };
      if (this.type == "edit") {
        this.$set(this.contextData, "title", menu.title);
        this.$set(this.contextData, "expand", menu.expand);
      } else if (this.type == "add") {
        const children = this.contextData.children || [];
        children.push(menu);
        this.$set(this.contextData, "children", children);
      }

      this.$emit("sure");
    },
    cancel() {
      this.$emit("cancel");
    },
    handleUpload() {
      return false;
    },
    selectLayerType(layerType) {
      this.current += 1;
      this.layerType = layerType;
      console.log(layerType);
    },
    addLayer(info) {
      const children = this.contextData.children || [];
      children.push(info);
      this.$set(this.contextData, "children", children);
      this.$emit("sure");
    },
    handleVisibleChange() {
      this.current = 0;
    },
    hide() {
      this.visible = false;
    },
  },
};
</script>

<style lang="less" scoped>
.name {
  font-weight: bold;
  line-height: 30px;
}

.chkExpand {
  margin-top: 20px;
  margin-left: 10px;
}

.content {
  padding: 20px;
}
</style>
