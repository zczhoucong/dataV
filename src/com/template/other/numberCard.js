import { getSlotContent, getStringTypeAttr } from '../index'
import { family, weight,cardStyle } from '../datadict'
const handle = function(_attr, _slots) {
    // 定义默认属性
    let attributes = {
        order:{
            type: 'selection',
            value: '样式1',
            items: cardStyle
        },
        // 点的大小
        pointSize: {
            type: 'textNumber',
            value: 50
        },
        pointNum: {
            type: 'number'
        },
        // 数值的大小
        numSize: {
            type: 'textNumber',
            value: 50
        },
        numColor: {
            type: 'color',
            value: '#fff'
        },
        family: {
            type: 'selection',
            value: 'AgencyFBBold',
            items: family
        },
        weight: {
            type: 'selection',
            value: 'bold',
            items: weight
        },
        width: {
            type: 'textNumber',
            value: 203
        },
        height: {
            type: 'textNumber',
            value: 105
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
        name: '全局样式',
        children: [{
            name: '卡片样式',
            key: 'order'
        }, {
            name: '小数点大小',
            key: 'pointSize'
        }, {
            name: '小数点位数',
            key: 'pointNum'
        }, {
            name: '数字大小',
            key: 'numSize'
        }, {
            name: '颜色',
            key: 'numColor'
        }, {
            name: '字体',
            key: 'family'
        }, {
            name: '粗细',
            key: 'weight'
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
    let template = `<number-card ${stringAttr}>${subContent}</number-card>`;

    return { template, attributes, names, dataApi }
};
export default handle;