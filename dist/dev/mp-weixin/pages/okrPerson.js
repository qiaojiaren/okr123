"use strict";
const common_vendor = require("../common/vendor.js");
const store_Login = require("../store/Login.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_icons2 + _easycom_uni_popup2)();
}
const _easycom_uni_icons = () => "../node-modules/@dcloudio/uni-ui/lib/uni-icons/uni-icons.js";
const _easycom_uni_popup = () => "../node-modules/@dcloudio/uni-ui/lib/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_popup + readWriteOkr)();
}
const readWriteOkr = () => "../components/readWriteOkr.js";
const _sfc_main = {
  __name: "okrPerson",
  setup(__props) {
    const loginMessage = store_Login.useCounterStore();
    const getPersonOkrList = () => {
      common_vendor.index.request({
        url: "http://139.159.210.77:1701/personal/list",
        method: "GET",
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
          loginMessage.scene = "scene-p";
          if (res.data.data.length === 0) {
            createOKPerson.value = false;
            notCreatedPerson.value = true;
            createdPerson.value = false;
          } else if (res.data.data[0].isOver) {
            createOKPerson.value = false;
            notCreatedPerson.value = true;
            createdPerson.value = false;
          } else {
            loginMessage.OkrcoreId = res.data.data[0].coreId;
            createOKPerson.value = false;
            notCreatedPerson.value = false;
            createdPerson.value = true;
            loginMessage.getOkrInformation();
          }
        }
      });
    };
    getPersonOkrList();
    const popup1 = common_vendor.ref();
    const popup2 = common_vendor.ref();
    const showMedal = common_vendor.ref({
      description: "",
      isRead: false,
      issueTime: "",
      level: 0,
      medalId: 0,
      name: "",
      url: ""
    });
    const getUnreadMedal = () => {
      common_vendor.index.request({
        url: "http://139.159.210.77:1701/medal/list/unread",
        method: "GET",
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
          if (res.data.data.length) {
            showMedal.value = res.data.data[0];
            showMedal.value.url = "http://139.159.210.77:1701/" + showMedal.value.url;
            console.log(showMedal.value);
            if (notCreatedPerson.value) {
              popup1.value.open();
            } else if (createdPerson.value) {
              popup2.value.open();
            }
          }
        }
      });
    };
    common_vendor.onShow(() => {
      getPersonOkrList();
      myOkrTeam.value = true;
      createdTeam.value = false;
    });
    common_vendor.onReady(() => {
      getUnreadMedal();
    });
    const close = () => {
      common_vendor.index.request({
        url: `http://139.159.210.77:1701/medal/read/${showMedal.value.medalId}`,
        method: "POST",
        header: {
          "Login-Type": "r6Vsr0",
          "Token": loginMessage.token
        }
      }).then((res) => {
        if (res.data.code === 200) {
          if (notCreatedPerson.value) {
            popup1.value.close();
          } else if (createdPerson.value) {
            popup2.value.close();
          }
        }
      });
    };
    const toWall = () => {
      if (notCreatedPerson.value) {
        popup1.value.close();
      } else if (createdPerson.value) {
        popup2.value.close();
      }
      common_vendor.index.request({
        url: `http://139.159.210.77:1701/medal/read/${showMedal.value.medalId}`,
        method: "POST",
        header: {
          "Login-Type": "r6Vsr0",
          "Token": loginMessage.token
        }
      }).then(async (res) => {
        await common_vendor.index.navigateTo({
          url: "medalPage"
        });
      });
    };
    const handleSwiperChange = (event) => {
      switch (event.detail.current) {
        case 0:
          getPersonOkrList();
          common_vendor.index.setNavigationBarTitle({
            title: "个人模式"
          });
          break;
        case 1:
          loginMessage.scene = "scene-tp";
          getTeamPersonList();
          myOkrTeam.value = true;
          createdTeam.value = false;
          common_vendor.index.setNavigationBarTitle({
            title: "团队模式"
          });
          break;
      }
    };
    const notCreatedPerson = common_vendor.ref(false);
    const createdPerson = common_vendor.ref(false);
    const createOKPerson = common_vendor.ref(false);
    const createOkrPerson = () => {
      createOKPerson.value = true;
      notCreatedPerson.value = false;
    };
    const backPerson = () => {
      createOKPerson.value = false;
      notCreatedPerson.value = true;
    };
    const createCompletePerson = () => {
      common_vendor.index.request({
        url: "http://139.159.210.77:1701/core/create",
        method: "POST",
        header: {
          "Login-Type": "r6Vsr0",
          "Token": loginMessage.token
        },
        data: {
          "scene": "scene-p"
        },
        success(res) {
          if (res.data.code === 2001) {
            common_vendor.index.redirectTo({
              url: "/pages/loginPage"
            });
          }
          if (res.data.code === 200) {
            loginMessage.OkrcoreId = res.data.data.coreId;
            loginMessage.getOkrInformation();
            createOKPerson.value = false;
            notCreatedPerson.value = false;
            createdPerson.value = true;
          }
        }
      });
    };
    const createdTeam = common_vendor.ref(false);
    const myOkrTeam = common_vendor.ref(true);
    const personTeamOKR = (coreId) => {
      loginMessage.OkrcoreId = coreId;
      loginMessage.scene = "scene-tp";
      loginMessage.getOkrInformation();
      common_vendor.index.navigateTo({
        url: "/pages/teamOKR"
      });
    };
    const personalTeamOkr = common_vendor.ref();
    const noTeam = common_vendor.ref(true);
    const getTeamPersonList = () => {
      common_vendor.index.request({
        url: "http://139.159.210.77:1701/teampersonal/list",
        method: "GET",
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
          if (res.data.data.length != 0) {
            personalTeamOkr.value = res.data.data;
            noTeam.value = false;
          }
        }
      });
    };
    getTeamPersonList();
    common_vendor.ref({
      color: "black",
      backgroundColor: "#FFFFFF",
      selectedColor: "#3694f3",
      buttonColor: "#3694f3"
    });
    common_vendor.ref([
      {
        iconPath: "http://139.159.210.77:1701/media/static/返回.png",
        text: "返回"
      }
    ]);
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: notCreatedPerson.value
      }, notCreatedPerson.value ? {
        b: common_vendor.o(createOkrPerson),
        c: common_vendor.o(close),
        d: common_vendor.p({
          type: "close",
          size: "30",
          color: "#fff"
        }),
        e: showMedal.value.url,
        f: common_vendor.t(showMedal.value.name),
        g: common_vendor.t(showMedal.value.description),
        h: common_vendor.o(toWall),
        i: common_vendor.sr(popup1, "c02477a6-0", {
          "k": "popup1"
        }),
        j: common_vendor.p({
          type: "center",
          mask: true,
          ["mask-click"]: false
        })
      } : {}, {
        k: createOKPerson.value
      }, createOKPerson.value ? {
        l: common_vendor.o(backPerson),
        m: common_vendor.o(createCompletePerson)
      } : {}, {
        n: common_vendor.o(close),
        o: common_vendor.p({
          type: "close",
          size: "30",
          color: "#fff"
        }),
        p: showMedal.value.url,
        q: common_vendor.t(showMedal.value.name),
        r: common_vendor.t(showMedal.value.level),
        s: common_vendor.t(showMedal.value.description),
        t: common_vendor.o(toWall),
        v: common_vendor.sr(popup2, "c02477a6-3", {
          "k": "popup2"
        }),
        w: common_vendor.p({
          type: "center",
          mask: true,
          ["mask-click"]: false
        }),
        x: createdPerson.value,
        y: myOkrTeam.value
      }, myOkrTeam.value ? common_vendor.e({
        z: noTeam.value
      }, noTeam.value ? {} : {
        A: common_vendor.f(personalTeamOkr.value, (item, k0, i0) => {
          return common_vendor.e({
            a: !item.isOver
          }, !item.isOver ? {
            b: common_vendor.t(item.teamName),
            c: common_vendor.o(($event) => personTeamOKR(item.coreId), item.id)
          } : {}, {
            d: item.id
          });
        })
      }) : {}, {
        B: common_vendor.o(handleSwiperChange)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c02477a6"], ["__file", "E:/vueCode/code1/okr-miniprogram/src/pages/okrPerson.vue"]]);
wx.createPage(MiniProgramPage);
