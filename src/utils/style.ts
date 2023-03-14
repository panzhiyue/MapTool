import { IStyle, IPointStyle, ILineStringStyle, IPolygonStyle } from "#/index"
import StyleType from "@/enum/StyleType"
import VectorLayerType from "@/enum/VectorLayerType";
import { Style, Circle, Stroke, Fill, Icon } from "ol/style"
/**
 * 默认点样式
 */
const defaultPointStyle: IPointStyle = {
    type: StyleType.POINT,
    fillColor: "#ff0000",
    size: 10,
    lineWidth: 1,
    lineColor: "#ff0000",
};


/**
 * 默认线样式
 */
const defaultLineStringStyle: ILineStringStyle = {
    type: StyleType.LINESTRING,
    lineWidth: 10.0,
    lineColor: "#ff0000"
}

/**
 * 默认面样式
 */
const defaultPolygonStyle: IPolygonStyle = {
    type: StyleType.POLYGON,
    fillColor: "#ff0000",
    lineWidth: 1,
    lineColor: "#ff0000",
}

/**
 * 获取默认样式
 * @param type 样式类型
 * @returns 
 */
export const getDefaultStyle = (type: VectorLayerType): IStyle => {
    switch (type) {
        case VectorLayerType.POINT: {
            return defaultPointStyle;
        }
        case VectorLayerType.LINESTRING: {
            return defaultLineStringStyle;
        }
        case VectorLayerType.POLYGON: {
            return defaultPolygonStyle;
        }
        default: {
            return null;
        }
    }
}


export const getOLStyle = (styleOptions: IStyle) => {
    if (!styleOptions) {
        return null;
    }
    switch (styleOptions.type) {
        case StyleType.POINT: {
            return new Style({
                image: new Circle({
                    radius: styleOptions.size,
                    fill: new Fill({
                        color: styleOptions.fillColor
                    }),
                    stroke: new Stroke({
                        width: styleOptions.lineWidth,
                        color: styleOptions.lineColor
                    })
                })
            })
        }
        case StyleType.LINESTRING: {
            return new Style({
                stroke: new Stroke({
                    width: styleOptions.lineWidth,
                    color: styleOptions.lineColor
                })
            })
        }
        case StyleType.POLYGON: {
            return new Style({
                fill: new Fill({
                    color: styleOptions.fillColor
                }),
                stroke: new Stroke({
                    color: styleOptions.lineColor,
                    width: styleOptions.lineWidth
                })
            })
        }

    }
}