/**
 * Created by Administrator on 2018/6/26.
 */
import fetch from '../utils/request';
// 获取主题列表
export function getSkinList() {
    return fetch({
        url: '/com/themeList',
        method: 'get'
    })
}
// 保存当前主题色
export function modifySkin(params) {
    return fetch({
        url: '/com/saveTheme',
        method: 'post',
        params: params
    })
}

// 设置默认主题色
export function defaultSkin(params){
    return fetch({
        url: '/com/defaultTheme',
        method: 'post',
        params: params
    })
}