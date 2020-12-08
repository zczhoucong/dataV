/*
* @desc:协调发展-城市人口业务组件
* @Author: lujing
* @Date: 2018-05-29 15:15:14
 * @Last Modified by: lujing
 * @Last Modified time: 2018-06-28 10:19:56
*/
<template>
  <div :style="container">
    <slide v-if="isScroll" class="sliders" :style="container" style="overflow: hidden;" :scrollDir="scrollDir" :childNum="groupCom.length" :interval="scrollTime*1000">
      <div v-for="group in groupCom">
        <div class="com-single-box" :style="comWidth" v-for="series in group" :key="series.xid">
          <div class="com-single-title" @click.native="bindEvent(series)" :style="titleStyle">
            {{series.title}}
          </div>
          <bubble-basic-com class="com-single-chart"  :gridLeft='gridLeft' :gridRight='gridRight' :gridBottom='gridBottom' :gridTop='gridTop' :width="chartStyle.width" :height="chartStyle.height" :barWidth="barStyle.barWidth" :barBack="barStyle.barBack" :bubbleListColor='bubbleListColor' :legendShow="barStyle.legendShow" :xName="barStyle.xName" :tickColor="barStyle.tickColor"  :x="barStyle.x" :y="barStyle.y" :labelShow="barStyle.labelShow" :s="barStyle.s" ySplitNumber='3' :staticData="series.items"  :xFontSize='xFontSize' :yFontSize='yFontSize' :tickLength='tickLength' :xMargin="xMargin"></bubble-basic-com>
        </div>
      </div>
    </slide>
    <div v-else>
      <div class="com-single-box" :style="comWidth" v-for="series in seriesName" :key="series.xid">
        <div class="com-single-title" @click.native="bindEvent(series)" :style="titleStyle">{{series.title}}
        </div>
        <bubble-basic-com class="com-single-chart" :gridLeft='gridLeft' :gridRight='gridRight' :gridBottom='gridBottom' :gridTop='gridTop' :width="chartStyle.width" :height="chartStyle.height" :barWidth="barStyle.barWidth" :barBack="barStyle.barBack" :bubbleListColor='bubbleListColor' :legendShow="barStyle.legendShow" :xName="barStyle.xName" :tickColor="barStyle.tickColor"  :x="barStyle.x" :y="barStyle.y" :labelShow="barStyle.labelShow" :s="barStyle.s" ySplitNumber='3' :staticData="series.items"  :xFontSize='xFontSize' :yFontSize='yFontSize' :tickLength="tickLength" :xMargin="xMargin"></bubble-basic-com>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import Slide from "@/com/components/slider.vue";
import bubbleBasicCom from "@/com/list/chart/other/bubbleSpecial.vue";
import { getApiSource } from "@/utils/getApiData";
export default {
  props: {
    ymin: { type: [Number, String], default: 0 },
    ymax: { type: [Number, String], default: 0 },
    width: { type: [Number, String], default: 590 }, // 宽度
    height: { type: [Number, String], default: 275 }, // 高度
    isScroll: { type: [Boolean, String], default: false }, // 是否开启滚动条
    scrollDir: { type: String, default: "horizontal" }, // 滚动方向
    scrollTime: { type: [Number, String], default: 2 }, // 滚动时长
    nums: { type: [Number, String], default: 1 }, // 每页展示数量
    fontColor: { type: String, default: "#fff" },
    fontWeight: { type: String, default: "normal" },
    fontSize: { type: [Number, String], default: 12 },
    xFontSize: { type: [Number, String], default: 12 },
    yFontSize: { type: [Number, String], default: 12 },
    tickLength: { type: [Number, String], default: 5 }, // 刻度的长度
    fontHeight: { type: [Number, String], default: 30 },
    fontFamily: { type: String, default: "AgencyFBBold" }, // 字体
    dataType: { type: String, default: "WebApi" },
    xMargin: { type: [Number, String], default: 8 },
    gridLeft:{type:[Number,String]},
    gridRight:{type:[Number,String]},
    gridBottom:{type:[Number,String]},
    gridTop:{type:[Number,String]},

    apiUrl: {
      type: String,
      default: ""
    },
    staticData: {
      type: Array,
      default: () => {
        return [
         
        ];
      }
    },
    x: { type: String, default: "year" },
    y: { type: String, default: "val" },
    s: { type: String, default: "infoId" },
    i: { type: String, default: "infoId" },
    t: { type: String, default: "name" },
    bubbleListColor: {
      // 系列数据
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  components: { bubbleBasicCom, Slide },
  data() {
    return {
      comName: "城镇化率",
      seriesName: [],
      pageSize: eval(this.nums) < 1 ? 1 : this.nums,
      barStyle: {
        barWidth: 25,
        barBack: "rgba(0,0,0,0)",
        xName: "%",
        labelShow: false,
        legendShow: false,
        gridTop: 0,
        gridRight: 30,
        tickColor: "rgba(73, 162, 210, 1)",
        x: this.x,
        y: this.y,
        s: this.s
      },

    };
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
    });
  },
  computed: {
    container() {
      return {
        width: `${this.width}px`,
        height: `${this.height}px`
      };
    },
    // 根据数量进行分组
    groupCom() {
      let com = [];
      for (
        let i = 0, len = this.seriesName.length;
        i < len;
        i += eval(this.pageSize)
      ) {
        com.push(this.seriesName.slice(i, i + eval(this.pageSize)));
      }
      return com;
    },
    //获取单个组件的宽度
    comWidth() {
      return {
        width: `${this.width / this.pageSize}px`
      };
    },
    //获取标题的样式
    titleStyle() {
      return {
        fontFamily: this.fontFamily,
        fontSize: `${this.fontSize}px`,
        color: this.fontColor,
        fontWeight: this.fontWeight,
        height: `${this.fontHeight}px`,
        lineHeight: `${this.fontHeight}px`
      };
    },
    // 获取图表的样式
    chartStyle() {
      return {
        width: `${this.width / this.pageSize}`,
        height: `${this.height - this.fontHeight}`
      };
    }
  },
  methods: {
    async initChart() {
      let dataJson = await getApiSource(
        this.dataType,
        this.apiUrl,
        this.staticData
      );
      this.seriesName = [];
      dataJson.forEach(i => {
        if (this.seriesName.findIndex(s => s.title === i[this.t]) < 0) {
          this.seriesName.push({ title: i[this.t], xid: i[this.i] });
        }
      });
      this.$emit("count", {
        count: this.seriesName.length,
        data: this.seriesName
      });
      this.seriesName.forEach(i => {
        const items = dataJson.filter(d => d[this.i] === i.xid);
        i.items = items;
      });
      if (!this.isScroll) {
        this.pageSize = this.seriesName.length;
      }
    },
    // 绑定点击回调事件
    bindEvent(stat) {
      // 处理数据
      let tempdata = {};
      tempdata.title = stat.title;
      tempdata.xtype = stat.xid;
      // 注册内部元素点击事件
      this.$emit("callback", {
        type: "click",
        data: tempdata
      });
    }
  }
};
</script>
<style scoped lang="less" type="text/less">
.com-single-box {
  float: left;
  height: 100%;
  text-align: center;
  .com-single-title,
  .com-single-chart {
    width: 100%;
    float: left;
  }
}
</style>
