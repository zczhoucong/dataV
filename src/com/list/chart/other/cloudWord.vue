 /**
  * @Author: 高春超
  * @description: 
  * @param {type} 
  * @return: 
  * @Date: 2019-03-18 08:59:52
  */
 <template>
    <div :id='chartId' :style="container"></div>
</template>
 <script>
import echarts from "echarts";
import guid from '../../../../utils/guid';
import wordCloud from "echarts-wordcloud";
import { getApiSource } from "@/utils/getApiData";
export default {
  props: {
    width: { type: Number },
    height: { type: Number },
    // 配置颜色：默认使用五种颜色
    colorone:{type:String},//第一种系列颜色
    colortwo:{type:String},//第二种系列颜色
    colorthree:{type:String},//第三种系列颜色
    colorfour:{type:String},//第四种系列颜色
    colorfive:{type:String},
    // 形状
    myshape: { type: String },
    // 词汇间隔
    size: { type: Number, default: 1 },
    // 最小词汇
    minsize: { type: Number, default: 10 },
    // 最大词汇
    maxsize: { type: Number, default: 50 },
    // 旋转起始范围
    beginAngle: { type: Number, default: 0 },
    // 旋转终止范围
    lastAngle: { type: Number, default: 0 },
    dataType: { type: String, default: "Static" },
    apiUrl: { type: String },
    staticData: {
      type: Array,
      default: []
    },
    name: {type: String, default: 'name'},
    value: {type: String, default: 'value'},
  },
  data() {
    return {
      chartId: guid(),
      datalist: [],
      colorList:[this.colorone,this.colortwo,this.colorthree,this.colorfour,this.colorfive]
    };
  },
  computed: {
    container() {
      return {
        width: `${this.width}px`,
        height: `${this.height}px`,
      };
    }
  },
  mounted() {
    this.getdata();
    setTimeout(() => {
      this.initChart();
    }, 1000);
  },
  methods: {
    async getdata() {
      let tempdatalist = await getApiSource(
        this.dataType,
        this.apiUrl,
        this.staticData
      );
      this.datalist = tempdatalist.map((item,index,arr)=>{
           return {
             name:item[this.name],
             value:item[this.value]
           }
      })
    },
    initChart() {
      let that = this
      let option = {
        tooltip: {},
        series: [
          {
            type: "wordCloud",
            gridSize: this.size,
            textPadding: 0,
            size: ['100%', '100%'],
            autoSize: {
                enable: true,
                minSize: 12
            },
            // 是否可以超出边界
            drawOutOfBound: false,
            sizeRange: [this.minsize, this.maxsize],
            rotationRange: [this.beginAngle, this.lastAngle],
            shape: this.myshape,
            left: 0,
            top: 0,
            width: this.width,
            height: this.height,
            right: this.width,
            bottom: this.height,
            textStyle: {
              normal: {
                color: function() {
                  return that.colorList[Math.ceil(Math.random()*5)]
                }
              },
              emphasis: {
                shadowBlur: 10,
                shadowColor: "#333"
              }
            },
            data: this.datalist
          }
        ]
      };
       if (document.getElementById(this.chartId)) {
            const chart = echarts.init(document.getElementById(this.chartId));
            chart.setOption(option);
       }
    }
  }
};
</script>
<style>
</style>
