/*
 * @desc:城乡建设用地
 * @Author: lujing 
 * @Date: 2018-05-30 15:15:20 
 * @Last Modified by: lujing
 * @Last Modified time: 2018-06-08 11:48:13
 */
import { getSlotContent, getStringTypeAttr } from '../../index'
import { radarType, family, legendPosition, direction } from '../../datadict'
const handle = function(_attr, _slots, _events) {
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
            value: 43
        },
        fontSize: {
            type: 'number',
            value: 14
        },
        shape: {
            type: 'selection',
            value: 'polygon',
            items: radarType
        },
        newLine: {
            type: 'textNumber',
            value: 0
        },
        radius: {
            type: 'number',
            value: 50
        },
        radarSeries: {
            type: 'radarSeries',
        },
        width: {
            type: 'textNumber',
            value: 560
        },
        height: {
            type: 'textNumber',
            value: 360
        },
        dataType: { // 数据源类型
            type: 'text',
            value: 'WebApi'
        },
        apiUrl: {
            type: 'text',
            value: config.landUse
        },
        staticData: {
            type: 'Object',
            value: []
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
            name: '半径',
            key: 'radius'
        }, {
            name: '横坐标',
            key: 'xCenter'
        }, {
            name: '纵坐标',
            key: 'yCenter'
        }, {
            name: '绘制类型',
            key: 'shape'
        }]
    }, {
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

    let template = `<land-use @callback="bindEvent" @count="count" ${stringAttr}>${subContent}</land-use>`;

    return { template, attributes, names, dataApi, events }
};
export default handle;