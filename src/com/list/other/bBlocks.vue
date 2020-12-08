<!--
组件名称：自定义面板
作    者：杨凡龙
创建时间：2019年5月29
-->
<template>
  <div :style='container'>
  </div>
</template>
<script>
export default {
  props: {
    width: {
      type: [Number, String],
      default: 500
    }, // 宽度
    height: {
      type: [Number, String],
      default: 400
    }, // 高度
    borderStyle: {
      type: String,
      default: 'solid'
    }, // 面板边框样式
    borderWidth: {
      type: Number,
      default: 1
    }, // 面板边框粗细
    borderColor: {
      type: String,
      default: '#fff'
    }, // 面板边框颜色
    borderRadius: {
      type: Number,
      default: 4
    },  // 面板边框圆角
    backgroundColor: {
      type: String,
      default: '#0745BE'
    }, // 面板背景颜色
  },
  data () {
    return {
    };
  },
  computed: {
    container () {
      return {
        width: `${this.width}px`,
        height: `${this.height}px`,
        border: `${this.borderStyle} ${this.borderColor} ${this.borderWidth}px`,
        borderRadius: `${this.borderRadius}px`,
        backgroundColor: `${this.backgroundColor}`
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
    })
  },
  methods: {
  }
};
</script>
