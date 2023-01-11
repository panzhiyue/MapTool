import WktParser from 'wkt-parser';
import proj4 from "proj4"
import { get } from "ol/proj"
import { register } from "ol/proj/proj4";
export default class SpatialReference {
    result: any;
    constructor(str) {
        if (!str) {
            throw "str不能为空"
        }

        this.result = WktParser(str)
        this.result.input = str;
        if (!get(this.getAuthority())) {
            proj4.defs(this.getAuthority(), this.result.input);
            register(proj4);
        }
    }

    getAuthoritySrid() {
        for (let f in this.result.AUTHORITY) {
            return this.result.AUTHORITY[f];
        }
    }

    getAuthorityName() {
        for (let f in this.result.AUTHORITY) {
            return f
        }
    }

    getAuthority() {
        return `${this.getAuthorityName()}:${this.getAuthoritySrid()}`
    }

    public getName(): string {
        return this.result.name;
    }
}
