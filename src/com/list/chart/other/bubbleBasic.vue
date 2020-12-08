/**
 * @Author: 高春超
 * @description: 
 * @param {type} 
 * @return: 
 * @Date: 2019-03-18 08:59:40
 */
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
            splitColor:{type:String,default:'rgba(20,46,101,.2)'},
            width: {type: [Number, String], default: 450}, // 宽度
            height: {type: [Number, String], default: 250}, // 高度
            font: { // 字体
                type: String,
                default: "AgencyFBBold"
            },
            stack: {type: String | Boolean, default: false}, // 是否堆叠
            gridTop: {type: [Number, String], default: 30}, // 上边距
            gridBottom: {type: [Number, String], default: 30}, // 下边距
            gridLeft: {type: [Number, String], default: 30}, // 左边距
            gridRight: {type: [Number, String], default: 30}, // 右边距

            labelShow: {type: String | Boolean, default: false}, // 是否显示值标签
            labelPosit: {type: [Number, String], default: 'top'}, // 值标签位置
            labelColor: {type: String, default: '#fff'}, // 值标签颜色
            labelSize: {type: [Number, String], default: 12}, // 值标签大小
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

            lineShow: {type: String | Boolean, default: true}, // 轴线是否显示
            tickShow: {type: String | Boolean, default: true}, // 刻度是否显示
            tickLength: {type: [Number, String], default: 5}, // 刻度的长度
            tickColor: {type: String, default: '#fff'}, // 刻度的颜色

            barSeries: {  // 系列数据
                type: Array,default:()=>{
                    // return [{"name":"1","color":"#65F5F3"}]
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
                comName: '基本气泡图',
                colorNum: 1
            }
        },
        mounted(){
            this.$nextTick(() => {
                    this.InitChart();
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
                if (this.barSeries==null) return;
                let dataJson = await getApiSource(this.dataType,this.apiUrl,this.staticData);
                //dataJson.s : 系列名称
                let seriesName = [];
                //dataJson.x : x轴名称
                let xName = [];
                //dataJson.y : y轴值
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
                    let yData = i.map((item , index , arr)=>{
                               return item
                    })
                    let series = {
                        name: this.barSeries[index].name,
                        type: 'scatter',
                        symbolSize: params => {
                            let sum = 0;
                            i.forEach(item => {
                                sum += item
                            })
                            let nowWidth = this.width
                            return params / sum * nowWidth / 3
                        },
                        
                        data: yData,                        
                    };

                    seriesData.push(series)
                });
                // 坐标轴刻度设置
                let axisTick = {
                    show: this.tickShow,
                    length: this.tickLength,
                    lineStyle: {
                        color: this.tickColor
                    },
                    alignWithLabel: true,
                };
                let axisLine = {
                    show: this.lineShow,
                    lineStyle: {
                        color: this.tickColor
                    }
                };

                let option = {
                    tooltip: {
                        textStyle: {
                            fontFamily: this.font
                        },
                       
                    },
                    color: this.initColorList(),
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
                        itemWidth: 15,
                        orient: this.orient,
                        data: seriesData
                    },
                    xAxis: {
                        show: this.xShow,
                        type: 'category',
                        data: xName,
                        boundaryGap: true,
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
                        type: 'value',
                        name: this.yName,
                        nameTextStyle: {
                            color: this.xColor,
                        },
                        splitNumber: this.ySplitNumber,
                        min: this.yMin,
                        max: this.yMax,
                        splitLine: {
                            show: true,
                            lineStyle: {
                            color: this.splitColor
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
                ;
                if (document.getElementById(this.chartId)) {
                    let chart = eCharts.init(document.getElementById(this.chartId));
                    chart.setOption(option);
                }
            },
            initColorList(){
                let colorList = [];
                this.barSeries.forEach(bubble => {
                    const i = bubble.color;
                    if (typeof i === 'object') {
                        const q = Math.floor(i[2] / 90);
                        let val = (i[2] % 90 / 90).toFixed(3);
                        if (val === "0.000") val = 1;
                        let xy = {}
                        switch (q) {
                            case 0:
                                xy = {x: 0, y: 0, x2: val, y2: 0};
                                break;
                            case 1:
                                xy = {x: 0, y: 0, x2: 0, y2: val};
                                break;
                            case 2:
                                xy = {x: val, y: 0, x2: 0, y2: 0};
                                break;
                            case 3:
                                xy = {x: 0, y: val, x2: 0, y2: 0};
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