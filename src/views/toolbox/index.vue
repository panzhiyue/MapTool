<template>
  <a-directory-tree
    v-model:expandedKeys="expandedKeys"
    v-model:selectedKeys="selectedKeys"
    multiple
    :tree-data="treeData"
  >
    <template #title="{ title, key, isLeaf, options }">
      <span v-if="isLeaf" @dblclick="handleDoubleClick(options)">{{
        title
      }}</span>
      <span v-else>{{ title }}</span>
    </template>
  </a-directory-tree>
</template>
<script lang="ts" setup>
import type { TreeProps } from "ant-design-vue";
import { defineComponent, ref } from "vue";
import { ipcRenderer } from "electron";
import WindowName from "@/enum/WindowName";

const expandedKeys = ref<string[]>(["0-0", "0-1"]);
const selectedKeys = ref<string[]>([]);
const treeData: TreeProps["treeData"] = [
  {
    title: "数据管理工具",
    key: "0-0",
    children: [
      {
        title: "leaf 0-0",
        key: "0-0-0",
        isLeaf: true,
        options: {
          url: "aaa",
        },
      },
      {
        title: "leaf 0-1",
        key: "0-0-1",
        isLeaf: true,
      },
    ],
  },
  {
    title: "导出",
    key: "0-1",
    children: [
      {
        title: "导出为图片",
        key: "0-1-0",
        isLeaf: true,
        options: {
          name: WindowName.EXPORT_IMAGE,
          url: "exportImage",
        },
      },
      {
        title: "导出矢量",
        key: "0-1-1",
        isLeaf: true,
        options: {
          name: WindowName.EXPORT_VECTOR,
          url: "exportVector",
        },
      },
      {
        title: "导出属性表",
        key: "0-1-2",
        isLeaf: true,
        options: {
          name: WindowName.EXPORT_ATTRIBUTE_TABLE,
          url: "exportAttributeTable"
        },
      },
    ],
  },
];

const handleDoubleClick = (options: any) => {
  ipcRenderer.send("open-win", options.name, options.url, {
    width: 700,
    height: 400,
    frame: true
  });
};
</script>
