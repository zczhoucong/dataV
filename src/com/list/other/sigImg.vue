<template>
  <div :style="container">
    <template v-if="href==''">
      <img :src="background" :style="imageStyle">
    </template>
    <template v-else>
      <a v-if="target" :style="container" :href="href" target="_blank">
        <img :src="background" :style="imageStyle">
      </a>
      <a v-else :href="href" :style="container" target="_self">
        <img :src="background" :style="imageStyle">
      </a>
    </template>
  </div>
</template>
<script>
import "@/utils/tween.js";
import { getApiSource } from "@/utils/getApiData";
export default {
  props: {
    // 图标尺寸
    width: { type: [Number, String] },
    height: { type: [Number, String] },
    //全局样式
    isRotation: { type: Boolean, default: true }, //是否旋转
    rotationNum: { type: [Number, String] }, //旋转间隔时间
    background: { type: String }, //图片地址

    href: { type: String }, //超链接地址
    target: { type: Boolean, default: true }, //是否打开新窗口
  },
  data () {
    return {
    };
  },
  computed: {
    container () {
      return {
        width: `${this.width}px`,
        height: `${this.height}px`
      };
    },
    imageStyle () {
      let obj = {
        width: `${this.width}px`,
        height: `${this.height}px`
      }
      if (this.isRotation) {
        obj.animation = `rotating ${this.rotationNum}s linear infinite`
      }
      return obj;
    }
  },
  watch: {
  },
  methods: {
  },
  mounted () {
  }
};
</script>
<style scoped>
@keyframes rotating {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(90deg);
  }
  50% {
    transform: rotate(180deg);
  }
  75% {
    transform: rotate(270deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
