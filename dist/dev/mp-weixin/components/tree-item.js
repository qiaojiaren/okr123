"use strict";
const common_vendor = require("../common/vendor.js");
const store_Login = require("../store/Login.js");
if (!Math) {
  common_vendor.unref(TreeItem)();
}
const TreeItem = () => Promise.resolve().then(() => RTovdnVlQ29kZS9jb2RlMS9va3ItbWluaXByb2dyYW0vc3JjL2NvbXBvbmVudHMvdHJlZS1pdGVtLnZ1ZQ);
const _sfc_main = {
  __name: "tree-item",
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
    const addChild = (id, name, managerId) => {
      common_vendor.index.navigateTo({
        url: `/pages/grantPage?id=${id}&name=${name}&managerId=${managerId}`
        // 跳转的页面路径
      });
      common_vendor.index.showModal({
        title: "请选择新节点的管理员！",
        editable: false,
        //是否显示输入框
        confirmText: "确认",
        showCancel: false
      });
    };
    const teamOKR = async (coreId, flag) => {
      loginMessage.OkrcoreId = coreId;
      loginMessage.scene = "scene-t";
      await common_vendor.index.request({
        url: "http://139.159.210.77:1701/core/search",
        method: "POST",
        header: {
          "Login-Type": "r6Vsr0",
          "Token": loginMessage.token
        },
        data: {
          "coreId": loginMessage.OkrcoreId,
          "scene": loginMessage.scene
        }
      }).then((res) => {
        if (res.data.code === 2001) {
          common_vendor.index.redirectTo({
            url: "/pages/loginPage"
          });
        }
        loginMessage.okrInformation = res.data.data;
      });
      if (loginMessage.okrInformation.isOver) {
        common_vendor.index.navigateTo({
          url: `/pages/searchOkr?coreId=${coreId}`
          // 跳转的页面路径
        });
      } else if (flag) {
        common_vendor.index.navigateTo({
          url: `/pages/teamOKR?coreId=${coreId}`
          // 跳转的页面路径
        });
      } else {
        common_vendor.index.navigateTo({
          url: `/pages/searchOkr?coreId=${coreId}`
          // 跳转的页面路径
        });
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(__props.treeData, (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.name),
            b: item.managerId === common_vendor.unref(loginMessage).id
          }, item.managerId === common_vendor.unref(loginMessage).id ? {
            c: common_vendor.o(($event) => addChild(item.id, item.name, item.managerId), index)
          } : {}, {
            d: item.child && item.child.length > 0 ? 1 : "",
            e: common_vendor.o(($event) => teamOKR(item.coreId, Boolean(item.managerId === common_vendor.unref(loginMessage).id)), index),
            f: index !== 0 ? 1 : "",
            g: index != __props.treeData.length - 1 ? 1 : "",
            h: item.child && item.child.length > 0
          }, item.child && item.child.length > 0 ? {
            i: "7d1b1cb0-0-" + i0,
            j: common_vendor.p({
              ["tree-data"]: item.child
            })
          } : {}, {
            k: index
          });
        }),
        b: !__props.treeFirst ? 1 : ""
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-7d1b1cb0"], ["__file", "E:/vueCode/code1/okr-miniprogram/src/components/tree-item.vue"]]);
wx.createComponent(Component);
const RTovdnVlQ29kZS9jb2RlMS9va3ItbWluaXByb2dyYW0vc3JjL2NvbXBvbmVudHMvdHJlZS1pdGVtLnZ1ZQ = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" }));
