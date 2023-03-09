
import { IConfig } from "types";
import { getBaseFun, IBaseFun } from "./basic"

const baseFun: IBaseFun = getBaseFun<IConfig>("Config");

const getById = baseFun.getById;
const getList = baseFun.getList;
const updateById = baseFun.updateById;
export { getById, getList, updateById }


