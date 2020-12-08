/**
 * @Author: 高春超
 * @description: 组件右侧菜单
 * @param {type} 
 * @return: 
 * @Date: 2019-03-15 09:29:26
 */
<template>
    <ul class="button-tip" :style="{left:`${x}px`,top:`${y}px`}" v-show="menuShow" @mouseleave="hideMenu" @mouseenter="showMenu">
        <li title="上移一层" @click.stop="upLevel">            
            <i class="align-icon icon-shangyiyiceng" style="font-size:18px;"></i>
            <span>上移一层</span>
        </li>
        <li title="下移一层" @click.stop="downLevel">            
            <i class="align-icon icon-xiayiyiceng" style="font-size:18px;"></i>
            下移一层
        </li>
        <li title="置顶" @click.stop="topLevel">
            <i class="align-icon icon-zhiding" style="font-size:18px;"></i>
            置顶
        </li>
        <li title="置底" @click.stop="bottomLevel">
            <i class="align-icon icon-zhidi" style="font-size:18px;"></i>
            置底
        </li>
        <Divider />
        <li title="复制" @click.stop="copyComs">
            <Icon type="ios-copy-outline" size=25></Icon>
            复制
        </li>
        <li title="删除" @click.stop="deleteComs">
            <Icon type="ios-trash-outline" size=25></Icon>
            删除
        </li>
    </ul>
</template>
<script>
import {getTemplate} from '@/com/template/index'
import guid from '@/utils/guid'
import mount from '@/com/mount';
import comAction from '@/mixins/comAction';
import menuAction from '@/mixins/menuAction';
import { setTimeout, clearTimeout } from 'timers';
import {deleteCom,saveCom} from '@/api/com'
export default {
    mixins: [ comAction,menuAction],
    props:{
        x:{
            type:Number,
            required:true
        },
        y:{
            type:Number,
            required:true
        },
        show:{
            type:Boolean,
            default:false
        }
    },
    data(){
        return{
            menuShow:false,
            timer:null,
            zIndex:0
        }
    },   
    watch:{
        show:{
            handler(val){
                this.menuShow=val;
            },
            immediate:true
        }
    },
    methods:{
        hideMenu(){
            this.timer=setTimeout(()=>{
                this.menuShow=false
                    this.$emit('hide')
                },300)
        },
        showMenu(){
            clearTimeout(this.timer)
        },
        copyComs(e){
            e.preventDefault();            
            this.current.forEach(x=>{
                this.copyComponent(x.info)
            })
        },
        copyComponent(info){            
            // 利用JSON.parse(Json.stringify())实现深拷贝
            const _info = JSON.parse(JSON.stringify(info));
            let current = this.components.find(x => x.info.id === _info.id);
            current = JSON.parse(JSON.stringify(current));                
            let newComponent = getTemplate(_info, current.attributes, current.slot, current.attributes | {}, current.events | {});
            newComponent.info.id = guid();   
            this.zIndex=this.getMaxIndex(); 
            this.zIndex++      
            newComponent.position = {
                offsetLeft: current.position.offsetLeft + 20,
                offsetTop: current.position.offsetTop + 20,
                zIndex: this.zIndex
            };

            const params= {
                attributes:newComponent.attributes,
                dataApi:newComponent.dataApi,
                info:newComponent.info,
                position:newComponent.position,
                active:newComponent.active,                    
                events:newComponent.events
            }
            saveCom({pageId:this.pgId,com_Id:newComponent.info.id ,com_value:JSON.stringify(params)}).then(resp=>{
                if(resp.resCode===0){
                    let components = JSON.parse(JSON.stringify(this.components));
                    components.push(newComponent);
                    this.components = components;
                    this.mountOne(newComponent);
                }
            })
        },
        //挂载当前组件
        mountOne(component){
            mount(component.info.id, component).then((vm) => {
                $(".com-border").attr('data-component-active', '');
                $(`#${component.info.id}`).attr('data-component-active', 'true');                   
            })
        },
        // 删除组件
        deleteComs(e){
            e.preventDefault();
            let tipText = "组件删除后无法恢复，是否确认删除？";
            if (this.current.length > 1) {
                tipText = "组件删除后无法恢复，是否确认删除？当前删除组件数：" + this.current.length;
            }
            this.$Modal.confirm({
                content: tipText,
                title:'警告',
                okText: '删除',
                onOk: async () => {
                    // 调用store删除组件方法，成功后对应删除components中的组件，并清空当前选中的组件集合
                    let list=[]                    
                    this.current.forEach(x=>{
                        list.push(`'${x.info.id}'`)                       
                    })

                    deleteCom({comId:list.join(',')}).then(resp=>{
                        if(resp.resCode===0){
                            this.$Message.success("删除组件成功！");
                            let components = JSON.parse(JSON.stringify(this.components));
                            let checkList = new Set(this.current);
                            this.current.forEach(x=>{
                                this.deleteCom(x.info.id);
                                 if(x.info.type==='mulTable'){                            
                                    const timer= sessionStorage.getItem(`mulTable${x.info.id}`)
                                    clearInterval(timer)
                                    sessionStorage.removeItem(`mulTable${x.info.id}`)
                                }
                            })
                            setTimeout(() => {
                                this.$store.commit('setCurrentCom', {
                                    currentComponent: []
                                });
                            })
                        }else{
                            this.$Message.error("删除组件失败！");
                        }
                    });                    
                }
            })
        },
         // 删除当前选中的组件集合
        async deleteCom(id){
            await this.$store.dispatch('delComponent', {
                id: id,
                pgId: this.pgId
            });
            $(`#${id}`).remove();
        },
    }
}
</script>
<style lang="less">

.button-tip {
    z-index: 999999;
    position: absolute;
    background: #27343e;
    padding: 0;
    margin-top: 0;
    width: 130px;    
    li {            
      width: 100%;
      line-height: 30px;
      font-size: 18px;
      color: #bcc9d4;          
      padding:5px 8px;
      margin:0;
      cursor: pointer;
      &:hover{
        color: #00c1de;
        background: #000;
        position: relative;
        &::before{
          content:'';
          height: 30px;
          width:5px;
          background: #00c1de;
          position: relative;
          display: block;
          padding-left:0;
          margin-left:0;
          float: left;
          margin-right:5px;
        }
      }
    }
  }
</style>
