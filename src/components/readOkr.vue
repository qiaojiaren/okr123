<script setup>
import { ref } from 'vue';

//引入仓库
import { useCounterStore } from '@/store/Login'
const loginMessage = useCounterStore()

const cardshow1 = ref()
const cardshow2 = ref()
const cardshow3 = ref()
const cardshow4 = ref()
const cardshow5 = ref()

const showCard = (number) => {
  switch (number) {
    case 1:
      cardshow1.value.open()
      break
    case 2:
      cardshow2.value.open()
      break
    case 3:
      cardshow3.value.open()
      break
    case 4:
      cardshow4.value.open()
      break
  }
}

const backCurrent = (number) => {
  switch (number) {
    case 1:
      cardshow1.value.close()
      break
    case 2:
      cardshow2.value.close()
      break
    case 3:
      cardshow3.value.close()
      break
    case 4:
      cardshow4.value.close()
      break
    case 5:
      cardshow5.value.close()
      break
  }
}

const pattern = ref({
  color: 'black',
  backgroundColor: '#FFFFFF',
  selectedColor: '#3694f3',
  buttonColor: '#3694f3'
})

const content = ref([
  {
    iconPath: 'http://47.92.173.60:1701/media/static/查看总结.png',
    text: '查看总结',
  }
])

const trigger = () => {
  cardshow5.value.open()

}

</script>

<template>
  <!-- 创建OKR显示页面 -->
  <div>
    <img src="http://47.92.173.60:1701/media/static/右箭头.png" alt="" class="rightArrow">
    <img src="http://47.92.173.60:1701/media/static/上箭头.png" alt="" class="topArrow">
    <img src="http://47.92.173.60:1701/media/static/靶子.png" alt="" class="target">

    <div class="flexBox1">

      <!-- 第二象限已初始化小卡 -->
      <div class="leftTop2" v-if="loginMessage.okrInformation.secondQuadrantVO.deadline">
        <div class="container1">
          <p class="text">
            短期计划
          </p>

          <p class="text">
            P1：
          </p>
          <p class="text" v-for="item in loginMessage.okrInformation.secondQuadrantVO.priorityNumberOnes"
            :key="item.id">
            {{ item.content }}
          </p>

          <p class="text">
            P2：
          </p>
          <p class="text" v-for="item in loginMessage.okrInformation.secondQuadrantVO.priorityNumberTwos"
            :key="item.id">
            {{ item.content }}
          </p>
        </div>
        <div class="editButton yellow" @click="showCard(1)">查看</div>
      </div>

      <!-- 第二象限未初始化小卡 -->
      <div class="leftTop2" v-else>
        <div class="container1">
          <p class="text">
            短期计划
          </p>

          <p class="text">
            P1：优先级最高，必须要做的事情
          </p>

          <p class="text">
            P2：优先级次之，如果时间紧迫，宁愿不完成P2的任务，也要保证P1的任务完成
          </p>
        </div>
        <div class="editButton yellow" @click="showCard(1)">查看</div>
      </div>

      <!-- 第一象限已初始化小卡 -->
      <div class="rightTop1" v-if="loginMessage.okrInformation.firstQuadrantVO.objective">
        <div class="container1">
          <p class="text">
            目标：{{ loginMessage.okrInformation.firstQuadrantVO.objective }}
          </p>

          <p class="text">
            关键结果
          </p>
          <p class="text" v-for="item in loginMessage.okrInformation.firstQuadrantVO.keyResults" :key="item.id">
            {{ item.content }}（{{ item.probability }}%）
          </p>
        </div>
        <div class="editButton blue" @click="showCard(2)">查看</div>
      </div>

      <!-- 第一象限未初始化小卡 -->
      <div class="rightTop1" v-else>
        <div class="container1">
          <p class="title">
            目标
          </p>

          <p class="text">
            关键结果1（信心指数）
          </p>

          <p class="text">
            关键结果2（信心指数）
          </p>

          <p class="text">
            关键结果3（信心指数）
          </p>
        </div>
        <div class="editButton blue" @click="showCard(2)">查看</div>
      </div>

    </div>


    <div class="flexBox2">

      <!-- 第三象限已初始化小卡 -->
      <div class="leftBotton3" v-if="loginMessage.okrInformation.thirdQuadrantVO.deadline">
        <div class="container1">
          <p class="text">
            中长期规划
          </p>
          <p class="text" v-for="item in loginMessage.okrInformation.thirdQuadrantVO.actions" :key="item.id">
            {{ item.content }}
          </p>
        </div>
        <div class="editButton green" @click="showCard(3)">查看</div>
      </div>

      <!-- 第三象限未初始化小卡 -->
      <div class="leftBotton3" v-else>
        <div class="container1">
          <p class="text">
            中长期规划
          </p>
          <p class="text">
            在比短期计划的更长的执行周期中，为完成目标需要推进的事情，建议执行周期为四周。
          </p>
        </div>
        <div class="editButton green" @click="showCard(3)">查看</div>
      </div>


      <!-- 第四象限已初始化小卡 -->
      <div class="rightBotton4" v-if="loginMessage.okrInformation.fourthQuadrantVO.statusFlags.length">
        <div class="container1">
          <p class="text">
            状态指标
          </p>

          <div class="container" v-for="item in loginMessage.okrInformation.fourthQuadrantVO.statusFlags"
            :key="item.id">
            <p class="stateText">
              {{ item.label }}
            </p>
            <div class="circle"
              :class="{ circle1: item.color === '#000000', circle2: item.color === '#000001', circle3: item.color === '#000002' }">
            </div>
          </div>

        </div>
        <div class="editButton red" @click="showCard(4)">查看</div>
      </div>

      <!-- 第四象限未初始化小卡 -->
      <div class="rightBotton4" v-else>
        <div class="container1">
          <p class="text">
            状态指标
          </p>
          <p class="text">
            列出各种会影响目标完成的状态因素，比如客户关系、团队状态、系统状况等。
          </p>
          <p class="text">
            用三种颜色来标记各个因素的状态指标：绿色代表很好或正常，黄色代表有点不好，红色代表很不好。
          </p>
        </div>
        <div class="editButton red" @click="showCard(4)">查看</div>
      </div>

    </div>
  </div>

  <!-- 卡片编辑页面 -->

  <!-- 第一象限：目标与关键结果 -->
  <uni-popup ref="cardshow2" type="center">
    <div class="card2 blue color2">
      <div class="cardContainer">
        <h2 class="cardFont fontTitle">目标(截止时间：{{ loginMessage.okrInformation.firstQuadrantVO.deadline }})</h2>
        <p class="cardFont">
          {{ loginMessage.okrInformation.firstQuadrantVO.objective }}
        </p>

        <div v-for="item in loginMessage.okrInformation.firstQuadrantVO.keyResults" :key="item.id">
          <h2 class="cardFont fontTitle">关键结果：</h2>
          <p class="cardFont">
            {{ item.content }}
          </p>
          <h2 class="cardFont fontTitle">信心指数：</h2>
          <view>
            <slider :value=item.probability disabled="true" activeColor="rgb(41, 168, 211)" backgroundColor="#fff"
              block-color="rgb(41, 168, 211)" block-size="20" show-value />
          </view>
        </div>

      </div>
      <div class="backButton blue" @click="backCurrent(2)">返回</div>
    </div>
  </uni-popup>

  <uni-popup ref="cardshow5" type="center">
    <div class="card2 blue color2">
      <div class="cardContainer">
        <h2 class="cardFont fontTitle">完成度：</h2>
        <view>
          <slider :value=loginMessage.okrInformation.degree disabled="true" activeColor="rgb(41, 168, 211)"
            backgroundColor="#fff" block-color="rgb(41, 168, 211)" block-size="20" show-value />
        </view>
        <h2 class="cardFont fontTitle">总结：</h2>
        <p class="cardFont">
          {{ loginMessage.okrInformation.summary }}
        </p>

      </div>
      <div class="backButton blue" @click="backCurrent(5)">返回</div>
    </div>
  </uni-popup>

  <!-- 已初始化的第二象限：短期计划 -->
  <uni-popup ref="cardshow1" type="center">
    <div class="card1 yellow color1">
      <div class="cardContainer">
        <h2 class="cardFont fontTitle">短期计划</h2>
        <h2 class="cardFont fontTitle">截止时间：{{ loginMessage.okrInformation.secondQuadrantVO.deadline }}</h2>
        <h2 class="cardFont fontTitle">P1：</h2>
        <div class="planYellowContent" v-for="item in loginMessage.okrInformation.secondQuadrantVO.priorityNumberOnes"
          :key="item.id">
          <label class="radio">
            <checkbox value="r2" color="rgb(242, 177, 73)" :checked=item.isCompleted :disabled=true />
            {{ item.content }}
          </label>
          <img class="deleteState" src="http://47.92.173.60:1701/media/static/黄色叉叉.png" alt=""
            @click="planDelete(1, item.id)">
        </div>

        <h2 class="cardFont fontTitle">P2：</h2>
        <div class="planYellowContent" v-for="item in loginMessage.okrInformation.secondQuadrantVO.priorityNumberTwos"
          :key="item.id">
          <label class="radio">
            <checkbox value="r2" color="rgb(242, 177, 73)" :checked=item.isCompleted :disabled=true />
            {{ item.content }}
          </label>
        </div>
      </div>
      <div class="backButton yellow" @click="backCurrent(1)">返回</div>
    </div>
  </uni-popup>

  <!-- 已初始化第三象限：中长期规划 -->
  <uni-popup ref="cardshow3" type="center">
    <div class="card3 color3 green">
      <div class="cardContainer">
        <h2 class="cardFont fontTitle">中长期规划</h2>
        <h2 class="cardFont fontTitle">截止时间：{{ loginMessage.okrInformation.thirdQuadrantVO.deadline }}</h2>
        <div class="planGreenContent" v-for="item in loginMessage.okrInformation.thirdQuadrantVO.actions"
          :key="item.id">
          <label class="radio">
            <checkbox value="r2" color="rgb(41, 200, 179)" :checked=item.isCompleted :disabled=true />{{ item.content }}
          </label>
        </div>

      </div>
      <div class="backButton green" @click="backCurrent(3)">返回</div>
    </div>
  </uni-popup>

  <!-- 第四象限：状态指标 -->
  <uni-popup ref="cardshow4" type="center">
    <div class="card4 color4 red">
      <div class="cardContainer">

        <div class="stateContent" v-for="item in loginMessage.okrInformation.fourthQuadrantVO.statusFlags"
          :key="item.id">
          <span class="stateFont">{{ item.label }}</span>
          <div class="circleBox">
            <div class="circle1" :class="{ circleActive: item.color === '#000000' }"
              @click="updateColor(item.label, item.id, 0)"></div>
            <div class="circle2" :class="{ circleActive: item.color === '#000001' }"
              @click="updateColor(item.label, item.id, 1)"></div>
            <div class="circle3" :class="{ circleActive: item.color === '#000002' }"
              @click="updateColor(item.label, item.id, 2)"></div>
          </div>
        </div>

      </div>
      <div class="backButton red" @click="backCurrent(4)">返回</div>
    </div>
  </uni-popup>

  <!-- 悬浮按钮 -->
  <uni-fab horizontal="left" vertical="bottom" direction="vertical" :content="content" :pattern="pattern"
    :popMenu="true" @trigger="trigger" v-if="loginMessage.okrInformation.isOver" />
</template>

<style scoped>
.flexBox1 {
  margin-top: 3vh;
  display: flex;
  justify-content: space-around;
  height: 50vh;
}

.flexBox2 {
  margin-bottom: 3vh;
  display: flex;
  justify-content: space-around;
  height: 44vh;
}

.rightTop1 {
  position: relative;
  box-sizing: border-box;
  width: 40vw;
  height: 44vh;
  background-color: rgb(255, 255, 255);
  border: rgb(0, 0, 0) solid 1px;
  color: rgb(41, 168, 211);
  font-size: 16px;
  padding: 10px;
  font-weight: 700;
  box-shadow: 8px 8px 4px rgba(0, 0, 0, 0.2);
}

.leftTop2 {
  position: relative;
  box-sizing: border-box;
  width: 40vw;
  height: 44vh;
  background-color: rgb(255, 255, 255);
  border: rgb(0 ,0 ,0) solid 1px;
  padding: 10px;
  color: rgb(223, 175, 97);
  font-size: 16px;
  font-weight: 700;
  box-shadow: 8px 8px 4px rgba(0, 0, 0, 0.2);

}

.container1 {
  height: 33vh;
  width: 100%;
  overflow-y: auto;
}

.editButton {
  position: absolute;
  right: 5px;
  bottom: 5px;
  width: 60px;
  height: 25px;
  background-color: #fff;
  font-size: 12px;
  text-align: center;
  line-height: 25px;
  border-radius: 5px;
  overflow-y: auto;
}

.backButton {
  position: absolute;
  right: 10px;
  bottom: 10px;
  width: 90px;
  height: 30px;
  background-color: #fff;
  font-size: 14px;
  text-align: center;
  line-height: 30px;
  border-radius: 5px;
  overflow-y: auto;
}

.addButton {
  position: absolute;
  right: 110px;
  bottom: 10px;
  width: 90px;
  height: 30px;
  background-color: #fff;
  font-size: 14px;
  text-align: center;
  line-height: 30px;
  border-radius: 5px;
  overflow-y: auto;
}

.buttonCotainer {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  height: 10%;
}

.firstQButton {
  height: 30px;
  background-color: #fff;
  font-size: 14px;
  text-align: center;
  line-height: 30px;
  border-radius: 5px;
}

.longButton {
  width: 90px;
}

.middleButton {
  width: 75px;
}

.shortButton {
  width: 55px;
}

.red {
  border: rgb(231, 163, 137) solid 2px;
}

.yellow {
  border: rgb(223, 175, 97) solid 2px;
}

.blue {
  border: rgb(41, 168, 211) solid 2px;
}

.green {
  border: rgb(102, 208, 193) solid 2px;
}

.text {
  margin-bottom: 10px;
  /* 文本内容下方留出一定的距离 */
}

.leftBotton3 {
  position: relative;
  box-sizing: border-box;
  width: 40vw;
  height: 44vh;
  background-color: rgb(255, 255, 255);
  border: rgb(0, 0, 0) solid 1px;
  padding: 10px;
  color: rgb(102, 208, 193);
  font-size: 16px;
  font-weight: 700;
  box-shadow: 8px 8px 4px rgba(0, 0, 0, 0.2);
}

.rightBotton4 {
  position: relative;
  box-sizing: border-box;
  width: 40vw;
  height: 44vh;
  background-color: rgb(255, 255, 255);
  border: rgb(0, 0, 0) solid 1px;
  border-radius: 6px;
  padding: 10px;
  color: rgb(231, 163, 137);
  font-size: 16px;
  font-weight: 700;
  box-shadow: 8px 8px 4px rgba(0, 0, 0, 0.2);
}

.container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin: 5px 0;
}

.stateText {
  line-height: 20px;
  width: 80%;
}

.circle1,
.circle2,
.circle3 {
  width: 15px;
  height: 15px;
  border-radius: 50%;
}

.circle1 {
  background-color: green;
}

.circle2 {
  background-color: yellow;
}

.circle3 {
  background-color: red;
}

.rightArrow {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 95vw;
  height: 5vh;
}

.topArrow {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 6vw;
  height: 95vh;
}

.target {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 10vw;
  height: 10vw;
}

.card1,
.card2,
.card3,
.card4 {
  box-sizing: border-box;
  position: fixed;
  top: 5vh;
  left: 50vw;
  transform: translate(-50%);
  z-index: 9999999;
  width: 85vw;
  height: 90vh;
  /* 圆角属性 */
  border-radius: 10px;
  /* 盒子阴影 */
  box-shadow: 3px 3px 15px #535353;
  color: white;
  overflow-y: auto;
  font-weight: 700;
}

.card1 {
  color: rgb(223, 175, 97);
}

.card2 {
  color: rgb(41, 168, 211);
  padding: 15px;
}

.card3 {
  color: rgb(102, 208, 193);
}

.card4 {
  padding: 15px 0 0 0;
  color: rgb(231, 163, 137);
}

.cardContainer {
  height: 90%;
  width: 100%;
  overflow-y: auto;
}

.color1 {
  background-color: rgb(253, 250, 219);
}

.color2 {
  background-color: rgb(227, 246, 253);
}

.color3 {
  background-color: rgb(222, 251, 247);
}

.color4 {
  background-color: rgb(255, 234, 221);
}

.cardFont {
  margin: 10px;
}

.fontTitle {
  font-size: 20px;
}

.stateContent,
.planYellowContent,
.planGreenContent {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  margin: 0 auto 10px;
  width: 92%;
  padding: 10px 0;
  box-shadow: 3px 3px 7px #787878;
  border-radius: 10px;
}

.stateContent {
  justify-content: space-evenly;
  color: rgb(231, 163, 137);
  background-color: rgb(248, 242, 237);
}

.planYellowContent {
  justify-content: space-between;
  color: rgb(223, 175, 97);
  background-color: rgb(254, 252, 238);
  padding: 10px 10px;
}

.planGreenContent {
  justify-content: space-between;
  color: rgb(102, 208, 193);
  background-color: rgb(242, 253, 251);
  padding: 10px 10px;
}

.circleBox {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 40%;
}

.stateFont {
  width: 30%;
}

.deleteState {
  width: 20px;
  height: 20px;
}

.radio {
  max-width: 90%;
}

.circleActive {
  border: rgb(231, 163, 137) 3px solid;
}
</style>