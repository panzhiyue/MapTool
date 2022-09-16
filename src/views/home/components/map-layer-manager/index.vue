<template>
  <div>
    <a-tree
      :tree-data="mapLayer"
      class="demo-tree-render"
      checkable
      @on-check-change="onCheckChange"
      :render="renderContent"
      ref="tree"
      :trigger="['contextmenu']"
      draggable
      @check="handleCheck"
      v-model:checkedKeys="checkedKeys"
    >
      <template #title="{ key: treeKey, title }">
        <a-dropdown :trigger="['contextmenu']">
          <span>{{ title }}</span>
          <template #overlay>
            <a-menu>
              <a-menu-item>缩放至图层</a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </template>
      <!-- <template #title="{ key: treeKey, title }" :trigger="['contextmenu']">
        <span>{{ title }}</span>
        <template #overlay>
          <div
            v-if="
              contextData.layerInfo && contextData.layerInfo.type == 'vector'
            "
          >
            <DropdownItem @click.native="zoomToLayer">缩放至图层</DropdownItem>
          </div>
        </template>
      </template> -->
    </a-tree>
  </div>
</template>

<script>
import { useMapLayerStore } from "@/store/MapLayer.js";
import { useHomeStore } from "@/store/home.js";
// import db from "../../../../../db/index";

let mapLayerStore = null;
let homeStore = null;
export default {
  data() {
    return {
      contextData: {}, //右键结点信息
      contextRoot: {}, //右键结点信息
      contextNode: {}, //右键结点信息
      checkedKeys: [],
    };
  },
  computed: {
    mapLayer() {
      return mapLayerStore.mapLayer;
    },
  },
  created() {
    mapLayerStore = useMapLayerStore();
    homeStore = useHomeStore();
  },
  mounted() {
    this.checkedKeys = this.mapLayer
      .filter((item) => {
        return item.checked == true;
      })
      .map((item) => {
        return item.key;
      });
    // console.log(db);


    // const db = knex({
    //   client: "better-sqlite3",
    //   connection: {
    //     filename: "I:\\MapTool\\static\\Map_Data.ti",
    //   },
    //   useNullAsDefault: true,
    // });

    // console.log(333);
    // console.log(db);
    // db.schema
    //   .createTableIfNotExists("persons", (table) => {
    //     table.increments("id").primary();
    //     table.string("name").notNullable();
    //   })
    //   .then(() => {
    //     db("persons").insert({ id: 1, name: "Test" });
    //   });
  },
  methods: {
    handleContextMenu({ root, node, data }) {
      this.contextRoot = root;
      this.contextNode = node;
      this.contextData = data;
    },
    handleCheck(checkeds, node) {
      let info = this.mapLayer;
      info.forEach((item, index) => {
        if (checkeds.indexOf(item.key) == -1) {
          item.checked = false;
        } else {
          item.checked = true;
        }
      });
      // mapLayerStore.write(JSON.stringify(info))
    },
    updateLayer() {
      // mapLayerStore.write(JSON.stringify(this.$refs['tree'].data))
    },
    remove(root, node, data) {
      this.$Modal.confirm({
        title: "是否删除菜单",
        onOk: () => {
          mapLayerStore.removeLayer(data);
        },
      });
    },
    renderContent(h, { root, node, data }) {
      return h(
        "span",
        {
          style: {
            display: "inline-block",
            width: "100%",
          },
          on: {
            contextmenu: (e) => {
              e.preventDefault();
              this.handleContextMenu({ root, node, data });
            },
          },
        },
        [
          h("span", [
            // h('Icon', {
            //     props: {
            //         type: 'ios-paper-outline'
            //     },
            //     style: {
            //         marginRight: '8px'
            //     }
            // }),
            h("span", data.title),
          ]),
          h(
            "span",
            {
              style: {
                display: "inline-block",
                float: "right",
                marginRight: "64px",
              },
            },
            [
              h("Icon", {
                props: {
                  type: "ios-trash-outline",
                },
                style: {
                  marginRight: "8px",
                },
                on: {
                  click: () => {
                    this.remove(root, node, data);
                  },
                },
              }),
              // h('Button', {
              //     props: Object.assign({}, this.buttonProps, {
              //         icon: 'ios-remove'
              //     }),
              //     on: {
              //         click: () => { this.remove(root, node, data) }
              //     }
              // })
            ]
          ),
        ]
      );
    },
    /**
     * 缩放至图层
     */
    zoomToLayer() {
      const node = this.contextNode;
      let layer = homeStore.getLayerBySysId(node.nodeKey);
      homeStore.map.getView().fit(layer.getSource().getExtent());
    },
  },
};
</script>

<style lang="less" scoped>
/deep/ .demo-tree-render {
  .ivu-tree-title {
    width: 80%;
  }
}
</style>
