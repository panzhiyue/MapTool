import { Geometry } from "ol/geom"
import { GeoJSON } from "ol/format"
import * as turf from "@turf/turf"

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

export const getLength = (geometry: Geometry): number => {
    let geojson = JSON.parse(formatGeoJSON.writeGeometry(geometry));
    return turf.length(geojson, { units: 'meters' })
}