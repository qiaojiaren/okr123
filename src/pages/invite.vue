<script setup>
import { ref } from 'vue'

//引入仓库
import { useCounterStore } from '@/store/Login'
const loginMessage = useCounterStore()

import { onLoad } from "@dcloudio/uni-app";

const teamId = ref()
const secret = ref()

// 在页面的生命周期函数中获取页面地址栏参数（获取小程序码场景值）
onLoad(() => {
  //先调用登录接口
  uni.login({
    success(res1) {
      if (res1.code) {
        //将获取到的code传递给后端
        uni.request({
          url: 'http://139.159.210.77:1701/user/login',
          method: 'POST',
          header: {
            "Login-Type": "r6Vsr0"
          },
          data: {
            "wxLoginDTO": {
              "code": res1.code
            }
          },
          success(res) {
            loginMessage.token = res.data.data.Token
          }
        })
      }
    }
  });

  const pages = getCurrentPages();
  const currentPage = pages[pages.length - 1];

  const scene = decodeURIComponent(currentPage.options.scene);

  const params = {};
  // 将参数字符串按'&'分割成数组，然后对每一项进行处理
  scene.split('&').forEach(item => {
    const [key, value] = item.split('=');
    params[key] = value;
  });

  teamId.value = params.teamId || ''; //团队ID
  secret.value = params.secret || ''; //密钥
})

//点击取消按钮
const cancel = () => {
  uni.reLaunch({
    url: 'loginPage'
  });
}

//点击确认加入按钮
const join = () => {
  uni.request({
    url: 'http://139.159.210.77:1701/core/create',
    method: 'POST',
    header: {
      "Login-Type": "r6Vsr0",
      "Token": loginMessage.token,
    },
    data: {
      "scene": "scene-tp",
      "secret": secret.value,
      "teamOkrId": teamId.value
    }
  }).then(res => {
    if (res.data.code === 200) {
      uni.$showMsg('加入成功！')
      setTimeout(() => {
        uni.reLaunch({
          url: 'okrTeam'
        });
      }, 500)
    }
    else {
      uni.$showMsg(res.data.message)
    }
  })
}

</script>

<template>
  <view class="viewport">
    <view class="logo">
      <image src="http://139.159.210.77:1701/media/static/小程序logo.jpg"></image>
    </view>
    <view class="login">
      <button class="button phone" @click="join">
        确认加入
      </button>

      <button class="button cancel" @click="cancel">
        取消
      </button>

      <view class="extra">
        <view class="caption">
          <text>邀请您加入团队</text>
        </view>
      </view>
    </view>

  </view>
</template>

<style lang="scss">
page {
  height: 100%;
}

.viewport {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 20rpx 40rpx;
}

.logo {
  flex: 1;
  text-align: center;

  image {
    width: 40vw;
    height: 40vw;
    margin-top: 15vh;
  }
}

.login {
  display: flex;
  flex-direction: column;
  height: 60vh;
  padding: 40rpx 20rpx 20rpx;

  .button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 80rpx;
    font-size: 28rpx;
    border-radius: 72rpx;
  }

  .phone {
    background-color: #3694f3;
    color: #fff;
    margin-bottom: 20px;
  }

  .cancel {
    border: #3694f3 1px solid;
    background-color: #fff;
    color: #3694f3
  }

  .extra {
    flex: 1;
    padding: 70rpx 20rpx 0;

    .caption {
      width: 80vw;
      line-height: 1;
      border-top: 1rpx solid #ddd;
      font-size: 26rpx;
      color: #999;
      position: relative;

      text {
        transform: translate(-50%);
        background-color: #fff;
        position: absolute;
        top: -12rpx;
        left: 50%;
      }
    }

  }
}

.tips {
  position: absolute;
  bottom: 80rpx;
  left: 20rpx;
  right: 20rpx;
  font-size: 22rpx;
  color: #999;
  text-align: center;
}
</style>