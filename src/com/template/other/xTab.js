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
      value: 160
    },
    height: {
      type: 'textNumber',
      value: 30
    },
    size: {
      type: 'textNumber',
      value: 15
    },
    lineHeight: {
      type: 'textNumber',
      value: 25
    },
    selectColor: {
      type: 'color',
      value: '#ffffff'
    },
    color: {
      type: 'color',
      value: '#6283bf'
    },

    bWidth: {
      type: 'textNumber',
      value: 70
    },
    bHeight: {
      type: 'textNumber',
      value: 30
    },
    bSpacing: {
      type: 'textNumber',
      value: 10
    },

    background: {
      type: 'upLoad',
      value: require('../../list/other/modal/default.png')
    },
    selectBackground: {
      type: 'upLoad',
      value: require('../../list/other/modal/selected.png')
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
        'btnLabel': '事件',
        'btnKey': 0

      }, {
        'btnLabel': '部件',
        'btnKey': 1
      }]
    },
    btnKey: {
      type: 'text',
      value: 'btnKey'
    },
    btnLabel: {
      type: 'text',
      value: 'btnLabel'
    }
  };

  let dataApi = [{
    name: '接口描述',
    children: [{
      name: '类目',
      type: 'must',
      key: 'btnLabel'
    }, {
      name: '值',
      type: 'must',
      key: 'btnKey'
    }]
  }];


  let slots = {
    default: []
  };
  let names = [{
      name: '全局样式',
      children: [{
        name: '文字大小',
        key: 'size'
      }, {
        name: '文字行高',
        key: 'lineHeight'
      }, {
        name: '文字选中颜色',
        key: 'selectColor'
      }, {
        name: '文字默认颜色',
        key: 'color'
      }]
    }, {
      name: '按钮样式',
      children: [{
        name: "按钮宽度",
        key: 'bWidth'
      }, {
        name: "按钮高度",
        key: 'bHeight'
      }, {
        name: "按钮间距",
        key: 'bSpacing'
      }, {
        name: "按钮默认背景",
        key: 'background'
      }, {
        name: "按钮选中背景",
        key: 'selectBackground'
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

  let active = [{
    name: '按钮切换点击事件',
    enable: false,
    children: [{
      name: '新的切换key值',
      default: 0,
      key: 'btnKey',
      value: ''
    }]
  }]

  // 覆盖默认属性
  Object.assign(slots, _slots);
  Object.assign(attributes, _attr);
  Object.assign(active, _active);
  let stringAttr = getStringTypeAttr(attributes);
  let activeAttr = getStringActiveAttr(active);
  let template = `<xTab ${stringAttr} ${activeAttr}> ${subContent}</xTab>`;
  return {
    template,
    attributes,
    names,
    dataApi,
    active
  }
};
export default handle;