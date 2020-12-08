/**
 * Provide 3D layer to zrender. Which is rendered on top of qtek
 * 
 * @module echarts-x/core/Layer3D
 * @author Yi Shen(http://github.com/pissang)
 */

define(function (require) {
    
    var Renderer = require('qtek/Renderer');
    var Scene = require('qtek/Scene');
    var PerspectiveCamera = require('qtek/camera/Perspective');
    var RayPicking = require('qtek/picking/RayPicking');

    var Eventful = require('zrender/mixin/Eventful');
    var zrUtil = require('zrender/tool/util');
    var eventTool = require('zrender/tool/event');

    /**
     * @constructor
     * @alias module:echarts-x/core/Layer3D
     * @param {string} id Layer ID
     * @param {module:zrender/Painter} painter
     */
    var Layer3D = function (id, painter) {

        Eventful.call(this);

        /**
         * Layer ID
         * @type {string}
         */
        this.id = id;

        /**
         * @type {qtek.Renderer}
         */
        try {
            this.renderer = new Renderer({
                // clear: 0
            });
            this.renderer.resize(painter.getWidth(), painter.getHeight());   
        }
        catch (e) {
            this.renderer = null;
            this.dom = document.createElement('div');
            this.dom.style.cssText = 'position:absolute; left: 0; top: 0; right: 0; bottom: 0;';
            this.dom.className = 'ecx-nowebgl';
            this.dom.innerHTML = 'Sorry, your browser does support WebGL';

            return;
        }

        /**
         * Canvas dom for webgl rendering
         * @type {HTMLCanvasElement}
         */
        this.dom = this.renderer.canvas;
        var style = this.dom.style;
        style.position = 'absolute';
        style.left = '0';
        style.top = '0';

        /**
         * @type {qtek.camera.Perspective}
         */
        this.camera = new PerspectiveCamera();
        this.camera.aspect = painter.getWidth() / painter.getHeight();

        /**
         * @type {qtek.Scene}
         */
        this.scene = new Scene();

        /**
         * Renderer viewport, represented with percent
         * @type {Object}
         */
        this._viewport = {
            x: 0,
            y: 0,
            width: 1,
            height: 1
        };

        this._initHandlers();
    };

    /**
     * Register event handling functions
     */
    Layer3D.prototype._initHandlers = function () {

        // Mouse event handling
        this.bind('click', this._clickHandler, this);
        this.bind('mousedown', this._mouseDownHandler, this);
        this.bind('mouseup', this._mouseUpHandler, this);
        this.bind('mousemove', this._mouseMoveHandler, this);

        this._picking = new RayPicking({
            scene: this.scene,
            camera: this.camera,
            renderer: this.renderer
        });
    };

    /**
     * Resize the canvas and viewport, will be invoked by zrender
     * @param  {number} width
     * @param  {number} height
     */
    Layer3D.prototype.resize = function (width, height) {
        var renderer = this.renderer;
        renderer.resize(width, height);
        var viewport = this._viewport;
        this.setViewport(
            viewport.x * width, viewport.y * height,
            viewport.width * width, viewport.height * height
        );
    };

    /**
     * Set layer renderer viewport
     * @param {number} x Viewport left bottom x
     * @param {number} y Viewport left bottom y
     * @param {number} width Viewport height
     * @param {number} height Viewport height
     */
    Layer3D.prototype.setViewport = function (x, y, width, height) {
        var renderer = this.renderer;
        var rendererWidth = renderer.getWidth();
        var rendererHeight = renderer.getHeight();
        // Set viewport
        var viewport = this._viewport;
        viewport.x = x / rendererWidth;
        viewport.y = y / rendererHeight;
        viewport.width = width / rendererWidth;
        // Invert y, in WebGL [0, 0] is left bottom coorner
        viewport.height = 1 - height / rendererHeight;

        renderer.setViewport(x, y, width, height);

        // Set camera aspect
        var camera = this.camera;
        if (camera instanceof PerspectiveCamera) {
            camera.aspect = width / height;
        }
    };

    /**
     * Get viewport width in pixel
     * @return {number}
     */
    Layer3D.prototype.getViewportWidth = function () {
        return this._viewport.width * this.renderer.getWidth();
    };

    /**
     * Get viewport height in pixel
     * @return {number}
     */
    Layer3D.prototype.getViewportHeight = function () {
        return this._viewport.height * this.renderer.getHeight();
    };

    /**
     * Clear color and depth
     * @return {[type]} [description]
     */
    Layer3D.prototype.clear = function () {
        var gl = this.renderer.gl;
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
    };

    /**
     * Clear depth
     */
    Layer3D.prototype.clearDepth = function () {
        var gl = this.renderer.gl;
        gl.clear(gl.DEPTH_BUFFER_BIT);
    };

    /**
     * Clear color
     */
    Layer3D.prototype.clearColor = function () {
        var gl = this.renderer.gl;
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
    };

    /**
     * Refresh the layer, will be invoked by zrender
     */
    Layer3D.prototype.refresh = function () {
        this.clear();
        this.renderer.render(this.scene, this.camera);
    };

    /**
     * Render the give scene with layer renderer and camera
     * Without clear the buffer
     * @return {qtek.Scene}
     */
    Layer3D.prototype.renderScene = function (scene) {
        this.renderer.render(scene, this.camera);
    };

    /**
     * Dispose the layer
     */
    Layer3D.prototype.dispose = function () {
        this.renderer.disposeScene(this.scene);
    };

    // Event handlers
    Layer3D.prototype.onmousedown = function (e) {
        e = e.event;
        var obj = this.pickObject(eventTool.getX(e), eventTool.getY(e));
        if (obj) {
            this._dispatchEvent('mousedown', e, obj);
        }
    };

    Layer3D.prototype.onmousemove = function (e) {
        e = e.event;
        var obj = this.pickObject(eventTool.getX(e), eventTool.getY(e));
        if (obj) {
            this._dispatchEvent('mousemove', e, obj);
        }
    };

    Layer3D.prototype.onmouseup = function (e) {
        e = e.event;
        var obj = this.pickObject(eventTool.getX(e), eventTool.getY(e));
        if (obj) {
            this._dispatchEvent('mouseup', e, obj);
        }
    };

    Layer3D.prototype.onclick = function (e) {
        e = e.event;
        var obj = this.pickObject(eventTool.getX(e), eventTool.getY(e));
        if (obj) {
            this._dispatchEvent('click', e, obj);
        }
    };

    Layer3D.prototype.pickObject = function (x, y) {
        return this._picking.pick(x, y);
    };

    Layer3D.prototype._dispatchEvent = function (eveName, e, obj) {
        var current = obj.target;
        obj.cancelBubble = false;
        obj.event = e;
        obj.type = eveName;
        while (current) {
            current.trigger(eveName, obj);
            current = current.getParent();

            if (obj.cancelBubble) {
                break;
            }
        }
    };

    zrUtil.inherits(Layer3D, Eventful);

    return Layer3D;
});