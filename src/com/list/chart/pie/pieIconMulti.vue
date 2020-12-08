<!--
说明：多环带图饼图
作者：高春超
时间：2018-5-24 09:54:35
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
            numSize: {type: [Number, String], default: 16}, // 数字大小
            lableWidth: {type: [Number, String], default: 50}, // 文本宽度
            lableColor: {type: String, default: '#fff'}, // 文字颜色
            percentColor: {type: String, default: '#fff'}, // 百分比颜色
            numFont: {type: String, default: "AgencyFBBold"},// 字体
            holderColor: {type: String, default: 'rgba(255,255,255,.2)'}, // 底环颜色
            holderWidth: {type: [Number, String], default: 1}, // 底环粗细
            imgSize: {type: [Number, String], default: 30}, // 图片大小
            lableSize: {type: [Number, String], default: 18}, // 文字大小
            percentSize: {type: [Number, String], default: 18}, // 百分号大小
            imgSource: {type: String, default: 'https://gw.alicdn.com/tps/TB1vX0sPXXXXXXtXpXXXXXXXXXX-140-140.png'}, // 图片来源
            legShow: {type: [Boolean, String], default: true}, // 图片大小
            legX: {type: [Number, String], default: 70}, // 图例X轴位置
            legY: {type: [Number, String], default: 40}, // 图例Y轴位置
            orient: {type: String, default: "vertical"},// 图例方向
            centerX: {type: [Number, String], default: 50}, // 饼图中心位置
            centerY: {type: [Number, String], default: 50}, // 饼图中心位置
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
            x: {type: String, default: 'name'},
            y: {type: String, default: 'val'},
            s: {type: String, default: 'year'},
        },
        data(){
            return {
                comName: '多环带图饼图'
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
            legX2(){
                let tempx = this.legX;
                if(tempx=='center'||tempx=='left'||tempx=='right'||tempx=='bottom'){
                    return tempx;
                }else{
                   return tempx+'%'
                }

            },
            legY2(){
                let tempy = this.legY;
                 if(tempy=='middle'||tempy=='left'||tempy=='right'||tempy=='bottom'){
                    return tempy;
                }else{
                   return tempy+'%'
                }

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
            async InitChart(){
                //根据数据源类型获取不同数据
                const basciData =await getApiSource(this.dataType,this.apiUrl,this.staticData);
                if (basciData.length === 0) return;
                const pieSeries = JSON.parse(JSON.stringify(this.pieSeries));
                pieSeries.forEach((i, index) => {
                    Object.assign(i, basciData[index])
                })
                // 底图样式
                const holderStyle = {
                    normal: {
                        label: {show: false},
                        labelLine: {show: false},
                        borderColor: this.holderColor,
                        borderWidth: this.holderWidth
                    }
                };
                let legendData = []; // 图例数据
                let colors = []; // 图表颜色集合
                let legendRich = []; // 图例个性化样式集合
                let series = []; // 系列数据集合
                pieSeries.forEach((i, index) => {
                    colors.push(i.color);
                    const leg = {
                        color: i.color,
                        fontSize: this.numSize,
                        fontFamily: this.numFont,
                    };
                    legendRich[`b${index}`] = leg;
                    legendData.push({
                        name: `${i[this.s]}`,
                        value: i[this.y]
                    });
                    const serie = {
                        name: `${i[this.s]}`,
                        type: 'pie',
                        clockWise: true, //顺时加载
                        center: [`${this.centerX}%`, `${this.centerY}%`],
                        hoverAnimation: false, //鼠标移入变大
                        hoverOffset: 0,
                        radius: [`${i.radius * 2 - eval(this.holderWidth)}`, `${i.radius * 2}`],
                        itemStyle: {
                            normal: {
                                label: {
                                    show: false
                                },
                                labelLine: {
                                    show: false
                                },
                                borderWidth: i.borderWidth,
                                borderColor: i.color,
                            }
                        },
                        data: [{
                            value: i[this.y]
                        }, {
                            value: (100 - i[this.y]) > 0 ? (100 - i[this.y]) : 0,
                            itemStyle: holderStyle
                        }]
                    };
                    if (index === 0) {
                        Object.assign(serie.data[0], {
                            label: {
                                show: true,
                                position: 'center',
                                formatter: '{a|}',
                                rich: {
                                    a: {
                                        width: this.imgSize,
                                        backgroundColor: {
                                            image: this.imgSource,
                                        },
                                        height: this.imgSize
                                    }
                                }
                            }
                        })
                    }
                    series.push(serie)
                });
                const option = {
                    color: colors,
                    legend: {
                        show: this.legShow,
                        left: `${this.legX2}`,
                        top: `${this.legY2}`,
                        icon: 'circle',
                        itemWidth: 5,
                        itemHeight: 5,
                        formatter: function (name) {
                            const idx = legendData.findIndex(i => i.name === name);
                            return `{a|${name}}{b${idx}|${legendData[idx].value}}{c|%}`;
                        },
                        textStyle: {
                            rich: {
                                a: {
                                    width: this.lableWidth,
                                    color: this.lableColor,
                                    fontSize: this.lableSize,
                                    fontFamily: this.numFont
                                },
                                ...legendRich,
                                c: {
                                    color: this.percentColor,
                                    fontSize: this.percentSize,
                                    fontFamily: this.numFont
                                }
                            }
                        },
                        data: legendData,
                        selectedMode: false,
                        orient: this.orient
                    },
                    series: series
                }                
                if (document.getElementById(this.chartId)) {
                    let chart = eCharts.init(document.getElementById(this.chartId));
                    chart.setOption(option);
                }
            }
        },
        deactivated() {
            this.$destroy();
        }
    }
</script>