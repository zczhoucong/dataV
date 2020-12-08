<template>
    <div class="list">      
        <div class="breadcrumbRole">
            <Breadcrumb>
                <BreadcrumbItem to="/home/permissions/roles">
                    <Icon type="ios-home-outline"></Icon>
                    角色列表
                </BreadcrumbItem>
                <BreadcrumbItem to="/home/permissions/roles/addRole">
                    <Icon type="ios-home-outline"></Icon>
                    编辑角色
                </BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="inputBox">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" label-position="top" style="width:90%"> 
                <Row >
                    <Col span="5" offset="6">
                        <FormItem label="角色名称" prop="roleName">
                            <Input v-model="formValidate.roleName" placeholder="请输入角色名称"></Input>
                        </FormItem>
                    </Col>
                    <Col span="5" offset="2">
                        <FormItem label="角色描述" prop="roleDesc">
                            <Input type="textarea"  :autosize="{minRows: 1,maxRows: 5}" v-model="formValidate.roleDesc" placeholder="请输入角色描述"></Input>
                        </FormItem>
                    </Col>
                </Row>  
                <Row>
                    <Col offset="6">
                        <FormItem label="权限选择 (不勾选，默认保留原先权限设置)" prop="modules">
                            <Tree ref="tree" :data='permissList' show-checkbox style="width:350px;height:380px;overflow:auto;"></Tree> 
                        </FormItem>
                    </Col>                    
                </Row>  
                <Row>
                    <Col offset="10">
                        <FormItem>
                            <Button type="primary" @click="handleSubmit('formValidate')" size="large">修改</Button>
                            <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 30px" size="large">取消</Button>
                        </FormItem>
                    </Col>                
                </Row>  
                
            </Form>     
        </div>
            
    </div>
</template>

<script>
    import {getModuleTree, modifyRole} from '../../api/permission'
    export default {
        data () {
            return {
                formValidate: {
                    roleName: '',
                    roleDesc: '',
                    modules: ''
                },
                ruleValidate: {
                    roleName: [
                        { required: true, message: '角色名称不能为空', trigger: 'blur' }
                    ],
                    modules: [
                        { required: true,  message: '请选择角色权限', trigger: 'change' }
                    ],
                    roleDesc: [
                        { type: 'string', max: 150, message: '描述不超过150个字', trigger: 'blur' }
                    ]
                },
                permissList: [],
            }
        },
        mounted() {
            this.getModuleTree()
            this.roleParams = JSON.parse(sessionStorage.getItem('roleParams'));
            console.log(this.roleParams)
            this.formValidate.roleName = this.roleParams.row.roleName;
            this.formValidate.roleDesc = this.roleParams.row.roleDesc;
        },
        methods: {
            handleSubmit(name) {
                this.$nextTick(() => {
                    // 获取选中权限
                    this.getSelectModule();
                    this.$refs[name].validate().then(resp => {
                        console.log(resp)
                        if (resp) {
                            this.modifyRole();   
                        } else {
                            this.$Message.warning('请按要求填写信息！')
                        }                       
                    })
                })     
            },
            handleReset(name) {
                this.$refs[name].resetFields();
                this.$router.push({
                    path: '/home/permissions/roles', 
                })
            },   
            getSelectModule() {
                // 获取已选择节点
                let modulesArr = this.$refs.tree.getCheckedNodes();
                // 获取权限树上所有节点状态
                let treeStatus = this.$refs.tree.compileFlatState();
                treeStatus.forEach(item => {
                    // indeterminate为true时表示这个节点是展开状态
                    if (item.node.indeterminate) {
                        modulesArr.push(item.node)
                    }
                });
                let modules = [];
                modulesArr.forEach(i => {
                    modules.push(i.moduleId)
                });
                this.formValidate.modules = modules.join(',') || this.roleParams.row.moduleId;
            },
            modifyRole() {
                modifyRole({
                   roleId: this.roleParams.row.roleId,
                   createBy: JSON.parse(localStorage.getItem('userInfo')).userName,
                   roleName: this.formValidate.roleName,
                   modules: this.formValidate.modules,
                   roleDesc: this.formValidate.roleDesc
                }).then(resp => {
                    console.log(resp);
                    if (resp.data.code === 0) {
                        this.$Message.success('编辑成功！');
                        this.$router.push({
                            path: '/home/permissions/roles', 
                        })
                    } else {
                        this.$Message.warning(resp.data.msg)
                    }
                })
            },
            getModuleTree() {
                getModuleTree().then(resp => {
                    console.log(resp)
                    if (resp.data.code === 0){
                        // this.permissList = resp.data.data.list[0].treePid
                        this.permissList = this.getTree(resp.data.data.list[0].treePid);
                    }
                })
            },
            // 遍历获取的权限树，转换为tree组件格式
            getTree(tree = []) {
                let arr = [];
                if (!!tree && tree.length !== 0) {
                    tree.forEach(item => {
                        let obj = {};
                        obj.title = item.moduleName;
                        obj.moduleId = item.moduleId; 
                        obj.expand = false;
                        obj.selected = false;
                        obj.children = this.getTree(item.childNode); // 递归调用
                        arr.push(obj);
                    });
                }
                return arr;
            },
        }
    }
</script>

<style lang="less" scoped>
    @import url("../../styles/permissions");
    // .list {
    //     width: 100%;
    //     height: 100%;
    //     padding: 80px 30px;
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
    // }
</style>