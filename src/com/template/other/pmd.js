/**
 * Created by Administrator 
 * 跑马灯
 */

import { getSlotContent, getStringTypeAttr } from '../index'
import {direction2,family,weight} from '../datadict.js'
const handle = function(_attr, _slots) {
    // 定义默认属性
    let attributes = {
        width: {
            type: 'textNumber',
            value: 300
        },
        height: {
            type: 'textNumber',
            value: 50
        },
        bgcolor:{
            type:'color',
            value:'#0E2A43'
        },
        direction:{
            type:'selection',
            value:'left',
            items:direction2
        },
        scrollamount:{
            type:'number',
            value:30
        },
        size:{
            type:'textNumber',
            value:20
        },
        color:{
            type:'color',
            value:'#ffffff'
        },
        family:{
            type:'selection',
            value:'Microsoft Yahei',
            items:family
        },
        weight:{
            type:'selection',
            value:'normal',
            items:weight
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
                    text: "欢迎测试跑马灯功能~~",
                }
            ]
        },
    };
   
    let names = [{
        name:'全局样式',
        children:[{
            name:'背景色',
            key:'bgcolor'
        },{
            name:'方向',
            key:'direction'
        },{
            name:'速度',
            key:'scrollamount'
        },{
            name:'字号',
            key:'size'
        },{
            name:'字体颜色',
            key:'color'
        },{
            name:'字体',
            key:'family'
        },{
            name:'粗细',
            key:'weight'
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
        children: []
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

    let template = `<pmd @callback="bindEvent" @count="count" ${stringAttr}>${subContent}</pmd>`;

    return {
        template,
        attributes,
        names,
        dataApi,
    }
};
export default handle;