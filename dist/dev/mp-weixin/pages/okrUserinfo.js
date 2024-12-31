"use strict";
const common_vendor = require("../common/vendor.js");
const store_Login = require("../store/Login.js");
const _sfc_main = {
  __name: "okrUserinfo",
  setup(__props) {
    const loginMessage = store_Login.useCounterStore();
    const personalRecord = () => {
      common_vendor.index.navigateTo({
        url: "/pages/personalRecord"
        // 跳转的页面路径
      });
    };
    const teamRecord = () => {
      common_vendor.index.navigateTo({
        url: "/pages/teamRecord"
        // 跳转的页面路径
      });
    };
    const nickName = common_vendor.ref("用户昵称");
    const avatarUrl = common_vendor.ref("https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0");
    common_vendor.index.request({
      url: "http://47.92.173.60:1701/user/userinfo",
      method: "GET",
      header: {
        "Login-Type": "r6Vsr0",
        "Token": loginMessage.token
      },
      success(res) {
        if (res.data.code === 2001) {
          common_vendor.index.redirectTo({
            url: "/pages/loginPage"
          });
        }
        nickName.value = res.data.data.nickname;
        if (res.data.data.photo) {
          avatarUrl.value = "http://47.92.173.60:1701/" + res.data.data.photo;
        }
      }
    });
    const onChooseAvatar = (e) => {
      avatarUrl.value = e.detail.avatarUrl;
      common_vendor.index.uploadFile({
        url: "http://47.92.173.60:1701/user/photo/upload",
        filePath: avatarUrl.value,
        //头像
        header: {
          "Login-Type": "r6Vsr0",
          "Token": loginMessage.token
        },
        name: "photo",
        success: (res) => {
          console.log(res.data);
          if (res.data.code === 2001) {
            common_vendor.index.redirectTo({
              url: "/pages/loginPage"
            });
          }
        }
      });
    };
    const setName = (e) => {
      nickName.value = e.detail.value;
      common_vendor.index.request({
        url: "http://47.92.173.60:1701/user/improve",
        method: "POST",
        header: {
          "Login-Type": "r6Vsr0",
          "Token": loginMessage.token
        },
        data: {
          "nickname": nickName.value
        },
        success(res) {
          if (res.data.code === 2001) {
            common_vendor.index.redirectTo({
              url: "/pages/loginPage"
            });
          }
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: avatarUrl.value,
        b: common_vendor.o(onChooseAvatar),
        c: common_vendor.o(setName),
        d: nickName.value,
        e: common_vendor.o(($event) => nickName.value = $event.detail.value),
        f: common_vendor.o(personalRecord),
        g: common_vendor.o(teamRecord)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/vueCode/code1/okr-miniprogram/src/pages/okrUserinfo.vue"]]);
wx.createPage(MiniProgramPage);
