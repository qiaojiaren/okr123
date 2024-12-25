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
  __name: "grantPage",
  setup(__props) {
    const loginMessage = store_Login.useCounterStore();
    const avatarList = common_vendor.ref([]);
    const searchValue = common_vendor.ref("");
    const arr = common_vendor.ref([]);
    const id = common_vendor.ref();
    const name = common_vendor.ref();
    const managerId = common_vendor.ref();
    common_vendor.onLoad((options) => {
      id.value = options.id;
      name.value = options.name;
      managerId.value = options.managerId;
    });
    const teamMate = () => {
      common_vendor.index.request({
        url: `http://139.159.210.77:1701/teampersonal/members/${id.value}`,
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
    const grant = (userid) => {
      const teamName = common_vendor.ref();
      common_vendor.index.showModal({
        title: "是否将该成员设置为新节点的管理员？",
        content: "",
        confirmText: "确认",
        cancelText: "取消",
        success: async (res) => {
          if (res.confirm) {
            await common_vendor.index.showModal({
              title: "请输入节点名称",
              content: "",
              editable: true,
              //是否显示输入框
              placeholderText: "请输入队伍或者部门名称",
              //输入框提示内容
              confirmText: "确认",
              cancelText: "取消"
            }).then((res2) => {
              if (res2.confirm) {
                if (!res2.content.trim()) {
                  common_vendor.index.$showMsg("请勿提交空数据！");
                } else {
                  teamName.value = res2.content;
                  common_vendor.index.request({
                    url: "http://139.159.210.77:1701/team/grant",
                    method: "post",
                    header: {
                      "Login-Type": "r6Vsr0",
                      "Token": loginMessage.token
                    },
                    data: {
                      "teamId": id.value,
                      "teamName": teamName.value,
                      "userId": userid
                    },
                    success: (res3) => {
                      if (res3.data.code === 2001) {
                        common_vendor.index.redirectTo({
                          url: "/pages/loginPage"
                        });
                      }
                      if (res3.data.code === 200) {
                        common_vendor.index.navigateBack({});
                        common_vendor.index.$showMsg("设置成功！");
                      } else if (res3.data.code === 5005) {
                        common_vendor.index.$showMsg("该成员已是其他节点的管理员！");
                      } else if (res3.data.code === 1005) {
                        common_vendor.index.$showMsg("无权限进行此操作！");
                      }
                    },
                    fail: (fail) => {
                      common_vendor.index.$showMsg(fail.data.message);
                    }
                  });
                }
              }
            });
          }
        }
      });
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
          title: "团队成员",
          type: "line"
        })
      } : {}, {
        g: arr.value.length
      }, arr.value.length ? {
        h: common_vendor.f(arr.value, (item, index, i0) => {
          return {
            a: index,
            b: common_vendor.o(($event) => grant(item.userId), index),
            c: "57530989-4-" + i0 + ",57530989-2",
            d: common_vendor.p({
              title: item.nickname,
              ["avatar-list"]: arr.value,
              ["avatar-circle"]: true,
              avatar: item.photo,
              clickable: true
            })
          };
        })
      } : {}, {
        i: common_vendor.p({
          border: true
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/vueCode/code1/okr-miniprogram/src/pages/grantPage.vue"]]);
wx.createPage(MiniProgramPage);
