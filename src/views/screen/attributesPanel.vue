<template>
    <section class="base-page-set">
        <Tabs :animated="false" style="width:100%;height: 100%;overflow:auto;overflow-x:hidden;" v-model="tabIdx">
            
            <TabPane label="样式" v-if="current.info.ptype=='map'&&current.info.type=='markerLayer'">
                <marker-layer-style @update="update" ></marker-layer-style>
            </TabPane>
            <TabPane label="样式" v-else-if="current.info.type=='effectScatterLayer'">
                <scatter-layer-style @update="update" ></scatter-layer-style>
            </TabPane>
            <TabPane label="样式" v-else-if="current.info.ptype=='map'">
                <map-style-attribute @update="update" ></map-style-attribute>
            </TabPane>
            <TabPane label="样式" v-else>
                <p class="comName">{{current.info.name}}</p>
                <div class="attr-panel-set" v-if="names">
                    <div v-for="(item,index) in names" style="width:100%;float:left;" :key="'style_'+index">
                        <Collapse v-if="item.children" v-model="idx" accordion
                                  style="float: left;margin-top:1px;width:100%;">
                            <Panel :name="index.toString()">
                            <span class="collapse-title">
                                 {{item.name}}                                      
                                 <Icon :type="current.attributes[item.fixed].value?'md-eye':'md-eye-off'" @click.native.stop="updateComShow(item.fixed)" v-if="item.fixed" style="float:right;margin-right:20px;margin-top:10px"/>
                            </span>                            
                                <div slot="content" v-if="item.fixed==undefined || current.attributes[item.fixed].value">                                    
                                    <Form :label-width="85" class="form">
                                        <FormItem :label="child.name" :class="child.name.length===0?'full-form':''" v-for="child in item.children.filter(x=>x.key!=item.fixed)" :key="child.name">
                                            <sub-attribute :data="child" @update="update" :key="current.info.id"></sub-attribute>
                                            <!-- <field :data="getFieldValue(child)" @update="update" :key="current.info.id"></field> -->
                                        </FormItem>
                                    </Form>
                                </div>
                            </Panel>
                        </Collapse>
                        <Form :label-width="85" class="form" style="width:95%" v-else>
                            <FormItem :label="item.name">
                                <sub-attribute :data="item" @update="update" :key="current.info.id"></sub-attribute>
                            </FormItem>
                        </Form>
                    </div>
                </div>
                <Collapse accordion class="def-tab-item" value="position">
                    <Panel name="position">
                        <span class="collapse-title">基础样式</span>
                            <Form :label-width="85" class="form" slot="content">
                                <FormItem label="组件位置">
                                    <InputNumber v-model="position.offsetLeft" :active-change="false" @on-change="updatePosition"></InputNumber>
                                    <InputNumber v-model="position.offsetTop" :active-change="false" style="margin-left:10px;" @on-change="updatePosition"></InputNumber>                                    
                                </FormItem>
                            </Form>
                             <Form :label-width="85" class="form" slot="content">
                                <FormItem label="旋转角度">
                                    <InputNumber style="float:left;" v-model="position.rotate" :active-change="false" :min="0" :max="360" @on-change="updatePosition"></InputNumber>                                    
                                    <div class="scale-btn-list">
                                        <div class="scale-icon iconfont icon-shuiping" :class="position.scaleX===-1?'select':''" @click="toggleScale('x',$event)"></div>
                                        <div class="scale-icon iconfont icon-chuizhi" :class="position.scaleY===-1?'select':''" @click="toggleScale('y',$event)"></div>
                                    </div>
                                </FormItem>
                            </Form>
                             <Form :label-width="85" class="form" slot="content">
                                <FormItem label="透明度">
                                    <Slider v-model="position.opacity" :step="0.05" :min="0" :max="1" @on-change="updatePosition" show-input></Slider>                                     
                                </FormItem>
                            </Form>
                    </Panel>
                </Collapse>
            </TabPane>
            <TabPane label="数据" class="data-box">
                <p class="comName">{{current.info.name}}</p>
                <!-- <map-data-attribute @update="update" v-if="current.info.ptype=='map'"></map-data-attribute> -->
                <data-attribute @update="update"></data-attribute>
            </TabPane>
            <TabPane label="交互">
                <p class="comName" v-if="!showSigEvent">{{current.info.name}}</p>
                <div style="width:100%" v-if="!showSigEvent">
                    <outer-event></outer-event>
                    <event-attribute v-if="showEvent" @setEvent="setSigEvent"></event-attribute>
                </div>
                <sig-event-panel v-else :sigData="sigObj" @backTo="backToCurrent" @update="update"></sig-event-panel>
            </TabPane>
        </Tabs>
    </section>
</template>
<script>
    import subAttribute from './subAttribute.vue'
    import eventAttribute from './eventAttribute.vue'
    import sigEventPanel from './sigEventPanel.vue'
    import dataAttribute from './dataAttribute.vue'
    import outerEvent from './outerEvent.vue'

    import mapDataAttribute from './mapDataAttribute.vue';
    import mapStyleAttribute from './mapStyleAttribute.vue';
    import field from './components/field'
    
    import markerLayerStyle from './markerLayerStyle.vue';
    import scatterLayerStyle from './scatterLayerStyle.vue';
    import $ from 'jquery'
    export default{
        name: 'attributesPanel',
        components: {
            subAttribute, eventAttribute, sigEventPanel, dataAttribute,outerEvent,mapDataAttribute,mapStyleAttribute,
            field,markerLayerStyle,scatterLayerStyle
        },
        data(){
            return {
                idx: '0', // 样式折叠
                tabIdx: 0,// 面板切换
                showEvent: false, // 是否显示内部事件控制面板
                showSigEvent: false, // 是否显示单个元素事件配置面板
                sigObj: {}, // 单个事件数据
                names: [],
                position:{}
            }
        },
        watch: {
            current(val,old){
                if(val.info.id!=old.info.id) {
                    this.idx='0'
                    this.tabIdx=0
                }
                this.names = JSON.parse(JSON.stringify(val.names));
                this.position = JSON.parse(JSON.stringify(val.position));
                if (val.attributes.barNumbers && val.attributes.barNumbers.value === '单色') {
                    this.names.filter(i => {
                        if (i.name === '数据系列') {
                            i.children.splice(2, 1)
                        }
                    })
                }
                // 选择组件切换重置相关面板
                this.isShowEvent();
                this.backToCurrent();
            },
        },
        computed: {
            current: { //当前选中组件
                get() {
                    return this.$store.state.currentComponent[0]
                }
            }
        },
        created(){
            this.names = JSON.parse(JSON.stringify(this.current.names));
            this.position = JSON.parse(JSON.stringify(this.current.position));
            if (this.current.attributes.barNumbers && this.current.attributes.barNumbers.value === '单色') {
                this.names.filter(i => {
                    if (i.name === '数据系列') {
                        i.children.splice(2, 1)
                    }
                })
            }
            this.isShowEvent();
        },
        methods: {
            //  判断组件是否有内部子元素
            isShowEvent(){
                if (this.current.attributes._child && this.current.attributes._child.value.count > 0) {
                    this.showEvent = true;
                } else {
                    this.showEvent = false;
                }
            },
            // 修改当前组件属性块显/隐
            updateComShow(key){
                const attr = JSON.parse(JSON.stringify(this.current.attributes));
                let value=attr[key].value;
                value=!value;
                const attribute = JSON.parse(`{"attr":{"${key}":{"type":"switch","value":${value}}}}`);                
                 this.$emit('update',  Object.assign(attribute, {info: this.current.info}));
            },
            //根据字段获取字段类型及当前值
            getFieldValue(item){                
                const attr = JSON.parse(JSON.stringify(this.current.attributes));
                const key = item.key;
                return {
                    xtype:attr[key].type,
                    items:attr[key].items,
                    xval:attr[key].value
                }
            },
            // 更新回调
            update(attribute){                
                this.$emit('update', attribute);
            },
            // 切换XY旋转
            toggleScale(type,obj){                
                if(type==='x'){
                    this.position.scaleX=-this.position.scaleX
                }
                if(type==='y'){
                    this.position.scaleY=-this.position.scaleY
                }
                this.updatePosition()
            },  
            updatePosition(){
                this.$emit('updatePosition', {
                    position: {
                        offsetLeft: this.position.offsetLeft,
                        offsetTop: this.position.offsetTop,
                        rotate:this.position.rotate || 0,
                        scaleX:this.position.scaleX || 1,
                        scaleY:this.position.scaleY || 1,
                        opacity:this.position.opacity || 1                 
                    },
                    info: this.current.info
                })
            },
            // 跳转到单个事件设置面板
            setSigEvent(event){
                this.showSigEvent = true;
                this.sigObj = event;
            },
            // 跳转回当前页面
            backToCurrent(){
                this.showSigEvent = false;
                this.sigObj = {};
            }
        }
    }
</script>
<style>
@import url(../../styles/attributesPanel.css);
</style>