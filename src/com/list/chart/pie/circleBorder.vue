/*
 * @Author: lujing 
 * @Date: 2018-06-15 10:00:31 
 * @Last Modified by: lujing
 * @Last Modified time: 2018-06-19 10:37:11
 * @desc 旋转百分比环图组件
 */
<template>
    <div :style="[circleSize]" class="multiple-ring" style='position:relative;text-align:center'>
        <div style='position:absolute;width:100%;height:100%;text-align:center' :style='mylineheigth'>
            <span :style='titlestyl'>{{title}}</span>
        </div>
        <svg width="100%" height="100%">
            <circle :r="size-outerWidth" :cx="size" :cy="size" :stroke="outC" fill="none" :stroke-width="outerWidth" stroke-dasharray="28,5"></circle>
            <g fill="none" :stroke="outTrailColor" :stroke-width="outerWidth">
                <path stroke-dasharray="28,5" :transform="transform" :d="pathD(outPercent,size-outerWidth)"></path>
                <animateTransform attributeName="transform" ref="rotate" type="rotate" dur="5s" repeatCount="indefinite" :from="from" :to="to" v-if="animate" />
            </g>
            <circle :r="innerCircleSize" :cx="size" :cy="size" fill="none" :stroke="innerC" :stroke-width="innerWidth"></circle>
        </svg>
        <div class="multiple-ring-inner">
            <slot></slot>
        </div>
    </div>
</template>
<script>
import { getApiSource } from "@/utils/getApiData";
export default {
  name: "MultipleRing",
  props: {
    animate: {
      //动画
      type: Boolean,
      default: true
    },
    space: {
      //内外环间隔
      type: Number,
      default: 4
    },
    outerWidth: {
      //外环宽度
      type: Number,
      default: 6
    },
    outerColor: {
      //外环底色
      type: String,
      default: "#386361"
    },
    outTrailColor: {
      //外环填充色
      type: String,
      default: "#39F"
    },
    innerPercent: {
      //内环占比
      type: Number,
      default: 1
    },
    innerWidth: {
      //内环宽度
      type: Number,
      default: 6
    },
    innerColor: {
      //内环底色
      type: String,
      default: "#edbaa0"
    },
    innerTrailColor: {
      //内环填充色
      type: String,
      default: "#F63"
    },
    width: {
      type: [String, Number],
      default: 120
    },
    height: {
      type: [String, Number],
      default: 120
    },
    // 内部标题字体大小
    labelfontSize: {
      type: [Number, String],
      default: 20
    },
    // 内部标题字体颜色
    labelcolor: {
      type: String,
      default: "#ff0000"
    },

    dataType: { type: String, default: "Static" },
    apiUrl: {
      type: String,
      default: ""
    },
    staticData: {
      type: Array,
      default: () => {
        return [];
      }
    },
    x: { type: String, default: "value" }
  },
  data() {
    return {
      outC: this.outerColor,
      innerC: this.innerColor,
      title: "80%",
      outPercent:0.5
    };
  },
  computed: {
    titlestyl() {
      return {
        color: this.labelcolor,
        fontSize: `${this.labelfontSize}px`
      };
    },
    mylineheigth() {
      let tempval = this.width < this.height ? this.width : this.height;
      return {
        lineHeight: `${tempval}px`
      };
    },
    size() {
      let tempval = this.width < this.height ? this.width : this.height;
      return tempval / 2;
    },
    circleSize() {
      return {
        width: `${this.size * 2}px`,
        height: `${this.size * 2}px`,
        left: `${this.width / 2 - this.size}px`,
        top: `${this.height / 2 - this.size}px`
      };
    },
    innerCircleSize() {
      return this.size - this.outerWidth - this.innerWidth - this.space;
    },
    from() {
      return [0, this.size, this.size].join(",");
    },
    to() {
      return [360, this.size, this.size].join(",");
    },
    transform() {
      return `translate(${this.size},${this.size})`;
    }
  },
  mounted() {
    this.outC = this.outPercent == 1 ? this.outTrailColor : this.outerColor;
    this.innerC =
      this.innerPercent == 1 ? this.innerTrailColor : this.innerColor;
    this.gettitle();
  },
  methods: {
    async gettitle() {
          let dataJson = await getApiSource(
            this.dataType,
            this.apiUrl,
            this.staticData
         );
         this.title = dataJson[0].value
         let tempval =  dataJson[0].value.split('%')[0]
         this.outPercent = parseFloat(tempval)/100
    },
    pathD(percent, r) {
      const degrees = percent * 360; //计算当前的进度对应角度值
      const rad = degrees * (Math.PI / 180); //计算当前角度对应的弧度值
      //极坐标转换成直角坐标
      const x = (Math.sin(rad) * r).toFixed(2);
      const y = -(Math.cos(rad) * r).toFixed(2);
      //大于180度时候画大角度弧，小于180度的画小角度弧，(deg > 180) ? 1 : 0
      const lenghty = window.Number(degrees > 180);
      //path 属性
      const descriptions = ["M", 0, -r, "A", r, r, 0, lenghty, 1, x, y];
      return descriptions.join(" ");
    }
  }
};
</script>
<style>
.multiple-ring {
  display: inline-block;
  position: absolute;
}

.multiple-ring-inner {
  width: 100%;
  text-align: center;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
}
</style>
