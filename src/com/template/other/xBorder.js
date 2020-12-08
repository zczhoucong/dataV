/**
 * Created by Administrator
 */
import {getSlotContent, getStringTypeAttr} from '../index'
import {boxType} from '../datadict'
const handle = function (_attr, _slots) {
// 定义默认属性
    let attributes = {
        type: {
            type: 'selection',
            value: 'box1',
            items: boxType
        },
        width: {
            type: 'textNumber',
            value: 400
        },
        height: {
            type: 'textNumber',
            value: 200
        }
    };
    let slots = {
        default: []
    };
    let names = [{
        name: '边框',
        key: 'type'
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

    let stringAttr = getStringTypeAttr(attributes);
    let template = `<x-border ${stringAttr}> ${subContent}</x-border>`;

    return {template, attributes, names}
};
export default handle;