<template>
  <div
    class="group-box"
    :style="{
      '--borderColor': borderColor,
      '--borderWidth': borderWidth + 'px',
      '--borderStyle': dashed ? 'dashed' : 'solid',
      '--leftWidith': leftWidth,
      '--flexDirection': flexDirection,
    }"
  >
    <div class="group-box-top">
      <span class="title">{{ title }}</span>
    </div>
    <div class="group-box-content">
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps({
  //标题
  title: {
    type: String,
    default: "group-box",
  },
  //边框色
  borderColor: {
    type: String,
    default: "rgba(0, 0, 0, 0.3)",
  },
  //边框宽度
  borderWidth: {
    type: Number,
    default: 1,
  },
  //是否为虚线
  dashed: {
    type: Boolean,
    default: false,
  },
  //标题所在位置,left|center|right
  orientation: {
    type: String,
    default: "left",
  },
  orientationMargin: {
    type: Number,
    default: 3.0,
  },
});

const leftWidth = computed(() => {
  if (props.orientation == "center") {
    return "50%";
  } else {
    return `${props.orientationMargin}px`;
  }
});

const flexDirection = computed(() => {
  if (props.orientation == "left") {
    return "row";
  } else {
    return "row-reverse";
  }
});
</script>
<style lang="less" scoped>
.group-box {
  border: var(--borderWidth) var(--borderStyle) var(--borderColor);
  border-top: 0px;
  width: 200px;
  height: 200px;

  .group-box-top {
    display: flex;
    width: 100%;
    height: 0px;
    flex-direction: var(--flexDirection);

    .title {
      top: -10px;
      position: relative;
      display: inline-block;
      padding: 0 4px;
    }
    &::before {
      top: -50%;
      width: var(--leftWidith);
      position: relative;
      border-top: var(--borderWidth) var(--borderStyle) var(--borderColor);
      border-bottom: 0;
      transform: translateY(50%);
      content: "";
    }

    &::after {
      top: -50%;
      position: relative;
      border-top: var(--borderWidth) var(--borderStyle) var(--borderColor);
      border-bottom: 0;
      transform: translateY(50%);
      content: "";
      flex: 1;
    }
  }
}
</style>
