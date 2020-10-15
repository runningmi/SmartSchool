// 菜单管理
import ajax from "../ajax";
import {BASE_URL} from "../nochange"

//创建菜单 
export const reqCreateMenu= (level,name,order,parentId,url) =>ajax(BASE_URL + "/menu/createMenu",{level,name,order,parentId,url},"POST");

//删除菜单 注意：只能删除没有下级菜单的菜单，且删除该菜单会删除所有绑定该菜单的角色绑定信息
export const reqDelMenu = (menuId) =>ajax(BASE_URL + "/menu/delMenu",{menuId},"POST");

//编辑菜单
export const reqEditMenu= (level,name,order,parentId,url) =>ajax(BASE_URL + "/menu/editMenu",{level,name,order,parentId,url},"POST");

//查询菜单 查询菜单，支持根据参数查询,返回树状结构
export const reqQueryMenu= (page,size,name) =>ajax(BASE_URL + "/menu/queryMenu",{page,size,name},"POST");