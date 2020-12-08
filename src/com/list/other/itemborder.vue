<template>
    <div class="itemwrapper" @click="bindEvent">
        <div class="wrapper">
            <div class="solidborder" :style='container'  ref="bordertitletype">
                <slot class="slottype"></slot>
            </div>
            <img :height='titleHeightaf' :style='{top:-titleHeight/2+"px"}' class="bordertop" src='../../../../static/images/itemtitle.png'></img>
            <span :height='titleHeightaf' :style='titlestyle' class="bordertitle">{{maintitle}}</span>
            <span class="lefttop"></span>
            <span class="leftbot"></span>
            <span class="righttop"></span>
            <span class="rightbot"></span>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            // 标题
            maintitle: {type: String,default() {return "缺省";}},
            // 内容框的宽度
            width: {type: String | Number,default() {return 600;}},
            // 内容框的高度
            height: {type:  String | Number,default() {return 252;}},
            // 标题高度
            titleHeight:{type:String | Number,default(){return 42}},
            //标题字体大小
            titleFont:{type:String | Number,default(){return 24}},
            // 字体
            titlefamily:{type:String},
            // 颜色
            titleColor:{type:String},
            // 粗细
            titleSize:{type:String},

        },
        mounted() {
            setTimeout(() => {
                 this.$emit('count', {
                    count: 1,
                    data: [{
                        title: '业务组件边框',
                        xid: 1
                    }]
                });
            }, 20);

        },
        computed:{
            container(){
                return{
                    width:`${this.width}px`,
                    height:`${this.height}px`
                }
            },
            titlestyle(){
                return{
                    lineHeight : this.titleHeightaf,
                    top:-this.titleHeight/2+"px",
                    fontSize:this.titleFont+"px",
                    fontFamily:this.titlefamily,
                    color:this.titleColor,
                    fontWeight:this.titleSize

                }
            },
            titleHeightaf:function(){
                return this.titleHeight+'px'
            }
        },
        methods:{
            bindEvent(){
                // 注册内部元素点击事件
                this.$emit('callback', {
                    type: 'click',
                    data: {
                        title: '业务组件边框',
                        xtype: 1
                    }
                })
            },
        }

    };
</script>
<style scoped lang="less" type="text/less">
    .itemwrapper {
        color: white;
        .wrapper {
            position: relative;
            .solidborder {
                margin: 0 auto;
                border: 1px solid #225db6;
                border-top:none;
                .slottype {
                    width: 100%;
                    height: 100%;
                }
            }
            .bordertitle {
                display: inline-block;
                width: 100%;
                position: absolute;
                top: 0px;
                left:0;
                text-align: center;
            }
            .bordertop {
                display: inline-block;
                position: absolute;
                top: 0px;
                left:0px;
                width: 100%;
            }
            .lefttop,.leftbot,.righttop,.rightbot {
                display: inline-block;
                width: 9px;
                height: 9px;
                position: absolute;
            }
            .lefttop {
                background: url("../../../../static/images/left-top.png");
                top: 1px;
                left: 1px;
            }
            .leftbot {
                background: url("../../../../static/images/left-bot.png");
                bottom: 2px;
                left: 2px;
            }
            .righttop {
                background: url("../../../../static/images/right-top.png");
                top: 1px;
                right: 2px;
            }
            .rightbot {
                background: url("../../../../static/images/right-bot.png");
                bottom: 2px;
                right: 2px;
            }
        }
    }
</style>
