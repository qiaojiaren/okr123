"use strict";
const common_vendor = require("../common/vendor.js");
if (!Array) {
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  _easycom_uni_popup2();
}
const _easycom_uni_popup = () => "../node-modules/@dcloudio/uni-ui/lib/uni-popup/uni-popup.js";
if (!Math) {
  _easycom_uni_popup();
}
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
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => previewImage(2)),
        b: common_vendor.o(($event) => handleClose(1)),
        c: common_vendor.sr(teamIf, "33d8554a-0", {
          "k": "teamIf"
        }),
        d: common_vendor.p({
          type: "center",
          ["is-mask-click"]: false
        }),
        e: common_vendor.o(($event) => handleClose(2)),
        f: common_vendor.sr(whyIf, "33d8554a-1", {
          "k": "whyIf"
        }),
        g: common_vendor.p({
          type: "center",
          ["is-mask-click"]: false
        }),
        h: common_vendor.o(($event) => handleClose(3)),
        i: common_vendor.sr(howIf, "33d8554a-2", {
          "k": "howIf"
        }),
        j: common_vendor.p({
          type: "center",
          ["is-mask-click"]: false
        }),
        k: common_vendor.o(($event) => previewImage(1)),
        l: common_vendor.o(($event) => handleClose(4)),
        m: common_vendor.sr(errorsIf, "33d8554a-3", {
          "k": "errorsIf"
        }),
        n: common_vendor.p({
          type: "center",
          ["is-mask-click"]: false
        }),
        o: common_vendor.o(($event) => previewImage(3)),
        p: common_vendor.o(($event) => handleClose(5)),
        q: common_vendor.sr(personalIf, "33d8554a-4", {
          "k": "personalIf"
        }),
        r: common_vendor.p({
          type: "center",
          ["is-mask-click"]: false
        }),
        s: common_vendor.o(($event) => handleClose(6)),
        t: common_vendor.sr(whatIf, "33d8554a-5", {
          "k": "whatIf"
        }),
        v: common_vendor.p({
          type: "center",
          ["is-mask-click"]: false
        }),
        w: common_vendor.o(team),
        x: common_vendor.o(why),
        y: common_vendor.o(how),
        z: common_vendor.o(okrErrors),
        A: common_vendor.o(personalOkr),
        B: common_vendor.o(what),
        C: isAnimating.value ? 1 : "",
        D: isNoAnimation.value ? 1 : "",
        E: common_vendor.o(handleTouchStart),
        F: common_vendor.o(handleTouchMove),
        G: common_vendor.o(handleTouchEnd),
        H: `rotateX(${dx.value}deg) rotateY(${dy.value}deg`,
        I: squazeShow.value
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/vueCode/code1/okr-miniprogram/src/pages/okrIntroduce.vue"]]);
wx.createPage(MiniProgramPage);
