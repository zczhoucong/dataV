<!--
说明：折线柱图
作者：高春超
时间：2018年6月4日13:52:13
-->
<template>
    <section :id="chartId" :style="container" @click="bindEvent"></section>
</template>
<script>    
    import barMixins from '../mixins/barMixins'
    import {getApiSource} from '@/utils/getApiData'
    export default{
        mixins:[barMixins],
        props: {                      
            // 柱子
            barName: {type: String, default: '柱子'}, // 柱子名称
            barColor: {type: String, default: '#6CF5F2'}, // 柱子标签颜色
            barWidth: {type: [Number, String], default: 20}, // 柱宽度
            barBack: {type: String, default: 'rgba(255,255,255,0.5)'}, // 柱子背景色
            barLabelShow: {type: String | Boolean, default: true}, // 是否显示值标签
            barLabelPosit: {type: [Number, String], default: 'top'}, // 值标签位置
            barLabelColor: {type: String, default: '#fff'}, // 值标签颜色
            barLabelSize: {type: [Number, String], default: 16}, // 值标签大小

            //折线
            lineName: {type: String, default: '折线'}, // 折线名称
            lineColor: {type: String, default: '#2D7CCB'}, // 折线标签颜色
            smooth: {type: String | Boolean, default: true},
            lineType: {type: String, default: 'solid'}, // 折线样式
            lineWidth: {type: [Number, String], default: 1}, // 折线粗细
            lineLabelShow: {type: String | Boolean, default: true}, // 是否显示值标签
            lineLabelPosit: {type: [Number, String], default: 'top'}, // 值标签位置
            lineLabelColor: {type: String, default: '#fff'}, // 值标签颜色
            lineLabelSize: {type: [Number, String], default: 16}, // 值标签大小
            showSymbol: {type: String | Boolean, default: true},
            symbolSize: {type: [Number, String], default: 4},
            // X轴
            xShow: {type: String | Boolean, default: true},
            rotate: {type: [Number, String], default: 0},
            xFontSize: {type: [Number, String], default: 12},
            xColor: {type: String, default: '#fff'},
            xFontWeight: {type: String, default: 'normal'},
            // Y轴
            yShow: {type: String | Boolean, default: true},
            yColor: {type: String, default: '#fff'},
            yFontWeight: {type: String, default: 'normal'},
            yFontSize: {type: [Number, String], default: 12},
            yName: {type: String, default: ''},
            yMin: {type: [Number, String]},
            yMax: {type: [Number, String]},
            ySplitNumber: {type: [Number, String], default: 5},
            // Z轴
            zShow: {type: String | Boolean, default: true},
            zColor: {type: String, default: '#fff'},
            zFontWeight: {type: String, default: 'normal'},
            zFontSize: {type: [Number, String], default: 12},
            zName: {type: String, default: ''},
            zMin: {type: [Number, String]},
            zMax: {type: [Number, String]},
            zSplitNumber: {type: [Number, String], default: 5},
            
            staticData: {
                type: Array, default: () => {
                    return [
                    ]
                }
            },
            x: {type: String, default: 'x'},
            y: {type: String, default: 'y'},
            z: {type: String, default: 'z'}
        },
        data(){
            return {
                comName: '折线柱图',
                colorNum: 1,
                legendData: []
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
            async GetDataSource(){
                let dataJson = await getApiSource(this.dataType, this.apiUrl, this.staticData);
                let xData=[];
                let barData=[];
                let lineData=[];
                let max=0;
                dataJson.forEach(i=>{
                    xData.push(i[this.x]);
                    if (i[this.y] > max) {
                        max = i[this.y];
                    }
                    if (typeof eval(i[this.y]) != 'number') {
                        i[this.y] = 0;
                    }
                    barData.push(i[this.y]);
                    lineData.push(i[this.z]);
                });
                let maxArr = [...barData];
                maxArr.fill(max);
                return {
                    xData:xData,
                    maxArr:maxArr,
                    barData:barData,
                    lineData:lineData
                }
            },            
            async autoReplayEvent(){
                if(this.chart){
                    const resultJson= await this.GetDataSource()
                    this.chart.setOption({
                        xAxis:{
                            data: resultJson.xData,
                        },
                        series:[{
                            data: resultJson.maxArr
                        },{
                            data:resultJson.barData
                        },{
                            data:resultJson.lineData
                        }]
                    })                    
                }
            },   
            async InitChart(){
                const resultJson= await this.GetDataSource()
                let legend=this.legend();
                legend.data=[this.barName,this.lineName];
                
                // 坐标轴刻度设置
                const axisTick = this.axisTick();
                const axisLine = this.axisLine();                
                const grid=this.grid();
                const option = {
                    tooltip: {
                        trigger: 'axis',
                        textStyle: {
                            fontFamily: this.font
                        }
                    },
                    color:[this.barColor,this.lineColor],
                    grid:grid,
                    legend:legend,
                    xAxis:{
                        show: this.xShow,
                        type: 'category',
                        data: resultJson.xData,
                        axisLabel: {
                            show: this.xShow,
                            color: this.xColor,
                            fontWeight: this.xFontWeight,
                            fontSize: this.xFontSize,
                            rotate:this.rotate
                        },
                        axisTick,
                        axisLine
                    },
                    yAxis:[{
                        show: this.yShow,
                        type: 'value',
                        name:this.yName,
                        nameTextStyle: {color: this.yColor},
                        splitNumber: this.ySplitNumber,
                        min: this.yMin,
                        max: this.yMax,
                        splitLine: {show: false},
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
                        name:this.zName,
                        nameTextStyle: {color: this.zColor},
                        splitNumber: this.zSplitNumber,
                        min: this.zMin,
                        max: this.zMax,
                        splitLine: {show: false},
                        axisLabel: {
                            show: this.zShow,
                            color: this.zColor,
                            fontWeight: this.zFontWeight,
                            fontSize: this.zFontSize
                        },
                        axisTick,
                        axisLine
                    }],
                    series:[{
                        type: 'bar',
                        itemStyle: {
                            normal: {color: this.barBack}
                        },
                        barGap: '-100%',
                        tooltip:{show:false},
                        barWidth: this.barWidth,
                        data: resultJson.maxArr
                    },{
                        name:this.barName,
                        type:'bar',
                        barWidth: this.barWidth,
                        label: {
                            show: this.barLabelShow,
                            position: this.barLabelPosit,
                            color: this.barLabelColor,
                            fontFamily: this.font,
                            fontSize: this.barLabelSize,
                            rotate: this.rotate
                        },
                        data:resultJson.barData
                    },{
                        name:this.lineName,
                        type:'line',
                        yAxisIndex: 1,
                        data:resultJson.lineData,
                        label: {
                            show: this.lineLabelShow,
                            position: this.lineLabelPosit,
                            color: this.lineLabelColor,
                            fontFamily: this.font,
                            fontSize: this.lineLabelSize
                        },
                        lineStyle: {
                            width: this.lineWidth,
                            type: this.lineType
                        },
                        symbol:'circle',
                        showSymbol:this.showSymbol,
                        symbolSize:this.symbolSize,
                        smooth:this.smooth
                    }]
                };
                this.loadChart(option)
            },
        }
    }
</script>