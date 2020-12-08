<template>
  <div class="select" ref="select">
    <div class="select-box" :style="container" :class="{'close-show': closeClassShow}">
      <div class="close-box">
        <div class="close" @click.stop="handleDel"></div>
      </div>
      <div class="cur_val" @click.stop="openDrap">{{curentVal ? curentVal : placeHolder}}</div>
      <div class="sanjiao" :class="{'rotate180': isShow}" :style="{borderTopColor: color}"></div>
    </div>
    <ul class="select-drop" :style="{width: width+'px', top: height + 2 +'px', borderRadius: radius+'px',
    fontSize: size + 'px',color: color, backgroundColor: dropBgColor, maxHeight: dropMaxHeight+'px'}"
      v-show="isShow">
      <li v-for="(item, index) in dataList" :key="'select-'+ index" @click.stop="handleSelect(index)" @mouseover="handleAddBg"
        @mouseout="handleRemoveBg">{{item.label}}</li>
    </ul>
  </div>
</template>
<script>
import { getApiSource } from "@/utils/getApiData";
import $ from 'jquery'
export default {
  name: 'dropDownSelector',
  props: {
    placeHolder: {
      type: String,
      default: '请选择'
    },
    radius: { type: [Number, String], default: 0 },
    borderColor: { type: String, default: "#FFFFFF" },
    initValue: { type: String, default: '' },
    color: { type: String, default: "#FFFFFF" },
    bgColor: { type: String, default: "#FFFFFF" },
    dropBgColor: { type: String, default: "#FFFFFF" },
    hoverDropBgColor: { type: String, default: "#FFFFFF" },
    family: { type: String, default: "AgencyFBBold" }, // 字体
    dataType: { type: String, default: 'Static' },
    apiUrl: { type: String },
    dropMaxHeight: { type: [Number, String], default: 160 }, // 高度
    size: { type: [Number, String], default: 12 },
    width: { type: [Number, String], default: 250 }, // 宽度
    height: { type: [Number, String], default: 40 }, // 高度
    staticData: {
      type: Array, default: () => {
        return []
      }
    },
    activeAttr: {
      type: Object, default: () => {
        return {}
      }
    }
  },
  mounted () {
    let _this = this
    this.$nextTick(() => {
      this.getData()
      $(this.$refs.select).parent().css({ 'overflow': 'visible' })
      $(document).on('click', function (ev) {
        _this.isShow = false

      })
    })

  },
  created () {
    this.curentVal = this.initValue
  },
  watch: {
    dataArray () {
      this.activeEvent();
    },
    activeAttr (val) {
      this.activeEvent();
    },
    curentVal (newVal) {
      if (newVal.trim()) {
        this.closeClassShow = true
      } else {
        this.closeClassShow = false
      }
    }
  },
  data () {
    return {
      currentIndex: -1,
      dataJson: [],
      text: '',
      isShow: false,
      curentVal: '',
      dataList: [],
      dataArray: {},
      closeClassShow: false
    }
  },
  computed: {
    container () {
      return {
        width: `${this.width}px`,
        height: `${this.height}px`,
        lineHeight: `${this.height - 2}px`,
        borderRadius: `${this.radius}px`,
        backgroundColor: `${this.bgColor}`,
        borderColor: `${this.borderColor}`,
        color: `${this.color}`,
        fontSize: `${this.size}px`,
        fontFamily: `${this.family}`
      }
    },
  },
  methods: {
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
    handleSelect (index) {
      if (index !== this.currentIndex) {
        this.currentIndex = index
        this.curentVal = this.dataList[index].text
        this.dataArray = this.dataList[index]
      }
      this.isShow = !this.isShow
    },
    handleDel () {
      this.curentVal = ''
      this.isShow = false
      this.currentIndex = -1
    },
    openDrap () {
      this.isShow = !this.isShow;
    },
    handleAddBg (ev) {
      ev.target.style.backgroundColor = this.hoverDropBgColor
    },
    handleRemoveBg (ev) {
      ev.target.style.backgroundColor = 'inherit'
    },
    async getData () {
      let dataJson = await getApiSource(
        this.dataType,
        this.apiUrl,
        this.staticData
      );
      this.dataJson = dataJson;
      this.dataList = dataJson.map(item => {
        return {
          text: item.text,
          label: item.label
        }
      });
      if (this.curentVal) {
        this.dataArray = {
          text: this.curentVal
        }
      }
    }
  }
}
</script>


<style lang="less" scoped>
.select {
  cursor: pointer;
  .close-show {
    &:hover {
      .close-box {
        display: block;
      }
      .sanjiao {
        display: none;
      }
    }
  }
  .select-box {
    .cur_val {
      padding-left: 15px;

      width: 100%;
      height: 100%;
    }
    position: relative;
    box-sizing: border-box;
    border-width: 1px;
    border-style: solid;

    .close-box {
      display: none;
      position: absolute;
      z-index: 9;
      right: 3px;
      top: 50%;
      transform: translateY(-50%);
      width: 21px;
      height: 21px;
      padding: 4px;
      .close {
        width: 100%;
        height: 100%;
        border: 1px solid rgb(102, 102, 102);
        border-radius: 50%;
        position: relative;
        &::before {
          content: '';
          position: absolute;
          left: 2px;
          top: 5px;

          width: 7px;
          height: 1px;
          transform: rotateZ(45deg);
          background: rgb(102, 102, 102);
        }
        &::after {
          content: '';
          position: absolute;
          left: 50%;
          top: 2px;
          margin-left: -1px;
          height: 7px;
          width: 1px;
          transform: rotateZ(45deg);
          background: rgb(102, 102, 102);
        }
      }
    }

    .sanjiao {
      position: absolute;
      width: 0px;
      height: 0px;
      border-width: 6px;
      border-radius: 1px;
      border-style: solid;
      border-color: #ffcccc transparent transparent transparent;
      right: 7px;
      top: 50%;
      margin-top: -3px;
      transition: all 0.3s;
      transform-origin: center;
    }
  }
  .select-drop {
    padding: 5px 0;
    overflow: hidden;
    position: absolute;
    left: 0;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
    overflow-y: auto;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
    li {
      list-style-type: none;
      width: inherit;
      padding: 7px 16px;
      background: inherit;
      font-size: inherit;
      box-sizing: border-box;
    }
  }
}
.rotate180 {
  transform: rotateZ(180deg);
  transform-origin: 50% 50%;
  margin-top: -12px !important;
}
</style>

