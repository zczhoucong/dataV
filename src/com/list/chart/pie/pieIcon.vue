<!--
说明：带图饼图
作者：高春超
时间：2018年6月6日09:45:19
-->
<template>
    <section :id="chartId" :style="container" @click="bindEvent"></section>
</template>
<script>
    import eCharts from "echarts";    
    import {transfterLegPosition} from '@/utils/assist'
    import {getApiData, getApiSource} from '@/utils/getApiData'
    import pieMixins from '../mixins/pieMixins'
    export default {
        mixins:[pieMixins],
        props: {            
            numFont: {type: String, default: "AgencyFBBold"},// 字体
            innerR: {type: [Number, String], default: '60'}, // 内半径
            outerR: {type: [Number, String], default: '75'}, // 外半径
            imgSize: {type: [Number, String], default: 50}, // 图片大小
            imgSource: {type: String, default: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIwAAACMCAYAAACuwEE+AAAKJ0lEQVR42uyde2hXZRjHnzXnmnjBS2pqkWhz3iUVRWf94QU1LyiaDVMR7I+8gEUTSQM1K29gYuYNDZTQ8AZqaJYRXvI2lcjSanjJTRzObLqZbe739BAPIsg6z3v2O79zzvs+H/iCzG3neb7n2fmd8573fV5wCURMI7UnjSG9T1pP2kcqIP1BKiXdIz0kVfG/S/n/Cvh71/PPjuHflQaKNQVSh5RLWkQ6TirH5FPOv3sRH6sOKLEqkgz+699Nuospho+5m2PIACWyhZJDWk4qwehQwjHlgBKZQskmfUlKYHRJcIzZoIRWKG1IG0lVGB+qOOY2oKT0SWcW6T7GFI59lj5hBV8sLUkH0BI4l5agBFIso0i30DI4p1GgJLVYZgZ0U1vNg3KnSXtJn5PWkT5hreOv7SWd5u+tDuimeCYoSSmWeZg8LpI+JU0ivUTK8hFPFv/sJP5dFzF5zAOlVsWyDGvPUdKbpFYBxtmKj3EUa88yUHydhBXon3ukj0ntQ4i7PR/7LvpnBShGpk9Ff1TwValZBHJoxrFUoD+mgiIyuj/pHzTna1LrCObTmmMzgj3oB8r/mtvcx7ug+/wUlRbxwcYZHKsJN0nNQanR2O1oRjGpS4zy60wqQjO2g1LDwJwZhaS2MczzBY5djA7sPWliI1IxyrlAahnzVxw/GV5JG4LyyMCFhnNMnrcg5+c4FykLQfnPuMakv1BGJWmARbnnck6esEeNwXV4LqyUORbmn49yFrleLA1IZSjjPKmOhR6kk86hAPaqgcsFM83grXJPi33oyTlKmOZywRxHGdsc8GIbyjjm7uRtGQlSFwf86MK5Ssh2sWA+QBl7HPJkj9781mzOGZQx3CFPhqOMM64VSxNStXCQro5jS3tLhA8BTVwqmPEoYxU4Bs8lljDeJVM2oIxBDhbMIJSxwSVTzgonEGWBY/Ak8wfozVlXDEkn/Y3efA+OgpQ7esAeprvRZUHGYocLZjHK6OCCGeNQRp7DBfM6yhjnghnzUUY3hwumG8qY74IZa9Cbh6RMhwsmkz3wYo0LZuxEb4oAwPWpH0XozU4XjDiG3pwDcL5gzumba0I4Y/4ggPMFcxC9KXTBiFL0ZguA8wWzBb0pBdsRTslcC+B8waxFb8rAdoSL01cDOF8wq9GbCrAd4UL7lQDOF8xKyfs2sB3hNMTlAM4XzHL0JmG7CV11BDPpI+JdbTVgsEEXzMkAzhfMFIMunINtS36EYffJlwGcL5hXDLuBjrAl8U6keyjnpm4hw7uykBeGff062ZD4YTRjCSjA3i1FMw7HPeGhaEYpqRUoj/fHu41mDI31m2nttFRrD8egGTvjmmhD0gODm7Y5oNTk5VzpMlr2vGEckxxo0ChnBChefo40aBY9MJ5/FTImgSKC29NLmBvH5NYLP4oagSL1tKlwPGt9HJPbgd7cAMUI4djMDogbwp3TLoFi6uuv6M0BW68wxaCY+lps6xVmE8qoB4rU03ooY1Mck1uAMnqBIvW0F8pYEMfkxqKMj0ARgeQVyhgbx+TaoYwrpHRQJF0vLqOMdhBHDBKcDoqXl2+hjMtxTnIVyrhD6ghKTT6+SPrT+jZviNjHcIuXiaQmoDy+ccdrpGsop0/ckz7hY/PxU6RRDhfKq+xbNZpxwobkR6N/viU9C47AG299g/4ZbYsRh9A/v0s21LJkw63f0D+HbNtX4B76p5BUz/IR3MJabuye7UYzZznLLC6YZVg7xttqTD76p4rUyUJPOnJufsm3/bN6OqkS/bHLQj92oT8qnRnw5B3ILqA/etnlgznsXU/Xxhqe4heU+0llKOegU23JGPZoP3v2lOsjmumktShngAU5D0A5n+kL2icNbGSwyu9HUka8101TDjJu60T5mo2c48JO8UixoxBd4Oc9gHXD4CmhRwxz7MGxS7ihU1i9DZ2Bcs6TMmL2UXQe5cwAxdPUuqQrKGddjHJbh0LYg7qgCHdXNePtGOQ0GxndTTcYgzebtuyyqGXbZlB8PWZfN3xj2zeCefTl2KRc18fo1HWwqiANi1j85cYdpJRamb7Rx0u5NyIQ90SOxYSNoCRlW95TaEaCND3kJSEJNIBzzAIlKSegBemqj6KZEkKsk02LhXNrAUpST0RnUhma8ZA0PIUxDuNjiuGcOoMSyAkZ4mN2WhGpQQpia8DHEsO5DAEl0BOT5+NmclVkVnkynEMeKCm70pQbnpzWQTZgNizicr2ypL5oepNuoZylUWjxzjH3BiW09U5XDfoB1w8ghvqkOwZPQ9mghFo03Q1uhPMCuaeS3+B2ByUeG2oyWwM49lYkdOPTeBVMG+FN5y8BHPtn4U13G1Bit2SjKoDjVupO//EsmCUoo24yp1zqpmHxKI5MUhfuPfMOD5oVCydaZSS5YKqF3bVWcayjOfZMUJJeGGmkDqQJpA9Je0mFfJL8cC2AGK+iP6o5l72c2wTONQ0Uo906RvLHy3ekMkwuXwUQ8z5MLmWc+xL2oikoj8x+mof5V/LTRgKD5b3QW5iYk2BvVrJXma4VSVvSdF5YXoGp4yapaQD5PEMqwRTBnu1nD9vaWiQ5pMWkSxgOCdLIgFcFJDAcLrG3OTbMkptNKsDwmRNCd60wKGDPW8StmfMXpEoMnypSfgpzf5ePGTaVfA76RLm/Sx7pJEaHH0j9Q/CiHx87Kpzkc5MelXGS8aSLGD63SUd4bkpuBLzJ5ViOcGxhc5HPVVqYi7TOh3Cp/be9M/ZlKIrC+KE1SiSSJhjaP8BQicEqLMYOJGI1SjqIwdCJrSZLF8Kki8VktjBQidgMJisheYikHGf4BomUe/ve1fb5fsnX9fWe8+Xe++49975r04GpggAUTYM98uH3Iv5zBW24/uuhGzmb+8uGj5oONTxNNK5mWkawByRlYHuhiDbW0OamBgY5HA09/KyYngK++l6YNkyz6DX+JWptRww2EZMPDcMTctoX4mD8UaB5Rx2Hv3JCWsU/hxjVA82HjhK7AAA7qzeaHHemqmnq318f2v51tVOI4Z0mBHI8nsT3ASKNT2TaM83QJMmaBzHdSzBP83GKm981HremVdOQkNDmGUKsbzUGyPmi78NLMVcsr0wl9iYd63VKyEGcFfKSz4HytxiLQwssAuqa4rMF5MQbeGDut4cU2nxtjrCPkhXSbcbJIjdRm6/dhZ+6shP159iUF9LtxskjV17AE/1JbM83TescfnpumFpH7nxY+1YF5zlveTRNC+lV40wjhz7zmYL3UVPwYJoUkoaPe92rO9tfK/WfPepJJ4SkAmx6Rh65HxZstbuyJCR9N3q5UxH7aagb+0LSappddaMhjsPRq2lMSFoNM2J6cRmWRN3YEcIb1w1RN6pC0m6YKg1DOmaYc9MWlWqduxmGEEDDEBqGdN4wz0oIcFmHaSghHiu9ZSXEjbLg5oVTJeQH4JHM1/K9MyWktVny3+54wfB0yYkwgQca8ERGwCfZstpbaZGyvgAAAABJRU5ErkJggg=='}, // 图片来源
            roseType: {type: [String,Boolean], default: false}, // 是否显示南丁格尔图
            // 标签
            labelShow: {type: String | Boolean, default: true}, // 是否显示值标签
            nameShow: {type: String | Boolean, default: true}, // 是否显示类目
            valueShow: {type: String | Boolean, default: false}, // 是否显示真实数值
            labelColor: {type: String, default: '#fff'}, // 值标签颜色
            labelSize: {type: [Number, String], default: 16}, // 值标签大小

            // 标签线
            lineShow: {type: String | Boolean, default: true},
            lineLength: {type: [Number, String], default: 20},
            lineLength2: {type: [Number, String], default: 20},

            // 图例
            legendShow: {type: String | Boolean, default: true},
            legendColor: {type: String, default: '#fff'},
            legPosition: {type: String, default: '顶部居中'},
            orient: {type: String, default: 'horizontal'},
            legendSize: {type: [Number, String], default: 12},
            legendGap: {type: [Number, String], default: 10},

            pieSeries: {  // 系列数据
                type: Array, default: () => {
                    return ['#54F5F5', '#2078D1', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3']
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
                comName: '带图饼图'
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
                    seriesData.push({value: i[this.y], name: i[this.x]})
                })
                let formatter = "{b} \n {d}%";
                if (this.nameShow&&this.valueShow) {
                    formatter = "{b} \n {c}";
                }else if(!this.nameShow&&!this.valueShow){
                    formatter = "{d}%";
                }else if(!this.nameShow&&this.valueShow){
                    formatter = "{c}";
                }
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
                        itemWidth:15,
                        orient: this.orient,
                        data: legendData
                    },
                    graphic: {
                        elements: [{
                            type: 'image',
                            style: {
                                image: this.imgSource,
                                width: this.imgSize,
                                height: this.imgSize
                            },
                            left: 'center',
                            top: 'center'
                        }]
                    },
                    series: {
                        type: 'pie',
                        radius: [`${this.innerR}%`, `${this.outerR}%`],
                        hoverAnimation: false,
                        roseType:this.roseType?"radius":false,
                        label: {
                            show: this.labelShow,
                            color: this.labelColor,
                            fontSize: this.labelSize,
                            fontFamily: this.font,
                            formatter: formatter
                        },
                        labelLine: {
                            show: this.lineShow,
                            lineStyle: {
                                color: this.labelColor,
                            },
                            length: this.lineLength,
                            length2: this.lineLength2
                        },
                        ...animationEff,
                        data: seriesData
                    }
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