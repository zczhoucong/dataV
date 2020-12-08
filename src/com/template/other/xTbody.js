// 简单列表
import { getSlotContent, getStringTypeAttr } from '../index'
import { boxType, family, weight, tabSty } from '../datadict'
const handle = function(_attr, _slots) {
    // 定义默认属性
    let attributes = {
        oddcolor: {
            type: 'color',
            value: '#54595A'
        },
        evencolor: {
            type: 'color',
            value: '#2F3D42'
        },
        headbg: {
            type: 'color',
            value: '#2078D1'
        },
        headcolor: {
            type: 'color',
            value: '#ffffff'
        },
        headsize: {
            type: 'textNumber',
            value: 14
        },
        headfamily: {
            type: 'selection',
            value: 'Microsoft Yahei',
            items: family
        },
        headweight: {
            type: 'selection',
            value: 'normal',
            items: weight
        },
        borderstyle: {
            type: 'selection',
            value: '样式一',
            items: tabSty
        },
        size: {
            type: 'textNumber',
            value: 14
        },
        fontColor: {
            type: 'color',
            value: '#ffffff'
        },
        width: {
            type: 'textNumber',
            value: 400
        },
        height: {
            type: 'textNumber',
            value: 200
        },
        color: {
            type: 'color',
            value: '#25d4e7'
        },
        tableList: {
            type: 'tableseries',
            value: [{
                color:'#fff',
                ratio:40,
                size:14,
                fontFamily:'Microsoft Yahei',
                weight:'normal'
            },{
                color:'#fff',
                ratio:60,
                size:14,
                fontFamily:'Microsoft Yahei',
                weight:'normal'
            }]
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
                    "col1": "矫正人员",
                    "col2": " 1614.0人"
                },
                {
                    "col1": "吸毒人员",
                    "col2": " 19.0人"
                },
                {
                    "col1": "重点青少年",
                    "col2": " 547242.0"
                },
                {
                    "col1": "邪教人员",
                    "col2": " 1763.0人"
                },
                {
                    "col1": "刑满释放人员",
                    "col2": " 7423.0人"
                },
                {
                    "col1": "艾滋病危险人员",
                    "col2": " 0.0人"
                },
                {
                    "col1": "校园周边重点人员",
                    "col2": " 5629.0人"
                },
                {
                    "col1": "精神病人员",
                    "col2": " 27752.0人"
                }
            ]
        },
        x: {
            type: 'text',
            value: 'col1'
        },
        y: {
            type: 'text',
            value: 'col2'
        },


    };
    let slots = {
        default: []
    };
    let names = [{
        name: '全局样式',
        children: [{
            name: '表格样式',
            key: 'borderstyle'
        }, {
            name: '边框颜色',
            key: 'color'
        }]
    }, {
        name: '表头样式',
        children: [{
            name: '背景色',
            key: 'headbg'
        }, {
            name: '颜色',
            key: 'headcolor'
        }, {
            name: '字号',
            key: 'headsize'
        }, {
            name: '粗细',
            key: 'headweight'
        }, {
            name: '字体',
            key: 'headfamily'
        }]
    }, {
        name: '行配置',
        children: [{
            name: '奇数行颜色',
            key: 'oddcolor'
        }, {
            name: '偶数行颜色',
            key: 'evencolor'
        }]
    }, {
        name: '系列样式',
        children: [{
            name: '',
            key: 'tableList'
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
    }];

    let dataApi = [{
        name: '接口描述',
        children: [{
                name: '数值',
                type: 'must',
                key: 'x'
            },
            {
                name: '名称',
                type: 'must',
                key: 'y'
            }
        ]
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
    let template = `<x-tbody ${stringAttr}> ${subContent}</x-tbody>`;

    return { template, attributes, names, dataApi }
};
export default handle;