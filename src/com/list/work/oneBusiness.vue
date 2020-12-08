<template>
  <vue-seamless-scroll :data="list" :class-option="classOption" :style="container">
    <div class="business_list" v-for="(item,index)  in  list" @click="handleListClick(index)">
      <div class="business_list_l" :style="{background:item.theme}">
        <div :style="tBigTitleStyle">{{item.time}}</div>
        <div :style="tSmallTitleStyle">{{item.steps}}</div>
      </div>
      <div class="business_list_r">
        <div class="r_top">
          <span :style="cBigTitleStyle">{{item.role}}</span><span :style="cBigTitleStyle">{{item.name}}</span>
        </div>
        <div class="r_bottom">
          <span :style="cSmallTitleStyle">{{item.address}}</span><span :style="cSmallTitleStyle">{{item.content}}</span>
        </div>
      </div>
    </div>
  </vue-seamless-scroll>
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
    step: { type: [Number, String] }, //轮播间隔
    limitMoveNum: { type: [Number, String] }, //轮播条数
    // 头部大标题
    tbSize: { type: [Number, String] }, //字体大小
    tbHeight: { type: [Number, String] }, //字体高度
    tbLineHeight: { type: [Number, String] }, //字体行高
    tbColor: { type: String }, //字体颜色
    // 头部小表题
    tsSize: { type: [Number, String] }, //字体大小
    tsHeight: { type: [Number, String] }, //字体高度
    tsLineHeight: { type: [Number, String] }, //字体行高
    tsColor: { type: String }, //字体颜色

    //内容大标题样式
    bSize: { type: [Number, String] }, //字体大小
    bHeight: { type: [Number, String] }, //字体高度
    bLineHeight: { type: [Number, String] }, //字体行高
    bColor: { type: String }, //字体颜色
    // 内容小标题样式
    sSize: { type: [Number, String] }, //字体大小
    sHeight: { type: [Number, String] }, //字体高度
    sLineHeight: { type: [Number, String] }, //字体行高
    sColor: { type: String }, //字体颜色
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
    // 数值参数
    primaryKey: { type: String, default: "primaryKey" },
    steps: { type: String, default: "steps" },
    role: { type: String, default: "role" },
    name: { type: String, default: "name" },
    time: { type: String, default: "time" },
    address: { type: String, default: "address" },
    content: { type: String, default: "content" },
    theme: { type: String, default: "theme" }
  },
  data () {
    return {
      selectIndex: 0,
      list: [],
      last: 1,
      dataArray: {}
    };
  },
  computed: {
    container () {
      return {
        width: `${this.width}px`,
        height: `${this.height}px`,
        overflow: 'hidden'
      };
    },
    classOption: function () {
      return {
        step: this.step,
        limitMoveNum: this.limitMoveNum,
        hoverStop: true, //是否启用鼠标hover控制
        direction: 1, //1 往上 0 往下
        openWatch: false, //开启data实时监听
        singleHeight: 0, //单条数据高度有值hoverStop关闭
        waitTime: 500 //单步停止等待时间
      }
    },
    tBigTitleStyle () {
      let obj = {
        width: '100%',
        height: `${this.tbHeight}px`,
        lineHeight: `${this.tbLineHeight}px`,
        fontSize: `${this.tbSize}px`,
        color: `${this.tbColor}`
      }
      return obj;

    },
    tSmallTitleStyle () {
      let obj = {
        width: '100%',
        height: `${this.tsHeight}px`,
        lineHeight: `${this.tsLineHeight}px`,
        fontSize: `${this.tsSize}px`,
        color: `${this.tsColor}`
      }
      return obj;

    },
    cBigTitleStyle () {
      let obj = {
        display: 'inline-block',
        float: 'left',
        marginRight: '5px',
        lineHeight: `${this.bLineHeight}px`,
        height: `${this.bHeight}px`,
        fontSize: `${this.bSize}px`,
        color: `${this.bColor}`
      }
      return obj;
    },
    cSmallTitleStyle () {
      let obj = {
        display: 'inline-block',
        float: 'left',
        marginRight: '5px',
        lineHeight: `${this.sLineHeight}px`,
        height: `${this.sHeight}px`,
        fontSize: `${this.sSize}px`,
        color: `${this.sColor}`
      }
      return obj;
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
    //交互事件外参响应事件
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
    },
    //获取按钮列表
    async getList () {
      let dataJson = await getApiSource(
        this.dataType,
        this.apiUrl,
        this.staticData
      );
      this.list = dataJson;
      this.dataArray = this.list[this.selectIndex];
    },
    //按钮列表点击切换时间
    handleListClick (index) {
      if (this.selectIndex != index) {
        this.selectIndex = index;
        this.dataArray = this.list[this.selectIndex]
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.getList();
    });
  }
};
</script>
<style scoped lang="less" type="text/less">
span {
  font-family: AgencyFBBold;
}

.business_list {
  height: 50px;
  margin: 0px 15px 15px 15px;
  cursor: pointer;
  .business_list_l {
    width: 50px;
    height: 50px;
    margin-right: 10px;
    float: left;
    background: #1b428d;
    text-align: center;
    font-weight: bold;
  }
  .business_list_r {
    width: 360px;
    height: 50px;
    float: left;
    text-align: left;
    font-weight: bold;
    .r_top {
      float: left;
      width: 100%;
      height: 20px;
    }
    .r_bottom {
      float: left;
      width: 100%;
      height: 30px;
    }
  }
}
</style>
