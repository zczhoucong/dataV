<!--预览临时信息-->
<template>
    <div ref="preview" :style="previewStyle">
        <loading :loadingShow='loadingShow'></loading>
        <div :id="item.info.id" v-for="(item,index) in components" :key="index">
        </div>
    </div>
</template>
<script>
    import mount from '../../com/mount';
    import {getTemplate} from '../../com/template/index'
    import {compareJson, parse_url} from '../../utils/assist'
    import {getPageConfig} from '@/api/page'
    import {getPageComs} from '@/api/com'
    import loading from '../../com/components/loading'

    export default {
        components: {
            loading
        },
        data(){
            return {
                pgId: this.$route.query.pgId,                
                previewStyle: {
                    'width': `${this.$store.state.config.width}px`,
                    'height': `${this.$store.state.config.height}px`,
                    "background": `${this.$store.state.config.color} url(${this.$store.state.config.backgroundImage}) no-repeat  center/cover`,
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
                        components: components,
                        // pgId: this.pgId
                    })
                }
            },
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
            this.GetPageConfig();
            this.GetPageComList();
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
            GetPageConfig(){
                getPageConfig({
                    pageId:this.pgId,
                    type:0
                }).then(resp => {
                    if (resp.resCode === 0&&resp.data!==null) {                        
                            const info = resp.data
                            this.previewStyle = {
                                width: `${info.width}px`,
                                height:`${info.height}px`,
                                "background": `${info.bg_color} url(${info.bg_pic}) no-repeat  center/cover`
                            }; 
                    }

                })
            },
            GetPageComList(){
                getPageComs({pageId:this.pgId,type:0}).then(resp=>{ 
                    this.loadingShow = false                       
                    let components=[]               
                    const reg = new RegExp('%0B0A0A','g')
                    resp.data.forEach(com=>{
                         const value= JSON.parse(com.com_value)
                         const _com= getTemplate(value.info, value.attributes, value.slots, value.events, value.active);
                         _com.position=value.position
                         components.push(JSON.parse(JSON.stringify(_com).replace(reg, ' ' )))                
                    })
                    this.components=components
                    this.mountAll(components)
                })
            },
        }
    }
</script>
