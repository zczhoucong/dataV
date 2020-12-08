<!--
说明：金字塔图
作者：高春超
时间：2018年6月7日10:58:10
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
            legendShow: {type: String | Boolean, default: true},
            legendColor: {type: String, default: '#fff'},
            legPosition: {type: String, default: '顶部居中'},
            orient: {type: String, default: 'horizontal'},
            legendSize: {type: [Number, String], default: 12},
            legendGap: {type: [Number, String], default: 10},

            // 全局
            font: {type: String, default: "Microsoft Yahei"},
            sort: {type: String, default: "ascending"}, // 数据排序
            funnelAlign: {type: String, default: "center"}, // 对齐方向
            gap: {type: [Number, String], default: 0}, // 图形间距
            min: {type: [Number, String], default: 0},
            max: {type: [Number, String], default: 'auto'},

            gridTop: {type: [Number, String], default: 10}, // 上边距
            gridBottom: {type: [Number, String], default: 10}, // 下边距
            gridLeft: {type: [Number, String], default: 5}, // 左边距
            gridRight: {type: [Number, String], default: 5}, // 右边距
            labelShow: {type: String | Boolean, default: true}, // 是否显示值标签
            labelPosit: {type: [Number, String], default: 'center'}, // 标签位置
            labelColor: {type: String, default: '#fff'}, // 文字标签颜色
            labelSize: {type: [Number, String], default: 14}, // 文字标签大小
            labelHeight: {type: [Number, String], default: 20}, // 文字标签高度
            percentColor: {type: String, default: '#fff'}, // 百分比颜色
            percentSize: {type: [Number, String], default: 14}, // 百分比大小
            percentShow: {type: String | Boolean, default: false}, // 是否显示百分比
            valShow: {type: String | Boolean, default: false}, // 是否显示真实值
            lineShow: {type: String | Boolean, default: false}, // 是否显示引导线
            lineColor: {type: String, default: '#fff'}, // 引导线颜色
            lineLength: {type: [Number, String], default: 16}, // 引导线长度
            lineWidth: {type: [Number, String], default: 1}, // 引导线宽度
            lineType: {type: String, default: 'solid'}, // 引导线类型
            borderColor: {type: String, default: '#fff'}, // 描边颜色
            borderWidth: {type: [Number, String], default: 2}, // 描边宽度
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
                chartId: guid(),
                comName: '金字塔图',
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
                    width: `${this.width.toString().replace('px', '')}px`,
                    height: `${this.height.toString().replace('px', '')}px`,
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
                let xData = [];
                let yData = [];
                let dataJson = await getApiSource(this.dataType, this.apiUrl, this.staticData);
                if (dataJson.length === 0) return;
                let max = 0;
                dataJson.forEach(i => {
                    xData.push(i[this.x]);
                    if (typeof eval(i[this.y]) != 'number') {
                        i[this.y] = 0;
                    }
                    if (max < eval(i[this.y])) {
                        max = eval(i[this.y]);
                    }
                    yData.push({
                        value: i[this.y],
                        name: i[this.x]
                    });
                });
                let formatter = [];
                if (this.labelShow) {
                    formatter.push('{a|{b}}')
                }

                if (this.valShow) {
                    formatter.push('{b|{c}}')
                } else {
                    if (this.percentShow) {
                        formatter.push('{b|{d}}%')
                    }
                }
                formatter = formatter.join('\n');
                let option = {
                    color: this.initColorList(),
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
                        data: xData
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{b} : {c} ({d}%)",
                        textStyle: {
                            fontFamily: this.font
                        }
                    },
                    series: {
                        type: 'funnel',
                        left: `${this.gridLeft}%`,
                        top: `${this.gridTop}%`,
                        bottom: `${this.gridBottom}%`,
                        right: `${this.gridRight}%`,
                        sort: this.sort,
                        min: this.min,
                        max: this.max === 'auto' ? max : this.max,
                        funnelAlign: this.funnelAlign,
                        gap: this.gap,
                        label: {
                            normal: {
                                show: this.labelShow,
                                position: this.labelPosit,
                                fontWeight: 'bolder',
                                fontFamily: this.font,
                                fontSize: 20,
                                formatter: formatter,
                                rich: {
                                    a: {
                                        color: this.labelColor,
                                        fontSize: this.labelSize,
                                        lineHeight: this.labelHeight
                                    },
                                    b: {
                                        color: this.percentColor,
                                        fontSize: this.percentSize,
                                    }
                                }
                            }
                        },
                        labelLine: {
                            show: this.lineShow,
                            length: this.lineLength,
                            lineStyle: {
                                color: this.lineColor,
                                width: this.lineWidth,
                                type: this.lineType
                            }
                        },
                        itemStyle: {
                            borderColor: this.borderColor,
                            borderWidth: this.borderWidth
                        },
                        data: yData
                    }
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
            }
        },
        deactivated() {
            this.$destroy();
        }
    }
</script>