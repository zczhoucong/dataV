/*
 * @desc:自然资源
 * @Author: lujing 
 * @Date: 2018-05-30 10:13:23 
 * @Last Modified by: lujing
 * @Last Modified time: 2018-06-26 18:39:25
 */
import { getSlotContent, getStringTypeAttr } from '../../index'
import { position, family, weight, legendPosition, direction } from '../../datadict'
const handle = function(_attr, _slots, _events) {
    // 定义默认属性
    let attributes = {
        font: {
            type: 'selection',
            value: 'AgencyFBBold',
            items: family
        },
        gridTop: {
            type: 'number',
            value: 30
        },
        gridBottom: {
            type: 'number',
            value: 50
        },
        gridLeft: {
            type: 'number',
            value: 30
        },
        gridRight: {
            type: 'number',
            value: 30
        },

        xShow: {
            type: 'switch',
            value: true
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
            type: 'text',
            value: '%'
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
            type: 'textNumber',
            value: 0
        },
        yMax: {
            type: 'textNumber',
            value: 35
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
            value: 485
        },
        height: {
            type: 'textNumber',
            value: 300
        },
        dataType: { // 数据源类型
            type: 'text',
            value: 'WebApi'
        },
        apiUrl: {
            type: 'text',
            value: config.resource
        },
        staticData: {
            type: 'Object',
            value: [{
                    "val": 29.86,
                    "infoId": 8,
                    "year": 2016,
                    "name": "林木覆盖率"
                },
                {
                    "val": 31,
                    "infoId": 8,
                    "year": 2020,
                    "name": "林木覆盖率"
                },
                {
                    "val": 31.5,
                    "infoId": 8,
                    "year": 2035,
                    "name": "林木覆盖率"
                },
                {
                    "val": 7.6,
                    "infoId": 9,
                    "year": 2016,
                    "name": "河湖水面率"
                },
                {
                    "val": 7.8,
                    "infoId": 9,
                    "year": 2020,
                    "name": "河湖水面率"
                },
                {
                    "val": 7.8,
                    "infoId": 9,
                    "year": 2035,
                    "name": "河湖水面率"
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
            value: 'name'
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
        name: 'x 轴',
        children: [{
                name: '显示',
                key: 'xShow'
            },
            {
                name: '颜色',
                key: 'xColor'
            }, {
                name: '字体粗细',
                key: 'xFontWeight'
            }, {
                name: '字号',
                key: 'xFontSize'
            }
        ]
    }, {
        name: 'y 轴',
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
            name: '',
            key: 'lineSeries'
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

    let template = `<resource @callback="bindEvent" @count="count" ${stringAttr}>${subContent}</resource>`;

    return { template, attributes, names, dataApi, events }
};
export default handle;