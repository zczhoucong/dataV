/*
 * @desc：仪表盘组件
 */
<template>
    <section :id="chartId" :style="container" @click="bindEvent"></section>
</template>
<script>
import eCharts from "echarts";
import guid from "../../../../utils/guid";
import { getApiSource } from "@/utils/getApiData";
import { transfterLegPosition } from "../../../../utils/assist";
export default {
  props: {
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
    x: { type: String, default: "number" },
    y: { type: String, default: "name" },
    width: { type: [Number, String], default: 330 }, // 宽度
    height: { type: [Number, String], default: 330 }, // 高度
    // 轴线样式
    axisshow:{type:[Boolean,String],default:true},//是否显示轴线
    axiscolor1:{type: String,default:'#555f81'},//轴线第一段颜色
    axiscolor2:{type: String,default:'#555f81'},//轴线第二段颜色
    axiscolor3:{type: String,default:'#555f81'},//轴线第三段颜色
    axiswidth:{type: [Number, String], default: 30},//轴线宽度
    minvalue:{type: [Number, String], default: 0},//最小值
    maxvalue:{type: [Number, String], default: 100},//最大值


    // 指针样式
    pointershow:{type:[Boolean,String],default:true},//是否展示指针
    pointerlength:{type: [Number, String], default: 80},//指针长度
    pointerwidth:{type: [Number, String], default: 20},//指针的宽度

    // 标题样式
    titelshow:{type:[Boolean,String],default:true},//标题是否展示
    titlefontsize:{type: [Number, String], default: 20},//标题字体大小
    titlecolor:{type: String,default:'#555f81'},//标题颜色
    titlesize:{type:String},//粗细
    titlefont:{type:String},//字体


    //  刻度标签样式
    labelshow:{type:[Boolean,String],default:true},//是否展示刻度标签
    labeldis:{type: [Number, String], default: 5},//标签与刻度的距离
    labelFontsize:{type: [Number, String], default: 5},//标签字体大小
    labelsize:{type:String},//粗细
    labelfont:{type:String},//字体

    // 分割线样式
    splitLinecolor:{type: String,default:'#555f81'},
    splitwidth:{ type: [Number, String], default: 1 },//分割线宽度
    splitnumber:{ type: [Number, String], default: 5 },//分割线个数
    splitlenght:{type:[Number,String],default:16},//分割线长度
    splitshow:{type:[Boolean,String],default:true},//是否显示分割线
    splittype:{type:[String],default:'solid'},//分割线样式（实线与虚线）

    // 刻度线样式
    ticklineshow:{type:[Boolean,String],default:true},//刻度线是否展示
    ticksplitnum:{ type: [Number, String], default: 5},//刻度线分割数
    ticklength:{type: [Number, String], default: 5},//刻度线长度
    tickcolor:{type: String, default: '#fff'},//刻度线样色 
    tickwidth:{type: [Number, String], default: 5},//刻度线宽度
    tickstyle:{type:[String],default:'solid'},//刻度线样式（实线与虚线）
  },
  data() {
    return {
      chartId: guid(),
      comName: "仪表盘",
      myvalue:'',
      myname:''
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.getData();
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
    },
    myradius(){
      let lastval = this.width<this.height?this.width:this.height
      return lastval/2
    }
  },
  methods: {
    async getData() {
      let dataJson = await getApiSource(
        this.dataType,
        this.apiUrl,
        this.staticData
      );
        let tempvalue = dataJson[0][this.x]
        let tempname= dataJson[0][this.y]
        this.myvalue = tempvalue
        this.myname = tempname
        // 初始化图表
        this.InitChart();
    },

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
           tooltip : {
                formatter: "{b} : {c}%"
            },
        series: [
          {
            type: "gauge", 
            // 设置***
            detail: {formatter:'{value}%'},
            data: [{value: this.myvalue, name: this.myname}],
            clockwise:true,//刻度是否是顺时针增长
            min:this.minvalue,//最小刻度:可配置
            max:this.maxvalue,//最大刻度：可配置
            radius: this.myradius,
            splitNumber: this.splitnumber,//仪表盘刻度分段
            pointer: {
              show: true
            },
            title: {
              show: true
            },
            axisLine: {//仪表盘轴线样式
              lineStyle: {
                color:[[0.33, this.axiscolor1], [0.66, this.axiscolor2], [1, this.axiscolor3]],//可配置三种颜色
                width:this.axiswidth,//轴线的宽度
              }
            },
            // 分割线的设置***
            splitLine: {
              show: this.splitshow,//是否显示分割线
              length: this.splitlenght,//分割线长度
              lineStyle: {
                color: this.splitLinecolor,//分割线颜色
                width: this.splitwidth,//分割线宽度
                type: this.splittype,//分割线样式
              }
            },
             axisTick:{//刻度样式
                show:this.ticklineshow,//是否显示刻度线
                splitNumber:this.ticksplitnum,//每一小段分割的段数
                length:this.ticklength,//刻度长度
                lineStyle:{
                    color:this.tickcolor,//刻度线颜色
                    width:this.tickwidth,//刻度线宽度
                    type:this.tickstyle,//刻度线样式
                    opacity:1
                }
            },
             axisLabel:{//刻度标签样式
                show:this.labelshow,//是否显示刻度线标签
                distance:this.labeldis,//标签与刻度的距离
                fontSize:this.labelFontsize,//字体的大小
                fontFamily:this.labelfont,
                fontWeight:this.labelsize,
                formatter: function (value) {
                    return value.toFixed(0);
                }
            },
            pointer:{//指针样式
                show:this.pointershow,//是否显示指针
                length:this.pointerlength+"%",//指针长度
                width:this.pointerwidth,//指针宽度
            },
            title:{//仪表盘标题
                show:this.titelshow,//是否显示标题
                fontSize:this.titlefontsize,
                color:this.titlecolor,
                fontFamily:this.titlefont,
                fontWeight:this.titlesize,
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