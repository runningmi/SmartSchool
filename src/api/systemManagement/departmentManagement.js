// 部门管理
import ajax from "../ajax";
import {BASE_URL} from "../nochange"

//获取所有部门
export const reqQueryDepart = (page,size,name) =>ajax(BASE_URL + "/depart/queryDepart",{page,size,name},"POST");

//添加部门
export const reqCreateDepart = (name,orgCode,parentId) =>ajax(BASE_URL + "/depart/createDepart",{name,orgCode,parentId},"POST");

//编辑部门
export const reqEditDepart = (id,name) =>ajax(BASE_URL + "/depart/editDepart",{id,name},"POST");

//删除部门
export const reqDelDepart = (id) =>ajax(BASE_URL + "/depart/delDepart",{id},"POST");
