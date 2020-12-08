<template>
    <div class="screen-header">
        <div class="screen-logo">{{title}}</div>
        <!-- 头部区域（可配合layui已有的水平导航） -->
        <ul class="chart-menu-box">
            <li class="chart-group" v-for="(comArray,index) in comList" :key="index">
                <a class="icon-text-button header-bar" @mouseenter="showComMenu(index)" @mouseleave="hideComMenu">
                    <img :src="`./static/images/${index + 1}.png`" alt="">
                    <span v-show="index===hoverComArray">{{comArray.name}}</span>
                </a>
                <!--含二级分类-->
                <div class="chart-multi-menu" @mouseenter="showComMenu(index)" @mouseleave="hideComMenu"
                        v-show="index===hoverComArray" v-if="comArray.level==='multi'">
                    <!--左侧二级分类列表-->
                    <ul class="chart-subgroup">
                        <li class="chart-sub-icon" @mouseover="showSecCom(idx)" v-for="(sec,idx) in comArray.children" :key="idx">
                            <a class="icon-text-button" :class="idx===hoverSec?'active':''">{{sec.name}}</a>
                        </li>
                    </ul>
                    <!--右侧组件列表-->
                    <div class="chart-single-menu" v-if="comIdx===hoverSec" v-for="(sec,comIdx) in comArray.children" :key="comIdx">
                        <ul class="chart-single-menu-list">
                            <li class="chart-item" :title="com.name" :data-type="com.type" :data-ptype="sec.type"
                                :data-name="com.name" v-for="(com,index) in sec.children" draggable="true"
                                :data-img="com.img"
                                :key="index"
                                @dragstart="dragStart">
                                <img :src="com.img" :alt="com.name"/>
                                <p>{{com.name}}</p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="chart-single-menu" @mouseenter="showComMenu(index)" @mouseleave="hideComMenu"
                        v-show="index===hoverComArray" v-else>
                    <ul class="chart-single-menu-list">
                        <li class="chart-item" :title="com.name" :data-type="com.type" :data-ptype="comArray.type"
                            :data-name="com.name" @dragstart="dragStart" :data-img="com.img" draggable="true"
                            v-for="com in comArray.children" :key="com.type">
                            <img :src="com.img" :alt="com.name"/>
                            <p>{{com.name}}</p>
                        </li>
                    </ul>
                </div>
            </li>
            <li class="chart-group">
                <a class="icon-text-button header-bar" @mouseenter="showComMenu(99)" @mouseleave="hideComMenu">
                    <img :src="`./static/images/favi.png`" alt="">
                    <span v-show="99===hoverComArray">我的收藏</span>
                </a>
                <div class="chart-single-menu" @mouseenter="showComMenu(99)" @mouseleave="hideComMenu"
                        v-show="99===hoverComArray">
                    <ul class="chart-single-menu-list">
                        <li class="no-chart-item">                                                    
                            <p>暂无收藏组件</p>
                        </li>
                    </ul>
                </div>
            </li>
        </ul>
        <ul class="menu-btn-list">
            <!-- <li class="menu-btn-box" @click="saveEvent">
                <Tooltip content="保 存" placement="bottom">
                    <Icon type="ios-cloud-upload-outline" size="24" color="#419fff"></Icon>
                </Tooltip>
            </li>
            <li v-if="flag === '0'" class="menu-btn-box" @click="restoreEvent">
                <Tooltip content="还 原" placement="bottom">
                    <Icon type="md-return-left" size="24" color="#419fff"></Icon>
                </Tooltip>               
            </li> -->
            <li class="menu-btn-box" @click="preiewEvent">
                <Tooltip content="预 览" placement="bottom">
                    <Icon type="ios-easel-outline" size="24" color="#419fff"></Icon>
                </Tooltip>
            </li>
            <li class="menu-btn-box" @click="publishEvent">
                <Tooltip content="发 布" placement="bottom">
                    <Icon type="ios-paper-plane" size="24" color="#419fff"></Icon>
                </Tooltip>
            </li>
        </ul>
    </div>
</template>
<script>
import {publish,restorePageConfig,savePageConfig} from '@/api/page'
import menu from '../screen'
export default {
    props:{
        pgid:{type:String}
    },
    data(){
        return {
            title:config.header,
            comList: menu,
            hoverSec: 0,
            hoverComArray: '',
            // 控制按钮点击之间的时间间隔
            timeName: {
                timeSave: true,
                timePublish: true
            }
        }
    },
    computed:{
        flag(){
            return this.$store.state.flag
        }
    },
    methods:{
        // 显示一级组件库
            showComMenu(index){
                clearTimeout(this.timeout);
                this.hoverComArray = index;
                this.hoverSec = 0;
            },
            // 隐藏一级组件库
            hideComMenu(){
                if (this.hoverComArray === '') return;
                clearTimeout(this.timeout);
                this.timeout = setTimeout(() => {
                    this.hoverComArray = '';
                }, 200)
            },
            // 切换二级组件库
            showSecCom(idx){
                this.hoverSec = idx;
            },
            dragStart(e){
                let info = {
                    name: e.target.getAttribute('data-name'),
                    type: e.target.getAttribute('data-type'),
                    bgImg: e.target.getAttribute('data-img'),
                    ptype: e.target.getAttribute('data-ptype')
                }
                e.dataTransfer.setData('info', JSON.stringify(info))
            },        
            // 预览
            preiewEvent(){                
                let routeData = this.$router.resolve({path: '/preview', query: {pgId: this.pgid}});
                window.open(routeData.href, '_blank');
            },
            // 发布
            publishEvent(){
                // 获取flag，当为1时可以发布，否则发布失败
                this.$emit('publishOk')
            }
    }
}
</script>

