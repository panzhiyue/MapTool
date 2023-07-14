
/**
 * 涂鸦板
 */
class GraffitiBoard {
    /**
     * 绘图容器
     *
     * @private
     * @type {HTMLCanvasElement}
     * @memberof GraffitiBoard
     */
    private cbtCanvas: HTMLCanvasElement;
    /**
     * 绘图对象
     *
     * @private
     * @type {CanvasRenderingContext2D}
     * @memberof GraffitiBoard
     */
    private ctx: CanvasRenderingContext2D | null;
    /**
     * 绘图基础配置
     *
     * @private
     * @type {Object}
     * @memberof GraffitiBoard
     */
    private paintConfig: Object = {
        lineWidth: 1,//线条宽度，默认1
        strokeStyle: '#ff0000',//画笔颜色，默认红色
        fillStyle: '#ff0000',//填充色
        shadowBlur: 5,//阴影模糊级别
        lineJoin: "round",//线条交角样式，默认圆角
        lineCap: "round",//线条结束样式，默认圆角
        enableFill: false,//不允许填充颜色
    };

    private type: string;
    constructor(opt_options) {
        let options = Object.assign({}, opt_options)

        this.cbtCanvas = getDom(options.canvas);
        //浏览器是否支持Canvas
        this.ctx = this.cbtCanvas.getContext("2d");

        this.cbtCanvas.onmousedown = this.mouseDown;
    }

    begin(type) {
        this.type = type;
    }

    /**
     * 鼠标按键点击（首次点击确定开始坐标点，拖动鼠标不断进行图形重绘）
     * @param e 
     */
    mouseDown(e) {
        var btnNum = e.button;
        //坐标左键
        if (btnNum === 0) {

        }
    }
}

export default GraffitiBoard;