<template>
    <div class="templateSelect">
        <div class="template-header">               
            <p>
                选择模板
                <a class="template-exit" @click="backPage">                    
                    <span>取消创建</span>
                </a>
            </p>
        </div>
        <div class="template-slider">
            <ul>
                <li  :class="{'active': templateInfo.templateIndex === 0}" @click="templateActive">
                    <div class="template-screen"></div>
                    <div class="template-descr">
                        <p>默认空白页
                            <i class="right-arrow"></i>
                        </p>
                        <span>尺寸自定</span>
                    </div>                    
                </li>
                <li v-for="(item, index) in templateInfo.list" :key="index" :class="{'active': templateInfo.templateIndex === index+1}" @click="templateActive(item, index)">
                    <div class="template-screen">
                        <img :src="item.screen">
                    </div>
                    <div class="template-descr">
                        <p>{{item.pageName}}
                            <i class="right-arrow"></i>
                        </p>
                        <p>比例 {{pageRate(item.width,item.height)}}</p>
                        <span>{{item.width}} x {{item.height}}px</span>
                    </div>
                </li>
            </ul>
        </div>
        <div class="template-layout">
            <div class="img-box">
                <div class="img-create">
                    <Button  class="createBtn" type="primary" style="width: 10%; height: 6%" @click="addPage">创建</Button>                        
                </div>
                <img :src="templateInfo.templateScreen">                 
            </div>
            <div class="img-info">
                <p>{{templateInfo.templateName}}</p>                
            </div>
        </div>
    </div>
</template>

<script>
    import guid from '@/utils/guid'
    import {maxDivisor} from '@/utils/assist'
    import defaultModel from '@/images/defaultModel.png'
    import {addPage, getModelList} from '@/api/page'
    export default {
        data() {
            return {
                pjId: this.$route.query.pjId, // 项目ID
                newPName:'',
                templateInfo: {
                    list: [], // 模板列表
                    templateIndex: 0, //选中模板高亮,默认0选中空白模板
                    templateScreen: defaultModel,
                    templateName: '在空白画布上展现洪荒之力！',
                    modelId: '' //模板页面ID 
                } 
            }
        },
        mounted() {
            this.getModelList()
        },
        methods: {
            // 获取模板列表
            getModelList(){
                // 获取模板列表
                getModelList({
                    projectId: config.modelKeyCode
                }).then(resp => {
                    if (resp.resCode === 0) {   
                        const list= resp.data
                        list.forEach(e => {
                            if(e.height===null){
                                e.height=1080
                            }
                            if(e.width===null){
                                e.width=1920
                            }
                        });
                        this.templateInfo.list = list
                        
                    }
                })                             
            },
            pageRate(width,height){
                const divisor=  maxDivisor(width,height);
                return `${width/divisor}:${height/divisor}`
            },
            // 创建页面
            addPage() {
                this.$Modal.confirm({
                    render: (h) => {
                        return [h('h4',{style:{marginBottom:'20px',color:'#fff'}},'页面名称'),h('Input', {
                            props: {
                                value: this.newPName,
                                placeholder: '请输入页面名称'
                            },
                            on: {
                                input: (val) => {
                                    this.newPName = val.replace(/^\s+|\s+$/gm,'');
                                }
                            }
                        })]
                    },
                    onOk: () => {
                        if (this.newPName.length === 0) {
                            this.$Message.warning('页面名称不能为空!');
                            return false;
                        } else {
                            const pgId = guid();
                            let obj = {};
                            if (this.templateInfo.modelId) {
                                obj = {
                                    projectId: this.pjId,
                                    pageId: pgId,
                                    pageName: this.newPName,
                                    modelId: this.templateInfo.modelId
                                }
                            } else {
                                obj = {
                                    projectId: this.pjId,
                                    pageId: pgId,
                                    pageName: this.newPName,
                                }
                            }
                            addPage(obj).then(resp => {
                                if (resp.resCode === 0) {
                                    this.backPage();
                                    let routeData = this.$router.resolve({path: '/screen', query: {pgId: pgId}});
                                    window.open(routeData.href, '_blank');
                                } else {
                                    this.$Message.warning(resp.resDesc);
                                }
                                this.newPName = '';
                            })
                        }
                    }
                })
            },
            // 选择模板页面，点击模板高亮并设置相关属性
            templateActive(item, index) {
                this.templateInfo.templateIndex = index+1 || 0;
                this.templateInfo.modelId = item.pageId || '';
                this.templateInfo.templateScreen = item.screen || defaultModel;
                this.templateInfo.templateName = item.pageName || '在空白画布上展现洪荒之力！'
            },
            // 取消创建，返回页面列表
            backPage() {
                this.$router.push({
                    path: '/datashow/page',
                    query: {
                        pjId: this.pjId
                    }
                })    
            }    
        },
    }
</script>

<style  lang="less" scoped>
</style>