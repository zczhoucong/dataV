import {
  getSlotContent,
  getStringTypeAttr,
  getStringActiveAttr
} from '../index'
import {
  family,
  weight,
  timeFormat
} from '../datadict'
const handle = function (_attr, _slots, _event, _active) {
  // 定义默认属性
  let attributes = {
    width: {
      type: 'textNumber',
      value: 350
    },
    height: {
      type: 'textNumber',
      value: 40
    },
    rotationangle: {
      type: 'textNumber',
      value: 0
    },
    transparency: {
      type: 'textNumber',
      value: 1
    },
    size: {
      type: 'textNumber',
      value: 20
    },
    color: {
      type: 'color',
      value: '#ffffff'
    },
    weight: {
      type: 'selection',
      value: 'normal',
      items: weight
    },
    family: {
      type: 'selection',
      value: 'AgencyFBBold',
      items: family
    },
    timeformatting: {
      type: 'selection',
      value: 'yyyy年MM月dd日 HH时mm分ss秒',
      items: timeFormat
    },
    intervaltime: {
      type: 'textNumber',
      value: 1000
    },
    icon: {
      type: 'upLoad',
      value: require('../../../images/com/other/time.png')
    },
    iconwidth: {
      type: 'textNumber',
      value: 30
    },
    iconheight: {
      type: 'textNumber',
      value: 30
    },
    iconmargin: {
      type: 'text',
      value: '5px 10px'
    }
  };

  let dataApi = [{
    name: '接口描述',
    children: []
  }];


  let slots = {
    default: []
  };
  let names = [{
      name: '全局样式',
      children: [{
        name: '字体大小',
        key: 'size'
      }, {
        name: '字体颜色',
        key: 'color'
      }, {
        name: '字体粗细',
        key: 'weight'
      }, {
        name: '字体类型',
        key: 'family'
      }, {
        name: '格式化',
        key: 'timeformatting'
      }, {
        name: '间隔时间',
        key: 'intervaltime'
      }]
    }, {
      name: '图标样式',
      children: [{
        name: '图标',
        key: 'icon'
      }, {
        name: "图标宽度",
        key: 'iconwidth'
      }, {
        name: "图标高度",
        key: 'iconheight'
      }, {
        name: "图标边距",
        key: 'iconmargin'
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
      }, {
        name: '旋转角度',
        key: 'rotationangle'
      }, {
        name: '透明度',
        key: 'transparency'
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

  let active = []
  // 覆盖默认属性
  Object.assign(slots, _slots);
  Object.assign(attributes, _attr);
  Object.assign(active, _active);
  let stringAttr = getStringTypeAttr(attributes);
  let activeAttr = getStringActiveAttr(active);
  let template = `<timemachine ${stringAttr} ${activeAttr}> ${subContent}</timemachine>`;
  return {
    template,
    attributes,
    names,
    dataApi,
    active
  }
};
export default handle;