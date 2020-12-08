/**
 * Created by 高春超 on 2018/4/28.
 * 实时交通模板
 */
import {getSlotContent, getStringTypeAttr} from '../index'

const handle = function (_attr, _slots) {
// 定义默认属性
    let attributes = {
        width: {
            type: 'textNumber',
            value: 1590
        },
        height: {
            type: 'textNumber',
            value: 675
        },
    };
    let names = [{
        name: '图表尺寸',
        children: [{
            name: '图表宽度',
            key: 'width'
        }, {
            name: '图表高度',
            key: 'height'
        }]
    }]
    let slots = {
        default: []
    };
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
    let template = `<traffic ${stringAttr}>${subContent}</traffic>`;

    return {template, attributes, names}
};
export default handle;