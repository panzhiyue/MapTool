import fs from "fs";
import { getDbPath } from "../path"
const knex = require("knex");
let filename = getDbPath('MapTool.db');
let db: any;
const initDB = async () => {
  if (!fs.existsSync(filename)) {
    await fs.openSync(filename, "w");
    db = await knex({
      client: "better-sqlite3",
      connection: {
        filename: filename,
      },
      useNullAsDefault: true,
    });
  } else {
    db = await knex({
      client: "better-sqlite3",
      connection: {
        filename: filename,
      },
      useNullAsDefault: true,
    });
  }
  await createTable();
};

const createTable = async () => {
  await db.schema.hasTable("MapInfo").then(async (exists: Boolean) => {
    if (!exists) {
      await db.schema
        .createTable("MapInfo", (table: any) => {
          table.increments("m_id").notNullable();
          table.text('id').notNullable().unique();
          table.primary(['id']);
          table.text("name").comment("地图名称").notNullable();
          table.double("zoom").comment("地图层级").notNullable();
          table.double("centerx").comment("中心点x").notNullable();
          table.double("centery").comment("中心点y").notNullable();
          table.boolean("pan").comment("漫游").notNullable();
          table.boolean("select").comment("选择").notNullable();
          table.boolean("doubleclickzoom").comment("双击缩放").notNullable();
          table.boolean("mousewheelzoom").comment("滚轮缩放").notNullable();
          table.boolean("dragZoomIn").comment("选框放大").notNullable();
          table.boolean("dragZoomOut").comment("选框缩小").notNullable();
          table.text("srs").comment("坐标系").notNullable();
        })
        .then(async () => {
          await db("MapInfo")
            .insert({
              id: "1",
              name: "Test",
              zoom: 10,
              centerx: 120,
              centery: 28,
              pan: true,
              select: false,
              doubleclickzoom: true,
              mousewheelzoom: true,
              dragZoomIn: false,
              dragZoomOut: false,
              srs: `EPSG:4490`,
            })
            .then((result: any) => { });
        });
    }
  });

  await db.schema.hasTable("LayerInfo").then(async (exists: Boolean) => {
    if (!exists) {
      await db.schema
        .createTable("LayerInfo", (table: any) => {
          table.increments("m_id").notNullable();
          table.text('id').notNullable().unique();
          table.text('parentId').comment('父菜单id').notNullable();
          table.integer('mapId').comment('地图id').notNullable();
          table.text('title').comment('菜单名称').notNullable();
          table.text('type').comment('菜单类型').notNullable();
          table.boolean('canDelete').comment('是否允许删除').notNullable();
          table.boolean('expand').comment('是否默认展开').notNullable();
          table.boolean('canEdit').comment('是否允许编辑').notNullable();
          table.jsonb('info').comment('菜单信息');
        })
        .then(async () => {
          await db("LayerInfo")
            .insert([
              {
                id: '1',
                parentId: '0',
                mapId: 0,
                title: '瓦片图层',
                type: 'menu',
                canDelete: false,
                expand: true,
                canEdit: false,
              },
              {
                id: '1-1',
                parentId: '1',
                mapId: 0,
                title: '中国天地图',
                type: 'menu',
                canDelete: false,
                expand: false,
                canEdit: false,
              },
              {
                id: '1-1-1',
                parentId: '1-1',
                mapId: 0,
                title: '矢量地图',
                type: 'layer',
                canDelete: false,
                expand: false,
                canEdit: false,
                info: JSON.stringify({
                  type: "TDT",
                  layer: "vec",
                  maxZoom: 18,
                  minZoom: 1
                })
              },
              {
                id: '1-1-2',
                parentId: '1-1',
                mapId: 0,
                title: '矢量注记',
                type: 'layer',
                canDelete: false,
                expand: false,
                canEdit: false,
                info: JSON.stringify({
                  type: "TDT",
                  layer: "cva",
                  maxZoom: 18,
                  minZoom: 1
                })
              },
              {
                id: '1-1-3',
                parentId: '1-1',
                mapId: 0,
                title: '矢量英文注记',
                type: 'layer',
                canDelete: false,
                expand: false,
                canEdit: false,
                info: JSON.stringify({
                  type: "TDT",
                  layer: "eva",
                  maxZoom: 18,
                  minZoom: 1
                })
              },
              {
                id: '1-1-4',
                parentId: '1-1',
                mapId: 0,
                title: '影像地图',
                type: 'layer',
                canDelete: false,
                expand: false,
                canEdit: false,
                info: JSON.stringify({
                  type: "TDT",
                  layer: "img",
                  maxZoom: 18,
                  minZoom: 1
                })
              },
              {
                id: '1-1-5',
                parentId: '1-1',
                mapId: 0,
                title: '影像注记',
                type: 'layer',
                canDelete: false,
                expand: false,
                canEdit: false,
                info: JSON.stringify({
                  type: "TDT",
                  layer: "cia",
                  maxZoom: 18,
                  minZoom: 1
                })
              },
              {
                id: '1-1-6',
                parentId: '1-1',
                mapId: 0,
                title: '影像英文注记',
                type: 'layer',
                canDelete: false,
                expand: false,
                canEdit: false,
                info: JSON.stringify({
                  type: "TDT",
                  layer: "eia",
                  maxZoom: 18,
                  minZoom: 1
                })
              },
              {
                id: '1-1-7',
                parentId: '1-1',
                mapId: 0,
                title: '地形地图',
                type: 'layer',
                canDelete: false,
                expand: false,
                canEdit: false,
                info: JSON.stringify({
                  type: "TDT",
                  layer: "ter",
                  maxZoom: 18,
                  minZoom: 1
                })
              },
              {
                id: '1-1-8',
                parentId: '1-1',
                mapId: 0,
                title: '地形注记',
                type: 'layer',
                canDelete: false,
                expand: false,
                canEdit: false,
                info: JSON.stringify({
                  type: "TDT",
                  layer: "cta",
                  maxZoom: 18,
                  minZoom: 1
                })
              },
              {
                id: '1-1-9',
                parentId: '1-1',
                mapId: 0,
                title: '全球境界',
                type: 'layer',
                canDelete: false,
                expand: false,
                canEdit: false,
                info: JSON.stringify({
                  type: "TDT",
                  layer: "ibo",
                  maxZoom: 18,
                  minZoom: 1
                })
              },

              {
                id: '1-2',
                parentId: '1',
                mapId: 0,
                title: '百度地图',
                type: 'menu',
                canDelete: false,
                expand: false,
                canEdit: false,
              },
              {
                id: '1-2-1',
                parentId: '1-2',
                mapId: 0,
                title: '矢量地图',
                type: 'layer',
                canDelete: false,
                expand: false,
                canEdit: false,
                info: JSON.stringify({
                  type: "BaiDu",
                  layer: "normal_map",
                  maxZoom: 19,
                  minZoom: 1
                })
              },
              {
                id: '1-2-2',
                parentId: '1-2',
                mapId: 0,
                title: '影像地图',
                type: 'layer',
                canDelete: false,
                expand: false,
                canEdit: false,
                info: JSON.stringify({
                  type: "BaiDu",
                  layer: "satellite_map",
                  maxZoom: 19,
                  minZoom: 1
                })
              },
              {
                id: '1-2-3',
                parentId: '1-2',
                mapId: 0,
                title: '影像注记',
                type: 'layer',
                canDelete: false,
                expand: false,
                canEdit: false,
                info: JSON.stringify({
                  type: "BaiDu",
                  layer: "satellite_annotion",
                  maxZoom: 19,
                  minZoom: 1
                })
              },
              {
                id: '1-3',
                parentId: '1',
                mapId: 0,
                title: '高德地图',
                type: 'menu',
                canDelete: false,
                expand: false,
                canEdit: false,
              },
              {
                id: '1-3-1',
                parentId: '1-3',
                mapId: 0,
                title: '矢量地图',
                type: 'layer',
                canDelete: false,
                expand: false,
                canEdit: false,
                info: JSON.stringify({
                  type: "GaoDe",
                  layer: "normal_map",
                  maxZoom: 18,
                  minZoom: 1
                })
              },
              {
                id: '1-3-2',
                parentId: '1-3',
                mapId: 0,
                title: '影像地图',
                type: 'layer',
                canDelete: false,
                expand: false,
                canEdit: false,
                info: JSON.stringify({
                  type: "GaoDe",
                  layer: "satellite_map",
                  maxZoom: 18,
                  minZoom: 1
                })
              },
              {
                id: '1-3-3',
                parentId: '1-3',
                mapId: 0,
                title: '影像注记',
                type: 'layer',
                canDelete: false,
                expand: false,
                canEdit: false,
                info: JSON.stringify({
                  type: "GaoDe",
                  layer: "satellite_annotion",
                  maxZoom: 18,
                  minZoom: 1
                })
              },
              {
                id: '1-4',
                parentId: '1',
                mapId: 0,
                title: '智图',
                type: 'menu',
                canDelete: false,
                expand: false,
                canEdit: false,
              },
              {
                id: '1-4-1',
                parentId: '1-4',
                mapId: 0,
                title: '矢量地图',
                type: 'layer',
                canDelete: false,
                expand: false,
                canEdit: false,
                info: JSON.stringify({
                  type: "Geoq",
                  layer: "normal_map",
                  maxZoom: 16,
                  minZoom: 1
                })
              },
              {
                id: '1-4-2',
                parentId: '1-4',
                mapId: 0,
                title: '午夜蓝',
                type: 'layer',
                canDelete: false,
                expand: false,
                canEdit: false,
                info: JSON.stringify({
                  type: "Geoq",
                  layer: "normal_purplishblue",
                  maxZoom: 16,
                  minZoom: 1
                })
              },

              {
                id: '1-4-3',
                parentId: '1-4',
                mapId: 0,
                title: '灰色',
                type: 'layer',
                canDelete: false,
                expand: false,
                canEdit: false,
                info: JSON.stringify({
                  type: "Geoq",
                  layer: "normal_gray",
                  maxZoom: 16,
                  minZoom: 1
                })
              },
              {
                id: '1-4-4',
                parentId: '1-4',
                mapId: 0,
                title: '暖色',
                type: 'layer',
                canDelete: false,
                expand: false,
                canEdit: false,
                info: JSON.stringify({
                  type: "Geoq",
                  layer: "normal_warm",
                  maxZoom: 16,
                  minZoom: 1
                })
              },
              {
                id: '1-4-5',
                parentId: '1-4',
                mapId: 0,
                title: '水系',
                type: 'layer',
                canDelete: false,
                expand: false,
                canEdit: false,
                info: JSON.stringify({
                  type: "Geoq",
                  layer: "theme_hydro",
                  maxZoom: 16,
                  minZoom: 1
                })
              },
              {
                id: '2',
                parentId: '0',
                mapId: 0,
                title: '矢量图层',
                type: 'menu',
                canDelete: false,
                expand: false,
                canEdit: false,
              },])
            .then((result: any) => { });
        });
    }
  });



  await db.schema.hasTable("MapLayerInfo").then(async (exists: Boolean) => {
    if (!exists) {
      await db.schema
        .createTable("MapLayerInfo", (table: any) => {
          table.increments("m_id").notNullable();
          table.text('id').notNullable().unique();
          table.text('layerId').comment('图层id').notNullable();
          table.integer('mapId').comment('地图id').notNullable();
          table.text('title').comment('图层名称').notNullable();
          table.jsonb('info').comment('图层信息').notNullable();
          table.boolean('checked').comment('是否选中').notNullable();
        })
        .then(async () => {
          await db("MapLayerInfo")
            .insert([{
              id: "1",
              layerId: '1-1-4',
              mapId: 1,
              title: '影像地图',
              checked: true,
              info: JSON.stringify({
                type: "TDT",
                layer: "img",
                maxZoom: 18,
                minZoom: 1
              })
            },
            {
              id: "2",
              layerId: '1-1-5',
              mapId: 1,
              title: '影像注记',
              checked: true,
              info: JSON.stringify({
                type: "TDT",
                layer: "cia",
                maxZoom: 18,
                minZoom: 1
              })
            },])
            .then((result: any) => { });
        });
    }
  });

  await db.schema.hasTable("Config").then(async (exists: Boolean) => {
    if (!exists) {
      await db.schema
        .createTable("Config", (table: any) => {
          table.increments("m_id").notNullable();
          table.text('id').notNullable().unique();
          table.text('name');
          table.boolean('isShowStatusbar');
        })
        .then(() => {
          db("Config")
            .insert([{
              id: "1",
              name: '默认',
              isShowStatusbar: true
            },
            ])
            .then((result: any) => { });
        });
    }
  });
};



export const getDB = async () => {
  if (!db) {
    await initDB();
  }
  return db;
}

