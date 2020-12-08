<template>
    <div class="list">     
        <div class="breadcrumbRole">
            <Breadcrumb>
                <BreadcrumbItem to="/home/permissions/user">
                    <Icon type="ios-home-outline"></Icon>
                    用户列表
                </BreadcrumbItem>
                <BreadcrumbItem to="/home/permissions/user/addUser">
                    <Icon type="ios-home-outline"></Icon>
                    新建用户
                </BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="inputBox">
            <Form  ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">               
                <!-- <FormItem label="用户名" prop="userName" style="width:50%">
                    <Input v-model="formValidate.userName" placeholder="请输入用户名"></Input>
                </FormItem> -->
                <Row>
                    <Col span="12">
                        <FormItem label="用户名" prop="userId">
                            <Input v-model="formValidate.userId" placeholder="请输入用户名"></Input>
                        </FormItem> 
                    </Col>
                    <Col span="12">
                         <FormItem label="昵称" prop="userName">
                            <Input v-model="formValidate.userName" placeholder="请输入昵称"></Input>
                        </FormItem>
                    </Col>
                </Row>  
                <Row>
                    <Col span="12">
                        <FormItem label="密码" prop="passwd">
                            <Input type="password" v-model="formValidate.passwd" placeholder="请输入密码"></Input>
                        </FormItem>    
                    </Col>
                    <Col span="12">
                        <FormItem label="确认密码" prop="passwdCheck">
                            <Input type="password" v-model="formValidate.passwdCheck" placeholder="再次输入密码"></Input>
                        </FormItem>    
                    </Col>
                </Row>                              
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
                        <Radio label="0">公开</Radio>
                        <Radio label="1">匿名</Radio>
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
                    <Button type="primary" @click="handleSubmit('formValidate')">新建</Button>
                    <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">取消</Button>
                </FormItem>
            </Form>
        </div>      
    </div>

</template>
<script>
    import {addUser, getRoleList} from '../../api/permission'
    // import guid from '../../utils/guid'
    export default {
        data () {
            const validatePass = (rule, value, callback) => {
                let reg = /^[a-zA-Z]+[0-9]+$/
                if (value === '') {
                    callback(new Error('请输入你的密码'));
                } else if (value.length < 6 || !reg.test(value)) {
                    callback(new Error('密码必须为字母再加数字，且长度不小于6位'));
                } else {
                    if (this.formValidate.passwdCheck !== '') {
                        // 对第二个密码框单独验证
                        this.$refs.formValidate.validateField('passwdCheck');
                    }
                    callback();
                }
            };
            const validatePassCheck = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再出输入你的密码'));
                } else if (value !== this.formValidate.passwd) {
                    callback(new Error('两处密码不一致，请重新输入'));
                } else {
                    callback();
                }
            };
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
                formValidate: {
                    userName: '',
                    userId: '',
                    email: '',
                    mobile: '',
                    type: '0',
                    status: '1',
                    description: '',
                    roleId: [],
                    passwd: '',
                    passwdCheck: ''
                },
                // 表单验证规则
                ruleValidate: {
                    userName: [
                        { required: true, message: '昵称不能为空', trigger: 'blur' }
                    ],
                    userId: [
                        { required: true, message: '用户名不能为空', trigger: 'blur' }
                    ],
                    passwd: [
                        { required: true, validator: validatePass, trigger: 'blur' }
                    ],
                    passwdCheck: [
                        { required: true, validator: validatePassCheck, trigger: 'blur' }
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
            this.getRoleList()
        },
        methods: {
            handleSubmit(name) {
                this.$nextTick(() => {
                    this.$refs[name].validate().then(resp => {
                        console.log(resp)
                        if (resp) {
                            this.addUser();   
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
            // 新建用户 
            addUser() {
                let params = {
                    createBy: JSON.parse(localStorage.getItem('userInfo')).userName,
                    description: this.formValidate.description,
                    email: this.formValidate.email,
                    mobile: this.formValidate.mobile,
                    pwd: this.formValidate.passwd,
                    type: this.formValidate.type,
                    status: this.formValidate.status,
                    userId: this.formValidate.userId,
                    userName: this.formValidate.userName,
                    roleId: this.roleIdStr
                };
                console.log('新建信息', params)
                addUser(params).then(resp => {
                    console.log(resp);
                    if (resp.data.code === 0) {
                        this.$Message.success('新增成功！');
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

