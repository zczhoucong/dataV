/**
 * Created by Administrator on 2018/4/3.
 */
import fetch from '../utils/request';
// 获取页面列表
export function getPageList(params) {
    return fetch({
        url: '/page/list',
        method: 'get',
        data: params
    })
}
// 获取页面详情
export function getPageInfo(params) {
    return fetch({
        url: '/page/info',
        method: 'get',
        data: params
    })
}
// 删除页面
export function delPage(params) {
    return fetch({
        url: '/page/delet',
        method: 'post',
        params: params
    })
}
// 新增页面
export function addPage(params) {
    return fetch({
        url: '/page/add',
        method: 'post',
        params: params
    })
}
// 设置首页
export function setFirst(params) {
    return fetch({
        url: '/page/first',
        method: 'post',
        params: params
    })
}
// 修改页面基本信息
export function editPage(params) {
    return fetch({
        url: '/page/edit',
        method: 'post',
        params: params
    })
}

// 获取flag
export function queryFlag(params) {
    return fetch({
        url: '/page/queryFlag',
        method: 'get',
        params: params
    })
}
// 获取页面配置信息
export function getPageConfig(params) {
    return fetch({
        url: '/page/config',
        method: 'get',
        data: params
    })
}

// 还原页面
export function restorePageConfig(params) {
    return fetch({
        url: '/page/restorePageConfig',
        method: 'post',
        params: params
    })
}
// 保存页面配置到编辑表
export function savePageConfig(params) {
    return fetch({
        url: '/page/savePageConfig',
        method: 'post',
        params: params
    })
}

// 保存页面配置到临时表
export function saveConfig(params) {
    return fetch({
        url: '/page/saveConfig',
        method: 'post',
        data: params
    })
}
// 保存页面缩略图
export function saveThumbnails(params) {
    return fetch({
        url: '/page/saveThumbnails',
        method: 'post',
        data: params
    })
}

// 页面展示
export function showConfig(params) {
    return fetch({
        url: '/page/showConfig',
        method: 'post',
        params: params
    })
}
// 页面复制
export function copyPage(params) {
    return fetch({
        url: '/page/copyPage',
        method: 'post',
        params: params
    })
}
// 设为模板
export function setModel(params) {
    return fetch({
        url: '/page/setModel',
        method: 'post',
        params: params
    })
}
// 获取模板列表
export function getModelList(params) {
    return fetch({
        url: '/page/modelList',
        method: 'get',
        data: params
    })
}

// 获取发布信息
export function publishInfo(params) {
    return fetch({
        url: '/page/publishInfo',
        method: 'get',
        data: params
    })
}
//发布页面
export function publish(params) {
    return fetch({
        url: '/page/publish',
        method: 'post',
        params: params
    })
}
//修改访问密码
export function publishPwd(params) {
    return fetch({
        url: '/page/publishPwd',
        method: 'post',
        params: params
    })
}

// 修改发布访问时限
export function publishTime(params) {
    return fetch({
        url: '/page/publishTime',
        method: 'post',
        params: params
    })
}
// 修改快照信息
export function editHistorical(params) {
    return fetch({
        url: '/page/editHistorical',
        method: 'post',
        params: params
    })
}

// 创建历史快照
export function historical(params) {
    return fetch({
        url: '/page/historical',
        method: 'post',
        params: params
    })
}

// 修改快照备注
export function historiRemark(params) {
    return fetch({
        url: '/page/historiRemark',
        method: 'post',
        params: params
    })
}

// 删除历史快照
export function delHistori(params) {
    return fetch({
        url: '/page/delHistori',
        method: 'post',
        params: params
    })
}

// 分享快照
export function shareHistori(params) {
    return fetch({
        url: '/page/shareHistori',
        method: 'post',
        params: params
    })
}

// 获取历史快照列表
export function horiList(params) {
    return fetch({
        url: '/page/horiList',
        method: 'get',
        data: params
    })
}