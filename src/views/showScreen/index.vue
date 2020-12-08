<!--展示-->
<template>
    <div ref="showScreen" :style="showScreenStyle">
        <loading :loadingShow='loadingShow'></loading>
        <div :id="item.info.id" v-for="(item,index) in components" :key="index">
        </div>
    </div>
</template>
<script>
    import mount from '../../com/mount';
    import {getTemplate} from '../../com/template/index'
    import {compareJson, parse_url} from '../../utils/assist'
    import {getComponentOrTemp, showConfig} from '@/api/page'   
    import loading from '../../com/components/loading'    
    export default {
        components: {
            loading
        },
        data(){
            return {
                pgId: this.$route.query.pgId,
                showScreenStyle: {
                    'width': `${this.$store.state.config.width}px`,
                    'height': `${this.$store.state.config.height}px`,
                    "background": `${this.$store.state.config.color} url(${this.$store.state.config.backgroundImage}) no-repeat center/cover`,
                },// 编辑区样式
                loadingShow: true, // 加载动画显示
            }
        },
        computed: {
            components: { //组件树 ，预览视图中所有组件
                get() {
                    return this.$store.state.components
                },
                set(components) {
                    this.$store.commit('setState', {
                        components:components,
                        pgId:this.pgId
                    })
                }
            },
            //
            activedComponents(){
                return this.$store.state.components.filter(i => {
                    const dataType = i.attributes.dataType;
                    const apiUrl = i.attributes.apiUrl;
                    return dataType && apiUrl && dataType.value === 'WebApi' && apiUrl.value.replace(/\s/g, '').indexOf('=:') > 0;
                });
            },
        },
        watch: {
            ['$store.state.keys'](newVal, oldVal){
                this.activeCom(newVal, oldVal);
            },
        },
        mounted(){
            this.showConfig()
        },
        methods: {
            activeCom(newKeys, oldKeys){
                //1、获取发生变化的参数集合
                const compare = compareJson(newKeys, oldKeys);
                // 根据参数集合获取含该参加的组件集合
                const sltedComs = this.activedComponents.filter(i => {
                    //获取url参数集合
                    const apiUrl = i.attributes.apiUrl.value;
                    const params = parse_url(apiUrl);
                    // 将url参数集合与keys进行对比，如果keys中存在，则返回改组件
                    const result = Object.keys(params).filter(o => {
                        return compare[params[o]];
                    });

                    if (result.length > 0) return i;
                });
                this.mountAll(sltedComs);
            },
            // 挂载组件集合
            mountAll(components){
                components.forEach(component => {
                    mount(component.info.id, component);
                })
            },
            mount(components){
                //挂载及更新视图中组件的位置信息
                components = JSON.parse(JSON.stringify(components));
                this.components = components
                components.forEach(component => {
                    let _component;
                    _component = getTemplate(component.info, component.attributes, component._slot || {},
                        component.events || {}, component.active || {});
                    Object.assign(component,_component);

                    mount(component.info.id, component);
                })
            },
            // 获取发布状态的页面配置
            showConfig() {
                showConfig({pageId: this.pgId}).then(resp => {
                    console.log(resp)
                    if (resp.data.code === 0) {
                        if (resp.data.data.config) {
                            const info = JSON.parse(resp.data.data.config)
                            this.showScreenStyle = {
                                "width": `${info.width}px`,
                                "height": `${info.height}px`,
                                "background": `${info.color} url(${info.backgroundImage}) no-repeat center/cover`,
                            };
                        }
                        if(resp.data.data && resp.data.data.components){
                            // const components=JSON.parse(resp.data.data.components.replace(/|end|\g/,'='));
                            const components = JSON.parse(resp.data.data.components);
                            this.mount(components)
                        }
                        // 成功返回后，隐藏加载动画
                        this.timer=setTimeout(() => {
                            this.loadingShow = false
                        },1000)       
                    }else {
                        this.loadingShow = false;
                        this.$Modal.confirm({
                                content: "温馨提示：该页面尚未发布，请发布后再进行展示",
                                okText: "好的",
                                onOk: () => {
                                   window.close()
                                },
                            })
                    }
                })
            }
        },
        beforeDestroy() {
            if (this.timer) {
                clearTimeout(this.timer)
                this.timer = null
            }
        }
    }
</script>