/**
 * Created by Administrator on 2018/4/9.
 * 基本水球图
 */
import {getSlotContent, getStringTypeAttr} from '../../index'
import {shape,family} from '../../datadict'
import {getTheme} from '@/utils/assist'
const handle = function (_attr, _slots) {
    const theme=getTheme()
// 定义默认属性
    let attributes = {
        width: {
            type: 'textNumber',
            value: 250
        },
        height: {
            type: 'textNumber',
            value: 250
        },
        shape: {
            type: 'selection',
            value: 'circle',
            items: shape
        },
        // radius: {
        //     type: 'number',
        //     value: 0.8
        // },
        borderDistance: {
            type: 'number',
            value: 10
        },
        borderWidth: {
            type: 'number',
            value: 10
        },
        borderColor: {
            type: 'color',
            value: theme[0]
        },
        xTitle: {
            type: 'text',
            value:''
        },
        // xTitleFontSize: {
        //     type: 'number',
        //     value: 16
        // },
        // xTitleFont: {
        //     type: 'selection',
        //     value: 'Microsoft Yahei',
        //     items: family
        // },
        // xTitleColor: {
        //     type: 'color',
        //     value: '#fff'
        // },
        xVal: {
            type: 'number',
            value: 0.4
        },
        xValFontSize: {
            type: 'number',
            value: 24
        },
        xValFont: {
            type: 'selection',
            value: 'AgencyFBBold',
            items: family
        },
        xValColor: {
            type: 'color',
            value: '#fff'
        },
        waveColor: {
            type: 'color',
            value: theme[1]
        },
        waveAnimation: {
            type: 'switch',
            value: true
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
                'xVal': 0.5,
                'xTitle':'完成率'
            }]
        },
        y: {
            type: 'text',
            value: 'xVal'
        },
        x: {
            type: 'text',
            value: 'xTitle'
        },
    };
    // 样式设置命名
    let names = [{
        name:'外框',
        children:[{
            name: '形状',
            key: 'shape'
        },
        // {
        //     name: '半径',
        //     key: 'radius'
        // },
        {
            name: '边框颜色',
            key: 'borderColor'
        },{
            name: '边框宽度',
            key: 'borderWidth'
        },{
            name: '内部距离',
            key: 'borderDistance'
        }]
    },
    {
    //     name:'内部标题',
    //     children:[{
    //         name: '字号大小',
    //         key: 'xTitleFontSize'
    //     },{
    //         name: '文字字体',
    //         key: 'xTitleFont'
    //     },{
    //         name: '文字颜色',
    //         key: 'xTitleColor'
    //     }]
    // },{
        name:'数值',
        children:[{
            name: '字号大小',
            key: 'xValFontSize'
        },{
            name: '文字字体',
            key: 'xValFont'
        },{
            name: '文字颜色',
            key: 'xValColor'
        }]
    },
    {
        name:'波浪',
        children:[{
            name: '颜色',
            key: 'waveColor'
        },{
            name: '动画',
            key: 'waveAnimation'
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
    let dataApi=[{
        name:'接口描述',
        children:[{
            name: '数值',
            type:'must',
            key: 'y'
        },{
            name: '标题',
            type:'optional',
            key: 'x'
        }]
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
    // 组件参数赋值
    let stringAttr = getStringTypeAttr(attributes);

    let template = `<liquid-fill ${stringAttr}>${subContent}</liquid-fill>`;

    return {template, attributes, names,dataApi}
};
export default handle;
