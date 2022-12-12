/**
 * @module EMap/Edit/EditHelper
 */
import OLObject from 'ol/Object'


/**
 * 编辑辅助类
 * 这个是一个基类,只用于继承,不在应用中实例化
 */
class EditHelper extends OLObject {
    protected map_;
    protected editorBLL_;
    protected editorControl_;
    constructor(opt_options) {
        let options = Object.assign({ map: null }, opt_options);
        super(options);

        /**
         * 地图
         * @type {module:ol/Map}
         */
        this.map_ = options.map;

        /**
         * 编辑类
         * @type {module:EMap/Edit/Editor}
         */
        this.editorBLL_ = null;

        /**
         * 编辑控件
         * @type {module:EMap/Control/Editor}
         */
        this.editorControl_ = null;
    }

    //#region 编辑对象接口
    /**
     * 开始编辑 
     * @param {function} callback 回调函数
     * @param {function} errorback 错误回调
     */
    KSBJ(callback, errorback) {

    }

    /**
     * 结束编辑
     * @param {function} callback 回调函数
     * @param {function} errorback 错误回调
     */
    JSBJ(callback, errorback) {

    }

    /**
     * 选取图斑
     * @param {module:ol/Feature} 要素
     * @param {function} callback 回调函数
     * @param {function} errorback 错误回调
     */
    XQTB(feature, callback, errorback) {

    }

    /**
     * 创建图斑
     * @param {module:ol/Feature} feature 要素
     * @param {function} callback 回调函数
     * @param {function} errorback 错误回调
     */
    CJTB(feature, callback, errorback) {

    }

    /**
     * 切割图版
     * @param {module:ol/Feature} feature 要素
     * @param {function} callback 回调函数
     * @param {function} errorback 错误回调
     */
    QGTB(feature, callback, errorback) {

    }

    /**
     * 保存图斑
     * @param {function} callback 回调函数
     * @param {function} errorback 错误回调
     */
    BJTB(features, callback, errorback) {

    }

    /**
     * 录入属性
     * @param {module:ol/Feature} feature 要素
     * @param {function} callback 回调函数
     * @param {function} errorback 错误回调
     */
    LRSX(feature, callback, errorback) {

    }

    /**
     * 合并图斑 
     * @param {function} callback 回调函数
     * @param {function} errorback 错误回调
     */
    HBTB(callback, errorback) {

    }

    /**
     * 删除图版
     * @param {module:ol/Feature} feature 要素
     * @param {function} callback 回调函数
     * @param {function} errorback 错误回调
     */
    SCTB(feature, callback, errorback) {

    }
    /**
     * 取消操作 
     * @param {function} callback 回调函数
     * @param {function} errorback 错误回调
     */
    QXCZ(callback, errorback) {

    }

    /**
     * 保存图斑 
     * @param {function} callback 回调函数
     * @param {function} errorback 错误回调
     */
    BCTB(callback, errorback) {

    }
    //#endregion 编辑对象接口

    /**
     * 刷新编辑项 
     */
    refreshEditItem() {

    }

    /**
     * 刷新编辑图层
     */
    refreshEditLayer() {

    }

    /**
     * 绑定编辑类
     * @param {module:EMap/Edit/Editor} editorBLL 编辑类
     */
    setEditorBLL(editorBLL) {
        this.editorBLL_ = editorBLL;
    }

    /**
     * 绑定编辑控件
     * @param {module:EMap/Control/Editor} editorControl 编辑控件
     */
    setEditorControl(editorControl) {
        this.editorControl_ = editorControl;
    }
}

export default EditHelper;
