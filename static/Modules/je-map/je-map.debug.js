'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function (modules) {
    var installedModules = {};
    function __webpack_require__(moduleId) {
        if (installedModules[moduleId]) {
            return installedModules[moduleId].exports;
        }
        var module = installedModules[moduleId] = { i: moduleId,
            l: false,
            exports: {}
        };
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        module.l = true;
        return module.exports;
    }
    __webpack_require__.m = modules;
    __webpack_require__.c = installedModules;
    __webpack_require__.d = function (exports, name, getter) {
        if (!__webpack_require__.o(exports, name)) {
            Object.defineProperty(exports, name, { configurable: false,
                enumerable: true,
                get: getter
            });
        }
    };
    __webpack_require__.n = function (module) {
        var getter = module && module.__esModule ? function getDefault() {
            return module['default'];
        } : function getModuleExports() {
            return module;
        };
        __webpack_require__.d(getter, 'a', getter);
        return getter;
    };
    __webpack_require__.o = function (object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
    };
    __webpack_require__.p = "";
    return __webpack_require__(__webpack_require__.s = 2);
})([function (module, __webpack_exports__, __webpack_require__) {

    "use strict";

    var Base = function () {
        function Base(option) {
            _classCallCheck(this, Base);

            this._id = null;

            this.attributes = null;

            this.map = null;
            this.jemap = null;
            this.opacity = 1;

            this.source = null;

            this.visible = true;

            this.extent = null;

            this.zIndex = 0;

            this.minResolution = 0;

            this.maxResolution = 20;

            this.minZoom = 0;

            this.maxZoom = 20;

            $.extend(this, option);

            this.handleFunc = {};
            this.CLASS_NAME = "x.layer.Base";
        }

        _createClass(Base, [{
            key: 'on',
            value: function on(type, func) {
                if (this.handleFunc[type]) {
                    if (this.handleFunc[type].indexOf(func) === -1) {
                        this.handleFunc[type].push(func);
                    }
                } else {
                    this.handleFunc[type] = [func];
                }
            }
        }, {
            key: 'trigger',
            value: function trigger(type, params) {
                try {
                    var target = this.handleFunc[type];
                    var count = target.length;
                    for (var i = 0; i < count; i++) {
                        target[i](params);
                    }
                    return true;
                } catch (e) {
                    console.error(e);
                    return false;
                }
            }
        }, {
            key: 'off',
            value: function off(type, func) {
                try {
                    var target = this.handleFunc[type];
                    var index = target.indexOf(func);
                    if (index === -1) throw error;
                    target.splice(index, 1);
                } catch (e) {
                    console.error(e);
                }
            }
        }, {
            key: 'once',
            value: function once(type, func) {
                this.on(type, func) ? this.off(type, func) : null;
            }
        }, {
            key: 'setVisible',
            value: function setVisible(f) {
                var map = this.jemap.delegate_map;
                map.setLayoutProperty("overlayer_" + this.id, 'visibility', f ? "visible" : "none");
            }
        }, {
            key: 'getZIndex',
            value: function getZIndex() {
                return this.zIndex;
            }
        }, {
            key: 'setZIndex',
            value: function setZIndex(zIndex) {
                this.zIndex = zIndex;

                var layers = this.jemap.layers;
                for (var i = 0; i < layers.length; i++) {
                    if (layers[i].id != this.id) {
                        var f = layers[i].zIndex < zIndex;
                        var ids = this._getMoveLayerIds(layers[i], f);
                        if (ids.length == 0) continue;
                        this.map.moveLayer(ids[0], ids[1]);
                    }
                }
            }
        }, {
            key: '_getMoveLayerIds',
            value: function _getMoveLayerIds(layer, f) {
                var ids = [],
                    class_name = this.CLASS_NAME,
                    _getMoveLayerId = this.jemap._getMoveLayerId;
                if (f) {
                    ids = [_getMoveLayerId(layer, f), _getMoveLayerId(this, f)];
                } else {
                    ids = [_getMoveLayerId(this, f), _getMoveLayerId(layer, f)];
                }
                return ids;
            }
        }, {
            key: 'clone',
            value: function clone() {
                return _.cloneDeep(this);
            }
        }]);

        return Base;
    }();

    ;

    __webpack_exports__["a"] = Base;
}, function (module, __webpack_exports__, __webpack_require__) {

    "use strict";

    var __WEBPACK_IMPORTED_MODULE_0__Base_js__ = __webpack_require__(0);

    var MapV = function (_WEBPACK_IMPORTED_MO) {
        _inherits(MapV, _WEBPACK_IMPORTED_MO);

        function MapV(option) {
            _classCallCheck(this, MapV);

            var _this = _possibleConstructorReturn(this, (MapV.__proto__ || Object.getPrototypeOf(MapV)).call(this, option));

            $.extend(_this, option);

            return _possibleConstructorReturn(_this);
            _this.source = option.source;
            _this.dataSet = option.mapVOptions;
            _this.mapVOptions = option.mapVOptions;
            return _this;
        }

        _createClass(MapV, [{
            key: 'drawAnimation',
            value: function drawAnimation() {
                var ctx = this.ctx;
                var data = this.data;
                if (!data) {
                    return;
                }

                ctx.save();
                ctx.globalCompositeOperation = 'destination-out';
                ctx.fillStyle = 'rgba(0, 0, 0, .1)';
                ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
                ctx.restore();

                ctx.save();
                if (this.options.shadowColor) {
                    ctx.shadowColor = this.options.shadowColor;
                }

                if (this.options.shadowBlur) {
                    ctx.shadowBlur = this.options.shadowBlur;
                }

                if (this.options.globalAlpha) {
                    ctx.globalAlpha = this.options.globalAlpha;
                }

                if (this.options.globalCompositeOperation) {
                    ctx.globalCompositeOperation = this.options.globalCompositeOperation;
                }

                var options = this.options;
                for (var i = 0; i < data.length; i++) {
                    if (data[i].geometry.type === 'Point') {
                        ctx.beginPath();
                        var maxSize = data[i].size || this.options.size;
                        var minSize = data[i].minSize || this.options.minSize || 0;
                        if (data[i]._size === undefined) {
                            data[i]._size = minSize;
                        }
                        ctx.arc(data[i].geometry._coordinates[0], data[i].geometry._coordinates[1], data[i]._size, 0, Math.PI * 2, true);
                        ctx.closePath();

                        data[i]._size++;

                        if (data[i]._size > maxSize) {
                            data[i]._size = minSize;
                        }
                        ctx.lineWidth = 1;
                        ctx.strokeStyle = data[i].strokeStyle || data[i]._strokeStyle || options.strokeStyle || 'yellow';
                        ctx.stroke();
                        var fillStyle = data[i].fillStyle || data[i]._fillStyle || options.fillStyle;
                        if (fillStyle) {
                            ctx.fillStyle = fillStyle;
                            ctx.fill();
                        }
                    } else if (data[i].geometry.type === 'LineString') {
                        ctx.beginPath();
                        var size = data[i].size || this.options.size || 5;
                        var minSize = data[i].minSize || this.options.minSize || 0;
                        if (data[i]._index === undefined) {
                            data[i]._index = 0;
                        }
                        var index = data[i]._index;
                        ctx.arc(data[i].geometry._coordinates[index][0], data[i].geometry._coordinates[index][1], size, 0, Math.PI * 2, true);
                        ctx.closePath();

                        data[i]._index++;

                        if (data[i]._index >= data[i].geometry._coordinates.length) {
                            data[i]._index = 0;
                        }

                        var strokeStyle = data[i].strokeStyle || options.strokeStyle;
                        var fillStyle = data[i].fillStyle || options.fillStyle || 'yellow';
                        ctx.fillStyle = fillStyle;
                        ctx.fill();
                        if (strokeStyle && options.lineWidth) {
                            ctx.lineWidth = options.lineWidth || 1;
                            ctx.strokeStyle = strokeStyle;
                            ctx.stroke();
                        }
                    }
                }
                ctx.restore();
            }
        }, {
            key: '_createCanvas',
            value: function _createCanvas() {
                var canvas = document.createElement('canvas');
                canvas.id = this.layerID;
                canvas.style.position = 'absolute';
                canvas.style.top = 0 + "px";
                canvas.style.left = 0 + "px";
                canvas.width = parseInt(this.map.getCanvas().style.width);
                canvas.height = parseInt(this.map.getCanvas().style.height);
                canvas.style.width = this.map.getCanvas().style.width;
                canvas.style.height = this.map.getCanvas().style.height;
                var global$2 = typeof window === 'undefined' ? {} : window;
                var devicePixelRatio = this.devicePixelRatio = global$2.devicePixelRatio;
                if (this.mapVOptions.context == '2d') {
                    canvas.getContext(this.mapVOptions.context).scale(devicePixelRatio, devicePixelRatio);
                }
                return canvas;
            }
        }, {
            key: 'setVisible',
            value: function setVisible(f) {
                if (f) {
                    $(this._maptalksEle.container).show();
                    this.visible = true;
                } else {
                    $(this._maptalksEle.container).hide();
                    this.visible = false;
                }
            }
        }, {
            key: 'destroy',
            value: function destroy(opt) {
                this._maptalksEle.remove();
            }
        }, {
            key: 'render',
            value: function render(opt) {
                this.source.map = this.map;
                var me = new GeoGlobe.MaptalksEle({
                    elmapOptions: {
                        spatialReference: this.jemap.spatialReference
                    }
                }),
                    _t = this;
                this._maptalksEle = me;
                me.addTo(this.map);
                var elmap = me.getElMap(),
                    data = [];

                for (var i = 0; i < this.datasets.length; i++) {
                    new mapv.MaptalksLayer('mapv' + i, this.datasets[i], this.mapVOptions[i]).addTo(elmap);
                }

                return;

                var mapvLayer1 = new mapv.MaptalksLayer('mapv', this.datasets[0], this.mapVOptions[0]).addTo(elmap);
                var mapvLayer2 = new mapv.MaptalksLayer('mapv1', this.datasets[1], this.mapVOptions[1]).addTo(elmap);

                var map = this.map;

                this.canvas = this._createCanvas();

                this.mapContainer = map.getCanvasContainer();
                this.mapContainer.appendChild(this.canvas);
                this.mapContainer.style.perspective = this.map.transform.cameraToCenterDistance + 'px';
                this.ctx = this.canvas.getContext("2d");
                this.data = this.dataSet.get();
                this.options = this.mapVOptions;

                this.drawAnimation();
            }
        }]);

        return MapV;
    }(__WEBPACK_IMPORTED_MODULE_0__Base_js__["a"]);

    ;

    __webpack_exports__["a"] = MapV;
}, function (module, __webpack_exports__, __webpack_require__) {

    "use strict";

    Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
    __webpack_require__.d(__webpack_exports__, "je", function () {
        return je;
    });
    var __WEBPACK_IMPORTED_MODULE_0__x_Map_js__ = __webpack_require__(3);
    var __WEBPACK_IMPORTED_MODULE_1__x_layer_Tile_js__ = __webpack_require__(4);
    var __WEBPACK_IMPORTED_MODULE_2__x_layer_VectorTile_js__ = __webpack_require__(5);
    var __WEBPACK_IMPORTED_MODULE_3__x_layer_MapV_js__ = __webpack_require__(1);
    var __WEBPACK_IMPORTED_MODULE_4__x_layer_Vector_js__ = __webpack_require__(6);
    var __WEBPACK_IMPORTED_MODULE_5__x_layer_StatisticalChart_js__ = __webpack_require__(7);
    var __WEBPACK_IMPORTED_MODULE_6__x_layer_Heatmap_js__ = __webpack_require__(8);
    var __WEBPACK_IMPORTED_MODULE_7__x_layer_Migrate_js__ = __webpack_require__(9);
    var __WEBPACK_IMPORTED_MODULE_8__x_source_WMTS_js__ = __webpack_require__(10);
    var __WEBPACK_IMPORTED_MODULE_9__x_source_WFS_js__ = __webpack_require__(11);
    var __WEBPACK_IMPORTED_MODULE_10__x_source_GeoJSON_js__ = __webpack_require__(12);
    var __WEBPACK_IMPORTED_MODULE_11__x_source_Raster_js__ = __webpack_require__(14);
    var __WEBPACK_IMPORTED_MODULE_12__x_extent_js__ = __webpack_require__(15);
    var __WEBPACK_IMPORTED_MODULE_13__x_util_js__ = __webpack_require__(16);

    var je = {
        x: {
            Map: __WEBPACK_IMPORTED_MODULE_0__x_Map_js__["a"],
            extent: __WEBPACK_IMPORTED_MODULE_12__x_extent_js__,
            util: {
                coordtransform: __WEBPACK_IMPORTED_MODULE_13__x_util_js__["a"]
            },
            ui: {},
            source: {
                WMTS: __WEBPACK_IMPORTED_MODULE_8__x_source_WMTS_js__["a"],
                WFS: __WEBPACK_IMPORTED_MODULE_9__x_source_WFS_js__["a"],
                GeoJSON: __WEBPACK_IMPORTED_MODULE_10__x_source_GeoJSON_js__["a"],
                Raster: __WEBPACK_IMPORTED_MODULE_11__x_source_Raster_js__["a"]
            },
            layer: {
                Tile: __WEBPACK_IMPORTED_MODULE_1__x_layer_Tile_js__["a"],
                VectorTile: __WEBPACK_IMPORTED_MODULE_2__x_layer_VectorTile_js__["a"],

                MapV: __WEBPACK_IMPORTED_MODULE_3__x_layer_MapV_js__["a"],
                Vector: __WEBPACK_IMPORTED_MODULE_4__x_layer_Vector_js__["a"],
                StatisticalChart: __WEBPACK_IMPORTED_MODULE_5__x_layer_StatisticalChart_js__["a"],
                Heatmap: __WEBPACK_IMPORTED_MODULE_6__x_layer_Heatmap_js__["a"],
                Migrate: __WEBPACK_IMPORTED_MODULE_7__x_layer_Migrate_js__["a"]

            }
        },
        CONTEXT_ROOT: "/jfw",

        PROXY_URL: "http://" + window.location.host + "/ProxyServlet/proxyHandler?url=",
        version: "0.0.4.20180312"
    };

    window.je = je;
}, function (module, __webpack_exports__, __webpack_require__) {

    "use strict";

    var Map = function () {
        function Map(option) {
            _classCallCheck(this, Map);

            this.delegate_map = null;
            this.mapCRS = null;
            this.Z_INDEX_BASE = {
                BaseLayer: 100,
                Overlay: 325,
                Feature: 725,
                Popup: 750,
                Control: 1000
            };
            this.spatialReference = {
                projection: "EPSG:4490"
            };
            this.attributes = {
                mapCRS: {
                    topTileExtent: [-180, -270, 180, 90],
                    coordtransform: "none"
                },
                style: {
                    version: 8,
                    sources: {},
                    layers: []
                },
                container: option.el,

                renderWorldCopies: false
            };
            $.extend(this.attributes, option);

            delete this.attributes.el;

            this.el = option.el;
            this.$el = $("#" + option.el);
            this.layers = [];

            GeoGlobe.Request.setProxyHost(je.PROXY_URL);
            if (!option.map) {
                this._init_delegate_map(option);
            } else {
                this.delegate_map = option.map;
            }
        }

        _createClass(Map, [{
            key: '_init_delegate_map',
            value: function _init_delegate_map(option) {
                console.log(this.attributes);
                this.delegate_map = new GeoGlobe.Map(this.attributes);

                if (this.attributes.mapCRS == null) {
                    this.spatialReference.projection = "EPSG:3857";
                } else {}
            }
        }, {
            key: 'on',
            value: function on(etype, callback) {
                this.delegate_map.on(etype, callback);
            }
        }, {
            key: 'addLayer',
            value: function addLayer(o) {
                o.map = this.delegate_map;
                o.jemap = this;
                o.render(o);

                this.layers.push(o);

                o.zIndex = this.layers.length;
            }
        }, {
            key: 'moveLayer',
            value: function moveLayer(layer, beforeLayer) {
                var id = this._getMoveLayerId(layer, false);
                var beforeId = this._getMoveLayerId(beforeLayer, true);
                this.delegate_map.moveLayer(id, beforeId);
            }
        }, {
            key: '_getMoveLayerId',
            value: function _getMoveLayerId(layer, f) {
                var id = "",
                    class_name = layer.CLASS_NAME;
                switch (class_name) {
                    case "x.layer.Tile":
                        id = "overlayer_" + layer.id;
                        break;
                    case "x.layer.VectorTile":
                        var i = f ? 0 : layer._layer_data.length - 1;
                        id = layer._layer_data[i].id;
                        break;
                }
                return id;
            }
        }, {
            key: 'removeLayer',
            value: function removeLayer(o) {
                o.destroy(o);
                _.remove(this.layers, function (n) {
                    return n == o;
                });
            }
        }, {
            key: 'setCenter',
            value: function setCenter(o) {
                this.delegate_map.setCenter(o);
            }
        }, {
            key: 'setBearing',
            value: function setBearing(o) {
                this.delegate_map.setBearing(o);
            }
        }, {
            key: 'setPitch',
            value: function setPitch(o) {
                this.delegate_map.setPitch(o);
            }
        }, {
            key: 'zoomTo',
            value: function zoomTo(o) {
                this.delegate_map.setZoom(o);
            }
        }, {
            key: 'getLayer',
            value: function getLayer(o) {
                return this.delegate_map.getLayer(o);
            }
        }, {
            key: 'getLayerById',
            value: function getLayerById(id) {
                for (var i = 0; i < this.layers.length; i++) {
                    var tmp = this.layers[i];
                    if (tmp.id == id) {
                        return tmp;
                    }
                }
            }
        }, {
            key: 'getLayerBy',
            value: function getLayerBy() {}
        }, {
            key: 'updateSize',
            value: function updateSize() {
                this.delegate_map.resize();
            }
        }, {
            key: 'setLayerZIndex',
            value: function setLayerZIndex(layer, zIdx) {
                layer.setZIndex(this.Z_INDEX_BASE['Overlay'] + zIdx * 5);
            }
        }, {
            key: 'render',
            value: function render() {}
        }]);

        return Map;
    }();

    __webpack_exports__["a"] = Map;
}, function (module, __webpack_exports__, __webpack_require__) {

    "use strict";

    var __WEBPACK_IMPORTED_MODULE_0__Base_js__ = __webpack_require__(0);

    var Tile = function (_WEBPACK_IMPORTED_MO2) {
        _inherits(Tile, _WEBPACK_IMPORTED_MO2);

        function Tile(option) {
            _classCallCheck(this, Tile);

            var _this2 = _possibleConstructorReturn(this, (Tile.__proto__ || Object.getPrototypeOf(Tile)).call(this, option));

            _this2._option = option;
            _this2.id = option.id;
            _this2._id = "overlayer_" + option.id;
            _this2.attributes = {
                "id": _this2._id,
                "type": "raster",
                "source": option.source.attributes,
                "name": option.name,
                "minzoom": _this2.minZoom,
                "maxzoom": _this2.maxZoom,
                "paint": {
                    "raster-opacity": Number(option.source.options.Opacity)
                }
            };

            _this2.CLASS_NAME = "x.layer.Tile";
            return _this2;
        }

        _createClass(Tile, [{
            key: 'clone',
            value: function clone() {
                return new je.x.layer.Tile(this._option);
            }
        }, {
            key: 'destroy',
            value: function destroy(opt) {
                var _t = this;
                var id = this.attributes.id;
                try {
                    this.map.removeSource(id);
                    this.map.removeLayer(id);
                } catch (e) {}
            }
        }, {
            key: 'render',
            value: function render(opt) {
                var _t = this;
                try {
                    if (this.source.wmts_obj == null) {
                        this.map.addLayer(opt.attributes);
                    } else {
                        this.map.addLayer(this.source.wmts_obj);
                    }
                } catch (e) {
                    this.map.on("load", function () {

                        _t.map.addLayer(opt.attributes);
                    });
                }
            }
        }, {
            key: 'getTopTileExtent',
            value: function getTopTileExtent() {
                var s = this.source.options;
                var obj = {
                    scales: s.Scales,
                    tileOrigin: s.TileOrigin,
                    tileFullExtent: s.TileFullExtent,
                    zoomOffset: s.ZoomOffset,
                    unit: "m"
                };

                var scale = parseFloat(obj.scales[0]);

                var resolution = GeoGlobe.Util.getResolutionFromScale(scale, obj.unit);

                var maxResolution = resolution * Math.pow(2, obj.zoomOffset);

                var topTileFromX = parseFloat(obj.tileOrigin.split(",")[0]),
                    topTileFromY = parseFloat(obj.tileOrigin.split(",")[1]),
                    topTileToX = topTileFromX + maxResolution * 256,
                    topTileToY = topTileFromY - maxResolution * 256;
                var origin = obj.tileOrigin.split(",");

                return [topTileFromX, topTileToY, topTileToX, topTileFromY];
            }
        }]);

        return Tile;
    }(__WEBPACK_IMPORTED_MODULE_0__Base_js__["a"]);

    ;

    __webpack_exports__["a"] = Tile;
}, function (module, __webpack_exports__, __webpack_require__) {

    "use strict";

    var __WEBPACK_IMPORTED_MODULE_0__Base_js__ = __webpack_require__(0);

    var VectorTile = function (_WEBPACK_IMPORTED_MO3) {
        _inherits(VectorTile, _WEBPACK_IMPORTED_MO3);

        function VectorTile(option) {
            _classCallCheck(this, VectorTile);

            var _this3 = _possibleConstructorReturn(this, (VectorTile.__proto__ || Object.getPrototypeOf(VectorTile)).call(this, option));

            _this3.source = option.source;
            _this3._id = "overlayer_" + option.id;
            _this3.id = option.id;
            _this3.attributes = {
                "id": _this3.id,
                "type": "raster",
                "source": option.source.attributes,
                "name": option.name,
                "raster-opacity": 1
            };

            _this3._layer_data = [];

            _this3.CLASS_NAME = "x.layer.VectorTile";
            return _this3;
        }

        _createClass(VectorTile, [{
            key: 'setVisible',
            value: function setVisible(f) {
                var map = this.jemap.delegate_map;
                for (var i = 0; i < this._layer_data.length; i++) {
                    map.setLayoutProperty(this._layer_data[i]["id"], 'visibility', f ? "visible" : "none");
                }
            }
        }, {
            key: 'destroy',
            value: function destroy(opt) {
                var _t = this;
                for (var i = 0; i < _t._layer_data.length; i++) {
                    var id = _t._layer_data[i].id;
                    try {
                        this.map.removeLayer(id);
                    } catch (e) {}
                }
                this.map.removeSource(this.source_id);
            }
        }, {
            key: 'render',
            value: function render(opt) {
                var _t = this;
                try {
                    var o = _t.attributes.source;
                    if (o.sprite != "") {
                        sprite = je.PROXY_URL + o.sprite;

                        _t.map.loadSprite(sprite);
                    }
                    if (o.glyphs != "") {
                        glyphs = je.PROXY_URL + o.glyphs;
                        _t.map.style.glyphManager.setURL(glyphs);
                    }

                    Layer_data = _t.attributes.source.layerData;
                    _t.map.addLayer(Layer_data);

                    Sourceid = Layer_data.source_id;
                    LayerId = [];
                    for (var x = 0; x < Layer_data.layers.length; x++) {
                        LayerId.push(Layer_data.layers[x].id);
                    }

                    _t.source_id = Sourceid;
                    _t._layer_data = Layer_data.layers;
                } catch (e) {
                    console.log(e);
                }
            }
        }]);

        return VectorTile;
    }(__WEBPACK_IMPORTED_MODULE_0__Base_js__["a"]);

    ;

    __webpack_exports__["a"] = VectorTile;
}, function (module, __webpack_exports__, __webpack_require__) {

    "use strict";

    var __WEBPACK_IMPORTED_MODULE_0__Base_js__ = __webpack_require__(0);

    var Vector = function (_WEBPACK_IMPORTED_MO4) {
        _inherits(Vector, _WEBPACK_IMPORTED_MO4);

        function Vector(option) {
            _classCallCheck(this, Vector);

            var _this4 = _possibleConstructorReturn(this, (Vector.__proto__ || Object.getPrototypeOf(Vector)).call(this, option));

            var j = 0,
                stops = [];

            _this4._id = GeoGlobe.Util.randomStr(6);

            _this4.color = ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'];
            _this4.label = {
                show: true,
                text: "",
                textStyle: {
                    color: "#fff",
                    fontStyle: 'normal',
                    fontWeight: 'normal',
                    fontFamily: 'sans-serif',
                    fontSize: 12
                }
            };
            $.extend(_this4.color, option.color);
            $.extend(_this4.label, option.label);

            _this4.color.forEach(function (value) {
                stops.push([j, value]);
                j++;
            });
            if (_this4.type == "fill") {
                _this4.paint = {
                    'fill-color': {
                        'stops': stops,
                        'property': "_je_vector_color_index"
                    }
                };
            } else if (_this4.type == "fill-extrusion") {
                _this4.paint = {
                    'fill-extrusion-color': {
                        'stops': stops,
                        'property': "_je_vector_color_index"
                    }
                };
            } else {
                _this4.paint = {};
            }

            $.extend(_this4.paint, option.paint);

            _this4.EVENT_TYPE = [];
            _this4.CLASS_NAME = "x.layer.Vector";
            return _this4;
        }

        _createClass(Vector, [{
            key: 'destroy',
            value: function destroy(opt) {
                var _t = this;
                _t.map.removeSource("je-vector-source-" + _t._id);
                _t.map.removeLayer("je-vector-layer-" + _t._id);
            }
        }, {
            key: 'render',
            value: function render(opt) {
                var _t = this;
                this.source.getData(function (result) {
                    var i = 0;
                    result.features.forEach(function (value) {
                        value.properties["_je_vector_color_index"] = i;
                        i++;
                        i = i > _t.color.length ? 0 : i;

                        var bbox = je.x.extent.boundingExtent(value.geometry.coordinates[0]);
                        var center = je.x.extent.getCenter(bbox);

                        var label = value.properties[_t.label.text];

                        if (label) {
                            console.log(value);
                            console.log(label);
                            console.log(bbox);
                            console.log(center);

                            var marker = new mapboxgl.Marker();
                            marker.setLngLat(center);
                            marker.addTo(_t.map);

                            marker._element.innerHTML = label;
                            var s = _t.label.textStyle;
                            $(marker._element).css({
                                "color": s.color,
                                "display": _t.label.show ? "block" : "none",
                                "font-style": s.fontStyle,
                                "font-weight": s.fontWeight,
                                "font-family": s.fontFamily,
                                "font-size": s.fontSize + "px"
                            });
                        }
                    });

                    _t.map.addSource("je-vector-source-" + _t._id, {
                        "type": "geojson",
                        "data": result
                    });
                    _t.map.addLayer({
                        id: "je-vector-layer-" + _t._id,
                        source: "je-vector-source-" + _t._id,
                        type: _t.type,
                        paint: _t.paint
                    });
                });
            }
        }]);

        return Vector;
    }(__WEBPACK_IMPORTED_MODULE_0__Base_js__["a"]);

    ;

    __webpack_exports__["a"] = Vector;
}, function (module, __webpack_exports__, __webpack_require__) {

    "use strict";

    var __WEBPACK_IMPORTED_MODULE_0__Base_js__ = __webpack_require__(0);

    var StatisticalChart = function (_WEBPACK_IMPORTED_MO5) {
        _inherits(StatisticalChart, _WEBPACK_IMPORTED_MO5);

        function StatisticalChart(option) {
            _classCallCheck(this, StatisticalChart);

            var _this5 = _possibleConstructorReturn(this, (StatisticalChart.__proto__ || Object.getPrototypeOf(StatisticalChart)).call(this, option));

            _this5.color = ['#0960a3', '#0081d2', '#00d6e0', '#01aae1', '#00d3aa', '#8bd36d', '#63b44b'];

            _this5.width = 260;
            _this5.height = 120;
            $.extend(_this5, option);
            _this5.markers = [];
            _this5.CLASS_NAME = "x.layer.StatisticalChart";
            return _this5;
        }

        _createClass(StatisticalChart, [{
            key: 'destroy',
            value: function destroy() {
                this.clearLayer();
                $(".graphList").remove();
            }
        }, {
            key: 'render',
            value: function render() {
                var _this6 = this;

                if (this.source) {
                    this.source.getData(function (result) {
                        _this6.data = result;
                        _this6.creatGraphList();
                        _this6.bindEvent();

                        _this6.createBarThemeLayer(_this6);
                    });
                } else {
                    this.creatGraphList();
                    this.bindEvent();

                    this.createBarThemeLayer(this);
                }
            }
        }, {
            key: '_render',
            value: function _render(opt, typename) {
                var marker = new mapboxgl.Marker();
                marker.setLngLat(opt.geometry.coordinates);
                marker.addTo(this.map);

                var div = marker._element;
                $(div).addClass("graphTheme");
                $(div).css({
                    "width": this.width,
                    "height": this.height,
                    "border-radius": "5px"
                });

                var option;
                if (typename && typename === "Bar") {
                    option = this.createBarOption(opt);
                } else if (typename && typename === "Bar3D") {
                    option = this.createBar3DOption(opt);
                } else if (typename && typename === "Line") {
                    option = this.createLineOption(opt);
                } else if (typename && typename === "Point") {
                    option = this.createPointOption(opt);
                } else if (typename && typename === "Pie") {
                    option = this.createPieOption(opt);
                } else if (typename && typename === "Circular") {
                    option = this.createCircularOption(opt);
                }

                if (typename === "Bar3D") {
                    Highcharts.chart(div, option);
                } else {
                    var obj = echarts.init(div);
                    obj.setOption(option);
                }

                this.markers.push(marker);
            }
        }, {
            key: 'clearLayer',
            value: function clearLayer() {
                $.each(this.markers, function (i, n) {
                    n.remove();
                });
                this.markers = [];
                try {
                    this.map.removeControl(this.legendControl);
                } catch (e) {}
            }
        }, {
            key: 'bindEvent',
            value: function bindEvent() {
                var _t = this;
                $(".graph").on("click", function () {
                    $(".graph").removeClass("active");
                    _t.clearLayer();
                });
                $(".graphList").on("click", "#bar", function () {
                    $("#bar").addClass("active");
                    _t.createBarThemeLayer(_t);
                });
                $(".graphList").on("click", "#bar3d", function () {
                    $("#bar3d").addClass("active");
                    _t.createBar3DThemeLayer(_t);
                });
                $(".graphList").on("click", "#line", function () {
                    $("#line").addClass("active");
                    _t.createLineThemeLayer(_t);
                });
                $(".graphList").on("click", "#point", function () {
                    $("#point").addClass("active");
                    _t.createPointThemeLayer(_t);
                });
                $(".graphList").on("click", "#pie", function () {
                    $("#pie").addClass("active");
                    _t.createPieThemeLayer(_t);
                });
                $(".graphList").on("click", "#circular", function () {
                    _t.createCircularThemeLayer(_t);
                });
                _t.jemap.delegate_map.on("render", function () {
                    _t.freshCharts(_t);
                });
            }
        }, {
            key: 'createBarThemeLayer',
            value: function createBarThemeLayer(_t) {
                _t.data.features.forEach(function (feature) {
                    return _t._render(feature, "Bar");
                });
                _t.freshCharts(_t);
            }
        }, {
            key: 'createBar3DThemeLayer',
            value: function createBar3DThemeLayer(_t) {
                _t.data.features.forEach(function (feature) {
                    var data = [];
                    feature.properties.data.forEach(function (fea, i) {
                        return data.push([i, 0, fea]);
                    });
                    feature.properties.data2 = data;
                    _t._render(feature, "Bar3D");
                });
                _t.freshCharts(_t);
            }
        }, {
            key: 'createLineThemeLayer',
            value: function createLineThemeLayer(_t) {
                _t.data.features.forEach(function (feature) {
                    return _t._render(feature, "Line");
                });
                _t.freshCharts(_t);
            }
        }, {
            key: 'createPointThemeLayer',
            value: function createPointThemeLayer(_t) {
                _t.data.features.forEach(function (feature) {
                    var data = [];
                    feature.properties.data.forEach(function (fea, i) {
                        return data.push([i, fea]);
                    });
                    feature.properties.data3 = data;
                    _t._render(feature, "Point");
                });
                _t.freshCharts(_t);
            }
        }, {
            key: 'createPieThemeLayer',
            value: function createPieThemeLayer(_t) {
                _t.data.features.forEach(function (feature) {
                    var data = [];
                    feature.properties.data.forEach(function (fea, i) {
                        data.push({
                            value: fea,
                            name: _t.axisXLabels[i]
                        });
                    });
                    feature.properties.data4 = data;
                    _t._render(feature, "Pie");
                });
                _t.addLegend();
                _t.freshCharts(_t);
            }
        }, {
            key: 'createCircularThemeLayer',
            value: function createCircularThemeLayer(_t) {
                _t.data.features.forEach(function (feature) {
                    var data = [];
                    feature.properties.data.forEach(function (fea, i) {
                        data.push({
                            value: fea,
                            name: _t.axisXLabels[i]
                        });
                    });
                    feature.properties.data5 = data;
                    _t._render(feature, "Circular");
                });
                _t.addLegend();
                _t.freshCharts(_t);
            }
        }, {
            key: 'creatGraphList',
            value: function creatGraphList() {
                var div = document.createElement("div");
                div.className = "graphList";
                div.innerHTML = '<button type=\'button\' class=\'btn btn-default graph active\' id=\'bar\' data-toggle=\'tooltip\' data-placement=\'bottom\' title="\u67F1\u72B6\u56FE"></button>\n            <button type=\'button\' class=\'btn btn-default graph\' id=\'bar3d\' data-toggle=\'tooltip\' data-placement=\'bottom\' title="\u4E09\u7EF4\u67F1\u72B6\u56FE"></button>\n            <button type=\'button\' class=\'btn btn-default graph\' id=\'line\' data-toggle=\'tooltip\' data-placement=\'bottom\' title="\u6298\u7EBF\u56FE"></button>\n            <button type=\'button\' class=\'btn btn-default graph\' id=\'point\' data-toggle=\'tooltip\' data-placement=\'bottom\' title="\u70B9\u72B6\u56FE"></button>\n            <button type=\'button\' class=\'btn btn-default graph\' id=\'pie\' data-toggle=\'tooltip\' data-placement=\'bottom\' title="\u997C\u72B6\u56FE"></button>\n            <button type=\'button\' class=\'btn btn-default graph\' id=\'circular\' data-toggle=\'tooltip\' data-placement=\'bottom\' title="\u73AF\u72B6\u56FE"></button>';
                $(".mapboxgl-map").append(div);
                var graphListStyle = document.createElement('style');
                graphListStyle.type = 'text/css';
                graphListStyle.innerHTML = ".graphList{\n" + "    position: absolute;\n" + "    right: 5px;\n" + "    top: 8px;\n" + "    text-align: center;\n" + "    background: #FFF;\n" + "    z-index: 1000;\n" + "    border-radius: 4px;\n" + "}\n" + ".btn{\n" + "    display: inline-block;\n" + "    padding: 6px 12px;\n" + "    margin-bottom: 0;\n" + "    font-size: 14px;\n" + "    font-weight: 400;\n" + "    line-height: 1.42857143;\n" + "    text-align: center;\n" + "    white-space: nowrap;\n" + "    vertical-align: middle;\n" + "    -ms-touch-action: manipulation;\n" + "    touch-action: manipulation;\n" + "    cursor: pointer;\n" + "    -webkit-user-select: none;\n" + "    -moz-user-select: none;\n" + "    -ms-user-select: none;\n" + "    user-select: none;\n" + "    background-image: none;\n" + "    border: 1px solid transparent;\n" + "    border-radius: 4px;\n" + "}\n" + ".btn-default {\n" + "    color: #333;\n" + "    background-color: #fff;\n" + "    border-color: #ccc;\n" + "}\n" + ".graph {\n" + "    margin: 5px;\n" + "    width: 26px;\n" + "    height: 26px;\n" + "    border-radius: 4px;\n" + "    background-size: 100%;\n" + "}\n" + ".btn-default.active, .btn-default:active, .open>.dropdown-toggle.btn-default {\n" + "    color: #333;\n" + "    background-color: #e6e6e6;\n" + "    border-color: #adadad;\n" + "}\n" + "#bar{\n" + "    background-image: url(\"images/graphTheme/bar.png\");\n" + "}\n" + "#bar3d{\n" + "     background-image: url(\"images/graphTheme/3Dbar.png\");\n" + "}\n" + "#line{\n" + "    background-image: url(\"images/graphTheme/line.png\");\n" + "}\n" + "#point{\n" + "    background-image: url(\"images/graphTheme/point.png\");\n" + "}\n" + "#pie{\n" + "    background-image: url(\"images/graphTheme/pie.png\");\n" + "}\n" + "#circular{\n" + "    background-image: url(\"images/graphTheme/circular.png\");\n" + "}\n" + ".graphTheme{\n" + "    margin-top: -60px;\n" + "}";
                $('head')[0].appendChild(graphListStyle);
            }
        }, {
            key: 'freshCharts',
            value: function freshCharts(_t) {
                var charts = $(".graphTheme");
                for (var i = 0, len = charts.length; i < len; i++) {
                    var chart = charts[i];
                    var a = chart.style.transform.match(/-?\d+(\.\d+)?/g);
                    var transform = [parseFloat(a[2]), parseFloat(a[3])];
                    var cbounds = [];
                    var point0 = {};
                    point0.x = transform[0] - _t.width / 2;
                    point0.y = transform[1] - _t.height / 2;
                    var point1 = {};
                    point1.x = transform[0] + _t.width / 2;
                    point1.y = transform[1] - _t.height / 2;
                    var point2 = {};
                    point2.x = transform[0] + _t.width / 2;
                    point2.y = transform[1] + _t.height / 2;
                    var point3 = {};
                    point3.x = transform[0] - _t.width / 2;
                    point3.y = transform[1] + _t.height / 2;
                    var point4 = point0;
                    cbounds.push(point0, point1, point2, point3, point4);
                    chart.bounds = cbounds;
                }

                for (var length = charts.length, j = length - 1; j >= 0; j--) {
                    var Chart = charts[j];
                    var isOL = false;
                    for (var k = j - 1; k >= 0; k--) {
                        if (_t.isOverLay(Chart.bounds, charts[k].bounds)) {
                            isOL = true;
                            break;
                        }
                    }
                    if (isOL) {
                        Chart.style.display = "none";
                    } else {
                        Chart.style.display = "";
                    }
                }
            }
        }, {
            key: 'isOverLay',
            value: function isOverLay(quadrilateral, quadrilateral2) {
                var quadLen = quadrilateral.length,
                    quad2Len = quadrilateral2.length;
                if (quadLen !== 5 || quad2Len !== 5) {
                    return null;
                }

                var OverLap = false;

                for (var i = 0; i < quadLen; i++) {
                    if (this.isPointInPoly(quadrilateral[i], quadrilateral2)) {
                        OverLap = true;
                        break;
                    }
                }
                for (var i = 0; i < quad2Len; i++) {
                    if (this.isPointInPoly(quadrilateral2[i], quadrilateral)) {
                        OverLap = true;
                        break;
                    }
                }
                return OverLap;
            }
        }, {
            key: 'isPointInPoly',
            value: function isPointInPoly(pt, poly) {
                for (var isIn = false, i = -1, l = poly.length, j = l - 1; ++i < l; j = i) {
                    (poly[i].y <= pt.y && pt.y < poly[j].y || poly[j].y <= pt.y && pt.y < poly[i].y) && pt.x < (poly[j].x - poly[i].x) * (pt.y - poly[i].y) / (poly[j].y - poly[i].y) + poly[i].x && (isIn = !isIn);
                }
                return isIn;
            }
        }, {
            key: 'createBarOption',
            value: function createBarOption(opt) {
                var _t = this;
                var option = {
                    color: this.color,

                    tooltip: {
                        trigger: 'item',
                        axisPointer: {
                            type: 'shadow' },
                        formatter: "{a} <br/>{b}: {c}"
                    },
                    grid: {
                        left: 5,
                        bottom: 20,
                        right: 5,
                        top: 5
                    },
                    xAxis: {
                        type: 'category',
                        axisTick: { show: false },
                        data: this.axisXLabels,
                        axisLabel: {
                            textStyle: {
                                color: "#fff",
                                fontSize: 14
                            }
                        },
                        axisLine: {
                            show: false
                        }
                    },
                    yAxis: {
                        show: false,
                        type: 'value'
                    },
                    legend: { show: false },
                    series: [{
                        name: opt.properties.NAME + this.name,
                        type: 'bar',
                        itemStyle: {
                            normal: {
                                color: function color(params) {
                                    var colorList = _t.color;
                                    return colorList[params.dataIndex];
                                }
                            }
                        },
                        barMaxWidth: 30,
                        data: opt.properties.data
                    }]
                };
                return option;
            }
        }, {
            key: 'createBar3DOption',
            value: function createBar3DOption(opt) {
                var _t = this;
                var option = {
                    chart: {
                        backgroundColor: '#d1eeee',
                        type: 'column',
                        margin: 20,
                        marginBottom: 25,
                        marginRight: 5,
                        marginTop: 5,
                        options3d: {
                            enabled: true,
                            alpha: 10,
                            beta: 5,
                            depth: 70,
                            viewDistance: 100,
                            frame: {
                                bottom: {
                                    size: 10
                                },
                                side: {
                                    size: 1,
                                    color: 'transparent'
                                },
                                back: {
                                    size: 1,
                                    color: 'transparent'
                                }
                            }
                        }
                    },
                    legend: {
                        enabled: false
                    },
                    title: {
                        text: null
                    },
                    credits: {
                        enabled: false
                    },
                    plotOptions: {
                        column: {
                            depth: 50
                        }
                    },
                    xAxis: {
                        gridLineColor: '#222523',
                        categories: this.axisXLabels
                    },
                    yAxis: {
                        gridLineColor: '#222523',
                        tickAmount: 5,
                        title: {
                            text: null
                        }
                    },
                    zAxis: {
                        tickAmount: 5,
                        gridLineColor: '#222523'
                    },
                    series: [{
                        name: opt.properties.NAME + this.name,
                        data: opt.properties.data
                    }]
                };
                return option;
            }
        }, {
            key: 'createLineOption',
            value: function createLineOption(opt) {
                var _t = this;
                var option = {
                    color: this.color,
                    backgroundColor: "#d1eeee",
                    grid: {
                        left: "20%",
                        bottom: 20,
                        right: 5,
                        top: 10
                    },
                    tooltip: {
                        trigger: 'axis',
                        formatter: "{a} <br/>{b}: {c}"
                    },
                    xAxis: {
                        type: 'category',
                        data: this.axisXLabels
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        name: opt.properties.NAME + this.name,
                        data: opt.properties.data,
                        itemStyle: {
                            normal: {
                                color: function color(params) {
                                    var colorList = _t.color;
                                    return colorList[params.dataIndex];
                                }
                            }
                        },
                        lineStyle: {
                            color: "#64ff40"
                        },
                        symbolSize: 10,
                        type: 'line'
                    }]
                };
                return option;
            }
        }, {
            key: 'createPointOption',
            value: function createPointOption(opt) {
                var _t = this;
                var option = {
                    color: this.color,
                    backgroundColor: "#d1eeee",
                    tooltip: {
                        trigger: 'item',
                        axisPointer: {
                            type: 'shadow' },
                        formatter: "{a} <br/>{b}: {c}"
                    },
                    grid: {
                        left: "20%",
                        bottom: 20,
                        right: 5,
                        top: 10
                    },
                    xAxis: {
                        type: 'category',
                        axisTick: { show: false },
                        data: this.axisXLabels
                    },
                    yAxis: {
                        type: 'value'
                    },
                    legend: { show: false },
                    series: [{
                        name: opt.properties.NAME + this.name,
                        symbolSize: 20,
                        data: opt.properties.data3,
                        itemStyle: {
                            normal: {
                                color: function color(params) {
                                    var colorList = _t.color;
                                    return colorList[params.dataIndex];
                                }
                            }
                        },
                        type: 'scatter'
                    }]
                };
                return option;
            }
        }, {
            key: 'createPieOption',
            value: function createPieOption(opt) {
                var _t = this;
                var option = {
                    color: this.color,
                    backgroundColor: "rgba(209,238,238,0)",
                    grid: {
                        left: 5,
                        bottom: 20,
                        right: 5,
                        top: 10
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        show: false,
                        orient: 'vertical',
                        x: 'right',
                        data: this.axisXLabels
                    },
                    series: [{
                        name: opt.properties.NAME + this.name,
                        type: 'pie',
                        radius: '70%',
                        center: ['50%', '50%'],
                        data: opt.properties.data4,
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        },
                        label: {
                            show: false
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        }
                    }]
                };
                return option;
            }
        }, {
            key: 'createCircularOption',
            value: function createCircularOption(opt) {
                var _t = this;
                var option = {
                    color: this.color,
                    backgroundColor: "rgba(209,238,238,0)",
                    grid: {
                        left: "20%",
                        bottom: 20,
                        right: 5,
                        top: 10
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        show: false,
                        orient: 'vertical',
                        x: 'right',
                        data: this.axisXLabels
                    },
                    series: [{
                        name: opt.properties.NAME + this.name,
                        type: 'pie',
                        center: ['50%', '50%'],
                        radius: ['40%', '70%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: false
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data: opt.properties.data5
                    }]
                };
                return option;
            }
        }, {
            key: 'addLegend',
            value: function addLegend() {
                var _t = this;
                function LegendControl() {}

                LegendControl.prototype.onAdd = function () {
                    this.legend_container = document.createElement("div");
                    var orientation = "legend-vertical";
                    this.legend_container.className = "legend " + orientation;
                    var titleElement = "<div class='legend-title'>图例</div>";
                    var content = "";
                    _t.axisXLabels.forEach(function (value, i) {
                        content += '<li><span style=\'background-color:' + _t.color[i] + ';\'></span><span>' + value + '</span></li>';
                    });
                    var contentElement = '<div class=\'legend-content\'>' + content + '</div>';
                    this.legend_container.innerHTML = titleElement + contentElement;

                    return this.legend_container;
                };
                LegendControl.prototype.onRemove = function () {
                    this.legend_container.parentNode.removeChild(this.legend_container);
                };
                var legendStyle = document.createElement('style');
                legendStyle.type = 'text/css';
                legendStyle.innerHTML = "       .legend {\n" + "            display: inline-block;\n" + "            border-radius: 2px;\n" + "            margin-bottom: 5px;\n" + "            margin-right: 5px;" + "            font-size: 12px;\n" + "            color: rgba(0, 0, 0, 0.8);\n" + "            background-color: rgb(255, 255, 255);\n" + "        }\n" + "        .legend .legend-title {\n" + "            min-height: 14px;\n" + "            max-width: 500px;\n" + "            padding:6px 10px;\n" + "        }\n" + "        .legend-content{\n" + "            padding:6px 10px;\n" + "        }" + "       .legend ul {\n" + "            padding: 0;\n" + "            margin: 0 16px;\n" + "            height: 100%;\n" + "            display: block;\n" + "            list-style: none;\n" + "        }\n" + "        .legend li {\n" + "            vertical-align: middle;\n" + "            list-style-type:none;" + "        }\n" + "        .legend li span:first-child {\n" + "            vertical-align: middle;\n" + "        }\n" + "        .legend li span:last-child {\n" + "            line-height: 28px;\n" + "            max-width: 200px;\n" + "            vertical-align: middle;\n" + "            white-space: nowrap;\n" + "            overflow: hidden;\n" + "            text-overflow: ellipsis;\n" + "            -ms-text-overflow: ellipsis;\n" + "        }\n" + "       .legend-vertical li {\n" + "            height: 28px;\n" + "        }\n" + "        .legend-vertical li span:first-child {\n" + "            display: inline-block;\n" + "            width: 60px;\n" + "            height: 100%;\n" + "        }\n" + "        .legend-vertical li span:last-child {\n" + "            display: inline-block;\n" + "            margin-left: 16px;\n" + "            height: 100%;\n" + "        }";
                $('head')[0].appendChild(legendStyle);
                _t.legendControl = new LegendControl();
                this.map.addControl(_t.legendControl, "bottom-right");
            }
        }]);

        return StatisticalChart;
    }(__WEBPACK_IMPORTED_MODULE_0__Base_js__["a"]);

    ;

    __webpack_exports__["a"] = StatisticalChart;
}, function (module, __webpack_exports__, __webpack_require__) {

    "use strict";

    var __WEBPACK_IMPORTED_MODULE_0__Base_js__ = __webpack_require__(0);
    var __WEBPACK_IMPORTED_MODULE_1__MapV_js__ = __webpack_require__(1);

    var Heatmap = function (_WEBPACK_IMPORTED_MO6) {
        _inherits(Heatmap, _WEBPACK_IMPORTED_MO6);

        function Heatmap(option) {
            _classCallCheck(this, Heatmap);

            var _this7 = _possibleConstructorReturn(this, (Heatmap.__proto__ || Object.getPrototypeOf(Heatmap)).call(this, option));

            _this7.visible = true;
            _this7.opacity = 0.8;
            _this7.radius = 13;
            _this7.gradient = {
                0.25: "rgb(0,0,255)",
                0.55: "rgb(0,255,0)",
                0.85: "yellow",
                1.0: "rgb(255,0,0)"
            };

            $.extend(_this7, option);

            _this7.CLASS_NAME = "x.layer.Heatmap";
            return _this7;
        }

        _createClass(Heatmap, [{
            key: 'setVisible',
            value: function setVisible(f) {
                _get(Heatmap.prototype.__proto__ || Object.getPrototypeOf(Heatmap.prototype), 'setVisible', this).call(this, f);
            }
        }, {
            key: 'destroy',
            value: function destroy(opt) {
                _get(Heatmap.prototype.__proto__ || Object.getPrototypeOf(Heatmap.prototype), 'destroy', this).call(this, opt);
            }
        }, {
            key: 'render',
            value: function render(opt) {
                var _this8 = this;

                var _t = this;
                this.source.getData(function (result) {
                    var data = [];
                    result.features.forEach(function (value) {
                        data.push({
                            geometry: value.geometry,

                            count: value.properties[_t.source.columns[0]]
                        });
                    });
                    var dataSet = new mapv.DataSet(data);
                    var options = {
                        size: _t.radius,
                        maxOpacity: _t.opacity,
                        gradient: _t.gradient,
                        max: 50,
                        draw: 'heatmap'
                    };
                    _t.datasets = [dataSet];
                    _t.mapVOptions = [options];

                    _get(Heatmap.prototype.__proto__ || Object.getPrototypeOf(Heatmap.prototype), 'render', _this8).call(_this8, opt);

                    _t.setVisible(_t.visible);
                });

                return;

                var layer = {
                    id: "je-heatmap",
                    type: "heatmap",
                    source: "heatmap",
                    "paint": {
                        "heatmap-weight": ["interpolate", ["linear"], ["get", "mag"], 0, 0, 6, 1],

                        "heatmap-intensity": ["interpolate", ["linear"], ["zoom"], 0, 1, 9, 3],

                        "heatmap-color": ["interpolate", ["linear"], ["heatmap-density"], 0, "rgba(33,102,172,0)", 0.2, "rgb(103,169,207)", 0.4, "rgb(209,229,240)", 0.6, "rgb(253,219,199)", 0.8, "rgb(239,138,98)", 1, "rgb(178,24,43)"],

                        "heatmap-radius": ["interpolate", ["linear"], ["zoom"], 0, 2, 9, 20],

                        "heatmap-opacity": ["interpolate", ["linear"], ["zoom"], 7, 1, 9, 0]
                    }
                };

                var _t = this;

                _t.map.addSource('heatmap', {
                    "type": "geojson",
                    "data": result
                });
                _t.map.addLayer(layer, 'waterway-label');
            }
        }]);

        return Heatmap;
    }(__WEBPACK_IMPORTED_MODULE_1__MapV_js__["a"]);

    ;

    __webpack_exports__["a"] = Heatmap;
}, function (module, __webpack_exports__, __webpack_require__) {

    "use strict";

    var __WEBPACK_IMPORTED_MODULE_0__Base_js__ = __webpack_require__(0);

    var Migrate = function (_WEBPACK_IMPORTED_MO7) {
        _inherits(Migrate, _WEBPACK_IMPORTED_MO7);

        function Migrate(option) {
            _classCallCheck(this, Migrate);

            var _this9 = _possibleConstructorReturn(this, (Migrate.__proto__ || Object.getPrototypeOf(Migrate)).call(this, option));

            _this9.data = null;
            _this9.Moption = {
                routeColor: "#04a2f6",
                routeWidth: 0.4,
                speed: 6,
                flightSize: 15,
                flightColor: "#04a2f6",
                fromPointColor: "#ff4754",
                fromPointSize: 16,
                toPointColor: "#ffa535",
                toPointSize: 16
            };
            _this9.series = [];
            _this9.res = null;
            _this9.EVENT_TYPES = ["point_click"];

            $.extend(_this9.Moption, option.Moption);

            var o = _this9.Moption;

            _this9.RouteOption = {
                name: "线路",
                type: 'lines',
                coordinateSystem: 'GLMap',
                zlevel: 1,
                effect: {
                    show: true,
                    period: o.speed,
                    trailLength: 0.7,
                    color: '#fff',
                    symbolSize: 4
                },
                lineStyle: {
                    normal: {
                        color: o.routeColor,
                        width: o.routeWidth,
                        curveness: 0.2
                    }
                }
            };
            _this9.FlyOption = {
                name: "飞行器线路",
                coordinateSystem: 'GLMap',
                type: 'lines',
                zlevel: 2,
                symbol: ['none', 'arrow'],
                symbolSize: 10,
                effect: {
                    show: true,
                    period: o.speed,
                    trailLength: 0,
                    symbol: "path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z",
                    symbolSize: o.flightSize
                },
                lineStyle: {
                    normal: {
                        color: o.flightColor,
                        width: 0,
                        opacity: 0.5,
                        curveness: 0.2
                    }
                }
            };
            _this9.FromPointOption = {
                name: "起点",
                type: 'effectScatter',
                coordinateSystem: 'GLMap',
                zlevel: 2,
                rippleEffect: {
                    brushType: 'stroke'
                },
                label: {
                    normal: {
                        show: false,
                        position: 'right',
                        formatter: '{b}'
                    }
                },
                symbolSize: o.fromPointSize,
                itemStyle: {
                    normal: {
                        color: o.fromPointColor
                    }
                }
            };
            _this9.ToPointOption = {
                name: "终点",
                type: 'effectScatter',
                coordinateSystem: 'GLMap',
                zlevel: 2,
                rippleEffect: {
                    brushType: 'stroke'
                },
                label: {
                    normal: {
                        show: false,
                        position: 'right',
                        formatter: '{b}'
                    }
                },
                symbolSize: o.toPointSize,
                itemStyle: {
                    normal: {
                        color: o.toPointColor
                    }
                }
            };
            return _this9;
        }

        _createClass(Migrate, [{
            key: 'destroy',
            value: function destroy() {
                this.echartslayer.remove();
            }
        }, {
            key: 'render',
            value: function render() {
                var _t = this;
                this.source.getData(function (result) {
                    var data = [],
                        i = 1;
                    result.features.forEach(function (value) {
                        var fromCenter = { lng: value.geometry.coordinates[0], lat: value.geometry.coordinates[1], text: "起点-" + i };
                        var arr = value.properties[_t.source.columns[0]];

                        arr.forEach(function (v) {

                            data.push({
                                from: fromCenter,
                                to: { lng: v[0], lat: v[1], text: "终点-" + i }
                            });

                            i++;
                        });

                        i++;
                    });
                    _t.data = data;

                    _t.convertData(_t.data);
                    var option = _t.setOption();

                    _t.echartslayer = new EchartsLayer(_t.map);
                    _t.echartslayer.chart.setOption(option);
                    _t.echartslayer.chart.on("click", function (e) {
                        if (e.seriesType == "effectScatter") {
                            _t.trigger("point_click", e);
                        }
                    });
                });
            }
        }, {
            key: 'convertData',
            value: function convertData(data) {
                var that = this;
                var res = [],
                    points = [];
                for (var i = 0; i < data.length; i++) {
                    var dataItem = data[i];
                    var fromCoord = [parseFloat(data[i].from.lng), parseFloat(data[i].from.lat)];
                    var toCoord = [parseFloat(data[i].to.lng), parseFloat(data[i].to.lat)];
                    if (fromCoord && toCoord) {
                        res.push({
                            coords: [fromCoord, toCoord]
                        });
                    }
                }
                that.res = res;
                return res;
            }
        }, {
            key: 'makeSeries',
            value: function makeSeries(data) {
                var that = this;
                var series = [];
                var fromPoint = [];
                that.RouteOption.data = that.res;
                that.FlyOption.data = that.res;
                that.data.forEach(function (item, i) {
                    var dele_option = $.extend({}, that.ToPointOption);
                    dele_option.data = [that.setPoint(item)];
                    series.push(that.RouteOption, that.FlyOption, dele_option);
                    if (fromPoint.length == 0) {
                        fromPoint.push(item.from);
                    } else {
                        var flag = false;
                        fromPoint.forEach(function (point) {
                            if (point.text == item.from.text) {
                                flag = true;
                            }
                        });
                        if (!flag) {
                            fromPoint.push(item.from);
                        }
                    }
                });
                var arr = [];
                fromPoint.forEach(function (point) {
                    var fromdata = {
                        name: point.text,
                        value: [point.lng, point.lat, 95]
                    };
                    arr.push(fromdata);
                });
                that.FromPointOption.data = arr;
                series.push(that.FromPointOption);
                return series;
            }
        }, {
            key: 'setOption',
            value: function setOption() {
                var that = this;
                var option = {
                    GLMap: {},
                    coordinateSystem: 'GLMap',
                    title: {},
                    legend: {},
                    geo: {
                        map: 'GLMap',
                        label: {
                            emphasis: {
                                show: true
                            }
                        },
                        roam: true,
                        itemStyle: {
                            normal: {
                                areaColor: '#323c48',
                                borderColor: '#404a59'
                            },
                            emphasis: {
                                areaColor: '#2a333d'
                            }
                        }
                    },
                    series: that.makeSeries(that.data)
                };
                return option;
            }
        }, {
            key: 'setPoint',
            value: function setPoint(item) {
                var toInfo = item.to;
                return {
                    name: toInfo.text,
                    value: [toInfo.lng, toInfo.lat, 95]
                };
            }
        }]);

        return Migrate;
    }(__WEBPACK_IMPORTED_MODULE_0__Base_js__["a"]);

    ;

    __webpack_exports__["a"] = Migrate;
}, function (module, __webpack_exports__, __webpack_require__) {

    "use strict";

    var WMTS = function () {
        function WMTS(option) {
            _classCallCheck(this, WMTS);

            this.url = null;
            this.attributes = null;
            this.style = null;
            this.layerInf = null;
            this.wmts_obj = null;
            var cfg = option.Options;
            var opt = {
                layer: cfg.Layer,
                TILEMATRIX: '{z}',
                TILEROW: '{y}',
                TILECOL: '{x}',
                tileMatrixSet: cfg.MatrixSet,
                format: cfg.Format,
                version: option.Version,
                style: cfg.Style,
                width: 256,
                height: 256
            };
            var service = null,
                url = null,
                layerInf = {},
                _t = this,
                sprite,
                glyphs;
            if (option.Type == "OGC-WMTS") {

                service = new GeoGlobe.Service.WMTS(option.Name, option.Url);
                url = je.PROXY_URL + service.getTile(opt);

                if (!cfg.Time) {} else {
                    url += "&TIME=" + cfg.Time;
                }
                if (!cfg.USERECENT) {
                    url += "&USERECENT=false";
                } else {
                    url += "&USERECENT=" + cfg.USERECENT;
                }
            } else {
                service = new GeoGlobe.Service.VTS(option.Name, option.Url, { async: false });
                service.async = false;

                service.GetStyle(cfg.Style, function (result) {
                    if (result.sprite) {
                        sprite = je.PROXY_URL + result.sprite;
                    } else {
                        sprite = "";
                    }
                    if (result.glyphs) {
                        glyphs = je.PROXY_URL + result.glyphs;
                    } else {
                        glyphs = "";
                    }

                    var styledata = result;
                    var Layer_data = {
                        "layers": [],
                        "source": {},
                        "source_id": "",
                        "layerType": "VTS"
                    };
                    var option_param = {
                        layer: cfg.Layer,
                        TILEMATRIX: '{z}',
                        TILEROW: '{y}',
                        TILECOL: '{x}',
                        tileMatrixSet: cfg.MatrixSet,
                        width: 256,
                        height: 256,
                        format: cfg.Format
                    };

                    var url_vts = service.GetTile(option_param);
                    var source_id = "source_vts_" + GeoGlobe.Util.randomStr(6);
                    Layer_data.source_id = source_id;
                    Layer_data.source = {
                        "type": "vector",
                        "tiles": [je.PROXY_URL + url_vts]
                    };
                    if (styledata.styleData) {
                        for (var i = 0; i < styledata.styleData.layers.length; i++) {
                            styledata.styleData.layers[i].source = source_id;
                        }
                        Layer_data.layers = styledata.styleData.layers;
                    } else {
                        for (var i = 0; i < styledata.layers.length; i++) {
                            styledata.layers[i].source = source_id;
                        }
                        Layer_data.layers = styledata.layers;
                    }

                    layerInf = Layer_data;
                });

                url = je.PROXY_URL + service.GetTile(opt);
            }

            this.attributes = {
                "type": "raster",
                "tiles": [url],
                "tileSize": 256,
                "sprite": sprite,
                "glyphs": glyphs,
                "layerData": layerInf
            };
            this.options = cfg;
            this.url = option.Url;
        }

        _createClass(WMTS, [{
            key: 'getDimensions',
            value: function getDimensions() {}
        }]);

        return WMTS;
    }();

    ;

    __webpack_exports__["a"] = WMTS;
}, function (module, __webpack_exports__, __webpack_require__) {

    "use strict";

    var WFS = function () {
        function WFS(option) {
            _classCallCheck(this, WFS);

            this.attributes = option;

            this.version = "1.0.0";
            this.maxFeatures = 1000;
            this.geometryName = "GEOMETRY";
            this.order = true;

            $.extend(this, option);

            this.wfsQueryObj = new GeoGlobe.Query.WFSQuery(this.url, this.typeName, {
                geometryName: this.geometryName,
                format: this.version == "1.1.0" ? new GeoGlobe.Format.GML.v3({ xy: !this.order }) : new GeoGlobe.Format.GML.v2({ xy: true }),
                version: this.version,

                maxFeatures: this.maxFeatures
            });
        }

        _createClass(WFS, [{
            key: 'getData',
            value: function getData() {
                var cb = arguments[0];
                if (_typeof(arguments[0]) === "object") {
                    this._updateWfsObj(arguments[0]);
                    cb = arguments[1];
                }

                var callback = function callback(result) {
                    cb(result.geojson);
                };

                if (this.queryType == "bbox") {
                    this.getBboxData(callback);
                } else if (this.queryType == "point") {
                    this.getPointData(this.param, callback);
                } else if (this.queryType == "path") {
                    this.getLineData(this.param, callback);
                } else if (this.queryType == "polygon") {
                    this.getPolygonData(this.param, callback);
                } else if (this.queryType == "attribute") {
                    this.getAttributeData(this.param, callback);
                } else {
                    alert("请检查查询方式是否正确！");
                }
            }
        }, {
            key: 'getBboxData',
            value: function getBboxData(callback) {
                var extent = {};
                if (this.lock) {
                    extent = this.extent;
                }
                if (this.extent) {
                    if (this.extent.type === "Polygon") {
                        var o = { polygon: this.extent };
                        this.getPolygonData(o, callback);
                        return;
                    } else {
                        var bbox = this.extent.coordinates;
                        extent = new GeoGlobe.LngLatBounds(bbox[0], bbox[1]);
                    }
                } else {
                    extent = new GeoGlobe.LngLatBounds([-180, -90], [180, 90]);
                }
                if (this.version == "1.1.0") {
                    var temp = extent.toBBOX(null, this.order);
                    extent = GeoGlobe.LngLatBounds.fromString(temp);
                }
                this.wfsQueryObj.bboxQuery(extent, function (result) {
                    callback(result);
                }, function (result) {
                    console.log(result);
                });
            }
        }, {
            key: 'getPointData',
            value: function getPointData(param, callback) {
                var queryPoint = new GeoGlobe.Geometry.Point(param.point.coordinates[0], param.point.coordinates[1]);
                if (this.version == "1.1.0") {
                    queryPoint = new GeoGlobe.Geometry.Point(param.point.coordinates[1], param.point.coordinates[0]);
                }

                this.wfsQueryObj.pointQuery(queryPoint, param.distance, param.unit, function (result) {
                    callback(result);
                }, function (result) {
                    console.log(result);
                });
            }
        }, {
            key: 'getLineData',
            value: function getLineData(param, callback) {
                var line = [];
                param.path.coordinates.forEach(function (v, i) {
                    if (this.version == "1.1.0") {
                        line.push(new GeoGlobe.Geometry.Point(v[1], v[0]));
                    } else {
                        line.push(new GeoGlobe.Geometry.Point(v[0], v[1]));
                    }
                });
                var queryPath = new GeoGlobe.Geometry.LineString(line);

                this.wfsQueryObj.pathQuery(queryPath, param.distance, param.unit, function (result) {
                    callback(result);
                }, function (result) {
                    console.log(result);
                });
            }
        }, {
            key: 'getPolygonData',
            value: function getPolygonData(param, callback) {
                if (!param.isContain) {
                    param.isContain = true;
                }
                var polygon = [];
                param.polygon.coordinates.forEach(function (v, i) {
                    var line = [];
                    v.forEach(function (value, j) {
                        if (this.version == "1.1.0") {
                            line.push(new GeoGlobe.Geometry.Point(value[1], value[0]));
                        } else {
                            line.push(new GeoGlobe.Geometry.Point(value[0], value[1]));
                        }
                    });
                    polygon.push(new GeoGlobe.Geometry.LinearRing(line));
                });
                var queryPolygon = new GeoGlobe.Geometry.Polygon(polygon);

                this.wfsQueryObj.polygonQuery(queryPolygon, param.isContain, function (result) {
                    callback(result);
                }, function (result) {
                    console.log(result);
                });
            }
        }, {
            key: 'getAttributeData',
            value: function getAttributeData(param, callback) {
                var value = '*' + param.value + '*';
                var type = GeoGlobe.Filter.Comparison.LIKE;
                if (!param.options) {
                    param.options = null;
                }

                this.wfsQueryObj.attributeQuery(type, param.property, value, param.options, function (result) {
                    callback(result);
                }, function (result) {
                    console.log(result);
                });
            }
        }, {
            key: '_updateWfsObj',
            value: function _updateWfsObj(param) {
                _.extend(this, param);
                var dele_wfsObj = new GeoGlobe.Query.WFSQuery(this.url, this.typeName, {
                    geometryName: this.geometryName,
                    format: this.version == "1.1.0" ? new GeoGlobe.Format.GML.v3({ xy: !this.order }) : new GeoGlobe.Format.GML.v2({ xy: true }),
                    version: this.version,

                    maxFeatures: this.maxFeatures
                });
                this.wfsQueryObj = dele_wfsObj;
            }
        }]);

        return WFS;
    }();

    ;

    __webpack_exports__["a"] = WFS;
}, function (module, __webpack_exports__, __webpack_require__) {

    "use strict";

    var __WEBPACK_IMPORTED_MODULE_0__Base_js__ = __webpack_require__(13);

    var GeoJSON = function (_WEBPACK_IMPORTED_MO8) {
        _inherits(GeoJSON, _WEBPACK_IMPORTED_MO8);

        function GeoJSON(option) {
            _classCallCheck(this, GeoJSON);

            var _this10 = _possibleConstructorReturn(this, (GeoJSON.__proto__ || Object.getPrototypeOf(GeoJSON)).call(this, option));

            _this10.dataUpdate = null;

            $.extend(_this10, option);

            if (_this10.dataUpdate != null) {
                _this10.on("data_update", _this10.dataUpdate);
            }

            _this10.getData(function () {});
            return _this10;
        }

        _createClass(GeoJSON, [{
            key: 'setData',
            value: function setData(data, isForce) {
                this.data = data;
                this._geojson = this.data;

                if (isForce) {
                    this.trigger("data_update", this.data);
                    this.isForce = false;
                }
            }
        }, {
            key: 'getData',
            value: function getData(callback, isForce) {
                var _t = this;

                $.extend(this.isForce, isForce);

                if (!this.url) {
                    this.setData(this.data, this.isForce);
                    callback(this.data);
                    return;
                }

                $.get(this.url, function (result) {
                    _t.setData(result, _t.isForce);
                    try {
                        callback(result);
                    } catch (e) {
                        console.error(e);
                    }
                }, "json");
            }
        }, {
            key: 'validate',
            value: function validate() {}
        }]);

        return GeoJSON;
    }(__WEBPACK_IMPORTED_MODULE_0__Base_js__["a"]);

    ;

    __webpack_exports__["a"] = GeoJSON;
}, function (module, __webpack_exports__, __webpack_require__) {

    "use strict";

    var Base = function () {
        function Base(option) {
            _classCallCheck(this, Base);

            this.isForce = true;
            this._geojson = {};
            this.handleFunc = {};
        }

        _createClass(Base, [{
            key: 'on',
            value: function on(type, func) {
                if (this.handleFunc[type]) {
                    if (this.handleFunc[type].indexOf(func) === -1) {
                        this.handleFunc[type].push(func);
                    }
                } else {
                    this.handleFunc[type] = [func];
                }
            }
        }, {
            key: 'trigger',
            value: function trigger(type, params) {
                try {
                    var target = this.handleFunc[type];
                    var count = target.length;
                    for (var i = 0; i < count; i++) {
                        target[i](params);
                    }
                    return true;
                } catch (e) {
                    return false;
                }
            }
        }, {
            key: 'off',
            value: function off(type, func) {
                try {
                    var target = this.handleFunc[type];
                    var index = target.indexOf(func);
                    if (index === -1) throw error;
                    target.splice(index, 1);
                } catch (e) {}
            }
        }, {
            key: 'once',
            value: function once(type, func) {
                this.on(type, func) ? this.off(type, func) : null;
            }
        }, {
            key: 'getDataRange',
            value: function getDataRange(type) {
                var i = 0,
                    min = 0,
                    max = 0;
                this._geojson.features.forEach(function (value) {
                    var tmp = value.properties[type];
                    if (i == 0) {
                        min = tmp;max = tmp;
                    }
                    if (tmp > max) {
                        max = tmp;
                    } else if (tmp < min) {
                        min = tmp;
                    }
                    i++;
                });
                return [min, max];
            }
        }]);

        return Base;
    }();

    __webpack_exports__["a"] = Base;
}, function (module, __webpack_exports__, __webpack_require__) {

    "use strict";

    var Raster = function Raster(option) {
        _classCallCheck(this, Raster);

        $.extend(this, option);

        var cfg = option.Options;
        var url = je.PROXY_URL + option.Url;

        this.attributes = {
            "type": "raster",
            "tiles": [url],
            "tileSize": 256
        };

        this.options = cfg;
        this.url = option.Url;
    };

    __webpack_exports__["a"] = Raster;
}, function (module, __webpack_exports__, __webpack_require__) {

    "use strict";

    Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
    __webpack_exports__["boundingExtent"] = boundingExtent;
    __webpack_exports__["buffer"] = buffer;
    __webpack_exports__["containsCoordinate"] = containsCoordinate;
    __webpack_exports__["containsExtent"] = containsExtent;
    __webpack_exports__["containsXY"] = containsXY;
    __webpack_exports__["createEmpty"] = createEmpty;
    __webpack_exports__["createOrUpdate"] = createOrUpdate;
    __webpack_exports__["createOrUpdateEmpty"] = createOrUpdateEmpty;
    __webpack_exports__["createOrUpdateFromCoordinate"] = createOrUpdateFromCoordinate;
    __webpack_exports__["createOrUpdateFromCoordinates"] = createOrUpdateFromCoordinates;
    __webpack_exports__["extend"] = extend;
    __webpack_exports__["extendCoordinate"] = extendCoordinate;
    __webpack_exports__["extendCoordinates"] = extendCoordinates;
    __webpack_exports__["extendFlatCoordinates"] = extendFlatCoordinates;
    __webpack_exports__["extendRings"] = extendRings;
    __webpack_exports__["extendXY"] = extendXY;
    __webpack_exports__["getMargin"] = getMargin;
    __webpack_exports__["getSize"] = getSize;
    __webpack_exports__["getTopLeft"] = getTopLeft;
    __webpack_exports__["getTopRight"] = getTopRight;
    __webpack_exports__["getBottomLeft"] = getBottomLeft;
    __webpack_exports__["getBottomRight"] = getBottomRight;
    __webpack_exports__["getCenter"] = getCenter;
    __webpack_exports__["getWidth"] = getWidth;
    __webpack_exports__["getHeight"] = getHeight;
    __webpack_exports__["getCorner"] = getCorner;
    __webpack_exports__["intersects"] = intersects;
    __webpack_exports__["isEmpty"] = isEmpty;

    function boundingExtent(coordinates) {
        var extent = this.createEmpty();
        for (var i = 0, ii = coordinates.length; i < ii; ++i) {
            this.extendCoordinate(extent, coordinates[i]);
        }
        return extent;
    }

    function buffer(extent, value, opt_extent) {
        if (opt_extent) {
            opt_extent[0] = extent[0] - value;
            opt_extent[1] = extent[1] - value;
            opt_extent[2] = extent[2] + value;
            opt_extent[3] = extent[3] + value;
            return opt_extent;
        } else {
            return [extent[0] - value, extent[1] - value, extent[2] + value, extent[3] + value];
        }
    }

    function containsCoordinate(extent, coordinate) {
        return this.containsXY(extent, coordinate[0], coordinate[1]);
    }

    function containsExtent(extent1, extent2) {
        return extent1[0] <= extent2[0] && extent2[2] <= extent1[2] && extent1[1] <= extent2[1] && extent2[3] <= extent1[3];
    }

    function containsXY(extent, x, y) {
        return extent[0] <= x && x <= extent[2] && extent[1] <= y && y <= extent[3];
    }

    function createEmpty() {
        return [Infinity, Infinity, -Infinity, -Infinity];
    }

    function createOrUpdate(minX, minY, maxX, maxY, opt_extent) {
        if (opt_extent) {
            opt_extent[0] = minX;
            opt_extent[1] = minY;
            opt_extent[2] = maxX;
            opt_extent[3] = maxY;
            return opt_extent;
        } else {
            return [minX, minY, maxX, maxY];
        }
    }

    function createOrUpdateEmpty(opt_extent) {
        return createOrUpdate(Infinity, Infinity, -Infinity, -Infinity, opt_extent);
    }

    function createOrUpdateFromCoordinate(coordinate, opt_extent) {
        var x = coordinate[0];
        var y = coordinate[1];
        return createOrUpdate(x, y, x, y, opt_extent);
    }

    function createOrUpdateFromCoordinates(coordinates, opt_extent) {
        var extent = createOrUpdateEmpty(opt_extent);
        return extendCoordinates(extent, coordinates);
    }

    function extend(extent1, extent2) {
        if (extent2[0] < extent1[0]) {
            extent1[0] = extent2[0];
        }
        if (extent2[2] > extent1[2]) {
            extent1[2] = extent2[2];
        }
        if (extent2[1] < extent1[1]) {
            extent1[1] = extent2[1];
        }
        if (extent2[3] > extent1[3]) {
            extent1[3] = extent2[3];
        }
        return extent1;
    }

    function extendCoordinate(extent, coordinate) {
        if (coordinate[0] < extent[0]) {
            extent[0] = coordinate[0];
        }
        if (coordinate[0] > extent[2]) {
            extent[2] = coordinate[0];
        }
        if (coordinate[1] < extent[1]) {
            extent[1] = coordinate[1];
        }
        if (coordinate[1] > extent[3]) {
            extent[3] = coordinate[1];
        }
    }

    function extendCoordinates(extent, coordinates) {
        for (var i = 0, ii = coordinates.length; i < ii; ++i) {
            this.extendCoordinate(extent, coordinates[i]);
        }
        return extent;
    }

    function extendFlatCoordinates(extent, flatCoordinates, offset, end, stride) {
        for (; offset < end; offset += stride) {
            this.extendXY(extent, flatCoordinates[offset], flatCoordinates[offset + 1]);
        }
        return extent;
    }

    function extendRings(extent, rings) {
        for (var i = 0, ii = rings.length; i < ii; ++i) {
            this.extendCoordinates(extent, rings[i]);
        }
        return extent;
    }

    function extendXY(extent, x, y) {
        extent[0] = Math.min(extent[0], x);
        extent[1] = Math.min(extent[1], y);
        extent[2] = Math.max(extent[2], x);
        extent[3] = Math.max(extent[3], y);
    }

    function getMargin(extent) {
        return getWidth(extent) + getHeight(extent);
    }

    function getSize(extent) {
        return [extent[2] - extent[0], extent[3] - extent[1]];
    }

    function getTopLeft(extent) {
        return [extent[0], extent[3]];
    }

    function getTopRight(extent) {
        return [extent[2], extent[3]];
    }

    function getBottomLeft(extent) {
        return [extent[0], extent[1]];
    }

    function getBottomRight(extent) {
        return [extent[2], extent[1]];
    }

    function getCenter(extent) {
        return [(extent[0] + extent[2]) / 2, (extent[1] + extent[3]) / 2];
    }

    function getWidth(extent) {
        return extent[2] - extent[0];
    }

    function getHeight(extent) {
        return extent[3] - extent[1];
    }

    function getCorner(extent, corner) {
        var coordinate;
        if (corner === Corner.BOTTOM_LEFT) {
            coordinate = getBottomLeft(extent);
        } else if (corner === Corner.BOTTOM_RIGHT) {
            coordinate = getBottomRight(extent);
        } else if (corner === Corner.TOP_LEFT) {
            coordinate = getTopLeft(extent);
        } else if (corner === Corner.TOP_RIGHT) {
            coordinate = getTopRight(extent);
        } else {}
        return coordinate;
    }

    function intersects(extent1, extent2) {
        return extent1[0] <= extent2[2] && extent1[2] >= extent2[0] && extent1[1] <= extent2[3] && extent1[3] >= extent2[1];
    }

    function isEmpty(extent) {
        return extent[2] < extent[0] || extent[3] < extent[1];
    }
}, function (module, __webpack_exports__, __webpack_require__) {

    "use strict";

    var coordtransform = {
        x_PI: 3.14159265358979324 * 3000.0 / 180.0,
        PI: 3.1415926535897932384626,
        a: 6378245.0,
        ee: 0.00669342162296594323,

        bd09togcj02: function bd09togcj02(bd_lon, bd_lat) {
            var x_PI = this.x_PI;
            var PI = this.PI;
            var a = this.a;
            var ee = this.ee;
            var bd_lon = +bd_lon;
            var bd_lat = +bd_lat;
            var x = bd_lon - 0.0065;
            var y = bd_lat - 0.006;
            var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_PI);
            var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_PI);
            var gg_lng = z * Math.cos(theta);
            var gg_lat = z * Math.sin(theta);
            return [gg_lng, gg_lat];
        },

        gcj02tobd09: function gcj02tobd09(lng, lat) {
            var x_PI = this.x_PI;
            var PI = this.PI;
            var a = this.a;
            var ee = this.ee;
            var lat = +lat;
            var lng = +lng;
            var z = Math.sqrt(lng * lng + lat * lat) + 0.00002 * Math.sin(lat * x_PI);
            var theta = Math.atan2(lat, lng) + 0.000003 * Math.cos(lng * x_PI);
            var bd_lng = z * Math.cos(theta) + 0.0065;
            var bd_lat = z * Math.sin(theta) + 0.006;
            return [bd_lng, bd_lat];
        },

        wgs84togcj02: function wgs84togcj02(lng, lat) {
            var x_PI = this.x_PI;
            var PI = this.PI;
            var a = this.a;
            var ee = this.ee;
            var lat = +lat;
            var lng = +lng;
            if (out_of_china(lng, lat)) {
                return [lng, lat];
            } else {
                var dlat = transformlat(lng - 105.0, lat - 35.0);
                var dlng = transformlng(lng - 105.0, lat - 35.0);
                var radlat = lat / 180.0 * PI;
                var magic = Math.sin(radlat);
                magic = 1 - ee * magic * magic;
                var sqrtmagic = Math.sqrt(magic);
                dlat = dlat * 180.0 / (a * (1 - ee) / (magic * sqrtmagic) * PI);
                dlng = dlng * 180.0 / (a / sqrtmagic * Math.cos(radlat) * PI);
                var mglat = lat + dlat;
                var mglng = lng + dlng;
                return [mglng, mglat];
            }
        },

        gcj02towgs84: function gcj02towgs84(lng, lat) {
            var x_PI = this.x_PI;
            var PI = this.PI;
            var a = this.a;
            var ee = this.ee;
            var lat = +lat;
            var lng = +lng;
            if (out_of_china(lng, lat)) {
                return [lng, lat];
            } else {
                var dlat = transformlat(lng - 105.0, lat - 35.0);
                var dlng = transformlng(lng - 105.0, lat - 35.0);
                var radlat = lat / 180.0 * PI;
                var magic = Math.sin(radlat);
                magic = 1 - ee * magic * magic;
                var sqrtmagic = Math.sqrt(magic);
                dlat = dlat * 180.0 / (a * (1 - ee) / (magic * sqrtmagic) * PI);
                dlng = dlng * 180.0 / (a / sqrtmagic * Math.cos(radlat) * PI);
                var mglat = lat + dlat;
                var mglng = lng + dlng;
                return [lng * 2 - mglng, lat * 2 - mglat];
            }
        },

        transformlat: function transformlat(lng, lat) {
            var x_PI = this.x_PI;
            var PI = this.PI;
            var a = this.a;
            var ee = this.ee;
            var lat = +lat;
            var lng = +lng;
            var ret = -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat + 0.1 * lng * lat + 0.2 * Math.sqrt(Math.abs(lng));
            ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
            ret += (20.0 * Math.sin(lat * PI) + 40.0 * Math.sin(lat / 3.0 * PI)) * 2.0 / 3.0;
            ret += (160.0 * Math.sin(lat / 12.0 * PI) + 320 * Math.sin(lat * PI / 30.0)) * 2.0 / 3.0;
            return ret;
        },

        transformlng: function transformlng(lng, lat) {
            var x_PI = this.x_PI;
            var PI = this.PI;
            var a = this.a;
            var ee = this.ee;
            var lat = +lat;
            var lng = +lng;
            var ret = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng));
            ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
            ret += (20.0 * Math.sin(lng * PI) + 40.0 * Math.sin(lng / 3.0 * PI)) * 2.0 / 3.0;
            ret += (150.0 * Math.sin(lng / 12.0 * PI) + 300.0 * Math.sin(lng / 30.0 * PI)) * 2.0 / 3.0;
            return ret;
        },

        out_of_china: function out_of_china(lng, lat) {
            var lat = +lat;
            var lng = +lng;

            return !(lng > 73.66 && lng < 135.05 && lat > 3.86 && lat < 53.55);
        }

    };

    __webpack_exports__["a"] = coordtransform;
}]);