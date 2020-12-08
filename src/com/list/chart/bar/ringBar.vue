<!--
说明：弧形柱图
作者：高春超
时间：2018年6月1日16:41:55
-->
<template>
    <div style="position: relative" :style="container">
        <section :id="chartId" :style="container" @click="bindEvent"></section>
        <ul class="legend-box" :style="legendStyle">
            <li v-for="(item,index) in legendData" :style="lineStyle" :key="chartId+'_'+index">{{item}}</li>
        </ul>
    </div>
</template>
<script>
    import eCharts from "echarts";
    import guid from '@/utils/guid';
    import {getApiSource} from '@/utils/getApiData'
    export default{
        props: {
            width: {type: [Number, String], default: 450}, // 宽度
            height: {type: [Number, String], default: 350}, // 高度
            startColor: {type: String, default: '#2B80CF'}, //起点色值
            endColor: {type: String, default: '#00FFCC'},  // 末端色值
            ringValue: {type: [Number, String], default: 70}, // 最大弧度
            barInterval: {type: [Number, String], default: 10}, // 柱间距
            barWidth: {type: [Number, String], default: 20}, // 柱宽度
            barNum: {type: [Number, String], default: 5}, // 柱子数量
            fontSize: {type: [Number, String], default: 16}, // 字体大小
            fontColor: {type: String, default: '#fff'}, // 字体颜色
            fontFamily: {type: String, default: "normal"},// 字体
            itemGap: {type: [Number, String], default: 15}, // 图文间距
            staticData: {
                type: Array, default: () => {
                    return []
                }
            },
            x: {type: String, default: 'text'},
            y: {type: String, default: 'value'},
        },
        data(){
            return {
                chartId: guid(),
                comName: '弧形柱图',
                colorNum: 1,
                legendData: [],
                num: this.barNum
            }
        },
        mounted(){
            this.$nextTick(() => {
                setTimeout(() => {
                    this.InitChart();
                });
                this.$emit('count', {
                    count: 1,
                    data: [{
                        title: this.comName,
                        xid: 1
                    }]
                });
            })
        },
        computed: {
            container(){
                return {
                    width: `${this.width.toString().replace('px', '')}px`,
                    height: `${this.height.toString().replace('px', '')}px`,
                }
            },
            lineStyle(){
                return {
                    lineHeight: `${this.barWidth}px`,
                    marginBottom: `${this.barInterval}px`,
                }
            },
            legendStyle(){
                return {
                    fontSize: `${this.fontSize}px`,
                    color: this.fontColor,
                    right: `calc(50% + ${this.itemGap}px)`,
                    fontFamily:this.fontFamily
                }
            }
        },
        methods: {
            bindEvent(){
                // 注册内部元素点击事件
                this.$emit('callback', {
                    type: 'click',
                    data: {
                        title: this.comName,
                        xtype: 1
                    }
                })
            },
            async InitChart(){
                let dataJson = await getApiSource(this.dataType, this.apiUrl, this.staticData);
                const placeHolderStyle = {
                    normal: {
                        label: {
                            show: false,
                        },
                        labelLine: {
                            show: false,
                        }
                    }
                };
                const len = dataJson.length;
                if (this.num > len) this.num = len;
                let seriesName = [];
                let series = [];
                // 弧形半径
                const size = parseInt(this.width) > parseInt(this.height) ? parseInt(this.height) / 2 - this.barWidth : parseInt(this.width) / 2 - this.barWidth;
                dataJson.forEach((i, index) => {
                    if (index < this.num) {
                        // 系列名称
                        seriesName.push(i[this.x]);
                        const outer = size - index * eval(this.barWidth) - index * eval(this.barInterval);
                        const inner = outer + eval(this.barWidth);
                        series.push({
                            name: i[this.x],
                            type: 'pie',
                            clockWise: true, //顺时加载
                            hoverAnimation: false, //鼠标移入变大
                            radius: [inner, outer],
                            itemStyle: placeHolderStyle,
                            data: this.getData(eval(i[this.y]))
                        })
                    }
                });
                this.legendData = seriesName;
                const option = {
                    tooltip: {
                        trigger: 'item',
                        formatter: function (params) {
                            return params.seriesName + ": " + params.name * 100 + "%";
                        }
                    },
                    series: series
                };
                if (document.getElementById(this.chartId)) {
                    let chart = eCharts.init(document.getElementById(this.chartId));
                    chart.setOption(option);
                }
            },
            getData(percent) {
                return [{
                    value: percent * parseInt(this.ringValue) / 100,
                    name: percent,
                    itemStyle: {
                        normal: {
                            color: new eCharts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: this.startColor
                            }, {
                                offset: 1,
                                color: this.endColor
                            }])
                        }
                    }
                }, {
                    value: 1 - percent * parseInt(this.ringValue) / 100,
                    itemStyle: {
                        normal: {
                            color: 'transparent'
                        }
                    }
                }];
            }
        },
        deactivated() {
            this.$destroy();
        }
    }
</script>
<style scoped>
    .legend-box {
        position: absolute;
        top: 0;
    }
</style>