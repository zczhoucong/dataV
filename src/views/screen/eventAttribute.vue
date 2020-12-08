<!--组件内部事件 高春超 2018年4月16日09:41:48-->
<template>
    <div class="event-box-list">
        <Collapse class="def-tab-item" value="innerEvent">
            <Panel name="innerEvent">
                <span class="collapse-title">内部事件</span>
                <ul slot="content">
                    <li v-for="(event,index) in eventList" @click="showEventConfig(event)" class="event-list" :key="'event_'+index">{{event.title}}
                    </li>
                </ul>
            </Panel>
        </Collapse>
    </div>
</template>
<script>
    export default{
        name: 'eventAttribute',
        data(){
            return {
                eventList: [] // 事件列表
            }
        },
        computed: {
            current: { //当前选中组件
                get() {
                    return this.$store.state.currentComponent[0]
                }
            }
        },
        watch: {
            current(val){
                this.eventList = val.attributes._child.value.data;
            },
        },
        mounted(){
            this.$nextTick(() => {
                this.eventList = this.current.attributes._child.value.data;
            })
        },
        methods: {
            // 配置单个子元素事件
            showEventConfig(event){
                this.$emit('setEvent', event);
            }
        }
    }
</script>
<style>
    .event-list {
        height: 30px;
        line-height: 30px;
        width: 100%;
        padding-left: 20px;
        border-bottom: 1px solid #ddd;
        cursor: pointer;
        color:#fff;
    }
    .event-list:last-child{
        border-bottom: none;
    }
</style>