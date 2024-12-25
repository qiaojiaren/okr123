"use strict";
const common_vendor = require("../common/vendor.js");
const store_Login = require("../store/Login.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_icons2 + _easycom_uni_popup2)();
}
const _easycom_uni_icons = () => "../node-modules/@dcloudio/uni-ui/lib/uni-icons/uni-icons.js";
const _easycom_uni_popup = () => "../node-modules/@dcloudio/uni-ui/lib/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_popup)();
}
const _sfc_main = {
  __name: "medalPage",
  setup(__props) {
    const loginMessage = store_Login.useCounterStore();
    const medalList = common_vendor.ref();
    common_vendor.index.request({
      url: `http://139.159.210.77:1701/medal/list/all`,
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
        medalList.value = res.data.data;
        for (let i = 0; i < medalList.value.length; i++) {
          medalList.value[i].url = "http://139.159.210.77:1701/" + medalList.value[i].url;
        }
        console.log(medalList.value);
      }
    });
    const popup = common_vendor.ref();
    const showMedal = common_vendor.ref({
      description: "",
      isRead: false,
      issueTime: "",
      level: 0,
      medalId: 0,
      name: "",
      url: ""
    });
    const getUnreadMedal = () => {
      common_vendor.index.request({
        url: "http://139.159.210.77:1701/medal/list/unread",
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
          if (res.data.data.length) {
            showMedal.value = res.data.data[0];
            showMedal.value.url = "http://139.159.210.77:1701/" + showMedal.value.url;
            popup.value.open();
          }
        }
      });
    };
    common_vendor.onReady(() => {
      getUnreadMedal();
    });
    const close = () => {
      common_vendor.index.request({
        url: `http://139.159.210.77:1701/medal/read/${showMedal.value.medalId}`,
        method: "POST",
        header: {
          "Login-Type": "r6Vsr0",
          "Token": loginMessage.token
        }
      }).then(
        (res) => {
          if (res.data.code === 200) {
            popup.value.close();
          }
        }
      );
    };
    const popupMedal = common_vendor.ref();
    const medalPhoto = common_vendor.ref({
      description: "",
      name: "",
      url: ""
    });
    const showPhoto = (url, name, description) => {
      medalPhoto.value.url = url;
      medalPhoto.value.name = name;
      medalPhoto.value.description = description;
      popupMedal.value.open();
    };
    const closePhoto = () => {
      popupMedal.value.close();
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(close),
        b: common_vendor.p({
          type: "close",
          size: "30",
          color: "#fff"
        }),
        c: showMedal.value.url,
        d: common_vendor.t(showMedal.value.name),
        e: common_vendor.t(showMedal.value.level),
        f: common_vendor.t(showMedal.value.description),
        g: common_vendor.sr(popup, "3f2fac64-0", {
          "k": "popup"
        }),
        h: common_vendor.p({
          type: "center",
          mask: true,
          ["mask-click"]: false
        }),
        i: common_vendor.o(closePhoto),
        j: common_vendor.p({
          type: "close",
          size: "30",
          color: "#fff"
        }),
        k: medalPhoto.value.url,
        l: common_vendor.t(medalPhoto.value.name),
        m: common_vendor.t(medalPhoto.value.description),
        n: common_vendor.sr(popupMedal, "3f2fac64-2", {
          "k": "popupMedal"
        }),
        o: common_vendor.p({
          type: "center",
          mask: true,
          ["mask-click"]: false
        }),
        p: common_vendor.f(medalList.value, (item, k0, i0) => {
          return common_vendor.e({
            a: item.url,
            b: common_vendor.o(($event) => showPhoto(item.url, item.name, item.description), item.id),
            c: common_vendor.t(item.name),
            d: item.level
          }, item.level ? {
            e: common_vendor.t(item.level)
          } : {}, {
            f: common_vendor.t(item.description),
            g: item.id
          });
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/vueCode/code1/okr-miniprogram/src/pages/medalPage.vue"]]);
wx.createPage(MiniProgramPage);
