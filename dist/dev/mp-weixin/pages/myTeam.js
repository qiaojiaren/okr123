"use strict";
const common_vendor = require("../common/vendor.js");
const store_Login = require("../store/Login.js");
if (!Array) {
  const _easycom_uni_fab2 = common_vendor.resolveComponent("uni-fab");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_fab2 + _easycom_uni_icons2 + _easycom_uni_popup2)();
}
const _easycom_uni_fab = () => "../node-modules/@dcloudio/uni-ui/lib/uni-fab/uni-fab.js";
const _easycom_uni_icons = () => "../node-modules/@dcloudio/uni-ui/lib/uni-icons/uni-icons.js";
const _easycom_uni_popup = () => "../node-modules/@dcloudio/uni-ui/lib/uni-popup/uni-popup.js";
if (!Math) {
  (common_vendor.unref(TreeItem) + _easycom_uni_fab + _easycom_uni_icons + _easycom_uni_popup)();
}
const TreeItem = () => "../components/tree-item.js";
const _sfc_main = {
  __name: "myTeam",
  setup(__props) {
    const loginMessage = store_Login.useCounterStore();
    common_vendor.onMounted(() => {
      if (loginMessage.priviledge) {
        loginMessage.manage = true;
      } else
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
            const teamMate = common_vendor.ref(res.data.data.filter((item) => item.userId == loginMessage.id));
            console.log(teamMate.value[0].isExtend);
            if (teamMate)
              loginMessage.manage = true;
            else
              loginMessage.manage = false;
          }
        });
    });
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
    common_vendor.onShow(() => {
      common_vendor.index.request({
        url: `http://139.159.210.77:1701/team/tree/${loginMessage.teamId}`,
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
          console.log("树结构");
          console.log(treeData.value);
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
    const pattern = common_vendor.ref({
      color: "black",
      backgroundColor: "#FFFFFF",
      selectedColor: "#3694f3",
      buttonColor: "#3694f3"
    });
    const content = common_vendor.ref([
      {
        iconPath: "http://139.159.210.77:1701/media/static/创建团队.png",
        text: "邀请成员"
      },
      {
        iconPath: "http://139.159.210.77:1701/media/static/邀请加入团队.png",
        text: "查看成员"
      },
      {
        iconPath: "http://139.159.210.77:1701/media/static/修改.png",
        text: "团队名称"
      }
    ]);
    const popup = common_vendor.ref(null);
    const qrcode = common_vendor.ref("");
    const trigger = (e) => {
      if (e.index == 0) {
        common_vendor.index.request({
          url: `http://139.159.210.77:1701/team/qrcode/${loginMessage.teamId}`,
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
            if (res.data.data) {
              qrcode.value = "http://139.159.210.77:1701/" + res.data.data;
              popup.value.open();
            } else {
              console.log(res.data.message);
              common_vendor.index.showToast({
                title: res.data.message + "无权限查看",
                icon: "none"
              });
            }
          },
          fail(fail) {
            common_vendor.index.showToast({
              title: "获取二维码失败，请稍后重试",
              icon: "none"
            });
          }
        });
      } else if (e.index == 1) {
        common_vendor.index.navigateTo({
          url: "/pages/teamMate"
          // 跳转的页面路径
        });
      } else if (e.index == 2) {
        common_vendor.index.showModal({
          title: "修改团队名称",
          content: "",
          editable: true,
          //是否显示输入框
          placeholderText: "请输入团队名称",
          //输入框提示内容
          confirmText: "确认",
          cancelText: "取消",
          success: (res) => {
            if (res.confirm) {
              const teamname = common_vendor.ref(res.content);
              if (!loginMessage.priviledge) {
                common_vendor.index.$showMsg("团队管理者才能进行该操作");
                return;
              }
              if (!res.content.trim()) {
                common_vendor.index.$showMsg("请勿提交空数据！");
              } else {
                common_vendor.index.request({
                  url: "http://139.159.210.77:1701/team/rename",
                  method: "post",
                  header: {
                    "Login-Type": "r6Vsr0",
                    "Token": loginMessage.token
                  },
                  data: {
                    "id": loginMessage.teamId,
                    "teamName": res.content
                  },
                  success: (res2) => {
                    if (res2.data.code === 2001) {
                      common_vendor.index.redirectTo({
                        url: "/pages/loginPage"
                      });
                    }
                    if (res2.data.message === "操作成功") {
                      loginMessage.teamname = teamname.value;
                      common_vendor.index.$showMsg("修改成功");
                      setTimeout(() => {
                        common_vendor.index.redirectTo({ url: "/pages/myTeam" });
                      }, 500);
                    } else {
                      common_vendor.index.$showMsg("修改失败，请稍后重试");
                    }
                  }
                });
              }
            } else
              common_vendor.index.$showMsg("取消修改");
          }
        });
      }
    };
    const close = (e) => {
      popup.value.close();
    };
    const saveQRcode = () => {
      common_vendor.index.getSetting({
        success: (res) => {
          if (res.authSetting["scope.writePhotosAlbum"]) {
            saveQRcodeToPhotosAlbum();
          } else {
            common_vendor.index.authorize({
              scope: "scope.writePhotosAlbum",
              success: (res2) => {
                console.log("有授权的信息：", res2);
                saveQRcodeToPhotosAlbum();
              },
              fail: (err) => {
                common_vendor.index.showModal({
                  content: "检测到你没打开保存相册权限，是否去设置打开",
                  confirmText: "确认",
                  cancelText: "取消",
                  success(res2) {
                    if (res2.confirm) {
                      common_vendor.index.openSetting({
                        success(res3) {
                          console.log("授权成功");
                        }
                      });
                    } else {
                      console.log("取消授权");
                    }
                  }
                });
              }
            });
          }
        }
      });
    };
    const saveQRcodeToPhotosAlbum = () => {
      common_vendor.index.downloadFile({
        url: qrcode.value,
        // 图片的URL
        success: (downloadRes) => {
          common_vendor.index.saveImageToPhotosAlbum({
            filePath: downloadRes.tempFilePath,
            success(res) {
              common_vendor.index.showToast({
                title: "保存成功",
                icon: "success"
              });
            },
            fail(err) {
              console.log(err);
            }
          });
        }
      });
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
        e: "scale(" + scale.value + ")",
        f: common_vendor.o(trigger),
        g: common_vendor.p({
          horizontal: "right",
          vertical: "bottom",
          direction: "vertical",
          content: content.value,
          pattern: pattern.value,
          popMenu: true
        }),
        h: common_vendor.o(close),
        i: common_vendor.p({
          type: "close",
          size: "30",
          color: "#fff"
        }),
        j: qrcode.value,
        k: common_vendor.o(saveQRcode),
        l: common_vendor.sr(popup, "1decec87-2", {
          "k": "popup"
        }),
        m: common_vendor.p({
          type: "center",
          mask: true,
          ["mask-click"]: false
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1decec87"], ["__file", "E:/vueCode/code1/okr-miniprogram/src/pages/myTeam.vue"]]);
wx.createPage(MiniProgramPage);
