<template>
    <section>
        <div class="skin-charts-list" ref="chartsList" id="chartsList">
            <div class="chart-box">
                <h4>折线图</h4>
                <line-basic :lineSeries='lineStyle'
                            :width=chartWidth
                            :height="250" :key="curKey"
                            :staticData='lineData'
                ></line-basic>
            </div>
            <div class="chart-box">
                <h4>折线面积图</h4>
                <line-basic :lineSeries='areaStyle'  :staticData='lineData'
                            :boundaryGap="false" :width=chartWidth :height="250" :key="curKey"></line-basic>
            </div>
            <div class="chart-box">
                <h4>基本垂直柱图</h4>
                <bar-vert :width="chartWidth" :key="curKey" :height="250"
                          :barSeries='areaStyle' :barWidth="8"
                          :staticData='lineData'
                ></bar-vert>
            </div>
            <div class="chart-box">
                <h4>垂直堆叠柱图</h4>
                <bar-vert-stack :width="chartWidth" :key="curKey" :height="250"
                                :barSeries='areaStyle' :barWidth="20" 
                                :staticData='lineData'
                ></bar-vert-stack>
            </div>
            <div class="chart-box">
                <h4>饼图</h4>
                <pie-basic :pieSeries='curTheme.color' :staticData='pieData'
                           :width=chartWidth :height="250" :key="curKey">
                </pie-basic>
            </div>
            <div class="chart-box">
                <h4>雷达图</h4>
                <radar-basic :radarSeries='radarStyle' :staticData='lineData'
                             :width=chartWidth :height="250" :key="curKey"></radar-basic>
            </div>
            <div class="chart-box">
                <h4>基本气泡图</h4>
                <bubble-basic :key="curKey"
                              :barSeries='lineStyle'
                              :width=chartWidth :height="250"
                              :staticData='lineData'
                ></bubble-basic>
            </div>
            <div class="chart-box">
                <h4>金字塔</h4>
                <funnel :pieSeries='curTheme.color' :key="curKey"
                        :width=chartWidth :height="250"
                        :staticData='pieData'
                ></funnel>
            </div>
        </div>
    </section>
</template>
<script>
    export default {
        props: {
            curTheme: {
                type: Object,
                require: true
            },
            curKey: {
                type: String
            }
        },
        data(){
            return {
                chartWidth: 0,
                legend: ["第一组", "第二组", "第三组", "第四组"],
                y: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
                x: [
                    [400, 564, 774, 918, 695, 830, 945],
                    [300, 584, 338, 587, 686, 311, 527],
                    [200, 318, 347, 389, 262, 337, 318],
                    [100, 218, 164, 181, 131, 189, 126]
                ]
            }
        },
        computed: {
            lineStyle(){
                const normal = {
                    "type": "solid",
                    "width": 2,
                    "smooth": false,
                    "showSymbol": true,
                    "symbolType": "circle",
                    "symbolSize": 4,
                    "areaStyle": {"color": "RGBA(50,126,200,0.70)", "opacity": 0}
                };
                const len = this.curTheme.color.length;
                let lineStyle = [];
                this.legend.forEach((i, index) => {
                    let x = {
                        name: i,
                        color: this.curTheme.color[index % len],
                        ...normal
                    }
                    lineStyle.push(x);
                })
                return lineStyle;
            },
            areaStyle(){
                const normal = {
                    "type": "solid",
                    "width": 2,
                    "smooth": false,
                    "showSymbol": true,
                    "symbolType": "circle",
                    "symbolSize": 4
                };
                const len = this.curTheme.color.length;
                let areaStyle = [];
                this.legend.forEach((i, index) => {
                    let x = {
                        name: i,
                        color: this.curTheme.color[index % len],
                        areaStyle: {color: this.curTheme.color[index % len], opacity: 1},
                        ...normal
                    }
                    areaStyle.push(x);
                })
                return areaStyle;
            },
            radarStyle(){
                const normal={width:2};
                let radar=[];
                const len = this.curTheme.color.length;
                this.legend.forEach((i,index)=>{
                    radar.push({
                        name:i,
                        lineColor:this.curTheme.color[index % len],
                        areaColor:'rgba(255,255,255,.1)',
                        ...normal
                    })
                });
                return radar;
            },
            lineData(){
                let data = [];
                this.y.forEach((y, idx) => {
                    this.legend.forEach((l, index) => {
                        data.push({x: y, y: this.x[index][idx], s: l});
                    })
                });
                return data;
            },
            pieData(){
                let data = [];
                this.legend.forEach((i, index) => {
                    data.push({
                        x: i,
                        y: this.x[index][0]
                    })
                });
                return data;
            },
        },
        mounted(){
            this.$nextTick(() => {
                this.chartWidth = $("#chartsList").width() / 2 - 40;
            })
        }
    }
</script>
<style type="text/less" lang="less" scoped>
    .skin-charts-list {
        width: 100%;
        display: -webkit-flex;
        display: flex;
        -webkit-flex-wrap: wrap;
        flex-wrap: wrap;
        -webkit-justify-content: space-between;
        justify-content: space-between;
        .chart-box {
            width: calc(~"50% - 20px");
            height: 250px;
            margin: 10px;
            h4 {
                font-size: 16px;
                color: #fff;
            }
        }
    }
</style>