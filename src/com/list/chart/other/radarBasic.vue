<!--
说明：雷达图
作者：高春超
时间：2018年5月11日10:19:47
-->
<template>
    <section :id="chartId" :style="container" @click="bindEvent"></section>
</template>
<script>
    import eCharts from "echarts";
    import guid from '../../../../utils/guid';
    import {transfterLegPosition} from '../../../../utils/assist'
    import {getApiSource} from '../../../../utils/getApiData'
    export default {
        props: {
            width: {type: [Number, String], default: 450}, // 宽度
            height: {type: [Number, String], default: 250}, // 高度
            font: { // 字体
                type: String,
                default: "AgencyFBBold"
            },
            color: {type: String, default: '#fff'},
            fontSize: {type: [Number, String], default: '12'},
            shape: {type: String, default: 'polygon'},
            newLine: {type: [Number, String], default: 0},
            radius: {type: [Number, String], default: '70'},
            xCenter: {type: [Number, String], default: '50'},
            yCenter: {type: [Number, String], default: '55'},
            splitLine: {type: String, default: 'rgba(238, 197, 102, 0.6)'},
            splitLineShow: {type: [Boolean, String], default: true},
            splitAreaShow: {type: [Boolean, String], default: false},
            splitArea: {
                type: [Array, String], default: function () {
                    return ['rgba(250,250,250,0.3)', 'rgba(200,200,200,0.3)']
                }
            },
            axisLineShow: {type: [Boolean, String], default: true},
            axisLine: {type: String, default: 'rgba(238, 197, 102, 0.6)'},
            // 图例
            legendShow: {type: String | Boolean, default: true},
            legendColor: {type: String, default: '#fff'},
            legPosition: {type: String, default: '顶部居中'},
            orient: {type: String, default: 'horizontal'},
            legendSize: {type: [Number, String], default: 12},
            legendGap: {type: [Number, String], default: 10},

            radarSeries: {  // 系列数据
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
            s: {type: String, default: 's'},
        },
        data(){
            return {
                chartId: guid(),
                comName: '基本雷达图'
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
                    width: `${this.width}px`,
                    height: `${this.height}px`,
                }
            },
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
                const newLine = this.newLine;
                if (this.radarSeries.length === 0) return;
                let dataJson = await getApiSource(this.dataType,this.apiUrl,this.staticData);
                let seriesName = [];
                let xName = [];
                dataJson.forEach(i => {
                    // 系列名称
                    if (!seriesName.includes(i[this.s])) seriesName.push(i[this.s]);
                    // x轴名称
                    if (!xName.includes(i[this.x])) xName.push(i[this.x]);
                });
                let yList = [];
                seriesName.forEach(i => {
                    let yData = dataJson.filter(j => {
                        return j[this.s] === i;
                    });
                    let ySeries = [];
                    xName.forEach(x => {
                        const index = yData.findIndex(y => y[this.x] === x);
                        if (index < 0) {
                            ySeries.push(0)
                        } else {
                            ySeries.push(yData[index][this.y]);
                        }
                    });
                    yList.push(ySeries)
                });
                const _indicator=[]
                xName.forEach(i=>{
                    let yData = dataJson.filter(j => {
                        return j[this.x] === i;
                    });
                    let max=0;
                    yData.forEach(x=>{
                        if(x[this.y]&&Math.floor(x[this.y])>max){
                            max=Math.floor(x[this.y])
                        }
                    })
                    _indicator.push({
                        name:i,
                        max:(max+20)
                    })
                })
                let seriesData = [];
                let _legColor=[];
                yList.forEach((i, index) => {
                    let series = {
                        name: this.radarSeries[index].name,
                        lineStyle: {
                            color: this.radarSeries[index].lineColor,
                            width:this.radarSeries[index].width
                        },
                        areaStyle: {
                            normal: {
                                color: this.radarSeries[index].areaColor
                            }
                        },
                        value:i
                    };
                    _legColor.push(this.radarSeries[index].lineColor)
                    seriesData.push(series)
                });
                let option = {
                    tooltip: {},
                    color:_legColor,
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
                        data: seriesName
                    },
                    radar: {
                        shape: this.shape,
                        name: {
                            textStyle: {
                                color: this.color,
                                fontFamily: this.font,
                                fontSize: this.fontSize
                            },
                            formatter: function (value) {
                                return value.substr(0, newLine) + '\n' + value.substr(newLine);
                            }
                        },
                        center:[`${this.xCenter}%`,`${this.yCenter}%`],
                        radius: `${this.radius}%`,
                        splitLine: {
                            show: this.splitLineShow,
                            lineStyle: {
                                color: this.splitLine,
                                type:'dashed'
                            }                            
                        },
                        splitArea: {
                            show: this.splitAreaShow,
                            areaStyle: {
                                color: this.splitArea
                            }
                        },
                        axisLine: {
                            show: this.axisLineShow,
                            lineStyle: {
                                color: this.axisLine
                            }
                        },
                        indicator:_indicator
                    },
                    series: [{
                        type: 'radar',
                        symbol: 'circle',
                        symbolSize: 0,
                        data: seriesData
                    }]
                };                     
                if (document.getElementById(this.chartId)) {
                    let chart = eCharts.init(document.getElementById(this.chartId));
                    chart.setOption(option);
                }
            },
        },
        deactivated() {
            this.$destroy();
        }
    }
</script>