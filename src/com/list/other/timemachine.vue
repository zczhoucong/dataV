<template>
  <div :style="container" class="container">
    <img :src="icon" :style="iconStyle">
    <span :style="spanStyle">{{currentDate}}</span>
  </div>
</template>
<script>

export default {
  props: {
    // 图标尺寸
    width: { type: [Number, String] },
    height: { type: [Number, String] },
    // 时间器旋转角度
    rotationangle: { type: [Number, String] },
    // 时间器透明度
    transparency: { type: [Number, String] },
    // 时间器文本大小
    size: { type: [Number, String] },
    // 时间器文本颜色
    color: { type: String },
    // 时间器文本粗细
    weight: { type: String },
    // 时间器文本类型
    family: { type: String },
    // 时间器时间格式
    timeformatting: { type: String },
    // 时间器间隔时间
    intervaltime: { type: [Number, String] },
    // 时间器图标
    icon: { type: String },
    // 时间器图标看宽度
    iconwidth: { type: [Number, String] },
    // 时间器图标高度
    iconheight: { type: [Number, String] },
    // 时间器图标间隔
    iconmargin: { type: String },
  },
  data () {
    return {
      currentDate: ""
    }
  },
  computed: {
    container () {
      return {
        width: `${this.width}px`,
        height: `${this.height}px`,
        transform: `rotate(${this.rotationangle}deg)`,
        opacity: this.transparency
      };
    },
    iconStyle () {
      return {
        width: `${this.iconwidth}px`,
        height: `${this.iconheight}px`,
        margin: this.iconmargin
      }
    },
    spanStyle () {
      return {
        width: `${this.width - this.iconwidth}px`,
        height: `${this.height}px`,
        lineHeight: `${this.height}px`,
        fontSize: `${this.size}px`,
        color: this.color,
        fontFamily: this.family,
        fontWeight: this.weight
      }
    }
  },
  watch: {
  },
  created () {
    this.currentDate = this.timeformatting;
    this.timer = setInterval(() => {
      this.currentDate = this.handleGetTime();
    }, this.intervaltime);
  },
  mounted () {

  },
  methods: {
    handleGetTime (type) {
      let date = new Date();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      let hour = date.getHours();
      let minutes = date.getMinutes();
      let second = date.getSeconds();
      month = month.toString().length < 2 ? `0${month}` : month;
      day = day.toString().length < 2 ? `0${day}` : day;
      hour = hour.toString().length < 2 ? `0${hour}` : hour;
      minutes = minutes.toString().length < 2 ? `0${minutes}` : minutes;
      second = second.toString().length < 2 ? `0${second}` : second;

      return this.timeformatting
        .replace('yyyy', date.getFullYear())
        .replace('MM', month)
        .replace('dd', day)
        .replace('HH', hour)
        .replace('mm', minutes)
        .replace('ss', second)
    }
  },

};
</script>
<style lang="less" scoped>
.container {
  display: flex;
  justify-content: space-between;

  span {
    display: block;
  }
}
</style>

