<template>
  <div>
    <Row style="margin-top: 10px">
      <Col flex="100px" class-name="name">图层名称</Col>
      <Col flex="auto"> <Input v-model="name" placeholder="图层名称" /></Col>
    </Row>
    <Row>
      <Button
        type="primary"
        style="margin-top: 10px; margin-left: 400px"
        @click="sure"
        >确定</Button
      >
    </Row>
  </div>
</template>

<script>
import fs from "fs";
import dayjs from "dayjs";
import path from "path";
export default {
  data() {
    return {
      name: "",
      accept: ".shp",
      data: null,
    };
  },
  mounted() {
    console.log(2);
  },
  methods: {
    sure() {
      let geojson = '{type: "FeatureCollection",features: [],}';
      let rPath = `/data/${dayjs().valueOf()}.json`;

      let str = geojson;
      fs.writeFileSync(path.join(__static, rPath), str);
      let info = {
        type: "layer",
        title: this.name,
        contextmenu: true,
        canEdit: true,
        canDelete: true,
        layerInfo: {
          type: "vector",
          path: rPath,
        },
      };
      this.$emit("sure", info);
    },
  },
};
</script>

<style></style>
