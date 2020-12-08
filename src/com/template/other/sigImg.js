/**
 * Created by Administrator 
 * 单张图片
 */

import {
  getSlotContent,
  getStringTypeAttr
} from '../index'
const handle = function (_attr, _slots) {
  // 定义默认属性
  let attributes = {
    background: {
      type: 'upLoad',
      value: require('../../../images/com/other/sigImg.png')
    },
    isRotation: {
      type: 'switch',
      value: false
    },
    rotationNum: {
      type: 'textNumber',
      value: 5
    },
    href: {
      type: 'text',
      value: ''
    },
    target: {
      type: 'switch',
      value: false
    },
    width: {
      type: 'textNumber',
      value: 360
    },
    height: {
      type: 'textNumber',
      value: 250
    }
  };
  let slots = {
    default: []
  };
  let names = [{
    name: '背景图',
    key: 'background'
  }, {
    name: '旋转设置',
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
      name: '超链接',
      key: 'href'
    }, {
      name: '新开窗口',
      key: 'target'
    }]
  }, {
    name: '图表尺寸',
    children: [{
      name: '图表宽度',
      key: 'width'
    }, {
      name: '图表高度',
      key: 'height'
    }]
  }];
  // 覆盖默认属性
  Object.assign(slots, _slots);
  Object.assign(attributes, _attr);

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
  let template = `<sigImg ${stringAttr}> ${subContent}</sigImg>`;

  return {
    template,
    attributes,
    names
  }
};
export default handle;