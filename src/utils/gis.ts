import { Geometry, Point, MultiPoint, LineString, MultiLineString, Polygon, MultiPolygon } from "ol/geom"
import { GeoJSON, TopoJSON, WKT, EsriJSON } from "ol/format"
import * as turf from "@turf/turf"
import VectorType from "@/enum/VectorLayerType"
import GisFormat from "@/enum/GisFormatType";

const formatGeoJSON = new GeoJSON();

/**
 * 获取几何质心
 */
export const getCenterOfMass = (geometry: Geometry): number[] => {
    let geojson = JSON.parse(formatGeoJSON.writeGeometry(geometry));
    return turf.centerOfMass(geojson).geometry.coordinates;
}

/**
 * 内部点
 */
export const getPointOnFeature = (geometry: Geometry): number[] => {
    let geojson = JSON.parse(formatGeoJSON.writeGeometry(geometry));
    return turf.pointOnFeature(geojson).geometry.coordinates;
}

/**
 * 计算几何面积
 */
export const getArea = (geometry: Geometry): number => {
    let geojson = JSON.parse(formatGeoJSON.writeGeometry(geometry));
    return turf.area(geojson);
}

/**
 * 计算长度(周长)
 * @param geometry 
 * @returns 
 */
export const getLength = (geometry: Geometry): number => {
    let geojson = JSON.parse(formatGeoJSON.writeGeometry(geometry));
    return turf.length(geojson, { units: 'meters' })
}

/**
 * 获取矢量类型
 */
export const getVectorType = (geometry: Geometry) => {
    if (geometry instanceof Point || geometry instanceof MultiPoint) {
        return VectorType.POINT;
    } else if (geometry instanceof LineString || geometry instanceof MultiLineString) {
        return VectorType.LINESTRING;
    } else if (geometry instanceof Polygon || geometry instanceof MultiPolygon) {
        return VectorType.POLYGON;
    } else {
        return null;
    }
}

export const gisFormat = {
    "geojson": new GeoJSON(),
    "topojson": new TopoJSON(),
    "wkt": new WKT(),
    "esrijson": new EsriJSON()
}


export const convertGisFormat = (text: string, originFormatType: GisFormat, destFormatType: GisFormat, gisType) => {
    let originFormat = gisFormat[originFormatType];
    let destFormat = gisFormat[destFormatType];
    console.log(originFormat, destFormat);
    if (gisType == "geometry") {
        return destFormat.writeGeometry(originFormat.readGeometry(text))
    } else if (gisType == "feature") {
        return destFormat.writeFeature(originFormat.readFeature(text))
    } else if (gisType == "features") {
        return destFormat.writeFeatures(originFormat.readFeatures(text))
    }
}