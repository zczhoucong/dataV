<!--
 作者：高春超
 说明：发布提示框
 时间:2018年6月8日16:31:30
 -->
<template>
    <Modal :value="pubOk" width="500" @on-cancel="cancel" class="publish-dialog">
        <p slot="header">            
            <span style="color:#fff;">发布</span>
        </p>
        <div class="form-tr">
            <div class="form-label">
                发布分享：
            </div>
            <div class="form-val">
                <i-switch v-model="form.pgStatus" size="large" @on-change="change">
                    <span slot="open">开启</span>
                    <span slot="close">关闭</span>
                </i-switch>
                <span style="margin-left:5px;color:#bcc9d4">* 每次开启分享后，访问链接将发生变化</span>
            </div>
        </div>
        <div class="split-line"></div>  
        <div class="card-title">一、分享链接</div>    
        <div class="form-tr">
            <Input v-model="shareUrl" placeholder="开启发布分享后可获取访问链接" disabled>
                <span slot="append" v-clipboard:copy="shareUrl" v-clipboard:success="onCopy" style="cursor: pointer">复制</span>
            </Input>
        </div>
        <div class="card-title" v-show="form.pgStatus">访问限制</div>
        <div class="form-box" v-show="form.pgStatus">
            <div class="form-tr">
                <div class="form-label">
                    访问密码：
                </div>
                <div class="form-val">
                    <Input size="small" :type="iptType" v-model="form.publishPwd" style="width: 200px">
                        <Icon type="md-eye" @click="viewPwd" @click.native="viewPwd" style="cursor:pointer" slot="suffix"/>
                    </Input>
                    <Checkbox :value="pwdEnable" style="margin-left:5px"  @click.prevent.native="switchPwd">&nbsp;</Checkbox>
                </div>
            </div>
            <div class="form-tr">
                <div class="form-label">
                    验证有效期：
                </div>
                <div class="form-val">
                    <DatePicker type="date" size="small" format="yyyy-MM-dd 23:59:59" v-model="form.publishTime" :options="options3" @on-change="changeTime" style="width: 200px"></DatePicker>
                    <Checkbox :value="timeEnable" style="margin-left:5px" @click.prevent.native="switchTime">&nbsp;</Checkbox>
                </div>
            </div>
        </div>
         <!-- <div class="form-btnlist">
             <div class="form-label">发布页面：</div>
             <div>
                <div class="form-btn" :class="form.pgStatus?'selected':''" @click="sharePage">实时页面</div>
                <div class="form-btn">创建快照</div>
             </div>
         </div> -->
        <div class="card-title">二、历史快照</div>    
        <div class="histori-list">
             <Table ref="currentRowTable" :columns="tableColumn" :data=historiList></Table>
        </div>
        <div class="publish-btn-box">
            <div class="btn" @click="newHistori">新建历史快照</div>
        </div>
        <div slot="footer"></div>
         <Modal  class="publish-dialog"  title="历史快照" width="420" :styles="{top: '200px'}" v-model="historShow">             
            <Form :label-width="80">
                <FormItem label="访问密码">
                    <Input v-model.trim="historForm.publishPwd" :type="iptType"  placeholder="请输入访问密码" style="width:250px">                        
                        <Icon type="md-eye" @click="viewPwd" @click.native="viewPwd" style="cursor:pointer" slot="suffix"/>
                    </Input>
                </FormItem>
                <FormItem label="备注说明">
                    <Input v-model.trim="historForm.remark" clearable placeholder="请输入备注说明" style="width:250px"/>
                </FormItem>
                <FormItem label="分享链接" v-show="historForm.publishId">
                    <Input :value="viewHistoriLink(historForm.publishId)" disabled>
                        <span slot="append" v-clipboard:copy="viewHistoriLink(historForm.publishId)" v-clipboard:success="onCopy" style="cursor: pointer">复制</span>
                    </Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" :loading="modal_loading" @click="AddHistor">确认</Button>
                    <Button style="margin-left: 8px" @click="historShow=false">取消</Button>
                </FormItem>
            </Form>
            <div slot="footer"></div>
        </Modal>
    </Modal>
</template>
<script>
    import {publishInfo,publish,publishPwd,publishTime,editHistorical,delHistori,historical,shareHistori,horiList} from '@/api/page'
    import {NullToStrOfJson} from '@/utils/assist'
    import modal from '@/mixins/modal';
    export default{
        mixins: [ modal ],
        props: {
            pubOk: {
                type: Boolean
            },
            pgId: {
                type: String,
                require: true
            }
        },
        data(){
            return {
                modal_loading:false,
                form:{
                    pgStatus:false,
                    publishCode:'',
                    publishPwd:'',
                    publishTime :''
                },      
                historForm:{
                    publishId:'',
                    publishPwd:'',
                    remark:''
                },       
                pwdEnable:false,
                timeEnable:false,
                historShow:false,
                iptType:'password',
                options3: {
                    disabledDate (date) {
                        return date && date.valueOf() < Date.now() - 86400000;
                    }
                },
                shareUrl:'',
                tableColumn:[{
                    title: '状态',
                    width:60,
                    align:'center',
                    key: 'publishType',
                    render:(h,params)=>{
                        return h('div',[
                            h('Checkbox',{
                                props:{
                                    'true-value':1,
                                    'false-value':0,
                                    value:params.row.publishType
                                },
                                style: {
                                    marginLeft: '5px'
                                },
                                on: {
                                    'on-change': () => {                                        
                                        this.toggleHistori(params)
                                    }
                                }
                            })
                        ])
                    }
                },{
                    title: '快照时间',     
                    width:150,              
                    key: 'CreationTime'
                },{
                    title: '注释',
                    width:180,
                    key: 'remark'
                },{
                    title: ' ',
                    key:'action',
                    width:75,
                    align:'center',
                    render:(h,params)=>{
                        return h('Dropdown',{
                            props:{
                                trigger:'click',
                                placement:'bottom-end'
                            }
                        },[
                            h('div',[
                                h('a','操作'),
                                h('Icon',{
                                    props:{
                                        type:'ios-arrow-down'
                                    }
                                })
                            ]),
                            h('DropdownMenu',{
                                slot:'list'
                            },[
                                h('DropdownItem',{
                                    nativeOn:{
                                        click:()=>{
                                            this.viewHistoriInfo(params)
                                        }
                                    }
                                },'查看'),
                                h('DropdownItem',{
                                    nativeOn:{
                                        click:()=>{
                                            this.delHistoriInfo(params)
                                        }
                                    }
                                },'删除')
                            ])
                        ])
                    }
                }],
            historiList:[]  
            }       
        },
        watch:{
            // pgId:{
            //     handler(val){
            //         if(val){
            //             this.GetShareInfo()
            //             this.GetHistoriList();
            //         }                    
            //     },
            //     immediate:true                
            // },
            pubOk(now,old){
                if(now){
                    this.GetShareInfo()
                    this.GetHistoriList();
                }
            },
            'form.pgStatus'(val){
                if(!val){
                    this.shareUrl=''
                    this.form.publishTime=''
                    this.form.publishPwd=''
                    this.form.publishCode=''
                    this.timeEnable=false
                    this.pwdEnable=false   
                }
            }
        },
        methods: {          
            GetShareUrl(){
                const routeData = this.$router.resolve({path: `/share/${this.form.publishCode}`});
                this.shareUrl= window.location.origin + window.location.pathname + routeData.href
            },
            GetShareInfo(){
                publishInfo({pageId:this.pgId}).then(resp=>{
                    let data=resp.data[0]
                    data= NullToStrOfJson(data)
                    if(data.pgStatus===0){
                        this.form.pgStatus=false

                    }else{
                        this.form.pgStatus=true
                        this.form.publishCode=data.publishCode
                        this.form.publishTime=data.publishTime
                        this.form.publishPwd=data.publishPwd
                        if(this.form.publishTime.length>0){
                            this.timeEnable=true
                        }
                        if(this.form.publishPwd.length>0){
                            this.pwdEnable=true
                        }
                        this.GetShareUrl()
                    }                   
                })
            },
            change(){
                publish({pageId:this.pgId,type:this.form.pgStatus}).then(resp=>{
                    if(resp.resCode===0){
                        this.form.publishCode=resp.data
                        if(this.form.pgStatus){
                            this.GetShareUrl()
                        }
                    }else{
                        this.$Message.error('发布失败');
                        this.form.pgStatus=false
                    }                    
                })

            },
            switchPwd(){
                if(!this.pwdEnable&&(this.form.publishPwd.length<6 || this.form.publishPwd.length > 12)){
                    this.$Message.warning("密码长度在6-12位之间")  
                    this.pwdEnable=false                
                    return
                }
                this.pwdEnable=!this.pwdEnable;    
                publishPwd({pageId:this.pgId,password:this.form.publishPwd,type:this.pwdEnable}).then(resp=>{
                    if(resp.data===0){
                        this.$Message.success('密码设置成功')
                    }
                    if(!this.pwdEnable){
                        this.form.publishPwd=''
                    }
                })
            },
            changeTime(e){
                this.form.publishTime = e;
            },
            switchTime(){
                if(!this.timeEnable&&this.form.publishTime.length<1){
                    this.$Message.warning("验证有效期不能为空")  
                    this.timeEnable=false                
                    return
                }
                this.timeEnable=!this.timeEnable;    
                publishTime({pageId:this.pgId,hour:this.form.publishTime,type:this.timeEnable}).then(resp=>{
                    if(resp.data===0){
                        this.$Message.success('有效期设置成功')
                    }
                    if(!this.timeEnable){
                        this.form.publishTime=''
                    }
                })
            },
            GetHistoriList(){
                horiList({pageId:this.pgId}).then(resp=>{
                    this.historiList=NullToStrOfJson(resp.data);                     
                })
            },           
            viewPwd(){
                this.iptType='text'
                setTimeout(()=>{
                    this.iptType='password'
                },1000)                
            },
            newHistori(){     
                this.modal_loading=false
                this.historForm.publishId=''
                this.historForm.publishPwd=''
                this.historForm.remark=''
                this.historShow=true;     
            },
            viewHistoriInfo(params){
                this.modal_loading=false
                this.historForm.publishId=params.row.publishId
                this.historForm.publishPwd=params.row.publishPwd
                this.historForm.remark=params.row.remark
                this.historShow=true; 
            },
            
            viewHistoriLink(publishId){
                const routeData = this.$router.resolve({path: `/camera/${publishId}`});
                return window.location.origin + window.location.pathname + routeData.href                
            },
            AddHistor(){
                this.modal_loading=true
                if(this.historForm.publishId){
                    editHistorical({publishId:this.historForm.publishId,pwd:this.historForm.publishPwd,remark:this.historForm.remark}).then(resp=>{
                        if(resp.data===2){
                            this.$Message.warning('当前页面为空白页面，无法创建快照')
                        }else if(resp.data===0){
                            this.$Message.success('历史快照保存成功')
                            this.GetHistoriList()
                        }
                        this.historShow=false; 
                    })
                }else{
                    historical({pageId:this.pgId,pwd:this.historForm.publishPwd,remark:this.historForm.remark}).then(resp=>{
                        if(resp.data===2){
                            this.$Message.warning('当前页面为空白页面，无法创建快照')
                        }else if(resp.data===0){
                            this.$Message.success('历史快照创建成功')
                            this.GetHistoriList()
                        }
                        this.historShow=false;      
                    })
                }                
            },
            delHistoriInfo(params){
                 this.confirm('快照删除后无法恢复，是否确认删除？',()=>{
                    delHistori({publishId: params.row.publishId}).then(resp => {
                        if (resp.resCode===0) {
                            const index = this.historiList.findIndex(i => i.publishId === params.row.publishId);
                            this.historiList.splice(index, 1);
                            this.$Message.success('删除成功!');
                        }
                    })
                })
            },
            sharePage(){
                if(this.form.pgStatus) return
                this.form.pgStatus=true
                this.change()
            },
            // 切换历史快照共享
            toggleHistori(params){
                const type=params.row.publishType
                if(type===1){
                    params.row.publishType=0
                }else if(type===0){
                    params.row.publishType=1                    
                }
                shareHistori({publishId:params.row.publishId,type:params.row.publishType}).then(resp=>{
                    if(resp.data===0){
                        this.$Message.error('分享历史快照失败')
                        params.row.publishType=type
                    }
                })
            },
            onCopy(e){
                this.$Message.success('复制链接地址成功');
            },
            viewRightNow(){
                window.open(this.shareUrl, '_target')
            },
            cancel(){
                this.$emit('closeTip',this.form.pgStatus?1:0)               
            }
        }
    }
</script>
<style type="text/less" lang="less">
.publish-dialog{
    .ivu-icon-ios-close{
        color:#fff;
    }
    .ivu-modal-header-inner{
        color:#fff;
    }
}
.publish-dialog .ivu-modal-header{
    border-bottom: none
}

.publish-dialog .ivu-modal-footer{
    border-top: none;
}
.publish-dialog  .ivu-input[disabled], fieldset[disabled] .ivu-input{
    background-color:transparent
}
.publish-dialog .ivu-modal-close .ivu-icon-ios-close{
    color:#fff;
}
.publish-dialog .ivu-checkbox-inner{
    background-color: transparent;
}
.publish-dialog .span.ivu-date-picker-cells-cell-disabled, .publish-dialog span.ivu-date-picker-cells-cell-disabled:hover{
    background-color: transparent;
}
.publish-dialog span.ivu-date-picker-cells-cell-disabled, .publish-dialog span.ivu-date-picker-cells-cell-disabled:hover{
    background: transparent;    
}
.publish-dialog .ivu-date-picker-cells span em{
    color: #c5c8ce;
}
.publish-dialog span.ivu-date-picker-cells-cell-disabled em{
    color:rgba(255,255,255,.2)
}
.publish-dialog span.ivu-date-picker-cells-cell-next-month em{
color:rgba(255, 255, 255, 0.5)
}
.publish-dialog .ivu-modal-footer{
    padding: 0
}
.publish-dialog .ivu-table-cell{
    padding-right: 0
}
.publish-dialog .ivu-table-wrapper{
    border: 1px solid rgba(255,255,255,.2);
}
.publish-dialog .ivu-table{
    color:#fff;
    background-color:transparent;
    th{
        background-color:transparent;
        border-bottom: 1px solid rgba(255,255,255,.2);
    }
    td{
        background-color:transparent;
        border-bottom: 1px solid rgba(255,255,255,.2);
    }
    &::before{
        background-color:transparent
    }
    &::after{
        background-color:transparent;
        width:0
    }    
}
.publish-dialog .ivu-dropdown-menu{
    min-width: auto;
}
.publish-dialog .ivu-dropdown-item{
    color:#fff;
    &:hover{
        background: rgba(255,255,255,.3)
    }
}
.publish-dialog .ivu-dropdown-item-selected,.publish-dialog .ivu-dropdown-item.ivu-dropdown-item-selected:hover {
    background: transparent
}
.ivu-table th{
    background-color:transparent
}
    .link-box {
        background-color: #f7f8fa;
        width: 100%;
        padding: 20px;
        margin-top: 10px;
    }
    .form-tr{
        width:100%;
        height: 35px;
        line-height: 35px;        
        .form-label{
            color:#bcc9d4;
            float: left;
            width:90px;      
            font-size:14px;      
        }
    }
    .form-box{
        width:100%;
        border:1px solid rgba(255,255,255,.2);
        border-radius: 5px;
        padding:10px 15px;
    }
    .split-line{
        width:100%;
        height: 1px;
        background-color:rgba(255,255,255,.2);
        margin:15px 0;
    }
    .card-title{
        color:#bcc9d4;
        font-weight: bold;
        font-size:14px;
        margin:15px 0;
    }
    .form-btnlist{
        height: 30px;
        width:100%;
        color:#bcc9d4;
        font-size:14px;
        margin-top:15px;
        .form-label{
            float: left;
            width:100px;
            line-height: 35px;
            font-weight: bold
        }
        .form-btn{
            float: left;
            width:80px;
            text-align: center;
            height: 35px;
            line-height: 35px;
            color:#bcc9d4;
            cursor: pointer;
            border:1px solid rgba(255,255,255,.2);
            border-radius: 0 5px 5px 0;
            &:first-of-type{
                border-right: none;  
                border-radius: 5px 0 0 5px;              
            }
            &.selected{
                border:none;
                background-color:#2d8cf0;
                color:#bcc9d4;
                border-radius: 5px 0 0 5px;
            }
        }
    }
    .publish-btn-box{
        width:100%;
        margin-top:15px;
        .btn{
            width:100px;
            text-align: center;
            height: 35px;
            line-height: 35px;
            color:#fff;
            cursor: pointer;
            background-color: #2d8cf0;
            border-radius:5px;
            margin:0 auto;
        }
    }
</style>