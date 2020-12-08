<template>
    <div class="itemwrapper">
        <div class="onenum" v-for="(itemnum, index) in beforearr">
            <img :src='getPicPath'>
            <count-to class="numitem" :startVal='startVal' :endVal='parseInt(itemnum)' :duration='5000'></count-to>
        </div>
        <span v-show="isshowPoint" class="point">.</span>
        <div class="onenum" v-for="(itemnum, index) in afterarr">
            <img :src='getPicPath'>
            <count-to class="numitem" :startVal='startVal' :endVal='parseInt(itemnum)' :duration='5000'></count-to>
        </div>
    </div>
</template>

<script>
    import countTo from "vue-count-to";
    export default {
        props: {
            endVal: {
                type: Number,
                default() {
                    return 0;
                }
            },
            order: {
                type: String,
                default() {
                    return "1";
                }
            }
        },
        data() {
            return {
                startVal: 0,
                beforearr: [],
                afterarr: [],
                isshowPoint: true
            };
        },
        computed:{
            getPicPath(){
                if(this.order==1){
                    return '..//../static/images/numblock1bk.png'
                }else{
                    return '..//../static/images/numblock2bk.png'
                }
            }
        },
        mounted(){
            this.$nextTick(function () {
                let enddata = this.endVal + "";
                let arrdata = enddata.split(".");
                this.dealData(arrdata)
            });
        },
        components: {countTo},
        watch: {
            endVal: function (newval, oldval) {
                this.$nextTick(function () {
                    let enddata = newval + "";
                    let arrdata = enddata.split(".");
                    this.dealData(arrdata)
                });
            }
        },
        methods:{
            dealData(arrdata){
               //  是整数
                if (arrdata.length == 1) {
                    this.beforearr = arrdata[0].split("");
                    this.afterarr = [];
                    this.isshowPoint = false;
                } else {
                    //小数
                    this.beforearr = arrdata[0].split("");
                    this.afterarr = arrdata[1].split("");
                    this.isshowPoint = true;
                    if (this.afterarr.length == 1) {
                        this.afterarr.push("0");
                    }
                }
            }
        }
    };
</script>

<style scoped lang='less' type="text/less">
    .itemwrapper {
        position: relative;
        color: white;

        .onenum {
            display: inline-block;
            margin-bottom: 20px;
            position: relative;
            margin-left: 5px;
            left: 5px;

            .numitem {
                position: absolute;
                top: -3px;
                left: 7px;
                font-size: 30px;
                color: white;
                font-family: AgencyFBBold;
                font-weight: bold;

            }
        }

        .point {
            display: inline-block;
            font-size: 40px;
            color: white;
            position: absolute;
            bottom: 20px;
        }
    }
</style>
