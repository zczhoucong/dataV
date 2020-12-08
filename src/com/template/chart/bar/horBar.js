/*
 * @Author: 周聪
 * @Date: 2019-05-31 15:41:37
 * @LastEditors: 周聪
 * @LastEditTime: 2019-07-09 16:18:31
 * @Description: 水平柱图
 */

import {
  getSlotContent,
  getStringTypeAttr
} from '../../index'
import {
  family,
  weight,
  barColor
} from '../../datadict'
import {
  gridName,
  labelName,
  tickName,
  sizeName
} from './base'
import {
  gridAttr,
  labelAttr,
  tickAttr,
  sizeAttr,
  dataAttr
} from './baseAttr'
import {
  getTheme
} from '@/utils/assist'
const handle = function (_attr, _slots, _events) {
  const theme = getTheme()
  // 定义默认属性
  let attributes = {
    font: {
      type: 'selection',
      value: 'AgencyFBBold',
      items: family
    },
    barWidth: {
      type: 'number',
      value: 30
    },
    barBack: {
      type: 'color',
      value: 'rgba(255,255,255,0.25)'
    },
    color: {
      type: 'color',
      value: '#FFF'
    },
    barNumbers: {
      type: 'radio',
      value: '单色',
      items: barColor
    },
    barColor1: {
      type: 'barColor',
      value: theme[0]
    },
    barColor2: {
      type: 'barColor',
      value: theme[1]
    },
    xShow: {
      type: 'switch',
      value: true
    },
    rotate: {
      type: 'textNumber',
      value: 0
    },
    xColor: {
      type: 'color',
      value: '#fff'
    },
    xFontWeight: {
      type: 'selection',
      value: 'normal',
      items: weight
    },
    xFontSize: {
      type: 'number',
      value: 14
    },
    ftSize: {
      type: 'number',
      value: 14
    },
    yShow: {
      type: 'switch',
      value: true
    },
    yName: {
      type: 'text'
    },
    yColor: {
      type: 'color',
      value: '#fff'
    },
    yFontWeight: {
      type: 'selection',
      value: 'normal',
      items: weight
    },
    yFontSize: {
      type: 'number',
      value: 14
    },
    isSort: {
      type: 'switch',
      value: true
    },
    inverse: {
      type: 'switch',
      value: true
    },
    tipIsShow: {
      type: 'switch',
      value: true
    },
    tipBgColor: {
      type: 'color',
      value: ''
    },
    staticData: {
      type: 'Object',
      value: [{
          name: '井盖丢失',
          value: 198
        }, {
          name: '噪音扰民',
          value: 220
        },
        {
          name: '交通拥堵',
          value: 167
        }, {
          name: '投诉政府不作为',
          value: 145
        }, {
          name: '街面暴露垃圾',
          value: 256
        }
      ]
    },
    x: {
      type: 'text',
      value: 'name'
    },
    y: {
      type: 'text',
      value: 'value'
    },
  };
  dataAttr.autoReplay.value = false
  Object.assign(attributes, gridAttr, labelAttr, tickAttr, sizeAttr, dataAttr)
  // 样式设置命名
  let names = [{
      name: '全局样式',
      children: [{
        name: '字体',
        key: 'font'
      }, {
        name: '字体颜色',
        key: 'color'
      }, {
        name: '字体大小',
        key: 'ftSize'
      }, {
        name: '柱子宽度',
        key: 'barWidth'
      }, {
        name: '柱子背景色',
        key: 'barBack'
      }]
    }, gridName, labelName, {
      name: 'x 轴',
      fixed: 'xShow',
      children: [{
        name: '显示',
        key: 'xShow'
      }, {
        name: '旋转角度',
        key: 'rotate'
      }, {
        name: '颜色',
        key: 'xColor'
      }, {
        name: '字体粗细',
        key: 'xFontWeight'
      }, {
        name: '字号',
        key: 'xFontSize'
      }, ]
    }, {
      name: 'y 轴',
      fixed: 'yShow',
      children: [{
          name: '显示',
          key: 'yShow'
        }, {
          name: '颜色',
          key: 'yColor'
        }, {
          name: '是否反转',
          key: 'inverse'
        }, {
          name: '字体粗细',
          key: 'yFontWeight'
        }, {
          name: '字号',
          key: 'yFontSize'
        }, {
          name: '单位',
          key: 'yName'
        },
        {
          name: '是否排序',
          key: 'isSort'
        }
      ]
    }, tickName, {
      name: '数据系列',
      children: [{
        name: '单双色',
        key: 'barNumbers'
      }, {
        name: '系列颜色1',
        key: 'barColor1'
      }, {
        name: '系列颜色2',
        key: 'barColor2'
      }, ]
    }, sizeName,
    {
      name: '提示框',
      children: [{
          name: '是否显示',
          key: 'tipIsShow'
        },
        {
          name: '背景色',
          key: 'tipBgColor'
        }
      ]
    }
  ];
  let dataApi = [{
    name: '接口描述',
    children: [{
      name: '类目',
      type: 'must',
      key: 'x'
    }, {
      name: '值',
      type: 'must',
      key: 'y'
    }]
  }];

  let events = [{
    name: '点击事件',
    type: 'click',
    children: [{
      xid: 1,
      event: `() => {          
return &t& this.$DialogBox({
    href: 'http://www.bejson.com'
}); &t&
               }`
    }]
  }];

  let slots = {
    default: []
  };
  // 覆盖默认属性
  Object.assign(slots, _slots);
  Object.assign(attributes, _attr);
  Object.assign(events, _events);
  //获取插槽模板内容
  var subContent = getSlotContent(slots)
  //设置当前组件的slot
  if (attributes.slot && attributes.slot !== 'default') {
    attributes.slot = {
      type: 'text',
      value: attributes.slot
    }
  } else {
    attributes.slot = {
      type: 'text',
      value: ''
    }
  }
  // 组件参数赋值
  let stringAttr = getStringTypeAttr(attributes);
  let template = `<hor-Bar @callback="bindEvent" @count="count" ${stringAttr}>${subContent}</hor-Bar>`;
  return {
    template,
    attributes,
    names,
    dataApi,
    events
  }
};
export default handle;