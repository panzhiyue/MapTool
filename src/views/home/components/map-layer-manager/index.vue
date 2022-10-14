<template>
  <div>
    <a-tree
      :tree-data="treeData"
      class="demo-tree-render"
      checkable
      ref="tree"
      :trigger="['contextmenu']"
      draggable
      show-icon
      @check="handleCheck"
      :checkedKeys="checkedKeys"
      @drop="handleDrop"
    >
      <template #icon="{ key: treeKey, title, data }">
        <style-icon
          v-if="data.data.info.type == 'vector'"
          :info="data.data.info"
          style="margin-top: 4px"
        ></style-icon>
        <!-- <SmileOutlined></SmileOutlined> -->
      </template>
      <template #title="{ key: treeKey, title, data }">
        <a-dropdown :trigger="['contextmenu']">
          <span>{{ title }}</span>

          <template #overlay v-if="data.data.info.type == 'vector'">
            <a-menu>
              <a-menu-item @click="handleZoomTo(treeKey)"
                >缩放至图层</a-menu-item
              >
              <a-menu-item @click="handleOpenAttributeTable(treeKey)"
                >打开属性表</a-menu-item
              >
              <a-menu-item @click="handleDelete(treeKey)">删除</a-menu-item>
            </a-menu>
          </template>
          <template #overlay v-else>
            <a-menu>
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
import tree, {
  AntTreeNodeDragEnterEvent,
  AntTreeNodeDropEvent,
  DataNode,
} from "ant-design-vue/es/tree";
import { IMapLayerInfo, Nullable, Undefinerable } from "types";
import { Key } from "ant-design-vue/es/vc-tree/interface";
import { CheckInfo } from "ant-design-vue/es/vc-tree/props";
import { ipcRenderer } from "electron";
import WindowName from "@/enum/WindowName";
import * as TableApi from "@/api/table";
import ResponseCode from "@/enum/ResponseCode";
import StyleIcon from "@/components/style-icon";
import {
  DownOutlined,
  SmileOutlined,
  FrownOutlined,
  FrownFilled,
} from "@ant-design/icons-vue";

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
  updateChecked(checked as Number[]).then((result) => {
    homeStore.getMapLayerInfos(1);
  });
};

const handleDelete = (id: Number) => {
  deleteById(id).then(() => {
    homeStore.getMapLayerInfos(1);
  });
};

const handleZoomTo = (id) => {
  let layer = homeStore.getLayerBySysId(id);
  homeStore.map.getView().fit(layer.getSource().getExtent(), {
    padding: [30, 30, 30, 30],
  });
};

const handleOpenAttributeTable = (id: Number) => {
  ipcRenderer.send(
    "open-win",
    WindowName.ATTRIBUTE_TABLE,
    "attributeTable?layerId=" + id,
    {
      width: 700,
      height: 400,
      frame: true,
      parent: WindowName.MAIN,
    }
  );
};

const handleDrop = (info: AntTreeNodeDropEvent) => {
  const dragNodeData = info.dragNode.data; //被拖拽节点数据
  const dropNodeData = info.node.data; //松开节点数据

  const newMapLayerInfos = mapLayerInfos.value.filter((item) => {
    return item.id != dragNodeData.id;
  });

  let index = newMapLayerInfos
    .map((item) => {
      return item.id;
    })
    .indexOf(dropNodeData.id);
  if (info.dropPosition == -1) {
    newMapLayerInfos.splice(index, 0, dragNodeData);
  } else {
    newMapLayerInfos.splice(index + 1, 0, dragNodeData);
  }

  newMapLayerInfos.forEach((item) => {
    delete item["m_id"];
  });

  TableApi.replaceData("MapLayerInfo", newMapLayerInfos).then(
    async (result) => {
      if (result.code == ResponseCode.SUCCESS) {
        await homeStore.getMapLayerInfos(1);
      }
    }
  );
};
</script>

<style lang="less" scoped>
/deep/ .demo-tree-render {
  .ivu-tree-title {
    width: 80%;
  }
}
</style>
