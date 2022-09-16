enum ResponseCode {
    SUCCESS = 200,   //请求成功
    BAD_REQUEST = 400, //请求的地址不存在或者包含不支持的参数
    UNAUTHORIZED = 401,   //未授权
    FORBIDDEN = 403, //被禁止访问
    NOT_FOUND = 404,  //请求的资源不存在
    INTERNAL_SERVER_ERROR = 500,  //内部错误
}

export default ResponseCode