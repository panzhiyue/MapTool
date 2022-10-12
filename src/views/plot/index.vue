<template>
  <div class="plot h-full w-full p-3">
    <a-button
      v-for="(item, index) in types"
      :key="index"
      @click="(e) => handlePlot(item.value)"
      >{{ item.label }}</a-button
    >
  </div>
</template>
<script lang="ts" setup>
import { useMainWindow } from "@/hooks/electron/useMainWindow";
import { useWindow } from "@/hooks/electron/useWindow";
import WindowName from "@/enum/WindowName";
const remote = require("@electron/remote");
const sharedObject = remote.getGlobal("sharedObject");
const types = ref([
  {
    label: "弧线",
    value: "arc",
  },
  {
    label: "直箭头",
    value: "assaultdirection",
  },
  {
    label: "进攻箭头",
    value: "attackarrow",
  },
  {
    label: "圆",
    value: "circle",
  },
  {
    label: "曲线面",
    value: "closedcurve",
  },
  {
    label: "曲线",
    value: "curve",
  },
  {
    label: "菱形",
    value: "diamond",
  },
  {
    label: "钳击双箭头",
    value: "doublearrow",
  },
  {
    label: "椭圆",
    value: "ellipse",
  },
  {
    label: "细直箭头",
    value: "finearrow",
  },
  {
    label: "自由线",
    value: "freehandline",
  },
  {
    label: "自由面",
    value: "freehandpolygon",
  },
  {
    label: "聚集地",
    value: "gatheringplace",
  },
  {
    label: "弓形",
    value: "lune",
  },
  {
    label: "点",
    value: "point",
  },
  {
    label: "折线",
    value: "polyline",
  },
  {
    label: "多边形",
    value: "polygon",
  },
  {
    label: "矩形",
    value: "rectangle",
  },
  {
    label: "扇形面",
    value: "sector",
  },
  {
    label: "斜箭头",
    value: "squadcombat",
  },
  {
    label: "直线箭头",
    value: "straightarrow",
  },
  {
    label: "燕尾进攻箭头",
    value: "tailedattackarrow",
  },
  {
    label: "燕尾斜箭头",
    value: "tailedsquadcombat",
  },
  {
    label: "三角形",
    value: "triangle",
  },
]);

const { plot } = useMainWindow();
const handlePlot = (type) => {
  plot({
    fromWindowId: sharedObject[WindowName.PLOT],
    fromWindowName: WindowName.PLOT,
    toWindowId: sharedObject[WindowName.MAIN],
    toWindowName: WindowName.MAIN,
    type: type,
  });
};

const { currentWindow } = useWindow();
currentWindow.on("close", () => {
  plot({
    fromWindowId: sharedObject[WindowName.PLOT],
    fromWindowName: WindowName.PLOT,
    toWindowId: sharedObject[WindowName.MAIN],
    toWindowName: WindowName.MAIN,
    type: null,
  });
});
</script>
<style lang="less" scoped>
.ant-btn {
  margin-left: 5px;
  margin-top: 5px;
}
</style>
