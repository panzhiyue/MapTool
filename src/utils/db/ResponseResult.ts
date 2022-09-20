import ResponseCode from "@/enum/ResponseCode";
class ResponseResult<T> {
    public data: T;
    public code: ResponseCode;
    public msg: String;

    public constructor(data: T, code: Number, msg: String) {
        this.data = data;
        this.code = code;
        this.msg = msg;
    }

    public static buildSuccess(data: any) {
        return new ResponseResult(data, ResponseCode.SUCCESS, '成功')
    }

    public static buildError(msg: string) {
        return new ResponseResult(null, ResponseCode.INTERNAL_SERVER_ERROR, msg)
    }

    public static buildBAD_REQUEST(msg: string) {
        return new ResponseResult(null, ResponseCode.BAD_REQUEST, msg)
    }

    
}

export default ResponseResult;