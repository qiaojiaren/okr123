<script setup>
import { ref, onMounted } from 'vue';
import { onShow } from "@dcloudio/uni-app";

import { useCounterStore } from '@/store/Login'
const loginMessage = useCounterStore()

const teamjoin = ref([])
const managelist = ref([])

const request = () => {
  uni.request({
    url: 'http://139.159.210.77:1701/team/list',
    method: 'get',
    header: {
      "Login-Type": "r6Vsr0",
      "Token": loginMessage.token
    },
    success(res) {
      managelist.value = res.data.data
      console.log(res.data.data)
      uni.request({
        url: 'http://139.159.210.77:1701/teampersonal/list',
        method: 'get',
        header: {
          "Login-Type": "r6Vsr0",
          "Token": loginMessage.token
        },
        success(res) {
          console.log(res.data.data)

          for (let i = 0; i < res.data.data.length; i++) {
           let flag = true;
             for (let j = 0; j < managelist.value.length; j++) {
                if ((managelist.value[j].parentTeamId && managelist.value[j].parentTeamId === res.data.data[i].teamId) || managelist.value[j].id === res.data.data[i].teamId) {
                 flag = false;
                  break;
                }
           }
          if (flag === true) {
              // 检查teamjoin.value中是否已存在具有相同teamId的元素
             const existingTeam = teamjoin.value.find(team => team.teamId === res.data.data[i].teamId);
            if (!existingTeam) {
               teamjoin.value.push(res.data.data[i]);
              }
          }
       }
        }
      })
    }
  })

}

onMounted(() => {
  console.log(loginMessage.id)
  request()
})

const pattern = ref({
  color: 'black',
  backgroundColor: '#FFFFFF',
  selectedColor: '#3694f3',
  buttonColor: '#3694f3'
})

const content = ref([
  {
    iconPath: 'http://139.159.210.77:1701/media/static/创建团队.png',
    text: '创建团队',
  },
])

const trigger = (e) => {
  if (e.index == 0) {
    console.log(loginMessage.token)
    uni.showModal({
      title: '创建团队',
      content: '',
      editable: true,//是否显示输入框
      placeholderText: '请输入团队名称',//输入框提示内容
      confirmText: '确认',
      cancelText: '取消',
      success: (res) => {
        if (res.confirm) {
          uni.request({
              url: 'http://139.159.210.77:1701/core/create',
              method: 'POST',
              header: {
                "Login-Type": "r6Vsr0",
                "Token": loginMessage.token,
               },
              data: {
                   "scene": "scene-t",
                   "teamName":res.content
              },
              success: (res) => {
                console.log(res.data.message)
                if(res.data.code===200){
                   uni.$showMsg('创建成功')
                   request()
                }else if(res.data.code===5001){
                  uni.$showMsg('创建团队过于频繁！')
                }
               else
               uni.$showMsg(res.data.message)
              },
              fail:()=>{
                uni.$showMsg('创建失败，请重试')
              },
            })
        }
        else
          uni.$showMsg('取消了创建团队')
      }
    })
  }
}


const teamokr = (teamId, name, item) => {
  loginMessage.teamId = teamId
  loginMessage.teamname = name
  loginMessage.nickname = item.nickname
  console.log(item.id)
  loginMessage.photo = 'http://139.159.210.77:1701/' + item.photo
  if (loginMessage.id == item.id)
    loginMessage.priviledge = true
  else
    loginMessage.priviledge = false
  uni.navigateTo({
    url: '/pages/myTeam' // 跳转的页面路径
  });

}

onShow(() => {
  request()
})


</script>

<template>
  <!-- 加入的团队列表 -->
  <text class="teamFont">我加入的团队</text>
  <uni-card margin="10px" padding="3px" v-if="teamjoin.length">
    <uni-list v-for="(item, index) in teamjoin" :key="index">
      <uni-list-item :title="item.teamName" clickable showArrow
        @click="teamokr(item.teamId, item.teamName, item.manager)"></uni-list-item>
    </uni-list>
  </uni-card>
  <img v-else class="empty" src="http://139.159.210.77:1701/media/static/空状态加入的团队.png" alt="">

  <!--管理的团队列表-->
  <text class="teamFont">我管理的团队</text>
  <uni-card margin="10px" padding="3px" v-if="managelist.length">
    <uni-list v-for="(item, index) in managelist" :key="index">
      <uni-list-item :title="item.teamName" clickable showArrow @click="teamokr(item.id, item.teamName, item.manager)">
      </uni-list-item>
    </uni-list>
  </uni-card>
  <img v-else class="empty" src="http://139.159.210.77:1701/media/static/空状态管理的团队.png" alt="">

  <view>
    <uni-fab horizontal="right" vertical="bottom" direction="vertical" :content="content" :pattern="pattern"
      :popMenu="true" @trigger="trigger" />
  </view>
</template>

<style scoped>
.teamFont {
  margin: 10px;
  font-size: 13px;
  color: #999;
}

.empty {
  width: 100vw;
}
</style>