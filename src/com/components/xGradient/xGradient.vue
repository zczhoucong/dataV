<!--
说明：渐变颜色组件
作者：高春超
时间：2018-5-3 14:00:02
-->
<template>
    <div class="color-gradient-box">
        <Form :label-width="80">
            <FormItem label="开始颜色">
                <ColorPicker alpha v-model="topColor" @on-change="changeColor"/>
            </FormItem>
            <FormItem label="结束颜色">
                <ColorPicker alpha v-model="downColor" @on-change="changeColor"/>
            </FormItem>
            <FormItem label="渐变方向">
                <Slider v-model="linear" :max="360" @on-change="changeColor"></Slider>
            </FormItem>
        </Form>
    </div>
</template>
<script>
    export default {
        name: 'xGradient',
        props:{
            idx:{
              type:[String , Number],
                default:''
            },
            top:{
                type:String,
                default:'#fff'
            },
            down:{
                type:String,
                default:'#00c1de'
            },
            rotate:{
                type:Number | String,
                default:90
            }
        },
        data(){
            return {
                topColor: this.top,
                downColor: this.down,
                linear: this.rotate,
                index:this.idx
            }
        },
        computed: {
            linearStyle(){
                return {
                    background: `linear-gradient(${this.linear}deg, ${this.topColor}, ${this.downColor})`
                }
            }
        },
        methods: {
            changeColor(){
                let params={
                    top: this.topColor,
                    down: this.downColor,
                    rotate: this.linear
                };
                if(this.index!=undefined){
                    params.index=this.index;
                }
                this.$emit('on-change', params)
            }
        }
    }
</script>
<style lang="less" type="text/less">
    .color-gradient-box {
        width: 100%;
        height: 100%;
        // background-color: #fff;
        .linear-color {
            height: 20px;
            margin-top: 10px;
            background-color: #00c1de;
        }
    }
</style>