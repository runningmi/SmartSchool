import ajax from "./ajax";
import {BASE_URL} from "./nochange"


// 新增加油站
export const reqAddGas = (
  cityCode,
  countyCode,
  address,
  latitude,
  longitude,
  logoBig,
  logoSmall,
  name,
  provinceCode,
  status,
  invoice
) =>
  ajax(
    BASE_URL + "/gas/add_gas",
    {
      cityCode,
      countyCode,
      address,
      latitude,
      longitude,
      logoBig,
      logoSmall,
      name,
      provinceCode,
      status,
      invoice
    },
    "POST"
  );

// 油站更新
export const reqUpdateGas = (
  cityCode,
  countyCode,
  address,
  latitude,
  longitude,
  logoBig,
  logoSmall,
  name,
  provinceCode,
  status,
  id,
  invoice
) =>
  ajax(
    BASE_URL + "/gas/update_gas",
    {
      cityCode,
      countyCode,
      address,
      latitude,
      longitude,
      logoBig,
      logoSmall,
      name,
      provinceCode,
      status,
      id,
      invoice
    },
    "POST"
  );

// 验证账号唯一性
export const reqcheckAccount = account =>
  ajax(BASE_URL + "/gas/check_account", { account });

// 根据条件获取油站
export const reqQueryGas = (page = 1, searchKey='', size = 10, source,provinceCode='',countyCode='',cityCode='') =>
  ajax(BASE_URL + "/gas/query", { page, searchKey, size, source,countyCode,provinceCode,cityCode
 });
// 获取所有油站
export const reqAllGas = (page = 1, size = 10) =>
  ajax(BASE_URL + "/gas/query", { page, size });

// 下架油站
export const reqUpDownGas = (id, type) =>
  ajax(BASE_URL + "/gas/up_down", { id, type });
// 获取油站详情
export const reqGasDetail = id => ajax(BASE_URL + "/gas/get_gasoil", { id });
//获取随机油站管理员账号密码
export const reqAccPwd = gasName =>
  ajax(BASE_URL + "/gas/gas_admin", { gasName });
//确定生成管理员账号
export const reqAddUser = (account, id, password) =>
  ajax(BASE_URL + "/gas/add_user", { account, id, password }, "POST");
//获取自营油站详情油信息
export const reqZYDetail = id => ajax(BASE_URL + "/gas/get_gaszyoil", { id });

//编辑商品信息
export const reqUpOil = (
  gid,
  gunNo,
  id,
  oilNo,
  oilType,
  price,
  priceGun,
  priceGunInvoice,
  priceInvoice,
  status
) =>
  ajax(
    BASE_URL + "/zy/up_oil",
    {
      gid,
      gunNo,
      id,
      oilNo,
      oilType,
      price,
      priceGun,
      priceGunInvoice,
      priceInvoice,
      status
    },
    "POST"
  );

//上/下架商品信息
export const reqUp_down = (id, status) =>
  ajax(BASE_URL + "/zy/up_down", { id, status });
//获取验证码
export const reqgetCode = key => ajax(BASE_URL + "/login/getcode", { key });
//请求登录
export const reqLogin = (account, password, code, key) =>
  ajax(BASE_URL + "/login/login", { account, password, code, key }, "POST");
//确定修改管理员密码
export const reqEditCode = (id, password) =>
  ajax(BASE_URL + "/gas/up_user", { id, password }, "POST");
//获取油站管理员账号密码
export const reqNameCode = id => ajax(BASE_URL + "/gas/gas_account", { id });

//获取省市县/区编码
export const reqAreaCode = pid => ajax(BASE_URL + "/anon/area_code", { pid });

  //获取油品类型
  export const reqOilType = (pid) =>ajax(BASE_URL + "/anon/oil_type", { pid });

  //请求退出
  export const reqLogout= () =>ajax(BASE_URL + "/login/loginout");