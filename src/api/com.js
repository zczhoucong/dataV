import fetch from '../utils/request';
// 保存页面组件信息
export function saveCom(data){
    return fetch({
        url: '/com/saveCom',
        method: 'post',
        data: data
    })
}

//获取页面组件列表
export function getPageComs(params) {
    return fetch({
        url: '/com/comList',
        method: 'get',
        data: params
    })
}

//删除页面组件列表
export function deleteCom(params) {
    return fetch({
        url: '/com/delete',
        method: 'post',
        params: params
    })
}