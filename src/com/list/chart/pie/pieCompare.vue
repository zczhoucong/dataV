<!--
说明：标注对比饼图
作者：高春超
时间：2018年6月6日15:05:18
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
            font: {type: String, default: "AgencyFBBold"},// 字体
            innerR: {type: [Number, String], default: '60'}, // 半径
            angle: {type: [Number, String], default: '0'}, // 角度偏移
            borderColor: {type: String, default: '#fff'}, // 装饰颜色
            // 标签
            labelColor: {type: String, default: '#fff'}, // 值标签颜色
            labelSize: {type: [Number, String], default: 16}, // 值标签大小
            labelWeight: {type: String, default: 'normal'},
            pointNum: {type: [Number, String], default: 0}, // 小数点位数
            valueShow: {type: String | Boolean, default: false}, // 是否显示真实数值


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
            y: {type: String, default: 'y'}
        },
        data(){
            return {                
                comName: '标注对比饼图'
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
                //根据数据源类型获取不同数据
                const basciData = await getApiSource(this.dataType, this.apiUrl, this.staticData);
                if (basciData.length === 0) return;
                let legendData = [];
                let seriesData = [];
                basciData.forEach(i => {
                    legendData.push(i[this.x]);
                    seriesData.push({value: i[this.y] === '' ? 0 : i[this.y], name: i[this.x]})
                })
                let animationEff=this.animationEffect()
                const option = {
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
                        data: legendData
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{b} : {c} ({d}%)"
                    },
                    series: [{
                        type: 'pie',
                        radius: `${this.innerR}%`,
                        z: 0,
                        animation: false,
                        hoverAnimation: false,
                        ...animationEff,
                        itemStyle: {borderWidth: 5, borderColor: this.borderColor, color: "rgba(0,0,0,0)"},
                        data: [100]
                    }, {
                        type: 'pie',
                        radius: `${this.innerR}%`,
                        hoverAnimation: false,
                        animation: false,
                        startAngle: this.angle,
                        ...animationEff,
                        label: {
                            position: 'inside',
                            color: this.labelColor,
                            fontSize: this.labelSize,
                            fontFamily: this.font,
                            fontWeight: this.labelWeight,
                            formatter: params => {
                                if(params.value===0) return '';
                                if (this.valueShow) {
                                    return parseFloat(params.value).toFixed(eval(this.pointNum))
                                } else {
                                    return params.percent.toFixed(eval(this.pointNum)) + '%'
                                }
                            }
                        },
                        labelLine: {show: false},
                        z: 1,
                        data: seriesData
                    }, {
                        type: 'pie',
                        radius: 5,
                        startAngle: 0,
                        animation: false,
                        hoverAnimation: false,
                        tooltip: {show: false},
                        label: {show: false},
                        labelLine: {show: false},
                        ...animationEff,
                        data: [
                            {value: 100, itemStyle: {color: this.borderColor}},
                        ],
                        z: 2
                    }]
                }
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