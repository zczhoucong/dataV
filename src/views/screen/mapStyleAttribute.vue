<!--
    图层样式组件
    @sp
-->
<template>
    <div class="layer-box" v-if="showMapStyle">
        <div class="layer-title">
            <span class="layer-back" @click="backToList">
                <Icon type="chevron-left" size="16" color="#85d4fb"></Icon>
                <span>返回</span>
            </span>
            <span> / {{currentLayer.name}}</span>
        </div>
        <div class="attr-panel-set" v-if="currentLayer">
            <div style="width:100%;float:left;">
                <Form :label-width="100" class="form" style="width:95%">
                    <map-sub-attribute @update="update"></map-sub-attribute>
                </Form>
            </div>
        </div>
    </div>
    <!-- 底图编辑 -->
    <div style="width:100%" v-else>
        <Collapse accordion style="float: left;margin-top:1px;width:100%;" value="">
            <Panel name="">
                <span class="collapse-title">地图基础属性设置</span>
                <p slot="content">
                <Form :label-width="100" class="form" style="width:95%">
                    <FormItem label="底图类型">
                        <Select size="small" v-model="mapOption.mapType" style="width:100px;">
                            <Option v-for="(item,key) in mapType" :value="item.value" :key="key">
                                {{item.name}}
                            </Option>
                        </Select> 
                    </FormItem>
                </Form>
                <Form v-show="mapOption.mapType=='custom'" :label-width="100" class="form" style="width:95%">
                    <FormItem label="底图地址">
                        <i-input v-model="mapOption.mapUrl" placeholder="请输入底图地址" style="width: 300px"></i-input>
                    </FormItem>
                    <FormItem label="">
                        <Button type="success" @click="updateBaseMap">确认</Button>
                    </FormItem>
                </Form>
                <Form :label-width="100" class="form" style="width:95%">
                    <FormItem label="宽度">
                        <InputNumber v-model="width" @on-change="updataWoH"></InputNumber>
                    </FormItem>
                    <FormItem label="高度">
                        <InputNumber v-model="height" @on-change="updataWoH"></InputNumber>
                    </FormItem>
                    <FormItem label="地图中心点">
                        <i-input v-model="mapOption.mapCenter"></i-input>
                    </FormItem>
                    <FormItem label="倾斜度">
                        <Slider v-model="mapOption.mapPitch" :min="0" :max="80"></Slider>
                    </FormItem>
                    <FormItem label="底图透明度">
                        <Slider v-model="mapOption.mapOpacity" :step="0.1" :min='0' :max='1'></Slider>
                    </FormItem>
                    <FormItem label="地图缩放级别">
                        <InputNumber v-model="mapOption.mapZoomLevel"></InputNumber>
                    </FormItem>
                    <FormItem label="开启缩放">
                        <Checkbox v-model="mapOption.mapZoomStatus"></Checkbox>
                    </FormItem>
                    <FormItem label="开启拖拽">
                        <Checkbox v-model="mapOption.mapDragStatus"></Checkbox>
                    </FormItem>
                    <FormItem label="比例尺">
                        <Checkbox v-model="mapOption.mapScaleControlStatus"></Checkbox>
                    </FormItem>
                </Form>
                </p>
            </Panel>
        </Collapse>
        <Collapse accordion style="float: left;margin-top:1px;width:100%;" value="">
            <Panel name="">
                <span class="collapse-title">组件位置</span>
                <p slot="content">
                <Form :label-width="100" class="form" style="width:95%">
                    <FormItem label="X轴坐标">
                        <InputNumber v-model="position.offsetLeft" @on-change="updatePosition"></InputNumber>
                    </FormItem>
                    <FormItem label="Y轴坐标">
                        <InputNumber v-model="position.offsetTop" @on-change="updatePosition"></InputNumber>
                    </FormItem>
                </Form>
                </p>
            </Panel>
        </Collapse>
        <Collapse style="float: left;margin-top:1px;width:100%;" value="layerStyle">
            <Panel name="layerStyle">
                <span class="collapse-title">图层样式编辑</span>
                <br><br>
                <ul slot="content">
                    <li v-for="(item,index) in layerStyles" @click="showLayerStyle(item,index)" class="layers-list">{{item.name}}</li>
                </ul>
            </Panel>
        </Collapse>
    </div>
</template>
<script>
    import editor from 'vue2-ace-editor';
    import axios from 'axios';
    
    import mapSubAttribute from './mapSubAttribute';
    let mapConfig = window.mapConfig;
    export default {
        name: 'mapStyleAttribute',
        components: {
            editor,mapSubAttribute
        },
        data(){
            return {
                viewBtn:false,
                layerStyles:null,
                showMapStyle:false,
                currentLayer:null,
                currentIndex:null,
                position:{},
                width:null,
                height:null,
                mapType: [
                    {name:'腾讯',value:'tencent'},
                    {name:'百度',value:'baidu'},
                    {name:'谷歌',value:'google'},
                    {name:'天地图',value:'tdt'},
                    {name:'自定义底图地址',value:'custom'}
                ],
                mapOption:{
                    mapType: mapConfig.mapType,
                    mapUrl: mapConfig.mapUrl,
                    mapPitch: mapConfig.mapPitch,
                    mapOpacity: mapConfig.mapOpacity,
                    mapCenter: mapConfig.mapCenter,
                    mapZoomLevel: mapConfig.mapZoomLevel,
                    mapZoomStatus: mapConfig.mapZoomStatus,
                    mapDragStatus: mapConfig.mapDragStatus,
                    mapScaleControlStatus:mapConfig.mapScaleControlStatus
                }
            }
        },
        watch: {
            current(val){
                // this.layerStyles = val.attributes.sourceStyle.value;
                this.position = JSON.parse(JSON.stringify(val.position));
                this.width = val.attributes.width.value;
                this.height = val.attributes.height.value;
            },
            "mapOption.mapCenter" (val) {
                if (val !== "") {
                    this.updateCenterAndZoom()
                    this.updateMapConfig()
                }
            },
            "mapOption.mapZoomLevel" (val) {
                if (val > 0) {                    
                    this.updateCenterAndZoom()
                    this.updateMapConfig()
                }
            },
            "mapOption.mapPitch" (val) {
                if (val > 0) {
                    this.updatePitch(val)
                    this.updateMapConfig()
                }
            },
            'mapOption.mapType'(val){
                this.updateMapConfig()
                this.$mapapi.mapInit('', mapConfig.mapType, mapConfig.mapUrl, mapConfig, ()=>{ })
            },
            'mapOption.mapZoomStatus'(val){
                this.updateMapConfig()
                this.$mapapi.setZoomStatus(val)
            },
            'mapOption.mapDragStatus'(val){
                this.updateMapConfig()
                this.$mapapi.setDragStatus(val)
            },
            'mapOption.mapScaleControlStatus'(val){
                this.updateMapConfig()
                this.$mapapi.showScaleTools(val)
            },
            'mapOption.mapOpacity'(val){
                console.log(val)
                this.updateMapConfig()
                this.$mapapi.setMapOpacity(val)
            }
        },
        computed: {
            current: { //当前选中组件
                get(value) {
                    return this.$store.state.currentComponent[0]
                }
            }
        },
        mounted() {
            this.$nextTick(() => {
                // this.layerStyles = this.current.attributes.sourceStyle.value;//this.current.names;
                this.position = this.current.position;
                this.width = this.current.attributes.width.value;
                this.height = this.current.attributes.height.value;
            })
        },
        methods: {
            update(attribute){
                this.$emit('update', attribute);
            },
            updataWoH(){
                let arr = JSON.parse(JSON.stringify(this.current.attributes));
                arr.width.value = this.width;
                arr.height.value = this.height;
                //更改当前组件数值
                this.update(Object.assign({attr: arr}, {info: this.current.info}));
            },
            updatePosition(){
                this.$parent.$parent.$parent.$parent.$refs.dragView.updatePosition({
                    position: {
                        offsetLeft: this.position.offsetLeft,
                        offsetTop: this.position.offsetTop,
                    },
                    info: this.current.info
                });
            },
            showLayerStyle(e,i){
                this.showMapStyle = true;
                this.currentLayer = e;
                this.currentIndex = i;
            },
            backToList(){
                this.showMapStyle = false;
                this.currentLayer = null;
            },
            updatePitch(pitch){
                this.$mapapi.setPitch(pitch);
            },
            updateCenterAndZoom(){
                let center = [], zoom = 1;
                if(this.mapOption.mapCenter && this.mapOption.mapCenter != '' && this.mapOption.mapCenter.includes(',')){
                    center = this.mapOption.mapCenter.split(',');
                }
                if(this.mapOption.mapZoomLevel !='' && Number(this.mapOption.mapZoomLevel) > 0)
                    zoom = this.mapOption.mapZoomLevel;
                this.$mapapi.setCenterAndZoom(center,zoom);
            },
            updateBaseMap(){

            },
            updateMapConfig(){
                window.mapConfig.mapType = this.mapOption.mapType;
                window.mapConfig.mapCenter = this.mapOption.mapCenter;
                window.mapConfig.mapUrl = this.mapOption.mapUrl;
                window.mapConfig.mapPitch = this.mapOption.mapPitch;
                window.mapConfig.mapOpacity = this.mapOption.mapOpacity;
                window.mapConfig.mapZoomLevel = this.mapOption.mapZoomLevel;
                window.mapConfig.mapZoomStatus = this.mapOption.mapZoomStatus;
                window.mapConfig.mapDragStatus = this.mapOption.mapDragStatus;
                window.mapConfig.mapScaleControlStatus = this.mapOption.mapScaleControlStatus;
            }
        }
    }
</script>
<style scoped>
    .layers-list {
        height: 30px;
        line-height: 30px;
        width: 100%;
        padding-left: 20px;
        border-bottom: 1px solid #ddd;
        cursor: pointer;
    }

    .layer-box .ivu-collapse-content {
        padding: 5px 0 !important;
    }

    .layer-box {
        float: left;
        width: 100%;
    }
    .layer-title {
        font-size: 14px;
        padding: 0 20px 10px;
        
    }
    .layer-back {
        cursor: pointer;
        color: #aaa;
    }
</style>