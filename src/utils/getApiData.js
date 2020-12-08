/**
 * Created by Administrator on 2018/5/25.
 */
import axios from 'axios';
import store from '../vuex/store'
import {parse_url} from './assist'
import {getSkinList} from '@/api/skin'
export function getApiData(url) {
    return new Promise((resolve, reject) => {
        axios.get(url).then(resp => {
            if (resp.data && resp.data.resCode === 1) {
                resolve({
                    data: JSON.parse(JSON.stringify(resp.data)).data,
                    code: 0
                });
            } else {
                resolve({
                    code: 1,
                    data: '消息响应格式错误'
                });
            }
        }).catch(error => {
            reject({
                code: 1,
                data: error.message
            });
        })
    })
}
 
export function GetReadyRequest(url) {        
    const keys = store.state.keys;
    const params = parse_url(url)
    if (keys.length === 0 && params.length === 0) {
        return url;
    } else {
        const keyList = Object.keys(keys);
        const paramList=Object.keys(params);
        paramList.forEach(i => {
            if (keyList.includes(params[i])) {
                url= url.replace(`${i}=:${params[i]}`,`${i}=${keys[params[i]]}`);
            }
        });
        // 关闭交互响应后原webapi交互参数未修改
        if(keyList.length===0&&url.indexOf('=:')>0){
            return ''
        }
        return url;
    }
}

export async function getApiSource(dataType, apiUrl, staticData) {
    let basciData = [];
    if (dataType === 'WebApi') {        
        // 判断apiurl中是否含有关键字key，如果有，则进行替换
        apiUrl=GetReadyRequest(apiUrl);
        if(apiUrl===''){
            return  JSON.parse(JSON.stringify(staticData));
        }
        await getApiData(apiUrl).then(resp => {
            basciData = JSON.parse(JSON.stringify(resp.data));
        }).catch(err => {
            basciData = JSON.parse(JSON.stringify(staticData));
        });
    } else {
        basciData = JSON.parse(JSON.stringify(staticData));
    }
    return basciData;
}