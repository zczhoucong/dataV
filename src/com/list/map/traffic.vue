<!--
说明：实时交通组件
作者：高春超
时间：2018年4月28日11:39:32
-->
<template>
    <section>
        <div :id="mapId" :style="getStyle"></div>
        <img :src="mapImg" crossorigin="anonymous" :style="getStyle" style="display:none">
    </section>    
</template>
<script>
    import * as maptalks from 'maptalks';
    import {traffic} from './config'
    import guid from '../../../utils/guid';
import { setTimeout } from 'timers';
    export default {
        name: 'traffic',
        props: {
            width: {type: [Number, String], default: 400}, // 宽度
            height: {type: [Number, String], default: 200} // 高度
        },
        data(){
            return {
                mapId: `map_traffic_${guid()}`,
                map:null,
                mapImg:''
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
        created(){
            setTimeout(() => {
                const view = {
                    projection: 'baidu'
                };
                const mapBox = document.getElementById(this.mapId);
                if(mapBox) {
                   this.createMap(this.mapId, 12, traffic.base_url, view);
                }
            }, 500);
        },
        methods: {
            createMap(id) {
	      this.$mapapi.mapInit(
	        id,
	        window.mapConfig.mapType,
	        "",
	        window.mapConfig,
	        () => {
	          // this.$mapapi.effectScatter();
	        }
	      );
	    },
        }
    }
</script>