<template>
    <div class="slider" ref="slider">
        <div class="slider-group" ref="sliderGroup">
            <slot>
            </slot>
        </div>
        <div class="dots" v-if="false">
            <span class="dot" v-for="(item,index) in dots" :class="{active:currentPageIndex===index}"></span>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import BScroll from "better-scroll";
import { addClass } from "utils/dom.js";
var tempPageIndex = 0;
export default {
  data() {
    return {
      dots: [],
      currentPageIndex: 0,
      changesign:true
    };
  },
  props: {
    loop: {
      type: Boolean,
      default: false //改为不是循环的
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 10000
    }
  },
  mounted() {
    setTimeout(() => {
      this._setSliderWidth();
      this._initDots();
      this._initSlider();
      if (this.autoPlay) {
        this._play();
      }
    }, 20);
    window.addEventListener("resize", () => {
      if (!this.slider) {
        return;
      }
      this._setSliderWidth(true);
      this.slider.refresh();
    });
  },
  methods: {
    // 刷新一下轮播组件
    refreshLB(){
      if(!this.slider){
          return
      }
      this._setSliderWidth(true)
      this.slider.refresh()
    },
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
    _initDots() {
      this.dots = new Array(this.children.length);
    },
    _initSlider() {
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: true,
        snapLoop: this.loop,
        snapThreshold: 0.3,
        snapSpeed: 400
      });
      this.slider.on("scrollEnd", () => {
        let pageIndex = this.slider.getCurrentPage().pageX;
        if (this.loop) {
          pageIndex -= 1;
        }
        tempPageIndex = pageIndex;
        this.currentPageIndex = pageIndex;
        if (this.autoPlay) {
          clearTimeout(this.timer);
          this._play();
        }
      });
    },
    _play() {
      let pageIndex = this.currentPageIndex + 1;
      if (this.loop) {
        pageIndex += 1;
      }
      if (tempPageIndex == 1) {
        this.timer = setTimeout(() => {
        //   this.slider.goToPage(0, 0, 400);
        }, this.interval);
      } else {
        this.timer = setTimeout(() => {
        //   this.slider.goToPage(pageIndex, 0, 400);
        }, this.interval);
      }
    },
    removeplay() {
        this.changesign = false;
        clearTimeout(this.timer);
    },
  },
  destroyed() {
    clearTimeout(this.timer);
  },
  
 
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
  .dots {
    position: absolute;
    right: 0;
    left: 0;
    bottom: 12px;
    text-align: center;
    font-size: 0;
    .dot {
      display: inline-block;
      margin: 0 4px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #aaa;
      &.active {
        width: 20px;
        border-radius: 5px;
        background: #000;
      }
    }
  }
}
</style>