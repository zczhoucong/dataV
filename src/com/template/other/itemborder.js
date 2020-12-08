/**
 * 条目边框
 * Created by Administrator
 */
import { getSlotContent, getStringTypeAttr } from '../index'
import {family,weight} from '../datadict'
const handle = function(_attr, _slots, _events) {
    // 定义默认属性
    let attributes = {
        maintitle: {
            type: 'text',
            value: '栏目标题'
        },
        width: {
            type: 'textNumber',
            value: 400
        },
        height: {
            type: 'textNumber',
            value: 200
        },
        titleHeight: {
            type: 'textNumber',
            value: 42
        },
        titleFont: {
            type: 'textNumber',
            value: 24
        },
        titleColor:{
            type:'color',
            value:'white'
        },
        titlefamily:{
            type:'selection',
            value:'Microsoft Yahei',
            items:family
        },
        titleSize:{
            type:'selection',
            value:'normal',
            items:weight
        }
    };
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
    let slots = {
        default: []
    };
    let names = [{
            name: '标题',
            children: [{
                name: '内容',
                key: 'maintitle'
            }, {
                name: '字号',
                key: 'titleFont'
            },{
                name:'颜色',
                key:'titleColor'
            }, {
                name:'字体',
                key:'titlefamily'
            },{
                name:'粗细',
                key:'titleSize'
            },{
                name: '标题高度',
                key: 'titleHeight'
            }]

        },
        {
            name: '栏目边框尺寸位置',
            children: [{
                name: '栏目宽度',
                key: 'width'
            }, {
                name: '栏目高度',
                key: 'height'
            }]
        }
    ];
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
    let template = `<itemborder @callback="bindEvent" @count="count" ${stringAttr}> ${subContent}</itemborder>`;

    return { template, attributes, names, events }
};
export default handle;