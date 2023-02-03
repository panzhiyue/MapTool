import WktParser from 'wkt-parser';
import proj4 from "proj4"
import { get } from "ol/proj"
import { register } from "ol/proj/proj4";
import loadsh from "loadsh"
import parseString from "wkt-parser/parser"
import { ISpatialReferenceOptions } from '#/index';
export default class SpatialReference {
    srid: number | string;
    name: string;
    auth_name: string;
    auth_srid: number | string;
    srtext: string;
    proj4text: string;

    wktParserResult: any;
    wktParserString: Array<any> | null;
    constructor(options: ISpatialReferenceOptions) {
        this.srid = options.srid;
        this.name = options.name;
        this.auth_name = options.auth_name;
        this.auth_srid = options.auth_srid;
        this.srtext = options.srtext;
        this.proj4text = options.proj4text;
        this.wktParserResult = WktParser(options.srtext)
        this.wktParserString = parseString(options.srtext);
        if (!get(this.getAuthority())) {
            proj4.defs(this.getAuthority(), this.srtext);
            register(proj4);
        }
    }

    getAuthority() {
        return `${this.auth_name}:${this.auth_srid}`
    }

    getProjection() {
        return get(this.getAuthority())
    }

    exportToArcMap() {
        return new WktInfo(this.srtext).exportToArcMap();
    }
}


export class WktInfo {
    wktParserResult: any;
    wktParserStringResult: Array<any> | null;
    constructor(str) {
        this.wktParserResult = WktParser(str)
        this.wktParserStringResult = parseString(str);
    }

    exportToArcMap() {
        let result = `${this._getName(this.wktParserResult)}
WKID:${this._getAuthoritySrid(this.wktParserResult)} 权限:${loadsh.capitalize(this._getAuthorityName(this.wktParserResult))}

`
        if (this.wktParserResult.type == "GEOGCS") {
            return result + this._getGeogcsInfo(this.wktParserResult);
        } else {
            return result + `${this._getProjcsInfo(this.wktParserResult)}

${this._getGeogcsInfo(this.wktParserResult.GEOGCS)}`
        }
    }

    private _getProjcsInfo(projcs) {
        let result = `Projection: ${projcs.projName}\n`;
        for (let i in this.wktParserStringResult) {
            let info = this.wktParserStringResult[i];
            if (info[0].toUpperCase() == "PARAMETER") {
                result += `${info[1]}: ${info[2]}\n`;
            }
        }
        result += `Linear Unit: ${loadsh.capitalize(projcs.UNIT.name)}(${projcs.UNIT.convert})`;
        return result;
    }

    private _getGeogcsInfo(geogcs: any) {
        let result = `Geographic Coordinate System: ${geogcs.name}
Angular Unit: ${loadsh.capitalize(geogcs.UNIT.name)}(${geogcs.UNIT.convert})
Prime Meridian: ${loadsh.capitalize(geogcs.PRIMEM.name)}(${geogcs.PRIMEM.convert})
Datum: ${geogcs.DATUM.name}
  Spheroid: ${geogcs.DATUM.SPHEROID.name}
    Semimajor Axis: ${geogcs.DATUM.SPHEROID.a}
    Semiminor Axis: ${this.getSemiminorAxis(geogcs.DATUM.SPHEROID.a, geogcs.DATUM.SPHEROID.rf)}
    Inverse Flattening: ${geogcs.DATUM.SPHEROID.rf}
`;

        return result;
    }

    private _getName(info) {
        return info.name;
    }

    getAuthoritySrid() {
        return this._getAuthoritySrid(this.wktParserResult);
    }
    private _getAuthoritySrid(info) {
        for (let f in info.AUTHORITY) {
            return info.AUTHORITY[f];
        }
    }
    getAuthorityName() {
        return this._getAuthorityName(this.wktParserResult);
    }
    private _getAuthorityName(info) {
        for (let f in info.AUTHORITY) {
            return f
        }
    }
    /**
     * 获取短轴长度
     * @param semimajorAxis 长轴半径
     * @param rf 反扁率,1/扁率
     */
    getSemiminorAxis(semimajorAxis: number, rf): number {
        let semiminorAxis = semimajorAxis - semimajorAxis / rf;
        return semiminorAxis;
    }
}