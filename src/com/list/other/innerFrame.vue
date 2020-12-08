<!--
组件名称：内联框架
作    者：高春超
创建时间：2018年6月11日13:53:15
-->
<template>
    <div :style='container'>
        <iframe :src="linkHref" style="width:100%;height:100%;" :scrolling="frameSroll" v-show="linkHref"></iframe>
    </div>
</template>

<script>
    export default {
        props: {
            width: {type: [Number, String], default: 403}, // 宽度
            height: {type: [Number, String], default: 305}, // 高度
            borderShow:{type:Boolean,default:false}, // 隐藏边框
            scrollType:{type:String,default:'frame_auto'}, // 滚动条类型
            linkHref:{type:String,default:''}, // 链接地址
        },
        data() {
            return {

            };
        },
        computed: {
            container(){
                return {
                    width: `${this.width}px`,
                    height: `${this.height}px`,
                    border:!this.borderShow?'10px solid #ddd':'none'
                }
            },
            frameSroll(){
                return this.scrollType.split('_')[1]
            }
        },
        mounted(){
            this.$nextTick(() => {
            })
        },
        methods: {
        }
    };
</script>
