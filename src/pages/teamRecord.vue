<script setup>
import { ref } from 'vue';

import { useCounterStore } from '@/store/Login'
const loginMessage = useCounterStore()

const teamOkrList = ref()

const teamNoOkr = ref(true)

uni.request({
  url: 'http://139.159.210.77:1701/teampersonal/list',
  method: 'get',
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
    if(res.data.data.length){
      teamOkrList.value = res.data.data
      teamNoOkr.value = false
    }
  }
})

const showRecord = teamId => {
  uni.navigateTo({
    url: `/pages/teamOkrRecord?teamId=${teamId}` // 跳转的页面路径
  });
}
</script>

<template>
  <text class="personalRecord">团队OKR历史记录</text>

  <!-- 无历史记录时的显示效果 -->
  <div v-if="teamNoOkr">
    <img class="empty" src="http://139.159.210.77:1701/media/static/空状态OKR历史记录.png" alt="">
  </div>

  <!-- 有历史记录时的显示效果 -->
  <div v-else>
    <uni-card margin="10px" padding="3px">
      <uni-list>
        <div v-for="item in teamOkrList" :key="item.id">
          <uni-list-item :title="item.teamName + ' ' + item.createTime" showArrow
            @tap="showRecord(item.teamId)"></uni-list-item>
        </div>
      </uni-list>
    </uni-card>
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