<script setup>
import { ref } from 'vue';

//引入仓库
import { useCounterStore } from '@/store/Login'
const loginMessage = useCounterStore()

const personalNoOkr = ref(true)
const personalTeamNoOkr = ref(true)
const personalOkrList = ref()
const personalTeamOkrList = ref()

//获取个人模式OKR列表
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
    if (res.data.data) {
      personalOkrList.value = res.data.data
      for (let i = 0; i < personalOkrList.value.length; i++) {
        if (personalOkrList.value[i].isOver) {
          personalNoOkr.value = false
          break
        }
      }
    }
  }
})

//获取团队模式OKR列表
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
    if (res.data.data) {
      personalTeamOkrList.value = res.data.data
      for (let i = 0; i < personalTeamOkrList.value.length; i++) {
        if (personalTeamOkrList.value[i].isOver) {
          personalTeamNoOkr.value = false
          break
        }
      }
    }
  }
})

//TODO:这里渲染可能出了问题
const showRecord = (coreId, scene) => {
  uni.navigateTo({
    url: '/pages/searchOkr' // 跳转的页面路径
  });
  loginMessage.OkrcoreId = coreId
  loginMessage.scene = scene
  loginMessage.getOkrInformation()
}

</script>

<template>
  <!-- OKR历史记录列表页面 -->
  <div>
    <text class="personalRecord">个人模式OKR历史记录</text>
    <!-- 无历史记录时的显示效果 -->
    <div v-if="personalNoOkr">
      <img class="empty" src="http://139.159.210.77:1701/media/static/空状态OKR历史记录.png" alt="">
    </div>

    <!-- 有历史记录时的显示效果 -->
    <div v-else>
      <uni-card margin="10px" padding="3px">
        <uni-list>
          <div v-for="item in personalOkrList" :key="item.id">
            <uni-list-item v-if="item.isOver" :title="item.objective + ' ' + item.createTime" showArrow
              @tap="showRecord(item.coreId, 'scene-p')"></uni-list-item>
          </div>
        </uni-list>
      </uni-card>
    </div>

    <text class="personalRecord">团队模式OKR历史记录</text>
    <!-- 无历史记录时的显示效果 -->
    <div v-if="personalTeamNoOkr">
      <img class="empty" src="http://139.159.210.77:1701/media/static/空状态OKR历史记录.png" alt="">
    </div>

    <!-- 有历史记录时的显示效果 -->
    <div v-else>
      <uni-card margin="10px" padding="3px">
        <uni-list>
          <div v-for="item in personalTeamOkrList" :key="item.id">
            <uni-list-item v-if="item.isOver" :title="item.teamName + ' ' + item.createTime" showArrow
              @tap="showRecord(item.coreId, 'scene-tp')"></uni-list-item>
          </div>
        </uni-list>
      </uni-card>
    </div>

  </div>
</template>

<style scoped>
.personalRecord {
  margin: 10px;
  font-size: 13px;
  color: #999;
}

.empty {
  width: 100vw;
}
</style>