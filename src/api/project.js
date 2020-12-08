/**
 * Created by Administrator on 2018/4/2.
 */
import request from '../utils/request';
// 获取项目列表
export function getProjectList() {
    return request({
        url: '/project/list',
        method: 'get'
    })
}
// 删除项目
export function delProject(params){
    return request({
        url: '/project/delete',
        method: 'post',
        params: params
    })
}
// 新增项目
export function addProject(params){
    return request({
        url: '/project/add',
        method: 'post',
        params: params
    })
}
// 修改项目名称
export function editName(params) {
    return request({
        url: '/project/edit',
        method: 'post',
        params: params
    })
}
// 项目展示
export function show(params) {
    return request({
        url: '/project/show',
        method: 'post',
        params: params
    })
}