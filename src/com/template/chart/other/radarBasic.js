/**
 * Created by 高春超
 * 基本雷达图
 */
import {getSlotContent, getStringTypeAttr} from '../../index'
import {radarType, family, legendPosition,direction} from '../../datadict'
import {getTheme,hexToRgba} from '@/utils/assist'
const handle = function (_attr, _slots, _events) {
    const theme=getTheme()
// 定义默认属性
    let attributes = {
        font: {
            type: 'selection',
            value: 'AgencyFBBold',
            items: family
        },
        color: {
            type: 'color',
            value: '#fff'
        },
        xCenter: {
            type: 'number',
            value: 50
        },
        yCenter: {
            type: 'number',
            value: 55
        },
        fontSize: {
            type: 'number',
            value: 12
        },
        shape:{
            type: 'selection',
            value: 'circle',
            items: radarType
        },
        newLine: {
            type: 'textNumber',
            value: 0
        },
        splitLine:{
            type: 'color',
            value: 'rgba(108,102,238,0.6)'
        },
        splitAreaShow: {
            type: 'switch',
            value: false
        },
        splitArea:{
            type: 'color',
            value: 'rgba(238, 197, 102, 0.6)'
        },
        splitLineShow: {
            type: 'switch',
            value: true
        },
        axisLineShow: {
            type: 'switch',
            value: true
        },
        axisLine:{
            type: 'color',
            value: 'rgba(238, 197, 102, 0.6)'
        },
        radius: {
            type: 'number',
            value: 70
        },
        radarSeries:{
            type:'radarSeries',
            value:[{
                name:'第一组',
                lineColor:theme[0],
                areaColor:hexToRgba(theme[0],50)
            },{
                name:'第二组',
                lineColor:theme[1],
                areaColor:hexToRgba(theme[1],50)
            }]
        },
        width: {
            type: 'textNumber',
            value: 450
        },
        height: {
            type: 'textNumber',
            value: 250
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
            value: 12
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
            value: [
                {
                    "x": "内蒙古",
                    "y": "375",
                    "s": "第一组"
                },
                {
                    "x": "内蒙古",
                    "y": "180",
                    "s": "第二组"
                },
                {
                    "x": "浙江",
                    "y": "200",
                    "s": "第一组"
                },
                {
                    "x": "浙江",
                    "y": "100",
                    "s": "第二组"
                },
                {
                    "x": "辽宁",
                    "y": "25",
                    "s": "第一组"
                },
                {
                    "x": "辽宁",
                    "y": "125",
                    "s": "第二组"
                },
                {
                    "x": "吉林",
                    "y": "190",
                    "s": "第一组"
                },
                {
                    "x": "吉林",
                    "y": "110",
                    "s": "第二组"
                },
                {
                    "x": "黑龙江",
                    "y": "90",
                    "s": "第一组"
                },
                {
                    "x": "黑龙江",
                    "y": "60",
                    "s": "第二组"
                },
                {
                    "x": "安徽",
                    "y": "240",
                    "s": "第一组"
                },
                {
                    "x": "安徽",
                    "y": "170",
                    "s": "第二组"
                },
                {
                    "x": "福建",
                    "y": "420",
                    "s": "第一组"
                },
                {
                    "x": "福建",
                    "y": "190",
                    "s": "第二组"
                }
            ]
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
        }
    };
    // 样式设置命名
    let names = [{
        name: '全局样式',
        children: [{
            name: '半径',
            key: 'radius'
        },{
            name: '横坐标',
            key: 'xCenter'
        },{
            name: '纵坐标',
            key: 'yCenter'
        },{
            name: '绘制类型',
            key: 'shape'
        }]
    }, {
        name:"网格线",
        fixed:'splitLineShow',
        children:[{
            name: '显示',
            key: 'splitLineShow'
        },{
            name: '颜色',
            key: 'splitLine'
        },{
            name: '区域显示',
            key: 'splitAreaShow'
        },{
            name: '区域颜色',
            key: 'splitArea'
        }]
    },{
        name:"轴线",
        fixed:'axisLineShow',
        children:[{
            name: '显示',
            key: 'axisLineShow'
        },{
            name: '轴线颜色',
            key: 'axisLine'
        }]
    },{
        name: '标签',
        children: [{
            name: '字体',
            key: 'font'
        }, {
            name: '字体颜色',
            key: 'color'
        }, {
            name: '字号',
            key: 'fontSize'
        },{
            name: '换行数量',
            key: 'newLine'
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
        name: '系列数据',
        children: [{
            name:'',
            key: 'radarSeries'
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

    let template = `<radar-basic @callback="bindEvent" @count="count" ${stringAttr}>${subContent}</radar-basic>`;
    
    return {template, attributes, names, dataApi, events}
};
export default handle;
