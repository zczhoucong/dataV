<template>
    <section class="screen-box">
        <x-header :pgid="pgId" @publishOk="publishEvent"></x-header>
        <div class="screen-body">
            <layer-control @updatePosition="updatePosition" v-show="showLayer"></layer-control>
            <drag-view ref="dragView" :pgId="pgId" @toggleLeft="toggleLayer" @toggleRight="toggleSetControl"></drag-view>
            <!--控制面板-->
            <div class="com-config-area" v-show="showConfig">
                <!--页面设置-->
                <attributes-panel v-if="current.length===1" @update="update" @updatePosition="updatePosition"></attributes-panel>
                <page-config :show="current.length===0" :pgId="pgId" :key="configKey"></page-config>
               
                <div v-show="current.length>1" class="base-page-set">
                    <p class="base-title">排列布局</p>
                    <Form :label-width="100" style="margin-top:10px;">
                        <FormItem label="对齐">
                            <ButtonGroup>
                                <Button  class="align-btn" v-for="btn in alignBtnList"
                                        @click.native="alignAction(btn.key)" :key="btn.key">
                                    <Tooltip :content="btn.title" placement="bottom">
                                        <i class="align-icon align-btn-icon" :class="btn.icon"></i>
                                    </Tooltip>
                                </Button>
                            </ButtonGroup>
                        </FormItem>
                        <FormItem label="分布" v-show="current.length>2">
                            <ButtonGroup>
                                <Button class="align-btn" @click.native="alignAction('horizontal')">
                                    <Tooltip content="水平" placement="bottom">                                        
                                        <i class="align-icon align-btn-icon icon-shuipingjuzhong"></i>
                                    </Tooltip>
                                </Button>
                                <Button class="align-btn" @click.native="alignAction('vertical')">
                                    <Tooltip content="垂直" placement="bottom">
                                        <i class="align-icon align-btn-icon icon-chuizhijuzhong"></i>
                                    </Tooltip>
                                </Button>
                            </ButtonGroup>
                        </FormItem>
                    </Form>
                </div>
            </div>
        </div>
        <publish-dialog :pubOk="pubOk" :pgId="pgId" @closeTip="pubOk = false"></publish-dialog>
    </section>
</template>
<script>    
    import mount from '../../com/mount';
    import {getTemplate} from '../../com/template/index'
    import dragView from './dragView.vue'
    import html2canvas from 'html2canvas'
    import layerControl from './components/layerControl.vue'
    import attributesPanel from './attributesPanel'
    import publishDialog from './publishDialog.vue'
    import bgImage from '../../com/components/bgImage'
    import xHeader from './components/header.vue'
    import pageConfig from './components/pageConfig.vue'
    import {getPageConfig} from '@/api/page'
    import {getPageComs} from '@/api/com'
    import {getSkinList} from '@/api/skin'
    import {getThemeList} from '@/utils/getApiData'
    export default{
        components: {
            dragView, attributesPanel, layerControl, bgImage, publishDialog,xHeader,pageConfig
        },
        data() {
            return { 
                showLayer: true,
                showConfig:true,
                pubOk: false,   
                publishKey:new Date().getTime(),             
                pgId: this.$route.query.pgId, // 当前页面ID  
                configKey:0,                          
                baseSet: {
                    width: this.$store.state.config.width,
                    height: this.$store.state.config.height,
                    backgroundImage: this.$store.state.config.backgroundImage,
                    color: this.$store.state.config.color,
                    skinId: this.$store.state.config.skinId
                },
                // 对齐按钮列表
                alignBtnList: [{
                    title: '顶对齐',
                    key: 'top',
                    icon: 'icon-shangduiqi'
                }, {
                    title: '垂直居中对齐',
                    key: 'middle',
                    icon: 'icon-chuizhijuzhongduiqi'
                }, {
                    title: '底对齐',
                    key: 'bottom',
                    icon: 'icon-xiaduiqi'
                }, {
                    title: '左对齐',
                    key: 'left',
                    icon: 'icon-zuoduiqi'
                }, {
                    title: '水平居中对齐',
                    key: 'center',
                    icon: 'icon-shuipingjuzhongduiqi'
                }, {
                    title: '右对齐',
                    key: 'right',
                    icon: 'icon-youduiqi'
                }],
                // 控制按钮点击之间的时间间隔
                timeName: {
                    timeSave: true,
                    timePublish: true
                },
                themeList:[]
            }
        },
        created(){
            this.initThemeList();
            this.GetPageConfig();
            this.GetPageComList();
        },
        computed: {
            current: { //当前选中组件
                get() {
                    return this.$store.state.currentComponent
                }
            },
            components: { //组件树 ，预览视图中所有组件
                get() {
                    return this.$store.state.components
                },
                set(components) {
                    this.$store.commit('setComponents', {
                        components: components,
                        pgId: this.pgId
                    })
                }
            },
            flag(){
                return this.$store.state.flag
            }
        },
        methods: {
            closeTip(){
                this.pubOk = false;
            },
            publishEvent(){
                this.pubOk=true;
                this.publishKey=new Date().getTime()
            },
            // 控制图层板块显影
            toggleLayer(flag){
                this.showLayer = flag;
            },
            // 控制页面|组件设置板块显影
            toggleSetControl(flag){
                this.showConfig=flag
            },
            update(attribute){                
                this.$refs.dragView.updateAttribute(attribute);
            },
            updatePosition(attribute){
                this.$refs.dragView.updatePosition(attribute);
            },
            // mount(components){
            //     //挂载及更新视图中组件的位置信息
            //     components = JSON.parse(JSON.stringify(components));
            //     if (components === "") return;
            //     setTimeout(() => {
            //         this.components = components
            //         components.forEach(component => {
            //             //todo 根据组件获取组件模板
            //             const _com = getTemplate(component.info, component.attributes, component.slots, component.events, component.active);
            //             this.$store.state.components.forEach((item, index) => {
            //                 if (item.info.id == _com.info.id) {
            //                     this.$store.state.components[index] = Object.assign(item, _com)
            //                 }
            //             })
            //             mount(component.info.id, _com);
            //         })
            //     }, 0)
            // },
            // 根据类型使多元素对齐
            alignAction(key){
                if (!key || this.current.length < 2) return;
                //左对齐 将选中组件的横向偏移
                let minX = this.current[0].position.offsetLeft,
                    minY = this.current[0].position.offsetTop,
                    maxX = this.current[0].position.offsetLeft,
                    maxY = this.current[0].position.offsetTop,
                    maxWidth = this.current[0].position.offsetLeft + this.current[0].attributes.width.value,
                    maxHeight = this.current[0].position.offsetTop + this.current[0].attributes.height.value;
                let numX = 0, numY = 0;
                const num = this.current.length; // 选中数组数量
                this.current.forEach(com => {
                    if (com.position.offsetLeft <= minX) { // 根据判断获取最小X轴
                        minX = com.position.offsetLeft;
                    }
                    if (com.position.offsetLeft >= maxX) { // 根据判断获取最大X轴
                        maxX = com.position.offsetLeft;
                    }
                    if (com.position.offsetTop <= minY) { // 根据判断获取最小Y轴
                        minY = com.position.offsetTop;
                    }
                    if (com.position.offsetTop >= maxY) { // 根据判断获取最大Y轴
                        maxY = com.position.offsetTop;
                    }
                    if ((com.position.offsetLeft + com.attributes.width.value) >= maxWidth) { // 根据判断获取最右边组件右边位置
                        maxWidth = com.position.offsetLeft + com.attributes.width.value;
                    }
                    if ((com.position.offsetTop + com.attributes.height.value) >= maxHeight) { // 根据判断获取最底部组件底边位置
                        maxHeight = com.position.offsetTop + com.attributes.height.value;
                    }
                    numX += com.position.offsetLeft + com.attributes.width.value / 2;
                    numY += com.position.offsetTop + com.attributes.height.value / 2;
                });
                const avageX = (numX / num).toFixed(2); // 水平居中
                const avageY = (numY / num).toFixed(2); // 垂直居中
                let position = {};
                switch (key) {
                    case "top":  // 顶对齐
                        position = {offsetTop: minY};
                        this.leftTop(position);
                        break;
                    case "left": // 左对齐
                        position = {offsetLeft: minX};
                        this.leftTop(position);
                        break;
                    case "bottom": // 底对齐
                        this.current.forEach(com => {
                            position = {
                                offsetTop: (maxHeight - com.attributes.height.value)
                            }
                            this.updatePosition({
                                position: Object.assign(com.position, position),
                                info: com.info
                            });
                        });
                        break;
                    case "right": // 右对齐
                        this.current.forEach(com => {
                            position = {
                                offsetLeft: (maxWidth - com.attributes.width.value)
                            }
                            this.updatePosition({
                                position: Object.assign(com.position, position),
                                info: com.info
                            });
                        });
                        break;
                    case "middle": // 垂直居中对齐
                        this.current.forEach(com => {
                            position = {
                                offsetTop: avageY - com.attributes.height.value / 2
                            }
                            this.$refs.dragView.updateAttribute({
                                position: Object.assign(com.position, position),
                                info: com.info
                            });
                        });
                        break;
                    case "center": // 水平居中对齐
                        this.current.forEach(com => {
                            position = {
                                offsetLeft: avageX - com.attributes.width.value / 2
                            }
                            this.updatePosition({
                                position: Object.assign(com.position, position),
                                info: com.info
                            });
                        });
                        break;
                    case "horizontal": // 水平
                        this.horizontalSpread();
                        break;
                    case "vertical": // 垂直
                        this.verticalSpread();
                        break;
                }
            },
            // 左对齐、顶部对齐
            leftTop(position){
                this.current.forEach(com => {
                    this.updatePosition({
                        position: Object.assign(com.position, position),
                        info: com.info
                    });
                });
            },
            //水平分布
            horizontalSpread(){
                const ascX = this.current.sort((a, b) => a.position.offsetLeft > b.position.offsetLeft ? 1 : -1); // 按照X轴进行从左到右组件排序
                const num = ascX.length - 1;
                const lastX = ascX[num].position.offsetLeft; // 计算最右边组件X轴
                const firstX = ascX[0].position.offsetLeft; // 计算最左边组件X轴
                let widths = 0;
                ascX.forEach((i, index) => {
                    if (index < num) {
                        widths += i.attributes.width.value; // 计算除右组件外其他组件宽度和
                    }
                });
                const pieceX = (lastX - firstX - widths) / num; // 等分
                let position = {};
                let offsetWidth = 0;
                ascX.forEach((com, index) => {
                    if (index > 0 && index < num) {
                        position = {
                            offsetLeft: pieceX * index + offsetWidth + firstX
                        };
                        this.updatePosition({
                            position: Object.assign(com.position, position),
                            info: com.info
                        });
                    }
                    offsetWidth += com.attributes.width.value;
                });
            },
            // 垂直分布
            verticalSpread(){
                const ascY = this.current.sort((a, b) => a.position.offsetTop > b.position.offsetTop ? 1 : -1);
                const num = ascY.length - 1;
                const lastY = ascY[num].position.offsetTop; // 计算最底边组件Y轴
                const firstY = ascY[0].position.offsetTop; // 计算最上边组件Y轴
                let heights = 0;
                ascY.forEach((i, index) => {
                    if (index < num) {
                        heights += i.attributes.height.value; // 计算除底组件外其他组件高度和
                    }
                });
                const pieceY = (lastY - firstY - heights) / num; // 等分
                let position = {};
                let offsetHeight = 0;
                ascY.forEach((com, index) => {
                    if (index > 0 && index < num) {
                        position = {
                            offsetTop: pieceY * index + offsetHeight + firstY
                        }
                        this.updatePosition({
                            position: Object.assign(com.position, position),
                            info: com.info
                        });
                    }
                    offsetHeight += com.attributes.height.value;
                });
            },
             // 获取颜色主题方案
             async initThemeList(){                
              await getSkinList().then(resp=>{                
                    if(resp.resCode===0){
                        const skinThemes= resp.data.map(x=>{                            
                            x.color=JSON.parse(x.color);
                            return x;
                        })          
                        this.$store.dispatch('setTheme',skinThemes)
                        this.themeList=skinThemes
                    }                  
                })
            },
            // 获取页面配置
            GetPageConfig() {
                getPageConfig({
                    pageId:this.pgId,
                    type:0
                }).then(resp => {
                    const skinId=this.$store.state.config.skinId;
                    if (resp.resCode === 0&&resp.data!==null) {                        
                            const info = resp.data
                            this.baseSet = {
                                width: parseFloat(info.width),
                                height: parseFloat(info.height),
                                backgroundImage: `${info.bg_pic}`,
                                color: `${info.bg_color}`,
                                skinId:info.skinId===0?skinId : info.skinId
                            };                            
                            this.$store.commit('updataConfig', {
                                config: this.baseSet,
                                pgId: this.pgId
                            })    
                            this.screen = info.screen   
                            this.$store.dispatch('setScreen',this.screen)                             
                    }
                    this.themeList.forEach(x=>{
                        if(x.skinId===this.$store.state.config.skinId){                            
                            sessionStorage.setItem("skin", JSON.stringify(x.color));  
                        }
                    })
                    this.configKey=1;   
                })
            },
            //获取页面组件列表
            GetPageComList(){
                getPageComs({pageId:this.pgId,type:0}).then(resp=>{                        
                    let components=[]               
                    resp.data.forEach(com=>{
                         const value= JSON.parse(com.com_value)
                         const _com= getTemplate(value.info, value.attributes, value.slots, value.events, value.active);
                         let position={
                             rotate:0,
                            scaleX:1,
                            scaleY:1,
                            opacity:1
                         }
                         Object.assign(position,value.position)
                         _com.position=position
                         components.push(JSON.parse(JSON.stringify(_com)))                
                    })
                    this.components=components
                    this.mountAll(components)
                })
            },
             mountAll(components){
                components.forEach(component => {
                    mount(component.info.id, component);
                })
            },
        },
    }
</script>
<style lang="less">
    @import '../../styles/screen.less';
    @import "../../../static/fonts/align.css";

    .align-btn {
        padding: 0 !important;
    }

    .align-btn-icon {
        padding: 4px 8px;
    }
</style>