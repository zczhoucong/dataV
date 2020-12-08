<!--自定义弹出层 暂未使用-->
<template>
    <div v-transfer-dom :data-transfer="transfer">
        <div class="def-dialog-box" v-show="visible">
            <transition :name="transitionNames[1]">
                <div class="def-dialog-mask" v-show="visible" @click="close"></div>
            </transition>
            <div class="def-dialog-wrap">
                <transition :name="transitionNames[0]">
                    <div class="def-dialog" :style="mainStyles" v-show="visible">
                        <a class="def-dialog-close" @click="close" :style="closeColor">
                            <Icon type="close" size="18" color="#fff"></Icon>
                        </a>
                        <div class="def-dialog-body">
                            <iframe :src="href" frameborder="0" style="width:100%;height: 100%;"></iframe>
                        </div>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>
<script>
    import TransferDom from '@/directives/transfer-dom'
    export default{
        props: {
            value: { // 是否显示弹框
                type: Boolean,
                default: false
            },
        },
        data(){
            return {
                visible: this.value,
                transfer:true,
                transitionNames:['ease', 'fade'],
                outerColor:'#397ddf',
                width:520,
                height:520,
                href:''
            }
        },
        directives: {TransferDom},
        watch: {
            value(val){
                this.visible = val;
            }
        },
        computed: {
            // 弹出框样式
            mainStyles () {
                let style = {};
                const width = parseInt(this.width);
                const height = parseInt(this.height);
                style={
                    width: width <= 100 ? `${width}%` : `${width}px`,
                    height: height <= 100 ? `${height}%` : `${height}px`,
                    boxShadow:`5px 5px 5px ${this.outerColor},-5px -5px 5px ${this.outerColor},-5px 5px 5px ${this.outerColor}`
                }
                return style;
            },
            // 关闭按钮颜色
            closeColor(){
                return {
                    backgroundColor:this.outerColor
                }
            }
        },
        methods: {
            close(){
                this.visible = false;
                setTimeout(() => {
                    this.$destroy();
                    document.body.removeChild(this.$el);
                }, 300);
            }
        }
    }
</script>
<style type="text/less" lang="less">
    @zIndex: 10000;
    .def-dialog-box {
        .def-dialog-mask {
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            background-color: rgba(55, 55, 55, 0.6);
            height: 100%;
            z-index: @zIndex
        }
        .def-dialog-wrap {
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: @zIndex;
            outline: 0;
            .def-dialog {
                width: auto;
                margin: 0 auto;
                position: relative;
                outline: 0;
                top: 100px;
                .def-dialog-close{
                    position:absolute;
                    z-index: 100000;
                    top:-16px;
                    border-radius:50%;
                    width:32px;
                    height:32px;
                    text-align: center;
                    padding-top:8px;
                    right:-16px;
                }
                .def-dialog-body{
                    position: relative;
                    background-color: rgb( 16, 27, 62);
                    width:100%;
                    height:100%;
                }
            }
        }
    }
</style>