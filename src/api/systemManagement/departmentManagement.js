// 部门管理
import ajax from "../ajax";
import {BASE_URL} from "../nochange"

//获取所有
//查询组织机构，支持根据参数查询,返回树状结构
export const reqQueryDepart = (page,size,name) =>ajax(BASE_URL + "/depart/queryDepart",{page,size,name},"POST");

//添加部门
// 创建组织，type=3时，parentId不可为空，companyCode&orgCode为系统自动分配
export const reqCreateDepart = (name,orgCode,parentId) =>ajax(BASE_URL + "/depart/createDepart",{name,orgCode,parentId},"POST");

//编辑部门
// 查询组织机构，支持根据参数查询,返回树状结构
export const reqEditDepart = (id,name) =>ajax(BASE_URL + "/depart/editDepart",{id,name},"POST");

// 删除部门
//根据id删除
export const reqDelDepart = (id) =>ajax(BASE_URL + "/depart/delDepart",{id},"POST");
