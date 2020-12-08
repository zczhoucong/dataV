import {
  getSlotContent,
  getStringTypeAttr,
  getStringActiveAttr
} from '../index'
import {
  family,
  weight,
  cardStyle
} from '../datadict'
const handle = function (_attr, _slots, _event, _active) {
  // 定义默认属性
  let attributes = {
    family: {
      type: 'selection',
      value: 'AgencyFBBold',
      items: family
    },
    radius: {
      type: 'number',
      value: 'number',
      value: 4
    },
    initValue: {
      type: 'text',
      value: ''
    },
    borderColor: {
      type: 'color',
      value: '#fff'
    },
    dropBgColor: {
      type: 'color',
      value: 'rgba(256,256,256,0)'
    },
    hoverDropBgColor: {
      type: 'color',
      value: '#f5f7fa'
    },
    color: {
      type: 'color',
      value: '#666'
    },
    bgColor: {
      type: 'color',
      value: 'rgba(256,256,256,0)'
    },
    width: {
      type: 'textNumber',
      value: 200
    },
    height: {
      type: 'textNumber',
      value: 40
    },
    dropMaxHeight: {
      type: 'textNumber',
      value: 160
    },
    dataType: {
      // 数据源类型
      type: 'text',
      value: 'Static'
    },
    apiUrl: {
      type: 'text',
      value: ''
    },
    placeHolder: {
      type: 'text',
      value: '请选择'
    },
    size: {
      type: 'number',
      value: 12
    },
    text: {
      type: 'text',
      value: ''
    },
    staticData: {
      type: 'Object',
      value: [{
          text: 'New York',
          label: 'New York'
        },
        {
          text: 'London',
          label: 'London'
        },
        {
          text: 'Sydney',
          label: 'Sydney'
        },

      ]
    }
  }
  let names = [{
      name: '选择器样式',
      children: [{
          name: '字体',
          key: 'family'
        },
        {
          name: '占位文字',
          key: 'placeHolder'
        },
        {
          name: '字号',
          key: 'size'
        },
        {
          name: '边框圆角',
          key: 'radius'
        },
        {
          name: '背景颜色',
          key: 'bgColor'
        },
        {
          name: '边框颜色',
          key: 'borderColor'
        },
        {
          name: '字体颜色',
          key: 'color'
        }
      ]
    },
    {
      name: '下拉框样式',
      children: [{
          name: '背景颜色',
          key: 'dropBgColor'
        },
        {
          name: 'hover背景色',
          key: 'hoverDropBgColor'
        },
        {
          name: '下拉框最大高度',
          key: 'dropMaxHeight'
        }
      ]
    },
    {
      name: '图表尺寸',
      children: [{
          name: '图表宽度',
          key: 'width'
        },
        {
          name: '图表高度',
          key: 'height'
        }
      ]
    },
    {
      name: '下拉框初始值',
      children: [{
        name: '初始值',
        key: 'initValue'
      }, ]
    }
  ]
  let slots = {
    default: []
  }
  let dataApi = [{
    name: '接口描述',
    children: [{
      name: '字符串',
      type: 'must',
      key: 'text'
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
    name: '下拉框响应事件',
    enable: false,
    children: [{
      name: '下拉框值',
      default: 0,
      key: 'text',
      value: 'text'
    }]
  }]

  // 覆盖默认属性
  Object.assign(slots, _slots)
  Object.assign(attributes, _attr)
  Object.assign(active, _active);

  let stringAttr = getStringTypeAttr(attributes)
  let activeAttr = getStringActiveAttr(active);
  let template = `<drop-down-selector ${stringAttr} ${activeAttr}>${subContent}</drop-down-selector>`

  return {
    template,
    attributes,
    names,
    dataApi,
    active
  }
}
export default handle