/**
 * Created by Administrator on 2018/3/12.
 */

// 模态框组件
import modal from './other/modal/modal.vue'

// 地图组件集合
import traffic from './map/traffic.vue'; // 实时交通
import markerLayer from './map/markerLayer.vue';
import scatterLayer from './map/scatterLayer.vue';

import xDialogBox from '../components/xDialog'
import xGradient from '../components/xGradient'
import chart from './chart'
import other from './other'
import work from './work'
// import coordinated from './business/coordinated'
// import menu from './business/menu'

const components = {
    ...chart,
    ...other,
    ...work,
    // ...coordinated,
    // ...menu,
    modal,
    traffic,
    markerLayer,
    scatterLayer,
    xDialogBox,
    xGradient,
};

const geoView = {
  ...components
};
// 组件注册
function install(Vue, _) {
  Object.keys(geoView).forEach(key => {
    Vue.component(key, geoView[key]);
  });
  Vue.prototype.$DialogBox = xDialogBox;
}

const API = {
  version: '1.0',
  install,
  ...components
}


module.exports.default = module.exports = API;