<!--本模板可以获取模板下模板列表，并进行模板新增、编辑、删除、预览、发布等操作-->
<template>
    <section class="my-card-list no-padding">
        <div class="breadcrumb-part">
            <Breadcrumb>
                <BreadcrumbItem style="color:#fff;">
                    <Icon type="social-buffer-outline"></Icon>
                    模板列表
                </BreadcrumbItem>
            </Breadcrumb>
        </div>
        <ul class="card-ul" style="padding:20px;">
            <li class="card-box">
                <div class="new-card-box" @click="addPage">
                    <Icon type="ios-plus-empty" size="100"></Icon>
                    <p>新建模板</p>
                </div>
            </li>
            <li class="card-box" v-for="(item, index) in pageList" :key="'page'+index">
                <div class="card-img" style="height:150px;">
                    <img :src="item.screen ? item.screen : defaultScreen" @mouseover="hoverId=item.pageId">
                    <div class="card-img-hover" @click="editPage(item.pageId)" @mouseleave="hoverId=''"
                         v-show="item.pageId===hoverId">
                        <div class="btn-edit">编辑</div>
                    </div>
                </div>
                <div class="card-name">
                    <Icon type="android-create" class="card-icon"></Icon>
                    <input type="text" v-focus class="card-edit-input" v-if="editId===item.pageId" v-model="item.pageName"
                           @blur="editName(item)"/>
                    <span class="card-name-label" @click="editAction(item.pageId)" v-else>{{item.pageName}}</span>
                </div>
                <div class="card-tool">                    
                    <Button type="text" ghost icon="ios-expand" size="small" @click.native="preViewPage(item.pageId)">预览</Button>                    
                    <Button type="text" ghost icon="ios-copy-outline" size="small" @click.native="copyPage(item.pageId)">复制</Button>
                    <Button type="text" ghost icon="ios-trash-outline" size="small" @click.native="delPage(item.pageId)">删除</Button>                                
                    <Button type="text" ghost icon="ios-paper-plane"  size="small" :class="item.pgStatus === 1?'btn-publish':''" @click.native="shareEvent(item.pageId)">
                        发布
                    </Button>
                </div>
            </li>
        </ul>
        <publish-dialog :pubOk="pubOk" :pgId="pageId" @closeTip="closeTip"></publish-dialog>
    </section>
</template>
<script>
    import guid from '@/utils/guid'
    import defaultImg from '@/images/pageDefault.png'
    import publishDialog from '../screen/publishDialog'
    import {focus} from '@/directives/form'
    import {getPageList, delPage, editPage, savePage, copyPage,addPage} from '@/api/page'
    import modal from '@/mixins/modal';
    export default {
        mixins: [ modal ],
        components: {
            publishDialog
        },
        data(){
            return {
                editId: '',
                hoverId: '',
                pubOk: false,
                newPName: '', // 模板名称
                pageId: '',
                pjId: config.modelKeyCode, // 项目ID                
                pageList: [],
                defaultScreen: defaultImg, 
                // 按钮点击时间
                timeName: {
                    timePublish: '',
                    timeCopy: '',
                    timeModel: ''
                }     
            }
        },
        directives:{focus},
        mounted(){
            this.$nextTick(() => {
                // 根据项目ID获取该模板集合
                this.getPageListByPjId();
            })
        },
        methods: {
            shareEvent(pageId){
                this.pageId=pageId
                this.pubOk=true
            }, 
            closeTip(flag){
                this.pubOk = false
                const index= this.pageList.findIndex(x=>x.pageId===this.pageId)
                this.pageList[index].pgStatus=flag
            },
            // 获取项目模板列表
            getPageListByPjId(){
                const projectId = this.pjId
                getPageList({projectId: projectId}).then(resp => {                    
                    if (resp.resCode===0) {
                        this.pageList = resp.data;
                    }  
                });
            },
            
            // 创建页面
            addPage() {
                this.$Modal.confirm({
                    render: (h) => {
                        return [h('h4',{style:{marginBottom:'20px',color:'#fff'}},'模板名称'),h('Input', {
                            props: {
                                value: this.newPName,
                                placeholder: '请输入模板名称'
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
                            this.$Message.warning('模板名称不能为空!');
                            return false;
                        } else {
                            const pgId = guid();
                            let obj  = {
                                projectId: this.pjId,
                                pageId: pgId,
                                pageName: this.newPName,
                            }
                            addPage(obj).then(resp => {
                                if (resp.resCode === 0) {
                                    this.getPageListByPjId();
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
            // 修改模板名称动作
            editAction(id){
                this.editId = id;
            },
            // 修改模板名称
            editName(page){
                this.editId = '';
                //todo后台修改该模板名称
                editPage({
                    "pageId": page.pageId,
                    "pageName": page.pageName,
                    "status":page.pgStatus
                }).then(resp =>　{
                    if (resp.resCode !== 0) {
                        this.$Message.warning('修改名称失败，请稍候重试!');        
                    }else{
                         this.$Message.success('修改名称成功');       
                    }
                })
            },
            // 预览
            preViewPage(pgId){
                let routeData = this.$router.resolve({path: '/preview', query: {pgId: pgId}});
                window.open(routeData.href, '_blank');
            },
            //删除
            delPage(pgId){
                this.confirm('模板删除后无法恢复，是否确认删除？',()=>{
                    delPage({pageId: pgId}).then(resp => {
                        if (resp.resCode===0) {
                            const index = this.pageList.findIndex(i => i.pageId === pgId);
                            this.pageList.splice(index, 1);
                            this.editId = '';
                            this.$Message.success('删除成功!');
                        }
                    })
                })
            },
            // 编辑模板
            editPage(pgId){
                let routeData = this.$router.resolve({path: '/screen', query: {pgId: pgId}});
                window.open(routeData.href, '_blank');
            },  
            // 复制模板
            copyPage(pgId) {
                if (this.timeName.timeCopy != '' && new Date().getTime() - this.timeName.timeCopy < 800)  return;
                this.timeName.timeCopy = new Date().getTime();
                copyPage({
                    pageId: pgId
                }).then(resp => {
                    if (resp.resCode === 0) {
                        this.getPageListByPjId()
                    } else {
                        this.$Message.warning('操作失败，请稍后重试！');
                    }
                })                    
            }
        }
    }
</script>