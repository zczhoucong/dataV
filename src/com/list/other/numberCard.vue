<!--
组件名称：卡片翻牌器
作    者：高春超
-->
<template>
    <div class="itemwrapper" :style='container'>
        <div :style='numBlock' class="onenum" v-for="(itemnum, index) in beforearr">
            <count-to :style='numVal' :startVal='startVal' :endVal='parseInt(itemnum)'
                      :duration='5000'></count-to>
        </div>
        <span :style='font' v-show="isAllNum" class="point">.</span>
        <div :style='numBlock' class="onenum" v-for="(itemnum, index) in afterarr">
            <count-to :style='numVal' :startVal='startVal' :endVal='parseInt(itemnum)'
                      :duration='5000'></count-to>
        </div>
    </div>
</template>

<script>
    import {getApiSource} from '../../../utils/getApiData'
    import countTo from "vue-count-to";
    export default {
        components: {countTo},
        props: {
            order: {type: String, default: "样式1"},
            width: {type: [Number, String], default: 203}, // 宽度
            height: {type: [Number, String], default: 105}, // 高度
            pointSize: {type: [Number, String], default: 50},//字体大小
            pointNum: {type: [Number, String],default:''}, // 小数点位数
            numSize: {type: [Number, String], default: 50},//数字大小
            numColor: {type: String, default: '#fff'},
            family: {type: String, default: "AgencyFBBold"}, // 字体
            weight: {type: String, default: "bold"}, // 字体粗细
            dataType: {type: String, default: 'Static'},
            apiUrl: {type: String},
            staticData: {
                type: Array, default: () => {
                    return []
                }
            },
            text: {type: String, default: 'text'}
        },
        data() {
            return {
                startVal: 0,
                endVal: 0,
            };
        },
        computed: {
            beforearr(){
                const enddata = this.endVal + "";
                let arrdata = enddata.split(".");
                return arrdata[0].split("");

            },
            isAllNum(){
                const data = (this.endVal + "").split('.');
                if (eval(this.pointNum) === 0 || data.length === 1) {
                    return false;
                } else {
                    return true
                }
            },
            afterarr(){
                // 判断数值的小数点位数是否小于pointNum，如果大于则截取，如果小于则补全
                const enddata = this.endVal + "";
                let arrdata = enddata.split(".");
                //  是整数
                if (arrdata.length === 1) {
                    return [];
                } else {
                    //小数
                    const _ready = arrdata[1].split("");
                    return _ready;
                }
            },
            container(){
                return {
                    width: `${this.width}px`,
                    height: `${this.height}px`,
                }
            },
            font(){
                return {
                    display: 'inline-block',
                    width: '5%',
                    height: '100%',
                    color: this.numColor,
                    fontSize: `${this.pointSize}px`
                }
            },
            numVal(){
                return {
                    color: this.numColor,
                    fontSize: this.numSize + 'px',
                    fontFamily: this.family,
                    fontWeight: this.weight,
                    textAlign: 'center',
                    width: '100%',
                    lineHeight: `${this.height}px`
                }
            },
            numBlock(){
                const tempstr = this.endVal;
                const temparr = (tempstr + "").split('.');
                let totalNum = 0
                if (temparr[0] != '' && temparr[0] != null) {
                    totalNum += temparr[0].split('').length;
                }
                if (temparr[1] != '' && temparr[1] != null) {
                    totalNum += temparr[1].split('').length;
                }
                let backgroundImg = `url("../../../../static/numCard1.png") no-repeat`;
                if (this.order === '样式2') {
                    backgroundImg = `url("../../../../static/numCard2.png") no-repeat`;
                }
                return {
                    width: `${Math.floor(Math.floor(this.width - Math.ceil((this.width) * 0.1)) / totalNum)}px`,
                    height: '100%',
                    background: backgroundImg,
                    backgroundSize: 'cover'
                }
            }
        },
        mounted(){
            this.$nextTick(() => {
                this.init();
            })
        },
        methods: {
            async init(){
                let dataJson = await getApiSource(this.dataType, this.apiUrl, this.staticData);
                if (dataJson.length === 0) return;
                this.endVal = dataJson[0][this.text];
                const _data=(this.endVal+"").split(".");
                if(this.pointNum.toString()!=''){
                    if(eval(this.pointNum)===0){
                        this.endVal=_data[0];
                        return;
                    }
                    if(_data.length===1&&eval(this.pointNum)>0){
                        const _point= new Array(this.pointNum);
                        this.endVal=this.endVal+"."+ _point.fill(0).join("");
                        return;
                    }
                    if(_data.length>1&&eval(this.pointNum)>0){
                        const _ready = _data[1].split("");
                        if (_ready.length >= this.pointNum) {
                            this.endVal=_data[0]+"."+_ready.slice(0, this.pointNum).join("");
                        } else {
                            let point = new Array(this.pointNum - _ready.length);
                            this.endVal=_data[0]+"."+ [..._ready, ...point.fill(0)].join("")
                        }
                        return;
                    }
                }
            }
        }
    };
</script>

<style lang="less" type="text/less" scoped>
    .itemwrapper {
        z-index: 999;
        text-align: center;
        overflow: hidden;
        .onenum {
            display: inline-block;
            position: relative;
            overflow: hidden;
        }

        .point {
            display: inline-block;
            position: relative;
            bottom: 20px;
        }
    }
</style>
