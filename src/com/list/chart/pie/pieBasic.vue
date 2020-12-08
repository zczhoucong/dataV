<!--
说明：基本饼状图
作者：高春超
时间：2018-5-10 10:40:38
-->
<template>
    <section :id="chartId" :style="container" @click="bindEvent"></section>
</template>
<script>
    import eCharts from "echarts";
    import {transfterLegPosition} from '@/utils/assist'
    import {getApiSource} from '@/utils/getApiData'
    import pieMixins from '../mixins/pieMixins'
    export default {
        mixins:[pieMixins],
        props: {
            font: { // 字体
                type: String,
                default: "AgencyFBBold"
            },
            innerR: {type: [Number, String], default: '45'}, // 内半径
            outerR: {type: [Number, String], default: '70'}, // 外半径
            hover: {type: String | Boolean, default: false}, // 是否开启 hover 在扇区上的放大动画效果。
            roseType: {type: [String,Boolean], default: false}, // 是否显示南丁格尔图
            // 标签
            labelShow: {type: String | Boolean, default: true}, // 是否显示值标签
            labelPosit: {type: [Number, String], default: 'outside'}, // 值标签位置
            labelColor: {type: String, default: '#fff'}, // 值标签颜色
            labelSize: {type: [Number, String], default: 14}, // 值标签大小

            // 标签线
            lineShow: {type: String | Boolean, default: true},
            lineLength: {type: [Number, String], default: 10},
            lineLength2: {type: [Number, String], default: 20},

            // 图例
            legendShow: {type: String | Boolean, default: true},
            legendColor: {type: String, default: '#fff'},
            legPosition: {type: String, default: '顶部居中'},
            orient: {type: String, default: 'horizontal'},
            legendSize: {type: [Number, String], default: 12},
            legendGap: {type: [Number, String], default: 10},

            pieSeries: {  // 系列数据
                type: Array, default: () => {
                    return []
                }
            },

            dataType: {type: String, default: 'Static'},
            apiUrl: {type: String},
            staticData: {
                type: Array, default: () => {
                    return []
                }
            },
            x: {type: String, default: 'x'},
            y: {type: String, default: 'y'},
        },
        data(){
            return {
                comName: '基本饼状图',
                colorNum: 1
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
                let dataJson = await getApiSource(this.dataType,this.apiUrl,this.staticData);
                if(typeof dataJson === 'string') return;
                let xData = [];
                let series = [];
                dataJson.forEach(i => {
                    xData.push(i[this.x]);
                    series.push({
                        value: i[this.y],
                        name: i[this.x]
                    })
                })
                let animationEff=this.animationEffect()
                let option = {
                    tooltip: {
                        trigger: 'item',
                        formatter: "{b}: {c} ({d}%)"
                    },
                    color: this.initColorList(),
                    legend: {
                        show: this.legendShow,
                        textStyle: {
                            color: this.legendColor,
                            fontSize: this.legendSize,
                        },
                        ...transfterLegPosition(this.legPosition),
                        itemGap: this.legendGap,
                        itemWidth:14,
                        orient: this.orient,
                        data: xData
                    },
                    series: [
                        {
                            type: 'pie',
                            radius: [`${this.innerR}%`, `${this.outerR}%`],
                            hoverAnimation:this.hover,
                            roseType:this.roseType?"radius":false,
                            label: {
                                show: this.labelShow,
                                color: this.labelColor,
                                fontSize: this.labelSize,
                                position: this.labelPosit,
                                fontFamily: this.font,
                                formatter: "{b} \n {d}%"
                            },
                            labelLine: {
                                show: this.lineShow,
                                lineStyle: {
                                    color: this.labelColor,
                                },
                                length: this.lineLength,
                                length2: this.lineLength2
                            },
                            ...animationEff,
                            data: series
                        }
                    ]
                };
                if (document.getElementById(this.chartId)) {
                    let chart = eCharts.init(document.getElementById(this.chartId));
                    chart.setOption(option);
                }
            },
            initColorList(){
                let colorList = [];
                this.pieSeries.forEach(i => {
                    if (typeof i === 'object') {
                        const q = Math.floor(i[2]/ 90);
                        let val = (i[2] % 90 / 90).toFixed(3);
                        if(val==="0.000") val=1;
                        let xy={}
                        switch (q){
                            case 0:
                                xy={x:0,y:0,x2:val,y2:0};
                                break;
                            case 1:
                                xy={x:0,y:0,x2:0,y2:val};
                                break;
                            case 2:
                                xy={x:val,y:0,x2:0,y2:0};
                                break;
                            case 3:
                                xy={x:0,y:val,x2:0,y2:0};
                                break;
                        }
                        colorList.push({
                            type: 'linear',
                                ...xy,
                            colorStops: [{
                                offset: 0, color: i[0] // 0% 处的颜色
                            }, {
                                offset: 1, color: i[1] // 100% 处的颜色
                            }],
                            globalCoord: false
                        })
                    } else {
                        colorList.push(i);
                    }
                })
                return colorList;
            },
        },
        deactivated() {
            this.$destroy();
        }
    }
</script>