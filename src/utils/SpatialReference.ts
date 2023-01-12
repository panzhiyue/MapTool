import WktParser from 'wkt-parser';
import proj4 from "proj4"
import { get } from "ol/proj"
import { register } from "ol/proj/proj4";
import loadsh from "loadsh"
import parseString from "wkt-parser/parser"
export default class SpatialReference {
    result: any;
    wkt: Array<any> | null;
    constructor(str) {
        if (!str) {
            throw "str不能为空"
        }

        this.result = WktParser(str)
        this.wkt = parseString(str);
        this.result.input = str;
        if (!get(this.getAuthority())) {
            proj4.defs(this.getAuthority(), this.result.input);
            register(proj4);
        }
    }

    getAuthoritySrid() {
        return this._getAuthoritySrid(this.result);
    }
    private _getAuthoritySrid(info) {
        for (let f in info.AUTHORITY) {
            return info.AUTHORITY[f];
        }
    }
    getAuthorityName() {
        return this._getAuthorityName(this.result);
    }
    private _getAuthorityName(info) {
        for (let f in info.AUTHORITY) {
            return f
        }
    }


    getAuthority() {
        return `${this.getAuthorityName()}:${this.getAuthoritySrid()}`
    }

    private _getAuthority(info) {
        return `${this._getAuthorityName(info)}:${this._getAuthoritySrid(info)}`
    }

    getName(): string {
        return this.result.name;
    }

    private _getName(info) {
        return info.name;
    }

    getProjection() {
        return get(this.getAuthority())
    }

    exportToPrettyWKT() {
        let result = "";
        let deep = 0;
        let hh = 0;
        for (let index in this.result.input) {
            let i = this.result.input[index]
            let next = this.result.input[index + 1]
            result += i;
            if (i == "[") {
                deep++;
                hh++;
            }
            if (i == "]") {
                deep--;
            }
            if (i == "," && next == "\"") {

                result += `\n`;
                for (let j = 0; j < deep; j++) {
                    result += "    ";
                }
                hh--;
            }
        }
        return result
    }

    exportToEsriInfo() {
        let result = `${this._getName(this.result)}
WKID:${this._getAuthoritySrid(this.result)} 权限:${loadsh.capitalize(this._getAuthorityName(this.result))}

`
        if (this.result.type == "GEOGCS") {
            return result + this._getGeogcsInfo(this.result);
        } else {
            return result + `${this._getProjcsInfo(this.result)}

${this._getGeogcsInfo(this.result.GEOGCS)}`
        }
    }

    private _getProjcsInfo(projcs) {
        let result = `Projection: ${projcs.projName}\n`;
        for (let i in this.wkt) {
            let info = this.wkt[i];
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
