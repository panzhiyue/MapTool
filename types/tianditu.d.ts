/**
 * 地理编码接口传参
 */
export interface IGeocoderOptions {
    keyWord: String   //请求关键字
}

/**
 * 地理编码接口返回结果
 * @example
 * {
    "location": {
        "lon": "116.001688",
        "level": "地名地址",
        "lat": "40.453228"
    },
    "status": "0",
    "msg": "ok",
    "searchVersion": "4.8.0"
   }
 */
export interface IGeocoderResult {
    status: String,  //返回状态  
    msg: String,  //返回信息
    location: {
        //地址信息
        lon: Number,   //坐标点显示经度
        lat: Number,   //坐标点显示纬度
        level?: String, //类别名称
        typeRound: Array<any>   //附近相似点,开启周边查询必需返回。
    }
}


/**
 * 逆地理编码传参
 */
export interface IReverseGeocoderOptions {
    lon: String,   //坐标的x值
    lat: String,  //坐标的y值
    appkey?: String, //网站的唯一编码
    ver?: String  //接口版本
}

/**
 * 逆地理编码返回结果
 * @example 
 * {
    "result": {
        "formatted_address": "北京市西城区西什库大街31号院23东方开元信息科技公司",
        "location": {
            "lon": 116.37304,
            "lat": 39.92594
        },
        "addressComponent": {
            "address": "西什库大街31号院23",
            "city": "北京市西城区",
            "road": "大红罗厂街",
            "poi_position": "东北",
            "address_position": "东北",
            "road_distance": 49,
            "poi": "东方开元信息科技公司",
            "poi_distance": "38",
            "address_distance": 38
        }
    },
    "msg": "ok",
    "status": "0"
}
 */
export interface IReverseGeocoderResult {
    status: String,  //状态   0：正确，1：错误，404：出错。
    msg: String,  //响应信息是否有  OK：有信息   Status=404时返回错误信息。
    result?: {
        //响应的具体信息  有结果时返回
        addressComponent: {
            //此点的具体信息（分类）
            address: String, //此点最近地点信息
            address_distince: Number,  //此点距离最近地点信息距离
            address_position: String,  //此点在最近地点信息方向
            city: String, //此点所在国家或城市或区县
            poi: String,  //距离此点最近poi点
            poi_distince: Number,  //距离此点最近poi点的距离
            poi_position: String, //此点在最近poi点的方向
            road: String,  //距离此点最近的路
            road_distince: Number //此点距离此路的距离
        },
        formatted_address: String,  //详细地址
        location: {
            //此点坐标
            lon: String, //此点坐标x值
            lat: String //此点坐标y值
        }
    }
}


/**
 * 行政区划请求参数
 */
export interface IAdministrativeOptions {
    searchWord: String, //查询关键字。 
    searchType: "0" | "1",  //查询类型   0：根据code查询，1：根据名称。  默认值:0
    needSubInfo: Boolean, //是否需要下一级信息。  默认值：false
    needAll: Boolean,  //是否需要所有子节点。  默认值：false
    needPolygon: Boolean,   //是否需要行政区划范围。  默认值：false
    needPre: Boolean,  //是否需要上一级所有信息。  默认值:false
}

/**
 * 行政区划请求结果
 */
export interface IAdministrativeResult {
    msg: String,  //返回消息。
    dataversion: String, //数据版本(只返回最新数据版本日期)。
    returncode: String, //100 正常 ； 101 没有查到结果 ；其他异常请看描述。
    //返回的行政区划信息。
    data: Array<{
        lnt: Number, //显示经度 。
        lat: Number,  //显示纬度。
        level: String,  //行政区划等级。
        name: String,  //行政区划名称。
        english: String, //行政区划英文名称。
        bound: String, //四角点坐标。
        points: Array<any>, //行政区划范围面。
        region: String, //行政区划范围。
        cityCode: String, //行政区划码。
        adminType: String, //行政区划类别(省市县)。
        englishabbrevation: String,  //行政区划英文简称。
        nameabbrevation: String, //行政区划简称。
        //上级行政区划信息。
        parents: {
            //国家
            country: {
                name: String, //行政区划名称。
                cityCode: String, //行政区划码。
                adminType: String, //行政区划类别(省市县)。
            },
            //省
            province: {
                name: String, //行政区划名称。
                cityCode: String, //行政区划码。
                adminType: String,  //行政区划类别(省市县)。
            },
            //市
            city: {
                name: String, //行政区划名称。
                cityCode: String, //行政区划码。
                adminType: String, //行政区划类别(省市县)。
            }
        }
    }>
}
