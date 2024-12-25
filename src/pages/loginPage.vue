<script setup>
import { ref } from 'vue'

//引入仓库
import { useCounterStore } from '@/store/Login'
const loginMessage = useCounterStore()

//登录逻辑
const handleLogin = () => {
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
            if (res.data.message === '操作成功') {
              //将后端传回的Token存入仓库中
              loginMessage.token = res.data.data.Token
              //展示登录成功的信息
              uni.$showMsg('登录成功！')
              uni.request({
                url: 'http://139.159.210.77:1701/user/userinfo',
                method: 'GET',
                header: {
                  "Login-Type": "r6Vsr0",
                  "Token": loginMessage.token
                },
                success(res) {
                  loginMessage.id = res.data.data.id
                  console.log(loginMessage.id)
                }
              })
              // 跳转页面
              setTimeout(() => {
                uni.switchTab({
                  url: '/pages/okrIntroduce'
                });
              }, 500)
            } else {
              return uni.$showMsg('登录失败！')
            }
          }
        })
      } else {
        return uni.$showMsg('登录失败！')
      }
    }
  });
}

// 每次页面显示时，触发onShow函数
import { onShow } from '@dcloudio/uni-app'
onShow(() => {
  //调用接口判断token是否失效
  uni.request({
    url: 'http://139.159.210.77:1701',
    method: 'GET',
    header: {
      "Login-Type": "r6Vsr0",
      "Token": loginMessage.token,
    },
    success(res) {
      if (res.data.code === 200) {
        uni.switchTab({
          url: 'okrIntroduce'
        });
      }
    }
  })
})

</script>

<template>
  <view class="viewport">
    <view class="logo">
      <image src="http://139.159.210.77:1701/media/static/小程序logo.jpg"></image>
    </view>
    <view class="login">
      <button class="button phone" @click="handleLogin">
        点击直接登录
      </button>

      <view class="extra">
        <view class="caption">
          <text>管理OKR，提升工作效率</text>
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
    color: #fff;
  }

  .phone {
    background-color: #3694f3;
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