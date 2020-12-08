/**
 * Created by 高春超 on 2018年5月28日17:16:22
 * 城镇化率
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
            value: 22
        },
        fontWeight: {
            type: 'selection',
            value: 'normal',
            items: weight
        },
        fontHeight: {
            type: 'textNumber',
            value: 30
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
            value: 530
        },
        height: {
            type: 'textNumber',
            value: 250
        },
        dataType: { // 数据源类型
            type: 'text',
            value: 'WebApi'
        },
        apiUrl: {
            type: 'text',
            value: config.cityRate
        },
        staticData: {
            type: 'Object',
            value: []
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
            value: 'year'
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

    let template = `<city-rate @callback="bindEvent" @count="count" ${stringAttr}>${subContent}</city-rate>`;
    return { template, attributes, names, dataApi, events }
};
export default handle;