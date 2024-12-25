<script setup>
import { ref, watch, onMounted } from 'vue'
import { useCounterStore } from '@/store/Login'
const loginMessage = useCounterStore()

const avatarList = ref([])
const searchValue = ref('')
const arr = ref([])

const id = ref() //团队ID
const name = ref() //团队名称
const managerId = ref() //管理员ID
//在onLoad函数中接收页面参数
import { onLoad } from '@dcloudio/uni-app'
onLoad(options => {
  id.value = options.id
  name.value = options.name
  managerId.value = options.managerId
})

//展示团队成员
const teamMate = () => {
  uni.request({
    url: `http://139.159.210.77:1701/teampersonal/members/${id.value}`,
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
  if (newValue != oldValue && newValue == ''){
    arr.value = avatarList.value.slice()
    handlePhotoUrl()
  }
  else if (newValue != oldValue && newValue != ''){
    arr.value = avatarList.value.filter(item => item.nickname.includes(newValue))
    handlePhotoUrl()
  }
});

const grant = (userid) => {
  const teamName = ref()
  uni.showModal({
    title: '是否将该成员设置为新节点的管理员？',
    content: '',
    confirmText: '确认',
    cancelText: '取消',
    success: async (res) => {
      if (res.confirm) {
        await uni.showModal({
          title: '请输入节点名称',
          content: '',
          editable: true,//是否显示输入框
          placeholderText: '请输入队伍或者部门名称',//输入框提示内容
          confirmText: '确认',
          cancelText: '取消',
        }).then(res => {
          if (res.confirm) {
            if (!res.content.trim()) {
              uni.$showMsg('请勿提交空数据！')
            } else {
              teamName.value = res.content
              uni.request({
                url: 'http://139.159.210.77:1701/team/grant',
                method: 'post',
                header: {
                  "Login-Type": "r6Vsr0",
                  "Token": loginMessage.token
                },
                data: {
                  "teamId": id.value,
                  "teamName": teamName.value,
                  "userId": userid
                },
                success: (res) => {
                  if (res.data.code === 2001) {
                    uni.redirectTo({
                      url: '/pages/loginPage'
                    });
                  }
                  if (res.data.code === 200) {
                    uni.navigateBack({});
                    uni.$showMsg('设置成功！')
                  } else if (res.data.code === 5005) {
                    uni.$showMsg('该成员已是其他节点的管理员！')
                  } else if (res.data.code === 1005) {
                    uni.$showMsg('无权限进行此操作！')
                  }
                },
                fail: (fail) => {
                  uni.$showMsg(fail.data.message)
                },
              })
            }
          }
        })

      }
    },

  });
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
      <uni-section v-if="!searchValue" title="团队成员" type="line" style="margin-bottom: 3px;">
      </uni-section>
      <div v-if="arr.length">
        <uni-list-chat :title="item.nickname" :avatar-list="arr" :avatar-circle="true" :avatar="item.photo"
          v-for="(item, index) in arr" :key="index" clickable @click="grant(item.userId)">
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