<!--
 * @Author: 周聪
 * @Date: 2019-07-09 16:55:33
 * @LastEditors: 周聪
 * @LastEditTime: 2019-07-10 09:49:11
 * @Description: switch开关
 -->

<template>
  <div class="wraper" :style="container">
    <div class="switch-box is-info">
      <div class="disabled" v-if="isDisabled"></div>
      <input id="info" class="switch-box-input" type="checkbox" ref="switch" v-model="checked" />
      <label for="info" class="switch-box-slider" :style="{backgroundColor:isDisabled? '#dcdfe6' : checked ? activeColor : inactiveColor}">
        <p class="dot" :style="{backgroundColor: isDisabled ? '#FFF' : checked ? activeColor : inactiveColor}"></p>
      </label>
    </div>
  </div>
</template>
<script>
import { getApiSource } from "@/utils/getApiData";

export default {
  name: 'mySwtich',
  props: {
    width: { type: [Number, String], default: 250 }, // 宽度
    height: { type: [Number, String], default: 40 }, // 高度
    inactiveColor: { type: String, default: '#dcdfe6' },
    activeColor: { type: String, default: '#3498db' },
    isDisabled: { type: String | Boolean, default: false },
    isChecked: { type: String | Boolean, default: false },
    activeAttr: {
      type: Object, default: () => {
        return {}
      }
    },
  },
  data () {
    return {
      checked: true,
      dataArray: {},
    }
  },
  created () {
    this.checked = this.isChecked
  },
  watch: {
    isChecked (newVal) {
      console.log(newVal)
      this.checked = newVal
    },
    checked (newVal) {
      this.dataArray = {
        value: newVal
      }
    },
    dataArray () {
      this.activeEvent();
    },
    activeAttr (val) {
      this.activeEvent();
    },
  },
  mounted () {
    this.$nextTick(() => {
      this.getData()
    })
  },
  computed: {
    container () {
      return {
        width: `${this.width}px`,
        height: `${this.height}px`,
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
    async getData () {
      let dataJson = await getApiSource(
        this.dataType,
        this.apiUrl,
        { value: this.checked }
      );
      this.checked = dataJson.value;
    }
  }
}
</script>

<style lang="less" scoped>
.wrapper {
  position: relative;
}
.switch-box {
  padding: 5px 5px 5px 10px;
  box-sizing: content-box;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.disabled {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  cursor: not-allowed;
  z-index: 2;
}
.switch-box-input {
  display: none;
}
.switch-box .switch-box-input ~ .switch-box-label {
  margin-left: 8px;
}
.switch-box .switch-box-input:checked ~ .switch-box-slider:after {
  left: 16px;
}
.switch-box .switch-box-input:disabled ~ .switch-box-slider {
  background: #e2e2e2;
  cursor: default;
}
.switch-box.is-info
  .switch-box-input:checked:not(:disabled)
  ~ .switch-box-slider {
  background: #3498db;
}

.switch-box.is-info
  .switch-box-input:checked:not(:disabled)
  ~ .switch-box-slider:after {
  background: inherit;
}
.switch-box .switch-box-slider {
  position: relative;
  display: inline-block;
  height: 8px;
  width: 32px;
  background: #d5d5d5;
  border-radius: 8px;
  cursor: pointer;
  -webkit-transition: all 0.2s ease;
  transition: all 0.2s ease;
}
.switch-box .dot {
  position: absolute;
  left: -8px;
  top: -8px;
  display: block;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #eeeeee;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.2);
  content: '';
  -webkit-transition: all 0.2s ease;
  transition: all 0.2s ease;
}

.switch-box .switch-box-input:checked ~ .switch-box-slider .dot {
  left: 16px;
}
</style>
