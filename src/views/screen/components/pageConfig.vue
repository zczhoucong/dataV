/**
 * @Author: 高春超
 * @description: 页面设置  需要新增初始化页面配置数据
 * @param {type} 
 * @return: 
 * @Date: 2019-03-08 13:34:39
 */
<template>
    <section class="base-page-set" v-show="show">
        <p class="base-title">页面设置</p>
        <Form :label-width="75" class="base-page-form">
            <FormItem label="屏幕大小">
                <Row>
                    <Col span="9">
                    <InputNumber v-model="baseSet.width"></InputNumber>
                    </Col>
                    <Col span="2">
                    <div style="color:#afafaf;">—</div>
                    </Col>
                    <Col span="9">
                    <InputNumber v-model="baseSet.height"></InputNumber>
                    </Col>
                </Row>
            </FormItem>
            <FormItem label="皮肤方案">
                <Select style="width:200px;" v-model="baseSet.skinId" @on-change="sltSkinTheme">
                    <Option v-for="item in skinThemes" :value="item.skinId" :key="item.skinId">
                        {{item.name}}
                    </Option>
                </Select>
            </FormItem>
            <FormItem label="背景图">
                <bg-image :backgroundImage="baseSet.backgroundImage" @getImage="upLoadBackImg"></bg-image>
            </FormItem>
            <FormItem label="背景颜色">
                <ColorPicker v-model="baseSet.color"/>
            </FormItem>
            <FormItem label="封面图">
                <Button ghost :loading="cut" @click.native="getScreenImg">截取封面</Button>
                <img class="screen-img" :style="'background-color:' +　baseSet.color" :src="screen" alt="">
            </FormItem>            
            <FormItem label="重置">
                <Button ghost @click.native="resetBG">恢复默认背景</Button>
            </FormItem>
        </Form>
    </section>
</template>
<script>

import html2canvas from 'html2canvas'
import bgImage from '../../../com/components/bgImage'

export default {
    components: {
        bgImage
    },
    props:{
        show:{type:Boolean,default:false},
        pgId:{type:String}
    },
    data(){
        return {
            skinThemes: this.$store.state.themeList,
            cut: false, // 截图状态
            screen: this.$store.state.screen,            
            baseSet: {
                width: this.$store.state.config.width,
                height: this.$store.state.config.height,
                backgroundImage: this.$store.state.config.backgroundImage,
                color: this.$store.state.config.color,                
                skinId: this.$store.state.config.skinId,    
            },
        }
    },
    watch: {
        baseSet:{
            handler(val){                              
                this.setConfigStore(val);
            },
            deep:true
        }
    },
    methods:{
        // 获取封面截图
        getScreenImg() {
            this.cut = true;            
            //生成页面截图
            var _this = this
            var canvasBox = document.querySelector('#dragView').getBoundingClientRect()
            // /[^\d|.]/g
            var scale = document.querySelector('#dragView').style.transform;
            var scaleNum = scale.replace(/[^\d|.]/g, '');
            var canvasWidth = canvasBox.width * scaleNum;
            var canvasHeight = canvasBox.height * scaleNum;
            this.$nextTick(() => {
                html2canvas(document.querySelector('#dragView'), {
                    width: canvasWidth,
                    height: canvasHeight,                   
                    useCORS: true
                }).then(function (canvas) {
                    var dataURL = canvas.toDataURL("image/png")
                    _this.screen = dataURL;
                    _this.setConfigStore('', dataURL)
                    _this.cut = false;
                }).catch(err => {
                    console.log(err)
                    _this.cut = false;
                });
            })
        }, 
        upLoadBackImg(data){
            this.baseSet.backgroundImage = data;
        },
        // 选中某个皮肤方案
        sltSkinTheme(idx){
            if (idx != undefined) {
                const theme = this.skinThemes.filter(i => i.skinId === idx);
                if (theme.length === 1) {
                    sessionStorage.setItem("skin", JSON.stringify(theme[0].color));                    
                }
            }
        }, 
        // 恢复背景默认设置
        resetBG(){            
            this.baseSet.backgroundImage = '';
            this.baseSet.color = '#0e2a43';            
        },
        // 设置页面的基本面板设置
        setConfigStore(config, screen){                
            this.$store.dispatch('setConfig', {config: config || '',screen: screen || '',pgId: this.pgId});
        },
    }
}
</script>
