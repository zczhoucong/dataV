<template>
    <Modal v-model="modalShow" width="480" :closable="false" :mask-closable="false">
        <p slot="header" style="text-align:center">
            <span>修改密码</span>
        </p>
        <Form  ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <FormItem label="密码" prop="passwd" style="width:70%;margin:34px auto">
                <Input type="password" v-model="formValidate.passwd"></Input>
            </FormItem>    
        
            <FormItem label="确认密码" prop="passwdCheck" style="width:70%;margin:33px auto">
                <Input type="password" v-model="formValidate.passwdCheck"></Input>
            </FormItem>                                          
        </Form>
        <div slot="footer">
            <Button type="primary" @click="modifyPwd('formValidate')">确认</Button>
            <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">取消</Button>
        </div>            
    </Modal>   
</template>

<script>
    import {modifyPwd} from '../../api/permission'
    export default {
        props: {
            // 控制显示
            modal: {
                type: Boolean,
                default: false
            },
            // 用户数据
            itemInfo: {
                type: Object,
                default: {}
            },
            // 修改成功后是否跳转登录页面
            isGo: {
                type: Boolean,
                default: false
            }
        },
        data() {
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
            }   
            return {
                formValidate: {
                    passwd: '',
                    passwdCheck: ''
                },
                // 表单验证规则
                ruleValidate: {
                    passwd: [
                        { required: true, validator: validatePass, trigger: 'blur' }
                    ],
                    passwdCheck: [
                        { required: true, validator: validatePassCheck, trigger: 'blur' }
                    ]
                },
            }
        },
        computed: {
            modalShow: {
                get() {
					return this.modal
				},
				set(val) {
					this.$emit('update:modal', val)
				}
            }
        },
        methods: {
            // 修改用户密码
            modifyPwd(name) {
                this.$refs[name].validate().then(valid => {
                    if (valid) {
                        this.$Modal.confirm({
                            content: "确定修改密码吗",
                            okText: "确定",
                            onOk: () => {
                                modifyPwd({
                                    createBy: this.itemInfo.userName,
                                    userId: this.itemInfo.userId,
                                    pwd: this.formValidate.passwdCheck
                                }).then(resp => {
                                    console.log(resp)
                                    if (resp.data.code === 0) {
                                        if (this.isGo) {
                                            this.$Message.success('修改密码成功，请重新登录！');
                                            localStorage.clear();
                                            this.$router.push({
                                                path: '/login', 
                                            })    
                                        } else {
                                            this.$Message.success('修改密码成功!');
                                        }
                                    } else {
                                        this.$Message.warning('修改失败，请稍后重试！')
                                    }
                                }) 
                                this.modalShow = false;          
                            }
                        }) 
                    } else {
                        this.$Message.error('请按要求填写内容!');
                    }
                })
                
            },
            handleReset(name) {
                this.$refs[name].resetFields();
                this.modalShow = false
            }, 
        },
    }
</script>

<style scoped>

</style>