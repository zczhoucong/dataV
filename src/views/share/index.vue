<!--分享页面-->
<template>
    <div ref="share" :style="previewStyle">
        <Modal  class="publish-dialog"  title="访问验证" width="420" :mask-closable="false" :closable="false" :styles="{top: '200px'}" v-model="passwordDialog">             
            <Form :label-width="80">
                <FormItem label="访问密码">
                    <Input v-model.trim="verfiyCode" type="password" clearable  placeholder="请输入访问密码" style="width:250px"/>                    
                </FormItem>
                <FormItem>
                    <Button type="primary" :loading="modal_loading" @click="verifyPwd">确认</Button>
                    <Button style="margin-left: 10px" @click="passwordDialog=false">取消</Button>
                </FormItem>
            </Form>
            <div slot="footer"></div>
        </Modal>        
        <loading :loadingShow='loadingShow'></loading>                 
        <div :id="item.info.id" v-for="(item,index) in components" :key="index"></div>        
    </div>
</template>
<script>
    import mount from '../../com/mount';
    import {getTemplate} from '../../com/template/index'
    import {compareJson, parse_url} from '../../utils/assist'
    import {timeTransVerify,timeTransVerifyPwd,timeTransConfig,timeTransComList} from '@/api/share'
    import loading from '@/com/components/loading'

    export default {
        components: {
            loading
        },
        data(){
            return {
                code: this.$route.params.id,                
                previewStyle: {
                    'width': `${this.$store.state.config.width}px`,
                    'height': `${this.$store.state.config.height}px`,
                    "background": `${this.$store.state.config.color} url(${this.$store.state.config.backgroundImage}) no-repeat  center/cover`,
                },// 编辑区样式
                loadingShow: true, // 加载动画显示
                pageId:'',
                verfiyCode:'',
                passwordDialog:false,
                modal_loading:false
            }
        },
        computed: {
            components: { //组件树 ，预览视图中所有组件
                get() {
                    return this.$store.state.components
                },
                set(components) {                    
                    this.$store.commit('setState', {
                        components: components
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
           this.VerifyInfo();   
        },
        methods: {
            compareTime(time){
                const time1= new Date().getTime();
                const time2=new Date(time).getTime();
                if(time1>time2){
                    return false
                }
                return true
            },
            VerifyInfo(){
                timeTransVerify({id:this.code}).then(resp=>{                                     
                    if(resp.resCode===0){
                        if(resp.data===null){                            
                            console.log('跳转到404页面')
                            this.$router.push({
                                path:'/404'
                            })
                        }else{         
                             this.pageId=resp.data.id
                              this.loadingShow=false
                            // 如果设置访问时限，则判断是否超期，如果超期，则返回，否则继续判断                                            
                            if(resp.data.Expired){
                                // todo 判断验证是否过期
                                if(!this.compareTime(resp.data.Expired)){
                                    this.$router.push({
                                        path:'/404'
                                    })
                                    return
                                }
                            }
                            // 判断是否设置访问密码，如果设置，则要求输入密码，否则继续
                            if(resp.data.isPwd){
                                this.passwordDialog=true      
                                return
                            }
                            this.GetPageConfig();
                            this.GetPageComList();
                        }
                    }
                })
            },
            // 验证密码
            verifyPwd(){
                if(this.verfiyCode.length<6 || this.verfiyCode.length > 12){
                    this.$Message.error("密码不正确")
                    return;
                }
                timeTransVerifyPwd({id:this.code,pwd:this.verfiyCode}).then(resp=>{
                    if(resp.resCode===0){
                        if(resp.data===0){
                            this.$Message.error("密码不正确")
                            return;
                        }else{
                            this.passwordDialog=false
                            this.GetPageConfig();
                            this.GetPageComList();
                        }
                    }else{
                        this.$Message.error("后台服务异常")
                        return;
                    }
                })
            },
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
                timeTransConfig({
                    pageId:this.pageId,
                    pwd:this.verfiyCode
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
                this.loadingShow = true     
                timeTransComList({
                    pageId:this.pageId,
                    pwd:this.verfiyCode
                }).then(resp=>{                     
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
            }
        }
    }
</script>
