/*
 * 圆形框
 */
import { getSlotContent, getStringTypeAttr } from '../index'
import { direction, family, weight } from '../datadict'
const handle = function(_attr, _slots) {
    // 定义默认属性
    let attributes = {


        splitLinecolor: {
            type: 'color',
            value: '#3f4d74'
        },
        splitwidth: {
            type: 'textNumber',
            value: 3
        },
        splitnumber: {
            type: 'textNumber',
            value: 50
        },
        redius: {
            type: 'textNumber',
            value: -10
        },
        width: {
            type: 'textNumber',
            value: 200
        },
        height: {
            type: 'textNumber',
            value: 200
        },
        xLocal: {
            type: 'number',
            value: 50
        },
        yLocal: {
            type: 'number',
            value: 50
        }
    };
    let names = [{
        name: '全局样式',
        children: [{
            name: '分割线颜色',
            key: 'splitLinecolor'
        }, {
            name: '分割线宽度',
            key: 'splitwidth'
        }, {
            name: '分割线数量',
            key: 'splitnumber'
        }, {
            name: '水平位置',
            key: 'xLocal'
        }, {
            name: '垂直位置',
            key: 'yLocal'
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
    let template = `<gauge ${stringAttr}>${subContent}</gauge>`;

    return { template, attributes, names }
};
export default handle;