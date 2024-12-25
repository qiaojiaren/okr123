<script setup>
import { TreeItem } from '@/components/tree-item.vue'
import { ref, onMounted } from 'vue'
import { useCounterStore } from '@/store/Login'

const loginMessage = useCounterStore()

onMounted(() => {
  
  if (loginMessage.priviledge) {
    loginMessage.manage = true
  }
  else
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
        const teamMate = ref(res.data.data.filter(item => item.userId == loginMessage.id))
        console.log(teamMate.value[0].isExtend)

        if (teamMate)
          loginMessage.manage = true

        else
          loginMessage.manage = false
      }
    })
})

const treeData = ref([])

//将后端传过来的树结构转化成前端的树结构（使用递归）
//parentId = null 是函数 transformData 的参数默认值
//里的意思是如果调用 transformData 函数时没有传入 parentId 参数，则默认使用 null 作为 parentId 的取值
const transformData = (data, parentId = null) => {
  return data
    .filter(item => (parentId === null && !item.parentTeamId) || item.parentTeamId === parentId)
    .map(item => ({
      name: item.teamName,
      id: item.id,
      coreId: item.coreId,
      managerId: item.managerId,
      child: transformData(data, item.id)
    }));
}

//每次页面显示时，触发onShow函数
import { onShow } from '@dcloudio/uni-app'
onShow(() => {
  //获取团队所在的树
  uni.request({
    url: `http://139.159.210.77:1701/team/tree/${loginMessage.teamId}`,
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
      treeData.value = transformData(res.data.data)
      console.log('树结构');
      console.log(treeData.value);
    }
  })
})

const distance = ref(0)
const scale = ref(1)
const disX = ref(0)
const disY = ref(0)
const positionX = ref(0)
const positionY = ref(0)
const updata = ref(true)

// 双指触发开始计算出发时两个手指的坐标距离
const touchstartCallback = (e) => {
  // 单手指缩放开始，不做任何处理
  if (e.touches.length == 1) return;
  // 当两根手指放上去的时候，将距离(distance)初始化。
  let xMove = e.touches[1].clientX - e.touches[0].clientX;
  let yMove = e.touches[1].clientY - e.touches[0].clientY;
  //计算开始触发两个手指坐标的距离
  distance.value = Math.sqrt(xMove * xMove + yMove * yMove);
}

// 双指移动计算两个手指的坐标距离
const touchmoveCallback = (e) => {
  // 单手指缩放不做任何操作
  if (e.touches.length == 1) return;
  //双手指运动 x移动后的坐标和y移动后的坐标
  let xMove = e.touches[1].clientX - e.touches[0].clientX;
  let yMove = e.touches[1].clientY - e.touches[0].clientY;
  //双手指运动新的 ditance
  let newdistance = Math.sqrt(xMove * xMove + yMove * yMove);
  //计算移动的过程中实际移动了多少的距离
  let distanceDiff = newdistance - distance.value;
  let newScale = scale.value + 0.0001 * distanceDiff
  scale.value = newScale
  // 为了防止缩放得太大，所以scale需要限制，同理最小值也是
  if (newScale >= 5) {
    newScale = 5
    distance.value = newdistance
    scale.value = newScale
  }
  //为了防止缩放得太小，所以scale需要限制
  if (newScale <= 0.3) {
    newScale = 0.3
    distance.value = newdistance
    scale.value = newScale
  }

}

const move = (e) => {
  const odiv = e.currentTarget // 获取元素
  // 算出鼠标相对元素的位置
  if (e.touches.length == 2) return touchstartCallback(e)
  disX.value = e.touches[0].clientX - odiv.offsetLeft
  disY.value = e.touches[0].clientY - odiv.offsetTop
}

// 移动中
const moving = (e) => {
  if (e.touches.length == 2) return touchmoveCallback(e)
  // console.log(e)
  // 用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
  let left = e.touches[0].clientX - disX.value
  let top = e.touches[0].clientY - disY.value

  // 绑定元素位置到positionX和positionY上面
  positionX.value = top
  positionY.value = left
}

const pattern = ref({
  color: 'black',
  backgroundColor: '#FFFFFF',
  selectedColor: '#3694f3',
  buttonColor: '#3694f3'
})

const content = ref([
  {
    iconPath: 'http://139.159.210.77:1701/media/static/创建团队.png',
    text: '邀请成员',
  },
  {
    iconPath: 'http://139.159.210.77:1701/media/static/邀请加入团队.png',
    text: '查看成员',
  },
  {
    iconPath: 'http://139.159.210.77:1701/media/static/修改.png',
    text: '团队名称',
  },
])


const popup = ref(null)
const qrcode = ref('')
const trigger = (e) => {

  if (e.index == 0) {
    uni.request({
      url: `http://139.159.210.77:1701/team/qrcode/${loginMessage.teamId}`,
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
        if (res.data.data) {
          qrcode.value = "http://139.159.210.77:1701/" + res.data.data
          popup.value.open()
        }
        else {
          console.log(res.data.message)
          uni.showToast({
            title: res.data.message + "无权限查看",
            icon: 'none'
          })
        }
      },
      fail(fail) {
        uni.showToast({
          title: '获取二维码失败，请稍后重试',
          icon: 'none'
        })
      },
    })
  }

  else if (e.index == 1) {
    uni.navigateTo({
      url: '/pages/teamMate' // 跳转的页面路径
    });
  }

  else if (e.index == 2) {
    uni.showModal({
      title: '修改团队名称',
      content: '',
      editable: true,//是否显示输入框
      placeholderText: '请输入团队名称',//输入框提示内容
      confirmText: '确认',
      cancelText: '取消',
      success: (res) => {
        if (res.confirm) {
          const teamname = ref(res.content)
          if (!loginMessage.priviledge) {
            uni.$showMsg('团队管理者才能进行该操作')
            return
          }
          if (!res.content.trim()) {
            uni.$showMsg('请勿提交空数据！')
          } else {
            uni.request({
              url: 'http://139.159.210.77:1701/team/rename',
              method: 'post',
              header: {
                "Login-Type": "r6Vsr0",
                "Token": loginMessage.token
              },
              data: {
                "id": loginMessage.teamId,
                "teamName": res.content
              },
              success: (res) => {
                if (res.data.code === 2001) {
                  uni.redirectTo({
                    url: '/pages/loginPage'
                  });
                }
                if (res.data.message === "操作成功") {
                  loginMessage.teamname = teamname.value
                  uni.$showMsg('修改成功')
                  setTimeout(() => {
                    uni.redirectTo({ url: '/pages/myTeam' });
                  }, 500)
                }
                else {
                  uni.$showMsg('修改失败，请稍后重试')
                }

              },
            })
          }

        }
        else
          uni.$showMsg('取消修改')
      }
    })
  }
}

const close = (e) => {
  popup.value.close()
}

//保存二维码图片
const saveQRcode = () => {
  uni.getSetting({
    success: (res) => {
      if (res.authSetting['scope.writePhotosAlbum']) { //验证用户是否授权可以访问相册
        saveQRcodeToPhotosAlbum();
      } else {
        uni.authorize({
          scope: 'scope.writePhotosAlbum',
          success: (res) => {
            console.log('有授权的信息：', res);
            saveQRcodeToPhotosAlbum();
          },
          fail: (err) => { //取消授权后再获取授权，需手动设置
            uni.showModal({
              content: '检测到你没打开保存相册权限，是否去设置打开',
              confirmText: '确认',
              cancelText: '取消',
              success(res) {
                if (res.confirm) {
                  uni.openSetting({
                    success(res) {
                      console.log('授权成功');
                    }
                  })
                } else {
                  console.log('取消授权');
                }
              }
            })
          }
        })
      }
    }
  })
}

const saveQRcodeToPhotosAlbum = () => {
  uni.downloadFile({
    url: qrcode.value, // 图片的URL
    success: (downloadRes) => {
      uni.saveImageToPhotosAlbum({
        filePath: downloadRes.tempFilePath,
        success(res) {
          uni.showToast({
            title: '保存成功',
            icon: 'success'
          })
        },
        fail(err) {
          console.log(err);
        }
      })
    }
  })
}


</script>

<template>
  <div class="tree">
    <p class="smallTips">点击节点可查看团队OKR</p>
    <div class="tree-content" @touchstart.self="move" @touchmove.self="moving"
      :style="{ 'left': positionY + 'px', transform: 'scale(' + scale + ')' }">
      <TreeItem :tree-data="treeData" :tree-first="true"></TreeItem>
    </div>
    <!--二维码弹窗-->
    <uni-fab horizontal="right" vertical="bottom" direction="vertical" :content="content" :pattern="pattern"
      :popMenu="true" @trigger="trigger" />

    <uni-popup ref="popup" type="center" :mask="true" :mask-click="false">
      <view class="popup">
        <view class="icon-close">
          <uni-icons type="close" size="30" @click="close" color="#fff">
          </uni-icons>
        </view>
        <image :src="qrcode" mode="widthFix" class="QRcode"></image>
        <button type="primary" size="default" class="btn-savecode" @click="saveQRcode">保存邀请码</button>


      </view>
    </uni-popup>
  </div>
</template>

<style lang="scss" scoped>
.tree {
  min-height: 100vh;
  width: 100vw;
  position: relative;
  overflow: hidden;

  .tree-content {
    min-height: 90%;
    position: absolute;
    top: 0;
    left: 0;
    margin: auto;
    // transform: scale(0.5);
  }
}

.popup {
  width: 100%;

  .icon-close {
    display: block;
    text-align: right;
    margin-right: -60rpx;
  }

  .QRcode {
    width: 450rpx;
    display: block;
  }

  .btn-savecode {
    display: flex;
    margin: 20rpx 110rpx;
    border-radius: 50rpx;
    font-size: 40rpx;
    background-color: #0a7df2;

  }
}

.smallTips {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 99999;
  font-size: 26rpx;
  color: #999;
  margin: 0 0 0 10px;
}

</style>
