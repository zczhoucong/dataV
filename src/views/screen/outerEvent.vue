<!--组件对外交互事件 高春超 2018年6月12日11:50:49-->
<template>
    <div style="width:100%" class="outer-collapse">
        <Collapse class="def-tab-item" value="outerEvent">
            <Panel name="outerEvent">
                <span class="collapse-title">交互事件</span>
                <p slot="content" v-if="activeList.length===0">
                    <span class="no-tips">该组件暂无交互事件</span>
                </p>
                <div style="width:100%" v-else slot="content">
                    <Collapse accordion class="def-tab-item" value="0">
                        <Panel :name="index+''" v-for="(item,index) in activeList" :key="index"
                               style="background-color:#363636">
                            <span class="collapse-title" style="color:#fff;">
                                 {{item.name}}
                            </span>
                            <Icon type="plus-circled" size="18" title="添加字段" color="#fff"
                                  style="float: right;margin:10px" @click.stop.native="addParams(item)"></Icon>
                            <!--<Button type="primary" size="small" style="float: right;margin:6px 5px;"-->
                            <!--@click.stop.native="addParams(item)">-->
                            <!--字段-->
                            <!--</Button>-->
                            <div slot="content">
                                <div class="attr-table" style="padding-bottom:20px;">
                                    <table style="width:100%;">
                                        <thead>
                                        <tr style="color:#999;height: 30px;" class="black">
                                            <th style="width:30%">字段</th>
                                            <th style="width:35%">映射</th>
                                            <th style="width:35%">说明</th>
                                        </tr>
                                        </thead>
                                        <tbody style="color:#fff;text-align: center">
                                        <tr class="attr-tr" v-for="(child,index) in item.children" :key="index">
                                            <td v-if="child.default===0">{{child.key}}</td>
                                            <td v-else>
                                                <input type="text" v-model="child.key" class="attr-ipt"
                                                       style="text-align: center" @blur="disableActive(item)"
                                                       placeholder="自定义字段">
                                            </td>
                                            <td>
                                                <input type="text" v-model="child.value" class="attr-ipt"
                                                       style="text-align: center" @blur="disableActive(item)"
                                                       placeholder="可自定义">
                                            </td>
                                            <td v-if="child.default===0">{{child.name}}</td>
                                            <td v-else>
                                                <Icon type="trash-a" size="16" color="#2d8cf0" style="cursor:pointer"
                                                      @click.native="delParams(item,index)"></Icon>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    <div class="btn-box">
                                        <Button :type="item.enable?'error':'info'"
                                                @click.native.stop="changeEnable(item)">
                                            {{item.enable?'关闭交互响应':'启动交互响应'}}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Panel>
                    </Collapse>
                </div>
            </Panel>
        </Collapse>
    </div>
</template>
<script>
    import mount from '../../com/mount';
    import {getTemplate} from '../../com/template/index'
    import {saveCom} from  '@/api/com'
    export default{
        name: 'eventAttribute',
        data(){
            return {
                activeList: [], // 交互列表
                timer: '',
                pgId: this.$route.query.pgId, // 当前页面ID
            }
        },
        computed: {
            current: { //当前选中组件
                get() {
                    return this.$store.state.currentComponent[0]
                }
            }
        },
        watch: {
            current(newVal, oldVal){
                // 判断是否是同一组件，并且是否是交互组件
                if (newVal.active) {
                    this.activeList = JSON.parse(JSON.stringify(newVal.active));
                } else {
                    this.activeList = [];
                }
            }
        },
        mounted(){
            this.$nextTick(() => {
                this.initData();
            })
        },
        methods: {
            // 列表初始化赋值
            initData(){
                const active = this.$store.state.currentComponent[0].active;
                if (active) {
                    this.activeList = JSON.parse(JSON.stringify(active));
                } else {
                    this.active = [];
                }
            },
            //切换交互响应按钮
            changeEnable(item){
                if (this.timer != '' && new Date().getTime() - this.timer < 200)  return;
                item.enable = !item.enable;
                if (item.enable) {
                    const _index = item.children.findIndex(i => i.key === '');
                    if (_index > -1) {
                        this.$Message.destroy();
                        this.$Message.warning("字段列表中含有空字段，请先补全或者删除");
                        item.enable = false;
                    }
                    item.children.forEach(i => {
                        if (i.value === '') {
                            i.value = i.key;
                        }
                    })
                    this.enableActive(item);
                } else {
                    this.disableActive(item);
                }
                this.timer = new Date().getTime();
            },
            //新增交互字段
            addParams(item){
                // 判断参数列表中是否有无效字段
                const _idx = item.children.findIndex(i => i.key === '');
                if (_idx > -1) {
                    this.$Message.destroy();
                    this.$Message.warning("字段列表中含有空字段，请先补全或者删除");
                } else {
                    item.children.push({
                        name: '',
                        default: 1,
                        key: '',
                        value: ''
                    });
                    item.enable = false;
                }
            },
            //删除交互字段
            delParams(item, index){
                item.children.splice(index, 1);
                this.disableActive(item);
            },
            //响应交互关闭事件
            disableActive(item){
                item.enable = false;
                this.enableActive();
            },
            //响应交互开启事件
            enableActive(){
                const info = this.current.info;
                // 获取当前store里的所有组件
                let components = JSON.parse(JSON.stringify(this.$store.state.components));
                let currentComponent = JSON.parse(JSON.stringify(this.$store.state.currentComponent));
                // 获取被修改组件索引
                let index = components.findIndex(component => component.info.id === info.id);
                let _index = currentComponent.findIndex(component => component.info.id === info.id);
                let current = components.filter(component => component.info.id === info.id)[0];
                Object.assign(current.active, this.activeList);
                let component = getTemplate(info, current.attributes, current.slots, current.events, current.active); //更新模板
                current.template = component.template;
                components[index] = current;
                currentComponent[_index] = current;

                // 重置当前store里的所有组件
                this.$store.commit('setState', {
                    components: components,
                    pgId: this.pgId
                });
                this.$store.commit('setCurrentCom', {
                    currentComponent: currentComponent
                });
                mount(current.info.id, current, this);
                this.saveCurComInfo(current)

            },
             // 保存组件信息
            saveCurComInfo(component){
                const info= {
                    attributes:component.attributes,
                    dataApi:component.dataApi,
                    info:component.info,
                    position:component.position,
                    active:component.active,                    
                    events:component.events
                }                           
                saveCom({pageId:this.pgId,com_Id:component.info.id,com_value:JSON.stringify(info)})     
            },
        }
    }
</script>
<style>
    .outer-collapse .ivu-collapse-content {
        padding: 0 !important;
    }

    .outer-collapse .ivu-collapse-content > .ivu-collapse-content-box {
        padding: 0 !important;
    }
</style>