/**
 * Created by Administrator on 2018/3/6.
 */
import Other from './other';
import Chart from './chart'
import Map from './map'
import Work from './work'
import coordinated from './business/coordinated'

const getTemplate = function (info, _attr = {}, _slot = {}, _event = {}, _active = {}) {
  let component;
  switch (info.ptype) {
    case 'other':
      component = Other[info.type](_attr, _slot, _event, _active);
      break;
    case 'chart':
      component = Chart[info.type](_attr, _slot, _event);
      break;    
    case 'work':
      component = Work[info.type](_attr, _slot, _event);
      break;      
    case 'map':
      component = Map[info.type](_attr, _slot);
      break;
    case 'coordinated':
      component = coordinated[info.type](_attr, _slot, _event);
      break;
  }
  //为了不让二次获取模板时丢失slot信息
  component.slot = component.attributes.slot.value

  //为了不让slot出现在属性面板
  delete component.attributes.slot

  //没有class属性的，添加class属性
  if (!component.attributes.class) {
    component.attributes.class = {
      type: 'text',
        value: ''
    }
  }

  //添加组件标识 (info.id是唯一标识)
  component.template = `<div data-component-active  class="com-border">${component.template}</div>`;
  component.info = info;
  return component;
}
const getSlotContent = function (slots) {
  let inner = '';
  let components = JSON.parse(JSON.stringify($Vue.$store.state.components));
  Object.keys(slots).forEach(slot => {
    slots[slot].forEach(({
      id
    }) => {
      let component = components.find(component => component.info.id === id);
      let children = [];
      Object.keys(component.slots).forEach(slot => {
        component.slots[slot].forEach(item => children.push(item))
      });
      //设置当前组件的slot ，getTemplate中根据这个属性设置模板的slot，不存在则不设置
      component.attributes.slot = component.slot;
      component = getTemplate(component.info, component.attributes, component.slots);
      // 为嵌套的组件添加id属性 具备id属性 才能选中后属性视图内容变更
      if (component.template.indexOf(`id="${id}"`) == -1) {
        component.template = component.template.replace(' ', ` id="${id}" `)
      }
      inner += component.template;
    })
  })
  return inner;
}

const getStringTypeAttr = function (attributes) {
  // value为空的不添加到模板中
  let stringAttr = ''
  Object.keys(attributes).forEach(key => {
    let attrKey
    let arr = ['text', 'selection', 'radio', 'icon', 'ionicon', 'color', 'upLoad', 'barColor'] //这些类型都不用加bind
    if (arr.includes(attributes[key].type) || attributes[key].notBind) {
      attrKey = key
    } else {
      attrKey = `:${key}`
    }
    let attr = "";
    if (typeof attributes[key].value == 'object') {
      attr = (attributes[key].value != undefined && attributes[key].value != '') ? `${attrKey}='${JSON.stringify(attributes[key].value)}'\n` : ''
    } else {
      attr = (attributes[key].value != undefined && attributes[key].value.toString().length > 0) ? `${attrKey}="${attributes[key].value}"\n` : ''
    }
    stringAttr += attr
  })
  return stringAttr
}

const getStringActiveAttr = function (attributes) {
  let keys = {};
  attributes.forEach(key => {
    if (key.enable) {
      key.children.forEach(child => {
        //如果keys中含有重复的value值，则pass
        keys[`${child.key}`] = `${child.value}`
      })
    }
  });
  return `:activeAttr='${JSON.stringify(keys)}'`;
}

export {
  getTemplate,
  getSlotContent,
  getStringTypeAttr,
  getStringActiveAttr
}