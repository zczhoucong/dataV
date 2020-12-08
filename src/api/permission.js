import fetch from '../utils/fetch';

// 获得用户列表
export function getUserList(params) {
    return fetch({
        url: '/sys_user/getUserList',
        method: 'get',
        params: params
    })
}
// 新增用户
export function addUser(params) {
    return fetch({
        url: '/sys_user/addUser',
        method: 'post',
        params: params
    })
}
// 修改用户(管理员修改)
export function modifyUser(params) {
    return fetch({
        url: '/sys_user/modifyUser',
        method: 'post',
        params: params
    })
}
// 修改用户(用户修改)
export function updateUser(params) {
    return fetch({
        url: 'sys_user/updateUser',
        method: 'post',
        params: params
    })
}
// 修改用户密码
export function modifyPwd(params) {
    return fetch({
        url: 'sys_user/modifyPwd',
        method: 'post',
        params: params
    })
}
// 删除用户
export function delUser(params) {
    return fetch({
        url: 'sys_user/delete',
        method: 'get',
        params: params
    })
}
// 获得角色列表(简化)
export function getRoleList(params) {
    return fetch({
        url: '/sys_user/getRoleList',
        method: 'get',
        params: params
    })
}
// 新增角色
export function addRole(params) {
    return fetch({
        url: 'sys_role/addRole',
        method: 'post',
        params: params
    })
}
// 删除角色
export function delRole(params) {
    return fetch({
        url: 'sys_role/delete',
        method: 'get',
        params: params
    })
}
// 编辑角色
export function modifyRole(params) {
    return fetch({
        url: 'sys_role/modifyRole',
        method: 'post',
        params: params
    })
}
// 用户登录后获取权限
export function getUserModule(params) {
    return fetch({
        url: 'sys_role/getUserModule',
        method: 'get',
        params: params
    })
}
// 获取菜单（权限）树
export function getModuleTree(params) {
    return fetch({
        url: 'sys_role/getModuleTree',
        method: 'get',
        params: params
    })
}
// 获得角色列表(详细)
export function getRoleListMore(params) {
    return fetch({
        url: '/sys_role/getRoleList',
        method: 'get',
        params: params
    })
}