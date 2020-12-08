<template>
    <div class="slider" ref="slider">
        <div class="slider-group" ref="sliderGroup">
            <slot>
            </slot>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import BScroll from "better-scroll";
    import {addClass} from "@/utils/dom";
    var tempPageIndex = 0
    export default {
        data() {
            return {
                // 当前页面索引
                currentPageIndex: 0,
            };
        },
        props: {
            loop: {
                type: Boolean,
                default: true
            },
            autoPlay: {
                type: Boolean,
                default: true
            },
            interval: {
                type: Number,
                default: 10000
            },
            childNum: {
                type: Number
            },
            scrollDir: {type: String, default: 'horizontal'},// 滚动方向
        },
        watch: {
            childNum(){
                this.update()
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.update()
                window.addEventListener('resize', () => {
                    if (!this.slider || !this.slider.enabled) {
                        return
                    }
                    clearTimeout(this.resizeTimer)
                    this.resizeTimer = setTimeout(() => {
                        if (this.slider.isInTransition) {
                            this._onScrollEnd()
                        } else {
                            if (this.autoPlay) {
                                this._play()
                            }
                        }
                        this.refresh()
                    }, 60)
                })
            })
        },
        activated() {
            if (!this.slider) {
                return
            }
            this.slider.enable()
            let pageIndex = this.slider.getCurrentPage().pageX;
            if (this.scrollDir != 'horizontal') { // 设置垂直滚动
                pageIndex = this.slider.getCurrentPage().pageY
            }
            this.slider.goToPage(pageIndex, 0, 0)
            this.currentPageIndex = pageIndex
            if (this.autoPlay) {
                this._play()
            }
        },
        deactivated() {
            this.slider.disable()
            clearInterval(this.timer)
        },
        methods: {
            refresh() {
                if (this.scrollDir === 'horizontal') { // 设置垂直滚动
                    this._setSliderWidth(true)
                } else {
                    this._setSliderHeight(true)
                }
                this.slider.refresh()
            },
            update() {
                if (this.slider) {
                    this.slider.destroy()
                }
                this.$nextTick(() => {
                    this.init()
                })
            },
            init() {
                clearInterval(this.timer)
                this.currentPageIndex = 0
                if (this.scrollDir === 'horizontal') { // 设置垂直滚动
                    this._setSliderWidth()
                } else {
                    this._setSliderHeight()
                }
                this._initSlider()
                if (this.autoPlay) {
                    this._play()
                }
            },
            // 从新设置滑块宽度
            _setSliderWidth(isResize) {
                this.children = this.$refs.sliderGroup.children;
                let width = 0;
                let sliderWidth = this.$refs.slider.clientWidth;
                for (let i = 0; i < this.children.length; i++) {
                    let child = this.children[i];
                    addClass(child, "slider-item");
                    child.style.width = sliderWidth + "px";
                    width += sliderWidth;
                }
                if (this.loop && !isResize) {
                    width += 2 * sliderWidth;
                }
                this.$refs.sliderGroup.style.width = width + "px";
            },
            // 设置滑块高度
            _setSliderHeight(isResize){
                this.children = this.$refs.sliderGroup.children
                let height = 0
                let slideHeight = this.$refs.slider.clientHeight
                for (let i = 0; i < this.children.length; i++) {
                    let child = this.children[i]
                    addClass(child, 'slide-item')
                    child.style.height = slideHeight + 'px'
                    height += slideHeight
                }
                if (this.loop && !isResize) {
                    height += 2 * slideHeight
                }
                this.$refs.sliderGroup.style.height = height + 'px'
            },
            // 初始化轮播实例
            _initSlider() {
                const option = {
                    scrollX: this.scrollDir === 'horizontal' ? true : false,
                    scrollY: this.scrollDir === 'horizontal' ? false : true,
                    momentum: false,
                    snap: {
                        threshold: 0.3,
                        speed: 400
                    }
                };
                this.slider = new BScroll(this.$refs.slider, option);
//                 当滑块停止时触发事件
                this.slider.on("scrollEnd", this._onScrollEnd);
                this.slider.on('beforeScrollStart', () => {
                    if (this.autoPlay) {
                        clearInterval(this.timer)
                    }
                })
            },
            _onScrollEnd() {
                let pageIndex = this.slider.getCurrentPage().pageX;
                if (this.scrollDir != 'horizontal') { // 设置垂直滚动
                    pageIndex = this.slider.getCurrentPage().pageY
                }
                this.currentPageIndex = pageIndex
                if (this.autoPlay) {
                    this._play()
                }
            },
            _play() {
                clearInterval(this.timer)
                this.timer = setInterval(() => {
                    if (this.scrollDir != 'horizontal') { // 设置垂直滚动
                        this.slider.goToPage(0, this.currentPageIndex, 400);
                    } else {
                        this.slider.goToPage(this.currentPageIndex, 0, 400);
                    }

                    this.currentPageIndex++;
                    if (this.currentPageIndex === this.childNum) {
                        this.currentPageIndex = 0;
                    }
                }, this.interval)
            },
        },
        destroyed(){
            clearInterval(this.timer)
            console.log("结束")
        }
    };
</script>

<style scoped lang="less" type="text/less">

    .slider {
        min-height: 1px;
        .slider-group {
            position: relative;
            overflow: hidden;
            white-space: nowrap;
            .slider-item {
                float: left;
                box-sizing: border-box;
                overflow: hidden;
                text-align: center;
                a {
                    display: block;
                    width: 100%;
                    overflow: hidden;
                    text-decoration: none;
                }
                img {
                    display: block;
                    width: 100%;
                }
            }
        }
    }
</style>