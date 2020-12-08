<!--
    图层样式设置组件
    @sp
-->
<template>
    <section v-if="currentLayer.type=='baseLayer'">
        <div v-for="(child,index) in currentLayer.children">
            <FormItem :label="child.name" v-if="child.type=='number'">
                <InputNumber :max="4000" :min="1000" v-if="child.key=='width'" v-model.number="child.value" @on-change="changeVal"></InputNumber>
                <InputNumber :max="2000" :min="500" v-else-if="child.key=='height'" v-model.number="child.value" @on-change="changeVal"></InputNumber>
                <InputNumber :max="18" :min="1" v-else-if="child.key=='zoom'" v-model.number="child.value" @on-change="changeVal"></InputNumber>
            </FormItem>
            <FormItem :label="child.name" v-else-if="child.type=='text'">
                <Input v-model="child.value"  placeholder="114,30" @on-change="changeVal"></Input>
            </FormItem>
        </div>
    </section>
    <section v-else-if="currentLayer.type=='heatMap'">
        <div v-for="(child,index) in currentLayer.children">
            <FormItem :label="child.name" v-if="child.type=='color'"><!-- 颜色梯度 -->
                <InputNumber v-model.number="child.key" :max="1" :min="0.1" :step="0.1"  @on-change="changeVal"></InputNumber>
                <ColorPicker v-model="child.value" alpha @on-change="changeVal" />
            </FormItem>
            <FormItem :label="child.name" v-else-if="child.type=='number'">
                <InputNumber :max="1" :min="0.1" v-if="child.key=='opacity'" :step="0.1" v-model.number="child.value" @on-change="changeVal"></InputNumber>
                <InputNumber :max="50" :min="1" v-else-if="child.key=='radius'" v-model.number="child.value" @on-change="changeVal"></InputNumber>
            </FormItem>
        </div>
        <div>
            <FormItem label="颜色梯度增减">
                <Button type="success" shape="circle" icon="plus" @click="addGradientColor"></Button>
                <Button type="error" shape="circle" icon="minus" style="margin-left:20px;" @click="removeGradientColor"></Button>
            </FormItem>
        </div>
    </section>
    <section v-else-if="currentLayer.type=='vector'">
     
        <FormItem label="色带选择：">
            <Select size="small" style="width:100px;"  @on-change="changeColourBar($event)">
                <Option value="red" style="background:red;">红色</Option>
                <Option value="orange" style="background:orange;">橙色</Option>
                <Option value="yellow" style="background:yellow;">黄色</Option>
                <Option value="green" style="background:green;">绿色</Option>
                <Option value="blue" style="background:blue;">蓝色</Option>
                <Option value="purple" style="background:purple;">紫色</Option>
            </Select> 
            <Button shape="circle" icon="" :style="{background:currentColorBar}" style="height: 30px"></Button>
        </FormItem>
        <div v-for="(child,index) in currentLayer.children">
            <FormItem :label="child.name" v-if="child.type=='number'">
                <InputNumber :max="1" :min="0.1" v-if="child.key=='opacity'" :step="0.1" v-model.number="child.value" @on-change="changeVal"></InputNumber>
            </FormItem>
            <div v-for="(item,index) in child.value" v-else-if="child.type='color'">
                <FormItem :label="child.name"><!-- 颜色梯度 -->
                    <InputNumber v-model.number="item[0]"  :min="0"  @on-change="changeVal"></InputNumber>
                    <ColorPicker v-model="item[1]" alpha @on-change="changeVal" />
                </FormItem>
            </div>
        </div>
        <div>
            <FormItem label="颜色分级增减">
                <Button type="success" shape="circle" icon="plus" @click="addStopsColor"></Button>
                <Button type="error" shape="circle" icon="minus" style="margin-left:20px;" @click="removeStopsColor"></Button>
            </FormItem>
        </div>
    </section>
</template>
<script>
    import mount from '../../com/mount';
    export default {
        name: 'mapSubAttribute',
        data(){
            return {
                currentLayer:null,
                currentIndex:null,
                currentColorBar:'white',//当前色带
                barRed:['rgba(255,200,200,1)','rgba(255,180,180,1)','rgba(255,160,160,1)','rgba(255,140,140,1)','rgba(255,120,120,1)','rgba(255,100,100,1)','rgba(255,80,80,1)','rgba(255,60,60,1)','rgba(255,40,40,1)','rgba(255,20,20,1)','rgba(255,0,0,1)'],
                barOrange:['rgba(255,220,155,1)','rgba(255,223,135,1)','rgba(255,220,120,1)','rgba(255,215,105,1)','rgba(255,210,90,1)','rgba(255,205,75,1)','rgba(255,200,60,1)','rgba(255,195,45,1)','rgba(255,180,30,1)','rgba(255,175,15,1)','rgba(255,165,0,1)'],
                barYellow:['rgba(255,255,180,1)','rgba(255,255,155,1)','rgba(255,255,130,1)','rgba(255,255,115,1)','rgba(255,255,90,1)','rgba(255,255,75,1)','rgba(255,255,60,1)','rgba(255,255,45,1)','rgba(255,255,30,1)','rgba(255,255,15,1)','rgba(255,255,0,1)'],
                barGreen:['rgba(100,160,100,1)','rgba(90,160,90,1)','rgba(80,160,80,1)','rgba(70,160,70,1)','rgba(60,160,60,1)','rgba(50,160,50,1)','rgba(40,160,40,1)','rgba(30,160,30,1)','rgba(20,160,20,1)','rgba(10,160,10,1)','rgba(0,160,0,1)'],
                barBlue:['rgba(140,140,255,1)','rgba(135,135,255,1)','rgba(120,120,255,1)','rgba(105,105,255,1)','rgba(90,90,255,1)','rgba(75,75,255,1)','rgba(60,60,255,1)','rgba(45,45,255,1)','rgba(30,30,255,1)','rgba(15,15,255,1)','rgba(0,0,255,1)'],
                barPurple:['rgba(128,100,128,1)','rgba(128,90,128,1)','rgba(128,80,128,1)','rgba(128,70,128,1)','rgba(128,60,128,1)','rgba(128,50,128,1)','rgba(128,40,128,1)','rgba(128,30,128,1)','rgba(128,20,128,1)','rgba(128,10,128,1)','rgba(128,0,128,1)']
            }
        },
        computed: {
            current: { //当前选中组件
                get(value) {
                    return this.$store.state.currentComponent[0]
                }
            }
        },
        created(){
            this.currentLayer = this.$parent.$parent.currentLayer;
            this.currentIndex = this.$parent.$parent.currentIndex;
        },
        methods: {
            update(attribute){
                this.$emit('update', attribute);
            },
            changeVal(){
                let arr = JSON.parse(JSON.stringify(this.current.attributes));
                arr.sourceStyle.value[this.currentIndex] = this.currentLayer;
                //更改当前组件数值
                this.update(Object.assign({attr: arr}, {info: this.current.info}));
            },
            addGradientColor(){
                this.currentLayer.children.push({
                    name:'颜色梯度',
                    key:'0.5',
                    type: 'color',
                    value:"orange"
                });
                this.changeVal();
            },
            removeGradientColor(){
                for(let i=this.currentLayer.children.length-1;i>0;i--){
                    if(this.currentLayer.children[i].name="颜色梯度"&&this.currentLayer.children[i].type=="color"){
                        this.currentLayer.children.splice(i,1);
                        this.changeVal();
                        return;
                    }
                }
            },
            addStopsColor(){
                for(let i = 0;i<this.currentLayer.children.length;i++){
                    if(this.currentLayer.children[i].key=="stops"){
                        if(this.currentLayer.children[i].value.length>=11){
                            this.$Notice.warning({
                                title:'警告',
                                desc:'超过最大色卡数！！！',
                                top: 50,
                                duration: 3
                            });
                            return;
                        }
                        this.currentLayer.children[i].value.push([5, "#FACE9C"])
                    }
                }
                this.changeVal();
            },
            removeStopsColor(){
                for(let i = 0;i<this.currentLayer.children.length;i++){
                    if(this.currentLayer.children[i].key=="stops"){
                        this.currentLayer.children[i].value.splice(this.currentLayer.children[i].value.length-1,1);
                    }
                }
                this.changeVal();
            },
            changeColourBar(e){
                this.currentColorBar = e;
                let tmp = null;
                if(e=="red"){
                    tmp = this.barRed;
                }else if(e=="orange"){
                    tmp = this.barOrange; 
                }else if(e=="yellow"){
                    tmp = this.barYellow; 
                }else if(e=="green"){
                    tmp = this.barGreen;
                }else if(e=="blue"){
                    tmp = this.barBlue;
                }else if(e=="purple"){
                    tmp = this.barPurple;
                }
                for(let i = 0;i<this.currentLayer.children.length;i++){
                    if(this.currentLayer.children[i].key=="stops"){
                        for(let j=0;j<this.currentLayer.children[i].value.length;j++){
                            this.currentLayer.children[i].value[j][1] = tmp[j];
                        }
                    }
                }
                setTimeout(()=>{
                    this.changeVal();
                },10);
            }
        }
    }
</script>
<style lang="">
    
</style>