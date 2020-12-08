/**
 * Created by Administrator on 2018/3/15.
 */

import axios from 'axios';
// // 创建axios 实例
const service = axios.create({
    baseURL: config.baseApiUrl,
    // timeout: 10000
});
service.defaults.headers.post['Content-Type'] = 'application/json'
// 自定义判断元素类型JS
function toType(obj) {
    return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
  }
  // 参数过滤函数
  function filterNull(o) {
    for (var key in o) {
      if (o[key] === null) {
        delete o[key]
      }
      if (toType(o[key]) === 'string') {
        o[key] = o[key].trim()
      } else if (toType(o[key]) === 'object') {
        o[key] = filterNull(o[key])
      } else if (toType(o[key]) === 'array') {
        o[key] = filterNull(o[key])
      }
    }
    return o
  }
// request 拦截器
service.interceptors.request.use(config => {
    const method = config.method.toUpperCase()
    let _params = config.data
    if (_params) {
      _params = filterNull(_params)
    }
    if (method === 'POST' || method === 'PUT') {
      config.data = _params
    }
    if (method === 'GET' || method === 'DELETE') {
      config.params = _params
    }
    return config;
}, error => {
    console.log(error); // for debug
    Promise.reject(error);
});

// response 拦截器
service.interceptors.response.use(
    response => {        
        return response.data
    },
    /**
     * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
     * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
     */
    //  response=>{
    //      debugger;
    //     const res = response.data;
    //     if (res.code !== 20000) {
    //         return Promise.reject(error);
    //     } else {
    //         return response.data;
    //     }
    // },
    err => {
        if (err && err.response) {
            switch (err.response.status) {
                case 400: err.message = '请求错误(400)' ; break;
                case 401: err.message = '未授权，请重新登录(401)'; break;
                case 403: err.message = '拒绝访问(403)'; break;
                case 404: err.message = '请求出错(404)'; break;
                case 408: err.message = '请求超时(408)'; break;
                case 500: err.message = '服务器错误(500)'; break;
                case 501: err.message = '服务未实现(501)'; break;
                case 502: err.message = '网络错误(502)'; break;
                case 503: err.message = '服务不可用(503)'; break;
                case 504: err.message = '网络超时(504)'; break;
                case 505: err.message = 'HTTP版本不受支持(505)'; break;
                default: err.message = `连接出错(${err.response.status})!`;
            }
        }else{
            err.message = '连接服务器失败!'
        }
        return Promise.reject(err);
    }
);

export default service;