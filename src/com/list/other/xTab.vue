<template>
  <div :style='container'>
    <div class="oneballwrapper" v-for='(item,index) in btnList' :key="index">
      <div @click='changeBtn(index)' :style="btnSize">
        <span v-if='index==selectIndex' :style='btnStyleSelected'>{{item.btnLabel}}</span>
        <span v-else :style='btnStyle'>{{item.btnLabel}}</span>
        <img v-if='index==selectIndex' :src="selectBackground" style='width:100%;height:100%;position:absolute;left:0;top:0;z-index:0' />
        <img :src="background" style='width:100%;height:100%;position:absolute;left:0;top:0;z-index:0' />
      </div>
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
    size: { type: [Number, String] }, //字体大小
    lineHeight: { type: [Number, String] }, //字体大小
    selectColor: { type: String }, //选中的年度颜色
    color: { type: String }, //未选中的年度颜色
    // 按钮配置
    selectBackground: { type: String }, //选中的年度颜色
    background: { type: String }, //未选中的年度颜色
    bWidth: { type: [Number, String] },//按钮宽度
    bHeight: { type: [Number, String] },//按钮高度
    bSpacing: { type: [Number, String] },//按钮间距
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
    btnKey: { type: String, default: "btnKey" },
    btnLabel: { type: String, default: "btnLabel" },
  },
  data () {
    return {
      selectIndex: 0,
      btnList: [],
      last: 1,
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
    // 未选中按钮样式
    btnStyle () {
      return {
        display: "inline-block",
        width: `100%`,
        height: `${this.bHeight}px`,
        lineHeight: `${this.lineHeight}px`,
        textAlign: "center",
        position: "relative",
        zIndex: "1000",
        fontSize: this.size + "px",
        color: this.color,

      };
    },
    // 选中按钮样式
    btnStyleSelected () {
      return {
        display: "inline-block",
        width: `100%`,
        height: `${this.bHeight}px`,
        lineHeight: `${this.lineHeight}px`,
        textAlign: "center",
        position: "relative",
        zIndex: "100",
        fontSize: this.size + "px",
        color: this.selectColor,
        // animation: "rotating 5s linear infinite"
      };
    },
    btnSize () {
      return {
        width: `${this.bWidth}px`,
        height: `${this.bHeight}px`,
        float: "left",
        position: "relative",
        marginRight: `${this.bSpacing}px`
      };
    },
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
    async getBtnList () {
      let dataJson = await getApiSource(
        this.dataType,
        this.apiUrl,
        this.staticData
      );
      this.btnList = dataJson;
      this.dataArray = this.btnList[this.selectIndex];
    },
    //按钮列表点击切换时间
    changeBtn (index) {
      if (this.selectIndex != index) {
        this.selectIndex = index;
        this.dataArray = this.btnList[this.selectIndex]
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.getBtnList();
    });
  }
};
</script>
<style scoped>
@-webkit-keyframes rotating {
  0% {
    -webkit-transform: rotate(0deg);
  }

  25% {
    -webkit-transform: rotate(90deg);
  }

  50% {
    -webkit-transform: rotate(180deg);
  }

  75% {
    -webkit-transform: rotate(270deg);
  }

  100% {
    -webkit-transform: rotate(360deg);
  }
}
</style>

<style scoped lang="less" type="text/less">
span {
  font-family: AgencyFBBold;
}
</style>
