<!--
说明：双轴折线图
作者：高春超
时间：2018年6月5日11:58:22
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
            font: {type: String, default: "AgencyFBBold"}, // 字体
            gridTop: {type: [Number, String], default: 30}, // 上边距
            gridBottom: {type: [Number, String], default: 45}, // 下边距
            gridLeft: {type: [Number, String], default: 40}, // 左边距
            gridRight: {type: [Number, String], default: 40}, // 右边距

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
            boundaryGap: {type: String | Boolean, default: false}, // 留白
            xName:{type: String, default: ''}, // 单位

            yShow: {type: String | Boolean, default: true},
            yColor: {type: String, default: '#fff'},
            yFontWeight: {type: String, default: 'normal'},
            yFontSize: {type: [Number, String], default: 12},
            yName: {type: String, default: ''},
            yMin: {type: [Number, String]},
            yMax: {type: [Number, String]},
            ySplitNumber: {type: [Number, String], default: 5},

            zShow: {type: String | Boolean, default: true},
            zColor: {type: String, default: '#fff'},
            zFontWeight: {type: String, default: 'normal'},
            zFontSize: {type: [Number, String], default: 12},
            zName: {type: String, default: ''},
            zMin: {type: [Number, String]},
            zMax: {type: [Number, String]},
            zSplitNumber: {type: [Number, String], default: 5},

            lineShow: {type: String | Boolean, default: true}, // 轴线是否显示
            tickShow: {type: String | Boolean, default: true}, // 刻度是否显示
            tickLength: {type: [Number, String], default: 5}, // 刻度的长度
            tickColor: {type: String, default: '#fff'}, // 刻度的颜色

            //系列Y
            YLineName: {type: String, default: '系列Y'}, // 折线名称
            YLineColor: {type: String, default: '#2D7CCB'}, // 折线标签颜色
            YSmooth: {type: String | Boolean, default: true},
            YLineType: {type: String, default: 'solid'}, // 折线样式
            YLineWidth: {type: [Number, String], default: 1}, // 折线粗细
            YLineLabelShow: {type: String | Boolean, default: true}, // 是否显示值标签
            YLineLabelPosit: {type: [Number, String], default: 'top'}, // 值标签位置
            YLineLabelColor: {type: String, default: '#fff'}, // 值标签颜色
            YLineLabelSize: {type: [Number, String], default: 16}, // 值标签大小
            YShowSymbol: {type: String | Boolean, default: true},
            YSymbolSize: {type: [Number, String], default: 4},
            YAreaShow: {type: String | Boolean, default: false}, // 显示区域
            YAreaColor: {type: String, default: '#fff'}, // 区域颜色
            //系列Z
            ZLineName: {type: String, default: '系列Z'}, // 折线名称
            ZLineColor: {type: String, default: '#6CF5F2'}, // 折线标签颜色
            ZSmooth: {type: String | Boolean, default: true},
            ZLineType: {type: String, default: 'solid'}, // 折线样式
            ZLineWidth: {type: [Number, String], default: 1}, // 折线粗细
            ZLineLabelShow: {type: String | Boolean, default: true}, // 是否显示值标签
            ZLineLabelPosit: {type: [Number, String], default: 'top'}, // 值标签位置
            ZLineLabelColor: {type: String, default: '#fff'}, // 值标签颜色
            ZLineLabelSize: {type: [Number, String], default: 16}, // 值标签大小
            ZShowSymbol: {type: String | Boolean, default: true},
            ZSymbolSize: {type: [Number, String], default: 4},
            ZAreaShow: {type: String | Boolean, default: false}, // 显示区域
            ZAreaColor: {type: String, default: '#fff'}, // 区域颜色

            dataType: {type: String, default: 'Static'},
            apiUrl: {type: String},
            staticData: {
                type: Array, default: ()=>{return []}
            },
            x: {type: String, default: 'x'},
            y: {type: String, default: 'y'},
            z: {type: String, default: 'z'},
        },
        data(){
            return {
                chartId: guid(),
                comName: '双轴折线图',
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
                let dataJson = await getApiSource(this.dataType,this.apiUrl,this.staticData);
                let xData=[];
                let yData=[];
                let zData=[];
                dataJson.forEach(i=>{
                    xData.push(i[this.x]);
                    if (typeof eval(i[this.y]) != 'number') {
                        i[this.y] = 0;
                    }
                    yData.push(i[this.y]);
                    if (typeof eval(i[this.z]) != 'number') {
                        i[this.z] = 0;
                    }
                    zData.push(i[this.z]);
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
                        data: [this.YLineName,this.ZLineName]
                    },
                    color:[this.YLineColor,this.ZLineColor],
                    xAxis: {
                        show: this.xShow,
                        type: 'category',
                        data: xData,
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
                    yAxis: [{
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
                    },{
                        show: this.zShow,
                        type: 'value',
                        name: this.zName,
                        nameTextStyle: {
                            color: this.xColor,
                        },
                        splitNumber: this.zSplitNumber,
                        min: this.zMin,
                        max: this.zMax,
                        splitLine: {
                            show: false
                        },
                        axisLabel: {
                            show: this.zShow,
                            color: this.zColor,
                            fontWeight: this.zFontWeight,
                            fontSize: this.zFontSize
                        },
                        axisTick,
                        axisLine
                    }],
                    series: [{
                        type:'line',
                        name:this.YLineName,
                        label: {
                            show: this.YLineLabelShow,
                            position: this.YLineLabelPosit,
                            color: this.YLineLabelColor,
                            fontFamily: this.font,
                            fontSize: this.YLineLabelSize
                        },
                        lineStyle: {
                            width: this.YLineWidth,
                            type: this.YLineType
                        },
                        symbol:'circle',
                        showSymbol: this.YShowSymbol,
                        symbolSize: this.YSymbolSize,
                        smooth: this.YSmooth,
                        areaStyle:{
                            color: this.YAreaColor.indexOf('top') > 0?this.transfter(this.YAreaColor):this.YAreaColor,
                            opacity:this.YAreaShow?1:0
                        },
                        data: yData
                    },{
                        type:'line',
                        name:this.ZLineName,
                        label: {
                            show: this.ZLineLabelShow,
                            position: this.ZLineLabelPosit,
                            color: this.ZLineLabelColor,
                            fontFamily: this.font,
                            fontSize: this.ZLineLabelSize
                        },
                        lineStyle: {
                            width: this.ZLineWidth,
                            type: this.ZLineType
                        },
                        areaStyle:{
                            color: this.ZAreaColor.indexOf('top') > 0?this.transfter(this.ZAreaColor):this.ZAreaColor,
                            opacity:this.ZAreaShow?1:0
                        },
                        symbol:'circle',
                        showSymbol: this.ZShowSymbol,
                        symbolSize: this.ZSymbolSize,
                        smooth: this.ZSmooth,
                        yAxisIndex: 1,
                        data: zData
                    }]
                };
                if (document.getElementById(this.chartId)) {
                    let chart = eCharts.init(document.getElementById(this.chartId));
                    chart.setOption(option);
                }
            },
            transfter(barColor){
                const color = JSON.parse(barColor);
                const q = Math.floor(color.rotate / 90);
                const val = (color.rotate % 90 / 90).toFixed(3);
                let json={};
                switch (q) {
                    case 0:
                        json={x: 0, y: 0, x2: 1, y2: 0}
                        break;
                    case 1:
                        json={x: 0, y: 0, x2: 0, y2: 1}
                        break;
                    case 2:
                        json={x: 1, y: 0, x2: 0, y2: 0}
                        break;
                    case 3:
                        json={x: 0, y: 1, x2: 0, y2: 0}
                        break;
                }
                return {
                    type: 'linear',
                    ...json,
                    colorStops: [{
                        offset: 0, color: color.top // 0% 处的颜色
                    }, {
                        offset: 1, color: color.down // 100% 处的颜色
                    }],
                    globalCoord: false // 缺省为 false
                }
            },
        },
        deactivated() {
            this.$destroy();
        }
    }
</script>