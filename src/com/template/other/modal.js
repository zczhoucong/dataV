
import { getSlotContent, getStringTypeAttr} from '../index'

const handle = function (_attr, _slots) {
// 定义默认属性
    let attributes = {
       
        width: {
            type: 'textNumber',
            value: 1100
        },
        height: {
            type: 'textNumber',
            value: 660
        }
    };
    let slots = {
        default: []
    };
    let names = [{
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
    let template = `<modal ${stringAttr}> ${subContent}</modal>`;

    return {template, attributes,names}
};
export default handle;