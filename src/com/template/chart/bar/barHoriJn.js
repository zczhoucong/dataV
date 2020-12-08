/**
 * Created by 高春超 on 2018年5月17日.
 * 水平胶囊柱状图
 */
import { getSlotContent, getStringTypeAttr } from '../../index'
import { family, weight } from '../../datadict'
import {gridName,labelName,legendName,tickName,sizeName} from './base'
import {gridAttr,labelAttr,legendAttr,tickAttr,sizeAttr,dataAttr,seriesAttr} from './baseAttr'
const handle = function(_attr, _slots, _events) {    
    // 定义默认属性
    let attributes = {
        barWidth: {
            type: 'number',
            value: 20
        },
        barBack: {
            type: 'color',
            value: 'rgba(255,255,255,0)'
        },
        borderColor: {
            type: 'color',
            value: '#A0A0A0'
        },
        borderWidth: {
            type: 'textNumber',
            value: 1
        },
        max: {
            type: 'textNumber',
            value: 20
        },
        font: {
            type: 'selection',
            value: 'AgencyFBBold',
            items: family
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
        xName: {
            type: 'text'
        },
        xMin: {
            type: 'textNumber'
        },
        xMax: {
            type: 'textNumber'
        },
        xSplitNumber: {
            type: 'textNumber',
            value: 5
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
        }
    };
    Object.assign(attributes,gridAttr,labelAttr,legendAttr,tickAttr,sizeAttr,dataAttr,seriesAttr())
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
        }, {
            name: '外框颜色',
            key: 'borderColor'
        }, {
            name: '外框粗细',
            key: 'borderWidth'
        }, {
            name: '外框高度',
            key: 'max'
        }]
    },gridName, labelName,legendName, {
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
        }, {
            name: '单位',
            key: 'xName'
        }, {
            name: '最小值',
            key: 'xMin'
        }, {
            name: '最大值',
            key: 'xMax'
        }, {
            name: '指标点数量',
            key: 'xSplitNumber'
        }]
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
        }]
    },tickName, {
        name: '数据系列',
        children: [{
            name: '',
            key: 'barSeries'
        }]
    }, sizeName];
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
        }, {
            name: '系列',
            type: 'must',
            key: 's'
        }]
    }];

    let events = [{
        name: '点击事件',
        type: 'click',
        children: [{
            xid: 1,
            event: `() => {          
return &t& this.$DialogBox({
    href: 'http://www.bejson.com//'
}); &t&
               }`
        }]
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

    let template = `<bar-hori-jn @callback="bindEvent" @count="count" ${stringAttr}>${subContent}</bar-hori-jn>`;
    console.log()
    return { template, attributes, names, dataApi, events }
};
export default handle;