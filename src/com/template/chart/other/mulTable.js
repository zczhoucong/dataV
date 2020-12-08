/**
 * @Author: 高春超
 * @description: 
 * @param {type} 
 * @return: 
 * @Date: 2019-03-18 08:57:30
 */
import {getSlotContent,getStringTypeAttr} from '../../index'
import {
    position,
    family,
    weight,
    legendPosition,
    direction,
    listShape
} from '../../datadict'
const handle = function(_attr, _slots, _events) {
    // 定义默认属性
    let attributes = {
        // 是否显示边框
        bordershow: {
            type: 'switch',
            value: false
        },
        // 边框颜色
        bordercolor: {
            type: 'color',
            value: '#ffffff'
        },
        // 边框大小
        borderSize: {
            type: 'textNumber',
            value: 1
        },
        // 表头高度
        tableHeadHeight: {
            type: 'number',
            value: 35
        },
        // 表格行数
        showNum: {
            type: 'textNumber',
            value: 5
        },
        // 展示所有行
        showAll: {
            type: 'switch',
            value: true
        },
        // 列控制
        listColum: {
            type: 'listColum',
            value: []
        },
        // 表头是否显示
        showhead: {
            type: 'switch',
            value: true
        },
        // 表头背景色
        tableheadcolor: {
            type: 'color',
            value: '#2078D1'
        },
        // 表头字体大小
        tableheFontSize: {
            type: 'textNumber',
            value: 14
        },
        // 表头字体粗细
        tablehebig: {
            type: 'selection',
            value: 'bold',
            items: weight
        },
        // 表头字体
        tablehefamily: {
            type: 'selection',
            value: 'Microsoft Yahei',
            items: family
        },
        // 表头颜色
        tablehecolor: {
            type: 'color',
            value: '#ffffff'
        },
        // 奇数行颜色
        oddcolor: {
            type: 'color',
            value: '#54595A'
        },
        evencolor: {
            type: 'color',
            value: '#2F3D42'
        },
        bodyFontsize: {
            type: 'textNumber',
            value: 14
        },
        bodycolor: {
            type: 'color',
            value: '#ffffff'
        },
        // 是否显示序号列
        showfirst: {
            type: 'switch',
            value: true
        },
        // 序号的形状
        shape: {
            type: 'selection',
            value: 'stop',
            items: listShape
        },
        orderColor: {
            type: 'color',
            value: '#ff0000'
        },
        // 是否轮播
        lunbo: {
            type: 'switch',
            value: false
        },
        onetime: {
            type: 'textNumber',
            value: 2
        },

        width: {
            type: 'textNumber',
            value: 400
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
                // 'num': '序号',
                'name': '地区',
                'value': '流量',
                'userActive': '用户行为特征'
            }, {
                // 'num': 1,
                'name': '中国',
                'value': '255',
                'userActive': 'xxxxxx'
            }, {
                // 'num': 2,
                'name': '美国',
                'value': '258',
                'userActive': 'xxxxxx'
            }, {
                // 'num': 3,
                'name': '加拿大',
                'value': '299',
                'userActive': 'xxxxxx'
            }, {
                // 'num': 4,
                'name': '新加坡',
                'value': '299',
                'userActive': 'xxxxxx'
            }, {
                // 'num': 5,
                'name': '泰国',
                'value': '299',
                'userActive': 'xxxxxx'
            }, {
                // 'num': 6,
                'name': '印度尼西亚',
                'value': '299',
                'userActive': 'xxxxxx'
            }, {
                // 'num': 7,
                'name': '韩国',
                'value': '299',
                'userActive': 'xxxxxx'
            }, {
                // 'num': 8,
                'name': '朝鲜',
                'value': '299',
                'userActive': 'xxxxxx'
            }]
        },
    };
    // 样式设置命名
    let names = [{
        name: '全局',
        children: [{
                name: '表格行数',
                key: 'showNum'
            }, {
                name: '展示所有行',
                key: 'showAll'
            }, {
                name: '是否轮播',
                key: 'lunbo'
            }, {
                name: '时间间隔',
                key: 'onetime'
            }
        ]
    }, {
        name: '边框',
        fixed:'bordershow',
        children: [{
            name: '显示边框',
            key: 'bordershow'
        }, {
            name: '边框颜色',
            key: "bordercolor"
        }, {
            name: '边框粗细',
            key: 'borderSize'
        }]

    }, {
        name: '表头',
        fixed:'showhead',
        children: [{
            name: '是否显示',
            key: 'showhead'
        }, {
            name: '行高',
            key: 'tableHeadHeight'
        }, {
            name: '背景色',
            key: 'tableheadcolor'
        }, {
            name: '字号',
            key: 'tableheFontSize'
        }, {
            name: '粗细',
            key: 'tablehebig'
        }, {
            name: '字体',
            key: 'tablehefamily'
        }, {
            name: '字体颜色',
            key: 'tablehecolor'
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
        name: '序号列',
        fixed:'showfirst',
        children: [{
            name: '是否显示',
            key: 'showfirst'
        }, {
            name: '形状',
            key: 'shape'
        }, {
            name: '背景颜色',
            key: 'orderColor'
        }, {
            name: '字号',
            key: 'bodyFontsize'
        }, {
            name: '字体颜色',
            key: 'bodycolor'
        }]
    }, {
        name: '列配置',
        children: [{
            name: '',
            key: 'listColum'
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
    }];
    let dataApi = [{
        name: '接口描述',
        children: []
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

    let template = `<mul-table @callback="bindEvent" @count="count" ${stringAttr}>${subContent}</mul-table>`;

    return {
        template,
        attributes,
        names,
        dataApi,
        events
    }
};
export default handle;