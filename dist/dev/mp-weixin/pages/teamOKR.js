"use strict";
const common_vendor = require("../common/vendor.js");
if (!Math) {
  common_vendor.unref(readWriteOkr)();
}
const readWriteOkr = () => "../components/readWriteOkr.js";
const _sfc_main = {
  __name: "teamOKR",
  setup(__props) {
    return (_ctx, _cache) => {
      return {};
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/vueCode/code1/okr-miniprogram/src/pages/teamOKR.vue"]]);
wx.createPage(MiniProgramPage);
