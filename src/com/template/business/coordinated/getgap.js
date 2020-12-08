/*
 * @desc:对标找差
 * @Author: lujing 
 * @Date: 2018-04-28 15:13:28 
 * @Last Modified by: lujing
 * @Last Modified time: 2018-06-04 07:21:32
 */
import {  getSlotContent, getStringTypeAttr } from '../../index'

const handle = function(_attr, _slots, _events) {
    // 定义默认属性
    let attributes = {
        //    组件宽度
        width: {
            type: 'textNumber',
            value: 580
        },
        // 组件高度
        height: {
            type: 'textNumber',
            value: 165
        },
        // 是否轮播
        isLBAuto: {
            type: 'switch',
            value: true
        },
        // 滚动时间
        scrollTime: {
            type: 'textNumber',
            value: 2
        },
        dataType: { // 数据源类型
            type: 'text',
            value: 'WebApi'
        },
        apiUrl: {
            type: 'text',
            value: config.getGap
        },
        staticData: {
            type: 'Object',
            value: []
        },
        x: {
            type: 'text',
            value: 'cityName'
        },
        y: {
            type: 'text',
            value: 'val'
        },
        s: {
            type: 'text',
            value: 'differCity'
        },
        i: {
            type: 'text',
            value: 'planId'
        },
        t: {
            type: 'text',
            value: 'planName'
        }


    };
    let slots = {
        default: []
    };
    // 外部可设置的属性
    let names = [{
        name: '全局样式',
        children: [{
            name: '是否自动轮播',
            key: 'isLBAuto'
        }, {
            name: '轮播时间间隔',
            key: 'scrollTime'
        }]
    }, {
        name: '条目边框尺寸位置',
        children: [{
            name: '条目宽度',
            key: 'width'
        }, {
            name: '条目高度',
            key: 'height'
        }]
    }];
    // 覆盖默认属性
    Object.assign(slots, _slots);
    Object.assign(attributes, _attr);

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
                                href: 'http://www.geostar.com.cn/'
                            }); &t&
                }`
        }]
    }];
    Object.assign(events, _events);


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
    let template = `<get-gap @callback="bindEvent"  @count="count" ${stringAttr}> ${subContent}</get-gap>`;

    return { template, attributes, names, dataApi, events }
};
export default handle;