/*
 * @desc：使用仪表盘实现的圆形框组件
 */
<template>
    <section :id="chartId" :style="container" @click="bindEvent"></section>
</template>
<script>
import eCharts from "echarts";
import guid from "@/utils/guid";
import { transfterLegPosition } from "@/utils/assist";
export default {
  props: {
    width: { type: [Number, String], default: 330 }, // 宽度
    height: { type: [Number, String], default: 330 }, // 高度
    // 分割线颜色
    splitLinecolor:{type: String,default:'#555f81'},
    splitwidth:{ type: [Number, String], default: 1 },//分割线宽度
    splitnumber:{ type: [Number, String], default: 80 },//分割线个数
    redius:{ type: [Number, String], default: -10 },

   // 仪表盘位置
  //  水平位置
  xLocal:{type:[Number,String],default:50},
  yLocal:{type:[Number,String],default:30}
  },
  data() {
    return {
      chartId: guid(),
      comName: "仪表盘"
    };
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.InitChart();
      });
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
    // 半径
    redius2(){
       let tempval
       if(this.redius==-10){
          tempval = this.width<this.height?this.width:this.height
       }else{
          tempval = this.redius*2
       }
      return tempval/2
    },
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
      //根据数据源类型获取不同数据
      const option = {
        series: [
          {
            type: "gauge", //仪表盘
            name: "业务指标",
            // 设置***
            radius: this.redius2,
            center: [this.xLocal+"%", this.yLocal+"%"],
            startAngle: "0",
            endAngle: "-359.99",
            // 设置****
            splitNumber: this.splitnumber,
            pointer: {
              show: true
            },
            title: {
              show: true
            },
            detail: {
              show: true
            },
            // 去掉颜色
            axisLine: {
              lineStyle: {
                color: [[0.5,''],[1,'']],
                opacity: 0
              }
            },

            axisTick: {
              show: false
            },
            // 分割线的设置***
            splitLine: {
              show: true,
              length: 16,
              lineStyle: {
                color: this.splitLinecolor,
                width: this.splitwidth,
                type: "solid"
              }
            },
            axisLabel: {
              show: false
            }
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