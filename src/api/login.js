import fetch from '../utils/fetch';
// 用户登录
export function login(params) {
    return fetch({
        url: 'sys_login/login',
        method: 'post',
        params: params
    })
}
// 注销登录
export function loginOut(params) {
    return fetch({
        url: 'sys_login/loginOut',
        method: 'post',
        params: params
    })
}