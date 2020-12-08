import fetch from '../utils/fetch';
// 获得业务组件数据
export function getDataOfCityPerson(params) {
    return fetch({
        url: '/data/fetchBlockingInfo',
        method: 'get',
        params: params
    })
}
// 获得对标找差
export function getPageDifferData() {
    return fetch({
        url: '/data/fetchPageDifferInfo?year=2016',
        method: 'get',
    })
}