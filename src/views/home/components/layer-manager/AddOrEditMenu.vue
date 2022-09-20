<template>
  <a-modal
    v-model:visible="visible"
    title="添加菜单"
    okText="确定"
    cancelText="取消"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <a-form ref="formRef" :model="menu" :rules="formRules" v-if="menu">
      <a-form-item label="菜单名称" name="title">
        <a-input v-model:value="menu.title" />
      </a-form-item>
      <a-form-item>
        <a-checkbox class="chkExpand" v-model:checked="menu.expand"
          >默认展开</a-checkbox
        >
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup>
import { buildUUID } from "@/utils/uuid";
import { add, updateById } from "@/api/layerInfo.ts";
import ResponseCode from "../../../../enum/ResponseCode";
import { useHomeStore } from "@/store/home";

const homeSotre = useHomeStore();

let menu = ref(null);

const formRules = {
  title: { required: true, message: "请输入名称!", trigger: "change" },
};

const formRef = ref(null);

const visible = ref(false);
const type = ref("");
const item = ref(null);

const show = (t, data) => {
  type.value = t;
  visible.value = true;
  item.value = data;
  if (type.value == "edit") {
    menu.value = {
      ...item.value,
    };
  } else {
    menu.value = {
      id: buildUUID(),
      parentId: item.value.id,
      mapId: 0,
      title: "",
      type: "menu",
      expand: false,
      canEdit: true,
      canDelete: true,
    };
  }
};

defineExpose({ show });

const handleOk = () => {
  formRef.value.validate().then((valid) => {
    if (valid) {
      console.log(type.value == "add");
      if (type.value == "add") {
        add(menu.value).then((result) => {
          if (result.code == ResponseCode.SUCCESS) {
            homeSotre.getLayerInfos(1).then(() => {
              visible.value = false;
            });
          }
        });
      } else {
        updateById(menu.value).then((result) => {
          if (result.code == ResponseCode.SUCCESS) {
            homeSotre.getLayerInfos(1).then(() => {
              visible.value = false;
            });
          }
        });
      }
    }
  });
};

const handleCancel = () => {};
</script>

<style lang="less" scoped>
.name {
  font-weight: bold;
  line-height: 30px;
}

.chkExpand {
  margin-top: 20px;
  margin-left: 10px;
}

.ant-form-item {
  margin-bottom: 0px;
}
</style>
