<script setup>
import { ref } from 'vue'

//引入仓库
import { useCounterStore } from '@/store/Login'
const loginMessage = useCounterStore()

const personalRecord = () => {
  uni.navigateTo({
    url: '/pages/personalRecord' // 跳转的页面路径
  });
}

const teamRecord = () => {
  uni.navigateTo({
    url: '/pages/teamRecord' // 跳转的页面路径
  });
}


const medal = () => {
  uni.navigateTo({
    url: '/pages/medalPage' // 跳转的页面路径
  });
}

//HACK
// const aboutUs = () => {
//   uni.navigateTo({
//     url: '/pages/aboutUs' // 跳转的页面路径
//   });
// }

//用户默认头像与昵称
const nickName = ref('用户昵称')
const avatarUrl = ref('https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0')

//从后端获取用户信息并渲染
uni.request({
  url: 'http://47.92.173.60:1701/user/userinfo',
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
    nickName.value = res.data.data.nickname
    if(res.data.data.photo){
      avatarUrl.value = 'http://47.92.173.60:1701/' + res.data.data.photo
    }
  }
})

//设置用户头像
const onChooseAvatar = e => {
  avatarUrl.value = e.detail.avatarUrl
  //将头像保存到后端
  uni.uploadFile({
    url: 'http://47.92.173.60:1701/user/photo/upload',
    filePath: avatarUrl.value, //头像
    header: {
      "Login-Type": "r6Vsr0",
      "Token": loginMessage.token
    },
    name: 'photo',
    success: (res) => {
      console.log(res.data);
      if (res.data.code === 2001) {
        uni.redirectTo({
          url: '/pages/loginPage'
        });
      }
    }
  });
}

//设置用户昵称
const setName = e => {
  nickName.value = e.detail.value
   uni.request({
    url: 'http://47.92.173.60:1701/user/improve',
    method: 'POST',
    header: {
      "Login-Type": "r6Vsr0",
      "Token": loginMessage.token
    },
    data: {
      "nickname": nickName.value,
    },
    success(res) {
      if (res.data.code === 2001) {
        uni.redirectTo({
          url: '/pages/loginPage'
        });
      }
    }
  })
}
</script>

<template>
  <scroll-view enable-back-to-top class="viewport" scroll-y>
    <!-- 头像、昵称 -->
    <view class="profile">
      <view class="overview">
        <view>
          <button class="avatar" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
            <image class="avatarImg" :src=avatarUrl mode="aspectFill"></image>
          </button>
        </view>
        <view class="meta">
          <input class="nickname" type="nickname" placeholder="请输入昵称" @change="setName" v-model="nickName" />
          <div class="extra">
            <text class="update">点击头像可更换，点击昵称可修改</text>
          </div>
        </view>
      </view>
    </view>
    <!-- 历史记录 -->
    <view class="orders">
      <view class="title" @tap="personalRecord">
        个人OKR记录
        <div class="navigator" hover-class="none">
          点击查看<text class="icon-right"></text>
        </div>
      </view>
    </view>

    <view class="orders">
      <view class="title" @tap="teamRecord">
        团队OKR记录
        <div class="navigator" url="/pagesOrder/list/list?type=0" hover-class="none">
          点击查看<text class="icon-right"></text>
        </div>
      </view>
    </view>
    
    <!-- HACK -->
    <!-- <view class="orders">
      <view class="title" @tap="medal">
        荣誉勋章
        <div class="navigator" hover-class="none">
          点击查看<text class="icon-right"></text>
        </div>
      </view>
    </view> -->

    <!--//HACK-->
    <!-- <view class="orders">
      <view class="title" @tap="aboutUs">
        关于我们
        <div class="navigator" url="/pagesOrder/list/list?type=0" hover-class="none">
          点击查看<text class="icon-right"></text>
        </div>
      </view>
    </view> -->

  </scroll-view>
</template>

<style lang="scss">
page {
  height: 100%;
  overflow: hidden;
  background-color: #f7f7f8;
}

.viewport {
  // height: 100%;
  background-image: linear-gradient(200deg, #239cff, #a1ffaa);
  box-shadow: 7px 7px 20px #a1ffaa;
  background-size: 100% auto;
}

/* 用户信息 */
.profile {
  margin: 30rpx 0;
  position: relative;

  .overview {
    display: flex;
    height: 120rpx;
    padding: 0 36rpx;
    color: #fff;
  }

  .avatar {
    position: relative;
    width: 120rpx;
    height: 120rpx;
    border-radius: 50%;
    background-color: #eee;
  }

  .avatarImg {
    position: absolute;
    left: 0;
    top: 0;
    width: 120rpx;
    height: 120rpx;
    border-radius: 50%;
    background-color: #eee;
  }

  .gray {
    filter: grayscale(100%);
  }

  .meta {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    line-height: 30rpx;
    padding: 16rpx 0;
    margin-left: 20rpx;
  }

  .nickname {
    margin-bottom: 16rpx;
    font-size: 30rpx;
    color: #fff;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .extra {
    display: flex;
    font-size: 20rpx;
  }

  .tips {
    font-size: 22rpx;
  }

  .update {
    padding: 3rpx 10rpx 1rpx;
    color: rgba(255, 255, 255, 0.8);
    border: 1rpx solid rgba(255, 255, 255, 0.8);
    margin-right: 10rpx;
    border-radius: 30rpx;
  }

  .settings {
    position: absolute;
    bottom: 0;
    right: 40rpx;
    font-size: 30rpx;
    color: #fff;
  }
}

/* 我的订单 */
.orders {
  position: relative;
  z-index: 99;
  padding: 30rpx;
  margin: 20rpx 20rpx;
  background-color: #fff;
  border-radius: 10rpx;
  box-shadow: 0 4rpx 6rpx rgba(240, 240, 240, 0.6);

  .title {
    height: 40rpx;
    line-height: 40rpx;
    font-size: 28rpx;
    color: #1e1e1e;

    .navigator {
      font-size: 24rpx;
      color: #939393;
      float: right;
    }
  }

  .section {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 40rpx 20rpx 10rpx;

    .navigator,
    .contact {
      text-align: center;
      font-size: 24rpx;
      color: #333;

      &::before {
        display: block;
        font-size: 60rpx;
        color: #ff9545;
      }

      &::after {
        border: none;
      }
    }

    .contact {
      padding: 0;
      margin: 0;
      border: 0;
      background-color: transparent;
      line-height: inherit;
    }
  }
}

/* 猜你喜欢 */
.guess {
  background-color: #f7f7f8;
  margin-top: 20rpx;
}
</style>
