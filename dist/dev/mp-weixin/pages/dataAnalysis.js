"use strict";
const common_vendor = require("../common/vendor.js");
const store_Login = require("../store/Login.js");
if (!Math) {
  LEchart();
}
const LEchart = () => "../components/l-echart/l-echart.js";
const _sfc_main = {
  __name: "dataAnalysis",
  setup(__props) {
    const loginMessage = store_Login.useCounterStore();
    const echarts = require("../static/echarts.min");
    const dayRecord = common_vendor.ref();
    const credit1 = common_vendor.ref([]);
    const credit2 = common_vendor.ref([]);
    const credit3 = common_vendor.ref([]);
    const credit4 = common_vendor.ref([]);
    const recordDate = common_vendor.ref([]);
    common_vendor.index.request({
      url: "http://47.92.173.60:1701/corerecord/search/dayrecord",
      method: "POST",
      header: {
        "Login-Type": "r6Vsr0",
        Token: loginMessage.token
      },
      data: {
        coreId: loginMessage.OkrcoreId,
        scene: loginMessage.scene
      },
      success(res) {
        if (res.data.code === 2001) {
          common_vendor.index.redirectTo({
            url: "/pages/loginPage"
          });
        }
        dayRecord.value = res.data.data;
        for (let i = 0; i < dayRecord.value.length; i++) {
          const [year, month, day] = dayRecord.value[i].recordDate.split(" ")[0].split("-");
          recordDate.value[i] = `${month}-${day}`;
          credit1.value[i] = dayRecord.value[i].credit1;
          credit2.value[i] = dayRecord.value[i].credit2;
          credit3.value[i] = dayRecord.value[i].credit3;
          credit4.value[i] = dayRecord.value[i].credit4;
        }
      }
    });
    let chart1 = common_vendor.ref();
    const state1 = common_vendor.reactive({
      option: {}
    });
    state1.option = {
      backgroundColor: "#fff",
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow"
        }
      },
      legend: {
        data: ["状态指标得分", "信心指数平均值"],
        textStyle: {
          color: "#ccc"
        }
      },
      xAxis: {
        data: 1,
        //recordDate
        axisLine: {
          lineStyle: {
            color: "#ccc"
          }
        }
      },
      yAxis: {
        splitLine: { show: false },
        axisLine: {
          lineStyle: {
            color: "#ccc"
          }
        }
      },
      series: [
        {
          name: "状态指标得分",
          type: "line",
          smooth: true,
          showAllSymbol: true,
          symbol: "emptyCircle",
          symbolSize: 7,
          data: credit4
        },
        {
          name: "信心指数平均值",
          type: "bar",
          barWidth: 8,
          itemStyle: {
            borderRadius: 5,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#9cecfb" },
              { offset: 1, color: "#448ef6" }
            ])
          },
          data: credit1
        }
      ]
    };
    let chart2 = common_vendor.ref();
    const state2 = common_vendor.reactive({
      option: {}
    });
    const app = common_vendor.ref();
    const posList = [
      "left",
      "right",
      "top",
      "bottom",
      "inside",
      "insideTop",
      "insideLeft",
      "insideRight",
      "insideBottom",
      "insideTopLeft",
      "insideTopRight",
      "insideBottomLeft",
      "insideBottomRight"
    ];
    app.configParameters = {
      rotate: {
        min: -90,
        max: 90
      },
      align: {
        options: {
          left: "left",
          center: "center",
          right: "right"
        }
      },
      verticalAlign: {
        options: {
          top: "top",
          middle: "middle",
          bottom: "bottom"
        }
      },
      position: {
        options: posList.reduce(function(map, pos) {
          map[pos] = pos;
          return map;
        }, {})
      },
      distance: {
        min: 0,
        max: 100
      }
    };
    app.config = {
      rotate: 90,
      align: "left",
      verticalAlign: "middle",
      position: "insideBottom",
      distance: 15,
      onChange: function() {
        const labelOption2 = {
          rotate: app.config.rotate,
          align: app.config.align,
          verticalAlign: app.config.verticalAlign,
          position: app.config.position,
          distance: app.config.distance
        };
        myChart.setOption({
          series: [
            {
              label: labelOption2
            },
            {
              label: labelOption2
            },
            {
              label: labelOption2
            },
            {
              label: labelOption2
            }
          ]
        });
      }
    };
    const labelOption = {
      show: false,
      position: app.config.position,
      distance: app.config.distance,
      align: app.config.align,
      verticalAlign: app.config.verticalAlign,
      rotate: app.config.rotate,
      formatter: "{c}",
      fontSize: 16,
      rich: {
        name: {}
      }
    };
    state2.option = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow"
        }
      },
      legend: {
        data: ["短期计划", "中长期计划"]
      },
      toolbox: {
        show: true,
        orient: "vertical",
        left: "right",
        top: "center",
        feature: {
          mark: { show: true },
          dataView: { show: false, readOnly: false },
          magicType: { show: true, type: ["line", "bar", "stack"] },
          restore: { show: true },
          saveAsImage: { show: false }
        }
      },
      xAxis: [
        {
          type: "category",
          axisTick: { show: false },
          data: recordDate
        }
      ],
      yAxis: [
        {
          type: "value"
        }
      ],
      series: [
        {
          name: "短期计划",
          type: "bar",
          barGap: 0,
          label: labelOption,
          emphasis: {
            focus: "series"
          },
          data: credit2
        },
        {
          name: "中长期计划",
          type: "bar",
          label: labelOption,
          emphasis: {
            focus: "series"
          },
          data: credit3
        }
      ]
    };
    common_vendor.onMounted(() => {
      chart1.value.init(echarts, (chart) => {
        chart.setOption(state1.option);
      });
      chart2.value.init(echarts, (chart) => {
        chart.setOption(state2.option);
      });
    });
    const init = () => {
      console.log("渲染完成");
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.sr(chart1, "ae5d4bd0-0", {
          "k": "chart1"
        }),
        b: common_vendor.o(init),
        c: common_vendor.sr(chart2, "ae5d4bd0-1", {
          "k": "chart2"
        }),
        d: common_vendor.o(init)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-ae5d4bd0"], ["__file", "E:/vueCode/code1/okr-miniprogram/src/pages/dataAnalysis.vue"]]);
wx.createPage(MiniProgramPage);
