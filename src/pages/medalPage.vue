<script setup>
import { ref } from 'vue'
//引入仓库
import { useCounterStore } from '@/store/Login'
const loginMessage = useCounterStore()

const medalList = ref()



//获取勋章列表
uni.request({
  url: `http://y4pqfi.natappfree.cc/medal/list/all`,
  method: 'GET',
  header: {
    "Login-Type": "r6Vsr0",
    "Token": loginMessage.token
  },
  success(res) {
    if (res.data.code === 2001) {
      uni.redirectTo({
        url: '/pages/loginPage'
      });
    }
    medalList.value = res.data.data
    for (let i = 0; i < medalList.value.length; i++) {
      medalList.value[i].url = "http://y4pqfi.natappfree.cc/" + medalList.value[i].url
    }
    console.log(medalList.value);
  }
})

//展示新勋章
const popup = ref()
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
    url: 'http://y4pqfi.natappfree.cc/medal/list/unread',
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
        showMedal.value.url = 'http://y4pqfi.natappfree.cc/' + showMedal.value.url
          popup.value.open()
      }
    }
  })
}

import { onReady } from '@dcloudio/uni-app'
onReady(() => {
  getUnreadMedal()
})

const close = () => {
  //用户知晓获得新勋章
  uni.request({
    url: `http://y4pqfi.natappfree.cc/medal/read/${showMedal.value.medalId}`,
    method: 'POST',
    header: {
      "Login-Type": "r6Vsr0",
      "Token": loginMessage.token,
    }
  }).then(res => {
    if (res.data.code === 200) {
        popup.value.close()
      }
    }
  )
}

// 点击勋章查看大图
const popupMedal = ref()
const medalPhoto = ref({
  description: "",
  name: "",
  url: ""
})
const showPhoto = (url,name,description)=>{
  medalPhoto.value.url = url
  medalPhoto.value.name = name
  medalPhoto.value.description = description
  popupMedal.value.open()
}

const closePhoto = ()=>{
  popupMedal.value.close()
}

</script>

<template>
  <scroll-view enable-back-to-top class="viewport" scroll-y>

    <view class="meta">
      <p class="title">我的荣誉勋章</p>
      <p class="update">让目标照耀前程，用规划书写人生</p>
    </view>

    <view class="orders">

      <!-- 展示新勋章 -->
      <uni-popup ref="popup" type="center" :mask="true" :mask-click="false">
      <view class="popup">
        <view class="icon-close">
          <uni-icons type="close" size="30" @click="close" color="#fff">
          </uni-icons>
        </view>
        <div class="medalTitle1">获得新勋章</div>
        <image :src="showMedal.url" mode="widthFix" class="QRcode"></image>
        <div class="medalTitle1">{{ showMedal.name }}Lv{{ showMedal.level }}</div>
        <div class="medalTips">{{ showMedal.description }}</div>
      </view>
    </uni-popup>

          <!-- 点击勋章查看大图 -->
          <uni-popup ref="popupMedal" type="center" :mask="true" :mask-click="false">
      <view class="popup">
        <view class="icon-close">
          <uni-icons type="close" size="30" @click="closePhoto" color="#fff">
          </uni-icons>
        </view>
        <image :src="medalPhoto.url" mode="widthFix" class="QRcode"></image>
        <div class="medalTitle1">{{ medalPhoto.name }}</div>
        <div class="medalTips">{{ medalPhoto.description }}</div>
      </view>
    </uni-popup>

      <div class="flexContainer">
        <div class="medalBox" v-for="item in medalList" :key=item.id>
          <img class="medal" :src=item.url alt="" @click="showPhoto(item.url,item.name,item.description)">
          <div class="Fontbox">
            <span class="medalTitle">{{ item.name }}</span>
            <span class="level" v-if="item.level">Lv{{ item.level }}</span>
          </div>
          <p class="medalTip">{{ item.description }}</p>
        </div>
      </div>
    </view>

  </scroll-view>
</template>

<style lang="scss">
page {
  height: 100%;
  overflow: hidden;
  background-color: #f7f7f8;
}

.viewport {
  height: 100%;
  background-color: #85caff;
  box-shadow: 7px 7px 20px #a1ffaa;
  background-size: 100% auto;
}

.meta {
  box-sizing: border-box;
  padding: 30rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;
  line-height: 30rpx;
  height: 15vh;
  width: 100vw;
  background: url(http://y4pqfi.natappfree.cc/media/static/靶子.png) no-repeat right;
}

.update {
  padding: 3rpx 10rpx 7rpx;
  border: 1rpx solid rgba(255, 255, 255, 0.8);
  color: rgba(255, 255, 255, 0.8);
  margin-right: 10rpx;
  border-radius: 20rpx;
  font-size: 25rpx;
}

.level {
  padding: 1rpx 5rpx 1rpx;
  color: rgb(10, 125, 242);
  border: 1rpx solid rgb(10, 125, 242);
  margin-left: 5rpx;
  border-radius: 15rpx;
  font-size: 20rpx;
}

.title {
  font-size: 40rpx;
  font-weight: 700;
  color: white;
  margin-bottom: 40rpx;
  text-shadow: 2px 2px 3px #565656;
}

.orders {
  box-sizing: border-box;
  position: relative;
  width: 100vw;
  height: 85vh;
  z-index: 99;
  padding: 30rpx;
  background-color: #fff;
  border-radius: 40rpx 40rpx 0 0;
  box-shadow: 0 4rpx 6rpx rgba(240, 240, 240, 0.6);
}

.flexContainer {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.medalBox {
  height: 30%;
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.medal {
  width: 25vw;
  height: 25vw;
}

.medalTitle {
  font-size: 30rpx;
}

.medalTip {
  font-size: 25rpx;
  color: #999;
  width: 100%;
  text-align: center;
}

.medalTitle1{
  width: 100%;
  color: #fff;
  text-align: center;
  font-size: 60rpx;
  border-radius: 50%;
  color: rgb(255, 255, 182);
  text-shadow: 0 0 5rpx yellow, 0 0 10rpx yellow, 0 0 15rpx yellow, 0 0 20rpx yellow;
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
</style>