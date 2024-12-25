"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/loginPage.js";
  "./pages/okrIntroduce.js";
  "./pages/okrPerson.js";
  "./pages/okrTeam.js";
  "./pages/okrUserinfo.js";
  "./pages/myTeam.js";
  "./pages/personalRecord.js";
  "./pages/teamRecord.js";
  "./pages/teamOKR.js";
  "./pages/teamMate.js";
  "./pages/invite.js";
  "./pages/searchOkr.js";
  "./pages/grantPage.js";
  "./pages/teamOkrRecord.js";
  "./pages/aboutUs.js";
  "./pages/medalPage.js";
  "./pages/dataAnalysis.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/vueCode/code1/okr-miniprogram/src/App.vue"]]);
const pinia = common_vendor.createPinia();
function createApp() {
  const app = common_vendor.createSSRApp(App);
  app.use(common_vendor.createPinia());
  app.use(pinia.use(common_vendor.src_default));
  common_vendor.index.$showMsg = function(title = "数据加载失败！", duration = 1500) {
    common_vendor.index.showToast({
      title,
      duration,
      icon: "none"
    });
  };
  return {
    app,
    Pinia: common_vendor.Pinia,
    uni: common_vendor.index
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
