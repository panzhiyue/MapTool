<template>
  <a-menu :style="menuStyle">
    <a-menu-item
      :key="ColumnMenuType.FIELD_CALCULATOR"
      @click="handleClick(ColumnMenuType.FIELD_CALCULATOR)"
      >字段计算器</a-menu-item
    >
    <a-menu-item
      :key="ColumnMenuType.COMPUTATIONAL_GEOMETRY"
      @click="handleClick(ColumnMenuType.COMPUTATIONAL_GEOMETRY)"
      >计算几何</a-menu-item
    >
    <a-menu-item
      :key="ColumnMenuType.DELETE"
      @click="handleClick(ColumnMenuType.DELETE)"
      >删除</a-menu-item
    >
    <a-menu-item
      :key="ColumnMenuType.EDIT"
      @click="handleClick(ColumnMenuType.EDIT)"
      >编辑</a-menu-item
    >
  </a-menu>
</template>
<script lang="ts" setup>
import ColumnMenuType from "@/enum/ColumnMenuType";

const emits = defineEmits(["click"]);

const menuStyle = reactive({
  position: "absolute",
  border: "1px solid #eee",
});

const handleClick = (type) => {
  emits("click", type);
};
</script>
<style lang="less" scoped></style>
