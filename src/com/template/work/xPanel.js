import {
  getSlotContent,
  getStringTypeAttr,
  getStringActiveAttr
} from '../index'
const handle = function (_attr, _slots, _event, _active) {
  // 定义默认属性
  let attributes = {
    width: {
      type: 'textNumber',
      value: 175
    },
    height: {
      type: 'textNumber',
      value: 88
    },
    isRotation: {
      type: 'switch',
      value: true
    },
    rotationNum: {
      type: 'textNumber',
      value: 5
    },
    isTarget: {
      type: 'switch',
      value: false
    },
    href: {
      type: 'text',
      value: ''
    },
    target: {
      type: 'switch',
      value: false
    },
    icon: {
      type: 'upLoad',
      value: require('../../list/other/modal/panel/sj.png')
    },
    iconWidth: {
      type: 'textNumber',
      value: 23
    },
    iconHeight: {
      type: 'textNumber',
      value: 23
    },
    bFontText: {
      type: 'text',
      value: '今日受理'
    },
    bFontSize: {
      type: 'textNumber',
      value: 18
    },
    bColor: {
      type: 'color',
      value: '#ffffff'
    },
    sFontText: {
      type: 'text',
      value: '109'
    },
    sFontSize: {
      type: 'textNumber',
      value: 16
    },
    sColor: {
      type: 'color',
      value: '#e6cc96'
    },
    dataType: { // 数据源类型
      type: 'text',
      value: 'Static'
    },
    apiUrl: {
      type: 'text',
      value: ''
    },
    staticData: {
      type: 'Object',
      value: [{
        'label': '今日受理',
        'value': 109,
        'pkey': 'jrsl'
      }]
    }
  };



  let slots = {
    default: []
  };
  let names = [{
      name: '全局样式',
      children: [{
        name: '是否旋转',
        key: 'isRotation'
      }, {
        name: '旋转速度',
        key: 'rotationNum'
      }]
    }, {
      name: '超链接配置',
      children: [{
        name: '是否开启',
        key: 'isTarget'
      }, {
        name: '超链接',
        key: 'href'
      }, {
        name: '新开窗口',
        key: 'target'
      }]
    }, {
      name: '图标样式',
      children: [{
        name: '图标',
        key: 'icon'
      }, {
        name: "图标宽度",
        key: 'iconWidth'
      }, {
        name: "图标高度",
        key: 'iconHeight'
      }]
    }, {
      name: '大标题样式',
      children: [{
        name: "文本内容",
        key: 'bFontText'
      }, {
        name: "字体大小",
        key: 'bFontSize'
      }, {
        name: "字体颜色",
        key: 'bColor'
      }]
    }, {
      name: '小标题样式',
      children: [{
        name: "文本内容",
        key: 'sFontText'
      }, {
        name: "字体大小",
        key: 'sFontSize'
      }, {
        name: "字体颜色",
        key: 'sColor'
      }]
    },
    {
      name: '图表尺寸',
      children: [{
        name: '图表宽度',
        key: 'width'
      }, {
        name: '图表高度',
        key: 'height'
      }]
    }
  ];

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


  // 覆盖默认属性
  Object.assign(slots, _slots);
  Object.assign(attributes, _attr);
  let stringAttr = getStringTypeAttr(attributes);
  let template = `<xPanel ${stringAttr}> ${subContent}</xPanel>`;
  return {
    template,
    attributes,
    names
  }
};
export default handle;