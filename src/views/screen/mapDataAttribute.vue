<!--
    地图数据源组件 
    @sp
-->
<template>
    <!-- 底图编辑 -->
    <div class="layer-box" v-if="showMapConfig && currentLayer.length">
        <div class="layer-title">
            <span class="layer-back" @click="backToList">
                <Icon type="chevron-left" size="16" color="#85d4fb"></Icon>
                <span>返回</span>
            </span>
            <span> / 底图</span>
        </div>
        <div class="layer-content">
            <Collapse style="float: left;margin-top:1px;width:100%;" value="innerEvent">
                <Panel name="innerEvent">
                    <div class="collapse-title" style="display: inline-block">
                        <span>图层配置</span>
                        <Icon type="ios-help-outline" color="#85d4fb" size="16"></Icon>
                    </div>
                    <div slot="content" style="width:100%;">
                        <editor v-model="formatEditorforBaseLayer" lang="javascript" @init="editorInit"
                                theme="twilight" width="100%" height="500"></editor>
                        <div class="btn-box">
                            <Button :disabled="viewBtn" type="info" @click.native="updateEditer">保存设置</Button>
                        </div>
                    </div>
                </Panel>
            </Collapse>
        </div>
    </div>
    <!-- 其他图层编辑 -->
    <div class="layer-box" v-else-if="showMapConfig">
        <div class="layer-title">
            <span class="layer-back" @click="backToList">
                <Icon type="chevron-left" size="16" color="#85d4fb"></Icon>
                <span>返回</span>
            </span>
            <span> / {{currentLayer.Name}}</span>
        </div>
        <div class="layer-content">
            <Collapse style="float: left;margin-top:1px;width:100%;" value="innerEvent">
                <Panel name="innerEvent">
                    <div class="collapse-title" style="display: inline-block">
                        <span>图层配置</span>
                        <Icon type="ios-help-outline" color="#85d4fb" size="16"></Icon>
                    </div>
                    <div slot="content" style="width:100%;">
                        <div class="attr-table attr-data-box" >
                            <table style="width:100%;" v-if="currentLayer.Type=='VECTOR'">
                                <thead>
                                    <tr style="color:#999;" class="black">
                                        <th style="width:15%">字段</th>
                                        <th style="width:20%">映射</th>
                                        <th style="width:20%">说明</th>
                                        <th style="width:25%">状态</th>
                                    </tr>
                                </thead>
                                <tbody style="color:#fff;text-align: center">
                                    <tr class="attr-tr">
                                        <td>k</td>
                                        <td><input type="text" v-model="vectorRange.value" @change.lazy="getDataRange(vectorRange.value)" class="attr-ipt" placeholder="colmun"></td>
                                        <td>{{vectorRange.name}}</td>
                                        <td><span :class="vectorRange.status===0?'enityRed':'enity'"></span></td>
                                    </tr>
                                </tbody>
                            </table>
                            <div style="height: 90px;">
                                <p style="color:#999;margin:5px 0">数据源类型</p>
                                <Select v-model="currentDataSourceType" style="padding-bottom:5px;">
                                    <Option v-for="item in dataSourceTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                                <Input v-model="currentDataSourceUrl" placeholder="请输入地址" style="width: 260px;padding-bottom:10px;"></Input>
                                <Button type="info" style="margin-bottom:10px;" @click="loadSource">解析</Button>
                            </div>
                        </div>
                        
                        <editor v-model="formatEditorforOther" lang="javascript" @init="editorInit"
                                theme="twilight" width="100%" height="450"></editor>
                        <div class="btn-box">
                            <Button :disabled="viewBtn" type="info" @click.native="updateEditer">保存设置</Button>
                        </div>
                    </div>
                </Panel>
            </Collapse>
        </div>
    </div>
    <div style="width:100%" v-else>
        <Collapse style="float: left;margin-top:1px;width:100%;" value="layerMar">
            <Panel name="layerMar">
                <span class="collapse-title">图层管理</span>
                <div slot="content" style="padding-left:20px;">
                    <p>添加图层：</p>
                    <Select v-model="layerType" style="width:260px">
                        <Option v-for="item in layerTypes" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                    <br><br>
                    <Input v-model="layerName" placeholder="输入图层名" style="width: 260px"></Input>
                    <Button type="primary" shape="circle" icon="plus" @click="addLayer"></Button>
                </div>
                <br><br>
                <div slot="content" style="height:40px;line-height:40px;padding-left:20px;">图层列表</div>
                <ul slot="content">
                    <li class="layers-list" @click="showBaseLayerConfig(baseLayers)" >底图</li>
                    <li v-for="(item,index) in layers" @click="showLayerConfig(item,index)" class="layers-list">{{item.Name}} <Icon @click.stop="removeLayer(index)" size="18" color="red" type="ios-close" style="float: right;margin-right: 40px;line-height: 25px;"/></li>
                </ul>
            </Panel>
        </Collapse>
    </div>
</template>
<script>
    import editor from 'vue2-ace-editor'
    import axios from 'axios'
    export default {
        name: 'mapDataAttribute',
        components: {
            editor
        },
        data(){
            return {
                viewBtn:false,
                baseLayers:[],
                layers:[],
                showMapConfig:false,
                currentLayer:null,
                currentIndex:null,//为数字是layers，null是baseLayer
                layerTypes:[
                    {label:'请选择',value:''},
                    {label:'热力图',value:'heatMap'},
                    {label:'矢量图',value:'vector'}
                    //{label:'迁徙图',value:'migrate'}
                ],
                layerType:null,
                layerName:"",
                dataSourceTypeList:[{label:"wfs服务",value:"wfs"},{label:"json数据",value:"json"}],
                currentDataSourceType:null,
                currentDataSourceUrl:"",
                feas:null,
                vectorRange:{
                    value:"",
                    name:"类目",
                    status:0
                },
                tmpCols:[],
                range:{
                    max:0,
                    min:0
                }
            }
        },
        watch: {
            current(val){
                this.baseLayers = val.attributes.sourceData.value.baseLayer;
                this.layers = val.attributes.sourceData.value.layers;
            },
        },
        computed: {
            current: { //当前选中组件
                get(value) {
                    return this.$store.state.currentComponent[0]
                }
            },
            //格式化baseLayer
            formatEditorforBaseLayer:{
                get(){
                    let code = this.currentLayer;
                    code = JSON.stringify(code, null, 2);
                    return code;
                },
                set(value){
                    this.currentLayer = eval(value);
                }
            },
            //
            formatEditorforOther:{
                get(){
                    let code = this.currentLayer;
                    code = JSON.stringify(code, null, 2);
                    return code;
                },
                set(value){
                    this.currentLayer = eval("("+value+")");
                }
            },
        },
        mounted() {
            this.$nextTick(() => {
                this.baseLayers = this.current.attributes.sourceData.value.baseLayer;
                this.layers = this.current.attributes.sourceData.value.layers;
            })
        },
        methods: {
            // 编辑器初始化
            editorInit(){
                require('brace/theme/twilight')
                require('brace/mode/javascript');
            },
            showBaseLayerConfig(e){
                this.showMapConfig = true;
                this.currentLayer = e;
                this.currentIndex = null;
            },
            showLayerConfig(e,i){
                this.showMapConfig = true;
                this.currentLayer = e;
                this.currentIndex = i;
            },
            backToList(){
                this.showMapConfig = false;
                this.currentLayer = null;
            },
            updateEditer(){
                this.viewBtn = true;
                setTimeout(() => {
                    this.viewBtn = false;
                }, 500);
                if(this.currentIndex==null){//底图
                    this.baseLayers = this.currentLayer;
                }else{
                    this.layers[this.currentIndex] = this.currentLayer;
                }
                this.update();
            },
            update(tmpStyle){
                let content = {};
                content.baseLayer = this.baseLayers;
                content.layers = this.layers;

                let arr = JSON.parse(JSON.stringify(this.current.attributes));
                arr.sourceData.value = content;
                if(tmpStyle){
                    arr.sourceStyle.value.push(tmpStyle);//新增需要添加对应的样式
                }
                
                //更改当前组件数值
                this.$emit('update', Object.assign({
                    attr: arr
                }, {info: this.current.info}));
            },
            addLayer(){
                if(this.layerType=="heatMap"){
                    let tmp = {
                        "Name": this.layerName!=''?this.layerName:"热力图",
                        "Type":"HEATMAP",
                        "Url":"",
                        "Data":{
                            "type": "FeatureCollection",
                            "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
                            "features": [{ "type": "Feature", "properties": { "id": "ak16994521", "mag": 2.3, "time": 1507425650893, "felt": null, "tsunami": 0 }, "geometry": { "type": "Point", "coordinates": [ -151.5129, 63.1016, 0.0 ] } }                        ]
                        },
                        "Columns":["mag"]
                    }
                    let tmpStyle = {
                        name:this.layerName!=''?this.layerName:"热力图",
                        type: 'heatMap',
                        children:[{
                            name:'透明度',
                            key:'opacity',
                            type: 'number',
                            value:0.8
                        },{
                            name:'半径',
                            key:'radius',
                            type: 'number',
                            value:10
                        },{
                            name:'gradient0.4',
                            key:'gradient4',
                            type: 'color',
                            value:"green"
                        },{
                            name:'gradient0.5',
                            key:'gradient5',
                            type: 'color',
                            value:"yellow"
                        },{
                            name:'gradient0.8',
                            key:'gradient8',
                            type: 'color',
                            value:"orange"
                        },{
                            name:'gradient1.0',
                            key:'gradient10',
                            type: 'color',
                            value:"red"
                        }]
                    }
                    this.layers.push(tmp);
                    this.update(tmpStyle);
                    //清空input
                    this.layerName = '';
                    this.layerType = '';

                }else if (this.layerType=="vector"){
                    let tmp = {
                        "Name":"矢量图",
                        "Type":"VECTOR",
                        "Url":"../../../../static/data/vectordata.json",
                        "Data":"",
                        "Columns":["num"]
                    }

                    let tmpStyle = {
                        name:'矢量图',
                        type: 'vector',
                        children:[{
                            name:'透明度',
                            key:'opacity',
                            type: 'number',
                            value:0.8
                        },{
                            name:'颜色分级',
                            key:'stops',
                            type: 'color',
                            value:[
                                [1, "#5F4198"],
                                [2, "#3A204F"], 
                                [3, "#332679"], 
                                [4, "#5C656A"], 
                                [5, "#4A5595"], 
                                [6, "#683F8C"],
                                [7, "#45368D"],
                                [8, "#663E8A"], 
                                [9, "#6560AF"], 
                                [10, "#666068"], 
                                [11, "#420084"],
                            ]
                        }]
                    }
                    this.layers.push(tmp);
                    this.update(tmpStyle);
                    //清空input
                    this.layerName = '';
                    this.layerType = '';
                }else{
                    return;
                }
                
            },
            removeLayer(i){
                let content = {};
                content.baseLayer = this.baseLayers;
                content.layers = this.layers;
                content.layers.splice(i,1);

                let arr = JSON.parse(JSON.stringify(this.current.attributes));

                arr.sourceStyle.value.splice(i+1,1);
                
                //更改当前组件数值
                this.$emit('update', Object.assign({
                    attr: arr
                }, {info: this.current.info}));
            },
            loadSource(){
                debugger;
                var self = this;
                if(this.currentDataSourceType=="json"){
                    $.ajax({
                        type:"get",
                        url:this.currentDataSourceUrl,
                        async:false,
                        success:(o)=>{
                            self.getColmuns(o);
                        }
                    });
                    /*axios.get(this.currentDataSourceUrl, {params:null})
                        .then(response => {
                            debugger;
                            resolve(response);
                        }, err => {
                            debugger;
                            reject(err);
                        })
                        .catch((error) => {
                            debugger;
                            reject(error)
                        })*/
                   
                }else{
                    return;
                }
            },
            // getDefaultRange(col){
            //     this.vectorRange.k.value = col;
            //     this.vectorRange.k.status = 1;
            //     //this.getDataRange(col);
            // },
            getColmuns(data){
                this.currentLayer.Url = this.currentDataSourceUrl;
                this.currentLayer.Data = "";
                debugger;
                this.tmpCols=[];
                this.feas = data.features;
                for(let i in this.feas[0].properties){
                    if(this.isRealNum(this.feas[0].properties[i])){
                         this.tmpCols.push(i);
                    }
                }
                if(this.tmpCols.length>0){
                    this.currentLayer.Columns = [this.tmpCols[0]];
                    this.vectorRange.value = this.tmpCols[0];
                    this.vectorRange.status = 1;
                    this.getDataRange(this.tmpCols[0]);
                }else {
                    this.vectorRange.status = 0;
                }
                
            },
            getDataRange(type){
                //判断colmus里是否有type元素
                if(this.tmpCols.indexOf(type)<0) {
                    this.vectorRange.status = 0;
                    return;
                };
                if(this.vectorRange.value!=null&&this.vectorRange.value!=""){
                    var i = 0, min = 0,max = 0;
                    this.feas.forEach(function(value){
                        var tmp = value.properties[type];
                        if (i == 0) {
                            min = tmp;max = tmp;
                        }
                        if (tmp > max) {
                            max = tmp;
                        } else if (tmp < min) {
                            min = tmp;
                        }
                        i++;
                    });
                    this.vectorRange.status = 1;
                    this.range.max = max;
                    this.range.min = min;
                }
                let stops;
                let currentStyles = this.current.attributes.sourceStyle.value[this.currentIndex+1].children;
                for(let i = 0; i<currentStyles.length;i++){
                    if(currentStyles[i].key=="stops"){
                        stops = currentStyles[i].value;
                    }
                }
                //根据range设置stops的数值
                let tmp = (this.range.max - this.range.min)/stops.length;
                for(let i = 0;i<stops.length;i++){
                    stops[i][0] = parseFloat(this.range.min+tmp*i);
                }
            },
            isRealNum(val){
                if(val === "" || val ==null){
                    return false;
                }
                if(!isNaN(val)){
                    return true;
                }else{
                    return false;
                }
            }
            
        }
    }
</script>
<style scoped>
    .layers-list {
        height: 30px;
        line-height: 30px;
        width: 100%;
        padding-left: 20px;
        border-bottom: 1px solid #ddd;
        cursor: pointer;
    }

    .layer-box .ivu-collapse-content {
        padding: 5px 0 !important;
    }

    .layer-box {
        float: left;
        width: 100%;
    }
    .layer-title {
        font-size: 14px;
        padding: 0 20px 10px;
        
    }
    .layer-back {
        cursor: pointer;
        color: #aaa;
    }
    .attr-data-box .ivu-input{
        background-color: #333 !important;
        color: #fff;
        border: 1px solid rgba(255, 255, 255, .2);
    }
</style>