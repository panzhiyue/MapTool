<template>
  <div>
    <a-tree
      v-model:tree-data="treeData"
      class="demo-tree-render"
      :trigger="['contextmenu']"
      ref="tree"
    >
      <template
        #title="{ key: treeKey, id, title, type, canDelete, canEdit, data }"
      >
        <a-dropdown :trigger="['contextmenu']">
          <span>{{ title }}</span>
          <template #overlay>
            <a-menu v-if="type == 'root'">
              <a-menu-item>添加菜单</a-menu-item>
              <a-menu-item>添加图层</a-menu-item>
            </a-menu>

            <a-menu v-else-if="type == 'menu'">
              <a-menu-item
                v-if="canEdit"
                @click.native="handleContextMenuEdit(data)"
                >编辑</a-menu-item
              >
              <a-menu-item @click.native="handleContextMenuAddMenu(data)"
                >添加菜单</a-menu-item
              >
              <a-menu-item @click.native="handleContextMenuAddLayer(data)"
                >添加图层</a-menu-item
              ><a-menu-item v-if="canDelete">删除</a-menu-item>
            </a-menu>

            <a-menu v-else-if="type == 'layer'">
              <a-menu-item v-if="canEdit">编辑</a-menu-item>
              <a-menu-item @click="handleAddToMap(data)"
                >添加到地图</a-menu-item
              >
              <a-menu-item v-if="canDelete">删除</a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </template>
      <!-- <template slot="contextMenu">
        <div v-if="contextData.type == 'root'">
          <DropdownItem @click.native="handleContextMenuEdit"
            >编辑</DropdownItem
          >
          <DropdownItem @click.native="handleContextMenuAddMenu"
            >添加菜单</DropdownItem
          >
          <DropdownItem @click.native="handleContextMenuAddLayer"
            >添加图层</DropdownItem
          >
        </div>
        <div v-else-if="contextData.type == 'menu'">
          <DropdownItem
            v-if="contextData.canEdit == true"
            @click.native="handleContextMenuEdit"
            >编辑</DropdownItem
          >
          <DropdownItem @click.native="handleContextMenuAddMenu"
            >添加菜单</DropdownItem
          >
          <DropdownItem @click.native="handleContextMenuAddLayer"
            >添加图层</DropdownItem
          >
          <DropdownItem
            v-if="contextData.canDelete == true"
            @click.native="handleContextMenuDelete"
            style="color: #ed4014"
            >删除</DropdownItem
          >
        </div>
        <div v-else-if="contextData.type == 'layer'">
          <DropdownItem
            v-if="contextData.canEdit == true"
            @click.native="handleContextMenuEdit"
            >编辑</DropdownItem
          >
          <DropdownItem @click.native="handleContextMenuAddToMap"
            >添加到地图</DropdownItem
          >
          <DropdownItem
            v-if="contextData.canDelete == true"
            @click.native="handleContextMenuDelete"
            style="color: #ed4014"
            >删除</DropdownItem
          >
        </div>
      </template> -->
    </a-tree>
    <add-or-edit-menu
      :ref="'addOrEditMenu'"
      @sure="updateLayer"
    ></add-or-edit-menu>
    <!-- <add-or-edit-layer
      :contextData="contextData"
      :ref="'addOrEditLayer'"
      @sure="updateLayer"
    ></add-or-edit-layer> -->
  </div>
</template>
<script setup lang="ts">
import { useHomeStore } from "@/store/home";
import { ILayerInfo } from "types";
import { onMounted } from "vue";
import { add as addMapLayerInfo } from "@/api/mapLayerInfo";
// import { useLayerStore } from "@/store/Layer.js";
// import { useMapLayerStore } from "@/store/MapLayer.js";
// import { buildUUID } from "@/utils/uuid";
import AddOrEditMenu from "./AddOrEditMenu.vue";
// import AddOrEditLayer from "./AddOrEditLayer/index.vue";
let homeStore = useHomeStore();

const layerInfos = computed(() => {
  return homeStore.layerInfos;
});

const treeData = computed(() => {
  let children = !layerInfos.value
    ? []
    : layerInfos.value
        .filter((item) => {
          return item.parentId === "0";
        })
        .map((item) => {
          return getTreeDataItem(item);
        });

  let data = [
    {
      id: "0",
      title: "图层",
      key: "0",
      type: "root",
      children,
    },
  ];
  return data;
});

const getTreeDataItem = (data) => {
  let treeDataItem = {
    ...data,
    key: data.id,
    data,
    children: layerInfos.value
      .filter((item) => {
        return item.parentId === data.id;
      })
      .map((item) => {
        return getTreeDataItem(item);
      }),
  };
  return treeDataItem;
};

onMounted(() => {});

const addOrEditMenu = ref(null);
const handleContextMenuEdit = (data) => {
  addOrEditMenu.value.show("edit", data);
};

const handleContextMenuAddMenu = (data) => {
  addOrEditMenu.value.show("add", data);
};

const handleContextMenuAddLayer = (data) => {
  console.log(data);
};

const updateLayer = () => {};

/**
 * 添加到地图
 */
const handleAddToMap = (data: ILayerInfo) => {
  addMapLayerInfo({
    layerId: data.id!,
    mapId: 0,
    title: data.title,
    info: data.info,
    checked: true,
  }).then((result) => {
    homeStore.getMapLayerInfos(1);
  });
};

//     // handleContextMenuAddMenu(data) {
//     //   this.$refs["addOrEditMenu"].show("add");
//     // },
//     // updateLayer() {
//     //   layerStore.write(JSON.stringify(this.$refs["tree"].data));
//     //   this.$refs["addOrEditLayer"].hide();
//     // },
//     // handleContextMenuAddLayer() {
//     //   this.$refs["addOrEditLayer"].show("add");
//     // },

//     // handleContextMenuEdit() {
//     //   this.$refs["addOrEditMenu"].show("edit");
//     // },

// // let mapLayerStore = null;
// export default {
//   methods: {
//     getTreeDataItem(data) {

//     },
//     // renderContent(h, { root, node, data }) {
//     //   return h(
//     //     "span",
//     //     {
//     //       style: {
//     //         display: "inline-block",
//     //         width: "100%",
//     //       },
//     //       on: {
//     //         contextmenu: (e) => {
//     //           e.preventDefault();
//     //           this.handleContextMenu({ root, node, data });
//     //         },
//     //       },
//     //     },
//     //     [
//     //       h("span", [
//     //         data.type == "layer"
//     //           ? h("Icon", {
//     //               props: {
//     //                 type: "ios-paper-outline",
//     //               },
//     //               style: {
//     //                 marginRight: "8px",
//     //               },
//     //             })
//     //           : h("Icon", {
//     //               props: {
//     //                 type: "ios-folder-outline",
//     //               },
//     //               style: {
//     //                 marginRight: "8px",
//     //               },
//     //             }),
//     //         h("span", data.title),
//     //       ]),
//     //     ]
//     //   );
//     // },
//     // handleContextMenu({ root, node, data }) {
//     //   this.contextRoot = root;
//     //   this.contextNode = node;
//     //   this.contextData = data;
//     // },
//     // handleContextMenuEdit() {
//     //   this.$refs["addOrEditMenu"].show("edit");
//     // },
//     // handleContextMenuDelete() {
//     //   this.$Modal.confirm({
//     //     title: "是否删除菜单",
//     //     onOk: () => {
//     //       const parentKey = this.contextNode.parent;
//     //       const parent = this.contextRoot.find(
//     //         (el) => el.nodeKey === parentKey
//     //       ).node;
//     //       const index = parent.children.indexOf(this.contextData);
//     //       parent.children.splice(index, 1);
//     //       this.updateLayer();
//     //     },
//     //   });
//     // },
//     // handleContextMenuAddToMap() {
//     //   mapLayerStore.addLayer({ ...this.contextData, checked: true });
//     // },
//     // handleContextMenuAddMenu(data) {
//     //   this.$refs["addOrEditMenu"].show("add");
//     // },
//     // updateLayer() {
//     //   layerStore.write(JSON.stringify(this.$refs["tree"].data));
//     //   this.$refs["addOrEditLayer"].hide();
//     // },
//     // handleContextMenuAddLayer() {
//     //   this.$refs["addOrEditLayer"].show("add");
//     // },
//   },
// };
</script>
<style></style>
