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
        sourceData: {
            type:'Object',
            value:{
                "baseLayer":[
                    {
                        "Name": "1-18级WMTS矢量底图",
                        "Title": "1-18级WMTS矢量底图",
                        "Type": "OGC-WMTS",
                        "Url": "http://t0.tianditu.com/vec_c/wmts",
                        "Version": "1.0.0",
                        "Options": {
                            "Opacity": "1",
                            "Visibility": "true",
                            "MatrixSet": "c",
                            "Style": "default",
                            "Layer": "vec",
                            "Format": "tiles"
                        }
                    }
                ],
                "layers":[
                    {
                        
                        "Name":"热力图",
                        "Type":"HEATMAP",
                        "Url":"",
                        "Data":{
                            "type": "FeatureCollection",
                            "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
                            "features": [{ "type": "Feature", "properties": { "id": "ak16994521", "mag": 2.3, "time": 1507425650893, "felt": null, "tsunami": 0 }, "geometry": { "type": "Point", "coordinates": [ -151.5129, 63.1016, 0.0 ] } }                        ]
                        },
                        "Columns":["mag"]
                    }
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
                        value: '114,30'
                    },{
                        name:'层级',
                        type: 'number',
                        key:'zoom',
                        value: 8
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
                        name:'gradient0.4',
                        key:'gradient4',
                        type: 'color',
                        value:"green"
                    },{
                        name:'gradient0.5',
                        key:'gradient5',
                        type: 'color',
                        value:"yellow"
                    },{
                        name:'gradient0.8',
                        key:'gradient8',
                        type: 'color',
                        value:"orange"
                    },{
                        name:'gradient1.0',
                        key:'gradient10',
                        type: 'color',
                        value:"red"
                    }]
                }
            ]
        },
        opacity:{
            type: 'textNumber',
            value: 0.8
        },
        radius:{
            type: 'textNumber',
            value: 10
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