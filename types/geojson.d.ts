export interface IGeoJSON {
    type: "FeatureCollection",
    features: IFeature[]
}

export interface IFeature {
    type: "Feature",
    geometry: IGeometry,
    properties: object
}

export interface IGeometry {
    type: string,
    coordinates: array<any>
}