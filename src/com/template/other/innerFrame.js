/**
 * Created by 高春超.
 * 内联框架
 * 2018年6月11日
 */

import {getSlotContent, getStringTypeAttr} from '../index'
import {iframeScroll} from '../datadict'
const handle = function (_attr, _slots) {
// 定义默认属性
    let attributes = {
        linkHref: {
            type: 'text',
            value: ''
        },
        borderShow: {
            type: 'switch',
            value: false
        },
        scrollType: {
            type: 'selection',
            value: 'frame_auto',
            items:iframeScroll
        },
        width: {
            type: 'textNumber',
            value: 200
        },
        height: {
            type: 'textNumber',
            value: 300
        }
    };
    let slots = {
        default: []
    };
    let names = [{
        name: '全局样式',
        children: [{
            name: '超链接',
            key: 'linkHref'
        }, {
            name: '隐藏边框',
            key: 'borderShow'
        }, {
            name: '框架滚动条',
            key: 'scrollType'
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

    let stringAttr = getStringTypeAttr(attributes);
    let template = `<inner-frame ${stringAttr}>${subContent}</inner-frame>`;

    return {template, attributes, names}
};
export default handle;