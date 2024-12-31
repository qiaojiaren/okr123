import { defineStore } from 'pinia';
import { ref } from 'vue'


export const useCounterStore = defineStore('counter', () => {
  //用户登录相关
  const token = ref('')

  const OkrcoreId = ref() //OKR内核ID

  const scene = ref('') //OKR场景

  const okrInformation = ref() //OKR详细信息

  const teamId = ref(0) //团队ID

  const teamname = ref('') //团队名称

  const priviledge = ref(true)//创建者权限

  const nickname = ref('')//创建者姓名

  const photo = ref('')//创建者头像

  const manage = ref(false)//管理权限

  const id = ref('')//登录者id


  //获取四象限信息
  const getOkrInformation = () => {
    uni.request({
      url: 'http://47.92.173.60:1701/core/search',
      method: 'POST',
      header: {
        "Login-Type": "r6Vsr0",
        "Token": token.value,
      },
      data: {
        "coreId": OkrcoreId.value,
        "scene": scene.value
      },
      success(res) {
        okrInformation.value = res.data.data
      }
    })
  }

  return { token, scene, OkrcoreId, okrInformation, getOkrInformation, teamId, teamname, priviledge, nickname, photo, id, manage }
},
  {
    // 配置持久化
    persist: {
      // 调整为兼容多端的API
      storage: {
        setItem(key, value) {
          uni.setStorageSync(key, value) // [!code warning]
        },
        getItem(key) {
          return uni.getStorageSync(key) // [!code warning]
        },
      },
    },
  },

);
