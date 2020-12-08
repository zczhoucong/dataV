<template>
    <Modal v-model="modalShow" width="450" :closable="false">
        <p slot="header" style="text-align:center">
            <span>个人信息</span>
            <a href="javascript:;" style="position:absolute;right:20px;top:20px" @click="disabled=false">修改信息</a>
        </p>
        <div style="text-align:center">
            <Form  ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">               
                <Row>
                    <Col span="12">
                        <FormItem label="E-mail" prop="email">
                            <Input v-model="formValidate.email" :disabled="disabled" placeholder="请输入邮箱"></Input>
                        </FormItem>         
                    </Col>
                    <Col span="12">
                        <FormItem label="手机号" prop="mobile">
                            <Input v-model="formValidate.mobile" :disabled="disabled" placeholder="请输入手机号"></Input>
                        </FormItem>    
                    </Col>
                </Row>
                <FormItem label="备注" prop="description">
                    <Input v-model="formValidate.description" :disabled="disabled" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
                </FormItem>
            </Form>
        </div>
        <div slot="footer">
            <Button type="primary" @click="handleSubmit('formValidate')" v-if="!disabled">确定</Button>
            <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">离开</Button>
        </div>
    </Modal>
</template>
<script>
    import {updateUser} from '../../api/permission'
    export default {
        props: {
            modal: {
                type: Boolean,
                default: false
            },
        },
        data () {
            const validateTel = (rule, value, callback) => {
                if (!value || value.length === 0) {
                    callback();
                };
                let reg = /^1(3|4|5|7|8)\d{9}$/;
                if (!reg.test(value)) {
                    callback(new Error('号码格式不正确'));
                } else {
                    callback();
                }
            };  
            return {
                disabled: true,
                formValidate: {
                    userName: '',
                    email: '',
                    mobile: '',
                    description: ''
                },
                // 表单验证规则
                ruleValidate: {
                    mobile: [
                        { validator: validateTel, trigger: 'blur' }
                    ],
                    email: [
                        { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
                    ],
                    description: [
                        { type: 'string', max: 150, message: '内容不超过150字', trigger: 'blur' }
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
        mounted() {
            this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
            this.formValidate.description = this.userInfo.description;
            this.formValidate.email = this.userInfo.email;
            this.formValidate.mobile = this.userInfo.mobile;
            // this.formValidate.userName = this.userInfo.userName;
        },
        methods: {    
            // 确认修改        
            handleSubmit(name) {
                this.$nextTick(() => {
                    this.$refs[name].validate().then(resp => {
                        if (resp) {
                            this.updateUser();   
                        } else {
                            this.$Message.warning('请正确填写信息！')
                        }                       
                    })
                })     
            },
            // 关闭窗口
            handleReset(name) {
                // if (!this.disabled) {
                //   this.$refs[name].resetFields();  
                // }
                this.disabled = true;
                this.modalShow = false
            },  
            // 更新用户信息
            updateUser() {
                updateUser({
                    createBy: this.userInfo.createBy,
                    description: this.formValidate.description,
                    email: this.formValidate.email,
                    mobile: this.formValidate.mobile,
                    userId: this.userInfo.userId
                }).then(resp => {
                    console.log(resp)
                    if (resp.data.code === 0) {
                        this.$Message.success('修改成功');
                        Object.assign(this.userInfo, {
                            description: this.formValidate.description,
                            email: this.formValidate.email,
                            mobile: this.formValidate.mobile,
                            userName: this.formValidate.userName,
                        });
                        localStorage.setItem('userInfo', JSON.stringify(this.userInfo))
                        this.disabled = true;
                    } else {
                        this.$Message.warning('修改失败，请稍后重试');
                        this.modalShow = false
                    }
                })
            }
        }
    }
</script>
