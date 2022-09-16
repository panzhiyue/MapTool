import fs from "fs";
const knex = require("knex");
let filename = "I:\\MapTool\\static\\sqlite.db";
let db;
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
  db.schema.hasTable("MapInfo").then((exists) => {
    if (!exists) {
      db.schema
        .createTable("MapInfo", (table) => {
          table.increments('id').notNullable();
          table.primary(['id']);
          table.string("name").comment("地图名称");
          table.decimal("zoom").comment("地图层级");
          table.decimal("centerx").comment("中心点x");
          table.decimal("centery").comment("中心点y");
        })
        .then(() => {
          db("MapInfo")
            .insert({
              name: "Test",
              zoom: 10,
              centerx: 120,
              centery: 28,
            })
            .then((result) => { });
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

