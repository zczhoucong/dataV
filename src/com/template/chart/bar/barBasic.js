/**
 * Created by 高春超 on 2018/5/2.
 * 基本柱状图
 */
import {getSlotContent, getStringTypeAttr} from '../../index'
import {family, weight, barColor} from '../../datadict'
 import {gridName,labelName,tickName,sizeName} from './base'
 import {gridAttr,labelAttr,tickAttr,sizeAttr,dataAttr} from './baseAttr'
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
        barWidth: {
            type: 'number',
            value: 30
        },
        barBack: {
            type: 'color',
            value: 'rgba(255,255,255,0.25)'
        },
        barNumbers: {
            type: 'radio',
            value: '单色',
            items: barColor
        },
        barColor1: {
            type: 'barColor',
            value: theme[0]
        },
        barColor2: {
            type: 'barColor',
            value: theme[1]
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
        yName: {
            type: 'text'
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
        staticData: {
            type: 'Object',
            value: [{
                x: '周一',
                y: 23
            }, {
                x: '周二',
                y: 15
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
    };    
    Object.assign(attributes,gridAttr,labelAttr,tickAttr,sizeAttr,dataAttr)
    // 样式设置命名
    let names = [{
        name: '全局样式',
        children: [{
            name: '字体',
            key: 'font'
        }, {
            name: '柱子宽度',
            key: 'barWidth'
        }, {
            name: '柱子背景色',
            key: 'barBack'
        }]
    }, gridName, labelName,{
        name: 'x 轴',
        fixed:'xShow',
        children: [{
            name: '显示',
            key: 'xShow'
        }, {
            name: '旋转角度',
            key: 'rotate'
        }, {
            name: '颜色',
            key: 'xColor'
        }, {
            name: '字体粗细',
            key: 'xFontWeight'
        }, {
            name: '字号',
            key: 'xFontSize'
        },]
    }, {
        name: 'y 轴',
        fixed:'yShow',
        children: [{
            name: '显示',
            key: 'yShow'
        }, {
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
    },tickName, {
        name: '数据系列',
        children: [{
            name: '单双色',
            key: 'barNumbers'
        }, {
            name: '系列颜色1',
            key: 'barColor1'
        }, {
            name: '系列颜色2',
            key: 'barColor2'
        }]
    },sizeName];
    let dataApi = [{
        name: '接口描述',
        children: [{
            name: '类目',
            type: 'must',
            key: 'x'
        }, {
            name: '值',
            type: 'must',
            key: 'y'
        }]
    }];

    let events = [{
        name: '点击事件',
        type: 'click',
        children: [{
            xid: 1,
            event: `() => {          
return &t& this.$DialogBox({
    href: 'http://www.bejson.com'
}); &t&
               }`
        }]
    }];

    let slots = {
        default: []
    };    
    // 覆盖默认属性
    Object.assign(slots, _slots);
    Object.assign(attributes, _attr);
    Object.assign(events, _events);
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

    let template = `<bar-basic @callback="bindEvent" @count="count" ${stringAttr}>${subContent}</bar-basic>`;    
    return {template, attributes, names, dataApi, events}
};
export default handle;