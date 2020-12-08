/**
 * @Author: 高春超
 * @description: 柱状图bar公共属性名称
 * @param {type} 
 * @return: 
 * @Date: 2019-03-13 15:17:25
 */

//边距
export const gridName={
    name: '边距',
    children: [{
        name: '上边距',
        key: 'gridTop'
    }, {
        name: '下边距',
        key: 'gridBottom'
    }, {
        name: '左边距',
        key: 'gridLeft'
    }, {
        name: '右边距',
        key: 'gridRight'
    }]
}
//值标签
export const labelName={
    name: '值标签', 
    fixed:'labelShow',       
    children: [{
        name: '显示',
        key: 'labelShow'
    }, {
        name: '位置',
        key: 'labelPosit'
    }, {
        name: '颜色',
        key: 'labelColor'
    }, {
        name: '字号',
        key: 'labelSize'
    }]
}
//图例
export const legendName={
    name: '图例',
    fixed:'legendShow',
    children: [{
        name: '显示',
        key: 'legendShow'
    }, {
        name: '颜色',
        key: 'legendColor'
    }, {
        name: '字体大小',
        key: 'legendSize'
    }, {
        name: '间距',
        key: 'legendGap'
    }, {
        name: '位置',
        key: 'legPosition'
    }, {
        name: '布局',
        key: 'orient'
    }]
}
// 坐标轴
export const tickName={
    name: '坐标轴',
    children: [{
        name: '轴线',
        key: 'lineShow'
    }, {
        name: '刻度',
        key: 'tickShow'
    }, {
        name: '刻度长度',
        key: 'tickLength'
    }, {
        name: '颜色',
        key: 'tickColor'
    }]
}
// 图表大小
export const sizeName={
    name: '图表尺寸',
    children: [{
        name: '图表宽度',
        key: 'width'
    }, {
        name: '图表高度',
        key: 'height'
    }]
}
 