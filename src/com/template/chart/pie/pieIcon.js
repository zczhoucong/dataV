/**
 * Created by 高春超
 * 带图饼图
 */
import {getSlotContent, getStringTypeAttr} from '../../index'
import {family, legendPosition, direction} from '../../datadict'
import {animationName} from './base'
import {animation} from './baseAttr'
import {getTheme} from '@/utils/assist'
const handle = function (_attr, _slots, _events) {
    const theme=getTheme()  
// 定义默认属性
    let attributes = {
        numFont: {
            type: 'selection',
            value: 'AgencyFBBold',
            items: family
        },
        innerR: {
            type: 'number',
            value: 45
        },
        outerR: {
            type: 'number',
            value: 70
        },
        imgSize: {
            type: 'textNumber',
            value: 40
        },
        imgSource: {
            type: 'upLoad',
        },
        roseType: {
            type: 'switch',
            value: false
        },
        labelShow: {
            type: 'switch',
            value: true
        },
        nameShow: {
            type: 'switch',
            value: true
        },
        valueShow: {
            type: 'switch',
            value: false
        },
        labelColor: {
            type: 'color',
            value: '#fff'
        },
        labelSize: {
            type: 'number',
            value: 14
        },
        lineShow: {
            type: 'switch',
            value: true
        },
        lineLength: {
            type: 'number',
            value: 20
        },

        lineLength2: {
            type: 'number',
            value: 20
        },

        legendShow: {
            type: 'switch',
            value: true
        },
        legendColor: {
            type: 'color',
            value: '#fff'
        },
        legendSize: {
            type: 'number',
            value: 14
        },
        legendGap: {
            type: 'textNumber',
            value: 10
        },
        legPosition: {
            type: 'selection',
            value: '顶部居中',
            items: legendPosition
        },
        orient: {
            type: 'selection',
            value: 'horizontal',
            items: direction
        },

        pieSeries: {
            type: 'pieSeries',
            value: theme.slice(0,3)
        },
        width: {
            type: 'textNumber',
            value: 450
        },
        height: {
            type: 'textNumber',
            value: 350
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
                "x": "货物1",
                "y": "2325"
            },
                {
                    "x": "货物2",
                    "y": "6422"
                },
                {
                    "x": "货物3",
                    "y": "3422"
                }]
        },
        x: {
            type: 'text',
            value: 'x'
        },
        y: {
            type: 'text',
            value: 'y'
        }
    };
    Object.assign(attributes,animation);
    // 样式设置命名
    let names = [{
        name: '全局样式',
        children: [{
            name: '字体',
            key: 'numFont'
        }, {
            name: '内半径',
            key: 'innerR'
        }, {
            name: '外半径',
            key: 'outerR'
        }, {
            name: '中心图片',
            key: 'imgSource'
        }, {
            name: '图片大小',
            key: 'imgSize'
        }, {
            name: '南丁格尔图',
            key: 'roseType'
        },]
    }, {
        name: '值标签',
        fixed:'labelShow',
        children: [{
            name: '显示',
            key: 'labelShow'
        }, {
            name: '颜色',
            key: 'labelColor'
        }, {
            name: '字号',
            key: 'labelSize'
        }, {
            name: '类目',
            key: 'nameShow'
        }, {
            name: '真实数值',
            key: 'valueShow'
        }]
    }, {
        name: '标签线',
        fixed:'lineShow',
        children: [{
            name: '显示',
            key: 'lineShow'
        }, {
            name: '引导线一段长度',
            key: 'lineLength'
        }, {
            name: '引导线二段长度',
            key: 'lineLength2'
        }]
    }, {
        name: '图例',
        fixed:'legendShow',
        children: [{
            name: '显示',
            key: 'legendShow'
        }, {
            name: '颜色',
            key: 'legendColor'
        }, {
            name: '字体大小',
            key: 'legendSize'
        }, {
            name: '间距',
            key: 'legendGap'
        }, {
            name: '位置',
            key: 'legPosition'
        }, {
            name: '布局',
            key: 'orient'
        }]
    }, {
        name: '数据系列',
        children: [{
            name: '',
            key: 'pieSeries'
        }]
    },animationName, {
        name: '图表尺寸',
        children: [{
            name: '图表宽度',
            key: 'width'
        }, {
            name: '图表高度',
            key: 'height'
        }]
    }];
    let dataApi = [{
        name: '接口描述',
        children: [{
            name: '类目',
            type: 'must',
            key: 'x'
        },{
            name: '值',
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

    let template = `<pie-icon @callback="bindEvent" @count="count" ${stringAttr}>${subContent}</pie-icon>`;

    return {template, attributes, names, dataApi, events}
};
export default handle;
