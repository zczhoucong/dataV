/**
 * Created by Administrator on 2018/4/2.
 */
import Mock from 'mockjs'
import { param2Obj } from '@/utils/assist';
const List = [];
List.push(Mock.mock({
    projectId: 'aaa-bbb-1211',
    projectName: 'aaa',//项目名称
    'pjStatus|1': ['0', '1'], // 项目状态 0：未发布 1：已发布
    screen: require('../images/project/118872_0b867e53c1d233ce9fe49d54549a2323.png'),//项目截图
}))
const count = 4;
for (let i = 0; i < count; i++) {
    List.push(Mock.mock({
        projectId: '@guid',
        projectName: '@name',//项目名称
        'pjStatus|1': ['0', '1'], // 项目状态 0：未发布 1：已发布
        screen: require('../images/project/118872_0b867e53c1d233ce9fe49d54549a2323.png'),//项目截图
    }))
};
export default {
    getProjectList: () => List,
    delProject: params => {
        const { projectId} = JSON.parse(params.body);
        const index = List.findIndex(x => x.projectId === projectId);
        List.splice(index, 1);
        return {code:0};
    },
    addProject:params=>{
        const { projectId, projectName} = JSON.parse(params.body);
        List.push({
            projectId: projectId,
            projectName: projectName,//项目名称
            pjStatus: '0', // 项目状态 0：未发布 1：已发布
            screen: require('../images/project/118872_0b867e53c1d233ce9fe49d54549a2323.png'),//项目截图
        });
        return {code:0};
    },
    editProject:params=>{
        const { projectId, projectName} = JSON.parse(params.body);
        const index = List.findIndex(x => x.projectId === projectId);
        List[index].projectName=projectName;
        return {code:0};
    }
}
