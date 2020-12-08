/**
 * Created by 高春超 on 2018年6月4日11:39:07
 * 弧形柱图
 */
import { getSlotContent, getStringTypeAttr } from '../../index'
import { family } from '../../datadict'
import {sizeName} from './base'
import {sizeAttr} from './baseAttr'
import {getTheme} from '@/utils/assist'
const handle = function(_attr, _slots, _events) {
    const theme=getTheme()  
    // 定义默认属性
    let attributes = {
        startColor: {
            type: 'color',
            value: theme[0]
        },
        endColor: {
            type: 'color',
            value: theme[1]
        },
        ringValue: {
            type: 'number',
            value: 70
        },
        barInterval: {
            type: 'number',
            value: 10
        },
        barWidth: {
            type: 'number',
            value: 20
        },
        barNum: {
            type: 'textNumber',
            value: 5
        },
        fontFamily: {
            type: 'selection',
            value: 'AgencyFBBold',
            items: family
        },

        fontColor: {
            type: 'color',
            value: '#fff'
        },
        fontSize: {
            type: 'number',
            value: 14
        },

        itemGap: {
            type: 'textNumber',
            value: 15
        }, 
        dataType: { // 数据源类型
            type: 'text',
            value: 'Static'
        },
        apiUrl: {
            type: 'text',
            value: ''
        },       
        staticData: {
            type: 'Object',
            value: [{
                    "text": "label_1",
                    "value": 1
                },
                {
                    "text": "label_2",
                    "value": 0.3
                },
                {
                    "text": "label_3",
                    "value": 0.5
                },
                {
                    "text": "label_4",
                    "value": 0.452
                },
                {
                    "text": "label_5",
                    "value": 0.2
                }
            ]
        },
        x: {
            type: 'text',
            value: 'text'
        },
        y: {
            type: 'text',
            value: 'value'
        }
    };
    Object.assign(attributes,sizeAttr)    
    // 样式设置命名
    let names = [{
        name: '图形属性',
        children: [{
            name: '最大弧度',
            key: 'ringValue'
        }, {
            name: '柱间距',
            key: 'barInterval'
        }, {
            name: '柱宽度',
            key: 'barWidth'
        }, {
            name: '柱子数量',
            key: 'barNum'
        }]
    }, {
        name: '文本样式',
        children: [{
            name: '字体',
            key: 'fontFamily'
        }, {
            name: '字体颜色',
            key: 'fontColor'
        }, {
            name: '字体大小',
            key: 'fontSize'
        }, {
            name: '图文间距',
            key: 'itemGap'
        }]
    }, {
        name: '扇形配置',
        children: [{
            name: '起点色值',
            key: 'startColor'
        }, {
            name: '末端色值',
            key: 'endColor'
        }]
    },sizeName];
    let dataApi = [{
        name: '接口描述',
        children: [{
            name: '文本字段',
            type: 'must',
            key: 'x'
        }, {
            name: '百分比字段',
            type: 'must',
            key: 'y'
        }]
    }];

    let events = [{
        name: '点击事件',
        type: 'click',
        children: []
    }];
    Object.assign(events, _events);
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
    // 组件参数赋值
    let stringAttr = getStringTypeAttr(attributes);

    let template = `<ring-bar @callback="bindEvent" @count="count" ${stringAttr}>${subContent}</ring-bar>`;
    return { template, attributes, names, dataApi, events }
};
export default handle;