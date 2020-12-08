<template>
    <div class="modalwrapper">
        <div class="maintitle"></div>
        <div class="maintitletxt">
            {{title}}
        </div>
        <div class="smtitletxt">责任部门：发改委</div>
        <div class="firstdata">
            <img class="iconsty" src="./progress.png">
            <div class="nowstate">
                <div class="title1">现状</div>
                <div class="value1">{{this.val1}}</div>
            </div>
            <div class="change1">
                {{(this.val2-this.val1).toFixed(3)}}
            </div>
            <div class="state2020">
                <div class="title2">2020规划</div>
                <div class="value2">{{this.val2}}</div>
            </div>
            <div class="change2">
                {{(this.val3-this.val1).toFixed(2)}}
            </div>
            <div class="state2035">
                <div class="title3">2035规划</div>
                <div class="value3">{{this.val3}}</div>
            </div>
            <div class="objitem">
                <div class="title4">对标广州</div>
                <div class="value4">{{this.val2}}</div>
            </div>
        </div>
        <div class="mapwrapper" id="mainmap"></div>
        <table class="tableshow">
            <th class="tablehead">
            <td class="one1">区域名</td>
            <td class="one2">当前指标值</td>
            <td class="one3">对标差距</td>
            </th>
            <tr class="tr1">
                <td class="two1">鼓楼区</td>
                <td class="two2">{{this.val1}}</td>
                <td class="two3">-0.0001</td>
            </tr>
            <tr class="tr2">
                <td class="three1">浦口区</td>
                <td class="three2">{{this.val3}}</td>
                <td class="three3">+0.0001</td>
            </tr>
            <tr class="tr3">
                <td class="four1">建邺区</td>
                <td class="four2">{{this.val2}}</td>
                <td class="four3">-0.0001</td>
            </tr>
            <tr class="tr4">
                <td class="five1">雨花台区</td>
                <td class="five2">{{this.val1}}</td>
                <td class="five3">+0.0001</td>
            </tr>
        </table>
    </div>
</template>
<script>
    import echarts from "echarts";
    export default {
        data(){
            return {
                val1: '170',//2015年数据
                val2: '180',//2020年数据
                val3: '200',//2035年数据
                title: '人类发展指数'
            }
        },
        methods: {
            drawmap() {
                // 基于准备好的dom，初始化echarts实例
                var myChart = echarts.init(document.getElementById("mainmap"));
                // 指定图表的配置项和数据
                var option = {
                    title: {
                        text: ""
                    },
                    tooltip: {},
                    legend: {
                        data: ["销量"]
                    },
                    xAxis: {
                        axisLine: {
                            lineStyle: {
                                color: "#fff"
                            }
                        },
                        axisLabel: {
                            color: "#fff",
                            fontSize: "17",
                            fontFamily: "Courier New"
                        },
                        type: "category",
                        data: ["2015", "2016", "2017", "2020", "2035"]
                    },
                    yAxis: {
                        axisLine: {
                            lineStyle: {
                                color: "#fff"
                            }
                        },
                        axisLabel: {
                            color: "#fff",
                            fontSize: "17"
                        }
                    },
                    series: [
                        {
                            type: "bar",
                            // 添加图表数据
                            data: [
                                {value: this.val1, itemStyle: {color: "#397DDF"}},
                                {value: this.val2, itemStyle: {color: "#397DDF"}},
                                {value: this.val3, itemStyle: {color: "#AFB640"}},
                                {value: this.val2, itemStyle: {color: "#397DDF"}},
                                {value: this.val3, itemStyle: {color: "#397DDF"}}
                            ],
                            itemStyle: {
                                //    color:"#397DDF"
                            },
                            barWidth: "36"
                        }
                    ]
                };

                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
            }
        },
        mounted() {
            this.drawmap();
        },
    };
</script>
<style lang="less" type="text/less">
    .modalwrapper {
        color: white;
        position: relative;
        .maintitle {
            position: absolute;
            top: 0;
            left: calc(~"50% - 416px");
            width: 806px;
            height: 129px;
            background: url('./titlebgpic.png') no-repeat;
        }
        .maintitletxt {
            position: absolute;
            width: 600px;
            top: 0;
            text-align: center;
            left: calc(~"50% - 320px");
            font-size: 42px;
        }
        .smtitletxt {
            width: 240px;
            position: absolute;
            top: 90px;
            font-size: 22px;
            text-align: center;
            left: calc(~"50% - 135px");
        }

        .firstdata {
            width: 1110px;
            height: 105px;
            position: absolute;
            top: 160px;
            left: calc(~"50% - 555px");
            background: url('./hasarrbg.png') no-repeat;

            .iconsty {
                width: 60px;
                height: 60px;
                position: absolute;
                top: 20px;
                left: 27px;
            }

            .nowstate {
                width: 140px;
                height: 98px;
                position: absolute;
                top: 0;
                left: 120px;

                .title1 {
                    margin-top: 17px;
                    font-size: 18px;
                    text-align: left;
                }

                .value1 {
                    font-size: 48px;
                    margin-top: -15px;
                    text-align: left;
                    font-family: AgencyFBBold;
                    background: linear-gradient(to top, #4c88f7, #04f6ff);
                    -webkit-background-clip: text;
                    color: transparent;
                    font-weight: bold;
                }
            }

            .change1 {
                width: 130px;
                height: 40px;
                position: absolute;
                top: 20px;
                left: 250px;
                font-size: 30px;
                font-family: AgencyFBBold;
                background: linear-gradient(to top, #4c88f7, #04f6ff);
                -webkit-background-clip: text;
                color: transparent;
                font-weight: bold;
            }

            .state2020 {
                width: 140px;
                height: 98px;
                position: absolute;
                top: 0;
                left: 407px;

                .title2 {
                    margin-top: 17px;
                    font-size: 18px;
                    text-align: left;
                }

                .value2 {
                    font-size: 48px;
                    margin-top: -15px;
                    text-align: left;
                    font-family: AgencyFBBold;
                    background: linear-gradient(to top, #4c88f7, #04f6ff);
                    -webkit-background-clip: text;
                    color: transparent;
                    font-weight: bold;
                }
            }

            .change2 {
                width: 130px;
                height: 40px;
                position: absolute;
                top: 20px;
                left: 530px;
                font-size: 30px;
                font-family: AgencyFBBold;
                background: linear-gradient(to top, #4c88f7, #04f6ff);
                -webkit-background-clip: text;
                color: transparent;
                font-weight: bold;
            }

            .state2035 {
                width: 140px;
                height: 98px;
                position: absolute;
                top: 0;
                left: 697px;

                .title3 {
                    margin-top: 17px;
                    font-size: 18px;
                    text-align: left;
                }

                .value3 {
                    font-size: 48px;
                    margin-top: -15px;
                    text-align: left;
                    font-family: AgencyFBBold;
                    background: linear-gradient(to top, #4c88f7, #04f6ff);
                    -webkit-background-clip: text;
                    color: transparent;
                    font-weight: bold;
                }
            }

            .objitem {
                width: 140px;
                height: 98px;
                position: absolute;
                top: 0;
                left: 919px;

                .title4 {
                    margin-top: 17px;
                    font-size: 18px;
                    text-align: center;
                }

                .value4 {
                    font-size: 48px;
                    margin-top: -15px;
                    text-align: center;
                    font-family: AgencyFBBold;
                    background: linear-gradient(to top, #4c88f7, #04f6ff);
                    -webkit-background-clip: text;
                    color: transparent;
                    font-weight: bold;
                }
            }
        }

        .mapwrapper {
            position: absolute;
            top: 250px;
            right: calc(~ "50% + 35px");
            height: 400px;
            width: 529px;
        }

        .tableshow {
            position: absolute;
            top: 300px;
            left: calc(~ "50% + 20px");
            height: 340px;
            font-size: 18px;
            width: 529px;

            .tablehead {
                display: flex;
                width: 100%;
                height: 59px;
                background: #397ddf;
                line-height: 59px;

                .one1, .one2, .one3 {
                    flex: 1;
                }
            }

            .tr1, .tr3 {
                display: flex;
                width: 100%;
                line-height: 59px;
                height: 59px;
                font-family: AgencyFBBold;

                .two1, .two2, .two3, .four1, .four2, .four3 {
                    flex: 1;
                    text-align: center;
                }
            }

            .tr2, .tr4 {
                display: flex;
                font-family: AgencyFBBold;
                width: 100%;
                height: 59px;
                background: #1c345f;
                line-height: 59px;

                .three1, .three2, .three3, .five1, .five2, .five3 {
                    flex: 1;
                    text-align: center;
                }
            }
        }

    }
</style>
