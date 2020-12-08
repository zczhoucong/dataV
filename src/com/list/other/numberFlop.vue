<!--
组件名称：数字翻转器
作    者：高春超
-->
<template>
    <div class="com-number-flop" :style="container">
        <div class="flop-first" :style="firstStyle">{{prefix}}</div>
        <count-to v-if="animate" class="flop-text" :style="textStyle" :separator="''" :startVal='0'
                  :endVal='parseFloat(textNumber)' :duration='3000' :decimals="pointNumber"></count-to>
        <div v-else class="flop-text" :style="textStyle">{{text}}</div>
        <div class="flop-last" :style="lastStyle">{{suffix}}</div>
    </div>
</template>
<script>
    import countTo from 'vue-count-to'
    import {getApiSource} from '@/utils/getApiData'
    export default {
        name: 'numberFlop',
        components: {countTo},
        props: {
            width: {type: [Number, String], default: 250}, // 宽度
            height: {type: [Number, String], default: 100}, // 高度
            animate: {type: Boolean, default: false}, //
            size: {type: Number, default: 22}, // 字号
            pointNum: {type: [Number, String], default: ''}, // 小数点位数
            family: {  // 字体
                type: String,
                default: "AgencyFBBold"
            },
            weight: {  // 字体粗细
                type: String,
                default: "bold"
            },
            color: {type: String, default: '#FFF600'}, // 字体颜色
            dataType: {type: String, default: 'Static'},
            apiUrl: {type: String},
            staticData: {
                type: Array, default: () => {
                    return []
                }
            },
            firSize: {type: Number, default: 22}, // 字号
            firFamily: {  // 字体
                type: String,
                default: "Microsoft Yahei"
            },
            firWeight: {  // 字体粗细
                type: String,
                default: "bold"
            },
            firColor: {type: String, default: '#FFF'}, // 字体颜色
            prefix: {type: String, default: ''},
            latSize: {type: Number, default: 22}, // 字号
            latFamily: {  // 字体
                type: String,
                default: "Microsoft Yahei"
            },
            latWeight: {  // 字体粗细
                type: String,
                default: "bold"
            },
            latColor: {type: String, default: '#FFF'}, // 字体颜色
            suffix: {type: String, default: ''},
            text: {type: String, default: 'text'},
            activeAttr: {type: Object, default: ()=>{
                return {}
            }}
        },
        data(){
            return {
                pointNumber: 0,
                textNumber: 0,
                dataArray: {}
            }
        },
        computed: {
            container(){
                return {
                    width: `${this.width}px`,
                    height: `${this.height}px`,
                    lineHeight: `${this.height}px`
                }
            },
            textStyle(){
                return {
                    color: `${this.color}`,
                    fontSize: `${this.size}px`,
                    fontFamily: `${this.family}`,
                    fontWeight: `${this.weight}`,
                };
            },
            firstStyle(){
                return {
                    color: `${this.firColor}`,
                    fontSize: `${this.firSize}px`,
                    fontFamily: `${this.firFamily}`,
                    fontWeight: `${this.firWeight}`,
                };
            },
            lastStyle(){
                return {
                    color: `${this.latColor}`,
                    fontSize: `${this.latSize}px`,
                    fontFamily: `${this.latFamily}`,
                    fontWeight: `${this.latWeight}`,
                };
            },
        },
        mounted(){
            this.$nextTick(() => {
                this.init();
            })
        },
        watch: {
            dataArray(){
                this.activeEvent();
            },
            activeAttr(val){
                this.activeEvent();
            }
        },
        methods: {
            //交互时间外参响应事件
            activeEvent(){
                let json = {};
                Object.keys(this.activeAttr).forEach(i => {
                    if (this.dataArray[i]) {
                        json[this.activeAttr[i]] = this.dataArray[i];
                    }
                })
                if (Object.keys(json).length>0) {
                    this.$store.dispatch('setKeys', JSON.parse(JSON.stringify(json)))
                }
            },
            async init(){
                let dataJson = await getApiSource(this.dataType, this.apiUrl, this.staticData);
                if (dataJson.length === 0) return;
                this.dataArray = dataJson[0];
                this.textNumber = dataJson[0][this.text];
                const index = this.textNumber.toString().indexOf('.');
                if (index === -1) {
                    this.pointNumber = 0;
                } else {
                    this.pointNumber = this.textNumber.toString().length - (index + 1);
                }
                if (this.pointNum.toString().length > 0 && typeof eval(this.pointNum) === 'number') {
                    this.pointNumber = eval(this.pointNum);
                }
            }
        }
    }
</script>
<style lang="less" type="text/less" scoped>
    .com-number-flop {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: baseline;
        justify-content: center;
        .flop-first {
            float: left;
        }
        .flop-text {
            float: left;
        }
        .flop-last {
            float: left;
        }
    }
</style>