/**
 * Created by 高春超 on 2018年6月4日
 * 折线柱图
 */
import {getSlotContent, getStringTypeAttr} from '../../index'
import {position, family, weight,  lineType} from '../../datadict'
import {gridName,legendName,tickName,sizeName} from './base'
import {gridAttr,legendAttr,tickAttr,sizeAttr,dataAttr} from './baseAttr'
import {getTheme} from '@/utils/assist'
const handle = function (_attr, _slots, _events) {
    const theme=getTheme()  
// 定义默认属性
    let attributes = {
        font: {
            type: 'selection',
            value: 'AgencyFBBold',
            items: family
        },
        barName: {
            type: 'text',
            value: '柱子'
        },
        barColor: {
            type: 'color',
            value: theme[0]
        },
        barBack: {
            type: 'color',
            value: 'rgba(255,255,255,0.2)'
        },
        barWidth: {
            type: 'number',
            value: 20
        },
        barLabelShow: {
            type: 'switch',
            value: false
        },
        barLabelPosit: {
            type: 'selection',
            value: 'top',
            items: position
        },
        barLabelColor: {
            type: 'color',
            value: '#fff'
        },
        barLabelSize: {
            type: 'number',
            value: 14
        },
        lineName: {
            type: 'text',
            value: '折线'
        },
        lineColor: {
            type: 'color',
            value:theme[1]
        },
        lineType: {
            type: 'selection',
            value: 'solid',
            items: lineType
        },
        lineWidth: {
            type: 'textNumber',
            value: 2
        },
        lineLabelShow: {
            type: 'switch',
            value: false
        },
        lineLabelPosit: {
            type: 'selection',
            value: 'top',
            items: position
        },
        lineLabelColor: {
            type: 'color',
            value: '#fff'
        },
        lineLabelSize: {
            type: 'textNumber',
            value: 14
        },
        smooth: {
            type: 'switch',
            value: false
        },
        showSymbol: {
            type: 'switch',
            value: true
        },
        symbolSize: {
            type: 'textNumber',
            value: 10
        },

        xShow: {
            type: 'switch',
            value: true
        },
        rotate: {
            type: 'textNumber',
            value: 0
        },
        xColor: {
            type: 'color',
            value: '#fff'
        },
        xFontWeight: {
            type: 'selection',
            value: 'normal',
            items: weight
        },
        xFontSize: {
            type: 'number',
            value: 14
        },
        yShow: {
            type: 'switch',
            value: true
        },
        yColor: {
            type: 'color',
            value: '#fff'
        },
        yFontWeight: {
            type: 'selection',
            value: 'normal',
            items: weight
        },
        yFontSize: {
            type: 'number',
            value: 14
        },
        yName: {
            type: 'text'
        },
        yMin: {
            type: 'textNumber'
        },
        yMax: {
            type: 'textNumber'
        },
        ySplitNumber: {
            type: 'textNumber',
            value: 5
        },
        zShow: {
            type: 'switch',
            value: true
        },
        zColor: {
            type: 'color',
            value: '#fff'
        },
        zFontWeight: {
            type: 'selection',
            value: 'normal',
            items: weight
        },
        zFontSize: {
            type: 'number',
            value: 14
        },
        zName: {
            type: 'text'
        },
        zMin: {
            type: 'textNumber'
        },
        zMax: {
            type: 'textNumber'
        },
        zSplitNumber: {
            type: 'textNumber',
            value: 5
        },
        staticData: {
            type: 'Object',
            value: [{
                "x": "2月",
                "y": "235.5",
                "z": "0"
            },
                {
                    "x": "3月",
                    "y": "156.3",
                    "z": "-33.6"
                },
                {
                    "x": "4月",
                    "y": "123.5",
                    "z": "-21"
                },
                {
                    "x": "5月",
                    "y": "423.5",
                    "z": "42.9"
                },
                {
                    "x": "6月",
                    "y": "456.5",
                    "z": "7.8"
                },
                {
                    "x": "7月",
                    "y": "356.5",
                    "z": "-21.9"
                },
                {
                    "x": "8月",
                    "y": "456.5",
                    "z": "28.1"
                },
                {
                    "x": "9月",
                    "y": "853.5",
                    "z": "87"
                }]
        },
        x: {
            type: 'text',
            value: 'x'
        },
        y: {
            type: 'text',
            value: 'y'
        },
        z: {
            type: 'text',
            value: 'z'
        }
    };
    Object.assign(attributes,gridAttr,legendAttr,tickAttr,sizeAttr,dataAttr)    
 
    // 样式设置命名
    let names = [{
        name: '全局样式',
        children: [{
            name: '字体',
            key: 'font'
        }]
    }, gridName,legendName, {
        name: 'x 轴',
        fixed:'xShow',
        children: [{
            name: '显示',
            key: 'xShow'
        }, {
            name: '颜色',
            key: 'xColor'
        }, {
            name: '字体粗细',
            key: 'xFontWeight'
        }, {
            name: '字号',
            key: 'xFontSize'
        }, {
            name: '旋转角度',
            key: 'rotate'
        }]
    }, {
        name: 'y 轴',
        fixed:'yShow',
        children: [{
            name: '显示',
            key: 'yShow'
        },{
            name: '颜色',
            key: 'yColor'
        }, {
            name: '字体粗细',
            key: 'yFontWeight'
        }, {
            name: '字号',
            key: 'yFontSize'
        }, {
            name: '单位',
            key: 'yName'
        }, {
            name: '最小值',
            key: 'yMin'
        }, {
            name: '最大值',
            key: 'yMax'
        }, {
            name: '指标点数量',
            key: 'ySplitNumber'
        }]
    },{
        name: 'z 轴',
        fixed:'zShow',
        children: [{
            name: '显示',
            key: 'zShow'
        },{
            name: '颜色',
            key: 'zColor'
        }, {
            name: '字体粗细',
            key: 'zFontWeight'
        }, {
            name: '字号',
            key: 'zFontSize'
        }, {
            name: '单位',
            key: 'zName'
        }, {
            name: '最小值',
            key: 'zMin'
        }, {
            name: '最大值',
            key: 'zMax'
        }, {
            name: '指标点数量',
            key: 'zSplitNumber'
        }]
    },tickName,{
        name: '柱子',
        children: [{
            name: '系列名',
            key: 'barName'
        }, {
            name: '颜色',
            key: 'barColor'
        }, {
            name: '宽度',
            key: 'barWidth'
        }, {
            name: '背景色',
            key: 'barBack'
        }, {
            name: '标签显示',
            key: 'barLabelShow'
        }, {
            name: '标签位置',
            key: 'barLabelPosit'
        }, {
            name: '标签颜色',
            key: 'barLabelColor'
        }, {
            name: '标签字号',
            key: 'barLabelSize'
        }]
    }, {
        name: '折线',
        children: [{
            name: '系列名',
            key: 'lineName'
        }, {
            name: '颜色',
            key: 'lineColor'
        }, {
            name: '样式',
            key: 'lineType'
        }, {
            name: '粗细',
            key: 'lineWidth'
        }, {
            name: '标签显示',
            key: 'lineLabelShow'
        }, {
            name: '标签位置',
            key: 'lineLabelPosit'
        }, {
            name: '标签颜色',
            key: 'lineLabelColor'
        }, {
            name: '标签字号',
            key: 'lineLabelSize'
        }, {
            name: '近似曲线',
            key: 'smooth'
        },{
            name: '圆点显示',
            key: 'showSymbol'
        }, {
            name: '圆点半径',
            key: 'symbolSize'
        }]
    },sizeName];
    let dataApi = [{
        name: '接口描述',
        children: [{
            name: '类目',
            type: 'must',
            key: 'x'
        }, {
            name: '柱状图值',
            type: 'must',
            key: 'y'
        }, {
            name: '折线值',
            type: 'must',
            key: 'z'
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
    let template = `<line-bar @callback="bindEvent" @count="count" ${stringAttr}>${subContent}</line-bar>`;
    return {template, attributes, names, dataApi, events}
};
export default handle;
