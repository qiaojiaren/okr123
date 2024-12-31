<script setup>
import { useCounterStore } from "@/store/Login";
const loginMessage = useCounterStore();

import LEchart from "@/components/l-echart/l-echart.vue";
// lime-echart是一个demo的组件，用于测试组件
// import LEchart from '@/components/lime-echart/lime-echart.vue'
import { onMounted, reactive, ref } from "vue";
// nvue 不需要引入
// #ifdef VUE3
// #ifdef MP
// 由于vue3 使用vite 不支持umd格式的包，小程序依然可以使用，但需要使用require
const echarts = require("../static/echarts.min");
// #endif
// #ifndef MP
// 由于 vue3 使用vite 不支持umd格式的包，故引入npm的包
import * as echarts from "echarts";
// #endif
// #endif

//获取日记录
const dayRecord = ref();
const credit1 = ref([]);
const credit2 = ref([]);
const credit3 = ref([]);
const credit4 = ref([]);
const recordDate = ref([]);
uni.request({
  url: "http://47.92.173.60:1701/corerecord/search/dayrecord",
  method: "POST",
  header: {
    "Login-Type": "r6Vsr0",
    Token: loginMessage.token,
  },
  data: {
    coreId: loginMessage.OkrcoreId,
    scene: loginMessage.scene,
  },
  success(res) {
    if (res.data.code === 2001) {
      uni.redirectTo({
        url: "/pages/loginPage",
      });
    }
    dayRecord.value = res.data.data;

    // 一、四象限取近20天
    for(let i = 0; i < dayRecord.value.length;i++){
      const [year, month, day] = dayRecord.value[i].recordDate.split(' ')[0].split('-')
      recordDate.value[i] = `${month}-${day}`
      credit1.value[i] = dayRecord.value[i].credit1
      credit2.value[i] = dayRecord.value[i].credit2
      credit3.value[i] = dayRecord.value[i].credit3
      credit4.value[i] = dayRecord.value[i].credit4
    }

    // for (let i = 0; i < dayRecord.value.length; i++) {
    //   const record = dayRecord.value[i];

    //   // 检查 recordDate 是否存在
    //   if (record.recordDate) {
    //     const [year, month, day] = record.recordDate.split(" ")[0].split("-");
    //     recordDate.value[i] = `${month}-${day}`;
    //     credit1.value[i] = record.credit1;
    //     credit2.value[i] = record.credit2;
    //     credit3.value[i] = record.credit3;
    //     credit4.value[i] = record.credit4;
    //   } else {
    //     console.warn(`recordDate is undefined for record at index ${i}`);
    //     // 可以选择为这些数组填充默认值，或者继续跳过
    //   }
    // }
  },
});

let chart1 = ref(); // 获取dom
const state1 = reactive({
  option: {},
});

state1.option = {
  backgroundColor: "#fff",
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
  },
  legend: {
    data: ["状态指标得分", "信心指数平均值"],
    textStyle: {
      color: "#ccc",
    },
  },
  xAxis: {
    data: 1,//recordDate
    axisLine: {
      lineStyle: {
        color: "#ccc",
      },
    },
  },
  yAxis: {
    splitLine: { show: false },
    axisLine: {
      lineStyle: {
        color: "#ccc",
      },
    },
  },
  series: [
    {
      name: "状态指标得分",
      type: "line",
      smooth: true,
      showAllSymbol: true,
      symbol: "emptyCircle",
      symbolSize: 7,
      data: credit4,
    },
    {
      name: "信心指数平均值",
      type: "bar",
      barWidth: 8,
      itemStyle: {
        borderRadius: 5,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: "#9cecfb" },
          { offset: 1, color: "#448ef6" },
        ]),
      },
      data: credit1,
    },
  ],
};

let chart2 = ref(); // 获取dom
const state2 = reactive({
  option: {},
});
const app = ref();
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
  "insideBottomRight",
];

app.configParameters = {
  rotate: {
    min: -90,
    max: 90,
  },
  align: {
    options: {
      left: "left",
      center: "center",
      right: "right",
    },
  },
  verticalAlign: {
    options: {
      top: "top",
      middle: "middle",
      bottom: "bottom",
    },
  },
  position: {
    options: posList.reduce(function (map, pos) {
      map[pos] = pos;
      return map;
    }, {}),
  },
  distance: {
    min: 0,
    max: 100,
  },
};

app.config = {
  rotate: 90,
  align: "left",
  verticalAlign: "middle",
  position: "insideBottom",
  distance: 15,
  onChange: function () {
    const labelOption = {
      rotate: app.config.rotate,
      align: app.config.align,
      verticalAlign: app.config.verticalAlign,
      position: app.config.position,
      distance: app.config.distance,
    };
    myChart.setOption({
      series: [
        {
          label: labelOption,
        },
        {
          label: labelOption,
        },
        {
          label: labelOption,
        },
        {
          label: labelOption,
        },
      ],
    });
  },
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
    name: {},
  },
};

state2.option = {
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
  },
  legend: {
    data: ["短期计划", "中长期计划"],
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
      saveAsImage: { show: false },
    },
  },
  xAxis: [
    {
      type: "category",
      axisTick: { show: false },
      data: recordDate,
    },
  ],
  yAxis: [
    {
      type: "value",
    },
  ],
  series: [
    {
      name: "短期计划",
      type: "bar",
      barGap: 0,
      label: labelOption,
      emphasis: {
        focus: "series",
      },
      data: credit2,
    },
    {
      name: "中长期计划",
      type: "bar",
      label: labelOption,
      emphasis: {
        focus: "series",
      },
      data: credit3,
    },
  ],
};

// 组件能被调用必须是组件的节点已经被渲染到页面上
onMounted(() => {
  chart1.value.init(echarts, (chart) => {
    chart.setOption(state1.option);
  });

  chart2.value.init(echarts, (chart) => {
    chart.setOption(state2.option);
  });
});

// 渲染完成
const init = () => {
  console.log("渲染完成");
};
</script>

<template>
  <view>
    <view>
      <div class="marginTop"></div>
      <LEchart class="echart" ref="chart1" @finished="init"></LEchart>
      <LEchart class="echart" ref="chart2" @finished="init"></LEchart>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.echart {
  width: 100%;
  height: 300px;
}

.title {
  text-align: center;
}

.marginTop {
  width: 100vw;
  height: 10px;
}
</style>
