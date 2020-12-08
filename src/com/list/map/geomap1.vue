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
            sourceStyle:{type: Array, default: []}
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
                je.PROXY_URL = "http://192.168.42.115:8081/ProxyServlet/proxyHandler?url=";
                console.log(je);
                this.map  = new je.x.Map({
                    el : this.mapId
                });
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
                debugger;
                //底图加载完成后再加载其他图层
                let layers = this.sourceData.layers;
                for(let i=0; i<layers.length;i++){
                    if(layers[i].Type=="HEATMAP"){
                        this.addHeatMap(layers[i],i);
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
                let opacity,radius,gradient4,gradient5,gradient8,gradient10
                for(let i=0;i<tmp.length;i++){
                    if(tmp[i].key=="opacity"){
                        opacity = tmp[i].value;
                    }else if(tmp[i].key=="radius"){
                        radius = tmp[i].value;
                    }else if(tmp[i].key=="gradient4"){
                        gradient4 = tmp[i].value;
                    }else if(tmp[i].key=="gradient5"){
                        gradient5 = tmp[i].value;
                    }else if(tmp[i].key=="gradient8"){
                        gradient8 = tmp[i].value;
                    }else if(tmp[i].key=="gradient10"){
                        gradient10= tmp[i].value;
                    }
                }
                let heatMap = new je.x.layer.Heatmap({
                    source : geojson,
                    visible : true,
                    opacity : opacity,
                    radius : radius,
                    gradient : {
                        0.4: gradient4, 
                        0.5: gradient5, 
                        0.8: gradient8, 
                        1.0: gradient10
                    }
                });
                this.map.addLayer(heatMap);
            }
        }    
    }
</script>
<style lang="css">
    @import '../../../../static/Modules/je-map/style.css';
</style>