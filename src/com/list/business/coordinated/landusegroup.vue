/*
 * @desc:协调发展-城乡建设用地业务组件
 * @Author: lujing 
 * @Date: 2018-05-30 15:15:14 
 * @Last Modified by: lujing
 * @Last Modified time: 2018-07-01 11:09:13
 */
<template>
  <section :id="chartId" :style="container" @click="bindEvent">
  </section>
</template>
<script>
import eCharts from "./echarts.js";
import guid from "../../../../utils/guid";
import { transfterLegPosition } from "../../../../utils/assist";
import { getApiSource } from "@/utils/getApiData";
export default {
  props: {
    oneColor: { type: String, default: "#2897c9" }, // 第一年度的颜色
    twoColor: { type: String, default: "#4c985f" }, // 第二年度的颜色
    threeColor: { type: String, default: "#b78b3a" }, // 第三年度的颜色
    width: { type: [Number, String], default: 450 }, // 宽度
    height: { type: [Number, String], default: 350 }, // 高度
    font: {
      // 字体
      type: String,
      default: "AgencyFBBold"
    },
    color: { type: String, default: "#fff" },
    fontSize: { type: [Number, String], default: "14" },
    shape: { type: String, default: "polygon" },
    newLine: { type: [Number, String], default: 0 },
    radius: { type: [Number, String], default: "50" },
    xCenter: { type: [Number, String], default: "50" },
    yCenter: { type: [Number, String], default: "50" },
    splitLine: { type: String, default: "rgba(238, 197, 102, 0.6)" },
    splitLineShow: { type: [Boolean, String], default: false },
    splitAreaShow: { type: [Boolean, String], default: false },
    splitArea: {
      type: [Array, String],
      default: function() {
        return ["rgba(250,250,250,0.3)", "rgba(200,200,200,0.3)"];
      }
    },
    axisLineShow: { type: [Boolean, String], default: false },
    axisLine: { type: String, default: "rgba(238, 197, 102, 0.5)" },
    // 图例
    legendShow: { type: String | Boolean, default: true },
    legendColor: { type: String, default: "#fff" },
    legPosition: { type: String, default: "顶部居中" },
    orient: { type: String, default: "horizontal" },
    legendSize: { type: [Number, String], default: 12 },
    legendGap: { type: [Number, String], default: 10 },

    radarSeries: {
      // 系列数据
      type: Array,
      default: () => {
        return [];
      }
    },
    dataType: { type: String, default: "WebApi" },
    apiUrl: { type: String },
    staticData: {
      type: Array,
      default: () => {
        return [];
      }
    },
    x: { type: String, default: "name" },
    y: { type: String, default: "val" },
    s: { type: String, default: "year" }
  },
  data() {
    return {
      chartId: guid(),
      comName: "城乡建设用地"
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.InitChart();
      this.$emit("count", {
        count: 1,
        data: [
          {
            title: this.comName,
            xid: 1
          }
        ]
      });
    });
  },
  computed: {
    container() {
      return {
        width: `${this.width}px`,
        height: `${this.height}px`
      };
    }
  },
  methods: {
    bindEvent() {
      // 注册内部元素点击事件
      this.$emit("callback", {
        type: "click",
        data: {
          title: this.comName,
          xtype: 1
        }
      });
    },
    async InitChart() {
      let dataJson = await getApiSource(
        this.dataType,
        this.apiUrl,
        this.staticData
      );
      const newLine = this.newLine;
      let seriesName = [];
      let xName = [];
      dataJson.forEach(i => {
        // 系列名称
        if (!seriesName.includes(i[this.s])) seriesName.push(i[this.s]);
        // x轴名称
        if (!xName.includes(i[this.x])) xName.push(i[this.x]);
      });
      let yList = [];
      let ySeries=[];
      let yData=[];
      let index = -1
      seriesName.forEach(i => {
         yData = dataJson.filter(j => {
          return j[this.s] === i;
        });
        ySeries = [];
        xName.forEach(x => {
          index = yData.findIndex(y => y[this.x] === x);
          if (index < 0) {
            ySeries.push(0);
          } else {
            ySeries.push(yData[index][this.y]);
          }
        });
        yList.push(ySeries);
      });
      const _indicator = [];
      xName.forEach(i => {
        yData = dataJson.filter(j => {
          return j[this.x] === i;
        });
        let max = 0;
        yData.forEach(x => {
          if (x[this.y] && Math.floor(x[this.y]) > max) {
            max = Math.floor(x[this.y]);
          }
        });
        _indicator.push({
          name: i,
          max: max + 20
        });
      });
      let seriesData = [];
      let _legColor = [];
      let lineColor;
      yList.forEach((i, index) => {
        if (index == 0) {
          lineColor = this.oneColor;
        } else if (index == 1) {
          lineColor = this.twoColor;
        } else {
          lineColor = this.threeColor;
        }
        let series = {
          name: seriesName[index],
          lineStyle: {
            normal: {
              color: lineColor,
              width: 2
            }
          },
          itemStyle: {
            normal: {
              color: lineColor
            }
          },
          areaStyle: {
            normal: {
              opacity: 0.3
            }
          },
          symbol: "circle",
          value: i
        };
        seriesData.push(series);
      });

      let option = {
        tooltip: {
          trigger: "item"
        },
        legend: {
          itemWidth: 7,
          itemHeight: 7,
          itemGap: 20,
          textStyle: {
            fontSize: "14",
            color: "#fff"
          },
          bottom: "20",
          zlevel: "999",
          data: seriesName
        },
        radar: {
          shape: this.shape,
          axisLine: {
            //轴线样式
            lineStyle: {
              color: "#3c4268",
              width: 1
            }
          },
          name: {
            textStyle: {
              color: this.color,
              fontFamily: this.font,
              fontSize: this.fontSize
            }
          },
          center: [`${this.xCenter}%`, `${this.yCenter}%`],
          radius: `${this.radius}%`,
          splitLine: {
            lineStyle: {
              // 使用深浅的间隔色
              color: ["#3c4268"]
            }
          },
          splitArea: {
            show: true,
            areaStyle: {
              color: ["rgba(200,200,200,0)", "rgba(9,16,56,0.5)"]
            }
          },
          nameGap: 7,
          splitNumber: 5,

          indicator: _indicator
        },
        series: [
          {
            type: "radar",
            symbol: "circle",
            symbolSize: 5,
            data: seriesData
          }
        ]
      };
      if (document.getElementById(this.chartId)) {
        let chart = eCharts.init(document.getElementById(this.chartId));
        chart.setOption(option);
      }
    }
  },
  deactivated() {
    this.$destroy();
  }
};
</script>