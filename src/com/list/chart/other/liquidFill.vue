<template>
    <section :id="liqId" :style="container" ></section>
</template>
<script>
    import liquidFill from  "echarts-liquidfill";
    import eCharts from "echarts";
    import {oneOf} from "@/utils/assist";
    import guid from '@/utils/guid';
    import {getApiSource} from '@/utils/getApiData'
    export default {
        props: {
            width: {type: [Number, String], default: 250}, // 宽度
            height: {type: [Number, String], default: 250}, // 高度
            shape: {  // 形状
                type: String,
                default: "circle",
                validator(value) {
                    return oneOf(value, ['circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'container']);
                }
            },
            radius: { // 半径
                type: Number | String,
                default: 0.8

            },
            borderDistance: { // 内部距离
                type: Number | String,
                default: 10
            },
            borderWidth: { // 边框宽度
                type: Number | String,
                default: 10
            },
            borderColor: { // 边框颜色
                type:String,
                default:'#1B5EFF'
            },
            xTitle: {
                type:String,
                default:''
            }, // 标题文字
            // xTitleFontSize: { // 标题字体大小
            //     type: Number | String,
            //     default: 12
            // },
            // xTitleFont: {
            //     type: String,
            //     default: "Microsoft Yahei"
            // },
            // xTitleColor: {type: String, default: '#fff'}, // 字体颜色
            xVal: { // 百分比
                type: Number | String,
                default: 0
            },
            xValFontSize: { // 标题字体大小
                type: Number | String,
                default: 24
            },
            xValFont: {
                type: String,
                default: "AgencyFBBold"
            },
            xValColor: {type: String, default: '#fff'}, // 字体颜色
            waveColor: {type: String, default: '#1B5EFF'}, // 波浪颜色
            waveAnimation: {type: String | Boolean, default: true}, // 波浪动画

            dataType: {type: String, default: 'Static'},
            apiUrl: {type: String},
            staticData: {
                type: Array, default: []
            },
            x: {type: String, default: 'x'},
            y: {type: String, default: 'y'},

        },
        data(){
            return {
                liqId: guid(),
                xVal1:'',
                xTitle1:''
            }
        },
        mounted(){
          this.$nextTick(()=>{
              setTimeout(()=>{
                  this.InitChart();
              })
          })
        },
        computed:{
            container(){
                return {
                    width: `${this.width}px`,
                    height: `${this.height}px`,
                }
            },
        },
        methods: {
         async InitChart(){
                // 数据处理
                let dataJson = await getApiSource(this.dataType,this.apiUrl,this.staticData);                
                this.xVal1 = dataJson[0][this.y]
                this.xTitle1 = dataJson[0][this.x]                
                let option = {
                    series: [{
                        type: 'liquidFill',
                        shape:this.shape, // 形状
                        color:[this.waveColor],
                        radius:`${this.radius*100}%`, // 半径
                        data: [{value:this.xVal1,name:this.xTitle1}],
                        waveLength: "80%",
                        waveAnimation:eval(this.waveAnimation),
                        center: ["50%", "50%"],
                        itemStyle: {
                            normal: {
                                shadowBlur: 0
                            }
                        },
                        outline: { // 外边框
                            borderDistance: this.borderDistance, // 间距
                            itemStyle: {
                                borderWidth: this.borderWidth, // 宽度
                                borderColor: this.borderColor, // 颜色
                            }
                        },
                        label: {
                            //  normal: {
                                show:false,
                                fontSize: this.xValFontSize,
                                fontFamily: this.xValFont,
                                color: this.xValColor                                
                                //  formatter: [
                                //       "{title|" + this.xTitle1 + "}",
                                //       "{percent|" + this.xVal1*100 + "%" + "}"
                                //   ].join("\n"),
                                //   formatter:this.xVal1*100 + "%",                                  
                                 
                                //   rich: {
                                //       title: {
                                //           fontSize: this.xTitleFontSize,
                                //           fontFamily: this.xTitleFont,
                                //           color: this.xTitleColor,
                                //           align: "center",
                                //           padding: [15, 0, 9, 0]
                                //       },
                                //       percent: {
                                //           fontSize: this.xValFontSize,
                                //           fontFamily: this.xValFont,
                                //           color: this.xValColor
                                //       }
                                //   }
                            //  }
                        }
                    }]
                };                       
                if(document.getElementById(this.liqId)){
                    let chart = eCharts.init(document.getElementById(this.liqId));
                    chart.setOption(option);
                }
            }
        },
        deactivated() {
            this.$destroy();
        }
    }
</script>