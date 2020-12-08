/**
 * Created by Administrator on 2019-5-15
 * 全屏
 */

import { getSlotContent, getStringTypeAttr } from '../index'
const handle = function(_attr, _slots) {
    // 定义默认属性
    let attributes = {
        fullImg: {
            type: 'upLoad',
            value: ''
        },
        exitImg: {
            type: 'upLoad',
            value: ''
        },
        width: {
            type: 'textNumber',
            value: 150
        },
        height: {
            type: 'textNumber',
            value: 150
        },        
        bgColor: {
            type: 'color',
            value: 'rgba(91, 87, 88, 0.4)'
        },
        bgRadius: {
            type: 'textNumber',
            value: 75
        },
    };
    let slots = {
        default: []
    };
    let names = [{
        name: '全屏显示',
        key: 'fullImg'
    }, {
        name: '退出全屏',
        key: 'exitImg'
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
    let template = `<full-screen ${stringAttr}> ${subContent}</full-screen>`;

    return {template, attributes, names}
};
export default handle;