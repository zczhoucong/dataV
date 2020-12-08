<!--
    标注图层样式组件
-->
<template>
  <div style="width:100%">
    <Collapse accordion style="float: left;margin-top:1px;width:100%;">
      <Panel>
        <span class="collapse-title">标注文本设置</span>
        <p slot="content">
            <Form :label-width="100" class="form" style="width:95%">
            <!-- <FormItem label="文本显示/隐藏">
                <Checkbox v-model="markerOption.TextShowStatus" @on-change="updateMarker"></Checkbox>
            </FormItem> -->
            <FormItem label="标注字段">
                <i-input
                v-model="markerStyle.TextField"
                placeholder="请输入属性字段"
                @on-change="updateMarker"
                ></i-input>
            </FormItem>
            <FormItem label="颜色">
                <ColorPicker v-model="markerStyle.textFill" @on-change="updateMarker"/>
            </FormItem>
            <FormItem label="字体">
                <Select size="small" v-model="markerStyle.textFaceName" @on-change="updateMarker">
                <Option v-for="(item,key) in fontFamily" :value="item.name" :key="key">{{item.name}}</Option>
                </Select>
            </FormItem>
            <FormItem label="加粗">
                <Select
                size="small"
                v-model="markerStyle.textWeight"
                style="width:100px;"
                @on-change="updateMarker"
                >
                <Option v-for="(item,key) in textWeight" :value="item.name" :key="key">{{item.name}}</Option>
                </Select>
            </FormItem>
            <FormItem label="字体大小">
                <InputNumber v-model="markerStyle.textSize" @on-change="updateMarker"></InputNumber>
            </FormItem>
            <FormItem label="透明度">
                <Slider
                v-model="markerStyle.textOpacity"
                :step="0.1"
                :min="0"
                :max="1"
                @on-change="updateMarker"
                ></Slider>
            </FormItem>
            <FormItem label="字体描边(粗细)">
                <Slider
                v-model="markerStyle.textHaloRadius"
                :step="1"
                :min="1"
                :max="10"
                @on-change="updateMarker"
                ></Slider>
            </FormItem>
            <FormItem label="描边透明度">
                <Slider
                v-model="markerStyle.textHaloOpacity"
                :step="0.1"
                :min="0"
                :max="1"
                @on-change="updateMarker"
                ></Slider>
            </FormItem>
            <FormItem label="描边颜色">
                <ColorPicker v-model="markerStyle.textHaloFill" @on-change="updateMarker"/>
            </FormItem>
            <FormItem label="位置调整(X)">
                <InputNumber v-model="markerStyle.textDx" @on-change="updateMarker"></InputNumber>
            </FormItem>
            <FormItem label="位置调整(Y)">
                <InputNumber v-model="markerStyle.textDy" @on-change="updateMarker"></InputNumber>
            </FormItem>
            </Form>
        </p>
      </Panel>
    </Collapse>
    <Collapse accordion style="float: left;margin-top:1px;width:100%;">
      <Panel>
        <span class="collapse-title">标注设置</span>
        <p slot="content">
            <Form :label-width="100" class="form" style="width:95%">
                <FormItem label="标注类型">
                    <span class="markerIcon" v-for="(item,key) in markerType" :key="key" :style="getStyle(item)"  @click="changeMarkerName(item)"></span>
                </FormItem>
                <FormItem label="标注宽度">
                    <InputNumber v-model="markerStyle.markerWidth" @on-change="updateMarker"></InputNumber>
                </FormItem>
                <FormItem label="标注高度">
                    <InputNumber v-model="markerStyle.markerHeight" @on-change="updateMarker"></InputNumber>
                </FormItem>
                <FormItem label="标注透明度">
                    <Slider
                    v-model="markerStyle.markerOpacity"
                    :step="0.1"
                    :min="0"
                    :max="1"
                    @on-change="updateMarker"
                    ></Slider>
                </FormItem>
                <FormItem label="横向调整">
                    <InputNumber v-model="markerStyle.markerDx" @on-change="updateMarker"></InputNumber>
                </FormItem>
                <FormItem label="纵向调整">
                    <InputNumber v-model="markerStyle.markerDy" @on-change="updateMarker"></InputNumber>
                </FormItem>
            </Form>
        </p>
      </Panel>
    </Collapse>
  </div>
</template>
<script>
export default {
  name: "markerlayerstyle",
  data() {
    return {
      markerStyle: {
        TextField: "",
        textFill: "#fff",
        textFaceName: "arial",
        textWeight: "normal",
        textSize: 14,
        textOpacity: 1,
        textDx: 0,
        textDy: 0,
        textHaloOpacity: 0,
        textHaloFill: '#fff',
        textHaloRadius: 0,
        markerFile: '',
        markerWidth: 24,
        markerHeight: 34,
        markerOpacity: 1,
        markerDx: 0,
        markerDy: 0
      },
      fontFamily: [
        { name: "Microsoft Yahei", id: "fontname" },
        { name: "AgencyFBBold", id: "fontname" },
        { name: "DS-Digital", id: "fontname" },
        { name: "SimSun", id: "fontname" },
        { name: "SimHei", id: "fontname" },
        { name: "LiSu", id: "fontname" },
        { name: "YouYuan", id: "fontname" },
        { name: "tahoma", id: "fontname" },
        { name: "arial", id: "fontname" },
        { name: "sans-serif", id: "fontname" }
      ],
      textWeight: [
        { name: "normal", id: "1" },
        { name: "bold", id: "1" },
        { name: "bolder", id: "1" },
        { name: "lighter", id: "1" },
        { name: "100", id: "1" },
        { name: "200", id: "1" },
        { name: "300", id: "1" },
        { name: "400", id: "1" },
        { name: "600", id: "1" },
        { name: "800", id: "1" }
      ],
      markerType: []
    };
  },
  watch: {},
  computed: {},
  mounted() {
    let data = [];
    for (let i = 1; i < 5; i++) {
      for (let j = 1; j < 6; j++) {
        let name = `marker-${i}-${j}`;
        data.push({
          imgname: name,
          imgsrc: `../../../static/map/${name}.png`
        });
      }
    }
    this.markerType = data;
    this.markerStyle = window.markerOption['markerlayer1'];
    this.updateMarkerStyle();
  },
  methods: {
    updateMarker() {
        window.markerOption['markerlayer1'] = this.markerStyle;
        this.updateMarkerStyle();
    },
    updateMarkerStyle(){
      this.$mapapi.updateMarkerStyle("markerlayer1", window.markerOption['markerlayer1']);
    },
    changeMarkerName(item) {
      this.markerStyle.markerFile = item.imgname;
      this.updateMarker();
    },
    getStyle(item){
      return {
        'background-image':`url(${item.imgsrc})`
      }
    }
  }
};
</script>
<style scoped>
.markerIcon {
    display: inline-block;
    text-align: center;
    color: #fff;
    white-space: nowrap;
    position: relative;
    overflow: hidden;
    vertical-align: middle;
    width: 35px;
    height: 35px;
    line-height: 35px;
    border-radius: 17px;
    margin: 7px;
    background: rgb(255, 255, 255);
    background-repeat:no-repeat; 
    background-size:70% 70%;
    background-position:center;
    cursor: pointer;
}
</style>