<!--
说明：基本水平柱状图
作者：高春超
时间：2018年5月28日15:46:37
-->
<template>
    <section :id="chartId" :style="container" @click="bindEvent"></section>
</template>
<script>    
    import barMixins from '../mixins/barMixins' 
    import {getApiSource} from '@/utils/getApiData'
    import {transfterColor} from '@/utils/assist'
    export default {
        mixins:[barMixins],
        props: {            
            barWidth: {type: [Number, String], default: 30}, // 柱状宽度
            barBack: {type: String, default: 'rgba(255,255,255,0.5)'}, // 柱子背景色
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
            xName: {type: String, default: ''},
            xMin: {type: [Number, String]},
            xMax: {type: [Number, String]},
            xSplitNumber: {type: [Number, String], default: 5},

            barNumbers: {type: String, default: '单色'},
            barColor1: {type: [Array, String]},
            barColor2: {type: [Object, String]},
            staticData: {type: Array, default: []},
            x: {type: String, default: 'x'},
            y: {type: String, default: 'y'},
        },
        data(){
            return {
                comName: '水平基本柱状图',
                chart:null,
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
        watch:{
            apiUrl(){
                this.InitChart();
            },
            staticData(){
                this.InitChart();
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
            async GetDataSource(){
                let xData = [];
                let yData = [];
                let max = 0;
                let dataJson = await getApiSource(this.dataType, this.apiUrl, this.staticData);
                dataJson.forEach(i => {
                    xData.push(i[this.x]);
                    if (i[this.y] > max) {
                        max = i[this.y];
                    }
                    if (typeof eval(i[this.y]) != 'number') {
                        i[this.y] = 0;
                    }
                    yData.push(i[this.y]);
                });
                let maxArr = [...yData];
                maxArr.fill(max);
                return {
                    xData:xData,
                    yData:yData,
                    maxArr:maxArr
                }
            },
            async autoReplayEvent(){
                if(this.chart){
                    const resultJson= await this.GetDataSource()
                    this.chart.setOption({
                        yAxis:{
                            data: resultJson.xData,
                        },
                        series:[{
                            data: resultJson.maxArr
                        },{
                            data: resultJson.yData
                        }]
                    })                    
                }
            },
            async InitChart(){
                let resultJson= await this.GetDataSource()
                // 坐标轴刻度设置
                const axisTick = this.axisTick();
                const axisLine = this.axisLine();
                const label = this.label();
                const grid=this.grid();
                // 判断是单色还是双色，判断是否是渐变色
                if (this.barNumbers === '单色') {
                    this.colorNum = 1;
                } else {
                    this.colorNum = 2;
                }
                let option = {
                    tooltip: {
                        textStyle: {
                            fontFamily: this.font
                        }
                    },
                    grid:grid,
                    yAxis: {
                        show: this.yShow,
                        type: 'category',
                        data: resultJson.xData,
                        axisLabel: {
                            show: this.yShow,
                            color: this.yColor,
                            fontWeight: this.yFontWeight,
                            fontSize: this.yFontSize
                        },
                        axisTick,
                        axisLine
                    },
                    xAxis: {
                        show: this.xShow,
                        type: 'value',
                        name: this.xName,
                        nameTextStyle: {
                            color: this.xColor,
                        },
                        splitNumber: this.xSplitNumber,
                        min: this.xMin,
                        max: this.xMax,
                        splitLine: {
                            show: false
                        },
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
                    series: [{
                        type: 'bar',
                        itemStyle: {
                            normal: {color: this.barBack}
                        },
                        barGap: '-100%',
                        barWidth: this.barWidth,
                        tooltip:{
                            show:false
                        },
                        data: resultJson.maxArr
                    }, {
                        type: 'bar',
                        label:label,
                        itemStyle: {
                            normal: {
                                color: params => {
                                    if (this.barColor1.split('#').length>2) {
                                        const colors=this.barColor1.split(',');
                                        return colors[params.dataIndex % colors.length]
                                    } else {
                                        if (params.dataIndex % this.colorNum === 0) {
                                            if (this.barColor1.indexOf('top') > 0) {
                                                return transfterColor(this.barColor1)
                                            } else {
                                                return this.barColor1;
                                            }
                                        } else {
                                            if (this.barColor2.indexOf('top') > 0) {
                                                return transfterColor(this.barColor2)
                                            } else {
                                                return this.barColor2;
                                            }
                                        }
                                    }
                                }
                            },
                            emphasis: {
                                shadowBlur: 20,
                                shadowOffsetX: 0,
                                shadowColor: "rgba(255, 255, 255, 1)"
                            }
                        },
                        barWidth: this.barWidth,
                        z: 10,
                        data: resultJson.yData
                    }
                    ]
                };
                this.loadChart(option)
            }
        }
    }
</script>