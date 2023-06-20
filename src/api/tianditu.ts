import { IAdministrativeOptions, IAdministrativeResult, IGeocoderOptions, IGeocoderResult, IReverseGeocoderOptions, IReverseGeocoderResult } from "../../types/tianditu";
import request from "@/utils/axios"

const token = "6703c18da8b111f1ac38fdcfc4a138d8";

/**
 * 地理编码查询
 * @param  options  请求参数
 */
export const geocoder = async (options: IGeocoderOptions): Promise<IGeocoderResult> => {
    return request({
        url: `https://api.tianditu.gov.cn/geocoder`,
        params: {
            tk: token,
            ds: {
                keyWord: options.keyWord
            }
        }
    })
}

/**
 * 逆地理编码
 * @param options 请求参数 
 */
export const reverseGeocoder = (options: IReverseGeocoderOptions): Promise<IReverseGeocoderResult> => {
    return request({
        url: `https://api.tianditu.gov.cn/geocoder`,
        params: {
            tk: token,
            type: "geocode",
            postStr: {
                ver: "1",
                ...options
            }
        }
    })
}


/**
 * 行政区划
 * @param options 请求参数 
 */
export const administrative = (options: IAdministrativeOptions): Promise<IAdministrativeResult> => {
    return request({
        url: `https://api.tianditu.gov.cn/administrative`,
        params: {
            tk: token,
            postStr: {
                ...options
            }
        }
    })
}