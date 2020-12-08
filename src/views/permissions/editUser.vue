<template>
    <div class="list">     
        <div class="breadcrumbRole">
            <Breadcrumb>
                <BreadcrumbItem to="/home/permissions/user">
                    <Icon type="ios-home-outline"></Icon>
                    用户列表
                </BreadcrumbItem>
                <BreadcrumbItem to="/home/permissions/user/editUser">
                    <Icon type="ios-home-outline"></Icon>
                    编辑用户
                </BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="inputBox">
            <Form  ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">               
                <FormItem label="昵称" prop="userName" style="width:50%">
                    <Input v-model="formValidate.userName" placeholder="请输入昵称"></Input>
                </FormItem>                            
                <FormItem label="角色选择" prop="roleId" style="width:50%">
                    <Select v-model="formValidate.roleId" multiple>
                        <Option v-for="item in roleList" :value="item.roleId" :key="item.roleId">{{item.roleName}}</Option>
                    </Select>
                </FormItem>
                <Row>
                    <Col span="12">
                        <FormItem label="E-mail" prop="email">
                            <Input v-model="formValidate.email" placeholder="请输入邮箱"></Input>
                        </FormItem>         
                    </Col>
                    <Col span="12">
                        <FormItem label="手机号" prop="mobile">
                            <Input v-model="formValidate.mobile" placeholder="请输入手机号"></Input>
                        </FormItem>    
                    </Col>
                </Row>    
                <FormItem label="登录类型" prop="type">
                    <RadioGroup v-model="formValidate.type">
                        <Radio label="1">匿名</Radio>
                        <Radio label="0">公开</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="账号状态" prop="status">
                    <RadioGroup v-model="formValidate.status">
                        <Radio label="1">激活</Radio>
                        <Radio label="2">锁定</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="备注" prop="description">
                    <Input v-model="formValidate.description" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleSubmit('formValidate')">修改</Button>
                    <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">取消</Button>
                </FormItem>
            </Form>
        </div>      
    </div>

</template>
<script>
    import {modifyUser, getRoleList} from '../../api/permission'
    export default {
        data () {
            const validateTel = (rule, value, callback) => {
                if (!value || value.length === 0) {
                    callback();
                };
                let reg = /^1(3|4|5|7|8)\d{9}$/;
                if (!reg.test(value)) {
                    callback(new Error('请输入正确格式的手机号码'));
                } else {
                    callback();
                }
            };  
            const validateRole = (rule, value, callback) => {
                if (!value || value.length === 0) {
                    callback(new Error('请选择角色'));
                } else {
                    callback();
                }
            };                          
            return {
                roleList: [],
                itemParams: {},
                userId: '',                
                formValidate: {
                    userName: '',
                    email: '',
                    mobile: '',
                    type: '',
                    status: '',
                    description: '',
                    roleId: [],
                },
                // 表单验证规则
                ruleValidate: {
                    userName: [
                        { required: true, message: '昵称不能为空', trigger: 'blur' }
                    ],
                    mobile: [
                        { validator: validateTel, trigger: 'blur' }
                    ],
                    email: [
                        { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
                    ],
                    type: [
                        { message: '请选择登录类型', trigger: 'change' }
                    ],
                    status: [
                        { message: '请选择账号状态', trigger: 'change' }
                    ],
                    roleId: [
                        { required: true, validator: validateRole, trigger: 'change' }
                    ],
                    description: [
                        { type: 'string', max: 150, message: '内容不超过150字', trigger: 'blur' }
                    ]
                },                 
            }
        },
        computed: {
            // 将roleId从数组转换成字符串
            roleIdStr() {
                return this.formValidate.roleId.join(',') 
            }
        },
        mounted() {
            this.getRoleList(); // 获取角色列表
            this.itemParams = JSON.parse(sessionStorage.getItem('itemParams'));
            this.userId = this.itemParams.row.userId;
            this.formValidate.description = this.itemParams.row.description;
            this.formValidate.email = this.itemParams.row.email;
            this.formValidate.mobile = this.itemParams.row.mobile;
            this.formValidate.type = this.itemParams.row.type;
            this.formValidate.status = this.itemParams.row.status;
            this.formValidate.userName = this.itemParams.row.userName;
            this.formValidate.roleId = this.itemParams.row.roleId.split(',').map(Number)
        },
        methods: {
            handleSubmit(name) {
                this.$nextTick(() => {
                    let _this = this;
                    this.$refs[name].validate().then(resp => {
                        console.log(resp)
                        if (resp) {
                            this.modifyUser();   
                        } else {
                            this.$Message.warning('请按要求填写信息！')
                        }                       
                    })
                })     
            },
            handleReset(name) {
                this.$refs[name].resetFields();
                this.$router.push({
                    path: '/home/permissions/user', 
                })
            },            
            // 修改用户信息
            modifyUser() {
                let params = {
                    createBy: JSON.parse(localStorage.getItem('userInfo')).userName,
                    id: this.itemParams.row.id,
                    description: this.formValidate.description,
                    email: this.formValidate.email,
                    mobile: this.formValidate.mobile,
                    type: this.formValidate.type,
                    status: this.formValidate.status,
                    userId: this.userId,
                    userName: this.formValidate.userName,
                    roleId: this.roleIdStr
                };
                console.log(111,this.itemParams,params)
                modifyUser(params).then(resp => {
                    console.log(resp);
                    if (resp.data.code === 0) {
                        this.$Message.success('编辑成功！');
                        this.$router.push({
                            path: '/home/permissions/user', 
                        })
                    } else {
                        this.$Message.warning(resp.data.msg)
                    }
                })
            },
            getRoleList() {
                // 获取角色列表
                getRoleList().then(resp => {
                    console.log(resp)
                    this.roleList = resp.data.data.list
                })
            }
        }
    }
</script>
<style lang="less" scoped>
    @import url("../../styles/permissions");
</style>

