import AreaUnits from "@/enum/AreaUnits"
import LengthUnits from "@/enum/LengthUnits"
import * as turf from "@turf/turf"

/**
 * 面积单位换算
 * @param area 面积
 * @param originUnit 源单位 
 * @param destUnit 目标单位
 * @returns 
 */
export const conversionAreaUnit = (area: number, originUnit: AreaUnits, destUnit: AreaUnits): number => {
    return turf.convertArea(area, originUnit as turf.Units, destUnit as turf.Units);
}




/**
 * 长度单位换算
 * @param area 长度
 * @param originUnit 源单位 
 * @param destUnit 目标单位
 * @returns 
 */
export const conversionLengthUnit = (area: number, originUnit: LengthUnits, destUnit: LengthUnits): number => {
    return turf.convertLength(area, originUnit as turf.Units, destUnit as turf.Units);
}
