<template>
  <div class="selectorwrapper">
    <img class="lefticon" src="/../static/images/lefticon.png">
    <img class="righticon" src="/../static/images/righticon.png">
    <picker @mouseover.native="overpicker" @mouseout.native="outpicker" @change='getcurrindex' ref="pick">
    </picker>
  </div>

</template>
<script>
import picker from "./picker.vue";
import Vue from "vue";
export default {
  props: {
    dataitemarr: {
      type: [Array, String, Object],
      default: []
    },
    scrollTime: { type: [Number, String], default: 5000 }, // 滚动时长
    isLBAuto: { type: [Boolean], default: false }, //是否自动轮播
    comId:{type:[String,Number]},//业务组件的id
  },
  data: function() {
    return {
      myinterval: "",
      data1: [],
      currindex: ""
    };
  },
  components: {
    picker
  },
  mounted() {
    setTimeout(() => {
      // 处理数据
      this.dealData();
    }, 20);
  },
  methods: {
     // 清空该组件定时器
    clearTimer(){
        const timer = localStorage.getItem(`selector${this.comId}`);
        if (timer) {
            clearInterval(timer);
            localStorage.removeItem(`selector${this.comId}`);
        }
    },
    //处理数据
    dealData() {
      let that = this;
      //整合元数据
      if (this.dataitemarr == null || this.dataitemarr.length == 0) {
        clearInterval(that.myinterval);
        return;
      }
      for (let i = 0; i < 1; i++) {
        this.data1 = this.data1.concat(this.dataitemarr);
      }
      // 当前的索引
      this.currindex = Math.ceil(this.data1.length / 2);
      if (
        this.data1[this.currindex] == "" ||
        this.data1[this.currindex] == null
      ) {
        return;
      }
      this.$emit("selectitem", this.data1[this.currindex].text);
      this.$refs.pick.show();
      this.$refs.pick.setData([this.data1]);
    },
    // 鼠标在picker上，停止轮播
    overpicker: function() {
      // 清除计时器
      this.clearTimer();
      let that = this;
      clearInterval(that.myinterval);
    },
    // 鼠标离开picker，继续轮播
    outpicker: function() {
      // 因为每一会重新挂载组件，所以这里手动清理上一次的计时器
      this.clearTimer();
      let that = this;
      // 轮播
      if(this.isLBAuto){
         // 如果没有数据就不轮播
        if (that.dataitemarr == null || that.dataitemarr.length == 0) {
          clearInterval(that.myinterval);
          return;
        }
        that.myinterval = setInterval(function() {
          that.next();
        }, that.scrollTime);
        localStorage.setItem(`selector${this.comId}`, that.myinterval);
      }else{
          clearInterval(that.myinterval);
          that.myinterval=null
      }
    },
    getcurrindex(a, b) {
      this.currindex = b;
      if (
        this.data1[this.currindex] == "" ||
        this.data1[this.currindex] == null
      ) {
        return;
      }
      // 告诉父组件，当前选择的条目
      this.$emit("selectitem", this.data1[this.currindex].text);
    },

    // 切换到下一个
    next() {
      // 如果数据轮播序号大于90时，将当前的索引改为50
      if (this.currindex >= 90) {
        this.currindex = 50;
        //无缓冲滑动
        this.$refs.pick.scrollTo(0, this.currindex);
      } else {
        //有缓冲滑动
        this.$refs.pick.scrollTo2(0, ++this.currindex);
      }
      if (
        this.data1[this.currindex] != "" &&
        this.data1[this.currindex] != null
      ) {
        // 告诉父组件，当前选择的条目
        this.$emit("selectitem", this.data1[this.currindex].text);
      }
    }
  },
  watch: {
    dataitemarr: function(val, oldval) {
      //整合元数据
      for (let i = 0; i < 50; i++) {
        this.data1 = this.data1.concat(this.dataitemarr);
      }
      // 当前的索引
      this.currindex = Math.ceil(this.data1.length / 2);
      if (
        this.data1[this.currindex] == "" ||
        this.data1[this.currindex] == null
      ) {
        return;
      }
      this.$emit("selectitem", this.data1[this.currindex].text);
      this.$refs.pick.show();
      this.$refs.pick.setData([this.data1]);
    },
  }
};
</script>

<style  scoped lang="less" >
.selectorwrapper {
  width: 200px;
  height: 170px;
  position: relative;
  .lefticon {
    position: absolute;
    left: 0;
    top: 83px;
  }
  .righticon {
    position: absolute;
    right: 0;
    top: 83px;
  }
}
</style>
 