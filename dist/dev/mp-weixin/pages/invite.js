"use strict";
const common_vendor = require("../common/vendor.js");
const store_Login = require("../store/Login.js");
const _sfc_main = {
  __name: "invite",
  setup(__props) {
    const loginMessage = store_Login.useCounterStore();
    const teamId = common_vendor.ref();
    const secret = common_vendor.ref();
    common_vendor.onLoad(() => {
      common_vendor.index.login({
        success(res1) {
          if (res1.code) {
            common_vendor.index.request({
              url: "http://47.92.173.60:1701/user/login",
              method: "POST",
              header: {
                "Login-Type": "r6Vsr0"
              },
              data: {
                "wxLoginDTO": {
                  "code": res1.code
                }
              },
              success(res) {
                loginMessage.token = res.data.data.Token;
              }
            });
          }
        }
      });
      const pages = getCurrentPages();
      const currentPage = pages[pages.length - 1];
      const scene = decodeURIComponent(currentPage.options.scene);
      const params = {};
      scene.split("&").forEach((item) => {
        const [key, value] = item.split("=");
        params[key] = value;
      });
      teamId.value = params.teamId || "";
      secret.value = params.secret || "";
    });
    const cancel = () => {
      common_vendor.index.reLaunch({
        url: "loginPage"
      });
    };
    const join = () => {
      common_vendor.index.request({
        url: "http://47.92.173.60:1701/core/create",
        method: "POST",
        header: {
          "Login-Type": "r6Vsr0",
          "Token": loginMessage.token
        },
        data: {
          "scene": "scene-tp",
          "secret": secret.value,
          "teamOkrId": teamId.value
        }
      }).then((res) => {
        if (res.data.code === 200) {
          common_vendor.index.$showMsg("加入成功！");
          setTimeout(() => {
            common_vendor.index.reLaunch({
              url: "okrTeam"
            });
          }, 500);
        } else {
          common_vendor.index.$showMsg(res.data.message);
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(join),
        b: common_vendor.o(cancel)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/vueCode/code1/okr-miniprogram/src/pages/invite.vue"]]);
wx.createPage(MiniProgramPage);
