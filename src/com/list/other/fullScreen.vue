<template>
    <div class="fullScreen">
        <div class="imgBox" :style="boxStyle" @click="isFullScreen">
            <img :src="bgImg">
        </div>        
    </div>

</template>

<script>
    export default {
        props: {
            width: {
                type: Number,
                default: 100
            },
            height: {
                type: Number,
                default: 100
            },
            fullImg: {
                type: String,
                default: require('../../../images/com/other/full.png')
            },
            exitImg: {
                type: String,
                default: require('../../../images/com/other/exit.png')
            },        
            bgColor: {
                type: String,
                value: ''
            },
            bgRadius: {
                type: Number,
                value: 0
            },
        },
        data() {
            return {
                isFull: true, // 标识，是否全屏
                isOpa: 0,
            }
        },
        computed: {
            boxStyle() {
                return {
                    backgroundColor: `${this.bgColor}`,
                    borderRadius: `${this.bgRadius}px`,
                    // opacity: this.isOpa
                }
            },
            bgImg() {
                if (this.isFull) {
                    return this.fullImg
                } else {
                    return this.exitImg
                }
            }
        },
        mounted() {
             this.checkFull()
            window.onresize = () => {
                this.checkFull()
            }      
        },
        methods: {
            // 全屏显示或者退出全屏
            isFullScreen(event) {              
                if ($('#dragView')[0]) return;// 在编辑页面禁止点击事件
                if (this.isFull) {
                    // 全屏显示 h5新接口，进行兼容性判断
                    let el = document.documentElement;
                    let rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullscreen;      
                    if(typeof rfs != "undefined" && rfs) {
                        rfs.call(el);
                    };             
                } else {
                    // 退出全屏
                    let el = document;
                    let rfs = el.exitFullscreen || el.mozCancelFullScreen || el.webkitCancelFullScreen || el.msExitFullscreen;      
                    if(typeof rfs != "undefined" && rfs) {
                        rfs.call(el);
                    };                                      
                }
            },
            //判断全屏状态
            checkFull() {                
                let fullscreenElement =
                    document.fullscreenEnabled
                    || document.mozFullscreenElement
                    || document.webkitFullscreenElement
                    || document.msFullscreenEnabled || false;
                if (fullscreenElement == null) {
                    this.isFull = true;
                } else {
                    this.isFull = false;
                }
            }  
        },
    }
</script>

<style scoped lang="less">
    .fullScreen {
        width: 100%;
        height: 100%;        
        opacity: 0;
        &:hover {
            opacity: 1;
        }
        .imgBox {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            img {
                width: 70%;
                height: 70%;
            }
        }        
    }

</style>