import fetch from '../utils/request';
// 获取页面详情
export function timeTransVerify(params) {
    return fetch({
        url: '/share/timetrans/verify',
        method: 'post',
        params: params
    })
}
// 验证分享密码
export function timeTransVerifyPwd(params) {
    return fetch({
        url: '/share/timetrans/verifyPwd',
        method: 'post',
        params: params
    })
}

export function timeTransConfig(params) {
    return fetch({
        url: '/share/timetrans/config',
        method: 'get',
        data: params
    })
}

export function timeTransComList(params) {
    return fetch({
        url: '/share/timetrans/comList',
        method: 'get',
        data: params
    })
}



// 获取页面详情
export function historiLoad(params) {
    return fetch({
        url: '/share/histori/verify',
        method: 'post',
        params: params
    })
}
// 验证分享密码
export function historiVerifyPwd(params) {
    return fetch({
        url: '/share/histori/verifyPwd',
        method: 'post',
        params: params
    })
}

export function historiConfig(params) {
    return fetch({
        url: '/share/histori/config',
        method: 'get',
        data: params
    })
}

export function historiComs(params) {
    return fetch({
        url: '/share/histori/comList',
        method: 'get',
        data: params
    })
}