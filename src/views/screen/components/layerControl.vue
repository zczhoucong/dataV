<!--图层控制-->
<!--高春超 2018年3月26日15:12:36-->
<style lang='less'>
  @import '../../../styles/layerControl.less';   
</style>
<template>
    <section class="layer-panel">
        <div class="layer-title">图层</div>
        <div class="layer-tools">
            <Button type="text" ghost class="layer-tool" :disabled="disabled" @click.native="upLevel">
                <Tooltip content="上移一层" placement="right">
                    <i class="align-icon icon-shangyiyiceng"></i>
                </Tooltip>
            </Button>
            <Button type="text" ghost class="layer-tool" :disabled="disabled" @click.native="downLevel">
                <Tooltip content="下移一层" placement="bottom">
                    <i class="align-icon icon-xiayiyiceng"></i>
                </Tooltip>
            </Button>
            <Button type="text" ghost class="layer-tool" :disabled="disabled" @click.native="topLevel">
                <Tooltip content="置顶" placement="bottom">
                    <i class="align-icon icon-zhiding"></i>
                </Tooltip>
            </Button>
            <Button type="text" ghost class="layer-tool" :disabled="disabled" @click.native="bottomLevel">
                <Tooltip content="置底" placement="bottom">
                    <i class="align-icon icon-zhidi"></i>
                </Tooltip>
            </Button>
        </div>
        <ul class="layer-slt-box">
            <draggable v-model="components" :options="{group:'group'}" @update="datadragEnd" >
                <li v-for="(layer,index) in sortComs" :class="checkStatus(layer)" :key="'layer_'+index" @click.stop @contextmenu="rightClickEvent">
                    <Tooltip trigger="hover" :content="layer.info.name" placement="right-start" :delay="1000">                        
                        <img :src="layer.info.bgImg" class="layer-img" @click="comClickEvent(layer)"/>
                        <p class="layer-text" @click="comClickEvent(layer)">{{layer.info.name}}</p>
                    </Tooltip>                    
                </li>                
            </draggable>
        </ul>
        <right-menu class="right-menu" @hide="tip.show=false" :x="tip.x" :y="tip.y" :show="tip.show"></right-menu>
        <div class="layer-bottom">
            <Button type="text" icon="ios-trash-outline" ghost :disabled="disabled"  @click.native="delCom">删除</Button>
        </div>        
    </section>
</template>
<script>
    import menu from '../screen'
    import draggable from 'vuedraggable'
    import modal from '@/mixins/modal';
    import comAction from '@/mixins/comAction';
    import menuAction from '@/mixins/menuAction';
    import rightMenu from './rightMenu.vue'
    import {deleteCom} from '@/api/com'
    export default {
        mixins: [ modal,comAction,menuAction ],
        components: {
            draggable,rightMenu
        },
        data(){
            return {
                disabled: true,
                cKey:false,
                sortComs: this.$store.state.components, // 排序后组件集
                tip:{
                    show:false,
                    x:0,
                    y:0
                }
            }
        },
        computed: {
            components: { //组件树 ，预览视图中所有组件
                get() {
                    return this.$store.state.components
                },
                set(components) {
                    this.$store.commit('setState', {
                        components: components,
                        pgId: this.pgId
                    })
                }
            },
            current: { //当前选中组件
                get() {
                    return this.$store.state.currentComponent
                }
            },
            checkList: { // 选中的组件集合
                get(){
                    let list = [];
                    this.$store.state.currentComponent.forEach(i => {
                        list.push(i.info.id);
                    });
                    return list;
                }
            }
        },
        watch: {
            checkList:{
                handler(val){
                    this.disabled = val.length === 0 ? true : false;                    
                },
                deep:true
            },
            components:{
                handler(val){
                    const list= JSON.parse(JSON.stringify(val))
                    this.sortComs=list.sort((a, b) => a.position.zIndex > b.position.zIndex ? -1 : 1);
                },
                deep:true
            }
        },
        mounted(){
            this.$nextTick(() => {                
                 $(window).keydown(e => {
                    if (e.ctrlKey || e.shiftKey) {
                        this.cKey = true;
                    }
                }).keyup(() => {
                    this.cKey = false;
                });
            })
        },
        methods: {
            rightClickEvent(parameter){
                parameter.preventDefault();                                             
                this.tip.x = parameter.clientX;
                this.tip.y = parameter.clientY-35;
                this.tip.show=true;
            },
            // 图层拖拽事件
            datadragEnd (evt) {
                const oldIndex=evt.oldIndex;
                const newIndex=evt.newIndex;
                if(oldIndex===newIndex) return  
                const oldCom=this.sortComs[oldIndex];
                const _oldCom=JSON.parse(JSON.stringify(oldCom));
                const _oldIndex=_oldCom.position.zIndex;
                const _newIndex=this.sortComs[newIndex].position.zIndex;   
                let rangeComs=[]  
                let ceil=1;        
                if(oldIndex<newIndex){ // 下移，自身li Index变大，但是组件的zIndex变小                    
                    rangeComs= this.sortComs.filter(x=>x.position.zIndex<_oldIndex&&x.position.zIndex>=_newIndex);
                    
                }else{ // 上移，自身li Index变小，但是组件的zIndex变大                   
                    rangeComs= this.sortComs.filter(x=>x.position.zIndex>_oldIndex&&x.position.zIndex<=_newIndex);
                    ceil=-1;
                }
                let _range= JSON.parse(JSON.stringify(rangeComs));
                    _range.forEach(i => {
                        this.updatePosition( {
                            info: i.info,
                            position: Object.assign(i.position, {zIndex: i.position.zIndex + ceil})
                        });                        
                    });
                this.updatePosition({
                    info: _oldCom.info,
                position: Object.assign(_oldCom.position, {zIndex:_newIndex })
                })
            },
            // 判断图层是否选中状态
            checkStatus(layer){
                const check = this.checkList.filter(i => {
                    return i === layer.info.id;
                });
                if (check.length === 0) {
                    return ''
                } else {
                    return 'active'
                }
            },
            // 组件点击事件
            comClickEvent(layer){
                 if (!this.cKey) { // 如果单选
                    this.$store.commit('setCurrentCom', {
                        currentComponent: [layer]
                    })
                 }else{
                     this.multiSlt(layer)
                 }
            },
            // 多选
            multiSlt(layer){
                let currentComponent = JSON.parse(JSON.stringify(this.$store.state.currentComponent));
                let _index = currentComponent.findIndex(component => component.info.id === layer.info.id);
                if (_index === -1) { // 选中
                    currentComponent.push(layer);
                } else { // 反选
                    currentComponent.splice(_index, 1);
                }
                this.$store.commit('setCurrentCom', {
                    currentComponent: currentComponent
                })
            },
            // 删除选中组件
            delCom(){
                if(this.checkList.length===0){
                    this.warning('尚未选中组件，请选择要删除的组件');
                    return;
                }
                let tipText = "组件删除后无法恢复，是否确认删除？";
                if (this.checkList.length > 1) {
                    tipText = "组件删除后无法恢复，是否确认删除？当前删除组件数：" + this.checkList.length;
                }
                this.confirm(tipText,async ()=>{
                    let list=[]                    
                    this.checkList.forEach(x=>{
                        list.push(`'${x}'`)                         
                    })                     
                    deleteCom({comId:list.join(',')}).then(resp=>{
                        if(resp.resCode===0){
                            this.$Message.success("删除组件成功！");
                            this.current.forEach(x=>{
                                if(x.info.type==='mulTable'){                            
                                    const timer= sessionStorage.getItem(`mulTable${x.info.id}`)
                                    clearInterval(timer)
                                    sessionStorage.removeItem(`mulTable${x.info.id}`)
                                }
                            })                            
                            let components = JSON.parse(JSON.stringify(this.components));
                            let checkList = new Set(this.checkList);
                            let difference = new Set(components.filter(x => !checkList.has(x.info.id))); //{1}
                            this.$store.commit('setState', {
                                components: [...difference],
                                pgId: this.pgId
                            });
                            this.checkList.forEach(id => {
                                $(`#${id}`).remove();
                            })
                            setTimeout(() => {
                                this.$store.commit('setCurrentCom', {
                                    currentComponent: []
                                });
                            })
                        }else{
                            this.$Message.error("删除组件失败！");
                        }
                    })                    
                })
            }
        }
    }
</script>
<style lang="less">
.right-menu{
    li{
        font-size:12px!important;
        height: 30px!important;
        line-height:25px!important;
        .align-icon{
            font-size:16px!important;
        }
        .ivu-icon{
            font-size:16px!important;
        }
        &:hover{
            background: #000!important;
            &::before{
                content:'';
                height: 20px!important;
            }
      }
    }
}
</style>
