<!--
 * @Author: 周聪
 * @Date: 2019-06-03 10:08:22
 * @LastEditors: 周聪
 * @LastEditTime: 2019-07-09 16:16:46
 * @Description: 水平柱图
 -->

<template>
  <section :id="chartId" :style="container" @click="bindEvent"></section>
</template>
<script>    
import { getApiSource } from '@/utils/getApiData'
import { transfterColor } from '@/utils/assist'
import barMixins from '../mixins/barMixins'
export default {
  mixins: [barMixins],
  props: {
    barWidth: { type: [Number, String], default: 30 }, // 柱状宽度
    barBack: { type: String, default: 'rgba(255,255,255,0.5)' }, // 柱子背景色
    // 是否显示 x 轴、旋转角度、文字颜色、文字字号、文字粗细、刻度长度、坐标轴是否显示、坐标轴颜色
    xShow: { type: String | Boolean, default: true },
    rotate: { type: [Number, String], default: 0 },
    xColor: { type: String, default: '#fff' },
    xFontWeight: { type: String, default: 'normal' },
    xFontSize: { type: [Number, String], default: 12 },
    yShow: { type: String | Boolean, default: true },
    yColor: { type: String, default: '#fff' },
    yFontWeight: { type: String, default: 'normal' },
    yFontSize: { type: [Number, String], default: 12 },
    isSort: { type: Boolean, default: true },
    ySplitNumber: { type: [Number, String], default: 5 },
    inverse: { type: Boolean, default: false },
    barNumbers: { type: String, default: '单色' },
    barColor1: { type: [Object, String] },
    barColor2: { type: [Object, String] },
    staticData: { type: Array, default: [] },
    x: { type: String, default: 'x' },
    y: { type: String, default: 'y' },
    color: { type: String, default: '#FFF' },
    ftSize: { type: [Number, String], default: 14 },
    tipBgColor: { type: String, default: '' },
    tipIsShow: { type: Boolean, default: true }
  },
  data () {
    return {
      comName: '水平柱图',
      colorNum: 1,
      yLabelData: []
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.InitChart();
    })
  },
  methods: {
    bindEvent () {
      // 注册内部元素点击事件
      this.$emit('callback', {
        type: 'click',
        data: {
          title: this.comName,
          xtype: 1
        }
      })
    },
    getPercent (data, _this) {
      if (this.isSort) {
        data = data.sort(function (a, b) {
          return b - a
        })
      }
      let count = 0,
        percentArr = [],
        countPercentNotLast = 0
      data.forEach((item, index) => {
        count += item
        _this.yLabelData[index] = data.length - index
      })
      data.forEach((item, index) => {
        if (index < data.length - 1) {
          let percent = ((data[index] / count) * 100).toFixed(1)
          percentArr.push(percent + '%')
          countPercentNotLast += +percent
        } else {
          let percent = (100 - countPercentNotLast).toFixed(1)
          percentArr.push(percent + '%')
        }
      })
      return percentArr
    },
    /** 
     * @param data   数组值
     * @param _this vue组件实例
     * @param isOdd 是否单色
    */
    barColor (data, _this, callback, isOdd) {
      let colorArr = []
      data.forEach((item, index) => {
        let colorObj = {};
        if (isOdd) {
          if (typeof callback === 'function' && _this.barColor1.indexOf('top') > 0) {
            colorObj.itemStyle = {
              color: callback(_this.barColor1)
            }
          } else {
            colorObj.itemStyle = {
              color: _this.barColor1
            }
          }
        } else {
          if (index % 2 == 0) {
            if (typeof callback === 'function' && _this.barColor1.indexOf('top') > 0) {
              colorObj.itemStyle = {
                color: callback(_this.barColor1)
              }
            } else {
              colorObj.itemStyle = {
                color: _this.barColor1
              }
            }
          } else {
            if (typeof callback === 'function' && _this.barColor2.indexOf('top') > 0) {
              colorObj.itemStyle = {
                color: callback(_this.barColor2)
              }
            } else {
              colorObj.itemStyle = {
                color: _this.barColor2
              }
            }
          }
        }
        colorObj.value = item
        colorArr.push(colorObj)
      })
      return colorArr
    },
    async GetDataSource () {
      let xData = [];
      let yData = [];
      let max = 0;
      let dataJson = await getApiSource(this.dataType, this.apiUrl, this.staticData);
      dataJson.forEach(i => {
        xData.push(i[this.x]);
        if (i[this.y] > max) {
          max = i[this.y];
        }
        if (typeof eval(i[this.y]) != 'number') {
          i[this.y] = 0;
        }
        yData.push(i[this.y]);
      });
      let maxArr = [...yData];
      maxArr.fill(max);
      return {
        xData: xData,
        yData: yData,
        maxArr: maxArr
      }
    },
    async autoReplayEvent () {
      if (this.chart) {
        const resultJson = await this.GetDataSource()
        this.chart.setOption({
          yAxis: {
            data: resultJson.xData,
          },
          series: [{
            data: resultJson.maxArr
          }, {
            data: resultJson.yData
          }]
        })
      }
    },
    async InitChart () {
      let _this = this
      // this.uato
      // this.autoReplay = false
      let resultJson = await this.GetDataSource()
      // 坐标轴刻度设置
      let allPercent = _this.getPercent(resultJson.yData, _this)
      const axisTick = this.axisTick();
      const axisLine = this.axisLine();
      const grid = this.grid();
      let seriesData = []
      // 判断是单色还是双色，判断是否是渐变色
      if (this.barNumbers === '单色') {
        this.colorNum = 1;
      } else {
        this.colorNum = 2;
      }
      if (_this.barNumbers === '单色' && _this.barColor1.indexOf('top') === -1) {
        seriesData = _this.barColor(resultJson.yData, _this, null, true)
      } else if ((_this.barNumbers === '双色' && _this.barColor1.indexOf('top') === -1)) {
        seriesData = _this.barColor(resultJson.yData, _this, null)
      } else if ((_this.barNumbers === '单色' && _this.barColor1.indexOf('top') > 0)) {
        seriesData = _this.barColor(resultJson.yData, _this, transfterColor, true)
      } else if ((_this.barNumbers === '双色' && _this.barColor1.indexOf('top') > 0)) {
        seriesData = _this.barColor(resultJson.yData, _this, transfterColor)
      }
      let option = {
        tooltip: {
          show: this.tipIsShow,
          backgroundColor: this.tipBgColor ? this.tipBgColor : "rgba(50,50,50,0.7)",
          textStyle: {
            fontFamily: this.font
          },
          formatter (params) {
            return `${resultJson.xData[params.dataIndex]}：${params.value}`
          }
        },
        grid: Object.assign({ containLabel: true }, grid),
        xAxis: {
          show: this.xShow,
          axisLabel: {
            show: this.xShow,
            color: this.xColor,
            fontWeight: this.xFontWeight,
            fontSize: this.xFontSize,
            rotate: this.rotate
          },
          axisTick,
          axisLine
        },
        yAxis: {
          show: this.yShow,
          data: _this.yLabelData,
          type: 'category',
          inverse: this.inverse,
          name: this.yName,
          nameTextStyle: {
            color: this.yColor,
          },
          splitNumber: this.ySplitNumber,
          splitLine: {
            show: false
          },
          axisLabel: {
            show: this.yShow && this.isSort,
            color: this.yColor,
            fontWeight: this.yFontWeight,
            fontSize: this.yFontSize,
            formatter: function (val) {
              return resultJson.xData.length - val + 1
            }
          },
          axisTick,
          axisLine
        },
        series: [{
          type: 'bar',
          z: 2,
          barGap: '-100%',
          tooltip: {
            show: false
          },
          barWidth: this.barWidth,
          data: seriesData,
          label: {
            normal: {
              show: true,
              textStyle: {
                fontSize: _this.ftSize,
                color: _this.color
              },
              position: 'right',
              formatter: function (data) {
                return `${resultJson.yData[data.dataIndex]}(${allPercent[data.dataIndex]})`;
              }
            }
          }
        },
        {
          type: 'bar',
          barGap: '-100%',
          label: {
            normal: {
              show: true,
              position: 'insideLeft',
              textStyle: {
                fontSize: _this.ftSize,
                color: _this.color,
              },
              formatter: function (data) {
                return resultJson.xData[data.dataIndex];
              }
            }
          },
          itemStyle: {
            normal: {
              color: 'transparent'
            }
          },
          barWidth: _this.barWidth,
          data: resultJson.yData
        }
        ]
      };
      this.loadChart(option)
    }
  }
}
</script>