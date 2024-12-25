"use strict";
const common_vendor = require("../common/vendor.js");
const store_Login = require("../store/Login.js");
if (!Math) {
  common_vendor.unref(readOnlyTree)();
}
const readOnlyTree = () => "../components/readOnlyTree.js";
const _sfc_main = {
  __name: "teamOkrRecord",
  setup(__props) {
    const loginMessage = store_Login.useCounterStore();
    const treeData = common_vendor.ref([]);
    const transformData = (data, parentId = null) => {
      return data.filter((item) => parentId === null && !item.parentTeamId || item.parentTeamId === parentId).map((item) => ({
        name: item.teamName,
        id: item.id,
        coreId: item.coreId,
        managerId: item.managerId,
        child: transformData(data, item.id)
      }));
    };
    const teamId = common_vendor.ref();
    common_vendor.onLoad((options) => {
      teamId.value = options.teamId;
    });
    common_vendor.onShow(() => {
      common_vendor.index.request({
        url: `http://139.159.210.77:1701/team/tree/${teamId.value}`,
        method: "POST",
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
          treeData.value = transformData(res.data.data);
        }
      });
    });
    const distance = common_vendor.ref(0);
    const scale = common_vendor.ref(1);
    const disX = common_vendor.ref(0);
    const disY = common_vendor.ref(0);
    const positionX = common_vendor.ref(0);
    const positionY = common_vendor.ref(0);
    common_vendor.ref(true);
    const touchstartCallback = (e) => {
      if (e.touches.length == 1)
        return;
      let xMove = e.touches[1].clientX - e.touches[0].clientX;
      let yMove = e.touches[1].clientY - e.touches[0].clientY;
      distance.value = Math.sqrt(xMove * xMove + yMove * yMove);
    };
    const touchmoveCallback = (e) => {
      if (e.touches.length == 1)
        return;
      let xMove = e.touches[1].clientX - e.touches[0].clientX;
      let yMove = e.touches[1].clientY - e.touches[0].clientY;
      let newdistance = Math.sqrt(xMove * xMove + yMove * yMove);
      let distanceDiff = newdistance - distance.value;
      let newScale = scale.value + 1e-4 * distanceDiff;
      scale.value = newScale;
      if (newScale >= 5) {
        newScale = 5;
        distance.value = newdistance;
        scale.value = newScale;
      }
      if (newScale <= 0.3) {
        newScale = 0.3;
        distance.value = newdistance;
        scale.value = newScale;
      }
    };
    const move = (e) => {
      const odiv = e.currentTarget;
      if (e.touches.length == 2)
        return touchstartCallback(e);
      disX.value = e.touches[0].clientX - odiv.offsetLeft;
      disY.value = e.touches[0].clientY - odiv.offsetTop;
    };
    const moving = (e) => {
      if (e.touches.length == 2)
        return touchmoveCallback(e);
      let left = e.touches[0].clientX - disX.value;
      let top = e.touches[0].clientY - disY.value;
      positionX.value = top;
      positionY.value = left;
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          ["tree-data"]: treeData.value,
          ["tree-first"]: true
        }),
        b: common_vendor.o(move),
        c: common_vendor.o(moving),
        d: positionY.value + "px",
        e: "scale(" + scale.value + ")"
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-77a22c05"], ["__file", "E:/vueCode/code1/okr-miniprogram/src/pages/teamOkrRecord.vue"]]);
wx.createPage(MiniProgramPage);
