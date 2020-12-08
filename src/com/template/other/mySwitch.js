import {
  getSlotContent,
  getStringTypeAttr,
  getStringActiveAttr
} from '../index'
const handle = function (_attr, _slots, _event, _active) {
  // 定义默认属性
  let attributes = {
    activeColor: {
      type: 'color',
      value: '#3498db'
    },
    inactiveColor: {
      type: 'color',
      value: '#dcdfe6'
    },
    isDisabled: {
      type: 'switch',
      value: false
    },
    isChecked: {
      type: 'switch',
      value: true
    },
    width: {
      type: 'textNumber',
      value: 60
    },
    height: {
      type: 'textNumber',
      value: 24
    },
  }
  let names = [{
      name: '样式',
      children: [

        {
          name: '高度',
          key: 'height'
        },
        {
          name: '宽度',
          key: 'width'
        }, {
          name: '打开颜色',
          key: 'activeColor'
        },
        {
          name: '关闭颜色',
          key: 'inactiveColor'
        }
      ]
    },
    {
      name: '操作',
      children: [{
          name: '是否禁用',
          key: 'isDisabled'
        },
        {
          name: '是否选中',
          key: 'isChecked'
        }
      ]
    }
  ]
  let slots = {
    default: []
  }
  let dataApi = [{
    name: '接口描述',
    children: [{
      name: '布尔值',
      type: 'must',
      key: 'value'
    }]
  }]
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
    name: 'switch响应事件',
    enable: false,
    children: [{
      name: 'switch值',
      default: 0,
      key: 'value',
      value: 'value'
    }]
  }]

  // 覆盖默认属性
  Object.assign(slots, _slots)
  Object.assign(attributes, _attr)
  Object.assign(active, _active);

  let stringAttr = getStringTypeAttr(attributes)
  let activeAttr = getStringActiveAttr(active);
  //  
  let template = `<my-switch ${stringAttr} ${activeAttr}>${subContent}</my-switch>`
  return {
    template,
    attributes,
    names,
    dataApi,
    active
  }
}
export default handle