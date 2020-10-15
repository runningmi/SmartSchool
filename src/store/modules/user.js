import { login, logout, getInfo } from "@/api/user";
import { reqLogout } from "@/api";
import {
  getToken,
  setToken,
  setName,
removeName,
  removeToken,
  setRoles,
  removeRoles,
  removeRoustName
} from "@/utils/auth";
import router,{resetRouter} from "@/router";
import { reqLogin } from "@/api";

const state = {
  token: getToken(),
  name: "",
  avatar: "",
  introduction: "",
  roles: []
};

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles;
  }
};

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password, passcode, key } = userInfo;
    // console.log(username, password, passcode, key, "login");
    return new Promise((resolve, reject) => {
      reqLogin(username.trim(), password, passcode, key)
        .then(response => {
          // console.log(response, "登录的相应");
          const { data } = response;
          if (response.code === 0) {
            var rolesStr = JSON.stringify(data.roles);
            // commit("SET_TOKEN", data.token);
            commit("SET_ROLES", data.roles);
            commit("SET_NAME", data.realName);
            setRoles(rolesStr);
            setName(data.realName);

            // setToken(data.token);
            resolve(response);
          } else {
            resolve(response);
          }
        })
        .catch(error => {
          reject(error, "login");
          // console.log(error, "+======");
        });
    });
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token)
        .then(response => {
          const { data } = response;
          // console.log(response);
          if (!data) {
            reject("验证失败,请重新登录.");
          }
          const { roles, realName, avatar, introduction } = data;
          // console.log(roles);
          // roles must be a non-empty array
          if (!roles || roles.length <= 0) {
            reject("getInfo: roles must be a non-null array!");
          }

          commit("SET_ROLES", roles);
          commit("SET_NAME", realName);
          // commit("SET_AVATAR", avatar);
          // commit("SET_INTRODUCTION", introduction);
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // user logoutasync
  logout({ commit, state, dispatch }) {
    return new Promise(async (resolve, reject) => {
      const result = await reqLogout();
      if (result.code === 0) {
        commit("SET_TOKEN", "");
        commit("SET_ROLES", []);
        commit("SET_NAME", "");

        removeRoles();
        resetRouter();
        removeToken();
        removeName();
        removeRoustName();
        
        // console.log("啊啊啊啊65555555555");

        // reset visited views and cached views
        // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
        dispatch("tagsView/delAllViews", null, { root: true });
        // console.log("啊啊啊啊");
        resolve();
      } else {
        // console.log(result.msg);

        reject(result.msg);
      }
    });
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit("SET_TOKEN", "");
      commit("SET_ROLES", []);
      removeToken();
      resolve();
    });
  },

  // dynamically modify permissions
  async changeRoles({ commit, dispatch }, role) {
    const token = role + "-token";

    commit("SET_TOKEN", token);
    setToken(token);

    const { roles } = await dispatch("getInfo");

    resetRouter();

    // generate accessible routes map based on roles
    const accessRoutes = await dispatch("permission/generateRoutes", roles, {
      root: true
    });
    // dynamically add accessible routes
    router.addRoutes(accessRoutes);

    // reset visited views and cached views
    dispatch("tagsView/delAllViews", null, { root: true });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
