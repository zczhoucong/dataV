/**
 * Created by 高春超 on 2018年5月14日.
 * 双轴折线图
 */
import {getSlotContent, getStringTypeAttr} from '../../index'
import {position,lineType, family, weight, direction, legendPosition} from '../../datadict'
const handle = function (_attr, _slots, _events) {
// 定义默认属性
    let attributes = {
        font: {
            type: 'selection',
            value: 'AgencyFBBold',
            items: family
        },
        gridTop: {
            type: 'number',
            value: 50
        },
        gridBottom: {
            type: 'number',
            value: 10
        },
        gridLeft: {
            type: 'number',
            value: 20
        },
        gridRight: {
            type: 'number',
            value: 20
        },
        legendShow: {
            type: 'switch',
            value: true
        },
        legendColor: {
            type: 'color',
            value: '#fff'
        },
        legendSize: {
            type: 'number',
            value: 14
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
        boundaryGap: {
            type: 'switch',
            value: false
        },
        xName: {
            type: 'text'
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
        zShow: {
            type: 'switch',
            value: true
        },
        zColor: {
            type: 'color',
            value: '#fff'
        },
        zFontWeight: {
            type: 'selection',
            value: 'normal',
            items: weight
        },
        zFontSize: {
            type: 'number',
            value: 14
        },
        zName: {
            type: 'text'
        },
        zMin: {
            type: 'textNumber'
        },
        zMax: {
            type: 'textNumber'
        },
        zSplitNumber: {
            type: 'textNumber',
            value: 5
        },
        lineShow: {
            type: 'switch',
            value: true
        },
        tickShow: {
            type: 'switch',
            value: true
        },
        tickLength: {
            type: 'textNumber',
            value: 5
        },
        tickColor: {
            type: 'color',
            value: 'rgba(79, 130, 218, 0.55)'
        },
        YLineName: {
            type: 'text'
        },
        YLineColor: {
            type: 'color',
            value: '#2D7CCB'
        },
        YSmooth: {
            type: 'switch',
            value: false
        },
        YLineType: {
            type: 'selection',
            value: 'solid',
            items: lineType
        },
        YLineWidth: {
            type: 'textNumber',
            value: 1
        },
        YLineLabelShow: {
            type: 'switch',
            value: false
        },
        YLineLabelPosit: {
            type: 'selection',
            value: 'top',
            items: position
        },
        YLineLabelColor: {
            type: 'color',
            value: '#fff'
        },
        YLineLabelSize: {
            type: 'textNumber',
            value: 16
        },
        YShowSymbol: {
            type: 'switch',
            value: true
        },
        YSymbolSize: {
            type: 'textNumber',
            value: 4
        },
        YAreaShow: {
            type: 'switch',
            value: false
        },
        YAreaColor: {
            type: 'barColor',
            value: 'rgba(0,0,0,.2)'
        },
        ZLineName: {
            type: 'text'
        },
        ZLineColor: {
            type: 'color',
            value: '#6CF5F2'
        },
        ZSmooth: {
            type: 'switch',
            value: false
        },
        ZLineType: {
            type: 'selection',
            value: 'solid',
            items: lineType
        },
        ZLineWidth: {
            type: 'textNumber',
            value: 1
        },
        ZLineLabelShow: {
            type: 'switch',
            value: false
        },
        ZLineLabelPosit: {
            type: 'selection',
            value: 'top',
            items: position
        },
        ZLineLabelColor: {
            type: 'color',
            value: '#fff'
        },
        ZLineLabelSize: {
            type: 'textNumber',
            value: 16
        },
        ZShowSymbol: {
            type: 'switch',
            value: true
        },
        ZSymbolSize: {
            type: 'textNumber',
            value: 4
        },
        ZAreaShow: {
            type: 'switch',
            value: false
        },
        ZAreaColor: {
            type: 'barColor',
            value: 'rgba(255,255,255,.2)'
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
            value: [ {
                "x": "01/01",
                "y": 100,
                "z": 22
            },
                {
                    "x": "02/01",
                    "y": 200,
                    "z": 59
                },
                {
                    "x": "03/01",
                    "y": 25,
                    "z": 51
                },
                {
                    "x": "04/01",
                    "y": 0,
                    "z": 18
                },
                {
                    "x": "05/01",
                    "y": 70,
                    "z": 100
                }]
        },
        x: {
            type: 'text',
            value: 'x'
        },
        y: {
            type: 'text',
            value: 'y'
        },
        z: {
            type: 'text',
            value: 'z'
        }
    };
    // 样式设置命名
    let names = [{
        name: '全局样式',
        children: [{
            name: '字体',
            key: 'font'
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
        name: 'x 轴',
        fixed:'xShow',
        children: [{
            name: '显示',
            key: 'xShow'
        }, {
            name: '单位',
            key: 'xName'
        },{
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
        }, {
            name: '留白',
            key: 'boundaryGap'
        }]
    }, {
        name: 'y 轴',
        fixed:'yShow',
        children: [{
            name: '显示',
            key: 'yShow'
        },{
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
    }, {
        name: 'z 轴',
        fixed:'zShow',
        children: [{
            name: '显示',
            key: 'zShow'
        },{
            name: '颜色',
            key: 'yColor'
        }, {
            name: '字体粗细',
            key: 'zFontWeight'
        }, {
            name: '字号',
            key: 'zFontSize'
        }, {
            name: '单位',
            key: 'zName'
        }, {
            name: '最小值',
            key: 'zMin'
        }, {
            name: '最大值',
            key: 'zMax'
        }, {
            name: '指标点数量',
            key: 'zSplitNumber'
        }]
    }, {
        name: '坐标轴',
        children: [{
            name: '轴线',
            key: 'lineShow'
        }, {
            name: '刻度',
            key: 'tickShow'
        }, {
            name: '刻度长度',
            key: 'tickLength'
        }, {
            name: '颜色',
            key: 'tickColor'
        }]
    }, {
        name: '系列Y',
        children: [{
            name: '系列名',
            key: 'YLineName'
        },{
            name: '折线颜色',
            key: 'YLineColor'
        },{
            name: '折线样式',
            key: 'YLineType'
        },{
            name: '折线粗细',
            key: 'YLineWidth'
        },{
            name: '近似曲线',
            key: 'YSmooth'
        },{
            name: '标签显示',
            key: 'YLineLabelShow'
        },{
            name: '标签位置',
            key: 'YLineLabelPosit'
        },{
            name: '标签颜色',
            key: 'YLineLabelColor'
        },{
            name: '标签字号',
            key: 'YLineLabelSize'
        },{
            name: '圆点显示',
            key: 'YShowSymbol'
        },{
            name: '圆点半径',
            key: 'YSymbolSize'
        },{
            name: '区域显示',
            key: 'YAreaShow'
        },{
            name: '区域颜色',
            key: 'YAreaColor'
        }]
    },{
        name: '系列Z',
        children: [{
            name: '系列名',
            key: 'ZLineName'
        },{
            name: '折线颜色',
            key: 'ZLineColor'
        },{
            name: '折线样式',
            key: 'ZLineType'
        },{
            name: '折线粗细',
            key: 'ZLineWidth'
        },{
            name: '近似曲线',
            key: 'ZSmooth'
        },{
            name: '标签显示',
            key: 'ZLineLabelShow'
        },{
            name: '标签位置',
            key: 'ZLineLabelPosit'
        },{
            name: '标签颜色',
            key: 'ZLineLabelColor'
        },{
            name: '标签字号',
            key: 'ZLineLabelSize'
        },{
            name: '圆点显示',
            key: 'ZShowSymbol'
        },{
            name: '圆点半径',
            key: 'ZSymbolSize'
        },{
            name: '区域显示',
            key: 'ZAreaShow'
        },{
            name: '区域颜色',
            key: 'ZAreaColor'
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
        }, {
            name: '值',
            type: 'must',
            key: 'z'
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

    let template = `<multi-y-line @callback="bindEvent" @count="count" ${stringAttr}>${subContent}</multi-y-line>`;
    return {template, attributes, names, dataApi, events}
};
export default handle;
