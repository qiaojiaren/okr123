"use strict";
const common_vendor = require("../common/vendor.js");
const store_Login = require("../store/Login.js");
if (!Array) {
  const _easycom_uni_fab2 = common_vendor.resolveComponent("uni-fab");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_datetime_picker2 = common_vendor.resolveComponent("uni-datetime-picker");
  (_easycom_uni_fab2 + _easycom_uni_popup2 + _easycom_uni_section2 + _easycom_uni_datetime_picker2)();
}
const _easycom_uni_fab = () => "../node-modules/@dcloudio/uni-ui/lib/uni-fab/uni-fab.js";
const _easycom_uni_popup = () => "../node-modules/@dcloudio/uni-ui/lib/uni-popup/uni-popup.js";
const _easycom_uni_section = () => "../node-modules/@dcloudio/uni-ui/lib/uni-section/uni-section.js";
const _easycom_uni_datetime_picker = () => "../node-modules/@dcloudio/uni-ui/lib/uni-datetime-picker/uni-datetime-picker.js";
if (!Math) {
  (_easycom_uni_fab + _easycom_uni_popup + _easycom_uni_section + _easycom_uni_datetime_picker)();
}
const _sfc_main = {
  __name: "readWriteOkr",
  setup(__props) {
    const loginMessage = store_Login.useCounterStore();
    const cardshow2 = common_vendor.ref();
    const cardshow1 = common_vendor.ref();
    const cardshow3 = common_vendor.ref();
    const cardshow4 = common_vendor.ref();
    const cardshow5 = common_vendor.ref();
    const cardshow6 = common_vendor.ref();
    const cardshow7 = common_vendor.ref();
    const cardshow8 = common_vendor.ref();
    const cardshow9 = common_vendor.ref();
    const cardshow10 = common_vendor.ref();
    const datetimesingle = common_vendor.ref("");
    const objective = common_vendor.ref("");
    const firstQuadrant = () => {
      if (loginMessage.okrInformation.firstQuadrantVO.objective) {
        cardshow2.value.open();
      } else {
        cardshow5.value.open();
      }
    };
    const sliderChange = (e, id) => {
      common_vendor.index.request({
        url: "http://139.159.210.77:1701/keyresult/update",
        method: "POST",
        header: {
          "Login-Type": "r6Vsr0",
          "Token": loginMessage.token
        },
        data: {
          "keyResultUpdateDTO": {
            "id": id,
            "probability": e.detail.value
          },
          "scene": loginMessage.scene
        },
        success(res) {
          if (res.data.code === 2001) {
            common_vendor.index.redirectTo({
              url: "/pages/loginPage"
            });
          }
          loginMessage.getOkrInformation();
        }
      });
    };
    const setFirstQuadrant = async () => {
      if (datetimesingle.value.trim() === "" || objective.value.trim() === "") {
        common_vendor.index.showModal({
          title: "请勿提交空数据！",
          editable: false,
          //是否显示输入框
          confirmText: "确认",
          showCancel: false
        });
        return;
      }
      common_vendor.index.request({
        url: "http://139.159.210.77:1701/firstquadrant/init",
        method: "POST",
        header: {
          "Login-Type": "r6Vsr0",
          "Token": loginMessage.token
        },
        data: {
          "firstQuadrantDTO": {
            "deadline": datetimesingle.value,
            "id": loginMessage.okrInformation.firstQuadrantVO.id,
            "objective": objective.value
          },
          "scene": loginMessage.scene
        },
        success(res) {
          if (res.data.code === 2001) {
            common_vendor.index.redirectTo({
              url: "/pages/loginPage"
            });
          }
          if (res.data.code === 200) {
            cardshow5.value.close();
            datetimesingle.value = "";
            objective.value = "";
            common_vendor.index.$showMsg("设置成功！");
            loginMessage.getOkrInformation();
          } else {
            common_vendor.index.$showMsg(res.data.message);
          }
        }
      });
    };
    const addKeyResult = () => {
      cardshow2.value.close();
      cardshow9.value.open();
    };
    const keyResult = common_vendor.ref("");
    const krConfidence = common_vendor.ref(50);
    const addSliderChange = (e) => {
      krConfidence.value = e.detail.value;
    };
    const comfirmAddKeyResult = () => {
      if (keyResult.value.trim() === "") {
        common_vendor.index.showModal({
          title: "请勿提交空数据！",
          editable: false,
          //是否显示输入框
          confirmText: "确认",
          showCancel: false
        });
        return;
      }
      common_vendor.index.request({
        url: "http://139.159.210.77:1701/keyresult/add",
        method: "POST",
        header: {
          "Login-Type": "r6Vsr0",
          "Token": loginMessage.token
        },
        data: {
          "keyResultDTO": {
            "content": keyResult.value,
            "firstQuadrantId": loginMessage.okrInformation.firstQuadrantVO.id,
            "probability": krConfidence.value
          },
          "scene": loginMessage.scene
        },
        success(res) {
          if (res.data.code === 2001) {
            common_vendor.index.redirectTo({
              url: "/pages/loginPage"
            });
          }
          keyResult.value = "";
          krConfidence.value = 50;
          cardshow2.value.open();
          cardshow9.value.close();
          keyResult.value = "";
          krConfidence.value = 50;
          common_vendor.index.$showMsg("添加成功！");
          loginMessage.getOkrInformation();
        }
      });
    };
    const secondQuadrant = () => {
      if (loginMessage.okrInformation.secondQuadrantVO.deadline) {
        cardshow1.value.open();
      } else {
        cardshow6.value.open();
      }
    };
    const thirdQuadrant = () => {
      if (loginMessage.okrInformation.thirdQuadrantVO.deadline) {
        cardshow3.value.open();
      } else {
        cardshow7.value.open();
      }
    };
    const shortDeadline = common_vendor.ref("");
    const shortPeriod = common_vendor.ref("");
    const setShortDeadline = async () => {
      if (shortDeadline.value.trim() === "" || shortPeriod.value.trim() === "") {
        common_vendor.index.showModal({
          title: "请勿提交空数据！",
          editable: false,
          //是否显示输入框
          confirmText: "确认",
          showCancel: false
        });
        return;
      }
      if (!(+shortPeriod.value == shortPeriod.value)) {
        common_vendor.index.showModal({
          title: "请输入符合要求的计划执行周期（例如：7）！",
          editable: false,
          //是否显示输入框
          confirmText: "确认",
          showCancel: false
        });
        return;
      }
      common_vendor.index.request({
        url: "http://139.159.210.77:1701/secondquadrant/init",
        method: "POST",
        header: {
          "Login-Type": "r6Vsr0",
          "Token": loginMessage.token
        },
        data: {
          "initQuadrantDTO": {
            "deadline": shortDeadline.value,
            "id": loginMessage.okrInformation.secondQuadrantVO.id,
            "quadrantCycle": shortPeriod.value * 24 * 3600
          },
          "scene": loginMessage.scene
        },
        success(res) {
          if (res.data.code === 2001) {
            common_vendor.index.redirectTo({
              url: "/pages/loginPage"
            });
          }
          if (res.data.code === 200) {
            cardshow6.value.close();
            shortDeadline.value = "";
            shortPeriod.value = "";
            common_vendor.index.$showMsg("设置成功！");
            loginMessage.getOkrInformation();
          } else {
            common_vendor.index.$showMsg(res.data.message);
          }
        }
      });
    };
    const longDeadline = common_vendor.ref("");
    const longPeriod = common_vendor.ref("");
    const setLongDeadline = async () => {
      if (longDeadline.value.trim() === "" || longPeriod.value.trim() === "") {
        common_vendor.index.showModal({
          title: "请勿提交空数据！",
          editable: false,
          //是否显示输入框
          confirmText: "确认",
          showCancel: false
        });
        return;
      }
      if (!(+longPeriod.value == longPeriod.value)) {
        common_vendor.index.showModal({
          title: "请输入符合要求的计划执行周期（例如：30）！",
          editable: false,
          //是否显示输入框
          confirmText: "确认",
          showCancel: false
        });
        return;
      }
      common_vendor.index.request({
        url: "http://139.159.210.77:1701/thirdquadrant/init",
        method: "POST",
        header: {
          "Login-Type": "r6Vsr0",
          "Token": loginMessage.token
        },
        data: {
          "initQuadrantDTO": {
            "deadline": longDeadline.value,
            "id": loginMessage.okrInformation.thirdQuadrantVO.id,
            "quadrantCycle": longPeriod.value * 24 * 3600
          },
          "scene": loginMessage.scene
        },
        success(res) {
          if (res.data.code === 2001) {
            common_vendor.index.redirectTo({
              url: "/pages/loginPage"
            });
          }
          if (res.data.code === 200) {
            cardshow7.value.close();
            longDeadline.value = "";
            longPeriod.value = "";
            common_vendor.index.$showMsg("设置成功！");
            loginMessage.getOkrInformation();
          } else {
            common_vendor.index.$showMsg(res.data.message);
          }
        }
      });
    };
    const addPlanFun = (quadrantNum, option) => {
      const quadrantId = common_vendor.ref(quadrantNum === 2 ? loginMessage.okrInformation.secondQuadrantVO.id : loginMessage.okrInformation.thirdQuadrantVO.id);
      common_vendor.index.showModal({
        title: "请填写任务内容",
        content: "",
        editable: true,
        //是否显示输入框
        placeholderText: "任务内容",
        //输入框提示内容
        confirmText: "确认",
        cancelText: "取消",
        success: (res) => {
          if (res.confirm) {
            if (res.content.trim() === "") {
              common_vendor.index.showModal({
                title: "请勿提交空数据！",
                editable: false,
                //是否显示输入框
                confirmText: "确认",
                showCancel: false
              });
              return;
            }
            common_vendor.index.request({
              url: `http://139.159.210.77:1701/task/${option}/add`,
              method: "POST",
              header: {
                "Login-Type": "r6Vsr0",
                "Token": loginMessage.token
              },
              data: {
                "scene": loginMessage.scene,
                "taskDTO": {
                  "content": res.content,
                  "quadrantId": quadrantId.value
                }
              },
              success(res1) {
                if (res1.data.code === 2001) {
                  common_vendor.index.redirectTo({
                    url: "/pages/loginPage"
                  });
                }
                if (res1.data.code === 200) {
                  common_vendor.index.$showMsg("添加成功！");
                  loginMessage.getOkrInformation();
                } else {
                  common_vendor.index.$showMsg(res1.data.message);
                }
              }
            });
          }
        }
      });
    };
    const addShortPlan = () => {
      common_vendor.index.showModal({
        title: "请选择待添加的任务类型",
        content: "",
        confirmText: "P2",
        cancelText: "P1",
        success: (res) => {
          if (res.confirm) {
            addPlanFun(2, 2);
          } else {
            addPlanFun(2, 1);
          }
        }
      });
    };
    const addLongPlan = () => {
      addPlanFun(3, 0);
    };
    const planCompleted = (taskNum, id, content2, isCompleted) => {
      common_vendor.index.request({
        url: `http://139.159.210.77:1701/task/${taskNum}/update`,
        method: "POST",
        header: {
          "Login-Type": "r6Vsr0",
          "Token": loginMessage.token
        },
        data: {
          "scene": loginMessage.scene,
          "taskUpdateDTO": {
            "content": content2,
            "id": id,
            "isCompleted": !isCompleted
          }
        },
        success(res1) {
          if (res1.data.code === 2001) {
            common_vendor.index.redirectTo({
              url: "/pages/loginPage"
            });
          }
          loginMessage.getOkrInformation();
        }
      });
    };
    const planDelete = (taskNum, id) => {
      common_vendor.index.request({
        url: `http://139.159.210.77:1701/task/${taskNum}/remove`,
        method: "POST",
        header: {
          "Login-Type": "r6Vsr0",
          "Token": loginMessage.token
        },
        data: {
          "id": id,
          "scene": loginMessage.scene
        },
        success(res1) {
          if (res1.data.code === 2001) {
            common_vendor.index.redirectTo({
              url: "/pages/loginPage"
            });
          }
          loginMessage.getOkrInformation();
        }
      });
    };
    const showCard4 = () => {
      cardshow4.value.open();
    };
    const addStatus = () => {
      cardshow4.value.close();
      cardshow8.value.open();
    };
    const statusArr = common_vendor.ref([true, false, false]);
    const changeColor = (flag) => {
      for (let i = 0; i < statusArr.value.length; i++) {
        statusArr.value[i] = false;
      }
      statusArr.value[flag] = true;
    };
    const statusLabel = common_vendor.ref("");
    const confirmAddStatus = () => {
      if (statusLabel.value.trim() === "") {
        common_vendor.index.showModal({
          title: "请勿提交空数据！",
          editable: false,
          //是否显示输入框
          confirmText: "确认",
          showCancel: false
        });
        return;
      }
      const color = common_vendor.ref();
      for (let i = 0; i < statusArr.value.length; i++) {
        if (statusArr.value[i] === true) {
          color.value = i;
          break;
        }
      }
      common_vendor.index.request({
        url: "http://139.159.210.77:1701/flag/add",
        method: "POST",
        header: {
          "Login-Type": "r6Vsr0",
          "Token": loginMessage.token
        },
        data: {
          "scene": loginMessage.scene,
          "statusFlagDTO": {
            "color": "#00000" + color.value,
            "fourthQuadrantId": loginMessage.okrInformation.fourthQuadrantVO.id,
            "label": statusLabel.value
          }
        },
        success(res) {
          if (res.data.code === 2001) {
            common_vendor.index.redirectTo({
              url: "/pages/loginPage"
            });
          }
          if (res.data.code === 200) {
            cardshow8.value.close();
            statusLabel.value = "";
            cardshow4.value.open();
            common_vendor.index.$showMsg("添加成功！");
            statusLabel.value = "";
            loginMessage.getOkrInformation();
          } else {
            common_vendor.index.$showMsg(res.data.message);
          }
        }
      });
    };
    const updateColor = (label, id, color) => {
      common_vendor.index.request({
        url: "http://139.159.210.77:1701/flag/update",
        method: "POST",
        header: {
          "Login-Type": "r6Vsr0",
          "Token": loginMessage.token
        },
        data: {
          "scene": loginMessage.scene,
          "statusFlagUpdateDTO": {
            "color": "#00000" + color,
            "id": id,
            "label": label
          }
        },
        success(res) {
          if (res.data.code === 2001) {
            common_vendor.index.redirectTo({
              url: "/pages/loginPage"
            });
          }
          if (res.data.code === 200) {
            loginMessage.getOkrInformation();
          } else {
            common_vendor.index.$showMsg(res.data.message);
          }
        }
      });
    };
    const deleteState = (id) => {
      common_vendor.index.request({
        url: "http://139.159.210.77:1701/flag/remove",
        method: "POST",
        header: {
          "Login-Type": "r6Vsr0",
          "Token": loginMessage.token
        },
        data: {
          "id": id,
          "scene": loginMessage.scene
        },
        success(res) {
          if (res.data.code === 2001) {
            common_vendor.index.redirectTo({
              url: "/pages/loginPage"
            });
          }
          if (res.data.code === 200) {
            loginMessage.getOkrInformation();
          } else {
            common_vendor.index.$showMsg(res.data.message);
          }
        }
      });
    };
    const backCurrent = async (number) => {
      switch (number) {
        case 1:
          cardshow1.value.close();
          break;
        case 2:
          cardshow2.value.close();
          break;
        case 3:
          cardshow3.value.close();
          break;
        case 4:
          cardshow4.value.close();
          break;
        case 5:
          cardshow5.value.close();
          datetimesingle.value = "";
          objective.value = "";
          break;
        case 6:
          cardshow6.value.close();
          shortDeadline.value = "";
          shortPeriod.value = "";
          break;
        case 7:
          cardshow7.value.close();
          longDeadline.value = "";
          longPeriod.value = "";
          break;
        case 8:
          cardshow8.value.close();
          statusLabel.value = "";
          cardshow4.value.open();
          break;
        case 9:
          cardshow9.value.close();
          keyResult.value = "";
          krConfidence.value = 50;
          cardshow2.value.open();
          break;
        case 10:
          cardshow10.value.close();
          completion.value = 0;
          summarize.value = "";
          cardshow2.value.open();
          break;
      }
    };
    const finishOkr = () => {
      common_vendor.index.showModal({
        title: "确认结束OKR吗？",
        editable: false,
        //是否显示输入框
        confirmText: "确认",
        cancelText: "取消",
        success: (res) => {
          if (res.confirm) {
            cardshow10.value.open();
            cardshow2.value.close();
          }
        }
      });
    };
    const finishSliderChange = (e) => {
      completion.value = e.detail.value;
    };
    const completion = common_vendor.ref(0);
    const summarize = common_vendor.ref("");
    const comfirmFinishOkr = async () => {
      if (summarize.value.trim() === "") {
        common_vendor.index.showModal({
          title: "请勿提交空数据！",
          editable: false,
          //是否显示输入框
          confirmText: "确认",
          showCancel: false
        });
        return;
      }
      await common_vendor.index.request({
        url: "http://139.159.210.77:1701/core/complete",
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
      });
      common_vendor.index.request({
        url: "http://139.159.210.77:1701/core/summary",
        method: "POST",
        header: {
          "Login-Type": "r6Vsr0",
          "Token": loginMessage.token
        },
        data: {
          "coreId": loginMessage.OkrcoreId,
          "degree": completion.value,
          "scene": loginMessage.scene,
          "summary": summarize.value
        },
        success(res) {
          if (res.data.code === 2001) {
            common_vendor.index.redirectTo({
              url: "/pages/loginPage"
            });
          }
          if (res.data.code === 200) {
            cardshow10.value.close();
            completion.value = 0;
            summarize.value = "";
            if (loginMessage.scene === "scene-t") {
              common_vendor.index.switchTab({
                url: "okrTeam"
              });
              common_vendor.index.$showMsg("已完成总结！");
            } else {
              common_vendor.index.reLaunch({
                url: "okrPerson"
              });
              common_vendor.index.$showMsg("已完成总结！");
            }
          } else {
            common_vendor.index.$showMsg(res.data.message);
          }
        }
      });
    };
    const pattern = common_vendor.ref({
      color: "black",
      backgroundColor: "#FFFFFF",
      selectedColor: "#3694f3",
      buttonColor: "#3694f3"
    });
    const content = common_vendor.ref([
      {
        iconPath: "http://139.159.210.77:1701/media/static/数据分析.png",
        text: "数据分析"
      }
    ]);
    const trigger = (e) => {
      if (e.index === 0) {
        common_vendor.index.navigateTo({
          url: "/pages/dataAnalysis"
        });
      }
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(trigger),
        b: common_vendor.p({
          horizontal: "left",
          vertical: "bottom",
          direction: "vertical",
          content: content.value,
          pattern: pattern.value,
          popMenu: true
        }),
        c: common_vendor.unref(loginMessage).okrInformation.secondQuadrantVO.deadline
      }, common_vendor.unref(loginMessage).okrInformation.secondQuadrantVO.deadline ? {
        d: common_vendor.f(common_vendor.unref(loginMessage).okrInformation.secondQuadrantVO.priorityNumberOnes, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.content),
            b: item.id
          };
        }),
        e: common_vendor.f(common_vendor.unref(loginMessage).okrInformation.secondQuadrantVO.priorityNumberTwos, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.content),
            b: item.id
          };
        }),
        f: common_vendor.o(secondQuadrant)
      } : {
        g: common_vendor.o(secondQuadrant)
      }, {
        h: common_vendor.unref(loginMessage).okrInformation.firstQuadrantVO.objective
      }, common_vendor.unref(loginMessage).okrInformation.firstQuadrantVO.objective ? {
        i: common_vendor.t(common_vendor.unref(loginMessage).okrInformation.firstQuadrantVO.objective),
        j: common_vendor.f(common_vendor.unref(loginMessage).okrInformation.firstQuadrantVO.keyResults, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.content),
            b: common_vendor.t(item.probability),
            c: item.id
          };
        }),
        k: common_vendor.o(firstQuadrant)
      } : {
        l: common_vendor.o(firstQuadrant)
      }, {
        m: common_vendor.unref(loginMessage).okrInformation.thirdQuadrantVO.deadline
      }, common_vendor.unref(loginMessage).okrInformation.thirdQuadrantVO.deadline ? {
        n: common_vendor.f(common_vendor.unref(loginMessage).okrInformation.thirdQuadrantVO.actions, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.content),
            b: item.id
          };
        }),
        o: common_vendor.o(thirdQuadrant)
      } : {
        p: common_vendor.o(thirdQuadrant)
      }, {
        q: common_vendor.unref(loginMessage).okrInformation.fourthQuadrantVO.statusFlags.length
      }, common_vendor.unref(loginMessage).okrInformation.fourthQuadrantVO.statusFlags.length ? {
        r: common_vendor.f(common_vendor.unref(loginMessage).okrInformation.fourthQuadrantVO.statusFlags, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.label),
            b: item.color === "#000000" ? 1 : "",
            c: item.color === "#000001" ? 1 : "",
            d: item.color === "#000002" ? 1 : "",
            e: item.id
          };
        }),
        s: common_vendor.o(showCard4)
      } : {
        t: common_vendor.o(showCard4)
      }, {
        v: common_vendor.t(common_vendor.unref(loginMessage).okrInformation.firstQuadrantVO.deadline),
        w: common_vendor.t(common_vendor.unref(loginMessage).okrInformation.firstQuadrantVO.objective),
        x: common_vendor.f(common_vendor.unref(loginMessage).okrInformation.firstQuadrantVO.keyResults, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.content),
            b: item.probability,
            c: common_vendor.o(($event) => sliderChange($event, item.id), item.id),
            d: item.id
          };
        }),
        y: common_vendor.o(finishOkr),
        z: common_vendor.o(addKeyResult),
        A: common_vendor.o(($event) => backCurrent(2)),
        B: common_vendor.sr(cardshow2, "794a7ae7-1", {
          "k": "cardshow2"
        }),
        C: common_vendor.p({
          type: "center"
        }),
        D: objective.value,
        E: common_vendor.o(($event) => objective.value = $event.detail.value),
        F: common_vendor.p({
          title: "截止时间：" + datetimesingle.value,
          type: "line"
        }),
        G: common_vendor.o(_ctx.changeLog),
        H: common_vendor.o(($event) => datetimesingle.value = $event),
        I: common_vendor.p({
          type: "datetime",
          modelValue: datetimesingle.value
        }),
        J: common_vendor.o(setFirstQuadrant),
        K: common_vendor.o(($event) => backCurrent(5)),
        L: common_vendor.sr(cardshow5, "794a7ae7-2", {
          "k": "cardshow5"
        }),
        M: common_vendor.p({
          type: "center"
        }),
        N: keyResult.value,
        O: common_vendor.o(($event) => keyResult.value = $event.detail.value),
        P: krConfidence.value,
        Q: common_vendor.o(addSliderChange),
        R: common_vendor.o(comfirmAddKeyResult),
        S: common_vendor.o(($event) => backCurrent(9)),
        T: common_vendor.sr(cardshow9, "794a7ae7-5", {
          "k": "cardshow9"
        }),
        U: common_vendor.p({
          type: "center"
        }),
        V: completion.value,
        W: common_vendor.o(finishSliderChange),
        X: summarize.value,
        Y: common_vendor.o(($event) => summarize.value = $event.detail.value),
        Z: common_vendor.o(comfirmFinishOkr),
        aa: common_vendor.o(($event) => backCurrent(10)),
        ab: common_vendor.sr(cardshow10, "794a7ae7-6", {
          "k": "cardshow10"
        }),
        ac: common_vendor.p({
          type: "center"
        }),
        ad: common_vendor.t(common_vendor.unref(loginMessage).okrInformation.secondQuadrantVO.deadline),
        ae: common_vendor.f(common_vendor.unref(loginMessage).okrInformation.secondQuadrantVO.priorityNumberOnes, (item, k0, i0) => {
          return {
            a: item.isCompleted,
            b: common_vendor.o(($event) => planCompleted(1, item.id, item.content, item.isCompleted), item.id),
            c: common_vendor.t(item.content),
            d: common_vendor.o(($event) => planDelete(1, item.id), item.id),
            e: item.id
          };
        }),
        af: common_vendor.f(common_vendor.unref(loginMessage).okrInformation.secondQuadrantVO.priorityNumberTwos, (item, k0, i0) => {
          return {
            a: item.isCompleted,
            b: common_vendor.o(($event) => planCompleted(2, item.id, item.content, item.isCompleted), item.id),
            c: common_vendor.t(item.content),
            d: common_vendor.o(($event) => planDelete(2, item.id), item.id),
            e: item.id
          };
        }),
        ag: common_vendor.o(addShortPlan),
        ah: common_vendor.o(($event) => backCurrent(1)),
        ai: common_vendor.sr(cardshow1, "794a7ae7-7", {
          "k": "cardshow1"
        }),
        aj: common_vendor.p({
          type: "center"
        }),
        ak: common_vendor.p({
          title: "截止时间：" + shortDeadline.value,
          type: "line"
        }),
        al: common_vendor.o(_ctx.changeLog),
        am: common_vendor.o(($event) => shortDeadline.value = $event),
        an: common_vendor.p({
          type: "datetime",
          modelValue: shortDeadline.value
        }),
        ao: shortPeriod.value,
        ap: common_vendor.o(($event) => shortPeriod.value = $event.detail.value),
        aq: common_vendor.o(setShortDeadline),
        ar: common_vendor.o(($event) => backCurrent(6)),
        as: common_vendor.sr(cardshow6, "794a7ae7-8", {
          "k": "cardshow6"
        }),
        at: common_vendor.p({
          type: "center"
        }),
        av: common_vendor.t(common_vendor.unref(loginMessage).okrInformation.thirdQuadrantVO.deadline),
        aw: common_vendor.f(common_vendor.unref(loginMessage).okrInformation.thirdQuadrantVO.actions, (item, k0, i0) => {
          return {
            a: item.isCompleted,
            b: common_vendor.o(($event) => planCompleted(0, item.id, item.content, item.isCompleted), item.id),
            c: common_vendor.t(item.content),
            d: common_vendor.o(($event) => planDelete(0, item.id), item.id),
            e: item.id
          };
        }),
        ax: common_vendor.o(addLongPlan),
        ay: common_vendor.o(($event) => backCurrent(3)),
        az: common_vendor.sr(cardshow3, "794a7ae7-11", {
          "k": "cardshow3"
        }),
        aA: common_vendor.p({
          type: "center"
        }),
        aB: common_vendor.p({
          title: "截止时间：" + longDeadline.value,
          type: "line"
        }),
        aC: common_vendor.o(_ctx.changeLog),
        aD: common_vendor.o(($event) => longDeadline.value = $event),
        aE: common_vendor.p({
          type: "datetime",
          modelValue: longDeadline.value
        }),
        aF: longPeriod.value,
        aG: common_vendor.o(($event) => longPeriod.value = $event.detail.value),
        aH: common_vendor.o(setLongDeadline),
        aI: common_vendor.o(($event) => backCurrent(7)),
        aJ: common_vendor.sr(cardshow7, "794a7ae7-12", {
          "k": "cardshow7"
        }),
        aK: common_vendor.p({
          type: "center"
        }),
        aL: common_vendor.f(common_vendor.unref(loginMessage).okrInformation.fourthQuadrantVO.statusFlags, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.label),
            b: item.color === "#000000" ? 1 : "",
            c: common_vendor.o(($event) => updateColor(item.label, item.id, 0), item.id),
            d: item.color === "#000001" ? 1 : "",
            e: common_vendor.o(($event) => updateColor(item.label, item.id, 1), item.id),
            f: item.color === "#000002" ? 1 : "",
            g: common_vendor.o(($event) => updateColor(item.label, item.id, 2), item.id),
            h: common_vendor.o(($event) => deleteState(item.id), item.id),
            i: item.id
          };
        }),
        aM: common_vendor.o(addStatus),
        aN: common_vendor.o(($event) => backCurrent(4)),
        aO: common_vendor.sr(cardshow4, "794a7ae7-15", {
          "k": "cardshow4"
        }),
        aP: common_vendor.p({
          type: "center"
        }),
        aQ: statusLabel.value,
        aR: common_vendor.o(($event) => statusLabel.value = $event.detail.value),
        aS: statusArr.value[0] ? 1 : "",
        aT: common_vendor.o(($event) => changeColor(0)),
        aU: statusArr.value[1] ? 1 : "",
        aV: common_vendor.o(($event) => changeColor(1)),
        aW: statusArr.value[2] ? 1 : "",
        aX: common_vendor.o(($event) => changeColor(2)),
        aY: common_vendor.o(confirmAddStatus),
        aZ: common_vendor.o(($event) => backCurrent(8)),
        ba: common_vendor.sr(cardshow8, "794a7ae7-16", {
          "k": "cardshow8"
        }),
        bb: common_vendor.p({
          type: "center"
        })
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-794a7ae7"], ["__file", "E:/vueCode/code1/okr-miniprogram/src/components/readWriteOkr.vue"]]);
wx.createComponent(Component);
