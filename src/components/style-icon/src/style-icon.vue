<template>
  <span class="style-icon">
    <span  :style="style"></span>
  </span>
</template>
<script lang="ts" setup>
import { IStyle } from "#/index";
import StyleType from "@/enum/StyleType";
import { PropType } from "vue";

const props = defineProps({
  info: {
    type: Object,
  },
});

// const style = reactive({
//   width: "16px",
//   height: "16px",
//   backgroundColor: "#ff0000",
// });

console.log(props.info);
const style = computed(() => {
  let styleInfo: IStyle = props.info.styles[0];
  if (styleInfo.type == StyleType.POINT) {
    return {
      width: "16px",
      height: "16px",
      backgroundColor: styleInfo.fillColor,
      borderRadius: "8px",
      border: `${styleInfo.lineWidth > 1 ? 1 : styleInfo.lineWidth}px solid ${
        styleInfo.lineColor
      }`,
    };
  } else if (styleInfo.type == StyleType.LINESTRING) {
    return {
      width: "16px",
      marginTop:"8px",
      height: `${styleInfo.width > 1 ? 1 : styleInfo.width}px`,
      backgroundColor: styleInfo.color,
    };
  } else if (styleInfo.type == StyleType.POLYGON) {
    return {
      width: "16px",
      height: "16px",
      backgroundColor: styleInfo.fillColor,
      border: `${styleInfo.lineWidth > 1 ? 1 : styleInfo.lineWidth}px solid ${
        styleInfo.lineColor
      }`,
    };
  }
});
</script>
<style lang="less" scoped>
.style-icon {
  display: inline-block;
  margin: 0;
  padding: 0;
  width: 16px;
  height: 16px;
  line-height: 0;
  text-align: center;
  text-transform: none;
  vertical-align: -0.125em;

  span{
    display: block;
  }
}
</style>
