/*
 * @desc:城市人口
 * @Author: lujing 
 * @Date: 2018-06-01 17:07:38 
 * @Last Modified by: lujing
 * @Last Modified time: 2018-06-28 10:14:16
 */
import { getSlotContent, getStringTypeAttr } from '../../index'
import { family, weight, direction } from '../../datadict'
const handle = function(_attr, _slots, _events) {
    // 定义默认属性
    let attributes = {
        fontFamily: {
            type: 'selection',
            value: 'AgencyFBBold',
            items: family
        },
        fontColor: {
            type: 'color',
            value: '#fff'
        },
        fontSize: {
            type: 'number',
            value: 18
        },
        xFontSize: {
            type: 'number',
            value: 14
        },
        yFontSize: {
            type: 'number',
            value: 14
        },
        // 边距
        gridLeft:{
            type:'number',
            value:8
        },
        gridRight:{
            type:'number',
            value:30
        },
        gridBottom:{
            type:'number',
            value:8
        },
        gridTop:{
            type:'number',
            value:40
        },

        tickLength: {
            type: 'number',
            value: 5
        },
        xMargin: {
            type: 'number',
            value: 8
        },
        fontWeight: {
            type: 'selection',
            value: 'normal',
            items: weight
        },
        fontHeight: {
            type: 'textNumber',
            value: 20
        },
        bubbleListColor: {
            type: 'bubbleListColor',
            value: []
        },
        isScroll: {
            type: 'switch',
            value: true
        },
        scrollDir: {
            type: 'selection',
            value: 'horizontal',
            items: direction
        },
        scrollTime: {
            type: 'textNumber',
            value: 2
        },
        nums: {
            type: 'textNumber',
            value: 2
        },
        width: {
            type: 'textNumber',
            value: 503
        },
        height: {
            type: 'textNumber',
            value: 217
        },
        dataType: { // 数据源类型
            type: 'text',
            value: 'WebApi'
        },
        apiUrl: {
            type: 'text',
            value: config.cityNum
        },
        staticData: {
            type: 'Object',
            value: [{
                    "val": 827,
                    "infoId": 1,
                    "year": 2016,
                    "name": "市域常住人口（万人）"
                },
                {
                    "val": 960,
                    "infoId": 1,
                    "year": 2020,
                    "name": "市域常住人口（万人）"
                },
                {
                    "val": 1300,
                    "infoId": 1,
                    "year": 2035,
                    "name": "市域常住人口（万人）"
                },
                {
                    "val": 12.7,
                    "infoId": 2,
                    "year": 2016,
                    "name": "常住人口人均GDP(万元/人)"
                },
                {
                    "val": 15,
                    "infoId": 2,
                    "year": 2020,
                    "name": "常住人口人均GDP(万元/人)"
                },
                {
                    "val": 27,
                    "infoId": 2,
                    "year": 2035,
                    "name": "常住人口人均GDP(万元/人)"
                },
                {
                    "val": 2.36,
                    "infoId": 4,
                    "year": 2016,
                    "name": "城乡居民收入比"
                },
                {
                    "val": 2.28,
                    "infoId": 4,
                    "year": 2020,
                    "name": "城乡居民收入比"
                },
                {
                    "val": 1.8,
                    "infoId": 4,
                    "year": 2035,
                    "name": "城乡居民收入比"
                },
                {
                    "val": 0.856,
                    "infoId": 3,
                    "year": 2016,
                    "name": "人类发展指数"
                },
                {
                    "val": 0.869,
                    "infoId": 3,
                    "year": 2020,
                    "name": "人类发展指数"
                },
                {
                    "val": 0.9,
                    "infoId": 3,
                    "year": 2035,
                    "name": "人类发展指数"
                }
            ]
        },
        x: {
            type: 'text',
            value: 'year'
        },
        y: {
            type: 'text',
            value: 'val'
        },
        s: {
            type: 'text',
            value: 'infoId'
        },
        i: {
            type: 'text',
            value: 'infoId'
        },
        t: {
            type: 'text',
            value: 'name'
        }
    };
    // 样式设置命名
    let names = [{
        name: '全局样式',
        children: [{
            name: '动画效果',
            key: 'isScroll'
        }, {
            name: '滚动方向',
            key: 'scrollDir'
        }, {
            name: '滚动时长',
            key: 'scrollTime'
        }, {
            name: '单屏数量',
            key: 'nums'
        }]
    }, {
        name: '标题',
        children: [{
            name: '字体',
            key: 'fontFamily'
        }, {
            name: '颜色',
            key: 'fontColor'
        }, {
            name: '字号',
            key: 'fontSize'
        }, {
            name: '粗细',
            key: 'fontWeight'
        }, {
            name: '标题高度',
            key: 'fontHeight'
        }]
    },{
        name:'边距',
        children:[{
            name:'上边距',
            key:'gridTop'
        },{
            name:'右边距',
            key:'gridRight'
        },{
            name:'下边距',
            key:'gridBottom'
        },{
            name:'左边距',
            key:'gridLeft'
        }]
    }, {
        name: '系列配置',
        children: [{
            name: '',
            key: 'bubbleListColor'
        }]
    }, {
        name: '轴标签字体与轴刻度',
        children: [{
            name: 'x轴字体大小',
            key: 'xFontSize'
        }, {
            name: 'y轴字体大小',
            key: 'yFontSize'
        }, {
            name: '刻度长度',
            key: 'tickLength'
        }, {
            name: '刻度与X轴线的距离',
            key: 'xMargin'
        }]
    }, {
        name: '图表尺寸位置',
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
        }, {
            name: 'ID',
            type: 'must',
            key: 'i'
        }, {
            name: '名称',
            type: 'must',
            key: 't'
        }]
    }];

    let events = [{
        name: '点击事件',
        type: 'click',
        children: [{
            xid: 1,
            event: `() => {          
                           return &t& this.$DialogBox({
                               href: 'http://www.baidu.com/'
                           }); &t&
               }`
        }, {
            xid: 2,
            event: `() => {          
                           return &t& this.$DialogBox({
                               href: 'http://www.geostar.com.cn/'
                           }); &t&
               }`
        }, {
            xid: 3,
            event: `() => {          
                           return &t& this.$DialogBox({
                               href: 'http://www.geostar.com.cn/'
                           }); &t&
               }`
        }, {
            xid: 4,
            event: `() => {          
                           return &t& this.$DialogBox({
                               href: 'http://www.geostar.com.cn/'
                           }); &t&
               }`
        }]
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

    let template = `<city-person-num @callback="bindEvent" @count="count" ${stringAttr}>${subContent}</city-person-num>`;
    return { template, attributes, names, dataApi, events }
};
export default handle;