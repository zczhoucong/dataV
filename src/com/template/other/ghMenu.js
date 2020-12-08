/**
 * 菜单
 * Created by 高春超 on 2018/7/5.
 */
import { getSlotContent, getStringTypeAttr } from '../index'
import { family, weight } from '../datadict'
const handle = function(_attr, _slots,_events) {
    // 定义默认属性
    let attributes = {
        bgImg:{
            type: 'upLoad',
        },
        // 点的大小
        fontSize: {
            type: 'textNumber',
            value: 22
        },
        // 上移
        topOffset: {
            type: 'textNumber',
            value: 15
        },
        fontColor: {
            type: 'color',
            value:"rgba(114,152,114,1)"
        },
        fontWeight: {
            type: 'selection',
            value: 'bold',
            items: weight
        },
        fontFamily: {
            type: 'selection',
            value: 'AgencyFBBold',
            items: family
        },
        sltImg: {
            type: 'upLoad',
        },
        sltColor: {
            type: 'color',
            value:"#fff"
        },
        ImgWidth: {
            type: 'textNumber',
            value: 196
        },
        ImgHeight: {
            type: 'textNumber',
            value: 84
        },
        width: {
            type: 'textNumber',
            value: 700
        },
        height: {
            type: 'textNumber',
            value: 90
        },
        sltName: {
            type: 'text',
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
            value: [{id: "1", name: "创新发展"},
                {id: "2", name: "协调发展"},
                {id: "3", name: "绿色发展"},
                {id: "4", name: "开放发展"},
                {id: "5", name: "共享发展"}]
        },
        menuId: {
            type: 'text',
            value: 'id'
        },
        menuName: {
            type: 'text',
            value: 'name'
        }
    };
    let names = [{
        name: '全局样式',
        children: [{
            name: '默认背景图片',
            key: 'bgImg'
        }, {
            name: '图片宽度',
            key: 'ImgWidth'
        }, {
            name: '图片高度',
            key: 'ImgHeight'
        }, {
            name: '字体大小',
            key: 'fontSize'
        }, {
            name: '字体颜色',
            key: 'fontColor'
        }, {
            name: '字体粗细',
            key: 'fontWeight'
        }, {
            name: '字体样式',
            key: 'fontFamily'
        }, {
            name: '文字上移',
            key: 'topOffset'
        }]
    }, {
        name: '当前选中菜单',
        children: [{
            name: '菜单名称',
            key: 'sltName'
        }, {
            name: '背景图片',
            key: 'sltImg'
        }, {
            name: '字体颜色',
            key: 'sltColor'
        }]
    },{

        name: '图表尺寸',
        children: [{
            name: '图表宽度',
            key: 'width'
        }, {
            name: '图表高度',
            key: 'height'
        }]
    }]
    let slots = {
        default: []
    };
    let dataApi = [{
        name: '接口描述',
        children: [{
            name: 'ID',
            type: 'must',
            key: 'menuId'
        },{
            name: '菜单名称',
            type: 'must',
            key: 'menuName'
        }]
    }];
    let events = [{
        name: '点击事件',
        type: 'click',
        children: []
    }];
    // 覆盖默认属性
    Object.assign(slots, _slots);
    Object.assign(attributes, _attr);
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
    let template = `<gh-menu @callback="bindEvent" @count="count" ${stringAttr}>${subContent}</gh-menu>`;

    return { template, attributes, names, dataApi,events }
};
export default handle;