<template>
    <div class="list">
        <router-link class="add" to="/home/permissions/user/addUser"><Button type="primary" size="large">新建用户</Button></router-link>       
        <div class="breadcrumbRole">
            <Breadcrumb>
                <BreadcrumbItem to="/home/permissions/roles">
                    <Icon type="ios-home-outline"></Icon>
                    用户列表
                </BreadcrumbItem>
            </Breadcrumb>
        </div>
        <!-- 用户列表 -->
        <Table border :columns="listHeader" ref='table' :data="userList"></Table>
        <!-- 分页page组件 -->
        <div class="paging">
            <Page :total="totalNum"  :page-size="pageSize" @on-change="getUserList"></Page>            
        </div>    
        <!-- 修改密码 -->
        <modifypwd :modal.sync="modifyPwdShow" :itemInfo="itemParams"></modifypwd>      
    </div>

</template>
<script>
    import {getUserList, addUser, getRoleList, modifyUser, delUser, modifyPwd} from '../../api/permission'
    import modifypwd from "./modifyPwd"
    export default {
        components: {
            modifypwd
        },
        data () {                       
            return {
                listHeader: [
                    {
                        title: '用户名',
                        key: 'userName',
                        width: 150,
                        fixed: 'left',
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
                                h('strong', params.row.userId)
                            ]);
                        }
                    },
                    {
                        title: '昵称',
                        key: 'userName',
                        width: 150,
                    },
                    {
                        title: '角色',
                        key: 'roleName',
                        width: 150,
                    },
                    {
                        title: '登录类型',
                        key: 'type',
                        width: 150,
                        render: (h, params) => {
                            return h('div', params.row.type==='1'?'匿名':'公开');
                        }
                    },
                    {
                        title: '账号状态',
                        key: 'status',
                        width: 150,
                        render: (h, params) => {
                            return h('div', params.row.status==='1'?'激活':'锁定');
                        }
                    },
                    {
                        title: '手机',
                        key: 'mobile',
                        width: 150,
                    },
                    {
                        title: '邮箱',
                        key: 'email',
                        width: 160,
                    },                
                    {
                        title: '描述',
                        key: 'description',
                        width: 0,
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 200,
                        fixed: 'right',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small',
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            sessionStorage.setItem('itemParams', JSON.stringify(params))
                                            this.$router.push({
                                                path: '/home/permissions/user/editUser', 
                                            })
                                        }
                                    }
                                }, '编辑'),
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
                                            console.log(params)
                                            this.itemParams = params.row
                                            this.modifyPwdShow = true;
                                        }
                                    }
                                }, '改密'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.delUser(params)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ], // 表格信息
                userList: [], // 用户页面列表
                modifyPwdShow: false, // 修改密码弹窗显示开关
                totalNum: 1, // 页面列表总数
                currentPage: 1, // 当前页码
                pageSize: 8, // 每页显示数
                roleList: [], // 角色列表
                itemParams: {}, // 当前进行操作的用户信息
                tableWidth: 0            
            }
        },
        computed: {
            // 将roleId从数组转换成字符串
            roleIdStr() {
                return this.formValidate.roleId.join(',');
            },
        },
        mounted() {
            // 计算初次渲染时table的宽
            this.listHeader.forEach(i => {
                this.tableWidth += i.width
            })
            // 监听屏幕变化
            window.onresize = () => {
                this.tableResize()
            }
            this.tableResize();
            // 获取用户列表
            this.getUserList()
        },
        methods: {         
            // 获取用户列表
            getUserList(page) {
                getUserList({
                    currentPage: page || this.currentPage,
                    pageSize: this.pageSize
                }).then(resp => {
                    console.log(resp)
                    if (resp.data.code === 0) {
                        this.userList = resp.data.data.list.items;
                        this.totalNum = resp.data.data.list.totalNum                        
                    } else {
                        this.$Message.warning('获取列表失败，请稍后重试')
                    }

                })
            },
            // 删除用户
            delUser(params) {
                this.$Modal.confirm({
                    content: "确定删除吗",
                    okText: "删除",
                    onOk: () => {
                        delUser({
                            id: params.row.id
                        }).then(resp => {
                            if (resp.data.code === 0) {
                                this.userList.splice(params.index, 1);
                                this.$Message.success('删除成功！')
                            } else {
                                this.$Message.warning('删除失败，请稍后重试！')
                            }
                        })
                    }
                }) 
                
            },
            // 根据屏幕变化，table宽度显示变化
            tableResize() {
                this.$nextTick(() => {
                    let desWidth = document.querySelector('.ivu-table-wrapper').offsetWidth - this.tableWidth;
                    if (desWidth < 200) {
                        desWidth = 200
                    };
                    this.listHeader[this.listHeader.length - 2].width = desWidth       
                })              
            }
        }
    }
</script>
<style lang="less" scoped>
    @import url("../../styles/permissions");
</style>

