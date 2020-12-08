<!--本页面可以获取页面下页面列表，并进行页面新增、编辑、删除、预览、发布等操作-->
<template>
    <section class="my-card-list no-padding">
        <div class="breadcrumb-part">
            <Breadcrumb>
                <BreadcrumbItem to="/">
                    <Icon type="ios-home-outline"></Icon>
                    {{pjName}}
                </BreadcrumbItem>
                <BreadcrumbItem style="color:#fff;">
                    <Icon type="social-buffer-outline"></Icon>
                    页面列表
                </BreadcrumbItem>
            </Breadcrumb>
        </div>
        <ul class="card-ul" style="padding:20px;">
            <li class="card-box">
                <div class="new-card-box" @click="newPage">
                    <Icon type="ios-plus-empty" size="100"></Icon>
                    <p>新建页面</p>
                </div>
            </li>
            <li class="card-box" v-for="(item, index) in pageList"  :class="{homePage:firstId==item.pageId}" :key="'page'+index">
                <div class="card-img" style="height:150px;">
                    <img :src="item.screen ? item.screen : defaultScreen" @mouseover="hoverId=item.pageId">
                    <div class="card-img-hover" @click="editPage(item.pageId)" @mouseleave="hoverId=''"
                         v-show="item.pageId===hoverId">
                        <div class="btn-edit">编辑</div>
                        <div class="btn-tool-top">
                            <!-- <Tooltip placement="bottom-end">
                                <Icon type="ios-easel-outline" size="20" @click.native.stop="showScreenPage(item.pageId)"></Icon>
                                <div slot="content">
                                    <p>展示</p>
                                    <hr>
                                    <p>展示发布状态页面</p>
                                </div>
                            </Tooltip> -->
                            <Tooltip placement="bottom-end">
                                <Icon type="ios-bookmarks-outline" size="22" @click.native.stop="setModel(item.pageId)"></Icon>
                                <div slot="content">
                                    <p>设为模板</p>
                                    <hr>
                                    <p>将页面添加到‘我的模板’</p>
                                </div>
                            </Tooltip>
                            <Tooltip placement="bottom-end">
                                <Icon type="ios-home-outline" :class="item.pageId===firstId?'first-page':''" size="22" @click.native.stop="setFirstPage(item)"></Icon>
                                <div slot="content">
                                    <p>设为首页</p>
                                    <hr>
                                    <p>将页面设置为首页</p>
                                </div>
                            </Tooltip>
                        </div>
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
    import guid from '../../utils/guid'
    import defaultImg from '../../images/pageDefault.png'
    import publishDialog from '../screen/publishDialog'
    import {focus} from '@/directives/form'
    import {getPageList, delPage, setFirst, editPage, savePage, copyPage, setModel} from '@/api/page'
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
                firstId: '', // 首页ID
                newPName: '', // 页面名称
                pageId: '',
                pjId: this.$route.query.pjId, // 项目ID
                pjName: this.$route.query.name, // 项目名称
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
                // 根据项目ID获取该页面集合
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
            // 获取项目页面列表
            getPageListByPjId(){
                const projectId = this.pjId
                getPageList({projectId: projectId}).then(resp => {                    
                    if (resp.resCode===0) {
                        this.pageList = resp.data;
                        const firstPage = this.pageList.filter(i => {return i.first === 1});
                        if (firstPage.length > 0) {
                            this.firstId = firstPage[0].pageId;
                        }else{
                            this.warning();
                        }
                    }  
                });
            },
            warning () {
                if(this.pageList.length===0) return
                const top=document.body.clientHeight-90;
                this.$Notice.destroy()
                this.$Notice.config({
                    top: top
                });
                this.$Notice.warning({
                    duration:0,
                    top:top,
                    title: '警告',
                    desc:  '当前项目尚未设置首页 '
                });
            },
            // 修改页面名称动作
            editAction(id){
                this.editId = id;
            },
            // 修改页面名称
            editName(page){
                this.editId = '';
                //todo后台修改该页面名称
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
            // 设置首页
            setFirstPage(page){
                if(page.first===1) return
                this.confirm('确定要将此页面设置成首页？',()=>{
                    setFirst({pageId: page.pageId}).then(resp => {
                        if (resp.resCode === 0) {
                            this.firstId = page.pageId;      
                            page.first=1;                          
                            this.$Message.success('设置首页成功');
                            this.$Notice.destroy()
                        } else {
                            this.$Message.warning(resp.resCode);                                
                        }
                    })
                })
            },
            // 预览
            preViewPage(pgId){
                let routeData = this.$router.resolve({path: '/preview', query: {pgId: pgId}});
                window.open(routeData.href, '_blank');
            },
            // 展示
            // showScreenPage(pgId){
            //     let routeData = this.$router.resolve({path: '/showScreen', query: {pgId: pgId}});
            //     window.open(routeData.href, '_blank');
            // },
            //删除
            delPage(pgId){
                this.confirm('页面删除后无法恢复，是否确认删除？',()=>{
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
            // 编辑页面
            editPage(pgId){
                let routeData = this.$router.resolve({path: '/screen', query: {pgId: pgId}});
                window.open(routeData.href, '_blank');
            },
            // 点击新建页面
            newPage(){
                this.$router.push({
                    path: '/create_screen',
                    query: {
                        pjId: this.pjId
                    }
                })                             
            },       
            // 复制页面
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
            },
            // 设为模板
            setModel(pgId) {
                if (this.timeName.timeModel != '' && new Date().getTime() - this.timeName.timeModel < 800)  return;
                this.timeName.timeModel = new Date().getTime();
                setModel({
                    projectId: config.modelKeyCode,
                    pageId: pgId
                }).then(resp => {
                    if (resp.resCode === 0) {
                        this.$Message.success('模板设置成功！')
                    } else {
                        this.$Message.warning('操作失败，请稍后重试！')
                    }
                })    
            }
        }
    }
</script>