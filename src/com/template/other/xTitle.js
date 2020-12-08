/**
 * Created by Administrator
 */
import {getSlotContent, getStringTypeAttr} from '../index'
import {direction,family,weight} from '../datadict'
const handle = function (_attr, _slots) {
// 定义默认属性
    let attributes = {
        text: {
            type: 'text',
            value: '测试'
        },
        href: {
            type: 'text',
            value: ''
        },
        target: {
            type: 'switch',
            value: false
        },
        direction: {
            type: 'selection',
            value: 'horizontal',
            items:direction
        },
        family: {
            type: 'selection',
            value: 'Microsoft Yahei',
            items: family
        },
        size: {
            type: 'number',
            value: 22
        },
        weight: {
            type: 'selection',
            value: 'bold',
            items: weight
        },
        color: {
            type: 'color',
            value: '#fff'
        },
        bgColor: {
            type: 'color',
            value: ''
        },
        bgRadius: {
            type: 'number',
            value: 0
        },
        space: {
            type: 'number',
            value: 10
        },
        width: {
            type: 'textNumber',
            value: 250
        },
        height: {
            type: 'textNumber',
            value: 100
        },
    };
    let names = [{
        name: '文本内容',
        key: 'text'
    }, {
        name: '文本样式',
        children: [{
            name: '字体',
            key: 'family'
        }, {
            name: '字体粗细',
            key: 'weight'
        }, {
            name: '字号大小',
            key: 'size'
        }, {
            name: '文字间隔',
            key: 'space'
        }, {
            name: '文本方向',
            key: 'direction'
        }, {
            name: '文本颜色',
            key: 'color'
        }]
    }, {
        name:'背景样式',
        children:[{
            name: '背景颜色',
            key: 'bgColor'
        },{
            name: '背景圆角',
            key: 'bgRadius'
        }]
    },{
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
    let template = `<x-title ${stringAttr}>${subContent}</x-title>`;

    return {template, attributes, names}
};
export default handle;