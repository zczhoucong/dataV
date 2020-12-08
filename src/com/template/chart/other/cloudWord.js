/**
 * @Author: 高春超
 * @description: 
 * @param {type} 
 * @return: 
 * @Date: 2019-03-18 08:57:21
 */


import { getSlotContent, getStringTypeAttr } from "../../index";
import {myshape} from "../../datadict";
import {getTheme} from '@/utils/assist'
const handle = function(_attr, _slots, _events) {
    const theme=getTheme()   
    // 定义默认属性
    let attributes = {
        width: {
            type: "textNumber",
            value: 300
        },
        height: {
            type: "textNumber",
            value: 300
        },
        colorone: {
            type: "color",
            value: theme[0]
        },
        colortwo: {
            type: "color",
            value: theme[1]
        },
        colorthree: {
            type: "color",
            value: theme[2]
        },
        colorfour: {
            type: "color",
            value:theme[3]
        },
        colorfive: {
            type: "color",
            value: theme[4]
        },
        myshape: {
            type: "selection",
            value: "circle",
            items: myshape
        },
        size: {
            type: "number",
            value: 1
        },
        minsize: {
            type: "number",
            value: 16
        },
        maxsize: {
            type: "number",
            value: 48
        },
        beginAngle: {
            type: "textNumber",
            value: 0
        },
        lastAngle: {
            type: "textNumber",
            value: 90
        },
        dataType: {
            // 数据源类型
            type: "text",
            value: "Static"
        },
        apiUrl: {
            type: "text",
            value: ""
        },
        staticData: {
            type: "Object",
            value: [{
                    name: "泰国",
                    value: 1,
                },
                {
                    name: '新加坡',
                    value: 2,
                }, {
                    name: '印度尼西亚',
                    value: 3,
                }, {
                    name: '中国',
                    value: 4
                }, {
                    name: '俄罗斯',
                    value: 5
                }, {
                    name: '美国',
                    value: 6
                }, {
                    name: '朝鲜',
                    value: 7
                }, {
                    name: '韩国',
                    value: 8
                }, {
                    name: '巴基斯坦',
                    value: 9
                }, {
                    name: '伊拉克',
                    value: 10
                }
            ]

        },
        name: {
            type: 'text',
            value: 'name'
        },
        value: {
            type: 'text',
            value: 'value'
        },
    };
    // 样式设置命名
    let names = [{
            name: "全局样式",
            children: [{
                    name: "形状",
                    key: "myshape"
                },
                {
                    name: "词汇间距",
                    key: "size"
                },
                {
                    name: "最小字号",
                    key: "minsize"
                },
                {
                    name: "最大字号",
                    key: "maxsize"
                },
                {
                    name: "最小角度",
                    key: "beginAngle"
                },
                {
                    name: "最大角度",
                    key: "lastAngle"
                }
            ]
        }, {
            name: '系列颜色',
            children: [{
                name: '颜色一',
                key: 'colorone'
            }, {
                name: '颜色二',
                key: 'colortwo'
            }, {
                name: '颜色三',
                key: 'colorthree'
            }, {
                name: '颜色四',
                key: 'colorfour'
            }, {
                name: '颜色五',
                key: 'colorfive'
            }]
        },
        {
            name: "图表尺寸",
            children: [{
                    name: "宽度",
                    key: "width"
                },
                {
                    name: "高度",
                    key: "height"
                }
            ]
        }
    ];

    let dataApi = [{
        name: "接口描述",
        children: [{
            name: '关键字',
            type: 'must',
            key: 'name'
        }, {
            name: '关键字大小',
            type: 'must',
            key: 'value'
        }]
    }];

    let events = [{
        name: "点击事件",
        type: "click",
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
    var subContent = getSlotContent(slots);
    //设置当前组件的slot
    if (attributes.slot && attributes.slot !== "default") {
        attributes.slot = {
            type: "text",
            value: attributes.slot
        };
    } else {
        attributes.slot = {
            type: "text",
            value: ""
        };
    }
    // 组件参数赋值
    let stringAttr = getStringTypeAttr(attributes);

    let template = `<cloud-word @callback="bindEvent" @count="count" ${stringAttr}>${subContent}</cloud-word>`;

    return {
        template,
        attributes,
        names,
        dataApi,
        events
    };
};
export default handle;