/**
 * Created by 高春超
 * 多环带图饼图
 */
import {getSlotContent, getStringTypeAttr} from '../../index'
import { family, direction} from '../../datadict'
import {getTheme} from '@/utils/assist'
const handle = function (_attr, _slots, _events) {
    const theme=getTheme()  
// 定义默认属性
    let attributes = {
        numSize:{
            type: 'textNumber',
            value: 24
        },
        numFont:{
            type: 'selection',
            value: 'AgencyFBBold',
            items:family
        },
        orient:{
            type: 'selection',
            value: 'vertical',
            items:direction
        },
        lableWidth:{
            type: 'textNumber',
            value: 50
        },
        lableColor:{
            type: 'color',
            value: '#fff'
        },
        percentColor:{
            type: 'color',
            value: '#fff'
        },
        holderColor:{
            type: 'color',
            value: 'rgba(255,255,255,.2)'
        },
        holderWidth:{
            type: 'textNumber',
            value: 1
        },
        imgSize: {
            type: 'textNumber',
            value: 40
        },
        imgSource: {
            type: 'upLoad',
        },
        legX:{
            type: 'number',
            value: 65
        },
        lableSize:{
            type: 'textNumber',
            value: 18
        },
        percentSize:{
            type: 'textNumber',
            value: 18
        },
        legY:{
            type: 'number',
            value: 40
        },
        legShow:{
            type: 'switch',
            value: true
        },
        centerX: {
            type: 'number',
            value: 35
        },
        centerY: {
            type: 'number',
            value: 50
        },
        pieSeries: {
            type: 'ringMultiSeries',
            value: [{
                color: theme[0],
                borderWidth: 5,
                radius: 32
            },{
                color: theme[1],
                borderWidth: 5,
                radius: 42
            },{
                color: theme[2],
                borderWidth: 5,
                radius: 52
            }]
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
                "val": 97.6,
                "infoId": 8,
                "year": 2016,
                "name": "河湖水面率",
                "id": 47
            }, {
                "val": 7.8,
                "infoId": 8,
                "year": 2020,
                "name": "河湖水面率",
                "id": 50
            }, {
                "val": 7.8,
                "infoId": 8,
                "year": 2035,
                "name": "河湖水面率",
                "id": 51
            }]
        },
        x: {
            type: 'text',
            value: 'name'
        },
        y: {
            type: 'text',
            value: 'val'
        },
        s: {
            type: 'text',
            value: 'year'
        }
    };
    // 样式设置命名
    let names = [{
        name: '全局样式',
        children: [{
            name: '字体',
            key: 'numFont'
        },{
            name: '图表水平位置',
            key: 'centerX'
        }, {
            name: '图表垂直位置',
            key: 'centerY'
        }, {
            name: '中心图片',
            key: 'imgSource'
        }, {
            name: '图片大小',
            key: 'imgSize'
        }, {
            name: '里环颜色',
            key: 'holderColor'
        }, {
            name: '里环宽度',
            key: 'holderWidth'
        }]
    }, {
        name: '图例',
        fixed:'legShow',
        children: [{
            name: '显示',
            key: 'legShow'
        }, {
            name: '水平位置',
            key: 'legX'
        }, {
            name: '垂直位置',
            key: 'legY'
        }, {
            name: '方向',
            key: 'orient'
        },{
            name: '文字宽度',
            key: 'lableWidth'
        },{
            name: '文字大小',
            key: 'lableSize'
        },{
            name: '文字颜色',
            key: 'lableColor'
        },{
            name: '数字大小',
            key: 'numSize'
        },{
            name: '百分号颜色',
            key: 'percentColor'
        },{
            name: '百分号大小',
            key: 'percentSize'
        }]
    },{
        name: '数据系列',
        children: [{
            name:'',
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

    let template = `<pie-icon-multi @callback="bindEvent" @count="count" ${stringAttr}>${subContent}</pie-icon-multi>`;

    return {template, attributes, names, dataApi, events}
};
export default handle;
