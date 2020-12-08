/**
 * geomap模板
 * @author wf
 * @sp
 */
import {getSlotContent, getStringTypeAttr} from '../index'

const handle = function (_attr, _slots) {
// 定义默认属性
    let attributes = {
        width: {
            type: 'textNumber',
            value: 1590
        },
        height: {
            type: 'textNumber',
            value: 675
        },
        dataType: { // 数据源类型
            type: 'text',
            value: 'Static'
        },
        apiUrl: {
            type: 'text',
            value: ''
        },
        vectorRange:{
            type:'Object',
            value:{
                k:{
                    value:"",
                    name:"类目",
                    status:0
                },
                v:{
                    value:"",
                    name:"值",
                    status:0
                }
            }
        },
        sourceData: {
            type:'Object',
            value:{
                "baseLayer":[
                    // {
                    //     "Name": "1-18级WMTS矢量底图",
                    //     "Title": "1-18级WMTS矢量底图",
                    //     "Type": "OGC-WMTS",
                    //     "Url": "http://t0.tianditu.com/vec_c/wmts",
                    //     "Version": "1.0.0",
                    //     "Options": {
                    //         "Opacity": "1",
                    //         "Visibility": "true",
                    //         "MatrixSet": "c",
                    //         "Style": "default",
                    //         "Layer": "vec",
                    //         "Format": "tiles"
                    //     }
                    // },
                    {
                        "Name": "nanjin92",
                        "Title": "nanjin92",
                        "Type": "OGC-WMTS",
                        "Url": "http://192.168.100.135:8400/NJDT_92/wmts",
                        "Version": "1.0.0",
                        "Options": {
                            "Opacity": "1",
                            "Visibility": "true",
                            "MatrixSet": "Matrix_0",
                            "Style": "NJDT_92",
                            "Layer": "NJDT_92",
                            "Format": "image/tile",
                            "Scales": [738188.9763779528,369094.4881889764,184547.2440944882,92273.6220472441,46136.81102362205,23068.405511811026,11534.202755905513,5767.101377952757,2883.5506889763783,1441.7753444881891,720.8876722440946],
                            "TileOrigin": "80000, 250000",
                            "TileFullExtent": "80000,50000,180000,250000",
                            "ZoomOffset": "10",
                        }
                    }
                ],
                "layers":[
                    {
                        
                        "Name":"热力图",
                        "Type":"HEATMAP",
                        "Url":null,
                        "Data":{
                            "type": "FeatureCollection",
                            "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
                            "features": [{ "type": "Feature", "properties": { "id": "ak16994521", "mag": 2.3, "time": 1507425650893, "felt": null, "tsunami": 0 }, "geometry": { "type": "Point", "coordinates": [ -151.5129, 63.1016, 0.0 ] } }                        ]
                        },
                        "Columns":["mag"]
                    },
                    {
                        "Name":"矢量图",
                        "Type":"VECTOR",
                        "Url":"../../../../static/data/vectordata.json",
                        "Data":null,
                        "Columns":["num"]
                    }//,
                    // {
                    //     "Name":"迁徙图",
                    //     "Type":"MIGRATE",
                    //     "Data":{
                    //         "type": "FeatureCollection",
                    //         "features": [ 
                    //             { "type": "Feature", "properties": { "to":[[110.3896,19.8516],[113.4668,34.6234]]}, "geometry": { "type": "Point", "coordinates": [ 114.3896, 30.6628, 0.0 ] } },
                    //             { "type": "Feature", "properties": { "to":[[119.2126,19.8516],[91.1865,30.1465]]}, "geometry": { "type": "Point", "coordinates": [ 120.7397, 37.5128, 0.0 ] } }
                    //         ]
                    //     },
                    //     "Columns":["to"]
                    // }
                ]
            }
        },
        sourceStyle:{
            type:'Object',
            value:[
                {
                    name: '底图',
                    type: 'baseLayer',
                    children: [{
                        name:'中心点',
                        type: 'text',
                        key: 'center',
                        value: '130000,150000'//'114,30'
                    },{
                        name:'层级',
                        type: 'number',
                        key:'zoom',
                        value: 10
                    }]
                },
                {
                    name:'热力图',
                    type: 'heatMap',
                    children:[{
                        name:'透明度',
                        key:'opacity',
                        type: 'number',
                        value:0.8
                    },{
                        name:'半径',
                        key:'radius',
                        type: 'number',
                        value:10
                    },{
                        name:'颜色梯度',
                        key:0.4,
                        type: 'color',
                        value:"green"
                    },{
                        name:'颜色梯度',
                        key:0.5,
                        type: 'color',
                        value:"yellow"
                    },{
                        name:'颜色梯度',
                        key:0.8,
                        type: 'color',
                        value:"orange"
                    },{
                        name:'颜色梯度',
                        key:1.0,
                        type: 'color',
                        value:"red"
                    }]
                },
                {
                    name:'矢量图',
                    type: 'vector',
                    children:[{
                        name:'透明度',
                        key:'opacity',
                        type: 'number',
                        value:0.8
                    },{
                        name:'颜色分级',
                        key:'stops',
                        type: 'color',
                        value:[
                            [1, "#5F4198"],
                            [2, "#3A204F"], 
                            [3, "#332679"], 
                            [4, "#5C656A"], 
                            [5, "#4A5595"], 
                            [6, "#683F8C"],
                            [7, "#45368D"],
                            [8, "#663E8A"], 
                            [9, "#6560AF"], 
                            [10, "#666068"], 
                            [11, "#420084"],
                        ]
                    }]
                }
            ]
        }
    };

    //组件类型 for map
    let names = [{
        name: '图表尺寸',
        children: [{
            name: '图表宽度',
            key: 'width'
        }, {
            name: '图表高度',
            key: 'height'
        }]
    }]
    let isMapComponent = true;

    let dataApi = [
        {
        name: '图层详细',
        items:[
            {"name":"底图","type":"baseLayer"},
            {"name":"热力图","type":"heatMap"}
        ],
        children: [{
            name: '别名',
            type: 'must',
            key: 'name'
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
    let stringAttr = getStringTypeAttr(attributes);
    let template = `<geomap ${stringAttr}>${subContent}</geomap>`;

    return {template, attributes, names, isMapComponent, dataApi}
};
export default handle;