"use strict";
const common_vendor = require("../common/vendor.js");
const store_Login = require("../store/Login.js");
const _sfc_main = {
  __name: "loginPage",
  setup(__props) {
    const loginMessage = store_Login.useCounterStore();
    const handleLogin = () => {
      common_vendor.index.login({
        success(res1) {
          if (res1.code) {
            common_vendor.index.request({
              url: "http://139.159.210.77:1701/user/login",
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
                if (res.data.message === "操作成功") {
                  loginMessage.token = res.data.data.Token;
                  common_vendor.index.$showMsg("登录成功！");
                  common_vendor.index.request({
                    url: "http://139.159.210.77:1701/user/userinfo",
                    method: "GET",
                    header: {
                      "Login-Type": "r6Vsr0",
                      "Token": loginMessage.token
                    },
                    success(res2) {
                      loginMessage.id = res2.data.data.id;
                      console.log(loginMessage.id);
                    }
                  });
                  setTimeout(() => {
                    common_vendor.index.switchTab({
                      url: "/pages/okrIntroduce"
                    });
                  }, 500);
                } else {
                  return common_vendor.index.$showMsg("登录失败！");
                }
              }
            });
          } else {
            return common_vendor.index.$showMsg("登录失败！");
          }
        }
      });
    };
    common_vendor.onShow(() => {
      common_vendor.index.request({
        url: "http://139.159.210.77:1701",
        method: "GET",
        header: {
          "Login-Type": "r6Vsr0",
          "Token": loginMessage.token
        },
        success(res) {
          if (res.data.code === 200) {
            common_vendor.index.switchTab({
              url: "okrIntroduce"
            });
          }
        }
      });
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(handleLogin)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/vueCode/code1/okr-miniprogram/src/pages/loginPage.vue"]]);
wx.createPage(MiniProgramPage);
