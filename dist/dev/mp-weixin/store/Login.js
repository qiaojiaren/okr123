"use strict";
const common_vendor = require("../common/vendor.js");
const useCounterStore = common_vendor.defineStore(
  "counter",
  () => {
    const token = common_vendor.ref("");
    const OkrcoreId = common_vendor.ref();
    const scene = common_vendor.ref("");
    const okrInformation = common_vendor.ref();
    const teamId = common_vendor.ref(0);
    const teamname = common_vendor.ref("");
    const priviledge = common_vendor.ref(true);
    const nickname = common_vendor.ref("");
    const photo = common_vendor.ref("");
    const manage = common_vendor.ref(false);
    const id = common_vendor.ref("");
    const getOkrInformation = () => {
      common_vendor.index.request({
        url: "http://47.92.173.60:1701/core/search",
        method: "POST",
        header: {
          "Login-Type": "r6Vsr0",
          "Token": token.value
        },
        data: {
          "coreId": OkrcoreId.value,
          "scene": scene.value
        },
        success(res) {
          okrInformation.value = res.data.data;
        }
      });
    };
    return { token, scene, OkrcoreId, okrInformation, getOkrInformation, teamId, teamname, priviledge, nickname, photo, id, manage };
  },
  {
    // 配置持久化
    persist: {
      // 调整为兼容多端的API
      storage: {
        setItem(key, value) {
          common_vendor.index.setStorageSync(key, value);
        },
        getItem(key) {
          return common_vendor.index.getStorageSync(key);
        }
      }
    }
  }
);
exports.useCounterStore = useCounterStore;
