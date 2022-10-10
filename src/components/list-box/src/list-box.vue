<template>
  <div class="list-box" @click="clearSelected">
    <div
      v-for="(item, index) in items"
      class="list-box-item"
      :class="{ selected: selecteds.indexOf(index) > -1 }"
      :key="index"
    >
      <span
        @click="(e) => handleClick(e, item, index)"
        @dblclick="(e) => handleDblClick(e, item, index)"
        >{{ item.label }}</span
      >
    </div>
  </div>
</template>
<script lang="ts" setup>
import { PropType } from "vue";
import { IListBoxItem } from "./typing";

const props = defineProps({
  items: {
    type: Array as PropType<IListBoxItem[]>,
    default: [],
  },
});

const emits = defineEmits(["click", "dblclick"]);

const selecteds = ref([]);
const handleClick = (e, item: IListBoxItem, index: number) => {
  e.stopPropagation();

  selecteds.value = [index];
  emits("click", item, index);
};

const handleDblClick = (e, item: IListBoxItem, index: number) => {
  emits("dblclick", item, index);
};

const clearSelected = () => {
  selecteds.value = [];
};
</script>
<style lang="less" scoped>
.list-box {
  width: 100px;
  height: 100px;
  border: 1px solid #ccc;
  overflow: auto;
  padding: 4px;
  background-color: #fff;

  .selected {
    span {
      background-color: rgb(0, 120, 215);
      color: white;
    }
  }
}
</style>
