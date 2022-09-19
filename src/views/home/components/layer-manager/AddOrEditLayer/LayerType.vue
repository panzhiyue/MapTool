<template>
  <div>
    <RadioGroup vertical v-model="layerType">
      <Radio
        v-for="(item, index) in layerTypes"
        :value="item.value"
        :label="item.label"
        :key="index"
      >
      </Radio>
    </RadioGroup>

    <Button
      type="primary"
      style="margin-top: 10px; margin-left: 400px"
      @click="next"
      >下一步</Button
    >
  </div>
</template>

<script>
export default {
  data() {
    return {
      layerTypes: [
      {
          label: "矢量数据(空)",
          value: "null",
        },
        {
          label: "矢量数据(.shp)",
          value: "shp",
        },
        {
          label: "矢量数据(.geojson)",
          value: "geojson",
        },
                {
          label: "矢量数据(.topojson)",
          value: "topojson",
        },
        {
          label: "wms",
          value: "wms",
        },
        {
          label: "wmts",
          value: "wmts",
        },
      ],
      layerType: "矢量数据(空)",
    };
  },
  methods: {
    next() {
      this.$emit("sure", this.layerType);
    },
  },
};
</script>

<style>
</style>