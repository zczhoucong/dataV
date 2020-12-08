<template>
    <div class="loginBody">      
        <div class="loginBox">
            <div class="logo">
                <img src="../../images/login/logo.png" alt="">
            </div>
            <div class="loginContent">
                <img src="../../images/login/ct.png" alt="">
                <div class="login">
                    <div class="loginInput">
                        <!-- <Form class="loginInput">
                            <FormItem >
                                <Input  placeholder="请输入用户名" class="inputStyle">
                                    <span slot="prepend">
                                        <Icon :size="16" type="person"></Icon>
                                    </span>
                                </Input>
                            </FormItem>
                            <FormItem>
                                <Input type="password"  placeholder="请输入密码">
                                    <span slot="prepend">
                                        <Icon :size="14" type="locked"></Icon>
                                    </span>
                                </Input>
                            </FormItem>
                            <FormItem>
                                <Input style="width: 60%"></Input>
                                <span>123456</span>
                            </FormItem>
                            <FormItem>
                                <Radio>记住密码</Radio>
                            </FormItem>
                            <FormItem>
                                <Button  type="primary" long>登录</Button>
                            </FormItem>
                        </Form> -->                                            
                        <input type="text" placeholder="用户名">
                        <input type="password" placeholder="密码">
                        <div>
                            <input type="text" placeholder="请输入验证码">
                            <create-code class="createCode" :identifyCode="identifyCode" @click.native="refreshCode"></create-code>
                        </div>
                        <Checkbox>记住密码</Checkbox>
                        <Button  type="primary" long>登录</Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import createCode from "../../com/components/createCode";
    export default {
        components: {
            createCode
        },
        data () {
            return {
                identifyCodes: "1234567890",
                identifyCode: "",                
            };
        },
        mounted() {
            this.refreshCode()           
        },
        methods: {
            randomNum(min, max) {
                return Math.floor(Math.random() * (max - min) + min);
            },
            refreshCode() {
                this.identifyCode = "";
                this.makeCode(this.identifyCodes, 4);
            },
            makeCode(o, l) {
                for (let i = 0; i < l; i++) {
                    this.identifyCode += this.identifyCodes[
                    this.randomNum(0, this.identifyCodes.length)
                    ];
                }
                // console.log(this.identifyCode);
            }
        },
    }
</script>

<style lang="less">
    @import '../../styles/login.less';

</style>