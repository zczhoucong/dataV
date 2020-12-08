/**
 * Created by Administrator on 2018/4/2.
 */
import Mock from "mockjs";
import {param2Obj} from "@/utils/assist";
let List = [];
List.push({
    projectId: 'aaa-bbb-1211', // 项目ID
    pageId: 'aaa-ccc-1211', // 页面ID
    pageName: 'aaa',//页面名称
    pgStatus: '0', // 页面状态 0：未发布 1：已发布
    first: 1,
    screen: require('../images/project/118872_0b867e53c1d233ce9fe49d54549a2323.png'),//页面截图
    components: '[{"attributes":{"type":{"type":"selection","value":"box4","items":["box1","box2","box3","box4","box5","box6"]},"width":{"type":"textNumber","value":400},"height":{"type":"textNumber","value":200},"class":{"type":"text","value":""}},"info":{"name":"自定义边框","type":"border","bgImg":"","ptype":"other","id":"7e9b1f69-57ce"},"position":{"offsetLeft":190,"offsetTop":109,"zIndex":0}},{"attributes":{"text":{"type":"text","value":"测试"},"direction":{"type":"selection","value":"horizontal","items":["horizontal","vertical"]},"size":{"type":"number","value":16},"color":{"type":"color","value":"#fff"},"space":{"type":"number","value":10},"width":{"type":"textNumber","value":202},"height":{"type":"textNumber","value":60},"class":{"type":"text","value":""}},"info":{"name":"通用标题","type":"title","bgImg":"","ptype":"other","id":"87337e83-4a4d"},"position":{"offsetLeft":242,"offsetTop":51,"zIndex":1}},{"attributes":{"background":{"type":"upLoad","value":"data:image/png;base64,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|end|"},"href":{"type":"text","value":""},"target":{"type":"switch","value":false},"width":{"type":"textNumber","value":60},"height":{"type":"textNumber","value":60},"class":{"type":"text","value":""}},"info":{"name":"单张图片","type":"sigImg","bgImg":"","ptype":"other","id":"e9c5db04-638f"},"position":{"offsetLeft":185,"offsetTop":51,"zIndex":2}}]',
    config: '{"backgroundImage":"","color":"#0e2a43","width":1920,"height":1080}'
});
const count = 2;
for (let i = 0; i < count; i++) {
    List.push(Mock.mock({
        projectId: 'aaa-bbb-1211',
        pageId: '@guid',
        pageName: '@name',//页面名称
        'pgStatus|1': ['0', '1'], // 页面状态 0：未发布 1：已发布
        // 'first|0': [0, 1], // 页面状态 0：非首页 1：首页
        first: 0,
        screen: require('../images/project/118872_0b867e53c1d233ce9fe49d54549a2323.png'),//页面截图        
        components: '[{"attributes":{"type":{"type":"selection","value":"box4","items":["box1","box2","box3","box4","box5","box6"]},"width":{"type":"textNumber","value":400},"height":{"type":"textNumber","value":200},"class":{"type":"text","value":""}},"info":{"name":"自定义边框","type":"border","bgImg":"","ptype":"other","id":"7e9b1f69-57ce"},"position":{"offsetLeft":190,"offsetTop":109,"zIndex":0}},{"attributes":{"text":{"type":"text","value":"测试"},"direction":{"type":"selection","value":"horizontal","items":["horizontal","vertical"]},"size":{"type":"number","value":16},"color":{"type":"color","value":"#fff"},"space":{"type":"number","value":10},"width":{"type":"textNumber","value":202},"height":{"type":"textNumber","value":60},"class":{"type":"text","value":""}},"info":{"name":"通用标题","type":"title","bgImg":"","ptype":"other","id":"87337e83-4a4d"},"position":{"offsetLeft":242,"offsetTop":51,"zIndex":1}},{"attributes":{"background":{"type":"upLoad","value":"data:image/png;base64,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|end|"},"href":{"type":"text","value":""},"target":{"type":"switch","value":false},"width":{"type":"textNumber","value":60},"height":{"type":"textNumber","value":60},"class":{"type":"text","value":""}},"info":{"name":"单张图片","type":"sigImg","bgImg":"","ptype":"other","id":"e9c5db04-638f"},"position":{"offsetLeft":185,"offsetTop":51,"zIndex":2}}]',
        config: '{"backgroundImage":"","color":"#0e2a43","width":1920,"height":1080}'
    }))
}

export default {
    getPageList: params => {
        const {projectId} = param2Obj(params.url);
        const pageList = List.filter(i => i.projectId === projectId);
        return {
            code: 0,
            pageList: pageList
        }
    },
    firstPage: params => {
        const {pageId} = JSON.parse(params.body);
        List.forEach(i => {
            if (i.pageId === pageId) {
                i.first = 1;
            } else {
                i.first = 0;
            }
        })
        return {code: 0};
    },
    copyPage:params=>{
        const {pageId} = JSON.parse(params.body);
        const page= List.filter(x=>x.pageId===pageId)[0];
        const newPage=Object.assign(JSON.parse(JSON.stringify(page)),Mock.mock({ pageId: '@guid',pageName:page.pageName+'_copy',first:0,pgStatus:0}))
        List.push(newPage)        
        return {
            code: 0,
            pageList: List
        };
    },
    delPage: params => {
        const {pageId} = param2Obj(params.url);
        const index = List.findIndex(x => x.pageId === pageId);
        List.splice(index, 1);
        return {code: 0};
    },
    editPage: params => {
        const {pageId, pageName} = JSON.parse(params.body);
        const index = List.findIndex(x => x.pageId === pageId);
        List[index].pageName = pageName;
        return {code: 0};
    },
    addPage: params => {
        const {projectId, pageId, pageName} = JSON.parse(params.body);
        debugger;
        // 判断名称是否重复
        const index = List.findIndex(x => x.pageName === pageName);
        if (index === -1) {
            List.push({
                projectId: projectId, // 页面ID
                pageId: pageId, // 页面ID
                pageName: pageName,//页面名称
                pgStatus: '0', // 页面状态 0：未发布 1：已发布
                screen: require('../images/project/118872_0b867e53c1d233ce9fe49d54549a2323.png'),//页面截图
            });
            return {
                resCode: 1
                // data: List
            };
        } else {
            return {
                resCode: 0,
                resInfo: "页面名称不能重复！"
            };
        }
    },
    getPageInfo: params => {
        const {pageId} = param2Obj(params.url);
        const filter = List.filter(x => x.pageId === pageId);
        if (filter.length === 0) {
            return false;
        }
        else {
            return filter[0]
        }
    },
    //获取模板列表
    getModelList: params => {
        return {
            code: 0,
            pageList: [{
                screen:'http://img.alicdn.com/tfs/TB1dEZtuhnaK1RjSZFBXXcW7VXa-672-382.png',
                bigScreen:'http://img.alicdn.com/tfs/TB1.628umzqK1RjSZFLXXcn2XXa-2166-1218.png',
                pageName:'云资源监控',
                descripe:'云资源监控适用于云上运维场景，可以通过云监控数据的接入，对云计算资源使用情况进行预警监控',
                pageId:Mock.mock('@guid'),
                config:{
                    width:1920,
                    height:1080
                }
            }]
        }
    },
    savePage: params => {
        const {pageId, config, components} = JSON.parse(params.body);
        const index = List.findIndex(x => x.pageId === pageId);
        Object.assign(List[index], {
            config: config,
            components: components
        })
        return {
            resCode: 0
        };
    }
}
