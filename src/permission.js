import router from "./router";
import store from "./store";
import { Message } from "element-ui";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
import { getToken, getRoles ,saveRoustName,getRoustName} from "@/utils/auth"; // get token from cookie
import getPageTitle from "@/utils/get-page-title";

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const whiteList = ["/login", "/auth-redirect"]; // no redirect whitelist
router.beforeEach(async (to, from, next) => {
  NProgress.start();
  document.title = getPageTitle(to.meta.title);

  //控制刷新后白页
  if(to.name!==null  ){
    saveRoustName(JSON.stringify({name:to.name,fullPath:to.fullPath,path:to.path}))
    next()
  }else{
    next({ ...JSON.parse(getRoustName()) , replace: true })
  }

  const roles = getRoles();
  // console.log(roles);

  if (roles) {
    if (to.path === "/login") {
      // if is logged in, redirect to the home page
      next({ path: "/" });
      NProgress.done(); // hack: https://github.com/PanJiaChen/vue-element-admin/pull/2939
    } else {
      // determine whether the user has obtained his permission roles through getInfo
      // const hasRoles = store.getters.roles && store.getters.roles.length > 0;
      // if (hasRoles) {

      //   next();
      // } else {
      try {
        // get user info
        // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
        // const { roles } = await store.dispatch('user/getInfo')

        var Roles = Array.from(JSON.parse(roles));
        // console.log(Roles, "hasRoles,permision");
        // generate accessible routes map based on roles

        const accessRoutes = await store.dispatch(
          "permission/generateRoutes",
          Roles
        );
        // console.log(accessRoutes, "permision!!!");

        // dynamically add accessible routes
        router.addRoutes(accessRoutes);
        // console.log(to, "to");

        // hack method to ensure that addRoutes is complete
        // set the replace: true, so the navigation will not leave a history record
        // next({ ...to, replace: true })
        next();
      } catch (error) {
        // remove token and go to login page to re-login
        await store.dispatch("user/resetToken");
        Message.error(error || "Has Error");
        next(`/login?redirect=${to.path}`);
        NProgress.done();
      }
      // }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next();
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`);
      console.log(to.path);
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  // finish progress bar
  NProgress.done();
});
