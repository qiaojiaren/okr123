"use strict";
const common_vendor = require("../common/vendor.js");
const store_Login = require("../store/Login.js");
if (!Math) {
  common_vendor.unref(readOnlyTree)();
}
const readOnlyTree = () => Promise.resolve().then(() => RTovdnVlQ29kZS9jb2RlMS9va3ItbWluaXByb2dyYW0vc3JjL2NvbXBvbmVudHMvcmVhZE9ubHlUcmVlLnZ1ZQ);
const _sfc_main = {
  __name: "readOnlyTree",
  props: {
    treeData: {
      type: Array,
      default: () => []
    },
    treeFirst: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    const loginMessage = store_Login.useCounterStore();
    const teamOKR = (coreId) => {
      loginMessage.OkrcoreId = coreId;
      loginMessage.scene = "scene-t";
      loginMessage.getOkrInformation();
      common_vendor.index.navigateTo({
        url: `/pages/searchOkr?coreId=${coreId}`
        // 跳转的页面路径
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(__props.treeData, (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.name),
            b: item.child && item.child.length > 0 ? 1 : "",
            c: common_vendor.o(($event) => teamOKR(item.coreId), index),
            d: index !== 0 ? 1 : "",
            e: index != __props.treeData.length - 1 ? 1 : "",
            f: item.child && item.child.length > 0
          }, item.child && item.child.length > 0 ? {
            g: "8db6060c-0-" + i0,
            h: common_vendor.p({
              ["tree-data"]: item.child
            })
          } : {}, {
            i: index
          });
        }),
        b: !__props.treeFirst ? 1 : ""
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-8db6060c"], ["__file", "E:/vueCode/code1/okr-miniprogram/src/components/readOnlyTree.vue"]]);
wx.createComponent(Component);
const RTovdnVlQ29kZS9jb2RlMS9va3ItbWluaXByb2dyYW0vc3JjL2NvbXBvbmVudHMvcmVhZE9ubHlUcmVlLnZ1ZQ = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" }));
