<!--
说明：je map 组件·~
作者：wf
@sp
-->
<template>
    <div :id="mapId" :style="getStyle"></div>
</template>
<script>
    import {traffic} from './config'
    import guid from '../../../utils/guid';
    //import je from '../../../../static/Modules/je-map/je-map.min.js';
    export default {
        name: 'geomap',
        props: {
            width: {type: [Number, String], default: 400}, // 宽度
            height: {type: [Number, String], default: 200}, // 高度
            sourceData: {type: Object, default: []},
            sourceStyle:{type: Array, default: []},
            vectorRange:{type:Object,default:{}}
        },
        data(){
            return {
                mapId: `map_geomap_${guid()}`,
                map:null
            }
        },
        computed: {
            // 根据选中的边框类型设置边框样式
            getStyle(){
                return {
                    width:`${this.width}px`,
                    height:`${this.height}px`
                };
            }
        },
        mounted() {
            setTimeout(()=>{
                this.initMap();
            });
        },
        methods: {
            initMap(){
                //let je = window.je;
                je.PROXY_URL = "http://localhost:8081/ProxyServlet/proxyHandler?url=";
                this.map  = new je.x.Map({
                    el : this.mapId,
                    mapCRS : {
                        topTileExtent: [80000, -50950000, 51280000, 250000],
                        coordtransform:"none"
                    },
                    renderWorldCopies: false

                });
                this.map.spatialReference = {
                    projection : "IDENTITY",
                    resolutions : this.map.delegate_map.getResolutions()
                };
                //this.map.delegate_map.showTileBoundaries = true;
                //优先加载底图
                let cfgs = this.sourceData.baseLayer;
                for(let i = 0;i<cfgs.length;i++){
                    if(cfgs[i].Type=="OGC-WMTS"){
                        this.addWMTSLayer(cfgs[i],i);
                    }
                }
                //获取底图配置
                let tmp = this.sourceStyle[0].children;
                for(let i=0;i<tmp.length;i++){
                    if(tmp[i].key=="center"){
                        let c = tmp[i].value.split(",");
                        this.map.setCenter([c[0], c[1]]);
                    }else if(tmp[i].key=="zoom"){
                        this.map.zoomTo(tmp[i].value);
                    }
                }
                //底图加载完成后再加载其他图层
                let layers = this.sourceData.layers;
                for(let i=0; i<layers.length;i++){
                    if(layers[i].Type=="HEATMAP"){
                        this.addHeatMap(layers[i],i);
                    }else if(layers[i].Type=="MIGRATE"){
                        this.addMigrate(layers[i],i);
                    }else if(layers[i].Type=="VECTOR"){
                        this.addVector(layers[i],i);
                    }
                    
                }
            },
            addWMTSLayer(cfg,i){
                //let je = window.je;
                let source = new je.x.source.WMTS(cfg);
                let layer = new je.x.layer.Tile({
                    id :guid(),
                    source : source,
                    zIndex : i+1
                });
                this.map.addLayer(layer);
            },
            addHeatMap(layer,i){
                let geojson;
                //判断data是否为json
                if(typeof(layer.Data) == "object" && Object.prototype.toString.call(layer.Data).toLowerCase() == "[object object]" && !layer.Data.length){                   
                    geojson = new je.x.source.GeoJSON({
                        data:layer.Data,
                        columns : layer.Columns
                    });
                }else{
                    if(layer.Url.length==0)return;
                    geojson = new je.x.source.GeoJSON({
                        url : layer.Url,
                        columns : layer.Columns
                    });
                }
                let tmp = this.sourceStyle[i+1].children;
                let opacity,radius,gradient={};
                for(let i=0;i<tmp.length;i++){
                    if(tmp[i].key=="opacity"){
                        opacity = tmp[i].value;
                    }else if(tmp[i].key=="radius"){
                        radius = tmp[i].value;
                    }else{
                        gradient[tmp[i].key] = tmp[i].value;
                    }
                }
                let heatMap = new je.x.layer.Heatmap({
                    source : geojson,
                    visible : true,
                    opacity : opacity,
                    radius : radius,
                    gradient : gradient
                });
                this.map.addLayer(heatMap);
            },
            addMigrate(layer,i){
                let geojson = new je.x.source.GeoJSON({
                    data: layer.Data,
                    columns : layer.Columns
                });

                let tmp = this.sourceStyle[i+1].children;
                let routeColor,routeWidth,fromPointColor,fromPointSize,toPointColor,toPointSize;
                for(let i=0;i<tmp.length;i++){
                    if(tmp[i].key=="routeColor"){
                        routeColor = tmp[i].value;
                    }else if(tmp[i].key=="routeWidth"){
                        routeWidth = tmp[i].value;
                    }else if(tmp[i].key=="fromPointColor"){
                        fromPointColor = tmp[i].value;
                    }else if(tmp[i].key=="fromPointSize"){
                        fromPointSize = tmp[i].value;
                    }else if(tmp[i].key=="toPointColor"){
                        toPointColor = tmp[i].value;
                    }else if(tmp[i].key=="toPointSize"){
                        toPointSize = tmp[i].value;
                    }
                }

                let migrate = new je.x.layer.Migrate({
                    source:geojson,
                    Moption:{
                        routeColor:routeColor,
                        routeWidth:routeWidth,
                        fromPointColor:fromPointColor,
                        fromPointSize:fromPointSize,
                        toPointColor:toPointColor,
                        toPointSize:toPointSize
                    }
                });
                this.map.addLayer(migrate);
            },
            addVector(layer,i){
                let geojson;
                //判断data是否为json
                if(typeof(layer.Data) == "object" && Object.prototype.toString.call(layer.Data).toLowerCase() == "[object object]" && !layer.Data.length){                   
                    geojson = new je.x.source.GeoJSON({
                        data:layer.Data,
                        columns : layer.Columns
                    });
                }else{
                    if(layer.Url.length==0)return;
                    geojson = new je.x.source.GeoJSON({
                        url : layer.Url,
                        columns : layer.Columns
                    });
                }

                let tmp = this.sourceStyle[i+1].children;
                let opacity,stops,dcolors,fontSize,fontColor;
                for(let n=0;n<tmp.length;n++){
                    if(tmp[n].key=="opacity"){
                        opacity = tmp[n].value;
                    }else if(tmp[n].key=="stops"){
                       stops = tmp[n].value;
                    }else if(tmp[n].key=="colors"){
                       dcolors =[] ;
                       for(let j = 0; j<tmp[n].value.length;j++){
                           dcolors.push(tmp[n].value[j].color);
                       }
                    }else if(tmp[n].key=="fontSize"){
                        fontSize = tmp[n].value;
                    }else if(tmp[n].key=="fontColor"){
                        fontColor = tmp[n].value;
                    }
                }

                let vector;
                if(this.sourceStyle[i+1].isOpenDistrictColor){
                    vector = new je.x.layer.Vector({
                        source:geojson,
                        type:"fill-extrusion",
                        label : {
                            show : true,
                            text : "行政区",
                            textStyle : {
                                color : fontColor,
                                fontStyle: 'normal',
                                fontWeight: 'normal',
                                fontFamily: 'sans-serif',
                                fontSize: fontSize,
                            }
                        },
                        color:dcolors,
                        paint:{
                            'fill-extrusion-opacity': opacity
                        }
                    });
                }else{
                    vector = new je.x.layer.Vector({
                        source:geojson,
                        type:"fill-extrusion",
                        label : {
                            show : true,
                            text : "行政区",
                            textStyle : {
                                color : fontColor,
                                fontStyle: 'normal',
                                fontWeight: 'normal',
                                fontFamily: 'sans-serif',
                                fontSize: fontSize,
                            }
                        },
                        paint:{
                            'fill-extrusion-color': {
                                'stops': stops,//[[1, "#FDE2CA"], [2, "#FACE9C"], [3, "#F09C42"], [4, "#D0770B"], [5, "#945305"], [6, "#714902"]],
                                'property': layer.Columns[0]
                            },
                            'fill-extrusion-opacity': opacity
                        }
                    });
                }

                
                this.map.addLayer(vector);
                let line = new je.x.layer.Vector({
                    source:geojson,
                    type:"line",
                    paint:{
                        'line-color': '#fff',
                        'line-width':5
                    }
                });
                this.map.addLayer(line);
            }
        }    
    }
</script>
<style lang="css">
    @import '../../../../static/Modules/je-map/style.css';
</style>