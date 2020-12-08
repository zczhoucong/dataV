<!--
说明：单值百分比饼图
作者：高春超
时间：2018-5-14 09:45:40
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
            fullColor: {type: String, default: 'rgba(176, 0, 251, 1)'}, // 填充底色
            startColor: {type: String, default: '#00cefc'}, // 圆环开始颜色
            endColor: {type: String, default: '#fff'}, // 圆环结束颜色

            // 标题及其样式
            showSubText:{type: String | Boolean, default: true},
            subText: {type: String,default:''}, // 标题文本
            subTextFont: {type: String, default: "AgencyFBBold"}, // 标题字体
            subTextColor: {type: String, default: '#fff'}, // 标题颜色
            subTextWeight: {type: String, default: 'normal'}, // 标题粗细
            subTextSize: {type: [Number, String], default: '14'}, // 标题大小
            // 数值及样式
            numberFont: {type: String, default: "AgencyFBBold"}, // 数值字体
            numberColor: {type: String, default: '#fff'}, // 数值颜色
            numberWeight: {type: String, default: 'normal'}, // 数值粗细
            numberSize: {type: [Number, String], default: '24'}, //数值大小
            percentUnit: {type: String, default: '%'}, // 百分比符号
            percentSize: {type: [Number, String], default: '14'}, //百分比大小
            percentColor: {type: String, default: '#fff'}, // 百分比颜色
            //


            innerR: {type: [Number, String], default: '50'}, // 内半径
            outerR: {type: [Number, String], default: '70'}, // 外半径
            dataType: {type: String, default: 'Static'},
            apiUrl: {type: String},
            staticData: {
                type: Array, default: () => {
                    return [{
                        "percent": 52
                    }]
                }
            },
            percent: {type: String, default: 'percent'}
        },
        data(){
            return {
                comName: '单值百分比饼图',
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
                let number = 0; // 单值显示百分比
                if (this.dataType === 'WebApi') {
                    // todo 根据传过来的地址获取数据
                } else {
                    if(dataJson[0]&&dataJson[0][this.percent]){
                        number=dataJson[0][this.percent];
                    }
                }
                let title={};
                if(this.showSubText){
                    title={
                        text: this.subText,
                        textStyle: {
                            fontWeight: this.subTextWeight,
                            color: this.subTextColor,
                            fontFamily: this.subTextFont,
                            fontSize: this.subTextSize
                        }
                    }
                }
                let animationEff=this.animationEffect()
                let option = {
                    title: {
                        ...title,
                        subtext: [`{a|${number}}`, `{b|${this.percentUnit}}`].join(""),
                        subtextStyle: {
                            fontWeight: this.numberWeight,
                            rich: {
                                a: {
                                    fontSize: this.numberSize,
                                    fontFamily: this.numberFont,
                                    color: this.numberColor,
                                },
                                b: {
                                    fontSize: this.percentSize,
                                    fontFamily: this.numberFont,
                                    color: this.percentColor,
                                    verticalAlign: 'bottom'
                                }
                            }
                        },
                        x: 'center',
                        y: 'center'
                    },
                    color: [this.fullColor],                    
                    series: [{
                        type: 'pie',
                        clockWise: true,
                        radius: [`${this.innerR}%`, `${this.outerR}%`],
                        itemStyle: {
                            normal: {
                                label: {
                                    show: false
                                },
                                labelLine: {
                                    show: false
                                }
                            }
                        },
                        hoverAnimation: false,
                        ...animationEff,
                        data: [{
                            value: number,
                            itemStyle: {
                                normal: {
                                    color: { // 完成的圆环的颜色
                                        type: 'linear',
                                        x: 0,
                                        y: 0,
                                        x2: 0,
                                        y2: 1,
                                        colorStops: [{
                                            offset: 0,
                                            color: this.startColor // 0% 处的颜色
                                        }, {
                                            offset: 1,
                                            color: this.endColor // 100% 处的颜色
                                        }]
                                    },
                                    label: {
                                        show: false
                                    },
                                    labelLine: {
                                        show: false
                                    }
                                }
                            }
                        }, {
                            value: (100-number)
                        }]
                    }]
                };                
                if (document.getElementById(this.chartId)) {
                    let chart = eCharts.init(document.getElementById(this.chartId));
                    chart.setOption(option);
                }
            },
        }
    }
</script>