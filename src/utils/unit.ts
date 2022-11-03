import AreaUnit from "@/enum/AreaUnit"
import LengthUnit from "@/enum/LengthUnit"

/**
 * 面积单位换算
 * @param area 面积
 * @param originUnit 源单位 
 * @param destUnit 目标单位
 * @returns 
 */
export const conversionAreaUnit = (area: number, originUnit: AreaUnit, destUnit: AreaUnit): number => {
    return getUnitArea(fromUnitArea(area, originUnit), destUnit);
}

/**
 * 从平方米换算到指定面积单位
 * @param area 面积
 * @param unit 指定单位
 * @returns
 */
export const getUnitArea = (area: number, unit: AreaUnit): number => {
    switch (unit) {
        case AreaUnit["M²"]: {
            return area;
        }
        case AreaUnit["KM²"]: {
            return area * 1e-6;
        }
        case AreaUnit["ARE"]: {
            return area * 0.01;
        }
        case AreaUnit["HECTARE"]: {
            return area * 0.0001;
        }
        case AreaUnit["ACRE"]: {
            return area * 0.0002471;
        }
        default: {
            return area;
        }
    }

}


/**
 * 从指定面积单位换算到平方米
 * @param area 面积
 * @param unit 指定单位
 * @returns
 */
export const fromUnitArea = (area: number, unit: AreaUnit): number => {
    switch (unit) {
        case AreaUnit["M²"]: {
            return area;
        }
        case AreaUnit["KM²"]: {
            return area / 1e-6;
        }
        case AreaUnit["ARE"]: {
            return area / 0.01;
        }
        case AreaUnit["HECTARE"]: {
            return area / 0.0001;
        }
        case AreaUnit["ACRE"]: {
            return area / 0.0002471;
        }
        default: {
            return area;
        }
    }
}




/**
 * 长度单位换算
 * @param area 长度
 * @param originUnit 源单位 
 * @param destUnit 目标单位
 * @returns 
 */
export const conversionLengthUnit = (area: number, originUnit: AreaUnit, destUnit: AreaUnit): number => {
    return getUnitArea(fromUnitArea(area, originUnit), destUnit);
}

/**
 * 从米换算到指定长度单位
 * @param length 长度
 * @param unit 指定单位
 * @returns
 */
export const getUnitLength = (length: number, unit: LengthUnit): number => {
    switch (unit) {
        case LengthUnit.M: {
            return length;
        }
        case LengthUnit.KM: {
            return length * 0.001;
        }
        case LengthUnit.CM: {
            return length * 100;
        }
        case LengthUnit.MM: {
            return length * 1000;
        }
        case LengthUnit.NMI: {
            return length * 0.00054;
        }
        case LengthUnit.YD: {
            return length * 1.0936133;
        }
        case LengthUnit.IN: {
            return length * 39.3700787;
        }
        case LengthUnit.FT: {
            return length * 3.2808399;
        }
        case LengthUnit.MI: {
            return length * 0.0006214;
        }
        default: {
            throw `未知的长度单位'${unit}'`
        }
    }

}


/**
 * 从指定长度单位换算到米
 * @param length 长度
 * @param unit 指定单位
 * @returns
 */
export const fromUnitLength = (length: number, unit: LengthUnit): number => {
    switch (unit) {
        case LengthUnit.M: {
            return length;
        }
        case LengthUnit.KM: {
            return length / 0.001;
        }
        case LengthUnit.CM: {
            return length / 100;
        }
        case LengthUnit.MM: {
            return length / 1000;
        }
        case LengthUnit.NMI: {
            return length / 0.00054;
        }
        case LengthUnit.YD: {
            return length / 1.0936133;
        }
        case LengthUnit.IN: {
            return length / 39.3700787;
        }
        case LengthUnit.FT: {
            return length / 3.2808399;
        }
        case LengthUnit.MI: {
            return length / 0.0006214;
        }
        default: {
            throw `未知的长度单位'${unit}'`
        }
    }
}