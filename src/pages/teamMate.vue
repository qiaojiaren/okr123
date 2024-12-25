<script setup>
import { ref, watch, onMounted } from 'vue'
import { useCounterStore } from '@/store/Login'
const loginMessage = useCounterStore()

const avatarList = ref([])
const searchValue = ref('')
const arr = ref([])


const teamMate = () => {
  uni.request({
    url: `http://139.159.210.77:1701/teampersonal/members/${loginMessage.teamId}`,
    method: 'POST',
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
      avatarList.value = res.data.data
      arr.value = avatarList.value
      handlePhotoUrl()
      console.log(arr.value);
    }
  })
}

//处理图片路径
const handlePhotoUrl = () => {
  for (let i = 0; i < arr.value.length; i++) {
    if (!arr.value[i].photo.startsWith("http://139.159.210.77:1701/")) {
      // 如果不是以指定前缀开头，则在字符串前拼接上指定前缀
      arr.value[i].photo = 'http://139.159.210.77:1701/' + arr.value[i].photo
    }
  }
}

onMounted(() => {
  teamMate()
})

watch(searchValue, (newValue, oldValue) => {
  if (newValue != oldValue && newValue == '') {
    arr.value = avatarList.value.slice()
    handlePhotoUrl()
  }
  else if (newValue != oldValue && newValue != '') {
    arr.value = avatarList.value.filter(item => item.nickname.includes(newValue))
    handlePhotoUrl()
  }
});

const remove = (id) => {
  uni.showModal({
    title: '是否从团队移除',
    content: '',
    confirmText: '确认',
    cancelText: '取消',
    success: (res) => {

      if (res.confirm) {
        if (!loginMessage.priviledge)
          uni.$showMsg('无权限进行该操作')
        else
          uni.request({
            url: `http://139.159.210.77:1701/teampersonal/remove/${id}`,
            method: 'get',
            header: {
              "Login-Type": "r6Vsr0",
              "Token": loginMessage.token
            },
            success(res) {
              console.log(res.data.data)
              if (res.data.code === 2001) {
                uni.redirectTo({
                  url: '/pages/loginPage'
                });
              }
              teamMate()
              if (searchValue.value == '') {
                arr.value = avatarList.value
                handlePhotoUrl()
              }
              else {
                arr.value = avatarList.value.filter(item => item.nickname.includes(searchValue))
                handlePhotoUrl()
              }
              uni.$showMsg('移除成功！')

            },
            fail() {
              uni.$showMsg('移除取消！')
            }
          })
      }
    },

  });
}

const isadminstration = () => {
  uni.$showMsg('管理员！')
}
</script>

<template>
  <div class="mian">
    <view class="search">
      <uni-search-bar placeholder="搜索团队成员" @confirm="search" cancelButton="auto" :focus="true" v-model="searchValue"
        clearButton="auto">
        <template v-slot:search>
          <uni-icons color="#999999" size="18" type="home" />
        </template>
      </uni-search-bar>
    </view>
    <uni-list :border="true">
      <uni-section v-if="!searchValue" title="团队管理者" type="line" style="margin-bottom: 3px;">
      </uni-section>
      <uni-list-chat v-if="!searchValue" :avatar-circle="true" :title="loginMessage.nickname"
        :avatar="loginMessage.photo"></uni-list-chat>
      <uni-section v-if="!searchValue" title="团队成员" type="line" style="margin-bottom: 3px;">
      </uni-section>
      <div v-if="arr.length">
        <uni-list-chat :title="item.nickname" :avatar-list="arr" :avatar-circle="true" :avatar=item.photo
          v-for="(item, index) in arr" :key="index">
          <view class="chat-custom-right">
            <uni-icons v-if="!item.isExtend" type="minus" color="#999" size="18" @click="remove(item.id)"></uni-icons>
            <uni-icons v-else type="auth-filled" color="#999" size="18" @click="isadminstration()"></uni-icons>
          </view>
        </uni-list-chat>
      </div>
      <img v-else class="empty" src="http://139.159.210.77:1701/media/static/空状态成员列表.png" alt="">
    </uni-list>
  </div>
</template>

<style>
.main {
  overflow-y: scroll;
  height: 100vh;
}

.search {
  position: -webkit-sticky;
  /* Safari */
  position: sticky;
  top: 0;
  /* 元素吸顶时距离顶部的位置 */
  background-color: #fff;
  width: 100%;
  padding: 5px;
  box-sizing: border-box;
  z-index: 10;
}

.empty {
  width: 100vw;
}
</style>