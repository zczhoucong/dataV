/**
 * Created by Administrator on 2018/2/6.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import {saveConfig,saveThumbnails} from '../api/page'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        config: {
            backgroundImage: "", // 背景图片
            color: '#0e2a43', // 背景颜色
            width: 1920, //屏幕宽度
            height: 1080, // 屏幕高度
            skinId:'' //主题
        },
        screen:'', // 页面截图
        themeList:[],
        currentComponent: [], //预览视图的选中组件
        components: [], //预览视图的组件树
        flag: '1', // 后台编辑表和临时表状态 1 一致  0 不一致
        keys: {}, // 交互参数集合
        scale: 0
    },
    mutations: {
        // 更新保存组件配置信息
        setComponents(state, obj) {
            Object.assign(state, {components: obj.components})
        },
        // 加载页面时更新config
        updataConfig(state, obj) {
            Object.assign(state, {config: obj.config})
        },
        setScreen(state,data){
            state.screen = data
        },
        // 将当前选中组件和全部组件分开
        setState(state, obj) {
            Object.assign(state, {components: obj.components});            
        },
        // 设置当前选中组件
        setCurrentCom(state, obj){
            Object.assign(state, obj);
        },
        setConfig(state, data){            
            if (data.config) {                
                state.config = Object.assign(state.config, data.config);
                // 保存页面配置到临时表，flag为1                
                saveConfig({
                    pageId: data.pgId,
                    width:`${state.config.width}`,
                    height:`${state.config.height}`,
                    bg_color:`${state.config.color}`,
                    bg_pic:state.config.backgroundImage,
                    skinId:state.config.skinId
                }).then(resp => {
                    if (resp.ressCode === 0) {
                       console.log(resp)
                    }
                })
            }
            if (data.screen) {
                state.screen=data.screen
                // 保存封面到临时表
                saveThumbnails({
                    pageId: data.pgId,                    
                    small_pic: data.screen
                }).then(resp => {
                    if (resp.ressCode === 0) {
                        console.log(resp)
                    }
                })
            }
        },
        SetFlag(state, data){
            state.flag = data === null ? 1 : 0;
            localStorage.setItem('flag', data)
        },
        setStateKeys(state, data){
            //说明：直接 Object.assign 无法引起监听事件，需要进行转换
            let keys = JSON.parse(JSON.stringify(state.keys));
            state.keys = JSON.parse(JSON.stringify(Object.assign(keys, data)));
        },
        setScale(state, scale){
            state.scale = scale;
        },
        setTheme(state,list){
            state.themeList=list
            let index= list.findIndex(x=>x.isdefault===1)          
                if(index>-1){
                    state.config.skinId=list[index].skinId
                }
            }
    },
    actions: {
        //设置主题列表
        setTheme({commit},data){
            commit('setTheme', data)
        },
        setScale({commit}, data){
            commit('setScale', data)
        },
        setConfig({commit}, data){
            commit('setConfig', data)
        },
        setScreen({commit},data){
            commit('setScreen',data)
        },
        SetFlag({commit}){
            commit('SetFlag', localStorage.getItem('flag'));
        },
        delComponent(context, info) {
            let components = context.state.components;
            const index = components.findIndex(c => c.info.id === info.id); //components已被更新 重新获取索引
            components.splice(index, 1);
            //更新
            context.commit('setState', {
                components: components,
                pgId: info.pgId,
            });
            return Promise.resolve(components)
        },
        setKeys({commit}, data){
            commit('setStateKeys', data)
        }
    }
})

export default store
