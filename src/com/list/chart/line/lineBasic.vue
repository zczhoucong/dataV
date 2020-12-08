<!--
说明：基本折线图
作者：高春超
时间：2018年5月7日10:10:39
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
            height: {type: [Number, String], default: 350}, // 高度
            font: { // 字体
                type: String,
                default: "AgencyFBBold"
            },
            stack: {type: String | Boolean, default: false}, // 是否堆叠
            gridTop: {type: [Number, String], default: 30}, // 上边距
            gridBottom: {type: [Number, String], default: 45}, // 下边距
            gridLeft: {type: [Number, String], default: 40}, // 左边距
            gridRight: {type: [Number, String], default: 40}, // 右边距

            labelShow: {type: String | Boolean, default: false}, // 是否显示值标签
            labelPosit: {type: [Number, String], default: 'top'}, // 值标签位置
            labelColor: {type: String, default: '#fff'}, // 值标签颜色
            labelSize: {type: [Number, String], default: 16}, // 值标签大小
            // 图例
            legendShow: {type: String | Boolean, default: true},
            legendColor: {type: String, default: '#fff'},
            legPosition: {type: String, default: '顶部居中'},
            orient: {type: String, default: 'horizontal'},
            legendSize: {type: [Number, String], default: 12},
            legendGap: {type: [Number, String], default: 10},

            // 是否显示 x 轴、旋转角度、文字颜色、文字字号、文字粗细、刻度长度、坐标轴是否显示、坐标轴颜色
            xShow: {type: String | Boolean, default: true},
            rotate: {type: [Number, String], default: 0},
            xColor: {type: String, default: '#fff'},
            xFontWeight: {type: String, default: 'normal'},
            xFontSize: {type: [Number, String], default: 12},

            yShow: {type: String | Boolean, default: true},
            yColor: {type: String, default: '#fff'},
            yFontWeight: {type: String, default: 'normal'},
            yFontSize: {type: [Number, String], default: 12},
            yName: {type: String, default: ''},
            yMin: {type: [Number, String]},
            yMax: {type: [Number, String]},
            ySplitNumber: {type: [Number, String], default: 5},

            boundaryGap: {type: String | Boolean, default: true}, // 轴线是否显示
            lineShow: {type: String | Boolean, default: true}, // 轴线是否显示
            tickShow: {type: String | Boolean, default: true}, // 刻度是否显示
            tickLength: {type: [Number, String], default: 5}, // 刻度的长度
            tickColor: {type: String, default: '#fff'}, // 刻度的颜色

            lineSeries: {  // 系列数据
                type: Array,default:()=>{
                    return []
                }
            },

            dataType: {type: String, default: 'Static'},
            apiUrl: {type: String},
            staticData: {
                type: Array, default: []
            },
            x: {type: String, default: 'x'},
            y: {type: String, default: 'y'},
            s: {type: String, default: 's'},
        },
        data(){
            return {
                chartId: guid(),
                comName: '基本折线图',
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
                if (this.lineSeries.length === 0) return;
                let dataJson = await getApiSource(this.dataType,this.apiUrl,this.staticData);
//                dataJson.s : 系列名称
                let seriesName = [];
//                dataJson.x : x轴名称
                let xName = [];
//                dataJson.y : y轴值
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
                let seriesData = [];
                yList.forEach((i, index) => {
                    let series = {
                        name: this.lineSeries[index].name,
                        type: 'line',
                        color: this.lineSeries[index].color,
                        label: {
                            show: this.labelShow,
                            position: this.labelPosit,
                            color: this.labelColor,
                            fontFamily: this.font,
                            fontSize: this.labelSize,
                        },
                        lineStyle: {
                            color: this.lineSeries[index].color,
                            width: this.lineSeries[index].width,
                            type: this.lineSeries[index].type
                        },
                        symbol: this.lineSeries[index].symbolType,
                        showSymbol: this.lineSeries[index].showSymbol,
                        symbolSize: this.lineSeries[index].symbolSize,
                        smooth: this.lineSeries[index].smooth,
                        data: i
                    };
                    if (this.lineSeries[index].areaStyle.opacity) {
                        series.areaStyle = {
                            color: this.lineSeries[index].areaStyle.color
                        };
                    }
                    if (this.stack) {
                        series.stack = '总量';
                    }
                    seriesData.push(series)
                });

                // 坐标轴刻度设置
                let axisTick = {
                    show: this.tickShow,
                    length: this.tickLength,
                    lineStyle: {
                        color: this.tickColor
                    }
                };
                let axisLine = {
                    show: this.lineShow,
                    lineStyle: {
                        color: this.tickColor
                    }
                };

                let option = {
                    tooltip: {
                        trigger: 'axis',
                        textStyle: {
                            fontFamily: this.font
                        }
                    },
                    grid: {
                        left: this.gridLeft,
                        right: this.gridRight,
                        bottom: this.gridBottom,
                        top: this.gridTop,
                        containLabel: true
                    },
                    legend: {
                        show: this.legendShow,
                        textStyle: {
                            color: this.legendColor,
                            fontSize: this.legendSize,
                        },
                        ...transfterLegPosition(this.legPosition),
                        itemGap: this.legendGap,
                        orient: this.orient,
                        data: seriesName
                    },
                    xAxis: {
                        show: this.xShow,
                        type: 'category',
                        data: xName,
                        boundaryGap: this.boundaryGap,
                        axisLabel: {
                            show: this.xShow,
                            color: this.xColor,
                            fontWeight: this.xFontWeight,
                            fontSize: this.xFontSize,
                            rotate: this.rotate
                        },
                        axisTick,
                        axisLine
                    },
                    yAxis: {
                        show: this.yShow,
                        type: 'value',
                        name: this.yName,
                        nameTextStyle: {
                            color: this.xColor,
                        },
                        splitNumber: this.ySplitNumber,
                        min: this.yMin,
                        max: this.yMax,
                        splitLine: {
                            show: false
                        },
                        axisLabel: {
                            show: this.yShow,
                            color: this.yColor,
                            fontWeight: this.yFontWeight,
                            fontSize: this.yFontSize
                        },
                        axisTick,
                        axisLine
                    },
                    series: seriesData
                };
                ;
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