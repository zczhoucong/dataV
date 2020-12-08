<template>
    <div class="list">
        <!-- <span class="addRole"><Button type="primary" size="large" @click="addOrEdit(1)">新建角色</Button></span>        -->
        <router-link class="add" to="/home/permissions/roles/addRole"><Button type="primary" size="large">新建角色</Button></router-link>       
        <div class="breadcrumbRole">
            <Breadcrumb>
                <BreadcrumbItem to="/home/permissions/roles">
                    <Icon type="ios-home-outline"></Icon>
                    角色列表
                </BreadcrumbItem>
            </Breadcrumb>
        </div>
        <Table border :columns="roleHeader" :data="roleList"></Table>
        <div class="paging">
            <Page :total="totalNum"  :page-size="pageSize" @on-change="getRoleListMore"></Page>            
        </div>     
    </div>

</template>
<script>
    import {getRoleListMore, delRole} from '../../api/permission'
    export default {
        data () {
            return {
                roleHeader: [
                    {
                        title: '角色名称',
                        key: 'roleName',
                        render: (h, params) => {
                            return h('div', [
                                h('Icon', {
                                    props: {
                                        type: 'person'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    }
                                }),
                                h('strong', params.row.roleName)
                            ]);
                        }
                    },
                    {
                        title: '角色权限',
                        key: 'moduleName'
                    },
                    {
                        title: '角色描述',
                        key: 'roleDesc'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            sessionStorage.setItem('roleParams', JSON.stringify(params))
                                            this.$router.push({
                                                path: '/home/permissions/roles/editRole', 
                                            })
                                        }
                                    }
                                }, '修改'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.delRole(params)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ], // 表头数据
                roleList: [],
                totalNum: 1, // 页面列表总数
                currentPage: 1, // 当前页码
                pageSize: 8, // 每页显示数
            }
        },
        mounted() {
            this.getRoleListMore()
        },
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            show (index) {
                this.$Modal.info({
                    title: 'User Info',
                    content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
                })
            },
            addOrEdit (flag) {
                // 1 为新建， 2 为修改
                if (flag === 1) {
                    this.titleType = '新建角色';
                    this.buttonType ='创建';
                    this.modalRole = true                    
                } else {
                    this.titleType = '修改角色';
                    this.buttonType ='修改';
                    this.modalRole = true
                }

            }, 
            // 获得角色列表(详细)
            getRoleListMore(page) {
                getRoleListMore({
                    currentPage: page || this.currentPage,
                    pageSize: this.pageSize
                }).then(resp => {
                    console.log(resp)
                    if (resp.data.code === 0) {
                        this.roleList = resp.data.data.list.items;
                        this.totalNum = resp.data.data.list.totalNum                        
                    } else {
                        this.$Message.warning('获取列表失败，请稍后重试')
                    }

                })
            },
            // 删除角色
            delRole(params) {
                this.$Modal.confirm({
                    content: "确定删除吗",
                    okText: "删除",
                    onOk: () => {
                        delRole({
                            roleId: params.row.roleId
                        }).then(resp => {
                            if (resp.data.code === 0) {
                                this.roleList.splice(params.index, 1);
                                this.$Message.success('删除成功！')
                            } else {
                                this.$Message.warning('删除失败，请稍后重试！')
                            }
                        })
                    }
                })               
            },        
        }
    }
</script>
<style lang="less" scoped>
    @import url("../../styles/permissions");
    // .list {
    //     width: 100%;
    //     height: 100%;
    //     padding: 100px 30px;
    //     position: relative;
    //     .breadcrumbRole {
    //         height: 40px;
    //         line-height: 40px;
    //         padding-left: 20px;
    //         background-color: #fff;
    //         width: 100%;
    //         position: absolute;
    //         top: 0;
    //         left: 0;
    //     }
    //     .addRole {
    //         position: absolute;
    //         top: 50px;
    //         right: 30px;
    //     }
    //     .rolePaging {
    //         margin-top: 30px
    //     }

    // }
</style>

