<style>
    .icon-stat-com {
        position: relative;
        float: left;
        color: #fff;
    }

    .icon-stat-title {
        height: 25px;
        line-height: 25px;
    }

    .icon-stat-box {
        background: url("images/inner-border.png") no-repeat;
        background-size: 100% 100%;
        height: 60px;
        width: 280px;
    }
    .icon-stat-box:hover{
        border:1px solid #4c88f7;
    }
    @keyframes breath {
        0%{
            box-shadow: 5px 5px 5px rgba(255,0,0,.5) inset, -5px -5px 5px rgba(255,0,0,.5) inset;
        }
        100%{
            box-shadow: 10px 10px 10px rgba(255,0,0,.8) inset, -10px -10px 10px rgba(255,0,0,.8) inset;
        }
    }
    .icon-stat-aminate{
        background: url("images/inner-border-hover.png") no-repeat;
        background-size: 100% 100%;
        height: 60px;
        width: 280px;
        box-shadow: 5px 5px 5px rgba(255,0,0,.5) inset, -5px -5px 5px rgba(255,0,0,.5) inset;
        animation:breath 2s infinite linear;
    }
    .icon-stat-img{
        background: url("./images/icon.png") no-repeat;
        width:60px;
        height:60px;
        background-position: center;
        float: left;
    }
    .icon-stat-ul{
        float: left;
        height:100%;
        width:calc(100% - 70px);
    }
    .icon-stat-ul li{
        float: left;
        height:100%;
        width:calc(100% / 3);
        text-align: center;
        cursor: pointer;
    }
    .icon-stat-ul li p{
        width:100%;
        height:22px;
        line-height:30px;
    }
    .icon-stat-ul li span{
        width:100%;
        height:30px;
        line-height:30px;
        display: inline-block;
        font-family: 'AgencyFBBold';
        font-size:28px;
        color:#4c88f7;
        background: linear-gradient(to bottom, #4c88f7,#29befb, #04f6ff);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
</style>
<!--带图标分类统计-->
<template>
    <section class="icon-stat-com">
        <p class="icon-stat-title">{{title}}</p>
        <div :class="breath?'icon-stat-aminate':'icon-stat-box'" ref="statBox">
            <!--左边图标-->
            <div class="icon-stat-img"></div>
            <ul class="icon-stat-ul">
                <li v-for="item in items">
                    <p>{{item.name}}</p>
                    <span>
                        <b>{{item.value.replace('%','')}}</b>
                        <b style="font-size:18px" v-if="item.value.indexOf('%')>0">%</b>
                    </span>
                </li>
            </ul>
        </div>
    </section>
</template>
<script>
    export default{
        props: {
            width: {type: [Number, String], default: 80}, // 宽度
            height: {type: [Number, String], default: 280}, // 高度
            title: {type: String, default: '常住人口人均GDP（万元/人）'},
            icon: {type: String, default: ''},
            items: {
                type: Array,
                default: function () {
                    return [{
                        name: '现状',
                        value: '864'
                    }, {
                        name: '2020规划',
                        value: '864'
                    }, {
                        name: '2035规划',
                        value: '821'
                    }]
                }
            },
            aminate: {type: Boolean, defalut: false},

        },
        data(){
            return {
                breath:this.aminate  // 呼吸效果
            }
        },
        mounted(){
            setTimeout(()=>{
                this.breath=false;
            },4000)
        },
        methods: {

        }
    }
</script>