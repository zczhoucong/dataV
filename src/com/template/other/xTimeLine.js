/**
 * Created by Administrator
 */
import {getSlotContent, getStringTypeAttr, getStringActiveAttr} from '../index'
import {
    timeLineSty
} from '../datadict'
const handle = function(_attr, _slots,_event, _active) {
    // 定义默认属性
    let attributes = {
        isLunbo: {
            type: 'switch',
            value: false
        },
        stepTime: {
            type: 'textNumber',
            value: 2
        },
        styleselet: {
            type: 'selection',
            value: '样式一',
            items: timeLineSty
        },
        size: {
            type: 'number',
            value: 24
        },
        width: {
            type: 'textNumber',
            value: 684
        },
        height: {
            type: 'textNumber',
            value: 102
        },
        selectColor: {
            type: 'color',
            value: '#E2ECFF'
        },
        color: {
            type: 'color',
            value: '#0D86F0'
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
                'year': 2017
            }, {
                'year': 2018
            }, {
                'year': 2019
            }, {
                'year': 2020
            }]
        },
        year: {
            type: 'text',
            value: 'year'
        },
    };

    let dataApi = [{
        name: '接口描述',
        children: [{
            name: '年度',
            type: 'must',
            key: 'year'
        }]
    }];


    let slots = {
        default: []
    };
    let names = [
        // {
        //     name: '最近年份',
        //     key: 'last'
        // }, {
        //     name: '包含当前年',
        //     key: 'current'
        // }, 
        {
            name: '全局样式',
            children: [{
                    name: '样式选择',
                    key: 'styleselet'
                },
                {
                    name: '文字大小',
                    key: 'size'
                }, {
                    name: '文字选中颜色',
                    key: 'selectColor'
                }, {
                    name: '文字默认颜色',
                    key: 'color'
                }
            ]
        },
        {
            name: '动画样式',
            children: [{
                    name: '是否轮播',
                    key: 'isLunbo'
                },
                {
                    name: '轮播时长',
                    key: 'stepTime'
                }
            ]
        },

        //  {
        //     name: '文字水平位置',
        //     key: 'lefttext'
        // }, {
        //     name: '文字垂直位置',
        //     key: 'toptext'
        // }, 
        {
            name: '图表尺寸',
            children: [{
                name: '图表宽度',
                key: 'width'
            }, {
                name: '图表高度',
                key: 'height'
            }]
        }
    ];

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

    let active=[{
        name:'数字变化响应事件',
        enable:false,
        children:[{
            name:'新的数字值',
            default:0,
            key:'year',
            value:''
        }]
    }]

    // 覆盖默认属性
    Object.assign(slots, _slots);
    Object.assign(attributes, _attr);
    Object.assign(active, _active);    
    let stringAttr = getStringTypeAttr(attributes);
    let activeAttr=getStringActiveAttr(active);
    let template = `<time-line-new ${stringAttr} ${activeAttr}> ${subContent}</time-line-new>`;
    return {
        template,
        attributes,
        names,
        dataApi,
        active
    }
};
export default handle;