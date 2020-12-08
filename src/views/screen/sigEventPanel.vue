<!--单个事件配置面板-->
<template>
    <div class="sigEvent-box">
        <div class="sigEvent-title">
            <span class="sigEvent-back" @click="backEvent">
                <Icon type="chevron-left" size="16" color="#85d4fb"></Icon>
                <span>返回</span>
            </span>
            <span> / {{sigData.title}}</span>
        </div>
        <div class="sigEvent-content">
            <Collapse class="def-tab-item" value="innerEvent">
                <Panel name="innerEvent">
                    <div class="collapse-title" style="display: inline-block">
                        <span>{{current.events[0].name}}</span>
                        <Icon type="ios-help-outline" color="#85d4fb" size="16"></Icon>
                    </div>
                    <div slot="content" style="width:100%;">
                        <editor v-model="content" lang="javascript" @init="editorInit" 
                                theme="twilight" width="100%" height="250"></editor>
                        <div class="btn-box">
                            <Button type="info" @click.native="saveEventSet">保存事件设置</Button>
                        </div>
                    </div>
                </Panel>
            </Collapse>
        </div>
    </div>
</template>
<script>
    import editor from 'vue2-ace-editor'
    export default{
        components: {
            editor
        },
        props: ['sigData'],
        data(){
            return {
                title: this.sigData.title,
                xid: this.sigData.xid,
                content: '',
                current: this.$store.state.currentComponent[0]
            }
        },
        watch: {
            xid: 'editorInitContent'
        },
        methods: {
            backEvent(){
                this.$emit('backTo');
            },
            // 编辑器初始化
            editorInit(){
                require('brace/theme/twilight')
                require('brace/mode/javascript')
                require('brace/snippets/javascript');
                this.editorInitContent();
            },
            // 初始化编辑器内容
            editorInitContent(){
                this.current = this.$store.state.currentComponent[0]
                let eventBox = this.current.events;
                let eventList = eventBox[0].children;
                const index = eventList.findIndex(x => x.xid === this.xid);
                if (index > -1) {
                    const event = eventList[index].event;
                    const first = `${event}`.indexOf('&t&');
                    const last = `${event}`.lastIndexOf('&t&');
                    const content = `${event}`.substring(first + 4, last);
                    const reg = new RegExp('%0B0A0A','g')
                    this.content=content.replace( reg , '\n' );
                }
            },
            saveEventSet(){
                let eventBox = this.current.events;
                let eventList = eventBox[0].children;
                const index = eventList.findIndex(x => x.xid === this.xid);
                if (index > -1) {
                    eventList.splice(index, 1);
                }
                if (this.content.trim().length > 0) {
                    let event = {
                        xid: this.xid,
                        event: `() => {
                            return &t& ${this.content} &t&
                        }`
                    };
                    eventList.push(event);
                }
                // 保存当前组件设置及组件库设置
                this.$emit('update', Object.assign({
                    events: eventBox
                }, {info: this.current.info}));
                this.$Message.success('组件内部事件保存成功!')

//                else{
//                    this.$Message.warning('点击事件函数不能为空!')
//                }
            }
        }
    }
</script>
<style type="text/less" lang="less">
    .sigEvent-box .ivu-collapse-content {
        padding: 5px 0 !important;
    }

    .sigEvent-box {
        float: left;
        width: 100%;
        .sigEvent-title {
            font-size: 14px;
            padding: 0 20px 10px;
            .sigEvent-back {
                cursor: pointer;
                color: #aaa;
            }
        }
    }
</style>