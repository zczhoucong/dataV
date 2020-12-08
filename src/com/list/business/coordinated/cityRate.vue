/*
* 高春超
* 2018年5月28日10:05:39
* 协调发展-城镇化率
*/
<template>
    <div :style="container">
        <slide v-if="isScroll"  class="sliders" :style="container" style="overflow: hidden;" :scrollDir="scrollDir" :interval="scrollTime*1000" :childNum="groupCom.length">
            <div v-for="group in groupCom">
                <div class="com-single-box" :style="comWidth" v-for="series in group" :key="series.xid">
                    <div class="com-single-title" :style="titleStyle">{{series.title}}</div>
                    <bar-vert-basic class="com-single-chart" :width="chartStyle.width" :height="chartStyle.height"
                                    :barWidth="barStyle.barWidth" :barBack="barStyle.barBack"
                                    :legendShow="barStyle.legendShow" :xName="barStyle.xName"
                                    :tickColor="barStyle.tickColor" :barColor1="barStyle.barColor1"
                                    :x="barStyle.x" :y="barStyle.y" :labelShow="barStyle.labelShow"
                                    :staticData="series.items" :gridTop="barStyle.gridTop"
                                    :gridRight="barStyle.gridRight"
                    ></bar-vert-basic>
                </div>
            </div>
        </slide>
        <div v-else>
            <div class="com-single-box" :style="comWidth" v-for="series in seriesName" :key="series.xid">
                <div class="com-single-title" :style="titleStyle">{{series.title}}</div>
                <bar-vert-basic class="com-single-chart" :width="chartStyle.width" :height="chartStyle.height"
                                :barWidth="barStyle.barWidth" :barBack="barStyle.barBack" :key="new Date()"
                                :legendShow="barStyle.legendShow" :xName="barStyle.xName"
                                :tickColor="barStyle.tickColor" :barColor1="barStyle.barColor1"
                                :x="barStyle.x" :y="barStyle.y" :labelShow="barStyle.labelShow"
                                :staticData="series.items" :gridTop="barStyle.gridTop" :gridRight="barStyle.gridRight"
                ></bar-vert-basic>
            </div>
        </div>
    </div>
</template>

<script>
    import echarts from "echarts";
    import Slide from "@/com/components/slider.vue";
    import barVertBasic from '@/com/list/chart/bar/barVertBasic.vue'
    import {getApiSource} from '@/utils/getApiData'
    export default {
        props: {
            width: {type: [Number, String], default: 530}, // 宽度
            height: {type: [Number, String], default: 250}, // 高度
            isScroll: {type: [Boolean, String], default: false}, // 是否开启滚动条
            scrollDir: {type: String, default: 'horizontal'},// 滚动方向
            scrollTime: {type: [Number, String], default: 2}, // 滚动时长
            nums: {type: [Number, String], default: 1},// 每页展示数量
            fontColor: {type: String, default: '#fff'},
            fontWeight: {type: String, default: 'normal'},
            fontSize: {type: [Number, String], default: 12},
            fontHeight: {type: [Number, String], default: 30},
            fontFamily: {type: String, default: "AgencyFBBold"},// 字体
            dataType: {type: String, default: 'WebApi'},
            apiUrl: {
                type: String,
                default: ''
            },
            staticData: {
                type: Array, default: () => {
                    return []
                }
            },
            x: {type: String, default: 'year'},
            y: {type: String, default: 'val'},
            s: {type: String, default: 'year'},
            i: {type: String, default: 'infoId'},
            t: {type: String, default: 'name'},
        },
        components: {barVertBasic, Slide},
        data(){
            return {
                comName: '城镇化率',
                seriesName: [],
                colors: ['#33ccff', '#66cc66', '#ffbb33'],
                pageSize: eval(this.nums)<1?1:this.nums,
                barStyle: {
                    barWidth: 25,
                    barBack: 'rgba(0,0,0,0)',
                    xName: '%',
                    labelShow: false,
                    legendShow: false,
                    gridTop: 0,
                    gridRight: 30,
                    tickColor: 'rgba(73, 162, 210, 1)',
                    barColor1: '#33ccff,#66cc66,#ffbb33',
                    x: this.x,
                    y: this.y
                }
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.initChart();
            })
        },
        computed: {
            container(){
                return {
                    width: `${this.width}px`,
                    height: `${this.height}px`,
                }
            },
            // 根据数量进行分组
            groupCom(){
                let com = [];
                for(let i=0,len=this.seriesName.length;i<len;i+=eval(this.pageSize)){
                    com.push(this.seriesName.slice(i,i+eval(this.pageSize)));
                }
                return com;
            },
            //获取单个组件的宽度
            comWidth(){
                return {
                    width: `${this.width / this.pageSize}px`,
                }
            },
            //获取标题的样式
            titleStyle(){
                return {
                    fontFamily: this.fontFamily,
                    fontSize: `${this.fontSize}px`,
                    color: this.fontColor,
                    fontWeight: this.fontWeight,
                    height: `${this.fontHeight}px`,
                    lineHeight: `${this.fontHeight}px`,
                }
            },
            // 获取图表的样式
            chartStyle(){
                return {
                    width: `${this.width / this.pageSize}px`,
                    height: `${this.height - this.fontHeight}px`,
                }
            }
        },
        methods: {
            async initChart(){
                let dataJson = await getApiSource(this.dataType, this.apiUrl, this.staticData);
                this.seriesName = [];
                dataJson.forEach(i => {
                    if (this.seriesName.findIndex(s => s.title === i[this.t]) < 0) {
                        this.seriesName.push({title: i[this.t], xid: i[this.i]})
                    }
                })
                this.$emit('count', {
                    count: this.seriesName.length,
                    data: this.seriesName
                });
                this.seriesName.forEach(i => {
                    const items = dataJson.filter(d => d[this.i] === i.xid);
                    i.items = items;
                });
                if (!this.isScroll) {
                    this.pageSize = this.seriesName.length
                }
            },
            // 绑定点击回调事件
            bindEvent(stat){
                // 注册内部元素点击事件
                this.$emit('callback', {
                    type: 'click',
                    data: stat
                })
            }
        }
    };
</script>
<style scoped lang="less" type="text/less">
    .com-single-box {
        float: left;
        height: 100%;
        text-align: center;
        .com-single-title,
        .com-single-chart {
            width: 100%;
            float: left;
        }
    }
</style>
