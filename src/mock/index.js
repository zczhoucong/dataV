/**
 * Created by Administrator on 2018/3/15.
 */
import Mock from 'mockjs'
import project from './project'
import page from './page'
import dataofcorddev from './maindata.json'

Mock.mock(/\/project\/list/, 'get', project.getProjectList);
Mock.mock(/\/project\/del/, 'post', project.delProject);
Mock.mock(/\/project\/add/, 'post', project.addProject);
Mock.mock(/\/project\/edit/, 'post', project.editProject);
Mock.mock(/\/page\/list/, 'get', page.getPageList);
Mock.mock(/\/page\/add/, 'post', page.addPage);
Mock.mock(/\/page\/first/, 'post', page.firstPage);
Mock.mock(/\/page\/getModelList/, 'post', page.getModelList);
Mock.mock(/\/page\/del/, 'post', page.delPage);
Mock.mock(/\/page\/edit/, 'post', page.editPage);
Mock.mock(/\/page\/save/, 'post', page.savePage);
Mock.mock(/\/page\/copyPage/, 'post', page.copyPage);
Mock.mock(/\/page\/info/, 'get', page.getPageInfo);
Mock.mock('getcorddev', 'get', dataofcorddev);


export default Mock;