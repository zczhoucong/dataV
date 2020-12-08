<!--
    说明：数据源面板
    作者：高春超
    时间：2019年3月12日08点52分
-->
<template>
    <div style="width:100%">
        <Collapse class="def-tab-item" v-if="dataApi.length===0" value="noData">
            <Panel name="noData">
                <span class="collapse-title">数据描述</span>
                <p slot="content">
                    <span class="no-tips">该组件暂无数据描述</span>
                </p>
            </Panel>
        </Collapse>
        <div style="width:100%;" v-else>
            <Collapse v-model="dIdx" accordion class="def-tab-item">
                <Panel :name="index.toString()" v-for="(item,index) in dataApi" :key="'datapanel_'+index">
                            <span class="collapse-title">
                                 {{item.name}}
                            </span>
                    <div slot="content">
                        <div class="attr-table">
                            <table style="width:100%;">
                                <thead>
                                <tr style="color:#999;" class="black">
                                    <th style="width:15%">字段</th>
                                    <th style="width:20%">映射</th>
                                    <th style="width:20%">说明</th>
                                    <th style="width:25%">状态</th>
                                </tr>
                                </thead>
                                <tbody style="color:#fff;text-align: center"  v-if="dIdx.length>0"> 
                                <tr class="attr-tr" v-for="(tr,index) in xList[dIdx]" :key="'tr_'+index">
                                    <td>{{tr.key}}</td>
                                    <td>
                                        <input type="text" v-model="tr.match" class="attr-ipt"
                                               placeholder="可自定义">
                                    </td>
                                    <td>{{tr.name}}</td>
                                    <td>
                                        <span :class="tr.status===0?'enityRed':'enity'">{{matchStatus[tr.status]}}</span>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="attr-data-box">
                            <p style="color:#999;margin:5px 0">数据源类型</p>
                            <Select v-model="source" style="margin:5px 0 10px" @on-change="changeSource">
                                <Option v-for="data in dataSource" :value="data.value" :key="data.value">{{
                                    data.label }}
                                </Option>
                            </Select>
                            <editor v-model="formatEditor" lang="json" @init="editorInit(item.children)"
                                    v-if="dIdx.length>0 && source==='Static'" :key="'static_'+current.info.id"
                                    theme="twilight" width="100%" height="300"></editor>
                            <div v-if="dIdx.length>0&&source==='WebApi'">
                                <p style="color:#999;margin:5px 0">将回调参数配置到url中，例：http://api.test?value=:value</p>
                                <textarea ref="iptBox" v-model="apiUrl" @keyup="keyShow" @blur="postApi" @click.native="keyFlag=false" class="ipt-box" id="apiUrl"
                                       style="width: 330px;resize:none" ></textarea>
                                <ul  class="keysList" v-show="keyFlag">
                                    <li v-for="(item, index) in keys" :key="index" @mousedown="updataUrl(item)">{{item}}<span>变量</span></li>
                                </ul>
                                <Button :disabled="preBtn" style="float: right;margin:5px auto" type="warning"
                                        @click.native="getApiData">数据预览
                                </Button>
                                <editor v-model="apiData" lang="json" @init="editorInit(item.children)"
                                        v-show="apiData.length>0" ready="true"  :key="'webapi_'+current.info.id"
                                        theme="twilight" width="100%" height="300"></editor>
                            </div>
                        </div>
                        <div class="btn-box" v-if="current.attributes.autoReplay">
                              <Checkbox v-model="autoReplay" @on-change="updateAuto">
                                  自动更新请求&nbsp;<Input v-model="autosecond" @on-blur="updateAuto" size="small" style="width: 30px" />&nbsp;秒一次
                              </Checkbox>
                        </div>
                        <div class="btn-box">
                            <Button :disabled="viewBtn" type="info" @click.native="updateEditor">查看数据响应结果</Button>
                        </div>
                    </div>
                </Panel>
            </Collapse>
        </div>
    </div>
</template>
<script>
    import editor from 'vue2-ace-editor'
    import axios from 'axios'
    import {GetReadyRequest} from '../../utils/getApiData'
    export default {
        name: 'dataAttribute',
        components: {
            editor
        },
        data(){
            return {
                dIdx: '0', // 数据折叠
                autoReplay:false,
                autoSize: {
                    minRows: 2,
                    maxRows: 2
                },
                autosecond:5,
                preBtn: true,
                viewBtn: false,
                dataApi: [],
                dataSource: [{
                    value: 'Static',
                    label: '静态数据'
                }, {
                    value: 'WebApi',
                    label: 'WebApi'
                }],
                source: 'Static',
                matchStatus: ["未找到字段", "可选", "匹配成功"],
                matchResult: ["配置未完成", "配置完成"],
                content: '',
                apiData: '',
                apiUrl: '',
                statList: [],
                xList: [],
                keys: {},
                keyFlag: false
            }
        },
        watch: {
            current(val){
                if(val.attributes.apiUrl) this.apiUrl = val.attributes.apiUrl.value;
                if(val.attributes.dataType) this.source = val.attributes.dataType.value;
                if(this.current.attributes.autoReplay){
                    this.autoReplay= this.current.attributes.autoReplay.value;
                    this.autosecond= this.current.attributes.autosecond.value;
                }
                if (val.dataApi) {
                    this.initDataSource();
                } else {
                    this.dataApi = [];
                }
            },
        },
        computed: {
            current: { //当前选中组件
                get(value) {
                    return this.$store.state.currentComponent[0]
                }
            },
            //格式化code数据
            formatEditor: {
                get(){
                    let code = JSON.parse(this.statList[this.dIdx]);
                    code = JSON.stringify(code, null, 2);
                    return code;
                },
                set(value){
                    this.statList[this.dIdx] = JSON.stringify(eval(value));
                }
            },
        },
        created(){
            this.$Message.config({
                duration: 3
            });
            if(this.current.attributes.dataType && this.current.attributes.apiUrl) {
                this.source = this.current.attributes.dataType.value;
                this.apiUrl = this.current.attributes.apiUrl.value;
                this.initDataSource();
            };          
        },
        methods: {
            //切换数据源选择面板
            changeSource(source){
                if (source === 'Static') { // 静态数据
                    this.initStatusData();
                    this.InitEditor();
                } else { // 接口数据
                    if(this.apiUrl.length>0) this.preBtn = false;
                    this.apiData = '';
                    this.matchItem("");
                }
            },
            //通过接口获取数据
            getApiData(){
                if (this.apiUrl != '') {
                    this.$Spin.show({
                        render: (h) => {
                            return h('div', [
                                h('Icon', {
                                    'class': 'demo-spin-icon-load',
                                    props: {
                                        type: 'load-c',
                                        size: 24
                                    }
                                }),
                                h('div', 'WebApi接口请求中，请稍后...')
                            ])
                        }
                    });
                    this.apiData = '';
                    this.preBtn = true;
                    const apiUrl=GetReadyRequest(this.apiUrl);
                    axios.get(apiUrl).then(resp => {
                        console.log(resp)
                        this.$Spin.hide();
                        this.preBtn = false;                        
                        if (resp.data && resp.data.resCode === 1) {                            
                            const resData = JSON.parse(JSON.stringify(resp.data));
                            this.apiData = JSON.stringify(resData.data, null, 2);
                            const data = eval(`(${this.apiData})`);
                            if(data.length===0) return
                            if (Array.isArray(data)) { // 符合数组格式
                                this.matchItem(data[0]);
                            }
                        } else {
                            this.$Message.error("消息响应格式错误")
                        }
                    }).catch(error => {
                        this.$Spin.hide();
                        this.preBtn = false;
                        this.$Message.error(error.message)
                    })
                }
            },
            // 初始化数据源
            initDataSource(){
                if (this.current.dataApi) {
                    this.dataApi = JSON.parse(JSON.stringify(this.current.dataApi));
                    this.xList = [];
                    // 设置组件字段列表
                    this.dataApi.forEach(i => {
                        let list = [];
                        i.children.forEach(j => {
                            list.push({
                                key: j.key,
                                name: j.name,
                                type: j.type,
                                match: this.current.attributes[j.key].value,
                                status: 0
                            })
                        });
                        this.xList.push(list);
                    });
                    if(this.source==='WebApi') {
                        if(this.apiUrl.length>0) this.preBtn = false;
                        return;
                    };
                    this.initStatusData();
                    this.InitEditor();
                } else {
                    this.dataApi = [];
                }
            },
            // 初始化组件的静态数据
            initStatusData(){
                this.statList = [];
                this.statList.push(JSON.stringify(this.current.attributes.staticData.value))
            },
            // 通过url获取数据
            postApi(){
                this.keyFlag = false; // 当文本框失去焦点让关键字提示框隐藏
                const reg = /^[http | https]+:(\w+ |.+)$/g;
                if (this.apiUrl.match(reg)) {
                    this.preBtn = false;
                } else {
                    this.$Message.warning("请输入正确的接口地址");
                    this.preBtn = true;
                }
            },
            attrJson(item){
                let html = `[{\n`;
                let arr = ['text', 'selection', 'icon', 'ionicon', 'color'];
                let attrKey;
                item.forEach((i, index) => {
                    if (arr.includes(this.current.attributes[i.key].type)) {
                        attrKey = `"${this.current.attributes[i.key].value}"`
                    } else {
                        attrKey = `${this.current.attributes[i.key].value}`
                    }
                    html += `  "${i.key}":${this.current.attributes[i.key].value.length === 0 ? "\"\"" : attrKey}`;
                    if (index < item.length - 1) {
                        html += ',';
                    }
                    html += "\n";
                })
                html += '}]';
                this.content = html;
            },
            // 匹配表格字段状态
            matchItem(json){
                //判断Key值是否与dataApi中的匹配
                let list = this.xList[this.dIdx];
                const arr = Object.keys(json);
                list.forEach(i => {
                    if (arr.includes(i.key) || arr.includes(i.match)) {
                        i.status = 2;
                    } else if (i.type === 'optional') {
                        i.status = 1
                    } else {
                        i.status = 0;
                    }
                })
            },

            // 初始化属性字段匹配
            InitEditor(){
                if(this.statList.length===0) return;
                const content = this.statList[this.dIdx];
                const data = eval(`(${content})`);
                if (Array.isArray(data)) { // 符合数组格式
                    this.matchItem(data[0]);
                }
            },

            // 更新组件
            updateCallBack(json){                
                let arr = JSON.parse(JSON.stringify(this.current.attributes));
                arr.dataType.value = this.source;
                let flag = false;                
                this.xList[this.dIdx].forEach(i => {
                    arr[i.key].value = i.match;
                    if (i.status === 0) {
                        flag = true;
                    }
                })
                if (flag) { // 未找到必填字段
                    this.$Message.error("配置未完成");
                    return;
                }

                // 如果数据源类型是静态数据，则将内容按照匹配值进行转换，并保存到组件属性中，
                if (this.source === 'Static') {
                    const content = JSON.parse(JSON.stringify(eval(this.statList[this.dIdx])));
                    arr.staticData.value = content;
                } else {  // 如果不是，则保存webApi地址
                    arr.apiUrl.value = this.apiUrl;
                    arr.staticData.value = JSON.parse(JSON.stringify(eval(this.apiData)));
                }

                // 更改当前组件数值
                this.$emit('update', Object.assign({
                    attr: arr
                }, {info: this.current.info}));
            },
            // 更新编辑器后的回调事件
            updateEditor(){                
                this.viewBtn = true;
                setTimeout(() => {
                    this.viewBtn = false;
                }, 500);
                let content = this.statList[this.dIdx];
                if (this.source === "WebApi") {
                    content = this.apiData;
                    if (this.apiUrl === "") {
                        this.$Message.error("请输入正确的WebApi数据源地址");
                        return;
                    } else if (content === "") {
                        this.$Message.error("请进行数据预览并绑定正确的字段映射");
                        return;
                    }
                }
                const data = eval(`(${content})`);
                if(data.length===0){
                    this.$Message.error("数据内容为空，请输入正确的数据源")
                    return
                }
                if (Array.isArray(data)) { // 符合数组格式
                    this.matchItem(data[0]);
                    this.updateCallBack(data[0]);
                } else {
                    this.$Message.error("数据内容为空，请输入正确的数据源")
                }
            },
            // 编辑器初始化
            editorInit(){
                require('brace/theme/twilight')
                require('brace/mode/json');
            },
            // 切换数据源面板
            changeDataConfig(data){
                if (data.length > 0) {
                    const index = data[0];
                    this.attrJson(this.dataApi[index].children);
                }
            },
            // 检测输入框内容，智能提示关键字
            keyShow() {
                // 正则验证 /(https?|ftp|file)://[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]=:/
                this.keyFlag = false;            
                this.keys = Object.keys(this.$store.state.keys);
                const reg = /(https?|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+\?[-A-Za-z0-9+&@#/%=~_|:]+=:$/;
                // 获取文本域光标的位置
                let inputIndex = this.$refs.iptBox[0].selectionStart;
                // 获取光标之前的字符串
                let nowUrl = this.apiUrl.substring(0, inputIndex);
                if (nowUrl.match(reg)) {
                    this.keyFlag = true
                }
            },
            // 将关键字添加到url
            updataUrl(item) {
                // 获取文本域光标的位置
                let inputIndex = this.$refs.iptBox[0].selectionStart;
                // 拼接新地址
                this.apiUrl = this.apiUrl.substring(0, inputIndex) + item + this.apiUrl.substring(inputIndex, this.apiUrl.length);
            },
            // 自动更新请求变化
            updateAuto(){
                let arr = JSON.parse(JSON.stringify(this.current.attributes));
                arr.autoReplay.value=this.autoReplay
                arr.autosecond.value=this.autosecond
                    // 更改当前组件数值
                this.$emit('update', Object.assign({
                    attr: arr
                }, {info: this.current.info}));
            }
        }
    }
</script>
<style lang="less" scoped type="text/less">
    .ipt-box{
        border: 1px solid rgba(255, 255, 255, .2);
        background-color: #3b3b3b;
        color: #fff;
    }

    @keyframes ani-demo-spin {
        from {
            transform: rotate(0deg);
        }
        50% {
            transform: rotate(180deg);
        }
        to {
            transform: rotate(360deg);
        }
    }

    .demo-spin-icon-load {
        animation: ani-demo-spin 1s linear infinite;
    }

    .keysList {
        position: absolute;
        left: 57px;
        width: 200px;
        color: gray;
        margin-top: 1px;
        background-color: rgb(230, 230, 230);
        border-radius: 3px;
        z-index: 999;
        li {
            padding: 3px 5px;
            &:hover {
                background-color: rgb(204, 215, 247);
                border-radius: 3px;
            }
            span {
                float: right;
            }
        }
    }
</style>