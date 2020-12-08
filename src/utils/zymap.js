import * as maptalks from "maptalks";
import * as markercluster from "maptalks.markercluster";
import * as e3Layer from 'maptalks.e3';
import Vue from "vue";
class ZyMap {
    constructor() {
        this.Map = null;
        this.drawTool = null;
        this.toolsdisable = false;
        this.scaleTool = null;
        this.MapContainId = null;
    }
    /**
     * 底图初始化
     * @param {string} containId 地图容器id
     * @param {string} type 底图类型
     * @param {string} baseUrl 底图地址
     * @param {Object} opts 底图相关配置
     * @param {Function} callfun 加载完回调
     */
    mapInit(containId, type, baseUrl, opts, callfun) {
        if (type === "" && baseUrl === "") type = 'baidu';
        let option = this.getBaseMapOption(type, baseUrl, opts);
        if (!option) return;
        this.MapContainId = this.MapContainId ? this.MapContainId : containId;
        this.Map && this.Map.remove()
        this.Map = new maptalks.Map(this.MapContainId, option);
        this.addScaleControl(); //比例尺控件
        this.setMapStatus(opts); //地图功能(缩放、拖拽等)初始化
        if (type && type != 'baidu')
            this.Map.getBaseLayer().options.cssFilter = 'sepia(100%) invert(90%)'
        this.Map.on("click", e => {
            console.log(`x:${e.coordinate.x},y:${e.coordinate.y}`)
        })
        let inter = setInterval(() => {
            if (this.Map) {
                callfun()
                clearInterval(inter);
            }
        }, 500)
    }
    /**
     * 根据类型获取底图配置
     * @param {string} type 底图类型
     * @param {string} baseUrl 底图地址
     */
    getBaseMapOption(type, baseUrl, opts) {
        let options = null;
        if (opts.mapCenter && opts.mapCenter.length > 0)
            opts.mapCenter = opts.mapCenter.split(',');
        else
            opts.mapCenter = null;
        switch (type) {
            case '':
                maptalks.SpatialReference.loadArcgis(
                    baseUrl + "?f=pjson",
                    (err, conf) => {
                        let view = conf.spatialReference
                        let center = [Number((view.fullExtent.xmax + view.fullExtent.xmin) / 2), Number((view.fullExtent.ymax + view.fullExtent.ymin) / 2)]
                        view.projection = 'IDENTITY';
                        options = {
                            center: opts.mapCenter || center,
                            zoom: opts.mapZoomLevel || 3,
                            minZoom: 0,
                            maxZoom: view.resolutions.length - 1,
                            view: view,
                            attribution: false,
                            pitch: opts.mapPitch || 0,
                            baseLayer: new maptalks.TileLayer("customTile", {
                                tileSystem: conf.tileSystem,
                                tileSize: conf.tileSize,
                                renderer: 'canvas',
                                urlTemplate: `${baseUrl}/tile/{z}/{y}/{x}`,
                                repeatWorld: false
                            })
                        };
                    })
                break;
            case 'baidu': //bd09
                options = {
                    center: opts.mapCenter || [114.40211, 30.523678],
                    zoom: opts.mapZoomLevel || 14,
                    minZoom: 1,
                    maxZoom: 19,
                    pitch: opts.mapPitch || 0,
                    view: {
                        projection: 'baidu'
                    },
                    attribution: false,
                    baseLayer: new maptalks.TileLayer('baiduTile', {
                        //可选值:customid=dark, midnight, grayscale, hardedge, light, redalert, googlelite, grassgreen, pink, darkgreen, bluish
                        urlTemplate: 'http://api2.map.bdimg.com/customimage/tile?&x={x}&y={y}&z={z}&udt=20161109&scale=1&styles=t%3Abackground%7Ce%3Aall%7Cc%3A%2308133eff%2Ct%3Aland%7Ce%3Aall%7Cc%3A%2308133eff%2Ct%3Awater%7Ce%3Aall%7Cc%3A%23142a55ff%2Ct%3Abuilding%7Ce%3Aall%7Cc%3A%231a4380ff%2Ct%3Agreen%7Ce%3Ag.s%7Cc%3A%231a4385ff%2Ct%3Aeducation%7Ce%3Aall%7Cc%3A%231a4385ff%2Ct%3Ahighway%7Ce%3Aall%7Cc%3A%23193675ff%2Ct%3Aarterial%7Ce%3Aall%7Cc%3A%23193675ff%2Ct%3Alocal%7Ce%3Aall%7Cc%3A%23012450ff%2Ct%3Arailway%7Ce%3Aall%7Cc%3A%23012450ff%2Ct%3Apoi%7Ce%3Al%7Cc%3A%23ffffffff%2Ct%3Apoi%7Ce%3Al.t.s%7Cc%3A%23000000ff%2Ct%3Ahighway%7Ce%3Al.t.f%7Cc%3A%23000000ff%2Ct%3Aarterial%7Ce%3Al.t.f%7Cc%3A%23000000ff%2Ct%3Aarterial%7Ce%3Al.t.s%7Cc%3A%23f4edd9ff%2Ct%3Ahighway%7Ce%3Al.t.s%7Cc%3A%23f4edd9ff',
                        // urlTemplate: 'http://api{s}.map.bdimg.com/customimage/tile?&x={x}&y={y}&z={z}&newmap=1',
                        subdomains: [2]
                    })
                }
                break;
            case 'tdt': //wgs84
                options = {
                    center: opts.mapCenter || [113.90813204207006, 30.925575609695244],
                    zoom: opts.mapZoomLevel || 9,
                    minZoom: 1,
                    maxZoom: 18,
                    pitch: opts.mapPitch || 0,
                    attribution: false,
                    baseLayer: new maptalks.TileLayer('TdtTile', {
                        subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
                        urlTemplate: 'http://t{s}.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=6ce9abdf453f43ccdd3e1a6375b74306',
                    }),
                    layers: [
                        new maptalks.TileLayer('wordtile', { //文字图层
                            subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
                            urlTemplate: 'http://t{s}.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=6ce9abdf453f43ccdd3e1a6375b74306',
                        })
                    ]
                }
                break;
            case 'google': //gcj02(火星坐标系)
                options = {
                    center: opts.mapCenter || [114.32225302400866, 30.569801826560507],
                    zoom: opts.mapZoomLevel || 12,
                    minZoom: 1,
                    maxZoom: 20,
                    pitch: opts.mapPitch || 0,
                    attribution: false,
                    baseLayer: new maptalks.TileLayer('googleTile', {
                        urlTemplate: 'http://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}',
                        // cssFilter: 'sepia(100%) invert(90%)'
                    })
                }
                break;
            case 'tencent': //gcj02(火星坐标系)
                options = {
                    center: opts.mapCenter || [114.39594003119055, 30.517743542326087],
                    zoom: opts.mapZoomLevel || 9,
                    minZoom: 1,
                    maxZoom: 20,
                    pitch: opts.mapPitch || 0,
                    attribution: false,
                    baseLayer: new maptalks.TileLayer('tencentTile', {
                        urlTemplate: (x, y, z) => {
                            var urlArgs = this.getUrlArgs(x, y, z);
                            var z = urlArgs.z;
                            var x = urlArgs.x;
                            var y = urlArgs.y;
                            var m = Math.floor(x / 16.0);
                            var n = Math.floor(y / 16.0);
                            var urlTemplate = 'http://rt0.map.gtimg.com/realtimerender?z={z}&x={x}&y={y}&type=vector&style=3';
                            var url = urlTemplate.replace('{x}', x).replace('{y}', y).replace('{z}', z).replace('{m}', m).replace('{n}', n);
                            return url;
                        },
                        // cssFilter: 'sepia(100%) invert(100%)'
                    })
                }
                break;
        }
        return options;
    }

    addScaleControl() {
        this.scaleTool = new maptalks.control.Scale({
            'position': 'bottom-left',
            'maxWidth': 150,
            'metric': true,
            'imperial': false
        });
        this.Map.addControl(this.scaleTool);
        this.scaleTool.hide();
    }

    setMapStatus(opts) {
        this.showScaleTools(opts.mapScaleControlStatus);
        this.setDragStatus(opts.mapDragStatus);
        this.setZoomStatus(opts.mapZoomStatus)
        this.setMapOpacity(opts.mapOpacity);
    }

    /**
     * 是否显示地图比例尺
     * @param {Boolean} status 禁用比例尺状态(true|false)
     */
    showScaleTools(status) {
        status ? this.scaleTool.show() : this.scaleTool.hide()
    }

    /**
     * 是否禁用地图拖拽
     * @param {Boolean} status 禁用拖拽状态(true|false)
     */
    setDragStatus(status) {
        status ? this.Map.config('draggable', true) : this.Map.config('draggable', false)
    }

    /**
     * 是否禁用地图缩放
     * @param {Boolean} status 禁用缩放状态(true|false)
     */
    setZoomStatus(status) {
        status ? this.Map.config('scrollWheelZoom', true) : this.Map.config('scrollWheelZoom', false)
    }
    /**
     * 设置地图透明度
     * @param {Number} val 透明度(0-1)
     */
    setMapOpacity(val) {
        this.Map.config('opacity', val)
    }
    /**
     * 设置地图中心点&缩放级别
     * @param {Array} coord 坐标
     * @param {Number} zoom 缩放级别
     */
    setCenterAndZoom(coord, zoom) {
        if (coord && Array.isArray(coord) && coord[0])
            this.Map.setCenter(coord)
        if (zoom) this.Map.setZoom(zoom);
    }

    /**
     * 设置地图倾斜角度
     * @param {Number} pitch 倾斜角度
     */
    setPitch(pitch) {
        this.Map.setPitch(pitch);
    }

    /**
     * 鼠标移动显示坐标
     * @param {string} off 传入参数则关闭坐标显示
     */
    showMouseOverCoord(off) {
        var textPanel = new maptalks.control.Panel({
            'position': 'bottom-left',
            'draggable': true,
            'custom': false,
            'content': '<span id="_mouseOverCoord" style="font-size:16px;color:#fff"></span>',
            'closeButton': false
        });
        this.Map.addControl(textPanel);
        this.Map.on("mousemove", e => {
            let obj = document.getElementById('_mouseOverCoord');
            if (obj)
                obj.innerHTML = `x:${e.coordinate.x},y:${e.coordinate.y}`;
        })
        if (off)
            this.Map.removeContorl(textPanel);
    }

    /**
     * 显示缩放控件
     */
    showZoomTool() {
        let html = `<div style="width:40px;height:80px;background:#fff;border-radius:5px;font-size:30px;">
        <div id="_zoomin" style="width:40px;height:40px;text-align:center;line-height:40px;font-font-weight:bold;cursor:pointer;border-bottom:1px solid #cecece">+</div>
        <div id="_zoomout" style="width:40px;height:40px;text-align:center;line-height:40px;font-font-weight:bold;cursor:pointer">-</div>
        </div>`;
        var textPanel = new maptalks.control.Panel({
            'position': 'bottom-right',
            'draggable': true,
            'custom': false,
            'content': html,
            'closeButton': false
        });
        this.Map.addControl(textPanel);

        let dom1 = document.getElementById('_zoomin')
        dom1.addEventListener('click', (e) => {
            this.Map.zoomIn();
        });
        document.getElementById('_zoomout').addEventListener('click', (e) => {
            this.Map.zoomOut();
        })
    }

    /**
     * 
     * @param {Object} data 标注坐标数据
     * @param {Object} opts 标注配置项
     * @param {function} clkBack 标注点击回调
     */
    addMarker(data, opts, clkBack) {
        let layer = this.GetLayer(opts.layername || 'markerLayer');
        layer.bringToFront().clear();
        let foo = (mdata) => {
            if (mdata.x && mdata.x != '' && mdata.y && mdata.y != '') {
                let symbol = this.getMarkerSymbol('marker', opts, mdata);
                let coord = [Number(mdata.x), Number(mdata.y)];
                let marker = this.createGraphic('marker', coord, mdata, symbol);
                marker.addTo(layer).on('click', e => {
                    if (clkBack)
                        clkBack({
                            marker: e.target,
                            data: e.target.getProperties()
                        })
                });
            }
        }
        if (Array.isArray(data)) {
            data.forEach(item => {
                foo(item);
            })
        } else
            foo(data)
        this.layerToExtent(opts.layername || 'markerLayer')
    }

    /**
     * 
     * @param {string} layerid 图层名称
     * @param {Object} opts 标注样式
     */
    updateMarkerStyle(layerid, opts) {
        let layer = this.GetLayer(layerid);
        if (layer.getGeometries().length > 0) {
            layer.getGeometries().forEach(item => {
                let data = item.getProperties();
                let name = opts.TextField ? (data[opts.TextField] || '') : '';
                let markerFile = opts.markerFile == null || opts.markerFile == '' ? this.tomapImg('default') : this.tomapImg(opts.markerFile);
                item.updateSymbol({
                    textName: name,
                    textFaceName: opts.textFaceName || "microsoft yahei,arial,sans-serif",
                    textFill: opts.textFill || "#fff",
                    textSize: opts.textSize || 14,
                    textWeight: opts.textWeight || 'normal',
                    textOpacity: opts.textOpacity || 1,
                    textDx: opts.textDx || 0,
                    textDy: opts.textDy || 0,

                    textHaloOpacity: opts.textHaloOpacity || 0,
                    textHaloFill: opts.textHaloFill || '#fff',
                    textHaloRadius: opts.textHaloRadius || 0,
                    markerFile: markerFile,
                    markerWidth: opts.markerWidth || 24,
                    markerHeight: opts.markerHeight || 34,
                    markerOpacity: opts.markerOpacity || 1,
                    markerDx: opts.markerDx || 0,
                    markerDy: opts.markerDy || 0
                });
            })
        }
    }
    addLine(layername, coordinate, opts) {
        let layer = this.GetLayer(layername);
        layer.clear();
        let symbol = this.getMarkerSymbol('polyline', opts, null);
        this.createGraphic('polyline', coordinate, {}, symbol).addTo(layer);
    }

    addPolygon(layername, coordinate, opts) {
        let layer = this.GetLayer(layername);
        layer.clear();
        let symbol = this.getMarkerSymbol('polygon', opts, null);
        this.createGraphic('polygon', coordinate, {}, symbol).addTo(layer);
    }
    /**
     * 创建要素(标注|线|面)
     * @param {string} geometryType 要素类型('maker','polyline','polygon')
     * @param {Array} coordinate 坐标
     * @param {Object} properties 要素绑定的数据
     * @param {Object} symbol 要素样式
     */
    createGraphic(geometryType, coordinate, properties, symbol) {
        let graphic = null;
        switch (geometryType) {
            case 'marker':
                graphic = new maptalks.Marker(coordinate, {
                    symbol: symbol,
                    properties: properties
                });
                break;
            case 'polyline':
                graphic = new maptalks.LineString(coordinate, {
                    symbol: symbol,
                    properties: properties
                })
                break;
            case 'polygon':
                graphic = new maptalks.Polygon(coordinate, {
                    symbol: symbol,
                    properties: properties
                })
                break;
        }
        return graphic;
    }

    /**
     * 创建聚合点图层
     * @param {string} layerId 聚合点图层图层id
     * @param {Array} data 聚合点数据集合
     * @param {object} markerstyle 标注样式
     * @param {object} rgbSymbol 图层符号填充
     */
    ClusterMarker(layerId, data, markerstyle, rgbSymbol) {
        let markerSymbol = this.getClusterSymbol();
        rgbSymbol = Object.assign({}, markerSymbol, rgbSymbol);
        let markerList = [];
        data.forEach(item => {
            markerstyle = this.getMarkerSymbol('marker', markerstyle, item);
            let marker = this.createGraphic('marker', [item.x, item.y], item, markerstyle);
            markerList.push(marker);
        })
        this.getClusterLayer(layerId, markerList, rgbSymbol);
    }

    setInfoWindow(graphic, content, dx, dy) {
        const that = this;
        let myComponent = Vue.extend({
            template: content || '',
            data() {
                return {};
            },
            mounted() {},
            methods: {
                popClose() {
                    that.infoWindow.hide();
                    that.map.setPitch(0);
                    that.map.setBearing(0);
                }
            }
        });
        let component = new myComponent().$mount();
        var options = {
            'single': false,
            'custom': true,
            'dx': dx || 0,
            'dy': dy || 0,
            'content': content
        };
        graphic.removeInfoWindow();
        graphic.setInfoWindow(options);
        graphic.openInfoWindow();
        document.getElementById('_closeBtn').addEventListener('click', (e) => {
            graphic.closeInfoWindow();
        })
    }

    /**
     * 绘制工具
     * @param {String} type 绘制类型(marker,polyline,polygon)
     * @param {Object} opts 样式
     * @param {Function} callback 回调
     */
    addDrawTools(type, opts, callback) {
        opts = opts || {};
        let symbol = this.getMarkerSymbol(type, opts || {}, null);
        let mode = '';
        switch (type) {
            case 'marker':
                mode = 'Point';
                break;
            case 'polyline':
                mode = 'LineString';
                break;
            case 'polygon':
                mode = 'Polygon';
                break;
        }
        this.drawTool = new maptalks.DrawTool({
            mode: mode,
            symbol: symbol,
            once: opts.once || false
        }).addTo(this.Map);
        if (this.toolsdisable)
            this.drawTool.disable();
        else
            this.drawTool.enable();
        this.drawTool.on('drawend', param => { //定位结束
            let layer = this.GetLayer('drawtoollayer');
            if (opts.clear)
                layer.clear()
            let point = param.geometry._coordinates
            layer.addGeometry(param.geometry);
            let coords = null,
                _length = 0,
                areaval = 0,
                startLon, startLat, endLon, endLat;
            if (param.geometry.type == "Polygon") {
                coords = param.geometry.getCoordinates()[0]
                areaval = this.Map.computeGeometryArea(param.geometry); //面的面积
            } else if (param.geometry.type == "LineString") {
                coords = param.geometry.getCoordinates()
                let pointlist = [];
                for (let j = 0; j < coords.length; j++) {
                    if (j == 0) {
                        startLon = coords[j].x
                        startLat = coords[j].y
                    }
                    if (j == coords.length - 1) {
                        endLon = coords[j].x
                        endLat = coords[j].y
                    }
                    let temp = [coords[j].x, coords[j].y]
                    pointlist.push(temp)
                }
                this.calcAllDistanceByPointList(pointlist, len => {
                    _length = len;
                }); //线的长度
            } else
                coords = [param.geometry.getCoordinates()]
            let data = {
                type: type,
                coordinate: coords,
                length: _length,
                areaVal: areaval,
                startLon: startLon,
                startLat: startLat,
                endLon: endLon,
                endLat: endLat
            }
            if (callback)
                callback(data)
        });
    }

    //根据坐标数组计算总长度(距离)
    calcAllDistanceByPointList(path, callback) {
        let length = 0;
        for (let i = 0; i < path.length; i++) {
            if (i != path.length - 1) {
                let coord1 = path[i];
                let coord2 = path[i + 1];
                let calclen = this.calcDistance(coord1, coord2);
                length += calclen;
            }
        }
        if (callback)
            callback(length.toFixed(2));
    }
    drawToolsDisable(disable) {
        this.toolsdisable = disable;
        if (this.drawTool)
            if (disable)
                this.drawTool.disable();
            else
                this.drawTool.enable();
    }
    /**
     * 计算两点的距离
     * @param {Number} start 坐标
     * @param {number} end 坐标
     */
    calcDistance(start, end) {
        let coord = new maptalks.Coordinate(start);
        let coord2 = new maptalks.Coordinate(end);
        let distance = this.Map.computeLength(coord, coord2);
        return distance;
    }
    /**
     * 获取聚合图层样式
     */
    getClusterSymbol() {
        let symbol = {
            'noClusterWithOneMarker': false,
            'maxClusterZoom': 13,
            // 'maxClusterZoom': 15,
            symbol: {
                'markerType': 'ellipse',
                'markerFill': {
                    property: 'count',
                    type: 'interval',
                    stops: [
                        [0, '#90c8ff'],
                        [9, '#ffcb6f'],
                        [19, '#ff9595'],
                        [50, '#eea9ff']
                    ]
                },
                'markerFillOpacity': 1,
                'markerLineOpacity': .2,
                'markerLineWidth': 15,
                'markerLineColor': {
                    property: 'count',
                    type: 'interval',
                    stops: [
                        [0, '#90c8ff'],
                        [9, '#ffcb6f'],
                        [19, '#ff9595'],
                        [50, '#eea9ff']
                    ]
                },
                'markerWidth': {
                    property: 'count',
                    type: 'interval',
                    stops: [
                        [0, 35],
                        [9, 35],
                        [19, 35],
                        [50, 35]
                    ]
                },
                'markerHeight': {
                    property: 'count',
                    type: 'interval',
                    stops: [
                        [0, 35],
                        [9, 35],
                        [19, 35],
                        [50, 35]
                    ]
                }
            },
            'drawClusterText': true,
            'geometryEvents': true,
            'single': true
        }
        return symbol;
    }

    /**
     * 根据类别获取样式
     * @param {string} type 样式类别(marker-点(标注),polyline-线,polygon-面)
     * @param {Object} opts 样式属性
     * @param {Object} data 数据
     */
    getMarkerSymbol(type, opts, data) {
        let symbol = null;
        switch (type) {
            case 'marker':
                symbol = {
                    textName: opts.TextField ? (data[opts.TextField] || '') : '',
                    textFaceName: opts.textFaceName || "microsoft yahei,arial,sans-serif",
                    textSize: opts.textSize || 14,
                    textWeight: opts.textWeight || 'normal',
                    textOpacity: opts.textWeight || 1,
                    textDx: opts.textDx || 0,
                    textDy: opts.textDy || 0,
                    markerFile: opts.markerFile == null ? this.tomapImg('default') : this.tomapImg(opts.markerFile),
                    markerWidth: opts.markerWidth || 24,
                    markerHeight: opts.markerHeight || 34,
                    markerOpacity: opts.markerOpacity || 1,
                    markerDx: opts.markerDx || 0,
                    markerDy: opts.markerDy || 0

                };
                break;
            case 'polyline':
                symbol = {
                    lineColor: opts.linecolor || '#7680a2',
                    lineWidth: opts.linewidth || 2,
                    lineOpacity: opts.lineopacity || 1
                }
                break;
            case 'polygon':
                symbol = {
                    lineColor: opts.linecolor || '#7680a2',
                    lineWidth: opts.linewidth || 2,
                    lineOpacity: opts.lineopacity || 1,
                    polygonFill: opts.fillcolor || '#7680a2',
                    polygonOpacity: opts.fillopacity || 0.5
                }
                break;
        }
        return symbol;
    }
    /**
     * 根据图层名称创建或获取图层
     * @param {string} layerid 图层id
     */
    GetLayer(layerid) {
        let layer;
        if (this.Map.getLayer(layerid)) { //根据图层id获取图层
            layer = this.Map.getLayer(layerid) //获取图层
        } else {
            layer = new maptalks.VectorLayer(layerid, {
                enableAltitude: true
            }).addTo(this.Map) //创建图层
        }
        // layer.bringToFront();
        return layer;
    }

    layerExistStatus(layerid, callback) {
        if (this.Map.getLayer(layerid))
            callback(true)
        else
            callback(false);
    }

    /**
     * 创建聚合图层
     * @param {String} layerid 图层名称
     * @param {Array} markerList 标注集合
     * @param {Object} rgbSymbol 聚合样式
     */
    getClusterLayer(layerid, markerList, rgbSymbol) {
        let layer;
        if (this.Map.getLayer(layerid)) { //根据图层id获取图层
            layer = this.Map.getLayer(layerid) //获取图层
            layer.clear()
            layer.addMarker(markerList)
        } else {
            layer = new markercluster.ClusterLayer(layerid, markerList, rgbSymbol).addTo(this.Map)
        }
        // layer.bringToFront();
        return layer;
    }

    /**
     * 根据图层名称缩放至图层适应层级
     * @param {string} layerid 图层id
     */
    layerToExtent(layerid) {
        let layer = this.GetLayer(layerid);
        if (!layer) return;
        if (layer.getGeometries().length == 0) return;
        let Extent = layer.getExtent();
        if (Extent == null) return;
        let coord = Extent.getCenter();
        let zoom = this.Map.getFitZoom(Extent);
        this.Map.setCenterAndZoom(coord, zoom);
    }
    /**
     * 根据图层名称清除图层
     * @param {string} layerid 图层id
     */
    ClearLayerByLayerId(layerid) {
        let layer;
        if (this.Map.getLayer(layerid)) {
            layer = this.Map.getLayer(layerid);
            layer.clear();
        }
    }

    /**
     * 根据图层名称显示图层
     * @param {string} layerid 图层id
     */
    ShowLayerById(layerid) {
        let layer;
        if (this.Map.getLayer(layerid)) {
            layer = this.Map.getLayer(layerid);
            layer.show();
        }
    }

    /**
     * 根据图层名称隐藏图层
     * @param {string} layerid 图层id
     */
    HideLayerById(layerid) {
        let layer;
        if (this.Map.getLayer(layerid)) {
            layer = this.Map.getLayer(layerid);
            layer.hide();
        }
    }

    /**
     * 根据图层id移除图层
     * @param {string} layerid 图层id
     */
    removeLayerByid(layerid) {
        if (!this.Map) return;
        if (this.Map.getLayer(layerid)) {
            this.Map.removeLayer(this.Map.getLayer(layerid));
        }
        return;
    }

    /**
     * 图层置顶
     * @param {string} layerid 图层id
     */
    SetLayerTopIndex(layerid) {
        let layer;
        if (this.Map.getLayer(layerid)) {
            layer = this.Map.getLayer(layerid);
            layer.bringToFront();
        }
    }

    clearMap() {
        let layers = this.Map.getLayers();
        if (layers.length > 0) {
            layers.forEach(layer => {
                layer.clear();
            })
        }
    }
    getUrlArgs(x, y, z) {
        return {
            z: z,
            x: x,
            y: Math.pow(2, z) - 1 - y
        };
    }

    tomapImg(name) {
        return require(`../../static/map/${name}.png`);
    }

    effectScatter(options) {
        var geoCoordMap = {},
            data = [],
            data2 = [];
        for (let i = 0; i < 30; i++) {
            geoCoordMap['点' + i] = [114.40512441851385 - (0.2 - (Math.random() * 0.2 * 2)), 30.51334586864693 - (0.2 - (Math.random() * 0.2 * 2))]
        }
        for (let i = 0; i < 30; i++) {
            data.push({
                name: '点' + i,
                value: Math.floor(Math.random() * 100),
                alarm_num: Math.floor(Math.random() * 100)
            })
            data2.push({
                name: '点' + i,
                value: Math.floor(Math.random() * 100),
            })
        }
        var convertData = function (data) {
            var res = [];
            for (var i = 0; i < data.length; i++) {
                var geoCoord = geoCoordMap[data[i].name];
                if (geoCoord) {
                    res.push({
                        name: data[i].name,
                        value: geoCoord.concat(data[i].value),
                    });
                }
            }
            // 有数据的地区的名称和value值
            return res;
        };

        // 设定series是一个空的数组
        var series = [];
        [
            ['test', data]
        ].forEach(function (item, i) {
            series.push({
                name: 'effectScatter',
                type: 'effectScatter', // 散点图
                coordinateSystem: 'geo', // 使用地理坐标系
                hoverAnimation: options.hoverAnimation || true, //是否开启鼠标 hover 的提示动画效果
                legendHoverLink: options.hoverAnimation || false, //是否启用图例 hover 时的联动高亮。
                rippleEffect: { //涟漪特效相关配置
                    period: 4, //动画的周期，秒数
                    brushType: options.brushType || 'stroke', //波纹的绘制方式，可选 'stroke' 和 'fill'
                    scale: 3 //动画中波纹的最大缩放比例
                },
                data: convertData(item[1]),
                symbolSize: function (val) {//涟漪大小
                    return 30;
                    if (val[2] <= 100) {
                        return 4
                    }
                    if (val[2] > 100 && val[2] <= 200) {
                        return 8
                    }
                    if (val[2] > 200 && val[2] <= 300) {
                        return 12
                    }
                    if (val[2] > 300 && val[2] <= 400) {
                        return 16
                    }
                    if (val[2] > 400 && val[2] <= 500) {
                        return 20
                    }
                    if (val[2] > 500) {
                        return 24
                    }
                },
                itemStyle: {
                    normal: {
                        color: options.scatterColor || '#5599E4',//波纹颜色
                    }
                },
                zlevel: 1,
            }, {
                name: '点',
                type: 'scatter',
                coordinateSystem: 'geo',
                symbol: 'pin', //标记的图形。'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
                symbolSize: function (val) {
                    if (val[2] <= 100) {
                        return 40
                    }
                    if (val[2] > 100 && val[2] <= 200) {
                        return 60
                    }
                    if (val[2] > 200 && val[2] <= 300) {
                        return 80
                    }
                    if (val[2] > 300 && val[2] <= 400) {
                        return 90
                    }
                    if (val[2] > 400 && val[2] <= 500) {
                        return 100
                    }
                    if (val[2] > 500) {
                        return 130
                    }
                },
                label: {
                    normal: {
                        show: true,//是否显示标签
                        position: 'inside', //标签的位置 top left right bottom inside inside insideLeft insideRight etc.
                        color: options.fontColor || '#fff',
                        fontSize: options.fontSize || 9,
                        fontWeight: option.fontWeight || 'normal',//normal bold bolder lighter 100 200 300...etc
                        fontFamily: options.fontFamily || 'Microsoft YaHei', //'serif' , 'monospace', 'Arial', 'Courier New', 'Microsoft YaHei'
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#F62157', //标志颜色
                    }
                },
                zlevel: 6,
                data: convertData(data2)
            });
        });

        let opts = {
            series: series
        };
        let e3layer = new e3Layer.E3Layer('e3layer', opts)
        e3layer.addTo(this.Map);
    }
}
let map = new ZyMap();
export default {
    mapInit(containId, type, baseUrl, opts, callfun) {
        return map.mapInit(containId, type, baseUrl, opts, callfun)
    },
    setCenterAndZoom(coord, zoom) {
        return map.setCenterAndZoom(coord, zoom);
    },
    setPitch(pitch) {
        return map.setPitch(pitch);
    },
    setDragStatus(status) {
        return map.setDragStatus(status);
    },
    setZoomStatus(status) {
        return map.setZoomStatus(status);
    },
    layerExistStatus(layerid, cb) {
        return map.layerExistStatus(layerid, cb);
    },
    showScaleTools(status) {
        return map.showScaleTools(status);
    },
    setMapOpacity(val) {
        return map.setMapOpacity(val);
    },
    showMouseOverCoord(off) {
        return map.showMouseOverCoord(off);
    },
    showZoomTool() {
        return map.showZoomTool();
    },
    addMarker(data, opts, clkBack) {
        return map.addMarker(data, opts, clkBack);
    },
    updateMarkerStyle(layerid, opts) {
        return map.updateMarkerStyle(layerid, opts);
    },
    ClusterMarker(layerId, data, markerstyle, rgbSymbol) {
        return map.ClusterMarker(layerId, data, markerstyle, rgbSymbol);
    },
    addLine(layername, coordinate, opts) {
        return map.addLine(layername, coordinate, opts);
    },
    addPolygon(layername, coordinate, opts) {
        return map.addPolygon(layername, coordinate, opts);
    },
    setInfoWindow(graphic, content, dx, dy) {
        return map.setInfoWindow(graphic, content, dx, dy);
    },
    addDrawTools(type, symbol, callback) {
        return map.addDrawTools(type, symbol, callback);
    },
    drawToolsDisable(disable) {
        return map.drawToolsDisable(disable);
    },
    clearMap() {
        return map.clearMap();
    },
    effectScatter() {
        return map.effectScatter();
    }
}