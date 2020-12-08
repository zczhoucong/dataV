/*
* @desc:协调发展-自然资源业务组件
* @Author: lujing
* @Date: 2018-05-30 10:13:36
* @Last Modified by: lujing
* @Last Modified time: 2018-06-26 18:37:30
*/
<template>
    <section :id="chartId" :style="container" @click="bindEvent"></section>
</template>
<script>
    import eCharts from "echarts";
    import guid from "../../../../utils/guid";
    import {transfterLegPosition} from "../../../../utils/assist";
    import {getApiSource} from '@/utils/getApiData'
    export default {
        props: {
            width: {type: [Number, String], default: 450}, // 宽度
            height: {type: [Number, String], default: 350}, // 高度
            font: {
                // 字体
                type: String,
                default: "AgencyFBBold"
            },
            gridTop: {type: [Number, String], default: 30}, // 上边距
            gridBottom: {type: [Number, String], default: 45}, // 下边距
            gridLeft: {type: [Number, String], default: 40}, // 左边距
            gridRight: {type: [Number, String], default: 40}, // 右边距

            labelShow: {type: String | Boolean, default: true}, // 是否显示值标签
            labelPosit: {type: [Number, String], default: "top"}, // 值标签位置
            labelColor: {type: String, default: "#fff"}, // 值标签颜色
            labelSize: {type: [Number, String], default: 16}, // 值标签大小

            // 是否显示 x 轴、旋转角度、文字颜色、文字字号、文字粗细、刻度长度、坐标轴是否显示、坐标轴颜色
            xShow: {type: String | Boolean, default: true},
            rotate: {type: [Number, String], default: 0},
            xColor: {type: String, default: "#fff"},
            xFontWeight: {type: String, default: "normal"},
            xFontSize: {type: [Number, String], default: 12},

            yShow: {type: String | Boolean, default: true},
            yColor: {type: String, default: "#fff"},
            yFontWeight: {type: String, default: "normal"},
            yFontSize: {type: [Number, String], default: 12},
            yName: {type: String, default: ""},
            yMin: {type: [Number, String]},
            yMax: {type: [Number, String]},
            ySplitNumber: {type: [Number, String], default: 5},
            lineShow: {type: String | Boolean, default: true}, // 轴线是否显示
            tickShow: {type: String | Boolean, default: true}, // 刻度是否显示
            tickLength: {type: [Number, String], default: 5}, // 刻度的长度
            tickColor: {type: String, default: "#fff"}, // 刻度的颜色
            lineSeries: {
                // 系列数据
                type: Array,
                default: () => {
                    return [];
                }
            },
            dataType: {type: String, default: "WebApi"},
            apiUrl: {type: String},
            staticData: {
                type: Array,
                default: () => {
                    return [];
                }
            },
            x: {type: String, default: "year"},
            y: {type: String, default: "val"},
            s: {type: String, default: "name"},
            i: {type: String, default: "infoId"},
            t: {type: String, default: "name"}
        },
        data() {
            return {
                chartId: guid(),
                comName: "自然资源",
                colorNum: 1
            };
        },
        mounted() {
            this.$nextTick(() => {
                this.InitChart();
                this.$emit("count", {
                    count: 1,
                    data: [
                        {
                            title: this.comName,
                            xid: 1
                        }
                    ]
                });
            });
        },
        computed: {
            container() {
                return {
                    width: `${this.width}px`,
                    height: `${this.height}px`
                };
            }
        },
        methods: {
            bindEvent() {
                // 注册内部元素点击事件
                this.$emit("callback", {
                    type: "click",
                    data: {
                        title: this.comName,
                        xtype: 1
                    }
                });
            },
            async InitChart() {
                let dataJson = await getApiSource(
                    this.dataType,
                    this.apiUrl,
                    this.staticData
                );
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
                            ySeries.push(0);
                        } else {
                            ySeries.push(yData[index][this.y]);
                        }
                    });
                    yList.push(ySeries);
                });
                let seriesData = [];
                yList.forEach((i, index) => {
                    let series = {
                        name: seriesName[index],
                        type: "line",
                        label: {},
                        lineStyle: {
                            normal: {
                                color: this.lineSeries[index].color,
                                width: this.lineSeries[index].width,
                                type: this.lineSeries[index].type
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: this.lineSeries[index].color
                            }
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
                    seriesData.push(series);
                });
                let legendList = [];
                seriesName.forEach((item, index, arr) => {
                    legendList.push({name: item, icon: "circle"});
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
                    show: true,
                    lineStyle: {
                        color: "#2b78c2"
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
                        show: true,
                        textStyle: {
                            color: "white",
                            fontSize: 14
                        },
                        itemGap: 50,
                        orient: "horizontal",
                        bottom: 10,
                        itemWidth: 10,
                        itemHeight: 10,
                        left: "center",
                        data: legendList
                    },
                    xAxis: {
                        show: this.xShow,
                        type: "category",
                        data: xName,
                        boundaryGap: false,
                        axisLabel: {
                            show: this.xShow,
                            color: this.xColor,
                            fontWeight: this.xFontWeight,
                            fontSize: this.xFontSize
                        },
                        axisTick,
                        axisLine
                    },
                    yAxis: {
                        show: this.yShow,
                        type: "value",
                        name: this.yName,
                        nameTextStyle: {
                            color: this.xColor
                        },
                        splitNumber: this.ySplitNumber,
                        min: this.yMin,
                        max: this.yMax,
                        splitLine: {
                            lineStyle: {
                                color: "#142d64"
                            }
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
                if (document.getElementById(this.chartId)) {
                    let chart = eCharts.init(document.getElementById(this.chartId));
                    chart.setOption(option);
                }
            }
        },
        deactivated() {
            this.$destroy();
        }
    };
</script>