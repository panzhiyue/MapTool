import gdal from "gdal"

export default class SpatialReference {
    result: _parse;
    constructor(arg) {
        if (arg instanceof Buffer) {
            arg = arg.toString();
        }


        var result;
        var esri_try = false;
        try {
            result = new _parse(arg);
        } catch (err) {
            if (arg.indexOf('ESRI::') !== 0) {
                try {
                    esri_try = true;
                    result = new _parse('ESRI::' + arg);
                } catch (esri_err) {
                    throw err; // throw original error
                }
            } else {
                throw err;
            }
        }

        // if the first parse succeeded without throwing
        // but still failed to detect the proj4 string then
        // we need to try harder and assume an ESRI variant
        if (result.proj4 === undefined &&
            esri_try === false &&
            arg.indexOf('ESRI::') !== 0) {
            try {
                var esri_result = new _parse('ESRI::' + arg);
                // success detecting proj4 as ESRI variant?
                if (esri_result.proj4) {
                    result = esri_result;
                }
            } catch (err) {
                // pass
            }
        }


        this.result = result
    }
}

class _parse {
    input: string;
    name: string;
    proj4: string;
    srid: number;
    auth: string;
    pretty_wkt: string;
    esri: boolean;
    valid: boolean;
    is_geographic: boolean;

    constructor(str: string) {
        this.input = str;
        let srs, auth, name, code;
        try {
            srs = gdal.SpatialReference.fromUserInput(str);
            this.esri = str.indexOf('ESRI::') == 0;
        } catch {
            srs = gdal.SpatialReference.fromESRI(str.split(/[ \t\n]/));
            this.esri = true;
        }

        this.valid = srs.validate() === null;

        try {
            this.proj4 = srs.toProj4();
        } catch (err) { }
        try {
            srs.autoIdentifyEPSG();
        } catch (err) { }

        if (!srs.isProjected()) {
            this.is_geographic = true;
            if (code = srs.getAuthorityCode('GEOGCS')) {
                this.srid = parseInt(code);
            }
            if (auth = srs.getAuthorityName('GEOGCS')) {
                this.auth = auth;
            }
            if (name = srs.getAttrValue('GEOGCS')) {
                this.name = name;
            }
        } else {
            this.is_geographic = false;
            if (code = srs.getAuthorityCode('PROJCS')) {
                this.srid = parseInt(code);
            }
            if (auth = srs.getAuthorityName('PROJCS')) {
                this.auth = auth;
            }
            if (name = srs.getAttrValue('PROJCS')) {
                this.name = name;
            }
        }

        try {
            this.pretty_wkt = srs.toPrettyWKT();
        } catch (err) { }
    }
}
