"use strict";
const common_vendor = require("../common/vendor.js");
const store_Login = require("../store/Login.js");
if (!Array) {
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  (_easycom_uni_list_item2 + _easycom_uni_list2 + _easycom_uni_card2)();
}
const _easycom_uni_list_item = () => "../node-modules/@dcloudio/uni-ui/lib/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../node-modules/@dcloudio/uni-ui/lib/uni-list/uni-list.js";
const _easycom_uni_card = () => "../node-modules/@dcloudio/uni-ui/lib/uni-card/uni-card.js";
if (!Math) {
  (_easycom_uni_list_item + _easycom_uni_list + _easycom_uni_card)();
}
const _sfc_main = {
  __name: "teamRecord",
  setup(__props) {
    const loginMessage = store_Login.useCounterStore();
    const teamOkrList = common_vendor.ref();
    const teamNoOkr = common_vendor.ref(true);
    common_vendor.index.request({
      url: "http://47.92.173.60:1701/teampersonal/list",
      method: "get",
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
          teamOkrList.value = res.data.data;
          teamNoOkr.value = false;
        }
      }
    });
    const showRecord = (teamId) => {
      common_vendor.index.navigateTo({
        url: `/pages/teamOkrRecord?teamId=${teamId}`
        // 跳转的页面路径
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: teamNoOkr.value
      }, teamNoOkr.value ? {} : {
        b: common_vendor.f(teamOkrList.value, (item, k0, i0) => {
          return {
            a: common_vendor.o(($event) => showRecord(item.teamId), item.id),
            b: "e4300ece-2-" + i0 + ",e4300ece-1",
            c: common_vendor.p({
              title: item.teamName + " " + item.createTime,
              showArrow: true
            }),
            d: item.id
          };
        }),
        c: common_vendor.p({
          margin: "10px",
          padding: "3px"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e4300ece"], ["__file", "E:/vueCode/code1/okr-miniprogram/src/pages/teamRecord.vue"]]);
wx.createPage(MiniProgramPage);
