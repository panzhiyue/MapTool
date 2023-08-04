
import { IConfig } from "types";
import { getBaseFun, IBaseFun } from "../basic"
import { getDb } from "@/utils/db/MapTool";

const baseFun: IBaseFun = getBaseFun<IConfig>(await getDb(), "Config");

const getById = baseFun.getById;
const getList = baseFun.getList;
const updateById = baseFun.updateById;
export { getById, getList, updateById }


