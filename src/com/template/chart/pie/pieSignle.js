/**
 * Created by 高春超
 * 单值百分比饼图
 */
import {getSlotContent, getStringTypeAttr} from '../../index'
import { family, weight} from '../../datadict'
import {animationName} from './base'
import {animation} from './baseAttr'
import {getTheme} from '@/utils/assist'
const handle = function (_attr, _slots, _events) {
    const theme=getTheme()  
// 定义默认属性
    let attributes = {
        fullColor: {
            type: 'color',
            value:'rgba(255,255,255,.5)'
        },
        startColor: {
            type: 'color',
            value: theme[0]
        },
        endColor: {
            type: 'color',
            value: theme[1]
        },
        innerR:{
            type: 'number',
            value: 60
        },
        outerR:{
            type: 'number',
            value: 70
        },
        showSubText: {
            type: 'switch',
            value: false
        },
        subText: {
            type: 'text',
            value: ''
        },
        subTextFont: {
            type: 'selection',
            value: 'AgencyFBBold',
            items: family
        },
        subTextColor: {
            type: 'color',
            value: '#fff'
        },
        subTextSize: {
            type: 'number',
            value: 14
        },
        subTextWeight: {
            type: 'selection',
            value: 'normal',
            items: weight
        },
        numberFont: {
            type: 'selection',
            value: 'AgencyFBBold',
            items: family
        },
        numberColor: {
            type: 'color',
            value: '#fff'
        },
        numberWeight: {
            type: 'selection',
            value: 'normal',
            items: weight
        },
        numberSize: {
            type: 'number',
            value: 45
        },
        percentUnit: {
            type: 'text',
            value: '%'
        },
        percentSize: {
            type: 'number',
            value: 30
        },
        percentColor: {
            type: 'color',
            value: '#fff'
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
                "percent": 52
            }]
        },
        percent: {
            type: 'text',
            value: ''
        }
    };
    animation.animationType.value='expansion';
    Object.assign(attributes,animation);
    // 样式设置命名
    let names = [{
        name: '全局样式',
        children: [ {
            name: '内半径',
            key: 'innerR'
        }, {
            name: '外半径',
            key: 'outerR'
        },{
            name: '填充底色',
            key: 'fullColor'
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
    }, {
        name: '标题',
        fixed:'showSubText',
        children: [{
            name: '显示',
            key: 'showSubText'
        }, {
            name: '内容',
            key: 'subText'
        }, {
            name: '字体',
            key: 'subTextFont'
        }, {
            name: '字号',
            key: 'subTextSize'
        }, {
            name: '字体颜色',
            key: 'subTextColor'
        }, {
            name: '字体粗细',
            key: 'subTextWeight'
        }]
    }, {
        name:'中间百分比部分',
        children:[{
            name:'字体',
            key:'numberFont'
        },{
            name:'字体颜色',
            key:'numberColor'
        },{
            name:'字体粗细',
            key:'numberWeight'
        },{
            name:'数字字号',
            key:'numberSize'
        },{
            name:'百分比符号',
            key:'percentUnit'
        },{
            name:'百分比字号',
            key:'percentSize'
        },{
            name:'百分比颜色',
            key:'percentColor'
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
            name: '值',
            type: 'must',
            key: 'percent'
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

    let template = `<pie-signle @callback="bindEvent" @count="count" ${stringAttr}>${subContent}</pie-signle>`;

    return {template, attributes, names, dataApi, events}
};
export default handle;
