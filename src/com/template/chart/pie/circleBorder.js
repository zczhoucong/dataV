// 旋转百分比环图
import {getSlotContent, getStringTypeAttr} from '../../index'
import {getTheme} from '@/utils/assist'
const handle = function (_attr, _slots) {
    const theme=getTheme()  
    // 定义默认属性
    let attributes = {
        animate: {
            type: 'switch',
            value: true
        },
        labelfontSize: {
            type: 'textNumber',
            value: 30
        },
        labelcolor: {
            type: 'color',
            value: '#fff'
        },
        space: {
            type: 'textNumber',
            value: 4
        },
        outerWidth: {
            type: 'textNumber',
            value: 6
        },
        outerColor: {
            type: 'color',
            value: 'rgba(56,99,97,1)'
        },
        outTrailColor: {
            type: 'color',
            value:  theme[0]
        },
        innerWidth: {
            type: 'textNumber',
            value: 6
        },
        innerColor: {
            type: 'color',
            value:  theme[1]
        },
        innerTrailColor: {
            type: 'color',
            value:  theme[1]
        },
        width: {
            type: 'textNumber',
            value: 200
        },
        height: {
            type: 'textNumber',
            value: 200
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
                'value': '80.5%'
            }]
        },
        x: {
            type: 'text',
            value: 'value'
        },

    };

    let dataApi = [{
        name: '接口描述',
        children: [{
            name: '标题',
            type: 'must',
            key: 'x'
        }]
    }];

    let names = [{
        name: '全局样式',
        children: [{
            name: '是否旋转',
            key: 'animate'
        }, {
            name: '圆环间隔',
            key: "space"
        },]
    }, {
        name: '外环',
        children: [{
            name: '宽度',
            key: 'outerWidth'
        }, {
            name: '颜色',
            key: 'outerColor'
        }, {
            name: '轨迹颜色',
            key: 'outTrailColor'
        },

        ]
    }, {
        name: '内环',
        children: [{
            name: '宽度',
            key: 'innerWidth'
        }, {
            name: "颜色",
            key: 'innerTrailColor'
        }]
    }, {
        name: '百分比',
        children: [{
            name: '字号',
            key: 'labelfontSize'
        }, {
            name: '颜色',
            key: 'labelcolor'
        }]
    }, {
        name: '图表尺寸',
        children: [{
            name: '宽度',
            key: 'width'
        }, {
            name: '高度',
            key: 'height'
        }]
    }]
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

    let stringAttr = getStringTypeAttr(attributes);
    let template = `<circle-border ${stringAttr}>${subContent}</circle-border>`;

    return {
        template,
        attributes,
        names,
        dataApi
    }
};
export default handle;