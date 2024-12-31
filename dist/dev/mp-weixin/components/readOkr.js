"use strict";
const common_vendor = require("../common/vendor.js");
const store_Login = require("../store/Login.js");
if (!Array) {
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _easycom_uni_fab2 = common_vendor.resolveComponent("uni-fab");
  (_easycom_uni_popup2 + _easycom_uni_fab2)();
}
const _easycom_uni_popup = () => "../node-modules/@dcloudio/uni-ui/lib/uni-popup/uni-popup.js";
const _easycom_uni_fab = () => "../node-modules/@dcloudio/uni-ui/lib/uni-fab/uni-fab.js";
if (!Math) {
  (_easycom_uni_popup + _easycom_uni_fab)();
}
const _sfc_main = {
  __name: "readOkr",
  setup(__props) {
    const loginMessage = store_Login.useCounterStore();
    const cardshow1 = common_vendor.ref();
    const cardshow2 = common_vendor.ref();
    const cardshow3 = common_vendor.ref();
    const cardshow4 = common_vendor.ref();
    const cardshow5 = common_vendor.ref();
    const showCard = (number) => {
      switch (number) {
        case 1:
          cardshow1.value.open();
          break;
        case 2:
          cardshow2.value.open();
          break;
        case 3:
          cardshow3.value.open();
          break;
        case 4:
          cardshow4.value.open();
          break;
      }
    };
    const backCurrent = (number) => {
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
          break;
      }
    };
    const pattern = common_vendor.ref({
      color: "black",
      backgroundColor: "#FFFFFF",
      selectedColor: "#3694f3",
      buttonColor: "#3694f3"
    });
    const content = common_vendor.ref([
      {
        iconPath: "http://47.92.173.60:1701/media/static/查看总结.png",
        text: "查看总结"
      }
    ]);
    const trigger = () => {
      cardshow5.value.open();
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(loginMessage).okrInformation.secondQuadrantVO.deadline
      }, common_vendor.unref(loginMessage).okrInformation.secondQuadrantVO.deadline ? {
        b: common_vendor.f(common_vendor.unref(loginMessage).okrInformation.secondQuadrantVO.priorityNumberOnes, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.content),
            b: item.id
          };
        }),
        c: common_vendor.f(common_vendor.unref(loginMessage).okrInformation.secondQuadrantVO.priorityNumberTwos, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.content),
            b: item.id
          };
        }),
        d: common_vendor.o(($event) => showCard(1))
      } : {
        e: common_vendor.o(($event) => showCard(1))
      }, {
        f: common_vendor.unref(loginMessage).okrInformation.firstQuadrantVO.objective
      }, common_vendor.unref(loginMessage).okrInformation.firstQuadrantVO.objective ? {
        g: common_vendor.t(common_vendor.unref(loginMessage).okrInformation.firstQuadrantVO.objective),
        h: common_vendor.f(common_vendor.unref(loginMessage).okrInformation.firstQuadrantVO.keyResults, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.content),
            b: common_vendor.t(item.probability),
            c: item.id
          };
        }),
        i: common_vendor.o(($event) => showCard(2))
      } : {
        j: common_vendor.o(($event) => showCard(2))
      }, {
        k: common_vendor.unref(loginMessage).okrInformation.thirdQuadrantVO.deadline
      }, common_vendor.unref(loginMessage).okrInformation.thirdQuadrantVO.deadline ? {
        l: common_vendor.f(common_vendor.unref(loginMessage).okrInformation.thirdQuadrantVO.actions, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.content),
            b: item.id
          };
        }),
        m: common_vendor.o(($event) => showCard(3))
      } : {
        n: common_vendor.o(($event) => showCard(3))
      }, {
        o: common_vendor.unref(loginMessage).okrInformation.fourthQuadrantVO.statusFlags.length
      }, common_vendor.unref(loginMessage).okrInformation.fourthQuadrantVO.statusFlags.length ? {
        p: common_vendor.f(common_vendor.unref(loginMessage).okrInformation.fourthQuadrantVO.statusFlags, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.label),
            b: item.color === "#000000" ? 1 : "",
            c: item.color === "#000001" ? 1 : "",
            d: item.color === "#000002" ? 1 : "",
            e: item.id
          };
        }),
        q: common_vendor.o(($event) => showCard(4))
      } : {
        r: common_vendor.o(($event) => showCard(4))
      }, {
        s: common_vendor.t(common_vendor.unref(loginMessage).okrInformation.firstQuadrantVO.deadline),
        t: common_vendor.t(common_vendor.unref(loginMessage).okrInformation.firstQuadrantVO.objective),
        v: common_vendor.f(common_vendor.unref(loginMessage).okrInformation.firstQuadrantVO.keyResults, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.content),
            b: item.probability,
            c: item.id
          };
        }),
        w: common_vendor.o(($event) => backCurrent(2)),
        x: common_vendor.sr(cardshow2, "3647123d-0", {
          "k": "cardshow2"
        }),
        y: common_vendor.p({
          type: "center"
        }),
        z: common_vendor.unref(loginMessage).okrInformation.degree,
        A: common_vendor.t(common_vendor.unref(loginMessage).okrInformation.summary),
        B: common_vendor.o(($event) => backCurrent(5)),
        C: common_vendor.sr(cardshow5, "3647123d-1", {
          "k": "cardshow5"
        }),
        D: common_vendor.p({
          type: "center"
        }),
        E: common_vendor.t(common_vendor.unref(loginMessage).okrInformation.secondQuadrantVO.deadline),
        F: common_vendor.f(common_vendor.unref(loginMessage).okrInformation.secondQuadrantVO.priorityNumberOnes, (item, k0, i0) => {
          return {
            a: item.isCompleted,
            b: common_vendor.t(item.content),
            c: common_vendor.o(($event) => _ctx.planDelete(1, item.id), item.id),
            d: item.id
          };
        }),
        G: common_vendor.f(common_vendor.unref(loginMessage).okrInformation.secondQuadrantVO.priorityNumberTwos, (item, k0, i0) => {
          return {
            a: item.isCompleted,
            b: common_vendor.t(item.content),
            c: item.id
          };
        }),
        H: common_vendor.o(($event) => backCurrent(1)),
        I: common_vendor.sr(cardshow1, "3647123d-2", {
          "k": "cardshow1"
        }),
        J: common_vendor.p({
          type: "center"
        }),
        K: common_vendor.t(common_vendor.unref(loginMessage).okrInformation.thirdQuadrantVO.deadline),
        L: common_vendor.f(common_vendor.unref(loginMessage).okrInformation.thirdQuadrantVO.actions, (item, k0, i0) => {
          return {
            a: item.isCompleted,
            b: common_vendor.t(item.content),
            c: item.id
          };
        }),
        M: common_vendor.o(($event) => backCurrent(3)),
        N: common_vendor.sr(cardshow3, "3647123d-3", {
          "k": "cardshow3"
        }),
        O: common_vendor.p({
          type: "center"
        }),
        P: common_vendor.f(common_vendor.unref(loginMessage).okrInformation.fourthQuadrantVO.statusFlags, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.label),
            b: item.color === "#000000" ? 1 : "",
            c: common_vendor.o(($event) => _ctx.updateColor(item.label, item.id, 0), item.id),
            d: item.color === "#000001" ? 1 : "",
            e: common_vendor.o(($event) => _ctx.updateColor(item.label, item.id, 1), item.id),
            f: item.color === "#000002" ? 1 : "",
            g: common_vendor.o(($event) => _ctx.updateColor(item.label, item.id, 2), item.id),
            h: item.id
          };
        }),
        Q: common_vendor.o(($event) => backCurrent(4)),
        R: common_vendor.sr(cardshow4, "3647123d-4", {
          "k": "cardshow4"
        }),
        S: common_vendor.p({
          type: "center"
        }),
        T: common_vendor.unref(loginMessage).okrInformation.isOver
      }, common_vendor.unref(loginMessage).okrInformation.isOver ? {
        U: common_vendor.o(trigger),
        V: common_vendor.p({
          horizontal: "left",
          vertical: "bottom",
          direction: "vertical",
          content: content.value,
          pattern: pattern.value,
          popMenu: true
        })
      } : {});
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-3647123d"], ["__file", "E:/vueCode/code1/okr-miniprogram/src/components/readOkr.vue"]]);
wx.createComponent(Component);
