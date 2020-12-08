<template>
  <div class="ballwrapper" :style='container'>
    <div v-if='styleselet=="样式一"'
      style='display:flex;align-items: center;flex-wrap: nowrap;flex-direction: row;'
      class="ballwrapper" :style='container'>
      <div class="oneballwrapper" v-for='(item,index) in yearList'>
        <div @click='changeyear(index)' class="oneball" :style='oneballSize(index)'>
          <span v-if='index==selectIndex' :style='yearstylese'>{{item}}</span>
          <span v-else :style='yearstyle'>{{item}}</span>
          <img v-if='index==selectIndex' src="./ballcheck.png"
            style='width:100%;height:100%;position:absolute;left:0;top:0;z-index:0' />
          <img v-else src="./balluncheck.png"
            style='width:100%;height:100%;position:absolute;left:0;top:0;z-index:0' />
        </div>
        <div v-show='index!=yearList.length-1' class="line" :style='oneballSize2()'>
          <!-- <img src="./line.png" style='width:100%;height:100%;' /> -->
        </div>
      </div>
    </div>

    <div v-else style='display:flex;align-items: center;flex-wrap: nowrap;flex-direction: row;'
      class="ballwrapper" :style='container'>
      <div class="oneballwrapper" v-for='(item,index) in yearList'>
        <div @click='changeyear(index)' class="oneball" :style='oneballSize11(index)'>
          <span v-if='index==selectIndex' :style='yearstylese2'>{{item}}</span>
          <span v-else :style='yearstyle2'>{{item}}</span>
          <img v-if='index==selectIndex' src="./time_on.png"
            style='width:100%;height:100%;position:absolute;left:0;top:0;z-index:0' />
          <img v-else src="./time_off.png"
            style='width:100%;height:100%;position:absolute;left:0;top:0;z-index:0' />
        </div>
        <div v-show='index!=yearList.length-1' class="line" :style='oneballSize22()'>
          <!-- <img src="./line.png" style='width:100%;height:100%;' /> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import "@/utils/tween.js";
import { getApiSource } from "@/utils/getApiData";
export default {
  props: {
    isLunbo: { type: [Boolean, String], default: false }, // 是否开启滚动条
    stepTime: { type: [Number, String], default: 10 }, // 滚动时长
    styleselet: { type: String, default: "样式一" },
    width: { type: [Number, String] },
    height: { type: [Number, String] },
    size: { type: [Number, String], default: 24 }, //字体大小
    selectColor: { type: String, default: "#E2ECFF" }, //选中的年度颜色
    comId: { type: String, default: "" }, //该组件ID
    color: { type: String, default: "#0D86F0" }, //未选中的年度颜色
    dataType: { type: String, default: "Static" },
    apiUrl: { type: String, default: "" },
    staticData: {
      type: Array, default: () => {
        return [];
      }
    },
    year: { type: String, default: "year" },
    activeAttr: {
      type: Object, default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      selectIndex: 0,
      yearList: [],
      last: 3,
      dataJson: [],
      dataArray: {}
    };
  },
  computed: {
    container () {
      return {
        width: `${this.width}px`,
        height: `${this.height}px`
      };
    },
    // 未选中年度的样式
    yearstyle () {
      const widthtemp = this.width / (this.last * 2 + (this.last - 1)) * 2;
      const heighttemp = this.height;
      const lastval = widthtemp < heighttemp ? widthtemp : heighttemp;
      return {
        display: "inline-block",
        height: `${lastval}px`,
        lineHeight: `${lastval}px`,
        position: "relative",
        zIndex: "1000",
        fontSize: this.size + "px",
        color: this.color
      };
    },
    // 选中的年度样式
    yearstylese () {
      const widthtemp = this.width / (this.last * 2 + (this.last - 1)) * 2;
      const heighttemp = this.height;
      const lastval = widthtemp < heighttemp ? widthtemp : heighttemp;
      return {
        display: "inline-block",
        height: `${lastval}px`,
        lineHeight: `${lastval}px`,
        position: "relative",
        zIndex: "100",
        fontSize: this.size + "px",
        color: this.selectColor
      };
    },
    // 未选中年度样式
    yearstyle2 () {
      const widthtemp = this.width / (this.last * 2 + (this.last - 1)) * 2;
      const heighttemp = this.height;
      const lastval = widthtemp < heighttemp ? widthtemp : heighttemp;
      return {
        display: "inline-block",
        height: `${lastval / 6 * 4}px`,
        lineHeight: `${lastval / 6 * 4}px`,
        position: "relative",
        zIndex: "1000",
        fontSize: this.size + "px",
        color: this.color
      };
    },
    // 选中年度样式
    yearstylese2 () {
      const widthtemp = this.width / (this.last * 2 + (this.last - 1)) * 2;
      const heighttemp = this.height;
      const lastval = widthtemp < heighttemp ? widthtemp : heighttemp;
      return {
        display: "inline-block",
        height: `${lastval / 6 * 4}px`,
        lineHeight: `${lastval / 6 * 4}px`,
        position: "relative",
        zIndex: "100",
        fontSize: this.size + "px",
        color: this.selectColor
      };
    }
  },
  watch: {
    dataArray () {
      this.activeEvent();
    },
    activeAttr (val) {
      this.activeEvent();
    },
  },
  methods: {
    //交互时间外参响应事件
    activeEvent () {
      let json = {};
      Object.keys(this.activeAttr).forEach(i => {
        if (this.dataArray[i]) {
          json[this.activeAttr[i]] = this.dataArray[i];
        }
      })
      if (Object.keys(json).length > 0) {
        this.$store.dispatch('setKeys', JSON.parse(JSON.stringify(json)))
      }
      console.log(json, 'dfasfdasdf')
    },
    // 清空该组件定时器
    clearTimer () {
      const timer = localStorage.getItem(`timeline${this.comId}`);
      if (timer) {
        clearInterval(timer);
        localStorage.removeItem(`timeline${this.comId}`);
      }
    },
    startLunbo () {
      if (this.isLunbo) {
        this.timer = setInterval(() => {
          let currenIndex = this.selectIndex
          if (currenIndex >= this.last - 1) {
            this.selectIndex = 0
          } else {
            this.selectIndex++
          }
          this.dataArray = this.dataJson[this.selectIndex]
        }, this.stepTime * 1000);
        localStorage.setItem(`timeline${this.comId}`, this.timer);
      } else {
        clearInterval(this.timer);
        this.timer = null
      }
    },
    async getYears () {
      let dataJson = await getApiSource(
        this.dataType,
        this.apiUrl,
        this.staticData
      );
      this.dataJson = dataJson;
      this.yearList = dataJson.map(item => {
        return item.year;
      });
      this.last = dataJson.length;
      this.selectIndex = dataJson.length - 1;
      this.dataArray = dataJson[this.selectIndex];
      this.startLunbo();

    },
    changeyear (index) {
      if (this.selectIndex != index) {
        this.selectIndex = index;
        this.dataArray = this.dataJson[this.selectIndex]
      }
    },
    // 一个条目的样式
    oneballSize () {
      let widthtemp = this.width / (this.last * 2 + (this.last - 1)) * 2;
      let heighttemp = this.height;
      let lastval = widthtemp < heighttemp ? widthtemp : heighttemp;
      return {
        width: `${lastval}px`,
        height: `${lastval}px`,
        float: "left",
        position: "relative",
        textAlign: "center"
      };
    },
    oneballSize2 () {
      let widthtemp = this.width / (this.last * 2 + (this.last - 1)) * 2;
      let heighttemp = this.height;
      let lastval = widthtemp < heighttemp ? widthtemp : heighttemp;
      let mywidth = (this.width - lastval * this.last) / (this.last - 1);

      return {
        width: `${mywidth}px`,
        height: `${lastval}px`,
        float: "left",
        position: "relative",
        textAlign: "center",
        lineHeight: `${lastval}px`
      };
    },
    // ---------
    oneballSize11 () {
      let widthtemp = this.width / (this.last * 2 + (this.last - 1)) * 2;
      let heighttemp = this.height;
      let mywidth;
      let myheight;
      // 以宽度为基准
      if (widthtemp / 6 * 4 < heighttemp) {
        mywidth = widthtemp;
        myheight = widthtemp / 6 * 4;
        //  以高度为基准
      } else {
        myheight = heighttemp;
        mywidth = heighttemp / 4 * 6;
      }
      return {
        width: `${mywidth}px`,
        height: `${myheight}px`,
        float: "left",
        position: "relative",
        textAlign: "center",
        lineHeight: `${myheight}px`

      };
    },
    oneballSize22 () {
      let widthtemp = this.width / (this.last * 2 + (this.last - 1)) * 2;
      let heighttemp = this.height;

      let mywidth;
      let myheight;
      // 以宽度为基准
      if (widthtemp / 6 * 4 < heighttemp) {
        myheight = widthtemp / 6 * 4;
        mywidth = widthtemp;
        //  以高度为基准
      } else {
        myheight = heighttemp;
        mywidth = heighttemp / 4 * 6;
      }
      let mywidth1 = (this.width - mywidth * this.last) / (this.last - 1);
      return {
        width: `${mywidth1}px`,
        height: `${myheight}px`,
        float: "left",
        position: "relative",
        textAlign: "center",
        lineHeight: `${myheight}px`
      };
    },

  },
  mounted () {
    this.$nextTick(() => {
      this.clearTimer();
      this.getYears();
    });
  },
  beforeDestroy () {
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
    }
  }
};
</script>
<style scoped lang="less" type="text/less">
span {
  font-family: AgencyFBBold;
}
</style>
