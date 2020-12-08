import { getSlotContent, getStringTypeAttr } from '../../index'
import { weight,family,lineStyle } from '../../datadict'
import {getTheme} from '@/utils/assist'
const handle = function(_attr, _slots) {
    const theme=getTheme()
    // 定义默认属性
    let attributes = {
        // 轴线样式
        axisshow: {
            type: 'switch',
            value: true
        },
        axiscolor1: {
            type: 'color',
            value: theme[0]
        },
        axiscolor2: {
            type: 'color',
            value: theme[1]
        },
        axiscolor3: {
            type: 'color',
            value: theme[2]
        },
        axiswidth: {
            type: 'textNumber',
            value: 30
        },
        minvalue: {
            type: 'textNumber',
            value: 0
        },
        maxvalue: {
            type: 'textNumber',
            value: 100
        },

        // 指针样式
        pointershow: {
            type: 'switch',
            value: true
        },
        pointerlength: {
            type: 'textNumber',
            value: 60
        },
        pointerwidth: {
            type: 'textNumber',
            value: 10
        },

        // 标题样式
        titelshow: {
            type: 'switch',
            value: true
        },
        titlefontsize: {
            type: 'textNumber',
            value: 20
        },
        titlecolor: {
            type: 'color',
            value: '#ffffff'
        },
        titlesize:{
            type:'selection',
            value:'normal',
            items:weight
        },
        titlefont:{
            type:'selection',
            value:'Microsoft Yahei',
            items:family
        },

        // 标签样式
        labelshow: {
            type: 'switch',
            value: true
        },
        labeldis: {
            type: 'textNumber',
            value: 5
        },
        labelFontsize: {
            type: 'textNumber',
            value: 20
        },
        labelsize:{
            type:'selection',
            value:'normal',
            items:weight
        },
        labelfont:{
            type:'selection',
            value:'Microsoft Yahei',
            items:family
        },
        // 分割线样式
        splitLinecolor: {
            type: 'color',
            value: '#222222'
        },
        splitwidth: {
            type: 'textNumber',
            value: 2
        },
        splitnumber: {
            type: 'textNumber',
            value: 5
        },
        splitlenght: {
            type: 'textNumber',
            value: 30
        },
        splittype: {
            type: 'selection',
            value: 'solid',
            items: lineStyle
        },
        splitshow: {
            type: 'switch',
            value: true
        },
        // 刻度线样式
        ticklineshow: {
            type: 'switch',
            value: true
        },
        ticksplitnum: {
            type: 'textNumber',
            value: 5
        },
        ticklength: {
            type: 'textNumber',
            value: 20
        },
        tickcolor: {
            type: 'color',
            value: '#ffffff'
        },
        tickwidth: {
            type: 'textNumber',
            value: 1
        },
        tickstyle: {
            type: 'selection',
            value: 'solid',
            items: lineStyle
        },

        width: {
            type: 'textNumber',
            value: 330
        },
        height: {
            type: 'textNumber',
            value: 330
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
                'number': 90,
                'name': '完成率'
            }]
        },
        x: {
            type: 'text',
            value: 'number'
        },
        y: {
            type: 'text',
            value: 'name'
        },
    };
    let names = [{
        name: '轴线',
        children: [{
            name: '第一段轴线颜色',
            key: 'axiscolor1'
        }, {
            name: '第二段轴线颜色',
            key: 'axiscolor2'
        }, {
            name: '第三段轴线颜色',
            key: 'axiscolor3'
        }, {
            name: '宽度',
            key: 'axiswidth'
        }, {
            name: '最小刻度',
            key: 'minvalue'
        }, {
            name: '最大刻度',
            key: 'maxvalue'
        }]
    }, {
        name: '标题',
        fixed:'titelshow',
        children: [{
            name: '显示',
            key: 'titelshow'
        }, {
            name: '字号',
            key: 'titlefontsize'
        }, {
            name: '颜色',
            key: 'titlecolor'
        },{
            name:'粗细',
            key:'titlesize'
        },{
            name:'字体',
            key:'titlefont'
        }]
    }, {
        name: '指针',
        fixed:'pointershow',
        children: [{
            name: '显示',
            key: 'pointershow'
        }, {
            name: '长度',
            key: 'pointerlength'
        }, {
            name: '宽度',
            key: 'pointerwidth'
        }]
    }, {
        name: '标签',
        fixed:'labelshow',
        children: [{
            name: '显示',
            key: 'labelshow'
        }, {
            name: '与刻度的间距',
            key: 'labeldis'
        }, {
            name: '字号',
            key: 'labelFontsize'
        },{
            name:'粗细',
            key:'labelsize'
        },{
            name:'字体',
            key:'labelfont'
        }]
    }, {
        name: '刻度线',
        fixed:'ticklineshow',
        children: [{
            name: '显示',
            key: 'ticklineshow'
        }, {
            name: '分割数',
            key: 'ticksplitnum'
        }, {
            name: '长度',
            key: 'ticklength'
        }, {
            name: '颜色',
            key: 'tickcolor'
        }, {
            name: '宽度',
            key: 'tickwidth'
        }, {
            name: '样式',
            key: 'tickstyle'
        }]
    }, {
        name: '分割线',
        fixed:'splitshow',
        children: [{
            name: '颜色',
            key: 'splitLinecolor'
        }, {
            name: '宽度',
            key: 'splitwidth'
        }, {
            name: '数量',
            key: 'splitnumber'
        }, {
            name: '长度',
            key: 'splitlenght'
        }, {
            name: '样式',
            key: 'splittype'
        }, {
            name: '是否展示',
            key: 'splitshow'
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
    }]

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

    let stringAttr = getStringTypeAttr(attributes);
    let template = `<gauge-basic ${stringAttr}>${subContent}</gauge-basic>`;

    return { template, attributes, names, dataApi }
};
export default handle;