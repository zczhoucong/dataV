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
      value: 450
    },
    height: {
      type: 'textNumber',
      value: 260
    },
    step: {
      type: 'textNumber',
      value: 0.5
    },
    limitMoveNum: {
      type: 'textNumber',
      value: 4
    },

    tbSize: {
      type: 'textNumber',
      value: 14
    },
    tbHeight: {
      type: 'textNumber',
      value: 20
    },
    tbLineHeight: {
      type: 'textNumber',
      value: 20
    },
    tbColor: {
      type: 'color',
      value: '#848eaa'
    },
    tsSize: {
      type: 'textNumber',
      value: 16
    },
    tsHeight: {
      type: 'textNumber',
      value: 30
    },
    tsLineHeight: {
      type: 'textNumber',
      value: 30
    },
    tsColor: {
      type: 'color',
      value: '#848eaa'
    },
    bSize: {
      type: 'textNumber',
      value: 14
    },
    bHeight: {
      type: 'textNumber',
      value: 20
    },
    bLineHeight: {
      type: 'textNumber',
      value: 20
    },
    bColor: {
      type: 'color',
      value: '#848eaa'
    },
    sSize: {
      type: 'textNumber',
      value: 16
    },
    sHeight: {
      type: 'textNumber',
      value: 30
    },
    sLineHeight: {
      type: 'textNumber',
      value: 30
    },
    sColor: {
      type: 'color',
      value: '#1b428d'
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
        'primaryKey': 0,
        'steps': '上报',
        'role': "巡查员",
        'name': '张天虹',
        'time': "14:23",
        'address': '大中桥镇江华社区东门口',
        'content': '暴露垃圾',
        'theme': '#27636E'
      }, {
        'primaryKey': 1,
        'steps': '处置',
        'role': "巡查员",
        'name': '李志刚',
        'time': "14:04",
        'address': '东山街道建设路与人民东路交叉口',
        'content': '非法小广告',
        'theme': '#1E3775'
      }, {
        'primaryKey': 2,
        'steps': '上报',
        'role': "巡查员",
        'name': '张天虹',
        'time': "14:23",
        'address': '东山街道建设路与人民东路交叉口',
        'content': '非法小广告',
        'theme': '#2A154D'
      }, {
        'primaryKey': 3,
        'steps': '上报',
        'role': "巡查员",
        'name': '张天虹',
        'time': "14:23",
        'address': '东山街道建设路与人民东路交叉口',
        'content': '非法小广告',
        'theme': '#343133'
      }]
    },
    primaryKey: {
      type: 'text',
      value: 'primaryKey'
    },
    steps: {
      type: 'text',
      value: 'steps'
    },
    role: {
      type: 'text',
      value: 'role'
    },
    name: {
      type: 'text',
      value: 'name'
    },
    time: {
      type: 'text',
      value: 'time'
    },
    address: {
      type: 'text',
      value: 'address'
    },
    content: {
      type: 'text',
      value: 'content'
    },
    theme: {
      type: 'text',
      value: 'theme'
    }
  };

  let dataApi = [{
    name: '接口描述',
    children: [{
      name: '主键',
      type: 'must',
      key: 'primaryKey'
    }, {
      name: '步骤',
      type: 'must',
      key: 'steps'
    }, {
      name: '角色',
      type: 'must',
      key: 'role'
    }, {
      name: '名称',
      type: 'must',
      key: 'name'
    }, {
      name: '时间',
      type: 'must',
      key: 'time'
    }, {
      name: '地址',
      type: 'must',
      key: 'address'
    }, {
      name: '内容',
      type: 'must',
      key: 'content'
    }, {
      name: '主题',
      type: 'must',
      key: 'theme'
    }]
  }];


  let slots = {
    default: []
  };
  let names = [{
      name: '全局样式',
      children: [{
        name: '轮播间隔',
        key: 'step'
      }, {
        name: '轮播条数',
        key: 'limitMoveNum'
      }]
    }, {
      name: '头部大标题样式',
      children: [{
        name: '文字大小',
        key: 'tbSize'
      }, {
        name: '文字高度',
        key: 'tbHeight'
      }, {
        name: '文字行高',
        key: 'tbLineHeight'
      }, {
        name: '文字颜色',
        key: 'tbColor'
      }]
    }, {
      name: '头部小标题样式',
      children: [{
        name: '文字大小',
        key: 'tsSize'
      }, {
        name: '文字高度',
        key: 'tsHeight'
      }, {
        name: '文字行高',
        key: 'tsLineHeight'
      }, {
        name: '文字颜色',
        key: 'tsColor'
      }]
    }, {
      name: '内容大标题样式',
      children: [{
        name: '文字大小',
        key: 'bSize'
      }, {
        name: '文字高度',
        key: 'bHeight'
      }, {
        name: '文字行高',
        key: 'bLineHeight'
      }, {
        name: '文字颜色',
        key: 'bColor'
      }]
    }, {
      name: '内容小标题样式',
      children: [{
        name: '文字大小',
        key: 'sSize'
      }, {
        name: '文字高度',
        key: 'sHeight'
      }, {
        name: '文字行高',
        key: 'sLineHeight'
      }, {
        name: '文字颜色',
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

  let active = [{
    name: '按钮切换点击事件',
    enable: false,
    children: [{
      name: '新的切换key值',
      default: 0,
      key: 'primaryKey',
      value: ''
    }]
  }]

  // 覆盖默认属性
  Object.assign(slots, _slots);
  Object.assign(attributes, _attr);
  Object.assign(active, _active);
  let stringAttr = getStringTypeAttr(attributes);
  let activeAttr = getStringActiveAttr(active);
  let template = `<oneBusiness ${stringAttr} ${activeAttr}> ${subContent}</oneBusiness>`;
  return {
    template,
    attributes,
    names,
    dataApi,
    active
  }
};
export default handle;