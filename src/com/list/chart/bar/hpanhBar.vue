<!--
说明：水平双向柱状图
作者：高春超
时间：2018年5月18日09:55:12
-->
<template>
    <section :id="chartId" :style="container" @click="bindEvent"></section>
</template>
<script>    
    import barMixins from '../mixins/barMixins'
    import {getBoundary} from '@/utils/assist'
    import {getApiSource} from '@/utils/getApiData'
    export default {
        mixins:[barMixins],
        props: {           
            barWidth: {type: [Number, String], default: 20}, // 柱状宽度           
            // 是否显示 x 轴、旋转角度、文字颜色、文字字号、文字粗细、刻度长度、坐标轴是否显示、坐标轴颜色
            xShow: {type: String | Boolean, default: true},
            rotate: {type: [Number, String], default: 0},
            xColor: {type: String, default: '#fff'},
            xFontWeight: {type: String, default: 'normal'},
            xFontSize: {type: [Number, String], default: 12},
            axisPosition: { type: String, default: "top"}, // 轴线位置
            xName: {type: String, default: ''},
            xMin: {type: [Number, String]},
            xSplitNumber: {type: [Number, String], default: 5},

            barPercentWidth:{type: [Number, String], default: 34}, // 柱状图长度
            barLabel:{type: [Number, String], default: 53}, // 柱状图标签位置
            yShow: {type: String | Boolean, default: true}, // 显示Y值标签
            splitNum: {type: [Number, String], default: 0}, // 换行数量
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
                    }]
                }
            },
            staticData: {
                type: Array, default: () => {
                    return [
                        {
                            "x": "周一",
                            "y": 276,
                            "s": "1"
                        },
                        {
                            "x": "周一",
                            "y": 340,
                            "s": "2"
                        },
                        {
                            "x": "周二",
                            "y": 295,
                            "s": "1"
                        },
                        {
                            "x": "周二",
                            "y": 370,
                            "s": "2"
                        },
                        {
                            "x": "周三",
                            "y": 210,
                            "s": "1"
                        },
                        {
                            "x": "周三",
                            "y": 280,
                            "s": "2"
                        },
                        {
                            "x": "周四",
                            "y": 175,
                            "s": "1"
                        },
                        {
                            "x": "周四",
                            "y": 210,
                            "s": "2"
                        },
                        {
                            "x": "周五",
                            "y": 194,
                            "s": "1"
                        },
                        {
                            "x": "周五",
                            "y": 240,
                            "s": "2"
                        },
                        {
                            "x": "周六",
                            "y": 180,
                            "s": "1"
                        },
                        {
                            "x": "周六",
                            "y": 221,
                            "s": "2"
                        },
                        {
                            "x": "周日",
                            "y": 200,
                            "s": "1"
                        },
                        {
                            "x": "周日",
                            "y": 240,
                            "s": "2"
                        }
                    ]
                }
            },
            x: {type: String, default: 'x'},
            y: {type: String, default: 'y'},
            s: {type: String, default: 's'},
        },
        data(){
            return {
                comName: '水平双向柱状图',
                yAxisNames: []
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
            // 获取网格
            getGrid(){
                let _gridLeft = {
                    show: false,
                    left: this.gridLeft,
                    top: this.gridTop,
                    bottom: this.gridBottom,
                    containLabel: true,
                    width: `${this.barPercentWidth}%`,
                };
                let _gridRight = {
                    show: false,
                    right: this.gridRight,
                    top: this.gridTop,
                    bottom: this.gridBottom,
                    containLabel: true,
                    width: `${this.barPercentWidth}%`,
                };
                // 如果显示Y轴，则新增中间Grid
                if (this.yShow) {
                    let _gridMiddle = {
                        show: false,
                        left: `${this.barLabel}%`,
                        top: this.gridTop+20,
                        bottom: this.gridBottom
                    }
                    return [_gridLeft, _gridMiddle, _gridRight];
                } else {
                    _gridLeft.width = this.width / 2 - this.gridLeft;
                    _gridRight.width = this.width / 2 - this.gridRight;
                    return [_gridLeft, _gridRight];
                }
            },
            // 获取X轴
            getXAxis(maxNum){
                const maxBoundary=getBoundary(maxNum);
                let _xLeft = {
                    show: this.xShow,
                    type: 'value',
                    inverse: true,
                    name:this.xName,
                    nameTextStyle: {
                        color: this.xColor,
                    },
                    splitNumber: this.xSplitNumber,
                    min: this.xMin,
                    max: maxBoundary,
                    axisLine: {
                        show: this.lineShow,
                        lineStyle: {
                            color: this.tickColor
                        }
                    },
                    axisTick: {
                        show: this.tickShow,
                        lineStyle: {
                            color: this.tickColor
                        }
                    },
                    position: this.axisPosition,
                    axisLabel: {
                        show: this.xShow,
                        color: this.xColor,
                        fontWeight: this.xFontWeight,
                        fontSize: this.xFontSize,
                        rotate: this.rotate
                    },
                    splitLine: {
                        show: false
                    }
                };
                let _xRight = JSON.parse(JSON.stringify(_xLeft));
                _xRight.inverse=false;
                if (this.yShow) {
                    return [_xLeft, {gridIndex: 1, show: false,}, Object.assign(_xRight, {gridIndex: 2})];
                } else {
                    return [_xLeft, Object.assign(_xRight, {gridIndex: 1})];
                }
            },
            // 获取Y轴
            getYAxis(){
                let _yLeft = {
                    type: 'category',
                    inverse: true,
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        show: false
                    },
                    data: this.yAxisNames,
                }
                let _yRight = JSON.parse(JSON.stringify(_yLeft));
                if (this.yShow) {
                    let _yMiddle = {
                        gridIndex: 1,
                        type: 'category',
                        inverse: true,
                        position: 'left',
                        axisLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: this.yColor,
                                fontWeight: this.yFontWeight,
                                fontSize: this.yFontSize
                            }
                        },
                        data: this.yAxisNames.map(value => {
                            return {
                                value: (this.splitNum===0 || value.toString().length<this.splitNum)?value: value.substring(0, this.splitNum) + "\n" + value.substring(this.splitNum),
                                textStyle: {
                                    align: 'center',
                                }
                            }
                        }),
                    }
                    return [_yLeft, _yMiddle, Object.assign(_yRight, {gridIndex: 2})];
                } else {
                    return [_yLeft, Object.assign(_yRight, {gridIndex: 1})];
                }
            },

            async GetDataSource(){
                let dataJson = await getApiSource(this.dataType,this.apiUrl,this.staticData);
                let seriesName = [];
                let xName = [];
                let yList = [];
                dataJson.forEach(i => {
                    // 系列名称
                    if (!seriesName.includes(i[this.s])) seriesName.push(i[this.s]);
                    // y轴名称
                    if (!xName.includes(i[this.x])) xName.push(i[this.x]);
                });
                this.yAxisNames = xName;
                let maxNum=0;
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
                            if(Math.ceil(yData[index][this.y])>maxNum){
                                maxNum=Math.ceil(yData[index][this.y]);
                            }
                        }
                    });
                    yList.push(ySeries)
                });
                let legName=this.barSeries.map(item=> item.name);
                let label =this.label();
                let labelLeft=JSON.parse(JSON.stringify(label));
                let seriesData=[];
                yList.forEach((i,index)=>{
                    let series={
                        name: legName[index],
                        type: 'bar',
                        barWidth: this.barWidth,
                        label:index===0?Object.assign(labelLeft,{position:"left"}) :label,
                        data: i
                    };
                    if(this.yShow&&index>0){
                        Object.assign(series,{xAxisIndex:2,yAxisIndex:2})
                    }else if(index>0){
                        Object.assign(series,{xAxisIndex:1,yAxisIndex:1})
                    }
                    seriesData.push(series)
                })
                return {
                    maxNum:maxNum,
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
                        xAxis: this.getXAxis(resultJson.maxNum),
                        series:resultJson.seriesData
                    })                    
                }
            },
            async InitChart(){                
                if (this.barSeries.length === 0) return;
                const resultJson= await this.GetDataSource()
                let legend=this.legend();
                legend.data=resultJson.legName;
                let option = {
                    color: this.initColorList(),
                    tooltip: {
                        show: true,
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow',
                        }
                    },
                    legend:legend,
                    grid: this.getGrid(),
                    xAxis: this.getXAxis(resultJson.maxNum),
                    yAxis: this.getYAxis(),
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