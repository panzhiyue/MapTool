import { IMapInfo } from "types";
import { getBaseFun, IBaseFun } from "../basic";
import { getDB } from "@/utils/db/MapTool";

const baseFun: IBaseFun = getBaseFun<IMapInfo>(await getDB(), "MapInfo")


const getById = baseFun.getById;
const getList = baseFun.getList;
const updateById = baseFun.updateById;
export { getById, getList, updateById }

