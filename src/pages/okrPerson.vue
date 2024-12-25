<script setup>
import { ref } from 'vue';
// 1. 导入组件
import readWriteOkr from '../components/readWriteOkr.vue';
//引入仓库
import { useCounterStore } from '@/store/Login'
const loginMessage = useCounterStore()

//获取个人OKR列表
const getPersonOkrList = () => {
  uni.request({
    url: 'http://139.159.210.77:1701/personal/list',
    method: 'GET',
    header: {
      "Login-Type": "r6Vsr0",
      "Token": loginMessage.token,
    },
    success(res) {
      if (res.data.code === 2001) {
        uni.redirectTo({
          url: '/pages/loginPage'
        });
      }
      loginMessage.scene = 'scene-p'
      if (res.data.data.length === 0) { //用户未创建过OKR
        createOKPerson.value = false
        notCreatedPerson.value = true
        createdPerson.value = false
      }
      else if (res.data.data[0].isOver) { //无未完成的OKR
        createOKPerson.value = false
        notCreatedPerson.value = true
        createdPerson.value = false
      } else { //有未完成的OKR
        loginMessage.OkrcoreId = res.data.data[0].coreId
        createOKPerson.value = false
        notCreatedPerson.value = false
        createdPerson.value = true
        loginMessage.getOkrInformation()
      }
    }
  })
}
getPersonOkrList()

//展示新勋章
const popup1 = ref()
const popup2 = ref()
const showMedal = ref({
  description: "",
  isRead: false,
  issueTime: "",
  level: 0,
  medalId: 0,
  name: "",
  url: ""
})

//获取用户未读的勋章
const getUnreadMedal = () => {
  uni.request({
    url: 'http://139.159.210.77:1701/medal/list/unread',
    method: 'GET',
    header: {
      "Login-Type": "r6Vsr0",
      "Token": loginMessage.token,
    },
    success(res) {
      if (res.data.code === 2001) {
        uni.redirectTo({
          url: '/pages/loginPage'
        });
      }
      if (res.data.data.length) {
        showMedal.value = res.data.data[0]
        showMedal.value.url = 'http://139.159.210.77:1701/' + showMedal.value.url
        console.log(showMedal.value);
        if (notCreatedPerson.value) {
          popup1.value.open()
        } else if (createdPerson.value) {
          popup2.value.open()
        }
      }
    }
  })
}

//每次页面显示时，触发onShow函数
import { onShow, onReady } from '@dcloudio/uni-app'
onShow(() => {
  getPersonOkrList()
  myOkrTeam.value = true
  createdTeam.value = false
})

onReady(() => {
  getUnreadMedal()
})

const close = () => {
  //用户知晓获得新勋章
  uni.request({
    url: `http://139.159.210.77:1701/medal/read/${showMedal.value.medalId}`,
    method: 'POST',
    header: {
      "Login-Type": "r6Vsr0",
      "Token": loginMessage.token,
    }
  }).then(res => {
    if (res.data.code === 200) {
      if (notCreatedPerson.value) {
        popup1.value.close()
      } else if (createdPerson.value) {
        popup2.value.close()
      }
    }
  })
}

//跳转到勋章墙
const toWall = () => {
  if (notCreatedPerson.value) {
    popup1.value.close()
  } else if (createdPerson.value) {
    popup2.value.close()
  }
  //用户知晓获得新勋章
  uni.request({
    url: `http://139.159.210.77:1701/medal/read/${showMedal.value.medalId}`,
    method: 'POST',
    header: {
      "Login-Type": "r6Vsr0",
      "Token": loginMessage.token,
    }
  }).then(async res => {
    await uni.navigateTo({
      url: 'medalPage'
    });
  })
}

// 顶部导航栏文字切换
const handleSwiperChange = event => {
  switch (event.detail.current) {
    case 0:
      getPersonOkrList()
      uni.setNavigationBarTitle({
        title: '个人模式'
      })
      break
    case 1:
      loginMessage.scene = 'scene-tp'
      getTeamPersonList()
      myOkrTeam.value = true
      createdTeam.value = false
      uni.setNavigationBarTitle({
        title: '团队模式'
      })
      break
  }
}

const notCreatedPerson = ref(false)
const createdPerson = ref(false)
const createOKPerson = ref(false)

//显示引导创建页面
const createOkrPerson = () => {
  createOKPerson.value = true
  notCreatedPerson.value = false
}

//返回按钮逻辑：显示未创建OKR页面
const backPerson = () => {
  createOKPerson.value = false
  notCreatedPerson.value = true
}

//显示四个象限
const createCompletePerson = () => {
  //创建OKR
  uni.request({
    url: 'http://139.159.210.77:1701/core/create',
    method: 'POST',
    header: {
      "Login-Type": "r6Vsr0",
      "Token": loginMessage.token,
    },
    data: {
      "scene": "scene-p"
    },
    success(res) {
      if (res.data.code === 2001) {
        uni.redirectTo({
          url: '/pages/loginPage'
        });
      }
      if (res.data.code === 200) {
        loginMessage.OkrcoreId = res.data.data.coreId
        loginMessage.getOkrInformation()
        createOKPerson.value = false
        notCreatedPerson.value = false
        createdPerson.value = true
      }
    }
  })
}

// 团队模式逻辑代码
const createdTeam = ref(false)
const myOkrTeam = ref(true)

//查看团队模式的个人OKR
const personTeamOKR = coreId => {
  loginMessage.OkrcoreId = coreId
  loginMessage.scene = "scene-tp"
  loginMessage.getOkrInformation()
  uni.navigateTo({
    url:'/pages/teamOKR',
  })
}

const personalTeamOkr = ref()
const noTeam = ref(true)

//获取团队模式OKR列表
const getTeamPersonList = () => {
  uni.request({
    url: 'http://139.159.210.77:1701/teampersonal/list',
    method: 'GET',
    header: {
      "Login-Type": "r6Vsr0",
      "Token": loginMessage.token,
    },
    success(res) {
      if (res.data.code === 2001) {
        uni.redirectTo({
          url: '/pages/loginPage'
        });
      }
      if (res.data.data.length != 0) {
        personalTeamOkr.value = res.data.data
        noTeam.value = false
      }
    }
  })
}
getTeamPersonList()


// 团队模式悬浮按钮：返回功能
const pattern = ref({
  color: 'black',
  backgroundColor: '#FFFFFF',
  selectedColor: '#3694f3',
  buttonColor: '#3694f3'
})

const content = ref([
  {
    iconPath: 'http://139.159.210.77:1701/media/static/返回.png',
    text: '返回',
  }
])

const trigger = () => {
  myOkrTeam.value = true
  createdTeam.value = false
}
</script>

<template>
  <swiper @change="handleSwiperChange" class="swiper" :circular="true">
    <swiper-item>
      <view>
        <!-- 未创建okr页面 -->
        <div class="page" v-if="notCreatedPerson">
          <p class="tipsFont">当前为个人模式</p>
          <p>左右划动屏幕可切换成团队模式</p>
          <div class="contain">
            <div class="box">
              <div class="box1">
                <div class="box2">
                  <h3 style="color: white;">本周计划</h3>
                  <div class="item">P1:必须要做，一定要做</div>
                  <div class="item">P2:可以做的事情</div>
                  <div class="item">没有Plan3</div>
                </div>
              </div>
            </div>


            <div class="box">
              <div class="box1" style="margin-top: 2vw;">
                <div class="box2" style="background-color: #555454; bottom: -9%;">
                  <h3 style="color: white; margin-top: 5vw;">未来一个月要跟进的计划</h3>
                </div>
              </div>
            </div>

            <div class="box">
              <div class="box1">
                <div class="box2" style="background-color: #555454;">
                  <h3 style="color: white; margin-top: 5vw;">目标</h3>
                  <h3 style="color: white;  margin-top: 5vw;">关键结果</h3>
                </div>
              </div>
            </div>

            <div class="box">
              <div class="box1" style="margin-top: 2vw;">
                <div class="box2" style="bottom: -9%;">
                  <h3 style="color: white;">状态指标</h3>
                  <div class="item">客户满意度</div>
                  <div class="item">团队氛围，途径，方法</div>
                </div>
              </div>
            </div>
          </div>

          <div class="middle">
            <div class="saying"><img class="png" src="http://139.159.210.77:1701/media/static/灯泡.png" alt="">定目标，抓过程，拿结果
            </div>
            <button class="button phone" @click="createOkrPerson">创建OKR</button>
            <div class="saying">还没有OKR</div>
          </div>

          <!-- 获得新勋章弹框展示 -->
          <uni-popup ref="popup1" type="center" :mask="true" :mask-click="false">
            <view class="popup">
              <view class="icon-close">
                <uni-icons type="close" size="30" @click="close" color="#fff">
                </uni-icons>
              </view>
              <div class="medalTitle">获得新勋章</div>
              <image :src="showMedal.url" mode="widthFix" class="QRcode"></image>
              <div class="medalTitle">{{ showMedal.name }}</div>
              <div class="medalTips">{{ showMedal.description }}</div>
              <button class="button" @click="toWall">
                前往勋章墙查看
              </button>
            </view>
          </uni-popup>

        </div>

        <!-- 创建引导页面 -->
        <div v-if="createOKPerson" class='page-cont'>
          <div class="title2">个人OKR创建</div>
          <div class="context">
            <div><span class="cycle">1</span>第一象限(右上角)：OKR当前状态</div>
            <div style="text-indent: 2em; font-size: 4vw;">▪ 目标（O）</div>
            <div style="text-indent: 2em; font-size: 4vw;">▪ 关键结果（KR） 信心指数（%）</div>
            <div class="title1"><span class="cycle">2</span>第二象限（左上角）：短期计划</div>
            <div style="text-indent: 2em; font-size: 4vw;">▪ 短期内需完成的最重要的事情</div>
            <div style="text-indent: 2em; font-size: 4vw;">▪ P1为必须完成的事</div>
            <div style="text-indent: 2em; font-size: 4vw;">▪ P2为在时间紧迫的情况下可以不完成的事</div>
            <div class="title1"><span class="cycle">3</span>第三象限（左下角）：中长期规划</div>
            <div style="text-indent: 2em; font-size: 4vw;">▪ 在稍长的周期内要做的事情</div>
            <div style="text-indent: 2em; font-size: 4vw;">▪ 为达成目标需要着手推进的事情</div>
            <div class="title1"><span class="cycle">4</span>第四象限（右下角）：状态指标</div>
            <div style="text-indent: 2em; font-size: 4vw;">▪ 会影响目标达成的状态指标</div>
          </div>
          <div class="bubox"> <button class="butt" @click="backPerson">返回</button>
            <button class="butt" @click="createCompletePerson">创建</button>
          </div>
        </div>

        <!-- OKR可读可写四象限及卡片详情 -->
        <div v-show="createdPerson">
          <p class="smallTips">当前为个人模式，左右划动屏幕可切换成团队模式</p>
          <readWriteOkr></readWriteOkr>

          <!-- 获得新勋章弹框展示 -->
          <uni-popup ref="popup2" type="center" :mask="true" :mask-click="false">
            <view class="popup">
              <view class="icon-close">
                <uni-icons type="close" size="30" @click="close" color="#fff">
                </uni-icons>
              </view>
              <div class="medalTitle">获得新勋章</div>
              <image :src="showMedal.url" mode="widthFix" class="QRcode"></image>
              <div class="medalTitle">{{ showMedal.name }}Lv{{ showMedal.level }}</div>
              <div class="medalTips">{{ showMedal.description }}</div>
              <button class="button" @click="toWall">
                前往勋章墙查看
              </button>
            </view>
          </uni-popup>
        </div>

      </view>
    </swiper-item>
    <swiper-item>
      <view>
        <!-- 团队模式：团队列表页面 -->
        <div class="teamPage" v-if=myOkrTeam>
          <p class="tipsFont">当前为团队模式</p>
          <p>左右划动屏幕可切换成个人模式</p>
          <div class="teamList">团队模式OKR列表</div>
          <!-- 未加入团队的样式 -->
          <div v-if="noTeam">
            <img class="empty" src="http://139.159.210.77:1701/media/static/空状态加入的团队.png" alt="">
          </div>

          <!-- 已加入团队的样式 -->
          <div v-else>
            <div class="listContainer">
              <div v-for="item in personalTeamOkr" :key="item.id">
                <div class="flexListBox" v-if="!item.isOver">
                  <div class="teamName">
                    {{ item.teamName }}
                  </div>
                  <button class="createbButton" @click="personTeamOKR(item.coreId)">查看OKR</button>
                </div>
              </div>

            </div>
          </div>
        </div>

      </view>
    </swiper-item>
  </swiper>
</template>

<style lang="scss" scoped>
.page {
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}

.swiper {
  height: 100vh;
  width: 100vw;
}

.contain {
  width: 90%;
  height: 80vw;
  margin: 10px auto;
  position: relative;
}

.box {
  position: absolute;
  width: 50%;
  /* 每个盒子占据盒子的半宽度 */
  height: 50%;
  /* 每个盒子占据盒子的半高度 */
}

.box:nth-child(1) {
  top: 0;
  left: 0;
  border-right: 2px solid black;
  border-bottom: 2px solid black;

}

.box:nth-child(1)::after {
  content: "";
  position: absolute;
  width: 0;
  height: 0;
  border-left: 2vw solid transparent;
  border-right: 2vw solid transparent;
  border-bottom: 2vw solid #000000;
  bottom: 100%;
  left: 96%;
}

.box:nth-child(2) {
  top: 50%;
  left: 0;
  border-right: 2px solid black;
}


.box:nth-child(3) {
  top: 0;
  left: 50%;
  border-bottom: 2px solid black;
}

.box:nth-child(3)::after {
  content: "";
  position: absolute;
  width: 0;
  height: 0;
  border-top: 2vw solid transparent;
  border-bottom: 2vw solid transparent;
  border-left: 2vw solid #000000;
  left: 100%;
  bottom: -6%;
}

.box:nth-child(4) {
  top: 50%;
  left: 50%;
}

.box1 {
  position: relative;
  width: 90%;
  height: 70%;
  background-color: #D9D9D9;
  border-radius: 2vw;
  margin-left: 2vw;
  margin-top: 10vw;
}



.box2 {
  position: absolute;
  width: 80%;
  height: 100%;
  background-color: skyblue;
  left: 8%;
  bottom: 10%;
  border-radius: 2vw;
  border: 1px solid white;
  padding-left: 2vw;

}

.item {
  font-size: 22rpx;
  color: white;
  margin-top: 2vw;
}

.middle {
  width: 100%;
  height: 30vw;
  margin-bottom: 18%;
}


.png {
  width: 7vw;
  height: 7vw;
  vertical-align: middle;
}

.saying {
  font-size: 22rpx;
  color: #999;
  text-align: center;
}


.button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  height: 80rpx;
  font-size: 28rpx;
  border-radius: 72rpx;
  color: #fff;
}

.phone {
  background-color: #3694f3;
}

.page-cont {
  background-color: #8A8A8B;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;

}

.medalTitle,
.title2 {
  width: 100%;
  color: #fff;
  text-align: center;
}

.title2 {
  margin-top: 10vw;
  font-size: 6vw;
}

.medalTitle {
  font-size: 60rpx;
  border-radius: 50%;
  color: rgb(255, 255, 255);
  text-shadow: 0 0 5rpx yellow, 0 0 10rpx yellow, 0 0 15rpx yellow, 0 0 20rpx yellow;
}

.context {
  width: 90%;
  padding-top: 8%;
  padding-bottom: 8%;
  font-size: 5vw;
  color: #fff;
}

.cycle {
  display: inline-block;
  width: 20px;
  height: 20px;
  background-color: rgb(60, 179, 113);
  color: #fff;
  text-align: center;
  border-radius: 50%;
  margin-right: 2vw;
}

.title1 {
  margin-top: 2vw;
}

.bubox {
  width: 100%;
  display: flex;
}

.butt {
  width: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #8A8A8B;
  border: 1px solid white;
  color: white;
  font-size: 5vw;
}

.buttBack {
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #8A8A8B;
  border: 1px solid white;
  color: white;
  font-size: 5vw;
  margin-top: 20px;
}

.teamBox {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999998;
}

.teamFont {
  margin: 10px;
  font-size: 13px;
  color: #999;
}

.empty {
  width: 100vw;
}

.button1 {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90%;
  height: 80rpx;
  font-size: 28rpx;
  border-radius: 72rpx;
  color: #fff;
  background-color: #3694f3;
  margin-top: 10px;
}

.tipsFont {
  margin-top: 10px;
}

.smallTips {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 99999;
  font-size: 26rpx;
  color: #999;
  margin: 0 0 0 10px;
}

.teamPage {
  width: 100vw;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
}

.teamList {
  font-size: 6vw;
  font-weight: bold;
  margin: 2vw 0 1vw 0;
}

.listContainer {
  width: 90vw;
  border: #c9c9c9 1px solid;
  border-radius: 10px;
  box-shadow: 3px 3px 10px #747474;
  margin-bottom: 10px;
}

.flexListBox {
  box-sizing: border-box;
  width: 100%;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}


.createbButton {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30%;
  height: 60rpx;
  font-size: 26rpx;
  border-radius: 72rpx;
  color: #fff;
  background-color: #3694f3;
}

.teamName {
  width: 70%;
  padding-bottom: 5px;
  border-bottom: #c9c9c9 1px solid;
  font-weight: 700;
}

.popup {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  .icon-close {
    margin-right: -450rpx;
  }

  .QRcode {
    width: 450rpx;
  }
}

.medalTips {
  color: #fff;
  font-size: 30rpx;
  margin-top: 28rpx;
}

.button {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20rpx;
  width: 60vw;
  height: 80rpx;
  font-size: 28rpx;
  border-radius: 72rpx;
  color: #fff;
  background-color: #3694f3;
}
</style>