/**
 * Created by 高春超 on 2018年5月7日.
 * 基本折线图
 */
import {getSlotContent, getStringTypeAttr} from '../../index'
import {position, family, weight,legendPosition,direction} from '../../datadict'
const handle = function (_attr, _slots, _events) {
// 定义默认属性
    let attributes = {
        font: {
            type: 'selection',
            value: 'AgencyFBBold',
            items: family
        },
        boundaryGap: {
            type: 'switch',
            value: true
        },
        stack: {
            type: 'switch',
            value: false
        },
        gridTop: {
            type: 'number',
            value: 30
        },
        gridBottom: {
            type: 'number',
            value: 30
        },
        gridLeft: {
            type: 'number',
            value: 30
        },
        gridRight: {
            type: 'number',
            value: 30
        },
        labelShow: {
            type: 'switch',
            value: false
        },
        labelPosit: {
            type: 'selection',
            value: 'top',
            items: position
        },
        labelColor: {
            type: 'color',
            value: '#fff'
        },
        labelSize: {
            type: 'number',
            value: 14
        },
        legendShow:{
            type: 'switch',
            value: true
        },
        legendColor:{
            type: 'color',
            value: '#fff'
        },
        legendSize: {
            type: 'number',
            value: 14
        },
        legendGap:{
            type: 'textNumber',
            value: 10
        },
        legPosition:{
            type: 'selection',
            value: '顶部居中',
            items: legendPosition
        },
        orient:{
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
        yShow: {
            type: 'switch',
            value: true
        },
        yName: {
            type: 'text'
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
        yMin: {
            type: 'textNumber'
        },
        yMax: {
            type: 'textNumber'
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
            value: '#fff'
        },
        ySplitNumber: {
            type: 'textNumber',
            value: 5
        },
        lineSeries: {
            type: 'lineSeries',
            value: []
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
                "x": "2010/03/01",
                "y": 25,
                "s": "1"
            },
                {
                    "x": "2010/03/11",
                    "y": 125,
                    "s": "2"
                },
                {
                    "x": "2010/04/01",
                    "y": 190,
                    "s": "1"
                },
                {
                    "x": "2010/04/01",
                    "y": 110,
                    "s": "2"
                },
                {
                    "x": "2010/05/01",
                    "y": 90,
                    "s": "1"
                },
                {
                    "x": "2010/05/01",
                    "y": 60,
                    "s": "2"
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
        s: {
            type: 'text',
            value: 's'
        },
    };
    // 样式设置命名
    let names = [{
        name: '全局样式',
        children: [{
            name: '字体',
            key: 'font'
        }, {
            name: '堆叠',
            key: 'stack'
        }, {
            name: '留白策略',
            key: 'boundaryGap'
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
    },{
        name:'图例',
        fixed:'legendShow',
        children:[{
            name:'显示',
            key:'legendShow'
        },{
            name:'颜色',
            key:'legendColor'
        },{
            name:'字体大小',
            key:'legendSize'
        },{
            name:'间距',
            key:'legendGap'
        },{
            name:'位置',
            key:'legPosition'
        },{
            name:'布局',
            key:'orient'
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
        }]
    }, {
        name: 'x 轴',
        fixed:'xShow',
        children: [{
            name: '显示',
            key: 'xShow'
        }, {
            name: '旋转角度',
            key: 'rotate'
        }, {
            name: '颜色',
            key: 'xColor'
        }, {
            name: '字体粗细',
            key: 'xFontWeight'
        }, {
            name: '字号',
            key: 'xFontSize'
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
        name: '数据系列',
        children: [{
            name:'',
            key: 'lineSeries'
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
            name: '系列',
            type: 'must',
            key: 's'
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

    let template = `<line-basic @callback="bindEvent" @count="count" ${stringAttr}>${subContent}</line-basic>`;
    return {template, attributes, names, dataApi, events}
};
export default handle;
