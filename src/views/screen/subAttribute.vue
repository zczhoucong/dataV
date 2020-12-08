<!--
    说明：根据输入框类型返回不同类型的输入框
    作者：高春超
    时间：2018年3月14日14:43:47
-->
<template>
    <section>
        <ColorPicker v-model="xval" v-if="xtype==='color'" alpha @on-change="changeColor"/>
        <Input v-model="xval" v-if="xtype==='text'"  placeholder="请输入" @on-blur="changeIpt"/>
        <InputNumber v-model="xval" v-if="xtype==='textNumber'"  placeholder="请输入" @on-blur="changeIptNumber"></InputNumber>
        <Select v-model="xval" v-if="xtype==='selection'" @on-change="changeSlt">
            <Option v-for="item in items" :value="item" :key="item">{{ toZh(item) }}</Option>
        </Select>
        <RadioGroup v-model="xval" v-if="xtype==='radio'" @on-change="changeRadio">
            <Radio v-for="item in items" :key="item" :label="item"></Radio>
        </RadioGroup>
        <Slider v-model="xval" show-input v-if="xtype==='number'" @on-change="changeSlider"></Slider>
        <i-switch v-model="xval" v-if="xtype==='switch'" @on-change="changeIptNumber"></i-switch>
        <bg-image v-if="xtype==='upLoad'" type="drag" :backgroundImage="xval" @getImage="fileUpload"></bg-image>
        <div class="color-list" v-if="xtype==='barColor'">
            <Select v-model="colorType" @on-change="changeColorType">
                <Option v-for="item in colorSelect" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <div class="color-box">
                <Form :label-width="80" v-if="colorType==='full'">
                    <FormItem label="填充颜色">
                        <ColorPicker v-model="defColor" alpha @on-change="changeColor"/>
                    </FormItem>
                </Form>
                <x-gradient :top="linear.top" :down="linear.down" :rotate="linear.rotate" @on-change="changeGradient"
                            v-else></x-gradient>
            </div>
        </div>
        <div class="line-series" v-if="xtype==='lineSeries'">
            <div class="line-series-box" v-for="(line,index) in lineSeries" :key="'line_'+index">
                <p class="line-series-name" style="font-weight: bold;">系列{{index+1}}设置</p>
                <Form :label-width="100">
                    <FormItem label="系列名">
                        <Input v-model="line.name"/>
                    </FormItem>
                </Form>
                <p class="line-series-name">折线</p>
                <Form :label-width="100">
                    <FormItem label="线条颜色">
                        <ColorPicker v-model="line.color" alpha/>
                    </FormItem>
                    <FormItem label="线条类型">
                        <Select v-model="line.type">
                            <Option v-for="item in lineType" :value="item.value" :key="item.value">{{ item.label }}
                            </Option>
                        </Select>
                    </FormItem>
                    <FormItem label="线条粗细">
                        <InputNumber v-model="line.width"></InputNumber>
                    </FormItem>
                    <FormItem label="平滑曲线">
                        <i-switch v-model="line.smooth"></i-switch>
                    </FormItem>
                </Form>
                <p class="line-series-name">标记</p>
                <Form :label-width="100">
                    <FormItem label="显示">
                        <i-switch v-model="line.showSymbol"></i-switch>
                    </FormItem>
                    <FormItem label="类型">
                        <Select v-model="line.symbolType">
                            <Option v-for="item in symbolTypes" :value="item" :key="item">{{ item }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="大小">
                        <InputNumber v-model="line.symbolSize"></InputNumber>
                    </FormItem>
                </Form>
                <p class="line-series-name">区域</p>
                <Form :label-width="100">
                    <FormItem label="显示">
                        <i-switch v-model="line.areaStyle.opacity"></i-switch>
                    </FormItem>
                    <FormItem label="颜色">
                        <ColorPicker v-model="line.areaStyle.color" alpha/>
                    </FormItem>
                </Form>
            </div>
        </div>
        <!-- 简单列表 -->
        <div class="line-series" v-if="xtype==='tableseries'">
              <div class="line-series-box" v-for='(item,index) in tableList' :key="'tabline_'+index">
                     <p class="line-series-name">{{item.name}}</p>
                     <FormItem label="颜色">
                        <ColorPicker v-model="item.color" alpha/>
                    </FormItem>
                    <FormItem label="宽度占比">
                        <Slider v-model="item.ratio" show-input  ></Slider>
                    </FormItem>
                    <FormItem label="字号">
                        <InputNumber v-model="item.size"></InputNumber>
                    </FormItem>
                    <FormItem label="字体">
                        <Select v-model="item.fontFamily">
                            <Option v-for="oneitem in familys" :value="oneitem" :key="oneitem">{{ oneitem }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="字体粗细">
                        <Select v-model="item.weight">
                            <Option v-for="oneitem in weights" :value="oneitem" :key="oneitem">{{ oneitem }}</Option>
                        </Select>
                    </FormItem>
              </div>
        </div>
        <!-- 列表列控制 -->
        <div class="line-series" v-if="xtype==='listColum'">
              <div class="line-series-box" v-for='(item,index) in columList' :key="'lcol_'+index">
                     <p class="line-series-name">{{'系列'+(index+1)}}</p>
                     <FormItem label="颜色">
                        <ColorPicker v-model="item.color" alpha/>
                    </FormItem>
                    <FormItem label="宽度占比">
                        <Slider v-model.trim="item.widthorder" show-input :max='100' :min='0' ></Slider>
                        <!-- <InputNumber v-model="item.widthorder"></InputNumber> -->
                    </FormItem>
                    <FormItem label="字号">
                        <InputNumber v-model="item.fontSize"></InputNumber>
                    </FormItem>
                    <FormItem label="字体">
                        <Select v-model="item.fontFamily">
                            <Option v-for="oneitem in familys" :value="oneitem" :key="oneitem">{{ oneitem }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="字体粗细">
                        <Select v-model="item.weight">
                            <Option v-for="oneitem in weights" :value="oneitem" :key="oneitem">{{ oneitem }}</Option>
                        </Select>
                    </FormItem>
              </div>
        </div>
        <div class="line-series" v-if="xtype==='pieSeries'">         
            <div class="line-series-box" v-for="(pie,index) in pieSeries" :key="index">
                <Form :label-width="80">
                    <FormItem :label="'系列'+(index+1)">
                        <Select v-model="pie.type" @on-change="rePieColor(index)">
                            <Option v-for="item in colorSelect" :value="item.value" :key="item.value">{{ item.label }}
                            </Option>
                        </Select>
                    </FormItem>
                </Form>
                <div class="color-box">
                    <Form :label-width="80" v-if="pie.type==='full'">
                        <FormItem label="填充颜色">
                            <ColorPicker v-model="pie.color" alpha/>
                        </FormItem>
                    </Form>
                    <x-gradient :top="pie.color[0]" :down="pie.color[1]" :rotate="pie.color[2]" :idx="index"
                                @on-change="changePieColor"
                                v-else></x-gradient>
                </div>
            </div>
        </div>
        <div class="line-series" v-if="xtype==='barSeries'">
            <div class="line-series-box" v-for="(pie,index) in pieSeries" :key="'pie_'+index">
                <p class="line-series-name" style="font-weight: bold;">系列{{index+1}}设置</p>
                <Form :label-width="80">
                    <FormItem label="系列名">
                        <Input v-model="pie.name"/>
                    </FormItem>
                    <FormItem label="颜色选择">
                        <Select v-model="pie.type" @on-change="rePieColor(index)">
                            <Option v-for="item in colorSelect" :value="item.value" :key="item.value">{{ item.label }}
                            </Option>
                        </Select>
                    </FormItem>
                </Form>
                <div class="color-box">
                    <Form :label-width="80" v-if="pie.type==='full'">
                        <FormItem label="填充颜色">
                            <ColorPicker v-model="pie.color" alpha/>
                        </FormItem>
                    </Form>
                    <x-gradient :top="pie.color[0]" :down="pie.color[1]" :rotate="pie.color[2]" :idx="index"
                                @on-change="changePieColor"
                                v-else></x-gradient>
                </div>
            </div>
        </div>
        <div class="line-series" v-if="xtype==='bubbleListColor'">
             <div class="line-series-box" v-for='(item,index) in bubbleListColor' :key="'bubble_'+index">
                     <p class="line-series-name">{{'系列'+(index+1)}}</p>
                     <FormItem label="颜色">
                        <ColorPicker v-model="item.color" alpha/>
                    </FormItem>
                    <FormItem label="描边">
                        <ColorPicker v-model="item.bordercolor" alpha/>
                    </FormItem>
             </div>
        </div>
        <div class="line-series" v-if="xtype==='radarSeries'">
            <div class="line-series-box" v-for="(radar,index) in lineSeries" :key="'radar_'+index">
                <p class="line-series-name" style="font-weight: bold;">系列{{index+1}}设置</p>
                <Form :label-width="100">
                    <FormItem label="系列名">
                        <Input v-model="radar.name"/>
                    </FormItem>
                    <FormItem label="描边颜色">
                        <ColorPicker v-model="radar.lineColor" alpha/>
                    </FormItem>
                    <FormItem label="描边粗细">
                        <Slider v-model="radar.width" show-input :max="10"></Slider>
                    </FormItem>
                    <FormItem label="填充颜色">
                        <ColorPicker v-model="radar.areaColor" alpha/>
                    </FormItem>
                </Form>
            </div>
        </div>
        <div class="line-series" v-if="xtype==='ringMultiSeries'">
            <div class="line-series-box" v-for="(series,index) in ringMultiSeries" :key="'ring_'+index">
                <p class="line-series-name" style="font-weight: bold;">系列{{series.name}}设置</p>
                <Form :label-width="100">
                    <FormItem label="环形颜色">
                        <ColorPicker v-model="series.color" alpha/>
                    </FormItem>
                    <FormItem label="环形宽度">
                        <InputNumber v-model="series.borderWidth"></InputNumber>
                    </FormItem>
                    <FormItem label="环形大小">
                        <Slider v-model="series.radius" show-input></Slider>
                    </FormItem>
                </Form>
            </div>
        </div>
    </section>
</template>
<script>
    import lang from '@/com/template/lang'
    import xGradient from '@/com/components/xGradient'
    import bgImage from '@/com/components/bgImage'
    import {getTheme,hexToRgba} from '@/utils/assist'
    export default{
        name: 'subAttribute',
        components: {xGradient, bgImage},
        props: ['data'],
        data(){
            return {
                xtype: '', // 组件类型 text | color | selection | number ,默认为文本
                xval: '',
                colorList: ['#65F5F3', '#277ACE', '#8922E8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
                attr: {},
                items: [],
                defColor: '#3398DB',
                colorType: 'full',
                colorSelect: [{
                    value: 'full',
                    label: '颜色填充'
                }, {
                    value: 'linear',
                    label: '渐变填充'
                }],
                linear: {
                    top: '#fff',
                    down: '#00c1de',
                    rotate: 90
                },
                tableList:[],//简单列表数据
                columList:[],//列表的列数据
                bubbleListColor:[],//气泡图系列数据
                lineSeries: [],    // 折线图数据系列
                radarSeries: [], // 雷达图数据系列
                pieSeries: [], // 饼状图数据系列
                ringMultiSeries: [], // 饼状图数据系列
                pieSeriesData: [],
                seriesName: [], // 气泡图系列数
                bubbleColor: [], // 气泡图数据颜色
                bubbleBorderColor: [], // 气泡图边框颜色
                lineType: [{
                    value: 'solid',
                    label: '实线'
                }, {
                    value: 'dashed',
                    label: '虚线'
                }],
                symbolTypes: ['emptyCircle', 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'],
                familys :['Microsoft Yahei', 'AgencyFBBold', 'DS-Digital', 'SimSun', 'SimHei', 'LiSu', 'YouYuan', 'tahoma', 'arial', 'sans-serif'],
                weights : ['normal', 'bold', 'bolder', 'lighter'],
            }
        },
        computed: {
            current: { //当前选中组件
                get(value) {
                    return this.$store.state.currentComponent[0]
                }
            }
        },
        watch: {
            current(val, old){                    
                this.attr = JSON.parse(JSON.stringify(val.attributes));
                const key = this.data.key;
                this.key = key;
                this.xtype = this.attr[key].type;
                this.items = this.attr[key].items;
                this.xval = this.attr[key].value;
                
                if (this.xtype === 'textNumber' && this.xval === undefined) {
                    this.xval = null;
                }
                this.defColor = this.xval;
                if (this.xtype==='listColum'||this.xtype === "lineSeries" || this.xtype === "pieSeries" || this.xtype === "radarSeries" || this.xtype === "barSeries" || this.xtype === "bubbleListColor" || this.xtype==="ringMultiSeries") {
                    const newData = JSON.stringify(val.attributes.staticData.value);
                    const oldData = JSON.stringify(old.attributes.staticData.value);
                    if (this.xtype === "lineSeries" && newData != oldData) {
                        this.dataLineBasic();
                    }
                    if(this.xtype==='listColum' && newData != oldData){
                       this.initColumList()
                    }
                    if (this.xtype === "pieSeries" && newData != oldData) {
                        this.dataPieBasic();
                    }
                    if (this.xtype === "radarSeries" && newData != oldData) {
                        this.dataRadarBasic();
                    }
                    if (this.xtype === "barSeries" && newData != oldData) {
                        this.dataBarBasic();
                    }
                    if (this.xtype === "bubbleListColor" && newData != oldData) {
                        this.initBubbleSpecial();
                    }
                    if (this.xtype === "ringMultiSeries" && newData != oldData) {                        
                        this.initRingMultiSeries();
                    }
                }
            },
            pieSeries: {
                handler: function (val,old) {
                    if(old.length===0) return                    
                    if (this.xtype === "barSeries") {
                        this.simpleBarData(val);
                    } else if (this.xtype === "bubbleSeries") {
                        this.simpleBubbleData(val);
                    } else {
                        this.simplePieData(val);
                    }
                },
                deep: true
            },
            columList:{
                handler: function (val) {
                    this.changeDataofList();
                },
                deep: true
            },
            tableList:{
                 handler: function (val) {
                    this.changkeyval();
                },
                deep: true
            },
            bubbleListColor:{
                 handler: function (val) {
                    this.changeColorList();
                },
                deep: true
            },
            lineSeries: {
                handler: function (val,old) {
                    if(old.length===0) return    
                    this.changeLineBasic();
                },
                deep: true
            },
            pieSeriesData(val,old){
                if(old.length===0) return    
                this.changePieBasic();
            },
            ringMultiSeries: {
                handler: function (val,old) {     
                    if(old.length===0) return                 
                    this.changeRingMulti();
                },
                deep: true
            }
        },
        created(){            
            this.colorList=getTheme();
            this.attr = JSON.parse(JSON.stringify(this.current.attributes));
            const key = this.data.key;
            this.xtype = this.attr[key].type;
            this.xval = this.attr[key].value;
            this.items = this.attr[key].items;
            if (this.xtype === 'textNumber' && this.xval === undefined) {
                this.xval = null;
            }
            this.defColor = this.xval;
            if (this.xtype === "lineSeries") {
                this.initLineBasic();
            }
            if(this.xtype==='tableseries'){
                this.inittabledata();  
            }
            if(this.xtype==='listColum'){
                this.initColumList()
            }
            if (this.xtype === "pieSeries") {                
                this.initPieBasic();
            }
            if (this.xtype === "radarSeries") {
                this.initRadarBasic();
            }
            if (this.xtype === "barSeries") {                
                this.initBarBasic();
            }
            if (this.xtype === "bubbleListColor") {
                this.initBubbleSpecial();
            }
            if (this.xtype === "ringMultiSeries") {
                this.initRingMultiSeries();
            }
        },
        methods: {
            // 翻译英文为中文
            toZh(item){
                if (lang[item]) {
                    return lang[item]
                } else {
                    return item;
                }
            },
            // 初始化可编辑列表的列系列数据
            initColumList(){
                const series = this.current.attributes.staticData.value;
                const currentData = this.current.attributes.listColum.value;
                let columList =[];
                let temparr = Object.keys(series[0])
                temparr.forEach((item,index,arr)=>{
                    columList.push({
                        name:series[0][item],
                        color:'white',//字体颜色
                        widthorder:30,//所占宽度比
                        fontSize:14,//字体大小
                        fontFamily:'Microsoft Yahei',//字体
                        weight:'normal'
                    })
                })
                if (currentData&&currentData.length!=0) {
                    let tempData = JSON.parse(JSON.stringify(currentData));
                    this.columList = tempData;
                } else {
                    this.columList = columList
                }
                
                this.changeDataofList()
            },
            // 初始化键值列表的系列数据
            inittabledata(){
                let temparr = ['val','key']
                const currentData = this.current.attributes.tableList.value;
                let tableList =[];
                temparr.forEach((item,index,arr)=>{
                     tableList.push({
                         ratio:index==0?40:60,//列占的比例
                         color:'#ffffff',//字体颜色
                         size:14,//字号
                         fontFamily:'Microsoft Yahei',//字体
                         weight:'normal',//粗细
                     })
                })
                if (currentData&&currentData.length!=0) {
                    let tempData = JSON.parse(JSON.stringify(currentData));
                    this.tableList = tempData;
                } else {
                    this.tableList = tableList
                }
                this.changkeyval()

            },
             // 根据气泡图数据初始化并计算系列数据
            initBubbleSpecial(){
                // 整理系列数据，找到系列中最多的数据
                const series = this.current.attributes.staticData.value;
                const currentData = this.current.attributes.bubbleListColor.value;
                const s = this.current.attributes.s.value;
                let seriesName = [] 
                let bubbleListColor = [];
                series.forEach(i => {
                    let name = i[s];
                    if (name === undefined) {
                        name = "系列1";
                    }
                    if (!seriesName.includes(name)) {
                        seriesName.push(name);
                    }
                })
                let maxLength = 0 ;//个数最多的系列
                let temparr = [] 
                seriesName.forEach((name,index1,arr1)=>{
                    temparr = series.filter((item,index2,arr2)=>{
                          return name === item[s]
                    })
                    if(maxLength<temparr.length){
                        maxLength = temparr.length
                    }                        
                })
                console.log(maxLength)
                for(let i = 0 ; i < maxLength ; i++){
                    if(i==0){
                         bubbleListColor.push({
                            // name: name, // 系列名称
                            color: '#2897c9',  // 颜色,
                            bordercolor:'#4c985f',//边框颜色
                        });
                    }else if(i==1){
                        bubbleListColor.push({
                            // name: name, // 系列名称
                            color: '#4c985f',  // 颜色,
                            bordercolor:'#b78b3a',//边框颜色
                        });
                    }else{
                         bubbleListColor.push({
                            // name: name, // 系列名称
                            color: '#b78b3a',  // 颜色,
                            bordercolor:'#ffbb33',//边框颜色
                        });
                    }
                        
                }
                if (currentData&&currentData.length!=0) {
                    let tempData = JSON.parse(JSON.stringify(currentData));
                    this.bubbleListColor = tempData;
                } else {
                    this.bubbleListColor = bubbleListColor
                }
                this.changeColorList()


            },
            // 根据折线数据初始化计算系列数据
            initLineBasic(){
                const series = this.current.attributes.staticData.value;
                const currentData = this.current.attributes.lineSeries.value;
                const s = this.current.attributes.s.value;
                let seriesName = [];
                let lineSeries = [];
                series.forEach(i => {
                    let name = i[s];
                    if (name === undefined) {
                        name = "系列1";
                    }
                    if (!seriesName.includes(name)) {
                        seriesName.push(name);
                        lineSeries.push({
                            name: name, // 系列名称
                            color: '#327EC8',  // 折线颜色,
                            type: 'solid', // 折线类型 （实线、虚线）
                            width: 2, // 折线粗细
                            smooth: false, // 是否平滑曲线
                            showSymbol: true, // 是否显示标记
                            symbolType: 'emptyCircle', // 标记类型
                            symbolSize: 4, // 标记大小
                            areaStyle: {  // 区域填充样式
                                color: 'RGBA(50,126,200,0.70)', // 颜色
                                opacity: 0 // 是否显示
                            }
                        });
                    }
                })

                if (currentData) {
                    let tempData = JSON.parse(JSON.stringify(currentData));
                    for (let len = tempData.length; len < lineSeries.length; len++) {
                        tempData.push(lineSeries[len]);
                    }
                    this.lineSeries = tempData;
                } else {
                    this.lineSeries = lineSeries;
                }
                this.changeLineBasic();
            },
            // 根据饼状图数据初始化并计算系列数据
            initPieBasic(){
                const series = this.current.attributes.staticData.value;
                const currentData = this.current.attributes.pieSeries.value;
                let pieSeries = [];
                series.forEach((i, index) => {
                    let colorIndex = index;
                    if (index >= this.colorList.length) {
                        colorIndex = index - this.colorList.length;
                    }
                    pieSeries.push({
                        type: 'full',
                        color: this.colorList[colorIndex], // 当前颜色
                        color1: this.colorList[colorIndex], // 上次的颜色
                    });
                });
                if (currentData) {
                    let tempData = JSON.parse(JSON.stringify(currentData));
                    let _tempData = [];
                    tempData.forEach(i => {
                        _tempData.push({
                            type: typeof i === "string" ? "full" : "linear",
                            color: i, // 当前颜色
                            color1: i // 上次的颜色
                        })
                    })
                    for (let len = tempData.length; len < pieSeries.length; len++) {
                        _tempData.push(pieSeries[len]);
                    }
                    this.pieSeries = _tempData;
                } else {
                    this.pieSeries = pieSeries;
                }
            },
            rePieColor(index){
                let color = this.pieSeries[index].color;
                const color1 = this.pieSeries[index].color1;
                const type = this.pieSeries[index].type;
                if (type === 'linear' && typeof color1 === 'string') {
                    this.pieSeries[index].color = [this.linear.top, this.linear.down, this.linear.rotate];
                } else {
                    this.pieSeries[index].color = color1;
                }
                this.pieSeries[index].color1 = color;
            },
            // 修改饼图填充颜色为渐变色
            changePieColor(json){
                this.pieSeries[json.index].color = [json.top, json.down, json.rotate];
            },
            // 监听柱状图数据并简化
            simpleBarData(val){
                let bar = [];
                val.forEach(i => {
                    bar.push({
                        name: i.name,
                        color: i.color
                    })
                });
                this.pieSeriesData = bar;
            },
            // 监听气泡图数据并简化
            simpleBubbleData(val){
                let bubble = [];

                val.forEach(i => {
                    bubble.push({
                        name: i.name,
                        color: i.color,
                    })
                });
                bubble.push(this.bubbleColor)
                this.pieSeriesData = bubble;
            },
            // 监听饼图数据并简化
            simplePieData(val){
                let color = [];
                val.forEach(i => {
                    color.push(i.color)
                })
                this.pieSeriesData = color;
            },
            //根据雷达图数据初始化并计算系列数据
            initRadarBasic(){                
                const series = this.current.attributes.staticData.value;
                const s = this.current.attributes.s.value;
                let seriesName = [];
                let lineSeries = [];
                let line = this.colorList;
                let area= this.colorList.map(x=>{
                    return hexToRgba(x,50)
                })
                series.forEach((i, index) => {
                    let name = i[s];
                    if (name === undefined) {
                        name = "系列1";
                    }
                    if (!seriesName.includes(name)) {
                        seriesName.push(name);
                        lineSeries.push({
                            name: name, // 系列名称
                            lineColor: line[index % 2],
                            width: 2,
                            areaColor: area[index % 2],
                        });
                    }
                })
                this.lineSeries = lineSeries;
            },
            // 根据柱状图数据初始化并计算系列数据
            initBarBasic(){
                const series = this.current.attributes.staticData.value;
                const currentData = this.current.attributes.barSeries.value;
                const s = this.current.attributes.s.value;
                let seriesName = [];
                let pieSeries = [];
                series.forEach((i, index) => {
                    let name = i[s];
                    if (name === undefined) {
                        name = "系列1";
                    }
                    if (!seriesName.includes(name)) {
                        seriesName.push(name);
                        pieSeries.push({
                            name: name, // 系列名称
                            type: 'full',
                            color: this.colorList[index], // 当前颜色
                            color1: this.colorList[index] // 上次的颜色
                        });
                    }
                })
                if (currentData) {
                    let tempData = JSON.parse(JSON.stringify(currentData));
                    let _tempData = [];
                    tempData.forEach(i => {
                        _tempData.push({
                            name: i.name, // 系列名称
                            type: typeof i.color === "string" ? "full" : "linear",
                            color: i.color, // 当前颜色
                            color1: i.color // 上次的颜色
                        })
                    })
                    for (let len = tempData.length; len < pieSeries.length; len++) {
                        _tempData.push(pieSeries[len]);
                    }
                    this.pieSeries = _tempData;
                } else {
                    this.pieSeries = pieSeries;
                }
            },
           
            //根据多环图数据初始化并计算系列数据
            initRingMultiSeries(){
                const series = this.current.attributes.staticData.value;
                const currentData = this.current.attributes.pieSeries.value;
                const len=currentData.length
                const s = this.current.attributes.s.value;
                let pieSeries = [];
                let max = 0;
                series.forEach((i, index) => {
                    let name = i[s];
                    if (name === undefined) {
                        name = "系列"+(index+1);
                    }
                    
                    if(index<len){
                        pieSeries.push({
                            name: name, // 系列名称
                            color: currentData[index].color,
                            borderWidth: currentData[index].borderWidth,
                            radius:currentData[index].radius
                        });
                    }else{
                        pieSeries.push({
                            name: name, // 系列名称
                            color: this.colorList[index],
                            borderWidth: 5,
                            radius:max+10
                        });
                    }
                    if (pieSeries[index].radius > max) {
                        max = pieSeries[index].radius
                    };
                })
                this.ringMultiSeries = pieSeries;
            },
            // 柱状图数据源变化时及时系列数据
            dataBarBasic(){                
                const series = this.current.attributes.staticData.value;
                const s = this.current.attributes.s.value;
                let seriesName = [];
                series.forEach(i => {
                    let name = i[s];
                    if (name === undefined) {
                        name = "系列1";
                    }
                    if (!seriesName.includes(name)) {
                        seriesName.push(name);
                    }
                });
                if (this.pieSeries.length < seriesName.length) {
                    for (let len = this.pieSeries.length; len < seriesName.length; len++) {
                        this.pieSeries.push({
                            name: seriesName[len], // 系列名称
                            type: 'full',
                            color: this.colorList[len], // 当前颜色
                            color1: this.colorList[len] // 上次的颜色
                        });
                    }
                } else if (this.pieSeries.length > seriesName.length) {
                    const len = this.pieSeries.length - seriesName.length;
                    this.pieSeries.splice(seriesName.length, len);
                } else {
                    const currentData = this.current.attributes.barSeries.value;
                    if (currentData && this.pieSeries.length === currentData.length) {
                        let tempData = JSON.parse(JSON.stringify(currentData));
                        let _tempData = [];
                        tempData.forEach(i => {
                            _tempData.push({
                                name: i.name, // 系列名称
                                type: typeof i.color === "string" ? "full" : "linear",
                                color: i.color, // 当前颜色
                                color1: i.color // 上次的颜色
                            })
                        })
                        this.pieSeries = _tempData
                    }
                }
            },
            // 饼状图数据源变化时及时系列数据
            dataPieBasic(){
                const series = this.current.attributes.staticData.value;
                if (series.length > this.pieSeries.length) {
                    const len = series.length - this.pieSeries.length;
                    for (let i = 0; i < len; i++) {
                        this.pieSeries.push({
                            type: 'full',
                            color: this.colorList[i], // 当前颜色
                            color1: this.colorList[i] // 上次的颜色
                        })
                    }
                }
                if (series.length < this.pieSeries.length) {
                    const len = this.pieSeries.length - series.length;
                    this.pieSeries.splice(series.length, len);
                }
            },
            // 多环饼图变化及时更新系列数据
            dataRingMultiSeries(){                
                const series = this.current.attributes.staticData.value;
                const s = this.current.attributes.s.value;
                let seriesName = [];
                series.forEach(i => {
                    let name = i[s];
                    if (name === undefined) {
                        name = "系列1";
                    }
                    if (!seriesName.includes(name)) {
                        seriesName.push(name);
                    }
                });
                if (series.length > this.ringMultiSeries.length) {
                    const len = series.length - this.ringMultiSeries.length;
                    let max = 0;
                    this.ringMultiSeries.forEach(i => {
                        if (i.radius > max) {
                            max = i.i.radius
                        };
                    })
                    for (let i = 0; i < len; i++) {
                        this.ringMultiSeries.push({
                            name: series[s], // 系列名称
                            color: this.colorList[i],
                            borderWidth: 5,
                            radius: max + 10
                        })
                    }
                }
                if (series.length < this.ringMultiSeries.length) {
                    const len = this.ringMultiSeries.length - series.length;
                    this.ringMultiSeries.splice(series.length, len);
                }
            },
            // 雷达图数据源变化时计算系列数据
            dataRadarBasic(){
                const line = this.colorList;
                const area= this.colorList.map(x=>{
                    return hexToRgba(x,50)
                })
                const series = this.current.attributes.staticData.value;
                const s = this.current.attributes.s.value;
                let seriesName = [];
                series.forEach(i => {
                    let name = i[s];
                    if (name === undefined) {
                        name = "系列1";
                    }
                    if (!seriesName.includes(name)) {
                        seriesName.push(name);
                    }
                });
                if (this.lineSeries.length < seriesName.length) {
                    for (let len = this.lineSeries.length; len < seriesName.length; len++) {
                        this.lineSeries.push({
                            name: series["s"], // 系列名称
                            lineColor: line[len % 2],
                            width: 1,
                            areaColor: area[len % 2],
                        });
                    }
                }
                if (this.lineSeries.length > seriesName.length) {
                    const len = this.lineSeries.length - seriesName.length;
                    this.lineSeries.splice(seriesName.length, len);
                }
            },
            //折线图数据源变化时计算系列数据
            dataLineBasic(){
                const series = this.current.attributes.staticData.value;
                const s = this.current.attributes.s.value;
                let seriesName = [];
                series.forEach(i => {
                    let name = i[s];
                    if (name === undefined) {
                        name = "系列1";
                    }
                    if (!seriesName.includes(name)) {
                        seriesName.push(name);
                    }
                });
                if (this.lineSeries.length < seriesName.length) {
                    for (let len = this.lineSeries.length; len < seriesName.length; len++) {
                        this.lineSeries.push({
                            name: seriesName[len], // 系列名称
                            color: '#327EC8',  // 折线颜色,
                            type: 'solid', // 折线类型 （实线、虚线）
                            width: 2, // 折线粗细
                            smooth: false, // 是否平滑曲线
                            showSymbol: true, // 是否显示标记
                            symbolType: 'emptyCircle', // 标记类型
                            symbolSize: 4, // 标记大小
                            areaStyle: {  // 区域填充样式
                                color: 'RGBA(50,126,200,0.70)', // 颜色
                                opacity: 0 // 是否显示
                            }
                        });
                    }
                }
                if (this.lineSeries.length > seriesName.length) {
                    const len = this.lineSeries.length - seriesName.length;
                    this.lineSeries.splice(seriesName.length, len);
                }
            },
            // 更新列表设置
            changeDataofList(){
                const attribute = JSON.parse(`{"attr":{"${this.data.key}":{"type":"${this.xtype}","value":${JSON.stringify(this.columList)}}}}`);
                this.callback(attribute);
            },
            // 更新键值表
            changkeyval(){
                const attribute = JSON.parse(`{"attr":{"${this.data.key}":{"type":"${this.xtype}","value":${JSON.stringify(this.tableList)}}}}`);
                this.callback(attribute);
            },
            // 更新颜色
            changeColorList(){
                const attribute = JSON.parse(`{"attr":{"${this.data.key}":{"type":"${this.xtype}","value":${JSON.stringify(this.bubbleListColor)}}}}`);
                this.callback(attribute);
            },
            changeLineBasic(){
                const attribute = JSON.parse(`{"attr":{"${this.data.key}":{"type":"${this.xtype}","value":${JSON.stringify(this.lineSeries)}}}}`);
                this.callback(attribute);
            },
            changeColor(val){
                const attribute = JSON.parse(`{"attr":{"${this.data.key}":{"type":"${this.xtype}","value":"${val}"}}}`);
                this.callback(attribute);
            },
            changeIpt(){
                const attribute = JSON.parse(`{"attr":{"${this.data.key}":{"type":"${this.xtype}","value":"${this.xval.trim()}"}}}`);
                this.callback(attribute);
            },
            changeIptNumber(){
                const attribute = JSON.parse(`{"attr":{"${this.data.key}":{"type":"${this.xtype}","value":${this.xval}}}}`);
                this.callback(attribute);
            },
            changeSlt(val){
                const attribute = JSON.parse(`{"attr":{"${this.data.key}":{"type":"${this.xtype}","value":"${val}","items":"${this.items}"}}}`);
                this.callback(attribute);
            },
            changeSlider(val){
                const attribute = JSON.parse(`{"attr":{"${this.data.key}":{"type":"${this.xtype}","value":${val}}}}`);
                this.callback(attribute);
            },

            changeRadio(val){
                const attribute = JSON.parse(`{"attr":{"${this.data.key}":{"type":"${this.xtype}","value":"${val}","items":"${this.items}"}}}`);
                this.callback(attribute);
            },
            // 系列颜色类型选择
            changeColorType(val){
                if (val === 'full') {
                    const attribute = JSON.parse(`{"attr":{"${this.data.key}":{"type":"${this.xtype}","value":"${this.defColor}"}}}`);
                    this.callback(attribute);
                } else {
                    const attribute = JSON.parse(`{"attr":{"${this.data.key}":{"type":"${this.xtype}","value":${JSON.stringify(this.linear)}}}}`);
                    this.callback(attribute);
                }
            },
            // 饼状图颜色变化
            changePieBasic(){
                const attribute = JSON.parse(`{"attr":{"${this.data.key}":{"type":"${this.xtype}","value":${JSON.stringify(this.pieSeriesData)}}}}`);
                this.callback(attribute);
            },
            //多环拼图变化回调
            changeRingMulti(){
                const attribute = JSON.parse(`{"attr":{"${this.data.key}":{"type":"${this.xtype}","value":${JSON.stringify(this.ringMultiSeries)}}}}`);
                this.callback(attribute);
            },
            changeGradient(json){
                const attribute = JSON.parse(`{"attr":{"${this.data.key}":{"type":"${this.xtype}","value":${JSON.stringify(json)}}}}`);
                this.callback(attribute);
            },
            fileUpload(data){
                const attribute = JSON.parse(`{"attr":{"${this.data.key}":{"type":"${this.xtype}","value":"${data}"}}}`);
                this.callback(attribute);
            },
            // 修改组件回调
            callback(attribute){                
                this.$emit('update', Object.assign(attribute, {info: this.current.info}));
            }
        },
        deactivated() {
            this.$destroy();
        }
    }
</script>
<style type="text/less" lang="less">
    .color-box {
        margin-top: 10px;
    }

    .line-series {
        width: 100%;
        .line-series-box {
            border: 1px dotted #2d8cf0;
            margin-bottom: 5px;
            padding: 5px;
            .line-series-name {
                padding-left: 20px;
                border-top: 1px solid #dddddd;
                font-size: 14px;
                &:first-child {
                    border-top: none;
                }
            }
        }
    }
</style>