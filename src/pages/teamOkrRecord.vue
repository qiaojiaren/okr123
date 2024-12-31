<script setup>
import {readOnlyTree} from '@/components/readOnlyTree.vue'
import { ref, onMounted } from 'vue'
import { useCounterStore } from '@/store/Login'
const loginMessage = useCounterStore()

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

const teamId = ref()

//在onLoad函数中接收页面参数
import { onLoad } from '@dcloudio/uni-app'
onLoad(options => {
  teamId.value = options.teamId
})

//每次页面显示时，触发onShow函数
import { onShow } from '@dcloudio/uni-app'
onShow(() => {
  //获取团队所在的树
  uni.request({
    url: `http://47.92.173.60:1701/team/tree/${teamId.value}`,
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
</script>

<template>
  <div class="tree">
    <p class="smallTips">点击节点可查看团队OKR</p>
    <div class="tree-content" @touchstart.self="move" @touchmove.self="moving"
      :style="{ 'left': positionY + 'px', transform: 'scale(' + scale + ')' }">
      <readOnlyTree :tree-data="treeData" :tree-first="true"></readOnlyTree>
    </div>
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
