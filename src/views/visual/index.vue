<!--本页面可以获取项目列表，并进行项目新增、编辑、删除、预览、发布等操作-->
<template>
    <section class="my-card-list">
        <ul class="card-ul">
            <li class="card-box" @click="newProject">
                <div class="">
                    <Icon type="ios-plus-empty" size="100"></Icon>
                    <p>新建可视化</p>
                </div>
            </li>
            <li class="card-box" v-for="(item,index) in projectList" :key="'visual_'+index">
                <div class="card-img">
                    <img :src="item.screen ? item.screen : defaultScreen" @mouseover="hoverId=item.projectId">
                    <div class="card-img-hover" @click="editProject(item.projectId,item.projectName)" @mouseleave="hoverId=''" v-show="item.projectId===hoverId">
                        <div class="btn-edit">编辑</div>
                        <div class="btn-tool-top">
                            <!-- <Icon type="ios-easel-outline" size="20" title="展示" @click.native.stop="show(item.projectId)"></Icon> -->
                            <Icon type="ios-trash-outline" size="22" title="删除" @click.native.stop="delProject(item.projectId)"></Icon>
                        </div>
                    </div>
                </div>
                <div class="card-name">
                    <Icon type="android-create" class="card-icon"></Icon>
                    <input type="text" class="card-edit-input" v-focus v-if="curId===item.projectId" v-model="item.projectName"
                           @blur="editName(item)"/>
                    <span class="card-name-label" @click="editAction(item.projectId)" v-else>{{item.projectName}}</span>
                </div>
            </li>
        </ul>
    </section>
</template>
<script>
    import guid from '@/utils/guid';
    import {getProjectList, delProject, addProject, editName, show} from '@/api/project'
    import {focus} from '@/directives/form'
    import defaultImg from '@/images/projectDefault.png'
    import modal from '@/mixins/modal';
    export default {
        mixins: [ modal ],
        data(){
            return {
                curId: '',
                hoverId:'',
                newName: '', // 新项目名称
                projectList: [],
                defaultScreen:defaultImg
            }
        },
        mounted(){
            //获取所有项目
            this.getProjectList();
        },
        directives: {focus},
        methods: {
            getProjectList(){
                getProjectList().then(resp => {                    
                    this.projectList = resp.data;
                    console.log(resp)
                })
            },
            // 修改项目名称动作
            editAction(id){
                this.curId = id;
            },
            // 修改项目名称
            editName(project){
                this.curId = '';
                //后台修改该项目名称
                editName({
                    "projectId": project.projectId,
                    "projectName": project.projectName
                }).then( resp => {
                    if (resp.resCode !== 0) {
                        this.$Message.warning('修改名称失败，请稍候重试!');        
                    }else{
                        this.$Message.success('修改项目名称成功');     
                    }
                })
            },
            //删除
            delProject(pjId){
                this.confirm("项目删除后无法恢复，是否继续删除？",()=>{
                    delProject({projectId: pjId}).then(resp => {
                        // 删除成功
                        if (resp.resCode === 0) {
                            const index = this.projectList.findIndex(i => i.projectId === pjId);
                            this.projectList.splice(index, 1);
                            this.curId = ''
                            this.$Message.success('可视化项目删除成功');
                        } else {
                            alert('删除失败')
                        }
                    })
                })
            },
            // 编辑项目
            editProject(pjId,name){
                this.$router.push({
                    path: '/datashow/page',
                    query: {
                        pjId: pjId,
                        name:name
                    }
                })
            },
            // 新建项目
            newProject(){
                this.$Modal.confirm({
                    render: (h) => {
                        return [h('h4',{style:{marginBottom:'20px',color:'#fff'}},'可视化名称'),h('Input', {
                            props: {
                                value: this.newName,
                                placeholder: '请输入可视化名称'
                            },
                            on: {
                                input: (val) => {
                                    this.newName = val;
                                }
                            }
                        })]
                    },
                    onOk: () => {
                        if (this.newName.trim().length === 0) {
                            this.$Message.warning('可视化名称不能为空!');
                            return false;
                        } else {
                            const pjId = guid();
                            const projectName=this.newName
                            addProject({
                                "projectId": pjId,
                                "projectName": projectName
                            }).then(resp => {
                                if (resp.resCode === 0) {
                                    this.newName = '';
                                    this.$Message.success('新建项目成功');                                   
                                    this.$router.push({
                                        path: '/datashow/page',
                                        query: {
                                            pjId: pjId,
                                            name:projectName
                                        }
                                    })                                     
                                } else {
                                    this.$Message.warning(resp.resDesc);                                    
                                }
                            })
                        }
                    },
                })
            },
            // 项目展示
            // show(pjId) {
            //     show({
            //         projectId: pjId
            //     }).then(resp => {
            //         if (resp.data.code === 0) {
            //             let routeData = this.$router.resolve({path: '/showScreen', query: {pgId: resp.data.data.pageId}});
            //             window.open(routeData.href, '_blank');
            //         }
            //     })
            // }
        }
    }
</script>