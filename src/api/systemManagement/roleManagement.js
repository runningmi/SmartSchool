// 角色管理
import ajax from "../ajax";
import {BASE_URL} from "../nochange"

//绑定功能键 为角色绑定功能键,注意：绑定功能键没有详细操作记录，无法回档，请谨慎操作！
export const reqBindFunction= (functionIds,roleId) =>ajax(BASE_URL + "/role/bindFunction",{functionIds,roleId},"POST");

//绑定菜单 为角色绑定菜单,注意：绑定菜单没有详细操作记录，无法回档，请谨慎操作！
export const reqBindMenu = (menuIds,roleId) =>ajax(BASE_URL + "/role/bindMenu",{menuIds,roleId},"POST");

//创建角色 
export const reqCreateRole= (code,departId,name) =>ajax(BASE_URL + "/role/createRole",{code,departId,name},"POST");

//删除角色 仅支持删除没有绑定用户的角色
export const reqDelRole = (roleId) =>ajax(BASE_URL + "/role/delRole",{roleId},"POST");

//编辑角色 仅支持编辑角色名
export const reqEditRole= (roleId,roleName) =>ajax(BASE_URL + "/role/editRole",{roleId,roleName},"POST");

//查询角色 查询角色，支持根据参数查询
export const reqQueryRole= (page,size,companyCode,name) =>ajax(BASE_URL + "/role/queryRole",{page,size,companyCode,name},"POST");
