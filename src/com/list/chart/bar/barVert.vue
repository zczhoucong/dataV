<!--
说明：梯形柱图
作者：高春超
时间：2018年6月1日14:53:37
-->
<template>
    <section :id="chartId" :style="container" @click="bindEvent"></section>
</template>
<script>    
    import {getApiSource} from '@/utils/getApiData'
    import barMixins from '../mixins/barMixins'   
    export default {
        mixins:[barMixins],
        props: {           
            barWidth: {type: [Number, String], default: 12}, // 柱状宽度
            barRadius: {type: [Number, String], default: 0}, // 柱状宽度            
            // 是否显示 x 轴、旋转角度、文字颜色、文字字号、文字粗细、刻度长度、坐标轴是否显示、坐标轴颜色
            xShow: {type: String | Boolean, default: true},
            rotate: {type: [Number, String], default: 0},
            xColor: {type: String, default: '#fff'},
            xFontWeight: {type: String, default: 'normal'},
            xFontSize: {type: [Number, String], default: 12},
            yName: {type: String, default: ''},
            yMin: {type: [Number, String]},
            yMax: {type: [Number, String]},
            ySplitNumber: {type: [Number, String], default: 5},
            yShow: {type: String | Boolean, default: true},
            yColor: {type: String, default: '#fff'},
            yFontWeight: {type: String, default: 'normal'},
            yFontSize: {type: [Number, String], default: 12},
            barSeries: {  // 系列数据
                type: Array, default: () => {
                    return [{
                        name: '123',
                        color: '#c23531'
                    }, {
                        name: '系列2',
                        color: '#2f4554'
                    }, {
                        name: '系列3',
                        color: '#61a0a8'
                    }]
                }
            },
            staticData: {
                type: Array, default: () => {
                    return []
                }
            },
            x: {type: String, default: 'x'},
            y: {type: String, default: 'y'},
            s: {type: String, default: 's'},
        },
        data(){
            return {                
                comName: '梯形柱图',
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
            async GetDataSource(){
                let dataJson = await getApiSource(this.dataType,this.apiUrl,this.staticData);
                let seriesName = [];
                let xName = [];
                dataJson.forEach(i => {
                    // 系列名称
                    if (!seriesName.includes(i[this.s])) seriesName.push(i[this.s]);
                    // y轴名称
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
                            ySeries.push(typeof eval(yData[index][this.y]) ==='number'?yData[index][this.y]:0);
                        }
                    });
                    yList.push(ySeries)
                });
                const label = this.label();                
                let seriesData = [];
                let legName = this.barSeries.map(item => item.name);
                yList.forEach((i, index) => {
                    let series = {
                        name: legName[index],
                        type: 'bar',
                        zlevel:legName.length-index-1,
                        barWidth: this.barWidth,
                        itemStyle:{
                            barBorderRadius:this.barRadius,
                        },
                        label: label,
                        data: i
                    }
                    seriesData.push(series)
                });
                return {
                    xData:xName,
                    legName:legName,
                    seriesData:seriesData
                }
            },
            async autoReplayEvent(){
                if(this.chart){
                    const resultJson= await this.GetDataSource()
                    this.chart.setOption({
                        legend:{
                            data:resultJson.legName
                        },
                        xAxis:{
                            data: resultJson.xData
                        },
                        series:resultJson.seriesData
                    })                    
                }
            },       
            async InitChart(){
                if (this.barSeries.length === 0) return;
                const resultJson= await this.GetDataSource()
                let legend=this.legend();
                legend.data=resultJson.legName;
                 // 坐标轴刻度设置
                const axisTick = this.axisTick();
                const axisLine = this.axisLine();
                const grid=this.grid();
                let option = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    color: this.initColorList(),
                    legend: legend,
                    grid:grid,
                    xAxis: {
                        show: this.xShow,
                        type: 'category',
                        data: resultJson.xData,
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
                            color: this.yColor,
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
                    series: resultJson.seriesData
                };
                this.loadChart(option)
            },
            initColorList(){
                let colorList = [];
                this.barSeries.forEach(bar => {
                    const i = bar.color;
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