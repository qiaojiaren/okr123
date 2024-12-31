"use strict";
const common_vendor = require("../common/vendor.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../node-modules/@dcloudio/uni-ui/lib/uni-icons/uni-icons.js";
if (!Math) {
  (_easycom_uni_icons + Assistant)();
}
const Assistant = () => "../components/assistant.js";
const _sfc_main = {
  __name: "okrIntroduce",
  setup(__props) {
    const showChat = common_vendor.ref(false);
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(($event) => showChat.value = true),
        b: showChat.value
      }, showChat.value ? {
        c: common_vendor.p({
          type: "plus-filled",
          size: "24"
        }),
        d: common_vendor.o(($event) => showChat.value = false)
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/vueCode/code1/okr-miniprogram/src/pages/okrIntroduce.vue"]]);
wx.createPage(MiniProgramPage);
