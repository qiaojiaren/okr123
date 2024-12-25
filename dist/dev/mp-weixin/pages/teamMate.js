"use strict";
const common_vendor = require("../common/vendor.js");
const store_Login = require("../store/Login.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_search_bar2 = common_vendor.resolveComponent("uni-search-bar");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_list_chat2 = common_vendor.resolveComponent("uni-list-chat");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  (_easycom_uni_icons2 + _easycom_uni_search_bar2 + _easycom_uni_section2 + _easycom_uni_list_chat2 + _easycom_uni_list2)();
}
const _easycom_uni_icons = () => "../node-modules/@dcloudio/uni-ui/lib/uni-icons/uni-icons.js";
const _easycom_uni_search_bar = () => "../node-modules/@dcloudio/uni-ui/lib/uni-search-bar/uni-search-bar.js";
const _easycom_uni_section = () => "../node-modules/@dcloudio/uni-ui/lib/uni-section/uni-section.js";
const _easycom_uni_list_chat = () => "../node-modules/@dcloudio/uni-ui/lib/uni-list-chat/uni-list-chat.js";
const _easycom_uni_list = () => "../node-modules/@dcloudio/uni-ui/lib/uni-list/uni-list.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_search_bar + _easycom_uni_section + _easycom_uni_list_chat + _easycom_uni_list)();
}
const _sfc_main = {
  __name: "teamMate",
  setup(__props) {
    const loginMessage = store_Login.useCounterStore();
    const avatarList = common_vendor.ref([]);
    const searchValue = common_vendor.ref("");
    const arr = common_vendor.ref([]);
    const teamMate = () => {
      common_vendor.index.request({
        url: `http://139.159.210.77:1701/teampersonal/members/${loginMessage.teamId}`,
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
          avatarList.value = res.data.data;
          arr.value = avatarList.value;
          handlePhotoUrl();
          console.log(arr.value);
        }
      });
    };
    const handlePhotoUrl = () => {
      for (let i = 0; i < arr.value.length; i++) {
        if (!arr.value[i].photo.startsWith("http://139.159.210.77:1701/")) {
          arr.value[i].photo = "http://139.159.210.77:1701/" + arr.value[i].photo;
        }
      }
    };
    common_vendor.onMounted(() => {
      teamMate();
    });
    common_vendor.watch(searchValue, (newValue, oldValue) => {
      if (newValue != oldValue && newValue == "") {
        arr.value = avatarList.value.slice();
        handlePhotoUrl();
      } else if (newValue != oldValue && newValue != "") {
        arr.value = avatarList.value.filter((item) => item.nickname.includes(newValue));
        handlePhotoUrl();
      }
    });
    const remove = (id) => {
      common_vendor.index.showModal({
        title: "是否从团队移除",
        content: "",
        confirmText: "确认",
        cancelText: "取消",
        success: (res) => {
          if (res.confirm) {
            if (!loginMessage.priviledge)
              common_vendor.index.$showMsg("无权限进行该操作");
            else
              common_vendor.index.request({
                url: `http://139.159.210.77:1701/teampersonal/remove/${id}`,
                method: "get",
                header: {
                  "Login-Type": "r6Vsr0",
                  "Token": loginMessage.token
                },
                success(res2) {
                  console.log(res2.data.data);
                  if (res2.data.code === 2001) {
                    common_vendor.index.redirectTo({
                      url: "/pages/loginPage"
                    });
                  }
                  teamMate();
                  if (searchValue.value == "") {
                    arr.value = avatarList.value;
                    handlePhotoUrl();
                  } else {
                    arr.value = avatarList.value.filter((item) => item.nickname.includes(searchValue));
                    handlePhotoUrl();
                  }
                  common_vendor.index.$showMsg("移除成功！");
                },
                fail() {
                  common_vendor.index.$showMsg("移除取消！");
                }
              });
          }
        }
      });
    };
    const isadminstration = () => {
      common_vendor.index.$showMsg("管理员！");
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          color: "#999999",
          size: "18",
          type: "home"
        }),
        b: common_vendor.o(_ctx.search),
        c: common_vendor.o(($event) => searchValue.value = $event),
        d: common_vendor.p({
          placeholder: "搜索团队成员",
          cancelButton: "auto",
          focus: true,
          clearButton: "auto",
          modelValue: searchValue.value
        }),
        e: !searchValue.value
      }, !searchValue.value ? {
        f: common_vendor.p({
          title: "团队管理者",
          type: "line"
        })
      } : {}, {
        g: !searchValue.value
      }, !searchValue.value ? {
        h: common_vendor.p({
          ["avatar-circle"]: true,
          title: common_vendor.unref(loginMessage).nickname,
          avatar: common_vendor.unref(loginMessage).photo
        })
      } : {}, {
        i: !searchValue.value
      }, !searchValue.value ? {
        j: common_vendor.p({
          title: "团队成员",
          type: "line"
        })
      } : {}, {
        k: arr.value.length
      }, arr.value.length ? {
        l: common_vendor.f(arr.value, (item, index, i0) => {
          return common_vendor.e({
            a: !item.isExtend
          }, !item.isExtend ? {
            b: common_vendor.o(($event) => remove(item.id), index),
            c: "23ad3134-7-" + i0 + "," + ("23ad3134-6-" + i0),
            d: common_vendor.p({
              type: "minus",
              color: "#999",
              size: "18"
            })
          } : {
            e: common_vendor.o(($event) => isadminstration(), index),
            f: "23ad3134-8-" + i0 + "," + ("23ad3134-6-" + i0),
            g: common_vendor.p({
              type: "auth-filled",
              color: "#999",
              size: "18"
            })
          }, {
            h: index,
            i: "23ad3134-6-" + i0 + ",23ad3134-2",
            j: common_vendor.p({
              title: item.nickname,
              ["avatar-list"]: arr.value,
              ["avatar-circle"]: true,
              avatar: item.photo
            })
          });
        })
      } : {}, {
        m: common_vendor.p({
          border: true
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/vueCode/code1/okr-miniprogram/src/pages/teamMate.vue"]]);
wx.createPage(MiniProgramPage);
