/**
 * @Author: 高春超
 * @description: 柱状图公共属性
 * @param {type} 
 * @return: 
 * @Date: 2019-03-13 15:23:22
 */

import { position, direction, legendPosition } from '../../datadict'
import {getTheme} from '@/utils/assist'
//边距
export const gridAttr={
    gridTop: {
        type: 'number',
        value: 30
    },
    gridBottom: {
        type: 'number',
        value: 30
    },
    gridLeft: {
        type: 'number',
        value: 30
    },
    gridRight: {
        type: 'number',
        value: 30
    }
}; 
//值标签
export const labelAttr={
    labelShow: {
        type: 'switch',
        value: false
    },
    labelPosit: {
        type: 'selection',
        value: 'insideRight',
        items: position
    },
    labelColor: {
        type: 'color',
        value: '#fff'
    },
    labelSize: {
        type: 'number',
        value: 14
    }
}
//图例
export const legendAttr={
    legendShow: {
        type: 'switch',
        value: true
    },
    legendColor: {
        type: 'color',
        value: '#fff'
    },
    legendSize: {
        type: 'number',
        value: 14
    },
    legendGap: {
        type: 'textNumber',
        value: 10
    },
    legPosition: {
        type: 'selection',
        value: '顶部居中',
        items: legendPosition
    },
    orient: {
        type: 'selection',
        value: 'horizontal',
        items: direction
    }
}
// 坐标轴
export const tickAttr={
    lineShow: {
        type: 'switch',
        value: true
    },
    tickShow: {
        type: 'switch',
        value: true
    },
    tickLength: {
        type: 'textNumber',
        value: 5
    },
    tickColor: {
        type: 'color',
        value: '#fff'
    }
}

// 图表大小
export const sizeAttr={
    width: {
        type: 'textNumber',
        value: 450
    },
    height: {
        type: 'textNumber',
        value: 250
    }
}

export const dataAttr={        
    dataType: { // 数据源类型
        type: 'text',
        value: 'Static'
    },
    apiUrl: {
        type: 'text',
        value: ''
    },
    autoReplay:{
        type:'switch',
        value:true
    },
    autosecond:{
        type:'number',
        value:3
    }
}

export function seriesAttr(){
    const theme=getTheme()  
    return {        
        barSeries: {
            type: 'barSeries',
            value: [{
                name:'系列1',
                color:theme[0]
            },{
                name:'系列2',
                color:theme[1]
            },{
                name:'系列3',
                color:theme[2]
            }]
        },
        staticData: { 
            type: 'Object',
            value: [
                {
                    "x": "浙江",
                    "y": "200",
                    "s": "1"
                },
                {
                    "x": "浙江",
                    "y": "100",
                    "s": "2"
                },
                {
                    "x": "浙江",
                    "y": "200",
                    "s": "3"
                },
                {
                    "x": "辽宁",
                    "y": "25",
                    "s": "1"
                },
                {
                    "x": "辽宁",
                    "y": "125",
                    "s": "2"
                },
                {
                    "x": "辽宁",
                    "y": "100",
                    "s": "3"
                },
                {
                    "x": "吉林",
                    "y": "190",
                    "s": "1"
                },
                {
                    "x": "吉林",
                    "y": "110",
                    "s": "2"
                },
                {
                    "x": "吉林",
                    "y": "170",
                    "s": "3"
                }
            ]
        },
        
        x: {
            type: 'text',
            value: 'x'
        },
        y: {
            type: 'text',
            value: 'y'
        },
        s: {
            type: 'text',
            value: 's'
        }
    }
}