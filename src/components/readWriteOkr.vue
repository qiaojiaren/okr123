<script setup>
import { ref } from 'vue';

//引入仓库
import { useCounterStore } from '@/store/Login'
const loginMessage = useCounterStore()

const cardshow2 = ref() //已创建的第一象限
const cardshow1 = ref() //已初始化第二象限
const cardshow3 = ref() //第三象限
const cardshow4 = ref() //第四象限
const cardshow5 = ref() //未创建的第一象限
const cardshow6 = ref() //未初始化的第二象限
const cardshow7 = ref() //未初始化的第三象限
const cardshow8 = ref() //添加状态指标的卡片
const cardshow9 = ref() //添加关键结果的卡片
const cardshow10 = ref() //总结OKR的卡片

const datetimesingle = ref('') //目标截止时间
const objective = ref('') //目标

//查看/编辑第一象限
const firstQuadrant = () => {
  if (loginMessage.okrInformation.firstQuadrantVO.objective) { //第一象限已初始化
    
    cardshow2.value.open()
  } else { //第一象限未初始化
    cardshow5.value.open()
  }
}


//滑动进度条更新信心指数
const sliderChange = (e, id) => {
  //更新信心指数
  uni.request({
    url: 'http://47.92.173.60:1701/keyresult/update',
    method: 'POST',
    header: {
      "Login-Type": "r6Vsr0",
      "Token": loginMessage.token,
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
        uni.redirectTo({
          url: '/pages/loginPage'
        });
      }
      loginMessage.getOkrInformation()
    }
  })
}

//初始化第一象限：设置目标
const setFirstQuadrant = async () => {
  if (datetimesingle.value.trim() === '' || objective.value.trim() === '') {
    uni.showModal({
      title: '请勿提交空数据！',
      editable: false,//是否显示输入框
      confirmText: '确认',
      showCancel: false
    });
    return
  }

  //设置目标
  uni.request({
    url: 'http://47.92.173.60:1701/firstquadrant/init',
    method: 'POST',
    header: {
      "Login-Type": "r6Vsr0",
      "Token": loginMessage.token,
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
        uni.redirectTo({
          url: '/pages/loginPage'
        });
      }
      if (res.data.code === 200) {
        cardshow5.value.close()
        datetimesingle.value = ''
        objective.value = ''
        uni.$showMsg('设置成功！')
        loginMessage.getOkrInformation()
      } else {
        uni.$showMsg(res.data.message)
      }
    }
  })
}

//点击添加关键结果按钮展示添加卡片
const addKeyResult = () => {
  cardshow2.value.close()
  cardshow9.value.open()
}

const keyResult = ref('')
const krConfidence = ref(50)

//滑动更改信心指数
const addSliderChange = e => {
  krConfidence.value = e.detail.value
}

//添加关键结果
const comfirmAddKeyResult = () => {
  if (keyResult.value.trim() === '') {
    uni.showModal({
      title: '请勿提交空数据！',
      editable: false,//是否显示输入框
      confirmText: '确认',
      showCancel: false
    });
    return
  }

  uni.request({
    url: 'http://47.92.173.60:1701/keyresult/add',
    method: 'POST',
    header: {
      "Login-Type": "r6Vsr0",
      "Token": loginMessage.token,
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
        uni.redirectTo({
          url: '/pages/loginPage'
        });
      }
      keyResult.value = ''
      krConfidence.value = 50
      cardshow2.value.open()
      cardshow9.value.close()
      keyResult.value = ''
      krConfidence.value = 50
      uni.$showMsg('添加成功！')
      loginMessage.getOkrInformation()
    }
  })
}

//查看/编辑第二象限
const secondQuadrant = () => {
  if (loginMessage.okrInformation.secondQuadrantVO.deadline) { //第二象限已初始化
    cardshow1.value.open()
  } else { //第二象限未初始化
    cardshow6.value.open()
  }
}

//查看/编辑第三象限
const thirdQuadrant = () => {
  if (loginMessage.okrInformation.thirdQuadrantVO.deadline) { //第三象限已初始化
    cardshow3.value.open()
  } else { //第三象限未初始化
    cardshow7.value.open()
  }
}

//设置短期计划截止时间和执行周期
const shortDeadline = ref('')
const shortPeriod = ref('')
const setShortDeadline = async () => {
  if (shortDeadline.value.trim() === '' || shortPeriod.value.trim() === '') {
    uni.showModal({
      title: '请勿提交空数据！',
      editable: false,//是否显示输入框
      confirmText: '确认',
      showCancel: false
    });
    return
  }

  if (!(+shortPeriod.value == shortPeriod.value)) {
    uni.showModal({
      title: '请输入符合要求的计划执行周期（例如：7）！',
      editable: false,//是否显示输入框
      confirmText: '确认',
      showCancel: false
    });
    return
  }

  uni.request({
    url: 'http://47.92.173.60:1701/secondquadrant/init',
    method: 'POST',
    header: {
      "Login-Type": "r6Vsr0",
      "Token": loginMessage.token,
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
        uni.redirectTo({
          url: '/pages/loginPage'
        });
      }
      if (res.data.code === 200) {
        cardshow6.value.close()
        shortDeadline.value = ''
        shortPeriod.value = ''
        uni.$showMsg('设置成功！')
        loginMessage.getOkrInformation()
      } else {
        uni.$showMsg(res.data.message)
      }
    }
  })
}

//设置中长期规划截止时间和执行周期
const longDeadline = ref('')
const longPeriod = ref('')
const setLongDeadline = async () => {
  if (longDeadline.value.trim() === '' || longPeriod.value.trim() === '') {
    uni.showModal({
      title: '请勿提交空数据！',
      editable: false,//是否显示输入框
      confirmText: '确认',
      showCancel: false
    });
    return
  }

  if (!(+longPeriod.value == longPeriod.value)) {
    uni.showModal({
      title: '请输入符合要求的计划执行周期（例如：30）！',
      editable: false,//是否显示输入框
      confirmText: '确认',
      showCancel: false
    });
    return
  }

  uni.request({
    url: 'http://47.92.173.60:1701/thirdquadrant/init',
    method: 'POST',
    header: {
      "Login-Type": "r6Vsr0",
      "Token": loginMessage.token,
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
        uni.redirectTo({
          url: '/pages/loginPage'
        });
      }
      if (res.data.code === 200) {
        cardshow7.value.close()
        longDeadline.value = ''
        longPeriod.value = ''
        uni.$showMsg('设置成功！')
        loginMessage.getOkrInformation()
      } else {
        uni.$showMsg(res.data.message)
      }
    }
  })
}

//添加任务函数封装
//quadrantNum代表第几象限
//option为任务类型
const addPlanFun = (quadrantNum, option) => {
  const quadrantId = ref(quadrantNum === 2 ? loginMessage.okrInformation.secondQuadrantVO.id : loginMessage.okrInformation.thirdQuadrantVO.id)
  uni.showModal({
    title: '请填写任务内容',
    content: '',
    editable: true,//是否显示输入框
    placeholderText: '任务内容',//输入框提示内容
    confirmText: '确认',
    cancelText: '取消',
    success: (res) => {
      if (res.confirm) {
        if (res.content.trim() === '') {
          uni.showModal({
            title: '请勿提交空数据！',
            editable: false,//是否显示输入框
            confirmText: '确认',
            showCancel: false
          });
          return
        }
        uni.request({
          url: `http://47.92.173.60:1701/task/${option}/add`,
          method: 'POST',
          header: {
            "Login-Type": "r6Vsr0",
            "Token": loginMessage.token,
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
              uni.redirectTo({
                url: '/pages/loginPage'
              });
            }
            if (res1.data.code === 200) {
              uni.$showMsg('添加成功！')
              loginMessage.getOkrInformation()
            } else {
              uni.$showMsg(res1.data.message)
            }
          }
        })
      }
    }
  });
}

//添加短期计划
const addShortPlan = () => {
  uni.showModal({
    title: '请选择待添加的任务类型',
    content: '',
    confirmText: 'Priority2',
    cancelText: 'Priority1',
    success: (res) => {
      if (res.confirm) { //选择Priority2
        addPlanFun(2, 2)
      } else { //选择Priority1
        addPlanFun(2, 1)
      }
    }
  });
}

//添加中长期规划
const addLongPlan = () => {
  addPlanFun(3, 0)
}

//修改计划完成情况
//taskNum为任务类型
const planCompleted = (taskNum, id, content, isCompleted) => {
  uni.request({
    url: `http://47.92.173.60:1701/task/${taskNum}/update`,
    method: 'POST',
    header: {
      "Login-Type": "r6Vsr0",
      "Token": loginMessage.token,
    },
    data: {
      "scene": loginMessage.scene,
      "taskUpdateDTO": {
        "content": content,
        "id": id,
        "isCompleted": !isCompleted
      }
    },
    success(res1) {
      if (res1.data.code === 2001) {
        uni.redirectTo({
          url: '/pages/loginPage'
        });
      }
      loginMessage.getOkrInformation()
    }
  })
}

//删除一个任务
const planDelete = (taskNum, id) => {
  uni.request({
    url: `http://47.92.173.60:1701/task/${taskNum}/remove`,
    method: 'POST',
    header: {
      "Login-Type": "r6Vsr0",
      "Token": loginMessage.token,
    },
    data: {
      "id": id,
      "scene": loginMessage.scene
    },
    success(res1) {
      if (res1.data.code === 2001) {
        uni.redirectTo({
          url: '/pages/loginPage'
        });
      }
      loginMessage.getOkrInformation()
    }
  })
}

//展示第四象限卡片详情
const showCard4 = () => {
  cardshow4.value.open()
}

//展示添加状态指标的卡片
const addStatus = () => {
  cardshow4.value.close()
  cardshow8.value.open()
}

//修改待添加的状态指标的颜色值
const statusArr = ref([true, false, false])
const changeColor = flag => {
  for (let i = 0; i < statusArr.value.length; i++) {
    statusArr.value[i] = false
  }
  statusArr.value[flag] = true
}

//添加状态指标
const statusLabel = ref('')
const confirmAddStatus = () => {
  if (statusLabel.value.trim() === '') {
    uni.showModal({
      title: '请勿提交空数据！',
      editable: false,//是否显示输入框
      confirmText: '确认',
      showCancel: false
    });
    return
  }
  const color = ref()
  for (let i = 0; i < statusArr.value.length; i++) {
    if (statusArr.value[i] === true) {
      color.value = i
      break
    }
  }
  uni.request({
    url: 'http://47.92.173.60:1701/flag/add',
    method: 'POST',
    header: {
      "Login-Type": "r6Vsr0",
      "Token": loginMessage.token,
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
        uni.redirectTo({
          url: '/pages/loginPage'
        });
      }
      if (res.data.code === 200) {
        cardshow8.value.close()
        statusLabel.value = ''
        cardshow4.value.open()
        uni.$showMsg('添加成功！')
        statusLabel.value = ''
        loginMessage.getOkrInformation()
      } else {
        uni.$showMsg(res.data.message)
      }

    }
  })
}

//修改状态指标颜色值
const updateColor = (label, id, color) => {
  uni.request({
    url: 'http://47.92.173.60:1701/flag/update',
    method: 'POST',
    header: {
      "Login-Type": "r6Vsr0",
      "Token": loginMessage.token,
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
        uni.redirectTo({
          url: '/pages/loginPage'
        });
      }
      if (res.data.code === 200) {
        loginMessage.getOkrInformation()
      } else {
        uni.$showMsg(res.data.message)
      }

    }
  })
}

//删除一条状态指标
const deleteState = id => {
  uni.request({
    url: 'http://47.92.173.60:1701/flag/remove',
    method: 'POST',
    header: {
      "Login-Type": "r6Vsr0",
      "Token": loginMessage.token,
    },
    data: {
      "id": id,
      "scene": loginMessage.scene
    },
    success(res) {
      if (res.data.code === 2001) {
        uni.redirectTo({
          url: '/pages/loginPage'
        });
      }
      if (res.data.code === 200) {
        loginMessage.getOkrInformation()
      } else {
        uni.$showMsg(res.data.message)
      }

    }
  })
}

//返回按钮，关闭卡片
const backCurrent = async (number) => {
  switch (number) {
    case 1:
      cardshow1.value.close()
      break
    case 2:
      cardshow2.value.close()
      break
    case 3:
      cardshow3.value.close()
      break
    case 4:
      cardshow4.value.close()
      break
    case 5:
      cardshow5.value.close()
      datetimesingle.value = ''
      objective.value = ''
      break
    case 6:
      cardshow6.value.close()
      shortDeadline.value = ''
      shortPeriod.value = ''
      break
    case 7:
      cardshow7.value.close()
      longDeadline.value = ''
      longPeriod.value = ''
      break
    case 8:
      cardshow8.value.close()
      statusLabel.value = ''
      cardshow4.value.open()
      break
    case 9:
      cardshow9.value.close()
      keyResult.value = ''
      krConfidence.value = 50
      cardshow2.value.open()
      break
    case 10:
      cardshow10.value.close()
      completion.value = 0
      summarize.value = ''
      cardshow2.value.open()
      break
  }
}

//展示总结OKR的卡片
const finishOkr = () => {
  uni.showModal({
    title: '确认结束OKR吗？',
    editable: false,//是否显示输入框
    confirmText: '确认',
    cancelText: '取消',
    success: (res) => {
      if (res.confirm) {
        cardshow10.value.open()
        cardshow2.value.close()
      }
    }
  });
}

//滑动更改OKR完成度
const finishSliderChange = e => {
  completion.value = e.detail.value
}

//总结OKR
const completion = ref(0)
const summarize = ref('')
const comfirmFinishOkr = async () => {
  if (summarize.value.trim() === '') {
    uni.showModal({
      title: '请勿提交空数据！',
      editable: false,//是否显示输入框
      confirmText: '确认',
      showCancel: false
    });
    return
  }

  await uni.request({
    url: 'http://47.92.173.60:1701/core/complete',
    method: 'POST',
    header: {
      "Login-Type": "r6Vsr0",
      "Token": loginMessage.token,
    },
    data: {
      "coreId": loginMessage.OkrcoreId,
      "scene": loginMessage.scene
    }
  }).then(res => {
    if (res.data.code === 2001) {
      uni.redirectTo({
        url: '/pages/loginPage'
      });
    }
  })

  uni.request({
    url: 'http://47.92.173.60:1701/core/summary',
    method: 'POST',
    header: {
      "Login-Type": "r6Vsr0",
      "Token": loginMessage.token,
    },
    data: {
      "coreId": loginMessage.OkrcoreId,
      "degree": completion.value,
      "scene": loginMessage.scene,
      "summary": summarize.value
    },
    success(res) {
      if (res.data.code === 2001) {
        uni.redirectTo({
          url: '/pages/loginPage'
        });
      }
      if (res.data.code === 200) {
        cardshow10.value.close()
        completion.value = 0
        summarize.value = ''
        // 跳转到当前页面，实现刷新效果
        if (loginMessage.scene === 'scene-t') {
          uni.switchTab({
            url: 'okrTeam'
          });
          uni.$showMsg('已完成总结！')
        } else {
          uni.reLaunch({
            url: 'okrPerson'
          });
          uni.$showMsg('已完成总结！')
        }
      } else {
        uni.$showMsg(res.data.message)
      }
    }
  })
}

const pattern = ref({
  color: 'black',
  backgroundColor: '#FFFFFF',
  selectedColor: '#3694f3',
  buttonColor: '#3694f3'
})

const content = ref([
  {
    iconPath: 'http://47.92.173.60:1701/media/static/数据分析.png',
    text: '数据分析',
  }
])

// 悬浮按钮功能
const trigger = e => {
  if (e.index === 0) {
    uni.navigateTo({
      url: '/pages/dataAnalysis',
    })
  }
}
</script>

<template>
  <!-- 创建OKR显示页面 -->
  <div>
    <img src="http://47.92.173.60:1701/media/static/右箭头.png" alt="" class="rightArrow">
    <img src="http://47.92.173.60:1701/media/static/上箭头.png" alt="" class="topArrow">
    <img src="http://47.92.173.60:1701/media/static/靶子.png" alt="" class="target">

    <!-- 悬浮按钮 -->
    <uni-fab horizontal="left" vertical="bottom" direction="vertical" :content="content" :pattern="pattern"
      :popMenu="true" @trigger="trigger" />

    <div class="flexBox1">

      <!-- 第二象限已初始化小卡 -->
      <div class="leftTop2" v-if="loginMessage.okrInformation.secondQuadrantVO.deadline">
        <div class="container1">
          <p class="text">
            短期计划
          </p>

          <p class="text">
            Priority1：
          </p>
          <p class="text" v-for="item in loginMessage.okrInformation.secondQuadrantVO.priorityNumberOnes"
            :key="item.id">
            &nbsp;-&nbsp;{{ item.content }}
          </p>

          <p class="text">
            Priority2：
          </p>
          <p class="text" v-for="item in loginMessage.okrInformation.secondQuadrantVO.priorityNumberTwos"
            :key="item.id">
            &nbsp;-&nbsp;{{ item.content }}
          </p>
        </div>
        <div class="editButton yellow" @click="secondQuadrant">查看/编辑</div>
      </div>

      <!-- 第二象限未初始化小卡 -->
      <div class="leftTop2" v-else>
        <div class="container1">
          <p class="text">
            短期计划
          </p>

          <p class="text">
            Priority1：优先级最高，必须要做的事情
          </p>

          <p class="text">
            Priority2：优先级次之，如果时间紧迫，宁愿不完成Priority2的任务，也要保证Priority1的任务完成
          </p>
        </div>
        <div class="editButton yellow" @click="secondQuadrant">查看/编辑</div>
      </div>

      <!-- 第一象限已初始化小卡 -->
      <div class="rightTop1" v-if="loginMessage.okrInformation.firstQuadrantVO.objective">
        <div class="container1">
          <p class="text">
            目标：{{ loginMessage.okrInformation.firstQuadrantVO.objective }}
          </p>

          <p class="text">
            关键结果
          </p>
          <p class="text" v-for="item in loginMessage.okrInformation.firstQuadrantVO.keyResults" :key="item.id">
            {{ item.content }}（{{ item.probability }}%）
          </p>
        </div>
        <div class="editButton blue" @click="firstQuadrant">查看/编辑</div>
      </div>

      <!-- 第一象限未初始化小卡 -->
      <div class="rightTop1" v-else>
        <div class="container1">
          <p class="title">
            目标
          </p>

          <p class="text">
            关键结果1（信心指数）
          </p>

          <p class="text">
            关键结果2（信心指数）
          </p>

          <p class="text">
            关键结果3（信心指数）
          </p>
        </div>
        <div class="editButton blue" @click="firstQuadrant">查看/编辑</div>
      </div>

    </div>


    <div class="flexBox2">

      <!-- 第三象限已初始化小卡 -->
      <div class="leftBotton3" v-if="loginMessage.okrInformation.thirdQuadrantVO.deadline">
        <div class="container1">
          <p class="text">
            中长期规划
          </p>
          <p class="text" v-for="item in loginMessage.okrInformation.thirdQuadrantVO.actions" :key="item.id">
            {{ item.content }}
          </p>
        </div>
        <div class="editButton green" @click="thirdQuadrant">查看/编辑</div>
      </div>

      <!-- 第三象限未初始化小卡 -->
      <div class="leftBotton3" v-else>
        <div class="container1">
          <p class="text">
            中长期规划
          </p>
          <p class="text">
            在比短期计划的更长的执行周期中，为完成目标需要推进的事情，建议执行周期为四周。
          </p>
        </div>
        <div class="editButton green" @click="thirdQuadrant">查看/编辑</div>
      </div>

      <!-- 第四象限已初始化小卡 -->
      <div class="rightBotton4" v-if="loginMessage.okrInformation.fourthQuadrantVO.statusFlags.length">
        <div class="container1">
          <p class="text">
            状态指标
          </p>

          <div class="container" v-for="item in loginMessage.okrInformation.fourthQuadrantVO.statusFlags"
            :key="item.id">
            <p class="stateText">
              {{ item.label }}
            </p>
            <div class="circle"
              :class="{ circle1: item.color === '#000000', circle2: item.color === '#000001', circle3: item.color === '#000002' }">
            </div>
          </div>

        </div>
        <div class="editButton red" @click="showCard4">查看/编辑</div>
      </div>

      <!-- 第四象限未初始化小卡 -->
      <div class="rightBotton4" v-else>
        <div class="container1">
          <p class="text">
            状态指标
          </p>
          <p class="text">
            列出各种会影响目标完成的状态因素，比如客户关系、团队状态、系统状况等。
          </p>
          <p class="text">
            用三种颜色来标记各个因素的状态指标：绿色代表很好或正常，黄色代表有点不好，红色代表很不好。
          </p>
        </div>
        <div class="editButton red" @click="showCard4">查看/编辑</div>
      </div>

    </div>
  </div>

  <!-- 卡片编辑页面 -->

  <!-- 已创建的第一象限：目标与关键结果 -->
  <uni-popup ref="cardshow2" type="center">
    <div class="card2 blue color2">
      <div class="cardContainer">
        <h2 class="cardFont fontTitle">目标(截止时间：{{ loginMessage.okrInformation.firstQuadrantVO.deadline }})</h2>
        <p class="cardFont">
          {{ loginMessage.okrInformation.firstQuadrantVO.objective }}
        </p>

        <div v-for="item in loginMessage.okrInformation.firstQuadrantVO.keyResults" :key="item.id">
          <h2 class="cardFont fontTitle">关键结果：</h2>
          <p class="cardFont">
            {{ item.content }}
          </p>
          <h2 class="cardFont fontTitle">信心指数：</h2>
          <view>
            <slider :value=item.probability @change="sliderChange($event, item.id)" activeColor="rgb(41, 168, 211)"
              backgroundColor="#fff" block-color="rgb(41, 168, 211)" block-size="20" show-value />
          </view>
        </div>

      </div>
      <div class="buttonCotainer">
        <div class="firstQButton middleButton blue" @click="finishOkr">结束OKR</div>
        <div class="firstQButton longButton blue" @click="addKeyResult">添加关键结果</div>
        <div class="firstQButton shortButton blue" @click="backCurrent(2)">返回</div>
      </div>
    </div>
  </uni-popup>

  <!-- 未创建的第一象限：目标与关键结果 -->
  <uni-popup ref="cardshow5" type="center">
    <div class="card2 blue color2">
      <div class="cardContainer">
        <h2 class="cardFont fontTitle">设置目标</h2>
        <textarea v-model="objective" class="inputBox"></textarea>

        <h2 class="cardFont fontTitle">设置目标截止时间</h2>
        <uni-section :title="'截止时间：' + datetimesingle" type="line"></uni-section>
        <view class="example-body">
          <uni-datetime-picker type="datetime" v-model="datetimesingle" @change="changeLog" />
        </view>

      </div>
      <div class="addButton blue" @click="setFirstQuadrant">确认</div>
      <div class="backButton blue" @click="backCurrent(5)">返回</div>
    </div>
  </uni-popup>

  <!-- 添加关键结果的卡片 -->
  <uni-popup ref="cardshow9" type="center">
    <div class="card2 blue color2">
      <div class="cardContainer">
        <h2 class="cardFont fontTitle">设置关键结果</h2>
        <textarea v-model="keyResult" class="inputBox"></textarea>

        <h2 class="cardFont fontTitle">设置信心指数</h2>
        <view>
          <slider :value=krConfidence @change="addSliderChange" activeColor="rgb(41, 168, 211)" backgroundColor="#fff"
            block-color="rgb(41, 168, 211)" block-size="20" show-value />
        </view>

      </div>
      <div class="addButton blue" @click="comfirmAddKeyResult">确认</div>
      <div class="backButton blue" @click="backCurrent(9)">返回</div>
    </div>
  </uni-popup>

  <!-- 总结OKR的卡片 -->
  <uni-popup ref="cardshow10" type="center">
    <div class="card2 blue color2">
      <div class="cardContainer">
        <h2 class="cardFont fontTitle">目标完成度</h2>
        <view>
          <slider :value=completion @change="finishSliderChange" activeColor="rgb(41, 168, 211)" backgroundColor="#fff"
            block-color="rgb(41, 168, 211)" block-size="20" show-value />
        </view>
        <h2 class="cardFont fontTitle">OKR总结</h2>
        <textarea v-model="summarize" class="summaryInput"></textarea>

      </div>
      <div class="addButton blue" @click="comfirmFinishOkr">确认</div>
      <div class="backButton blue" @click="backCurrent(10)">返回</div>
    </div>
  </uni-popup>


  <!-- 已初始化的第二象限：短期计划 -->
  <uni-popup ref="cardshow1" type="center">
    <div class="card1 yellow color1">
      <div class="cardContainer">
        <h2 class="cardFont fontTitle">短期计划</h2>
        <h2 class="cardFont fontTitle">截止时间：{{ loginMessage.okrInformation.secondQuadrantVO.deadline }}</h2>
        <h2 class="cardFont fontTitle">Priority1：</h2>
        <div class="planYellowContent" v-for="item in loginMessage.okrInformation.secondQuadrantVO.priorityNumberOnes"
          :key="item.id">
          <label class="radio">
            <checkbox value="r2" color="rgb(242, 177, 73)" :checked=item.isCompleted
              @click="planCompleted(1, item.id, item.content, item.isCompleted)" />
            {{ item.content }}
          </label>
          <img class="deleteState" src="http://47.92.173.60:1701/media/static/黄色叉叉.png" alt=""
            @click="planDelete(1, item.id)">
        </div>

        <h2 class="cardFont fontTitle">Priority2：</h2>
        <div class="planYellowContent" v-for="item in loginMessage.okrInformation.secondQuadrantVO.priorityNumberTwos"
          :key="item.id">
          <label class="radio">
            <checkbox value="r2" color="rgb(242, 177, 73)" :checked=item.isCompleted
              @click="planCompleted(2, item.id, item.content, item.isCompleted)" />
            {{ item.content }}
          </label>
          <img class="deleteState" src="http://47.92.173.60:1701/media/static/黄色叉叉.png" alt=""
            @click="planDelete(2, item.id)">
        </div>
      </div>
      <div class="addButton yellow" @click="addShortPlan">添加</div>
      <div class="backButton yellow" @click="backCurrent(1)">返回</div>
    </div>
  </uni-popup>

  <!-- 未初始化的第二象限 -->
  <uni-popup ref="cardshow6" type="center">
    <div class="card5 yellow color1">
      <div class="cardContainer">
        <p class="cardFont">
          目标的执行分为若干个短期计划执行周期，请根据个人需求设置执行周期的时间长度，如日计划、周计划
        </p>
        <h2 class="cardFont fontTitle">设置第一个执行周期的截止时间</h2>
        <uni-section :title="'截止时间：' + shortDeadline" type="line"></uni-section>
        <view class="example-body">
          <uni-datetime-picker type="datetime" v-model="shortDeadline" @change="changeLog" />
        </view>

        <h2 class="cardFont fontTitle">设置其余执行周期的执行时间</h2>
        <p class="cardFont">
          请在白色文本框中输入执行周期的天数，例如：7。除第一个执行周期的截止时间外，其余周期的截止时间将按照您输入的执行周期天数自动计算
        </p>
        <textarea v-model="shortPeriod" class="inputBox2"></textarea>
      </div>
      <div class="addButton yellow" @click="setShortDeadline">确认</div>
      <div class="backButton yellow" @click="backCurrent(6)">返回</div>
    </div>
  </uni-popup>


  <!-- 已初始化第三象限：中长期规划 -->
  <uni-popup ref="cardshow3" type="center">
    <div class="card3 color3 green">
      <div class="cardContainer">
        <h2 class="cardFont fontTitle">中长期规划</h2>
        <h2 class="cardFont fontTitle">截止时间：{{ loginMessage.okrInformation.thirdQuadrantVO.deadline }}</h2>
        <div class="planGreenContent" v-for="item in loginMessage.okrInformation.thirdQuadrantVO.actions"
          :key="item.id">
          <label class="radio">
            <checkbox value="r2" color="rgb(41, 200, 179)" :checked=item.isCompleted
              @click="planCompleted(0, item.id, item.content, item.isCompleted)" />{{ item.content }}
          </label>
          <img class="deleteState" src="http://47.92.173.60:1701/media/static/绿色叉叉.png" alt=""
            @click="planDelete(0, item.id)">
        </div>

      </div>
      <div class="addButton green" @click="addLongPlan">添加</div>
      <div class="backButton green" @click="backCurrent(3)">返回</div>
    </div>
  </uni-popup>

  <!-- 未初始化的第三象限 -->
  <uni-popup ref="cardshow7" type="center">
    <div class="card6 green color3">
      <div class="cardContainer">
        <p class="cardFont">
          目标的执行分为若干个中长期规划执行周期，请根据个人需求设置执行周期的时间长度，如月计划
        </p>
        <h2 class="cardFont fontTitle">设置第一个执行周期的截止时间</h2>
        <uni-section :title="'截止时间：' + longDeadline" type="line"></uni-section>
        <view class="example-body">
          <uni-datetime-picker type="datetime" v-model="longDeadline" @change="changeLog" />
        </view>

        <h2 class="cardFont fontTitle">设置其余执行周期的执行时间</h2>
        <p class="cardFont">
          请在白色文本框中输入执行周期的天数，例如：30。除第一个执行周期的截止时间外，其余周期的截止时间将按照您输入的执行周期天数自动计算
        </p>
        <textarea v-model="longPeriod" class="inputBox2"></textarea>
      </div>
      <div class="addButton green" @click="setLongDeadline">确认</div>
      <div class="backButton green" @click="backCurrent(7)">返回</div>
    </div>
  </uni-popup>

  <!-- 第四象限：状态指标 -->
  <uni-popup ref="cardshow4" type="center">
    <div class="card4 color4 red">
      <div class="cardContainer">

        <div class="stateContent" v-for="item in loginMessage.okrInformation.fourthQuadrantVO.statusFlags"
          :key="item.id">
          <span class="stateFont">{{ item.label }}</span>
          <div class="circleBox">
            <div class="circle1" :class="{ circleActive: item.color === '#000000' }"
              @click="updateColor(item.label, item.id, 0)"></div>
            <div class="circle2" :class="{ circleActive: item.color === '#000001' }"
              @click="updateColor(item.label, item.id, 1)"></div>
            <div class="circle3" :class="{ circleActive: item.color === '#000002' }"
              @click="updateColor(item.label, item.id, 2)"></div>
          </div>
          <img class="deleteState" @click="deleteState(item.id)" src="http://47.92.173.60:1701/media/static/红色叉叉.png"
            alt="">
        </div>

      </div>
      <div class="addButton red" @click="addStatus">添加</div>
      <div class="backButton red" @click="backCurrent(4)">返回</div>
    </div>
  </uni-popup>

  <!-- 添加状态指标 -->
  <uni-popup ref="cardshow8" type="center">
    <div class="card4 color4 red">
      <div class="cardContainer">
        <h2 class="cardFont fontTitle">设置状态指标内容</h2>
        <textarea v-model="statusLabel" class="inputBox2"></textarea>
        <h2 class="cardFont fontTitle">设置该指标当前状态值</h2>
        <div class="stateContent">
          <div class="circle1" :class="{ circleActive: statusArr[0] }" @click="changeColor(0)"></div>
          <div class="circle2" :class="{ circleActive: statusArr[1] }" @click="changeColor(1)"></div>
          <div class="circle3" :class="{ circleActive: statusArr[2] }" @click="changeColor(2)"></div>
        </div>
      </div>
      <div class="addButton red" @click="confirmAddStatus">确认</div>
      <div class="backButton red" @click="backCurrent(8)">返回</div>
    </div>
  </uni-popup>
</template>

<style scoped>
.flexBox1 {
  margin-top: 3vh;
  display: flex;
  justify-content: space-around;
  height: 50vh;
}

.flexBox2 {
  margin-bottom: 3vh;
  display: flex;
  justify-content: space-around;
  height: 44vh;
}

.rightTop1 {
  position: relative;
  box-sizing: border-box;
  width: 40vw;
  height: 44vh;
  background-color: #FFFFFF;
  border: rgb(0, 0, 0) solid 1px;
  color: rgb(41, 168, 211);
  font-size: 16px;
  padding: 10px;
  font-weight: 700;
  box-shadow: 8px 8px 4px rgba(0, 0, 0, 0.2);
}

.title {
  font-weight: 700;
  margin-bottom: 5px;
}

.leftTop2 {
  position: relative;
  box-sizing: border-box;
  width: 40vw;
  height: 44vh;
  background-color: rgb(255, 255, 255);
  border:rgb(0, 0, 0) solid 1px;
  padding: 10px;
  color: rgb(223, 175, 97);
  font-size: 16px;
  font-weight: 700;
  box-shadow: 8px 8px 4px rgba(0, 0, 0, 0.2);
}

.container1 {
  height: 33vh;
  width: 100%;
  overflow-y: auto;
}

.editButton {
  position: absolute;
  right: 5px;
  bottom: 5px;
  width: 60px;
  height: 25px;
  background-color: #fff;
  font-size: 12px;
  text-align: center;
  line-height: 25px;
  border-radius: 5px;
  overflow-y: auto;
}

.backButton {
  position: absolute;
  right: 10px;
  bottom: 10px;
  width: 90px;
  height: 30px;
  background-color: #fff;
  font-size: 14px;
  text-align: center;
  line-height: 30px;
  border-radius: 5px;
  overflow-y: auto;
}

.addButton {
  position: absolute;
  right: 110px;
  bottom: 10px;
  width: 90px;
  height: 30px;
  background-color: #fff;
  font-size: 14px;
  text-align: center;
  line-height: 30px;
  border-radius: 5px;
  overflow-y: auto;
}

.buttonCotainer {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  height: 10%;
}

.firstQButton {
  height: 30px;
  background-color: #fff;
  font-size: 14px;
  text-align: center;
  line-height: 30px;
  border-radius: 5px;
}

.longButton {
  width: 90px;
}

.middleButton {
  width: 75px;
}

.shortButton {
  width: 55px;
}

.red {
  border: rgb(231, 163, 137) solid 2px;
}

.yellow {
  border: rgb(223, 175, 97) solid 2px;
}

.blue {
  border: rgb(41, 168, 211) solid 2px;
}

.green {
  border: rgb(102, 208, 193) solid 2px;
}

.text {
  margin-bottom: 10px;
  /* 文本内容下方留出一定的距离 */
}

.leftBotton3 {
  position: relative;
  box-sizing: border-box;
  width: 40vw;
  height: 44vh;
  background-color: rgb(255, 255, 255);
  border: rgb(0, 0, 0) solid 1px;
  padding: 10px;
  color: rgb(102, 208, 193);
  font-size: 16px;
  font-weight: 700;
  box-shadow: 8px 8px 4px rgba(0, 0, 0, 0.2);
}

.rightBotton4 {
  position: relative;
  box-sizing: border-box;
  width: 40vw;
  height: 44vh;
  background-color:  rgb(255, 255, 255);
  border: rgb(0, 0, 0) solid 1px;
  padding: 10px;
  color: rgb(231, 163, 137);
  font-size: 16px;
  font-weight: 700;
  box-shadow: 8px 8px 4px rgba(0, 0, 0, 0.2);
}

.container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin: 5px 0;
}

.stateText {
  line-height: 20px;
  width: 80%;
}

.circle1,
.circle2,
.circle3 {
  width: 15px;
  height: 15px;
  border-radius: 50%;
}

.circle1 {
  background-color: #008672;
}

.circle2 {
  background-color: #E4E669;
}

.circle3 {
  background-color: #D73A4A;
}

.rightArrow {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 95vw;
  height: 5vh;
}

.topArrow {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 6vw;
  height: 95vh;
}

.target {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 10vw;
  height: 10vw;
}

.card1,
.card2,
.card3,
.card4,
.card5,
.card6 {
  box-sizing: border-box;
  position: fixed;
  top: 5vh;
  left: 50vw;
  transform: translate(-50%);
  z-index: 9999999;
  width: 85vw;
  height: 90vh;
  /* 盒子阴影 */
  box-shadow: 3px 3px 15px #535353;
  color: white;
  overflow-y: auto;
  font-weight: 700;
}

.card1 {
  color: rgb(223, 175, 97);
}

.card2 {
  color: rgb(41, 168, 211);
  padding: 15px;
}

.card3 {
  color: rgb(102, 208, 193);
}

.card4 {
  padding: 15px 0 0 0;
  color: rgb(231, 163, 137);
}

.card5 {
  color: rgb(223, 175, 97);
  padding: 15px;
}

.card6 {
  color: rgb(102, 208, 193);
  padding: 15px;
}

.cardContainer {
  height: 90%;
  width: 100%;
  overflow-y: auto;
}

.color1 {
  background-color: rgb(253, 250, 219);
}

.color2 {
  background-color: rgb(227, 246, 253);
}

.color3 {
  background-color: rgb(222, 251, 247);
}

.color4 {
  background-color: rgb(255, 234, 221);
}

.cardFont {
  margin: 10px;
}

.fontTitle {
  font-size: 20px;
}

.stateContent,
.planYellowContent,
.planGreenContent {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  margin: 0 auto 10px;
  width: 92%;
  padding: 10px 0;
  box-shadow: 3px 3px 7px #787878;
  border-radius: 10px;
}

.stateContent {
  justify-content: space-evenly;
  color: rgb(231, 163, 137);
  background-color: rgb(248, 242, 237);
}

.planYellowContent {
  justify-content: space-between;
  color: rgb(223, 175, 97);
  background-color: rgb(254, 252, 238);
  padding: 10px 10px;
}

.planGreenContent {
  justify-content: space-between;
  color: rgb(102, 208, 193);
  background-color: rgb(242, 253, 251);
  padding: 10px 10px;
}

.circleBox {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 40%;
}

.stateFont {
  width: 30%;
}

.deleteState {
  width: 20px;
  height: 20px;
}

.radio {
  max-width: 90%;
}

.circleActive {
  border: rgb(231, 163, 137) 3px solid;
}

.inputBox {
  box-sizing: border-box;
  width: 90%;
  height: 50px;
  margin: 0 auto;
  padding: 5px 10px 5px 10px;
  background-color: #fff;
}

.summaryInput {
  box-sizing: border-box;
  width: 90%;
  height: 120px;
  margin: 0 auto;
  padding: 5px 10px 5px 10px;
  background-color: #fff;
}

.inputBox2 {
  box-sizing: border-box;
  width: 90%;
  height: 30px;
  margin: 0 auto;
  padding: 5px 10px 5px 10px;
  background-color: #fff;
}

.example-body {
  background-color: #fff;
  padding: 10px;
}
</style>