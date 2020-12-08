/**
 * 自定义面板
 * Created by Administrator
 */
import {
  getSlotContent,
  getStringTypeAttr
} from '../index'
import {
  borderStyle
} from '../datadict'
const handle = function (_attr, _slots, _events) {
  // 定义默认属性
  let attributes = {
    width: {
      type: 'textNumber',
      value: 10
    },
    height: {
      type: 'textNumber',
      value: 100
    },
    borderWidth: {
      type: 'textNumber',
      value: 0
    },
    borderColor: {
      type: 'color',
      value: 'white'
    },
    borderRadius: {
      type: 'textNumber',
      value: 4
    },
    backgroundColor: {
      type: 'color',
      value: '#65F5F3'
    },
    borderStyle: {
      type: 'selection',
      value: 'solid',
      items: borderStyle
    }
  };

  let events = [{
    name: '点击事件',
    type: 'click',
    children: []
  }];

  let slots = {
    default: []
  };
  let names = [{
      name: '全局样式',
      children: [{
        name: '背景色',
        key: 'backgroundColor'
      }]
    },
    {
      name: '边框样式',
      children: [{
        name: '类型',
        key: 'borderStyle'
      }, {
        name: '宽度',
        key: 'borderWidth'
      }, {
        name: '颜色',
        key: 'borderColor'
      }, {
        name: '圆角',
        key: 'borderRadius'
      }]
    },
    {
      name: '图表尺寸',
      children: [{
        name: '栏目宽度',
        key: 'width'
      }, {
        name: '栏目高度',
        key: 'height'
      }]
    }
  ];

  // 覆盖默认属性
  Object.assign(slots, _slots);
  Object.assign(attributes, _attr);
  // 覆盖默认方法
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

  let stringAttr = getStringTypeAttr(attributes);
  let template = `<bBlocks @callback="bindEvent" @count="count" ${stringAttr}> ${subContent}</bBlocks>`;

  return {
    template,
    attributes,
    names,
    events
  }
};
export default handle;