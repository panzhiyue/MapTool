<template>
  <div>
    <a-tree
      :tree-data="treeData"
      class="demo-tree-render"
      checkable
      ref="tree"
      :trigger="['contextmenu']"
      draggable
      @check="handleCheck"
      :checkedKeys="checkedKeys"
    >
      <template #title="{ key: treeKey, title, data }">
        <a-dropdown :trigger="['contextmenu']">
          <span>{{ title }}</span>
          <template #overlay v-if="data.info?.type == 'Vector'">
            <a-menu>
              <a-menu-item>缩放至图层</a-menu-item>
              <a-menu-item @click="handleDelete(treeKey)">删除</a-menu-item>
            </a-menu>
          </template>
          <template #overlay v-else>
            <a-menu>
              <a-menu-item>缩放至图层</a-menu-item>
              <a-menu-item @click="handleDelete(treeKey)">删除</a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </template>
    </a-tree>
  </div>
</template>

<script setup lang="ts">
import { useHomeStore } from "@/store/home";
import { updateChecked, deleteById } from "@/api/mapLayerInfo";
import { ComputedRef, Ref } from "vue";
import { DataNode } from "ant-design-vue/es/tree";
import { IMapLayerInfo, Nullable, Undefinerable } from "types";
import { Key } from "ant-design-vue/es/vc-tree/interface";
import { CheckInfo } from "ant-design-vue/es/vc-tree/props";
import { ipcRenderer } from "electron";

let homeStore = useHomeStore();

const mapLayerInfos = computed(() => {
  return homeStore.mapLayerInfos;
});

const treeData: ComputedRef<Undefinerable<DataNode[]>> = computed(() => {
  return mapLayerInfos.value.map((item, index) => {
    return {
      key: item.id,
      title: item.title,
      data: item,
    } as any;
  });
});

// const checkedKeys: Ref<Key[]> = ref([]);
const checkedKeys: ComputedRef<Key[]> = computed(() => {
  return mapLayerInfos.value
    .filter((item: IMapLayerInfo) => {
      return item.checked == true;
    })
    .map((item) => {
      return item.id as Key;
    });
});

const handleCheck = (
  checked:
    | Key[]
    | {
        checked: Key[];
        halfChecked: Key[];
      },
  node: CheckInfo
) => {
  updateChecked(checked as Number[]).then(() => {
    homeStore.getMapLayerInfos(1);
  });
};

const handleDelete = (id: Number) => {
  deleteById(id).then(() => {
    homeStore.getMapLayerInfos(1);
  });
};


</script>

<style lang="less" scoped>
/deep/ .demo-tree-render {
  .ivu-tree-title {
    width: 80%;
  }
}
</style>
