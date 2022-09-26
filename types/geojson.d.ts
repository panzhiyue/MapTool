export interface IGeoJSON {
    type: "FeatureCollection",
    features: IFeature[]
}

export interface IFeature {
    type: "Feature",
    geometry: IGeometry,
    properties: Object
}

export interface IGeometry {
    type: String,
    coordinates: Array<any>
}