/**
 * Created by 高春超 on 2018年5月14日.
 * 梯形柱图
 */
import { getSlotContent, getStringTypeAttr } from '../../index'
import {  family, weight } from '../../datadict'
import {gridName,labelName,legendName,tickName,sizeName} from './base'
import {gridAttr,labelAttr,legendAttr,tickAttr,sizeAttr,dataAttr,seriesAttr} from './baseAttr'
const handle = function(_attr, _slots, _events) {
    // 定义默认属性
    let attributes = {
        barWidth: {
            type: 'number',
            value: 20
        },
        barRadius: {
            type: 'number',
            value: 0
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
            value: 12
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
            value: 12
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
            name: '柱子圆角',
            key: 'barRadius'
        }]
    }, gridName, labelName,legendName, {
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

    let template = `<bar-vert @callback="bindEvent" @count="count" ${stringAttr}>${subContent}</bar-vert>`;

    return { template, attributes, names, dataApi, events }
};
export default handle;