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
  __name: "personalRecord",
  setup(__props) {
    const loginMessage = store_Login.useCounterStore();
    const personalNoOkr = common_vendor.ref(true);
    const personalTeamNoOkr = common_vendor.ref(true);
    const personalOkrList = common_vendor.ref();
    const personalTeamOkrList = common_vendor.ref();
    common_vendor.index.request({
      url: "http://139.159.210.77:1701/personal/list",
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
        if (res.data.data) {
          personalOkrList.value = res.data.data;
          for (let i = 0; i < personalOkrList.value.length; i++) {
            if (personalOkrList.value[i].isOver) {
              personalNoOkr.value = false;
              break;
            }
          }
        }
      }
    });
    common_vendor.index.request({
      url: "http://139.159.210.77:1701/teampersonal/list",
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
        if (res.data.data) {
          personalTeamOkrList.value = res.data.data;
          for (let i = 0; i < personalTeamOkrList.value.length; i++) {
            if (personalTeamOkrList.value[i].isOver) {
              personalTeamNoOkr.value = false;
              break;
            }
          }
        }
      }
    });
    const showRecord = (coreId, scene) => {
      common_vendor.index.navigateTo({
        url: "/pages/searchOkr"
        // 跳转的页面路径
      });
      loginMessage.OkrcoreId = coreId;
      loginMessage.scene = scene;
      loginMessage.getOkrInformation();
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: personalNoOkr.value
      }, personalNoOkr.value ? {} : {
        b: common_vendor.f(personalOkrList.value, (item, k0, i0) => {
          return common_vendor.e({
            a: item.isOver
          }, item.isOver ? {
            b: common_vendor.o(($event) => showRecord(item.coreId, "scene-p"), item.id),
            c: "65469a46-2-" + i0 + ",65469a46-1",
            d: common_vendor.p({
              title: item.objective + " " + item.createTime,
              showArrow: true
            })
          } : {}, {
            e: item.id
          });
        }),
        c: common_vendor.p({
          margin: "10px",
          padding: "3px"
        })
      }, {
        d: personalTeamNoOkr.value
      }, personalTeamNoOkr.value ? {} : {
        e: common_vendor.f(personalTeamOkrList.value, (item, k0, i0) => {
          return common_vendor.e({
            a: item.isOver
          }, item.isOver ? {
            b: common_vendor.o(($event) => showRecord(item.coreId, "scene-tp"), item.id),
            c: "65469a46-5-" + i0 + ",65469a46-4",
            d: common_vendor.p({
              title: item.teamName + " " + item.createTime,
              showArrow: true
            })
          } : {}, {
            e: item.id
          });
        }),
        f: common_vendor.p({
          margin: "10px",
          padding: "3px"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-65469a46"], ["__file", "E:/vueCode/code1/okr-miniprogram/src/pages/personalRecord.vue"]]);
wx.createPage(MiniProgramPage);
