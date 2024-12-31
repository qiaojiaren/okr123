"use strict";
const common_vendor = require("../common/vendor.js");
const store_Login = require("../store/Login.js");
if (!Array) {
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_fab2 = common_vendor.resolveComponent("uni-fab");
  (_easycom_uni_list_item2 + _easycom_uni_list2 + _easycom_uni_card2 + _easycom_uni_fab2)();
}
const _easycom_uni_list_item = () => "../node-modules/@dcloudio/uni-ui/lib/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../node-modules/@dcloudio/uni-ui/lib/uni-list/uni-list.js";
const _easycom_uni_card = () => "../node-modules/@dcloudio/uni-ui/lib/uni-card/uni-card.js";
const _easycom_uni_fab = () => "../node-modules/@dcloudio/uni-ui/lib/uni-fab/uni-fab.js";
if (!Math) {
  (_easycom_uni_list_item + _easycom_uni_list + _easycom_uni_card + _easycom_uni_fab)();
}
const _sfc_main = {
  __name: "okrTeam",
  setup(__props) {
    const loginMessage = store_Login.useCounterStore();
    const teamjoin = common_vendor.ref([]);
    const managelist = common_vendor.ref([]);
    const request = () => {
      common_vendor.index.request({
        url: "http://47.92.173.60:1701/team/list",
        method: "get",
        header: {
          "Login-Type": "r6Vsr0",
          "Token": loginMessage.token
        },
        success(res) {
          managelist.value = res.data.data;
          console.log(res.data.data);
          common_vendor.index.request({
            url: "http://47.92.173.60:1701/teampersonal/list",
            method: "get",
            header: {
              "Login-Type": "r6Vsr0",
              "Token": loginMessage.token
            },
            success(res2) {
              console.log(res2.data.data);
              for (let i = 0; i < res2.data.data.length; i++) {
                let flag = true;
                for (let j = 0; j < managelist.value.length; j++) {
                  if (managelist.value[j].parentTeamId && managelist.value[j].parentTeamId === res2.data.data[i].teamId || managelist.value[j].id === res2.data.data[i].teamId) {
                    flag = false;
                    break;
                  }
                }
                if (flag === true) {
                  const existingTeam = teamjoin.value.find((team) => team.teamId === res2.data.data[i].teamId);
                  if (!existingTeam) {
                    teamjoin.value.push(res2.data.data[i]);
                  }
                }
              }
            }
          });
        }
      });
    };
    common_vendor.onMounted(() => {
      console.log(loginMessage.id);
      request();
    });
    const pattern = common_vendor.ref({
      color: "black",
      backgroundColor: "#FFFFFF",
      selectedColor: "#3694f3",
      buttonColor: "#3694f3"
    });
    const content = common_vendor.ref([
      {
        iconPath: "http://47.92.173.60:1701/media/static/创建团队.png",
        text: "创建团队"
      }
    ]);
    const trigger = (e) => {
      if (e.index == 0) {
        console.log(loginMessage.token);
        common_vendor.index.showModal({
          title: "创建团队",
          content: "",
          editable: true,
          //是否显示输入框
          placeholderText: "请输入团队名称",
          //输入框提示内容
          confirmText: "确认",
          cancelText: "取消",
          success: (res) => {
            if (res.confirm) {
              common_vendor.index.request({
                url: "http://47.92.173.60:1701/core/create",
                method: "POST",
                header: {
                  "Login-Type": "r6Vsr0",
                  "Token": loginMessage.token
                },
                data: {
                  "scene": "scene-t",
                  "teamName": res.content
                },
                success: (res2) => {
                  console.log(res2.data.message);
                  if (res2.data.code === 200) {
                    common_vendor.index.$showMsg("创建成功");
                    request();
                  } else if (res2.data.code === 5001) {
                    common_vendor.index.$showMsg("创建团队过于频繁！");
                  } else
                    common_vendor.index.$showMsg(res2.data.message);
                },
                fail: () => {
                  common_vendor.index.$showMsg("创建失败，请重试");
                }
              });
            } else
              common_vendor.index.$showMsg("取消了创建团队");
          }
        });
      }
    };
    const teamokr = (teamId, name, item) => {
      loginMessage.teamId = teamId;
      loginMessage.teamname = name;
      loginMessage.nickname = item.nickname;
      console.log(item.id);
      loginMessage.photo = "http://47.92.173.60:1701/" + item.photo;
      if (loginMessage.id == item.id)
        loginMessage.priviledge = true;
      else
        loginMessage.priviledge = false;
      common_vendor.index.navigateTo({
        url: "/pages/myTeam"
        // 跳转的页面路径
      });
    };
    common_vendor.onShow(() => {
      request();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: teamjoin.value.length
      }, teamjoin.value.length ? {
        b: common_vendor.f(teamjoin.value, (item, index, i0) => {
          return {
            a: common_vendor.o(($event) => teamokr(item.teamId, item.teamName, item.manager), index),
            b: "470bea59-2-" + i0 + "," + ("470bea59-1-" + i0),
            c: common_vendor.p({
              title: item.teamName,
              clickable: true,
              showArrow: true
            }),
            d: index,
            e: "470bea59-1-" + i0 + ",470bea59-0"
          };
        }),
        c: common_vendor.p({
          margin: "10px",
          padding: "3px"
        })
      } : {}, {
        d: managelist.value.length
      }, managelist.value.length ? {
        e: common_vendor.f(managelist.value, (item, index, i0) => {
          return {
            a: common_vendor.o(($event) => teamokr(item.id, item.teamName, item.manager), index),
            b: "470bea59-5-" + i0 + "," + ("470bea59-4-" + i0),
            c: common_vendor.p({
              title: item.teamName,
              clickable: true,
              showArrow: true
            }),
            d: index,
            e: "470bea59-4-" + i0 + ",470bea59-3"
          };
        }),
        f: common_vendor.p({
          margin: "10px",
          padding: "3px"
        })
      } : {}, {
        g: common_vendor.o(trigger),
        h: common_vendor.p({
          horizontal: "right",
          vertical: "bottom",
          direction: "vertical",
          content: content.value,
          pattern: pattern.value,
          popMenu: true
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-470bea59"], ["__file", "E:/vueCode/code1/okr-miniprogram/src/pages/okrTeam.vue"]]);
wx.createPage(MiniProgramPage);
