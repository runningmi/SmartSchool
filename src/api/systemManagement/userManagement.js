// 用户管理
import ajax from "../ajax";
import {BASE_URL} from "../nochange"

// 查询用户，支持根据参数模糊查询
//获取所有用户
export const reqQueryAllUser = (page,size,idNo,name,no,phone,userName) =>ajax(BASE_URL + "/user/queryAllUser",{page,size,idNo,name,no,phone,userName},"POST");

// 单个创建用户，必须选定角色，其中名字&身份证号&手机号&密码不可为空，且身份证必须不存在
//创建用户
export const reqCreateUser = (name,roleIds,idNo,no,passCode,phone,userName) =>ajax(BASE_URL + "/user/createUser",{name,roleIds,idNo,no,passCode,phone,userName},"POST");

// 编辑用户信息,不支持修改密码及角色关联.
//编辑用户
export const reqEditUser = (name,idNo,no,passCode,phone,userName) =>ajax(BASE_URL + "/user/editUser",{name,idNo,no,passCode,phone,userName},"POST");

// 为用户更改角色, 不能修改其他信息, 注意：更改角色不保留详细记录,无法回档,请谨慎操作
//更改角色
export const reqEditRoleOfUserditUser = (roleIds,userId) =>ajax(BASE_URL + "/user/editRoleOfUsereditRoleOfUser",{roleIds,userId},"POST");