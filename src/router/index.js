/**
 * Created by 高春超 2018年3月5日15:58:24
 */
import Vue from 'vue';
import Router from 'vue-router';
const _import = require('./_import_' + process.env.NODE_ENV);

Vue.use(Router);
export const RouterMap = [
    {
        path: '/datashow',
        component: _import('index'),
        redirect: '/datashow/project',
        name: '首页',
        children: [
            {path: 'project', name: '我的可视化', component: _import('visual/index')},
            {path: 'model', name: '我的模板', component: _import('model/index')},
            {path: 'skin', name: '我的皮肤', component: _import('mySkins/index')},
            {path: 'page', name: '我的页面', component: _import('visual/page')}
        ]
    },
    {
        path: '/login',
        component: _import('login/index'),
        name: '登录'
    },
    {
        path: '/screen',
        component: _import('screen/screen'),
        name: '可视化编辑'
    },
    {
        path: '/create_screen',
        component: _import('modelSelect/index'),
        name: '模板选择'
    },
    {
        path: '/preview',
        component: _import('preview/index'),
        name: '预览页面'
    },
    {
        path: '/showScreen',
        component: _import('showScreen/index'),
        name: '展示页面'
    },
    {
        path: '/share/:id',
        component: _import('share/index'),
        name: '展示页面'
    },    
    {
        path: '/camera/:id',
        component: _import('camera/index'),
        name: '历史快照'
    },   
    {
        path: '/404',   
        component: _import('error/404'),     
        name: '404'
    }, {
        path: '*',
        redirect: '/datashow'
    }
];
export default new Router({
    routes: RouterMap
});
