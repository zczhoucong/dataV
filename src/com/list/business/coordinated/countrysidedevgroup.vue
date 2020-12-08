/*
* @desc：协调发展-农村人居环境业务组件
* @Author: lujing
* @Date: 2018-05-31 11:44:09
* @Last Modified by: lujing
* @Last Modified time: 2018-06-26 18:33:52
*/
<template>
    <div :style="container">
        <slide v-if="isScroll" class="sliders" :style="container" style="overflow: hidden;" :scrollDir="scrollDir"
               :interval="scrollTime*1000" :childNum="groupCom.length">
            <div v-for="(group,index1) in groupCom">
                <div class="com-single-box" :style="comWidth" v-for="(series,index2) in group" :key="series.xid">
                    <div class="com-single-title" :style="titleStyle">{{series.title}}</div>
                    <gauge style='position:absolute;width:100%;' :style='gaugeStyle' :width="chartStyle.width"
                           :height="chartStyle.height" :redius="redius">
                    </gauge>
                    <pieIconMulti class="com-single-chart"
                                  :imgSource='imgSource[index1*pageSize+index2]'
                                  :holderColor="pieStyle.holderColor" :holderWidth='pieStyle.holderWidth'
                                  :pieSeries="pieStyle.pieSeries" :legX='pieStyle.legX' :legY='pieStyle.legY'
                                  :orient='pieStyle.orient' :centerX='pieStyle.centerX' :centerY='pieStyle.centerY'
                                  :lableSize='pieStyle.lableSize' :numSize='pieStyle.numSize' :staticData="series.items"
                                  :width="chartStyle.width" :height="chartStyle.height"></pieIconMulti>
                </div>
            </div>
        </slide>
        <div v-else :style="container">
            <div class="com-single-box" :style="comWidth" v-for="(series , index) in seriesName" :key="series.xid">
                <div class="com-single-title" :style="titleStyle">{{series.title}}</div>
                <gauge style='position:absolute;width:100%;' :style='gaugeStyle' :width="chartStyle.width"
                       :height="chartStyle.height" :redius="redius">
                </gauge>
                <pieIconMulti class="com-single-chart" :imgSource='imgSource[index]'
                              :holderColor="pieStyle.holderColor" :holderWidth='pieStyle.holderWidth'
                              :pieSeries="pieStyle.pieSeries" :legX='pieStyle.legX' :legY='pieStyle.legY'
                              :orient='pieStyle.orient' :centerX='pieStyle.centerX' :centerY='pieStyle.centerY'
                              :lableSize='pieStyle.lableSize' :numSize='pieStyle.numSize' :staticData="series.items"
                              :width="chartStyle.width" :height="chartStyle.height">
                </pieIconMulti>
            </div>
        </div>
    </div>
</template>

<script>
    import echarts from "echarts";
    import Slide from "@/com/components/slider.vue";
    import gauge from "@/com/list/other/gauge.vue";
    import pieIconMulti from "@/com/list/chart/pie/pieIconMulti.vue";
    import {getApiSource} from "@/utils/getApiData";
    export default {
        props: {
            width: {type: [Number, String], default: 537}, // 宽度
            height: {type: [Number, String], default: 311}, // 高度
            isScroll: {type: [Boolean, String], default: false}, // 是否开启滚动条
            scrollDir: {type: String, default: "horizontal"}, // 滚动方向
            scrollTime: {type: [Number, String], default: 2}, // 滚动时长
            nums: {type: [Number, String], default: 1}, // 每页展示数量
            fontColor: {type: String, default: "#fff"},
            fontWeight: {type: String, default: "normal"},
            fontSize: {type: [Number, String], default: 18},
            fontHeight: {type: [Number, String], default: 30},
            fontFamily: {type: String, default: "AgencyFBBold"}, // 字体
            dataType: {type: String, default: "WebApi"},
            apiUrl: {
                type: String,
                default: ""
            },
            staticData: {
                type: Array,
                default: () => {
                    return [];
                }
            },
            x: {type: String, default: "year"},
            y: {type: String, default: "val"},
            s: {type: String, default: "year"},
            i: {type: String, default: "infoId"},
            t: {type: String, default: "name"}
        },
        components: {pieIconMulti, Slide, gauge},
        data() {
            return {
                comName: "农村人居环境",
                seriesName: [],
                imgSource: ["static/water.png", "static/rashbin.png", "static/washroom.png"],
                pageSize: eval(this.nums) < 1 ? 1 : this.nums,
                pieStyle: {
                    holderWidth: 3, //底环粗细
                    holderColor: "#26315c", //底环颜色
                    // 系列数据（设置颜色和外环粗细）
                    pieSeries: [
                        {
                            color: "#33ccff",
                            borderWidth: 3,
                            radius: 17
                        },
                        {
                            color: "#66cc66",
                            borderWidth: 3,
                            radius: 25
                        },
                        {
                            color: "#ffbb33",
                            borderWidth: 3,
                            radius: 33
                        }
                    ],
                    // 图例位置
                    legX: "center",
                    legY: 60,
                    orient: "vertical",
                    // 中心位置
                    centerX: 50,
                    centerY: 30,
                    // 文字大小
                    lableSize: 14,
                    // 数字大小
                    numSize: 22
                },
                redius: 73
            };
        },
        mounted() {
            this.$nextTick(() => {
                const skinTheme = localStorage.getItem("skinItem");
                if (skinTheme) {
                    const colorList = JSON.parse(skinTheme);
                    const len = colorList.length;
                    this.pieStyle.pieSeries.forEach((i, index) => {
                        i.color = colorList[index % len]
                    })
                }
                this.initChart();
            });
        },
        computed: {
            container() {
                return {
                    width: `${this.width}px`,
                    height: `${this.height}px`
                };
            },
            // 根据数量进行分组
            groupCom() {
                let com = [];
                for (
                    let i = 0, len = this.seriesName.length;
                    i < len;
                    i += eval(this.pageSize)
                ) {
                    com.push(this.seriesName.slice(i, i + eval(this.pageSize)));
                }
                return com;
            },
            //获取单个组件的宽度
            comWidth() {
                return {
                    width: `${this.width / this.pageSize}px`
                };
            },
            //获取标题的样式
            titleStyle() {
                return {
                    fontFamily: this.fontFamily,
                    fontSize: `${this.fontSize}px`,
                    color: this.fontColor,
                    fontWeight: this.fontWeight,
                    height: `${this.fontHeight}px`,
                    lineHeight: `${this.fontHeight}px`
                };
            },
            gaugeStyle() {
                return {
                    top: `${this.fontHeight}px`
                };
            },
            // 获取图表的样式
            chartStyle() {
                return {
                    width: `${this.width / this.pageSize}`,
                    height: `${this.height - this.fontHeight}`
                };
            }
        },
        methods: {
            async initChart() {
                let dataJson = await getApiSource(
                    this.dataType,
                    this.apiUrl,
                    this.staticData
                );
                this.seriesName = [];
                dataJson.forEach(i => {
                    if (this.seriesName.findIndex(s => s.title === i[this.t]) < 0) {
                        this.seriesName.push({title: i[this.t], xid: i[this.i]});
                    }
                });
                this.$emit("count", {
                    count: this.seriesName.length,
                    data: this.seriesName
                });
                this.seriesName.forEach(i => {
                    const items = dataJson.filter(d => d[this.i] === i.xid);
                    i.items = items;
                });
                console.log(this.seriesName)
                if (!this.isScroll) {
                    this.pageSize = this.seriesName.length;
                }
            },
            // 绑定点击回调事件
            bindEvent(stat) {
                // 注册内部元素点击事件
                this.$emit("callback", {
                    type: "click",
                    data: stat
                });
            }
        }
    };
</script>
<style scoped lang="less" type="text/less">
    .com-single-box {
        float: left;
        height: 100%;
        text-align: center;
        position: relative;
        .com-single-title,
        .com-single-chart {
            width: 100%;
            float: left;
        }
    }
</style>
