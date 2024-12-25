<script setup>
import {readOnlyTree} from './readOnlyTree.vue'
import { ref } from 'vue'

import { useCounterStore } from '@/store/Login'
const loginMessage = useCounterStore()

// props 对象是用来定义组件属性的，让组件能够接收来自父组件的数据并在内部使用
const props = defineProps({
  treeData: {
    type: Array,
    default: () => []
  },
  treeFirst: {
    type: Boolean,
    default: false
  }
})

const addChild = (id, name, managerId) => {
  uni.navigateTo({
    url: `/pages/grantPage?id=${id}&name=${name}&managerId=${managerId}` // 跳转的页面路径
  });
  uni.showModal({
    title: '请选择新节点的管理员！',
    editable: false,//是否显示输入框
    confirmText: '确认',
    showCancel: false
  });
}

const teamOKR = coreId => {
  loginMessage.OkrcoreId = coreId
  loginMessage.scene = 'scene-t'
  loginMessage.getOkrInformation()
  uni.navigateTo({
    url: `/pages/searchOkr?coreId=${coreId}` // 跳转的页面路径
  });
}
</script>

<template>
  <view class="card">
    <view class="ul">
      <view class="li" v-for="(item, index) in treeData" :key="index">
        <view class="item" :class="{ 'line-left': index !== 0, 'line-right': index != treeData.length - 1 }">
          <view class="item-name" :class="{ 'line-bottom': item.child && item.child.length > 0, 'line-top': !treeFirst }"
            @click="teamOKR(item.coreId)">
            <view class="box">
              <view class="middle">{{ item.name }}</view>
            </view>
            <view class="plus"></view>
          </view>
        </view>
        <readOnlyTree v-if="item.child && item.child.length > 0" :tree-data="item.child" />
      </view>
    </view>
  </view>
</template>


<style lang="scss" scoped>
$line-length: 20px; //线长
$spacing: 20px; //间距
$extend: calc(#{$spacing} + 2px); //延长线

// 线样式
@mixin line {
  content: "";
  display: block;
  width: 3px;
  height: $line-length;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  background: rgb(6, 183, 253);
}

// 加减号icon
@mixin icon {
  position: absolute;
  border: solid 1px black;
  border-radius: 100%;
  bottom: -5px;
  width: 12px;
  height: 12px;
  line-height: 10px;
  text-align: center;
  color: black;
  z-index: 100;
  cursor: pointer;
  margin: 0;
  padding: 0;
  // opacity: 0;
}

.card {
  .ul {
    display: flex;
    justify-content: center;

    .li {
      .item {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;

        &-name {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100px;
          height: 50px;
          padding: 5px;
          margin: $spacing;
          background: rgb(142, 197, 252);
          color: #ffffff;

          .box{
          width: 100px;
          height: 50px;
          background: rgb(142, 197, 252);
          color: #ffffff;
          display: flex;
          justify-content: center;
          align-items: center;

          .middle{
            max-width: 100%;
            max-height: 100%;
            margin: auto;
            overflow: auto;
          }
          }


          .plus {
            &:hover {
              opacity: 100%;
            }
          }

          .reduce {
            @include icon();
            top: -5px;

            &:hover {
              opacity: 100%;
            }
          }
        }
      }
    }

  }

  // 向下的线
  .line-bottom {
    &::after {
      @include line();
      bottom: -$line-length;
    }
  }

  // 向上的线
  .line-top {
    &::before {
      @include line();
      top: -$line-length;
    }
  }

  // 向左的线
  .line-left {
    &::after {
      @include line();
      width: calc(50% + #{$spacing});
      height: 3px;
      left: calc(-50% - #{$extend});
      top: 0;
    }
  }

  // 向右的线
  .line-right {
    &::before {
      @include line();
      width: calc(50% + #{$spacing});
      height: 3px;
      right: calc(-50% - #{$extend});
      top: 0;
    }
  }
}
</style>
  
