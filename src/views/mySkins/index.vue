<!--
    作者：高春超
    时间:2018年6月21日14:05:18
    说明：我的皮肤
-->
<template>
    <section class="my-skin-content">
         <Spin size="large" fix v-if="spinShow"></Spin>
        <div class="my-skin-config">
            <p class="title">默认皮肤方案</p>
            <ul class="skins-list">
                <li v-for="(theme,index) in themes" :key="index">
                    <a :style="{backgroundColor: theme.backgroundColor}" :class="active===index?'active':''"
                       @click="sltTheme(index)">
                        <div class="theme-plan-color" v-for="color in theme.color" :style="{backgroundColor: color}" :key="color"></div>
                    </a>
                </li>
            </ul>
            <p class="title">
                皮肤基本配置                
                <a v-if="enableBtn" @click="saveConfig">保存配置</a>
                <a v-else @click="saveConfig" disabled>保存配置</a>
                <a @click="addColor">增加颜色</a>
                <a v-if="enableBtn" @click="setDefault">设为默认主题</a>
                <a v-else @click="setDefault" disabled>设为默认主题</a>
            </p>            
            <Form class="skin-detail"  :label-width="80">
                <FormItem label="名称">
                    <Input style="width:250px;" v-model="curTheme.name"/>
                </FormItem>
                <FormItem label="页面背景">
                    <Input style="width:250px;float: left;" v-model="curTheme.backgroundColor"/>
                    <ColorPicker v-model="curTheme.backgroundColor" recommend alpha class="simple-color-picker"/>
                    <br/>
                    <p style="color:#888">友情提示：使用深色系列效果更佳</p>
                </FormItem>
                <FormItem label="主题">
                    <ul>
                        <li class="detail-color" v-for="(item,index) in curTheme.color" :key="index">
                            <Input style="width:150px;float: left;" v-model="curTheme.color[index]"/>                                                            
                            <ColorPicker v-model="curTheme.color[index]" recommend alpha class="simple-color-picker"/>                                                                                 
                            <Icon type="md-remove-circle" title="减少" class="minus-icon" @click.native="delColor(index)"/>
                        </li>
                    </ul>
                </FormItem>
            </Form>
        </div>
        <div class="my-skin-preview" :style="{backgroundColor:curTheme.backgroundColor}">
            <div class="skin-preview-title">示例预览</div>
            <preview class="skin-preview-content" :curTheme="curTheme" :curKey="curKey"></preview>
        </div>
    </section>
</template>
<script>
    import preview from './preview.vue'
    import {modifySkin,getSkinList,defaultSkin} from '@/api/skin'
    export default{
        components: {preview},
        data(){
            return {
                spinShow:true,
                enableBtn:true,
                active: 0,
                themes: [],
                curTheme: {
                    skinId: "",
                    name: "vintage",
                    backgroundColor: "rgba(254,248,239,1)",
                    color: ["#d87c7c", "#919e8b", "#d7ab82", "#6e7074", "#61a0a8", "#efa18d", "#787464", "#cc7e63", "#724e58","#4b565b"],
                    border: "#ccc"
                },
                curKey: new Date().toTimeString(),                
            }
        },
        watch: {
            curTheme: {
                handler(){
                    this.curKey = new Date().toTimeString()
                },
                deep: true
            }
        },
        created(){
            this.initThemeList();
        },
        methods: {
            initThemeList(){
                getSkinList().then(resp=>{
                    this.spinShow=false;
                    if(resp.resCode===0){
                        this.themes= resp.data.map(x=>{                            
                            x.color=JSON.parse(x.color);
                            return x;
                        })                        
                        let index= this.themes.findIndex(x=>x.isdefault===1)
                        if(index<0) index=0
                        this.sltTheme(index)
                    }                  
                }).catch(()=>{
                     this.spinShow=false;
                })
            },
            sltTheme(index){
                this.active = index;
                this.curTheme = JSON.parse(JSON.stringify(this.themes[this.active]));
                this.curKey = new Date().toTimeString()
            },
            // 添加主题颜色
            addColor(){
                //新增时先新增当前主题对应的默认主题颜色，如果超出，则随机取颜色，主题长度不能超过15                               
                const len = this.curTheme.color.length;
                if(len>=14){
                    this.warnTips("主题颜色最多设置14种颜色",'warning')
                    return;
                }
                const _theme = this.themes[this.active];
                const curList= new Set(this.curTheme.color)    
                const initList=new Set(_theme.color)
                const differArr=[...new Set([...initList].filter(x => !curList.has(x)))]
                if(differArr.length>0){
                     this.curTheme.color.push(differArr[0]);
                }else{
                    this.curTheme.color.push(this.getRandomColor());
                }
            },
             // 获取随机颜色
            getRandomColor() {
                const rand = Math.floor(Math.random( ) * 0xFFFFFF).toString(16);
                if(rand.length == 6){
                    return `#${rand}`;
                }else{
                    return this.getRandomColor();
                }
            },
            // 删除主题颜色
            delColor(index){
                if (this.curTheme.color.length === 6) {
                    this.warnTips("主题颜色至少设置6种颜色",'warning')
                    return;
                }
                this.curTheme.color.splice(index,1)
                this.curKey = new Date().toTimeString()
            },
            // 保存配置
            saveConfig(){
                this.enableBtn=false
                modifySkin({
                    skinId: this.curTheme.skinId,
                    theme: JSON.stringify(this.curTheme.color),
                    background: this.curTheme.backgroundColor,
                    title: this.curTheme.name,
                }).then(resp => {
                    if (resp.resCode === 0) {
                        this.$Message.success("保存配置方案成功");
                        Object.assign(this.themes[this.active], this.curTheme);
                    } else {
                        this.$Message.success("保存配置方案失败");
                    }
                    setTimeout(() => {
                        this.enableBtn=true
                    }, 2000);
                }).catch(()=>{                    
                    setTimeout(() => {
                        this.enableBtn=true
                    }, 2000);
                })
            },
            // 设置默认主题
            setDefault(){
                this.enableBtn=false
                defaultSkin({skinId:this.curTheme.skinId}).then(resp=>{                    
                    if(resp.resCode===0){
                        this.$Message.success("设置默认主题成功")
                    }else{
                        this.$Message.error("设置默认主题失败")
                    }
                    setTimeout(() => {
                        this.enableBtn=true
                    }, 2000);
                }).catch(()=>{                    
                    setTimeout(() => {
                        this.enableBtn=true
                    }, 2000);
                     this.$Message.error("设置默认主题失败")
                })

            },
            warnTips(message,type){
                if(this.warnTip){
                    return
                }else{
                    this.warnTip= this.$Message[type]({
                        content:message,
                        onClose:()=>this.warnTip=null
                    });
                }
            }
        }
    }
</script>
<style type="text/less" lang="less">
    .my-skin-content {
        width: 100%;
        height: 100%;
        background-color: rgba(34, 48, 84, 0.8);
        position: relative;
        .my-skin-config {
            float: left;
            height: 100%;
            width: 500px;
            border-right: 1px solid #dddddd;
            padding: 5px;
            overflow: auto;
            .title {
                font-size: 16px;
                height: 35px;
                background-color: rgba(9, 20, 56, 0.6);
                line-height: 35px;
                padding-left: 10px;
                float: left;
                width: 100%;
                color:#BCC9D4;
                a{
                    float: right;margin-right:15px;font-size:14px;
                }
            }
            .skin-detail {
                float: left;                
                margin-top: 10px;
                .detail-color {
                    margin-bottom: 8px;
                    float:left;
                    margin-right:15px;   
                    .minus-icon{
                        font-size:18px;
                        color:#fff;
                        margin-left:5px;
                        cursor: pointer;
                    }                 
                }
            }
            .skins-list {
                float: left;
                width: 100%;
                margin-bottom: 8px;
                li {
                    width: calc(~"50% - 5px");
                    float: left;
                    margin-top: 8px;
                    margin-left: 5px;
                    a {
                        width: 100%;
                        border: 1px solid #eee;
                        border-radius: 5px;
                        height: 32px;
                        padding: 5px;
                        overflow: hidden;
                        display: -webkit-flex;
                        display: flex;
                        -webkit-flex-wrap: wrap;
                        flex-wrap: wrap;
                        -webkit-justify-content: space-between;
                        justify-content: space-between;
                        &.active {
                            border: 1px solid #f5a623;
                            box-shadow: 1px 1px 2px #f5a623,-1px -1px 2px #f5a623;
                        }
                        .theme-plan-color {
                            width: 20px;
                            height: 20px;
                            margin-bottom: 10px;
                            margin-left: 2px;
                            margin-right: 2px;
                            display: inline-block;
                            border-radius: 3px
                        }
                    }
                }
            }
        }
        .my-skin-preview {
            float: left;
            height: 100%;
            width: calc(~"100% - 500px");
            padding: 10px;
            overflow: auto;
            .skin-preview-title {
                color: #fff;
                font-size: 16px;
                float: left;
                height: 32px;
            }
            .skin-preview-content {
                float: left;
                width: 100%;
                height: calc(~"100% - 32px");
            }
        }
    }

    .simple-color-picker {
        float: left;
        margin-left: -30px;
        .ivu-color-picker-rel {
            i {
                display: none;
            }
            .ivu-color-picker-input {
                height: 20px;
                border: none;
                padding: 0;
                cursor: pointer;
            }
        }
    }
</style>