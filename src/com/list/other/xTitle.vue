<template>
    <section :style="container" class="text-box">
        <div :class="direction==='vertical'?'text-vertical':'text-horizontal'" :style="textStyle"
             @click="showWindowPage">{{text}}
        </div>
    </section>
</template>
<script>
    export default {
        name: 'xTitle',
        props: {
            width: {type: [Number, String], default: 250}, // 宽度
            height: {type: [Number, String], default: 100}, // 高度
            size: {type: Number, default: 22}, // 字号
            href: {type: String, default: ''}, // 超链接地址
            bgColor: {type: String,default:''}, // 背景颜色
            bgRadius: {type: [Number, String], default: 0}, // 背景圆角
            target: {type: Boolean | String, default: false},// 打开新窗口
            family: {  // 字体
                type: String,
                default: "Microsoft Yahei"
            },
            weight: {  // 字体粗细
                type: String,
                default: "bold"
            },
            color: {type: String, default: '#000'}, // 字体颜色
            space: {type: Number, default: 10}, // 文字间隔
            text: {type: String, default: ''},
            direction: { // 文字方向 水平/垂直
                type: String,
                default: "vertical"
            }
        },
        computed: {
            container(){
                return {
                    width: `${this.width}px`,
                    height: `${this.height}px`,
                }
            },
            textStyle(){
                let text = {
                    color: `${this.color}`,
                    letterSpacing: `${this.space}px`,
                    fontSize: `${this.size}px`,
                    fontFamily: `${this.family}`,
                    fontWeight: `${this.weight}`,
                    borderRadius:`${this.bgRadius}%`
                };
                if (this.bgColor.length > 0) {
                    text.backgroundColor = `${this.bgColor}`;
                }
                let def = {};
                if (this.direction === 'vertical') {
                    def = {
                        width: `${this.width}px`,
                        fontSize: `${this.size}px`,
                        padding: `0 ${(this.width - this.size) / 2}px`
                    };
                } else {
                    def = {
                        lineHeight: `${this.height}px`,
                        fontSize: `${this.size}px`,
                    }
                }
                return Object.assign(text, def);
            }
        },
        methods: {
            showWindowPage(){
                // screen 页面禁止弹出
                if (window.location.href.indexOf('screen') > 0) {
                    return;
                }
                debugger
                const href = this.href.trim();
                if (href.length === 0) {
                    return;
                } else {
                    if (href.indexOf('http') === -1) {
                        return;
                    } else {
                        if (eval(this.target)) {
                            window.open(href, '_blank');
                        }
                    }
                }
            }
        }
    }
</script>
<style>
    .text-box {
        position: relative;
        cursor: pointer;
    }

    /*垂直样式*/
    .text-vertical {
        position: absolute;
        top: 50%;
        text-align: center;
        transform: translateY(-50%);
        word-break: break-all;
    }

    .text-horizontal {
        text-align: center;
    }
</style>