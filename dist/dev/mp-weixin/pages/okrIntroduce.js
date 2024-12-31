"use strict";
const common_vendor = require("../common/vendor.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_icons2 + _easycom_uni_popup2)();
}
const _easycom_uni_icons = () => "../node-modules/@dcloudio/uni-ui/lib/uni-icons/uni-icons.js";
const _easycom_uni_popup = () => "../node-modules/@dcloudio/uni-ui/lib/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_icons + Assistant + _easycom_uni_popup)();
}
const Assistant = () => "../components/assistant.js";
const _sfc_main = {
  __name: "okrIntroduce",
  setup(__props) {
    const previewImage = (flag) => {
      switch (flag) {
        case 1:
          common_vendor.index.previewImage({
            //urls为图片路径，是字符串数组
            urls: ["http://139.159.210.77:1701/media/static/OKR模板.png"]
          });
          break;
        case 2:
          common_vendor.index.previewImage({
            //urls为图片路径，是字符串数组
            urls: ["http://139.159.210.77:1701/media/static/OKR案例.png"]
          });
          break;
        case 3:
          common_vendor.index.previewImage({
            //urls为图片路径，是字符串数组
            urls: ["http://139.159.210.77:1701/media/static/树状图示例.png"]
          });
          break;
      }
    };
    const isAnimating = common_vendor.ref(false);
    const isNoAnimation = common_vendor.ref(false);
    const startX = common_vendor.ref(0);
    const startY = common_vendor.ref(0);
    const dx = common_vendor.ref(0);
    const dy = common_vendor.ref(0);
    let timeoutId = null;
    const handleTouchStart = (e) => {
      isAnimating.value = true;
      startX.value = e.touches[0].clientX;
      startY.value = e.touches[0].clientY;
    };
    const handleTouchMove = (e) => {
      isNoAnimation.value = true;
      const currentX = e.touches[0].clientX;
      const currentY = e.touches[0].clientY;
      dx.value = -(currentY - startY.value);
      dy.value = currentX - startX.value;
    };
    const handleTouchEnd = () => {
      isAnimating.value = false;
      if (isNoAnimation.value) {
        timeoutId = setTimeout(() => {
          isNoAnimation.value = false;
        }, 5e3);
      }
    };
    common_vendor.onBeforeUnmount(() => {
      clearTimeout(timeoutId);
    });
    const squazeShow = common_vendor.ref(true);
    const teamIf = common_vendor.ref();
    const whyIf = common_vendor.ref();
    const howIf = common_vendor.ref();
    const errorsIf = common_vendor.ref();
    const personalIf = common_vendor.ref();
    const whatIf = common_vendor.ref();
    const handleClose = (number) => {
      switch (number) {
        case 1:
          squazeShow.value = true;
          teamIf.value.close();
          break;
        case 2:
          squazeShow.value = true;
          whyIf.value.close();
          break;
        case 3:
          squazeShow.value = true;
          howIf.value.close();
          break;
        case 4:
          squazeShow.value = true;
          errorsIf.value.close();
          break;
        case 5:
          squazeShow.value = true;
          personalIf.value.close();
          break;
        case 6:
          squazeShow.value = true;
          whatIf.value.close();
          break;
      }
    };
    const team = () => {
      squazeShow.value = false;
      teamIf.value.open();
    };
    const why = () => {
      squazeShow.value = false;
      whyIf.value.open();
    };
    const how = () => {
      squazeShow.value = false;
      howIf.value.open();
    };
    const okrErrors = () => {
      squazeShow.value = false;
      errorsIf.value.open();
    };
    const personalOkr = () => {
      squazeShow.value = false;
      personalIf.value.open();
    };
    const what = () => {
      squazeShow.value = false;
      whatIf.value.open();
    };
    const showChat = common_vendor.ref(false);
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(($event) => showChat.value = true),
        b: showChat.value
      }, showChat.value ? {
        c: common_vendor.p({
          type: "plus-filled",
          size: "24"
        }),
        d: common_vendor.o(($event) => showChat.value = false)
      } : {}, {
        e: common_vendor.o(($event) => previewImage(2)),
        f: common_vendor.o(($event) => handleClose(1)),
        g: common_vendor.sr(teamIf, "33d8554a-2", {
          "k": "teamIf"
        }),
        h: common_vendor.p({
          type: "center",
          ["is-mask-click"]: false
        }),
        i: common_vendor.o(($event) => handleClose(2)),
        j: common_vendor.sr(whyIf, "33d8554a-3", {
          "k": "whyIf"
        }),
        k: common_vendor.p({
          type: "center",
          ["is-mask-click"]: false
        }),
        l: common_vendor.o(($event) => handleClose(3)),
        m: common_vendor.sr(howIf, "33d8554a-4", {
          "k": "howIf"
        }),
        n: common_vendor.p({
          type: "center",
          ["is-mask-click"]: false
        }),
        o: common_vendor.o(($event) => previewImage(1)),
        p: common_vendor.o(($event) => handleClose(4)),
        q: common_vendor.sr(errorsIf, "33d8554a-5", {
          "k": "errorsIf"
        }),
        r: common_vendor.p({
          type: "center",
          ["is-mask-click"]: false
        }),
        s: common_vendor.o(($event) => previewImage(3)),
        t: common_vendor.o(($event) => handleClose(5)),
        v: common_vendor.sr(personalIf, "33d8554a-6", {
          "k": "personalIf"
        }),
        w: common_vendor.p({
          type: "center",
          ["is-mask-click"]: false
        }),
        x: common_vendor.o(($event) => handleClose(6)),
        y: common_vendor.sr(whatIf, "33d8554a-7", {
          "k": "whatIf"
        }),
        z: common_vendor.p({
          type: "center",
          ["is-mask-click"]: false
        }),
        A: common_vendor.o(team),
        B: common_vendor.o(why),
        C: common_vendor.o(how),
        D: common_vendor.o(okrErrors),
        E: common_vendor.o(personalOkr),
        F: common_vendor.o(what),
        G: isAnimating.value ? 1 : "",
        H: isNoAnimation.value ? 1 : "",
        I: common_vendor.o(handleTouchStart),
        J: common_vendor.o(handleTouchMove),
        K: common_vendor.o(handleTouchEnd),
        L: `rotateX(${dx.value}deg) rotateY(${dy.value}deg`,
        M: squazeShow.value
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/vueCode/code1/okr-miniprogram/src/pages/okrIntroduce.vue"]]);
wx.createPage(MiniProgramPage);
