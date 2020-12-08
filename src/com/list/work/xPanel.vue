<template>
  <div :style="container">
    <div class="zj_li" v-if="isTarget">
      <a :href="href" :target="target?'_blank':'_self'">
        <img :style="iconRotationStyle" src="../../list/other/modal/panel/379.png">
        <img class="group_two" src="../../list/other/modal/panel/380.png">
        <img :style="iconStyle" :src="icon">
        <span :style="bigFoneStyle">{{bFontText}}</span>
        <span :style="smallFoneStyle">{{sFontText}}</span>
      </a>
    </div>
    <div class="zj_li" v-else>
      <img :style="iconRotationStyle" src="../../list/other/modal/panel/379.png">
      <img class="group_two" src="../../list/other/modal/panel/380.png">
      <img :style="iconStyle" :src="icon">
      <span :style="bigFoneStyle">{{bFontText}}</span>
      <span :style="smallFoneStyle">{{sFontText}}</span>
    </div>
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
    isTarget: { type: Boolean, default: true }, //是否开启超链接
    href: { type: String }, //超链接地址
    target: { type: Boolean, default: true }, //超链接在当前窗口打开还是在新窗口打开
    icon: { type: String }, //图标
    iconWidth: { type: [Number, String] },//图标宽度
    iconHeight: { type: [Number, String] },//图标高度
    bFontText: { type: String }, //大标题文本内容、
    bFontSize: { type: [Number, String] }, //大标题字体大小
    bColor: { type: String }, //大标题字体颜色
    sFontText: { type: String }, //小标题文本内容
    sFontSize: { type: [Number, String] }, //小标题字体大小
    sColor: { type: String }, //小标题字体颜色
    // api请求参数
    dataType: { type: String, default: "Static" },
    apiUrl: { type: String, default: "" },
    staticData: {
      type: Array, default: () => {
        return [];
      }
    },
    activeAttr: {
      type: Object, default: () => {
        return {}
      }
    },
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
    iconStyle () {
      return {
        position: 'absolute',
        left: '25px',
        top: '28px',
        zIndex: '50',
        width: `${this.iconWidth}px`,
        height: `${this.iconHeight}px`
      };
    },
    bigFoneStyle () {
      return {
        display: 'inline-block',
        fontWeight: 'bold',
        width: 'auto',
        textAlign: 'center',
        position: 'absolute',
        left: '80px',
        top: '28px',
        zIndex: '50',
        fontSize: `${this.bFontSize}px`,
        color: `${this.bColor}`
      };
    },
    smallFoneStyle () {
      return {
        display: 'inline-block',
        fontWeight: 'bold',
        width: 'auto',
        textAlign: 'center',
        position: 'absolute',
        left: '80px',
        top: '56px',
        zIndex: '50',
        fontSize: `${this.sFontSize}px`,
        color: `${this.sColor}`
      };
    },
    iconRotationStyle () {
      let obj = {
        position: 'absolute',
        width: '72px',
        height: '72px',
        position: 'absolute',
        left: '0px',
        top: '4px',
        zIndex: '30'
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

<style scoped lang="less" type="text/less">
span {
  font-family: AgencyFBBold;
}

.zj_li {
  width: 175px;
  height: 88px;
  float: left;
  margin-right: 20px;
  position: relative;

  .group_one {
    position: absolute;
    width: 72px;
    height: 72px;
    position: absolute;
    width: 72px;
    height: 72px;
    left: 3px;
    top: 5px;
    z-index: 30;
    animation: rotating 5s linear infinite;
  }

  .group_two {
    position: absolute;
    right: 5px;
    top: 19px;
    width: 138px;
    height: 65px;
    z-index: 10;
  }
}
</style>
