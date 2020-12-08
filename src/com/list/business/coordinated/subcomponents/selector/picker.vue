<template>
  <div class="picker" v-show="state===1" @touchmove.prevent @click="cancel">
    <div class="picker-panel" v-show="state===1" @click.stop>
      <div class="picker-content">
        <div class="mask-top border-bottom-1px"></div>
        <div class="mask-bottom border-top-1px"></div>
        <div class="wheel-wrapper" ref="wheelWrapper">
          <div class="wheel" v-for="data in pickerData">
            <ul class="wheel-scroll">
              <li v-for="item in data" class="wheel-item">{{item.text}}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from "better-scroll";

const STATE_HIDE = 0;
const STATE_SHOW = 1;

const COMPONENT_NAME = "picker";
const EVENT_SELECT = "select";
const EVENT_VALUE_CHANGE = "valuechange";
const EVENT_CANCEL = "cancel";
const EVENT_CHANGE = "change";

export default {
  name: COMPONENT_NAME,
  props: {
    data: {
      type: Array,
      default() {
        return [];
      }
    },
    title: {
      type: String
    },
    cancelTxt: {
      type: String,
      default: "cancel"
    },
    confirmTxt: {
      type: String,
      default: "confirm"
    },
    selectedIndex: {
      type: Array,
      default() {
        return [];
      }
    },
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      state: STATE_HIDE,
      pickerData: this.data.slice(),
      pickerSelectedIndex: this.selectedIndex,
      pickerSelectedVal: [],
      pickerSelectedText: []
    };
  },
  created() {
    if (!this.pickerSelectedIndex.length) {
      this.pickerSelectedIndex = [];
      for (let i = 0; i < this.pickerData.length; i++) {
        this.pickerSelectedIndex[i] = 0;
      }
    }
    BScroll.prototype.wheelTo2 = function(index = 4) {
      this.y = -index * this.itemHeight;
      this.scrollTo(0, this.y, 1000);
    };
  },

  methods: {
    confirm() {
      if (!this._canConfirm()) {
        return;
      }
      this.hide();

      let changed = false;
      for (let i = 0; i < this.pickerData.length; i++) {
        // 获得当前选中的索引
        let index = this.wheels[i].getSelectedIndex();
        alert(index);
        this.pickerSelectedIndex[i] = index;

        let value = null;
        if (this.pickerData[i].length) {
          value = this.pickerData[i][index].value;
        }
        if (this.pickerSelectedVal[i] !== value) {
          changed = true;
        }
        this.pickerSelectedText[i] = this.pickerData[i][index].text;
        alert(this.pickerSelectedText[i]);
      }

      this.$emit(
        EVENT_SELECT,
        this.pickerSelectedVal,
        this.pickerSelectedIndex,
        this.pickerSelectedText
      );

      if (changed) {
        this.$emit(
          EVENT_VALUE_CHANGE,
          this.pickerSelectedVal,
          this.pickerSelectedIndex,
          this.pickerSelectedText
        );
      }
    },
    cancel() {
      this.hide();
      this.$emit(EVENT_CANCEL);
    },
    show() {
      if (this.state === STATE_SHOW) {
        return;
      }
      this.state = STATE_SHOW;

      if (!this.wheels || this.dirty) {
        this.$nextTick(() => {
          this.wheels = [];
          let wheelWrapper = this.$refs.wheelWrapper;
          for (let i = 0; i < this.pickerData.length; i++) {
            this._createWheel(wheelWrapper, i);
          }
          this.dirty = false;
          this.scrollTo(0, 50);
        });
      } else {
        for (let i = 0; i < this.pickerData.length; i++) {
          this.wheels[i].enable();
          this.wheels[i].wheelTo(this.pickerSelectedIndex[i]);
        }
        this.scrollTo(0, 50);
      }
    },
    hide() {
      this.state = STATE_HIDE;

      for (let i = 0; i < this.pickerData.length; i++) {
        this.wheels[i].disable();
      }
    },
    setData(data) {
      this.pickerData = data.slice();
      this.dirty = true;
    },
    setSelectedIndex(index) {
      this.pickerSelectedIndex = index;
    },
    refill(datas) {
      let ret = [];
      if (!datas.length) {
        return ret;
      }
      datas.forEach((data, index) => {
        ret[index] = this.refillColumn(index, data);
      });
      return ret;
    },
    refillColumn(index, data) {
      if (this.state !== STATE_SHOW) {
        console.error("can not use refillColumn when picker is not show");
        return;
      }
      const wheelWrapper = this.$refs.wheelWrapper;
      let scroll = wheelWrapper.children[index].querySelector(".wheel-scroll");
      let wheel = this.wheels[index];
      if (scroll && wheel) {
        let oldData = this.pickerData[index];
        this.$set(this.pickerData, index, data);
        let selectedIndex = wheel.getSelectedIndex();
        let dist = 0;
        if (oldData.length) {
          let oldValue = oldData[selectedIndex].value;
          for (let i = 0; i < data.length; i++) {
            if (data[i].value === oldValue) {
              dist = i;
              break;
            }
          }
        }
        this.pickerSelectedIndex[index] = dist;
        this.$nextTick(() => {
          wheel = this._createWheel(wheelWrapper, index);
          wheel.wheelTo(dist);
        });
        return dist;
      }
    },
    // 有缓冲滑动
    scrollTo2(index, dist) {
      const wheel = this.wheels[index];
      this.pickerSelectedIndex[index] = dist;
      wheel.wheelTo2(dist);
    },
    // 没有过渡的滑动
    scrollTo(index, dist) {
      const wheel = this.wheels[index];
      this.pickerSelectedIndex[index] = dist;
      wheel.wheelTo(dist);
    },
    refresh() {
      this.$nextTick(() => {
        this.wheels.forEach((wheel, index) => {
          wheel.refresh();
        });
      });
    },
    _createWheel(wheelWrapper, i) {
      if (!this.wheels[i]) {
        this.wheels[i] = new BScroll(wheelWrapper.children[i], {
          wheel: {
            // selectedIndex: this.pickerSelectedIndex[i],
            selectedIndex: 3,
            /** 默认值就是下面配置的两个，为了展示二者的作用，这里再配置一下 */
            wheelWrapperClass: "wheel-scroll",
            wheelItemClass: "wheel-item"
          },
          probeType: 3
        });

        this.wheels[i].on("scrollEnd", () => {
          this.$emit(EVENT_CHANGE, i, this.wheels[i].getSelectedIndex());
        });
      } else {
        this.wheels[i].refresh();
      }

      return this.wheels[i];
    },
    _canConfirm() {
      return this.wheels.every(wheel => {
        return !wheel.isInTransition;
      });
    }
  },
  watch: {
    data(newData) {
      this.setData(newData);
    }
  }
};
</script>

<style scoped lang="less" >
.picker {
  position: relative;
  width: 200px;
  height: 170px;
  overflow: hidden;
  text-align: center;
  font-size: 20px;

  .picker-panel {
    position: relative;
    margin: 0 auto;
    z-index: 60;
    width: 200px;
    height: 300px;

    .picker-content {
      position: relative;
      top: -20px;

      .mask-top, .mask-bottom {
        z-index: 100;
        width: 100%;
        height: 68px;
        pointer-events: none;
        transform: translateZ(0);
      }

      .mask-top {
        position: absolute;
        top: 20px;
        z-index: 1000;
        background: linear-gradient(to top, rgba(14, 42, 67, 0.2), rgba(14, 42, 67, 0.8));
      }

      .mask-bottom {
        position: absolute;
        bottom: -10px;
        z-index: 1000;
        background: linear-gradient(to bottom, rgba(14, 42, 67, 0.2), rgba(14, 42, 67, 0.8));
      }

      .wheel-wrapper {
        display: flex;
        padding: 0 16px;
        height: 183px;
        position: relative;
        z-index: 10;

        .wheel {
          // flex-fix()
          height: 187px;
          overflow: hidden;
          font-size: 20px;

          .wheel-scroll {
            padding: 5px;
            padding-bottom: 10px;
            margin-top: 87px;
            line-height: 36px;
            list-style: none;

            .wheel-item {
              list-style: none;
              height: 36px;
              overflow: hidden;
              white-space: nowrap;
              color: #fff;
            }
          }
        }
      }
    }
  }
}
</style>
