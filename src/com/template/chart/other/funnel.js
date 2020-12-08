/**
 * Created by 高春超
 * 金字塔图
 */
import {getSlotContent, getStringTypeAttr} from '../../index'
import {lineType, family, align, weight, legendPosition, direction, funnelSort} from '../../datadict'
import {getTheme} from '@/utils/assist'
const handle = function (_attr, _slots, _events) {
    const theme=getTheme() 
// 定义默认属性
    let attributes = {
        legendShow: {
            type: 'switch',
            value: true
        },
        legendColor: {
            type: 'color',
            value: '#fff'
        },
        legendSize: {
            type: 'textNumber',
            value: 18
        },
        legendGap: {
            type: 'textNumber',
            value: 10
        },
        legPosition: {
            type: 'selection',
            value: '顶部居中',
            items: legendPosition
        },
        orient: {
            type: 'selection',
            value: 'horizontal',
            items: direction
        },
        gridTop: {
            type: 'number',
            value: 10
        },
        gridBottom: {
            type: 'number',
            value: 10
        },
        gridLeft: {
            type: 'number',
            value: 5
        },
        gridRight: {
            type: 'number',
            value: 5
        },
        font: {
            type: 'selection',
            value: 'Microsoft Yahei',
            items: family
        },
        sort: {
            type: 'selection',
            value: 'ascending',
            items: funnelSort
        },
        funnelAlign: {
            type: 'selection',
            value: 'center',
            items: align
        },
        gap: {
            type: 'textNumber',
            value: 0
        },
        min: {
            type: 'textNumber',
            value: 0
        },
        max: {
            type: 'textNumber',
        },
        labelShow: {
            type: 'switch',
            value: true
        },
        labelPosit: {
            type: 'selection',
            value: 'center',
            items: align
        },
        labelColor: {
            type: 'color',
            value: '#fff'
        },
        labelSize: {
            type: 'number',
            value: 14
        },
        labelHeight: {
            type: 'number',
            value: 20
        },
        percentColor: {
            type: 'color',
            value: '#fff'
        },
        percentSize: {
            type: 'number',
            value: 14
        },
        percentShow: {
            type: 'switch',
            value: false
        },
        valShow: {
            type: 'switch',
            value: false
        },
        lineShow: {
            type: 'switch',
            value: false
        },
        lineColor: {
            type: 'color',
            value: '#fff'
        },
        lineLength: {
            type: 'textNumber',
            value: 40
        },
        lineWidth: {
            type: 'textNumber',
            value: 1
        },
        lineType: {
            type: 'selection',
            value: 'solid',
            items: lineType
        },
        borderColor: {
            type: 'color',
            value: '#fff'
        },
        borderWidth: {
            type: 'textNumber',
            value: 2
        },
        pieSeries: {
            type: 'pieSeries',
            value:theme.slice(0,3)
        },
        width: {
            type: 'textNumber',
            value: 450
        },
        height: {
            type: 'textNumber',
            value: 250
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
                "x": "第一组",
                "y": 50
            }, {
                "x": "第二组",
                "y": 100
            }, {
                "x": "第三组",
                "y": 150
            }]
        },
        x: {
            type: 'text',
            value: 'x'
        },
        y: {
            type: 'text',
            value: 'y'
        }
    };
    // 样式设置命名
    let names = [{
        name: '全局样式',
        children: [{
            name: '字体',
            key: 'font'
        }, {
            name: '数据排序',
            key: 'sort'
        }, {
            name: '对齐方向',
            key: 'funnelAlign'
        }, {
            name: '图形间距',
            key: 'gap'
        }, {
            name: '数据最小值',
            key: 'min'
        }, {
            name: '数据最大值',
            key: 'max'
        }]
    }, {
        name: '边距',
        children: [{
            name: '上边距',
            key: 'gridTop'
        }, {
            name: '下边距',
            key: 'gridBottom'
        }, {
            name: '左边距',
            key: 'gridLeft'
        }, {
            name: '右边距',
            key: 'gridRight'
        }]
    }, {
        name: '图例',
        fixed:'legendShow',
        children: [{
            name: '显示',
            key: 'legendShow'
        }, {
            name: '颜色',
            key: 'legendColor'
        }, {
            name: '字体大小',
            key: 'legendSize'
        }, {
            name: '间距',
            key: 'legendGap'
        }, {
            name: '位置',
            key: 'legPosition'
        }, {
            name: '布局',
            key: 'orient'
        }]
    }, {
        name: '值标签',
        fixed:'labelShow',
        children: [{
            name: '显示',
            key: 'labelShow'
        }, {
            name: '位置',
            key: 'labelPosit'
        }, {
            name: '颜色',
            key: 'labelColor'
        }, {
            name: '字号',
            key: 'labelSize'
        }, {
            name: '行高',
            key: 'labelHeight'
        }]
    }, {
        name: '百分比',
        fixed:'percentShow',
        children: [{
            name: '显示',
            key: 'percentShow'
        }, {
            name: '颜色',
            key: 'percentColor'
        }, {
            name: '字号',
            key: 'percentSize'
        }, {
            name: '真实值',
            key: 'valShow'
        }]
    }, {
        name: '引导线',
        fixed:'lineShow',
        children: [{
            name: '显示',
            key: 'lineShow'
        }, {
            name: '颜色',
            key: 'lineColor'
        }, {
            name: '长度',
            key: 'lineLength'
        }, {
            name: '粗细',
            key: 'lineWidth'
        }, {
            name: '样式',
            key: 'lineType'
        }]
    }, {
        name: '图形样式',
        children: [{
            name: '颜色',
            key: 'borderColor'
        }, {
            name: '粗细',
            key: 'borderWidth'
        }]
    }, {
        name: '数据系列',
        children: [{
            name: '',
            key: 'pieSeries'
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

    let template = `<funnel @callback="bindEvent" @count="count" ${stringAttr}>${subContent}</funnel>`;

    return {template, attributes, names, dataApi, events}
};
export default handle;
