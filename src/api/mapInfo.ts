import { IMapInfo } from "types";
import { getBaseFun, IBaseFun } from "./basic";

const baseFun: IBaseFun = getBaseFun<IMapInfo>("MapInfo")


const getById = baseFun.getById;
const getList = baseFun.getList;
const updateById = baseFun.updateById;
export { getById, getList, updateById }

