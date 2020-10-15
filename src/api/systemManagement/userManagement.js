// 用户管理
import ajax from "../ajax";
import {BASE_URL} from "../nochange"

//获取所有用户
export const reqQueryAllUser = (page,size,idNo,name,no,phone,userName) =>ajax(BASE_URL + "/user/queryAllUser",{page,size,idNo,name,no,phone,userName},"POST");

//添加用户
export const reqCreateUser = (name,roleIds,idNo,no,passCode,phone,userName) =>ajax(BASE_URL + "/user/createUser",{name,roleIds,idNo,no,passCode,phone,userName},"POST");

