/**
 * Created by Administrator 
 */
import { getSlotContent, getStringTypeAttr,getStringActiveAttr} from '../index'
import { family, weight } from '../datadict'
const handle = function(_attr, _slots,_event,_active) {
    // 定义默认属性
    let attributes = {
        animate: {
            type: 'switch',
            value: true
        },
        family: {
            type: 'selection',
            value: 'AgencyFBBold',
            items: family
        },
        size: {
            type: 'number',
            value: 50
        },
        pointNum: {
            type: 'number'
        },
        weight: {
            type: 'selection',
            value: 'normal',
            items: weight
        },
        color: {
            type: 'color',
            value: '#FFF600'
        },
        firFamily: {
            type: 'selection',
            value: 'Microsoft Yahei',
            items: family
        },
        firSize: {
            type: 'number',
            value: 22
        },
        firWeight: {
            type: 'selection',
            value: 'normal',
            items: weight
        },
        firColor: {
            type: 'color',
            value: '#fff'
        },
        prefix: {
            type: 'text',
            value: "￥"
        },
        latFamily: {
            type: 'selection',
            value: 'Microsoft Yahei',
            items: family
        },
        latSize: {
            type: 'number',
            value: 22
        },
        latWeight: {
            type: 'selection',
            value: 'normal',
            items: weight
        },
        latColor: {
            type: 'color',
            value: '#fff'
        },
        suffix: {
            type: 'text',
            value: "元"
        },
        width: {
            type: 'textNumber',
            value: 250
        },
        height: {
            type: 'textNumber',
            value: 100
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
                    "text": 125
                }
            ]
        },
        text: {
            type: 'text',
            value: 'text'
        }
    };
    let names = [{
        name: '正文数字',
        children: [{
            name: '字体',
            key: 'family'
        }, {
            name: '字体粗细',
            key: 'weight'
        }, {
            name: '字号大小',
            key: 'size'
        }, {
            name: '文本颜色',
            key: 'color'
        }, {
            name: '小数点位数',
            key: 'pointNum'
        }]
    }, {
        name: '前缀样式',
        children: [{
            name: '内容',
            key: 'prefix'
        }, {
            name: '字体',
            key: 'firFamily'
        }, {
            name: '字体粗细',
            key: 'firWeight'
        }, {
            name: '字号大小',
            key: 'firSize'
        }, {
            name: '文本颜色',
            key: 'firColor'
        }]
    }, {
        name: '后缀样式',
        children: [{
            name: '内容',
            key: 'suffix'
        }, {
            name: '字体',
            key: 'latFamily'
        }, {
            name: '字体粗细',
            key: 'latWeight'
        }, {
            name: '字号大小',
            key: 'latSize'
        }, {
            name: '文本颜色',
            key: 'latColor'
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
    }]
    let slots = {
        default: []
    };
    let dataApi = [{
        name: '接口描述',
        children: [{
            name: '数值',
            type: 'must',
            key: 'text'
        }]
    }];


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
            key:'text',
            value:''
        }]
    }]
    // 覆盖默认属性
    Object.assign(slots, _slots);
    Object.assign(attributes, _attr);
    Object.assign(active, _active);


    let stringAttr = getStringTypeAttr(attributes);
    let activeAttr=getStringActiveAttr(active);
    let template = `<number-flop ${stringAttr} ${activeAttr}>${subContent}</number-flop>`;
    return { template, attributes, names, dataApi,active}
};
export default handle;