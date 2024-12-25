<script setup>
import { ref, onBeforeUnmount } from 'vue';

//点击图片查看大图
const previewImage = flag => {
  switch (flag) {
    case 1:
      //图片预览API
      uni.previewImage({
        //urls为图片路径，是字符串数组
        urls: ["http://139.159.210.77:1701/media/static/OKR模板.png"],
      });
      break
    case 2:
      uni.previewImage({
        //urls为图片路径，是字符串数组
        urls: ["http://139.159.210.77:1701/media/static/OKR案例.png"],
      });
      break
    case 3:
      uni.previewImage({
        //urls为图片路径，是字符串数组
        urls: ["http://139.159.210.77:1701/media/static/树状图示例.png"],
      });
      break
  }
}

//立方体
const isAnimating = ref(false);
const isNoAnimation = ref(false);
const startX = ref(0);
const startY = ref(0);
const dx = ref(0);
const dy = ref(0);
let timeoutId = null;

const handleTouchStart = (e) => {
  isAnimating.value = true;
  startX.value = e.touches[0].clientX;
  startY.value = e.touches[0].clientY;
};

const handleTouchMove = (e) => {
  isNoAnimation.value = true;
  const currentX = e.touches[0].clientX;
  const currentY = e.touches[0].clientY;
  dx.value = -(currentY - startY.value);
  dy.value = currentX - startX.value;
};

const handleTouchEnd = () => {
  isAnimating.value = false;
  if (isNoAnimation.value) {
    timeoutId = setTimeout(() => {
      isNoAnimation.value = false;
    }, 5000); // 延迟5秒
  }
};

onBeforeUnmount(() => {
  clearTimeout(timeoutId);
});


//卡片显示答案
const squazeShow = ref(true) //立方体的显示和隐藏
const teamIf = ref()
const whyIf = ref()
const howIf = ref()
const errorsIf = ref()
const personalIf = ref()
const whatIf = ref()

const handleClose = number => {
  switch (number) {
    case 1:
      squazeShow.value = true
      teamIf.value.close()
      break
    case 2:
      squazeShow.value = true
      whyIf.value.close()
      break
    case 3:
      squazeShow.value = true
      howIf.value.close()
      break
    case 4:
      squazeShow.value = true
      errorsIf.value.close()
      break
    case 5:
      squazeShow.value = true
      personalIf.value.close()
      break
    case 6:
      squazeShow.value = true
      whatIf.value.close()
      break
  }
}

const team = () => {
  squazeShow.value = false
  teamIf.value.open()
};

const why = () => {
  squazeShow.value = false
  whyIf.value.open()
};

const how = () => {
  squazeShow.value = false
  howIf.value.open()
};

const okrErrors = () => {
  squazeShow.value = false
  errorsIf.value.open()
};

const personalOkr = () => {
  squazeShow.value = false
  personalIf.value.open()
};

const what = () => {
  squazeShow.value = false
  whatIf.value.open()
};
</script>

<template>
  <uni-popup ref="teamIf" type="center" :is-mask-click=false>
    <div class="card teamCard" @click="handleClose(1)">
      <h1 class="answerTitle">OKR案例</h1>
      <p class="tips">点击卡片任意位置可关闭 上下划动查看完整答案</p>
      <p style="text-indent: 2em;" class="text">
        两个喜欢喝茶的美国年轻人汉娜和杰克发现餐厅里只有好喝的咖啡，但是很少有好喝的茶。于是他们创办了一家公司，想让喜欢喝茶的人，能够随时喝到来自优质茶农的便宜好喝的好茶。这个好创意让他们拉到了首笔投资，但两人之间的分歧和日常管理上的问题让公司差点儿破产。他们制定了OKR（如下图），最终在
        OKR 工作法的指导下，公司成功走出困境，融到了第二轮投资，从此业务蒸蒸日上。
      </p>
      <p class="tips">点击图片可查看大图</p>
      <img style="width: 100%;" src="http://139.159.210.77:1701/media/static/OKR案例.png" alt=""
        @click.stop="previewImage(2)">
    </div>
  </uni-popup>

  <uni-popup ref="whyIf" type="center" :is-mask-click=false>
    <div class="card whyCard" @click="handleClose(2)">
      <h1 class="answerTitle">为什么要使用OKR？</h1>
      <p class="tips">点击卡片任意位置可关闭 上下划动查看完整答案</p>
      <p style="text-indent: 2em;" class="text">
        “设立目标然后实现目标”无论对个人还是组织都非常重要。
      </p>
      <p style="text-indent: 2em;" class="text">
        但我们发现，传统的计划表、日程表很难激发人们的信念感与使命感，常常导致计划一拖再拖、目标不了了之。</p>
      <p style="text-indent: 2em;" class="text">
        但OKR工作法（Objectives and Key Results），以一个专业且成熟的目标管理体系，让人们养成制定目标以及计划的习惯，同时也帮助人们建立目标意识，提升信念感与使命感。
      </p>
      <p style="text-indent: 2em;" class="text">
        传统学院派给不了让团队高产出的目标，传统的方法只会“诱导”人们降低目标的下限，而OKR努力让团队挑战极限，并把所有精力都聚焦在突破目标上。OKR这类方法不是为了确定企业最有可能达成的一个目标，而是为了识别有可能完成的最大目标。OKR把有挑战鼓舞人心的想法和量化的关键结果结合在一起，让团队成员都清楚阶段性的目标挑战。这样团队中的每个人都能清晰地知道他们该努力的方向，明白怎么分配自己的时间，这是制胜的关键。
      </p>
    </div>
  </uni-popup>

  <uni-popup ref="howIf" type="center" :is-mask-click=false>
    <div class="card howCard" @click="handleClose(3)">
      <h1 class="answerTitle">避开OKR常见的坑</h1>
      <p class="tips">点击卡片任意位置可关闭 上下划动查看完整答案</p>
      <p class="contentTitle">导致OKR失败的常见错误</p>
      <p class="contentTitle">1、设置了多个目标</p>
      <p style="text-indent: 2em;" class="text">如果希望OKR清晰到公司里的每个人都把它深深地印在脑海里，那就尝试只设置一个目标。如果你设置了5个目标，所有人都不会记得公司的目标到底是什么。
      </p>
      <p class="contentTitle">2、设置的OKR周期过短 —— 一周或者一个月</p>
      <p style="text-indent: 2em;" class="text">
        如果你不能连续追踪OKR一周以上，那么你可能还没有准备好使用OKR。毕竟，一周之内能做什么真正有挑战的事情呢？如果一个目标可以在一周内完成，它顶多算一个任务。</p>
      <p class="contentTitle">3、用绩效指标来驱动目标的完成</p>
      <p style="text-indent: 2em;" class="text">
        当绩效考核驱动目标而不是目标驱动业务绩效时，目标就是为了年度评估而创建的。在工作中，特别是在大型企业中，2/3
        的人认为除了工资，他们跟公司几乎没什么关系。而最有力的激励和满足感的来源已经从许多大组织中消失，这都可以“归功”于他们的管理系统，让员工不得不优先关注他们自己和小团队的利益。要想通过OKR方法最大化地实现目标，切勿把它和绩效评估挂钩。
      </p>
      <p class="contentTitle">4、没有追踪信心指数的变化</p>
      <p style="text-indent: 2em;" class="text">
        在进入季度的最后一个月时，突然意识到忘记关注OKR了，这是最糟糕的结果。及时关注信心指数，在获取新信心的同时要标记变化。提醒团队他们的信心等级已经在5停留很久了，经常主动询问团队成员是否需要帮助。
      </p>
      <p class="contentTitle">无法达成目标的5个关键因素</p>
      <p class="contentTitle">因素1：没有给目标设置优先级</p>
      <p style="text-indent: 2em;" class="text">
        有句老话说：“如果所有事情都同等重要，就意味着它们也同等不重要。”我们常常会有很多目标，这些目标看起来都很重要，都有必要去实现。但如果要求你必须把这些目标定个等级，你可能会把它们按照重要性排序。一旦你把它们排好序，然后一次选择做一件事，那么目标完成的概率将大得多。
      </p>
      <p style="text-indent: 2em;" class="text">
        公司目标管理也会有类似情况。公司拥有很多员工，所以很容易认为可以同时推进更多目标。但现实是，运营一家公司本身就有众多日常事务，每天员工都有常规的工作内容：处理订单、搞定客户、留意设备运行状况等。要求员工在做好常规的事情之外，再完成好几个目标，几乎是不可能的。
      </p>
      <p style="text-indent: 2em;" class="text">设定一个单一的目标，用三个关键结果来衡量它，这样尽管其他事情会让你分心，但你依然可以聚焦在重要的事情上，并可能获得不错的成果。</p>
      <p class="contentTitle">因素2：缺乏充分沟通，导致没能准确理解目标</p>
      <p style="text-indent: 2em;" class="text">
        如果希望团队能聚焦在重要的事情上，你就必须每天和团队不停地沟通目标。但仅仅聊一聊还不够，必须把目标渗透到企业运营的每个角落。目标完成的进度必须在每周会议和邮件中汇报，分解出的项目任务必须能支撑目标的达成，如果设定了目标，后面不持续跟进，结果注定是失败的。
      </p>
      <p style="text-indent: 2em;" class="text">
        周一会议上所有人明确并且承担好各自的责任，再通过每周的OKR状态邮件以及周五的庆祝活动不断重复阶段性目标，保证目标时刻在大家心中，并贯穿所有的工作。</p>
      <p class="contentTitle">因素3：没有做好计划</p>
      <p style="text-indent: 2em;" class="text">一旦必须要完成一些事情的时候，很多人认为只要有意志就没问题了，坚持执行就会有好结果。</p>
      <p style="text-indent: 2em;" class="text">
        这种观点正确吗？错！就拿健身、减肥来说，多数人只是想想而已，三天都很难坚持，其实找个私人教练或者买个体重秤比所谓的意志力管用多了，人类的意志力和坚持的决心远远没有那么强大。罗伊·鲍迈斯特在1996年的一个著名研究表明，被禁吃萝卜和被禁吃巧克力饼干的人，前者比后者在解决数学难题上的概率高出两倍，看来不吃萝卜不需要太大的意志力。但是在一整天持久地工作、开会、收发邮件后，一块蛋糕能超越任何人的意志。
      </p>
      <p style="text-indent: 2em;" class="text">
        事实上，你也需要一个目标管理系统来帮助你一直记得重要的事情，让你在疲劳的时候依然能保持在运行轨道上，OKR体系体系是围绕目标展开的——承担、庆祝与盘点，在你更想吃饼干的时候，还能确保你继续朝着你的目标推进。</p>
      <p class="contentTitle">因素4：没有把时间花在重要的事情上</p>
      <p style="text-indent: 2em;" class="text">
        重要——紧急矩阵是一种常见的时间管理工具，多数人能排除不重要也不紧急的事情，却很难摆脱不重要的紧急事务，人们通常会选择去做紧急的事，不管是重要的还是不重要的，因为我们对时间的压力太敏感了。</p>
      <p style="text-indent: 2em;" class="text">没有什么比明确的期限更让人振奋。保证每周一为了目标而努力工作，让自己对目标的推进负责。</p>
      <p class="contentTitle">因素5：轻易放弃</p>
      <p style="text-indent: 2em;" class="text">第一次实施OKR很有可能失败，但失败的原因可能各有不同。</p>
      <p style="text-indent: 2em;" class="text">
        有的公司发现他们的关键结果都完成了，是因为大家都故意放水，隐藏实力，把目标设定得太低了。这类公司太害怕失败了，从来不知道给自己一次挑战的机会，在下一个周期的OKR中，他们必须要往前推进。</p>
      <p style="text-indent: 2em;" class="text">有的公司可能完全相反，没有人完成他们的关键结果，因为他们设定的期望过高，却没有能力实现。这类公司是自欺欺人，他们需要通过OKR认清自己的实力。
      </p>
      <p style="text-indent: 2em;" class="text">最常见的失败是没有坚持跟进目标。我见过许多公司设定完OKR后就没事了，直到本季度的最后一周，他们才惊讶地发现所有事情没有任何进展。</p>
      <p style="text-indent: 2em;" class="text">
        而成功实施OKR的企业都有相同的特点：失败后不断尝试。成功唯一的希望是反复尝试，这并不是一味盲目地尝试同样的事情，而是应该密切追踪哪些事情对目标的推进是有效的、哪些是无效的；要多做有效的事情、少做无效的事情，要不断地学习，吸取教训。
      </p>

    </div>
  </uni-popup>

  <uni-popup ref="errorsIf" type="center" :is-mask-click=false>
    <div class="card errorsCard" @click="handleClose(4)">
      <h1 class="answerTitle">OKR怎么用？</h1>
      <p class="tips">点击卡片任意位置可关闭 上下划动查看完整答案</p>
      <p style="text-indent: 2em;" class="text">
        一个完整的OKR目标由四个象限组成，每个象限都有不同的内容，制定OKR其实就是明确四个象限内容的过程。
        （说明：第一象限是右上角象限，第二象限是左上角象限，第三象限是左下角象限，第四象限是右下角象限）
      </p>
      <p class="tips">点击图片可查看大图</p>
      <img style="width: 100%;" src="http://139.159.210.77:1701/media/static/OKR模板.png" alt=""
        @click.stop="previewImage(1)">
      <p class="contentTitle">第一象限</p>
      <p class="contentTitle">
        目标
      </p>
      <p style="text-indent: 2em;" class="text">目标应该简短易记，直接而又极具鼓舞性，并且像纲领一样极具指导性。</p>
      <p class="contentTitle">目标设定的3个原则：</p>
      <p class="contentTitle">原则 1：目标要明确方向并且鼓舞人心</p>
      <p style="text-indent: 2em;" class="text">
        好的目标能让人大清早从床上兴奋地跳起来。虽然首席执行官和投资人也许只有看到3%的增长率时才会如此开心，但大多数人因为事情的意义或者取得了进步就会感到兴奋。因此要使用团队的语言，如果他们想用简单粗暴的语言，比如“拿下它”或“干掉它”，目标里也可以有这样的字眼。
      </p>
      <p class="contentTitle">原则 2：目标要有时间期限</p>
      <p style="text-indent: 2em;" class="text">比如，一个月或者一个季度可以完成。要让团队明确地朝目标冲刺，如果需要一年，那么你的目标很可能是一个战略或者使命了。</p>
      <p class="contentTitle">原则 3：由独立的团队来执行目标</p>
      <p style="text-indent: 2em;" class="text">对于创业公司来说这不是问题，但是对一些大公司，由于相互依赖的关系反而会比较吃力。</p>
      <p style="text-indent: 2em;" class="text">目标更像一个使命宣言，只是周期更短一些。好的目标能够激励团队斗志，它看起来会比较难以实现，但是仍然有希望在设定的时间内由指定的团队独立达成。
      </p>
      <p class="contentTitle">关键结果与信心指数</p>
      <p class="contentTitle">关键结果</p>
      <p style="text-indent: 2em;" class="text">
        关键结果要使用那些振奋人心的语言并且需要量化。你可以通过问一个简单的问题来确立它们，即“如何确定目标是否达成”，这也会让你定义出“真棒”“干掉它”“拿下它”的真正含义。通常有三个关键结果，它们基于可以量化的任何条件，比如：用户增长、用户激活、收入增长、产品性能等。如果明智地选择出关键结果，可以使增长与性能、收入与质量这样的结果得到平衡。
      </p>
      <p class="contentTitle">信心指数</p>
      <p style="text-indent: 2em;" class="text">每个关键结果后会跟上一个信心指数，用于描述该关键结果可能被完成的概率。</p>
      <p style="text-indent: 2em;" class="text">我们起初可以给关键结果设定一个
        50%的信心指数，这表示“我有50%的把握达成该关键结果”；10%表示“一点儿戏都没有”；100%表示“这个能搞定”，但同时也意味着这个目标设定得太低了，很有可能是设定目标时故意隐藏了实力。如果公司面对失败的方式是惩罚，员工很快就学会不去尝试；如果想做成一些有挑战的事情，就必须保证即使失败了也不会被惩罚。
      </p>
      <p style="text-indent: 2em;" class="text">
        设定关键结果的时候，要给自己和团队找好定位，我们是想推动团队意识到公司正在做一件有挑战的事情，而不是不可能完成的事情。我认为一开始就正视50%的失败就是最好的定位。</p>
      <p style="text-indent: 2em;" class="text">
        看看你的关键结果，如果你内心觉得它们很有趣，想着“我们真的要把所有的力气花在这些事上”，那么你可能就正确地设定了关键结果；如果想着“我们死定了”，那就说明关键结果设定得太难了；如果想着“我只要稍微努把力就可以完成”，那可能就是设定得太简单了。
      </p>
      <p class="contentTitle">区分目标和关键结果</p>
      <p style="text-indent: 2em;" class="text">以下是几个好的目标：</p>
      <p style="text-indent: 2em;" class="text">▪ 拿下南湾地区的咖啡直销零售市场！</p>
      <p style="text-indent: 2em;" class="text">▪ 推出一个很棒的最小化可行产品(MVP)。</p>
      <p style="text-indent: 2em;" class="text">▪ 改变帕洛阿尔托地区的优惠券使用习惯！</p>
      <p style="text-indent: 2em;" class="text">▪ 完成一轮融资。</p>
      <p style="text-indent: 2em;" class="text">下面则是几个不太好的目标：</p>
      <p style="text-indent: 2em;" class="text">▪ 销售额提升30%。</p>
      <p style="text-indent: 2em;" class="text">▪ 用户增加一倍。</p>
      <p style="text-indent: 2em;" class="text">▪ B系列产品收入增加到500万美元。</p>
      <p style="text-indent: 2em;" class="text">
        为什么这些是不太好的目标？因为它们实质上是关键结果。目标应该简短易记，直接而又极具鼓舞性，并且像纲领一样极具指导性，避免出现类似于“提升30%”、“增加一倍”等量词，这些量词常用于关键结果中，来衡量目标是否达成。</p>
      <p class="contentTitle">两个例子</p>
      <p style="text-indent: 2em;" class="text">目标：推出一个很棒的MVP。</p>
      <p style="text-indent: 2em;" class="text">关键结果 1：40%的用户在一周以内访问量增加两倍。</p>
      <p style="text-indent: 2em;" class="text">关键结果 2：净推荐值达到8分。</p>
      <p style="text-indent: 2em;" class="text">关键结果 3：15%的转化率。</p>
      <p style="text-indent: 2em;" class="text">目标：产品性能达到知名公司的标准。</p>
      <p style="text-indent: 2em;" class="text">关键结果 1：99.8%的产品正常运行率。</p>
      <p style="text-indent: 2em;" class="text">关键结果 2：小于1秒的响应时间。</p>
      <p style="text-indent: 2em;" class="text">关键结果 3：在用户看来，产品加载都是瞬间完成的（由调查来决定，90%的用户表示页面加载为“立即”）。</p>
      <p class="contentTitle">第二象限</p>
      <p style="text-indent: 2em;" class="text">短期计划：列出3~4件最重要的事情，并设置截止时间（建议执行周期为一周），只有在截止时间前完成了这几件事情，目标才能向前推进。</p>
      <p style="text-indent: 2em;" class="text">明确这些事情的优先级：P1的优先级最高，表示必须要完成的事情，P2的优先级次之，如果时间紧迫，宁愿不完成P2的任务，也要保证P1的任务完成。
      </p>
      <p class="contentTitle">第三象限</p>
      <p style="text-indent: 2em;" class="text">中长期规划：在比短期计划的更长的执行周期中，为完成目标需要推进的事情，建议执行周期为四周。</p>
      <p class="contentTitle">第四象限</p>
      <p style="text-indent: 2em;" class="text">
        列出各种会影响目标完成的状态因素，比如客户关系、团队状态、系统状况等。并用三种颜色来标记各个因素的状态指标：绿色代表很好或正常，黄色代表有点不好，红色代表很不好。</p>
      <p style="text-indent: 2em;" class="text">当这些状态指标异常时，马上找出应对方案，确保OKR不受影响。</p>

    </div>
  </uni-popup>

  <uni-popup ref="personalIf" type="center" :is-mask-click=false>
    <div class="card personalCard" @click="handleClose(5)">
      <h1 class="answerTitle">小程序使用指南</h1>
      <p class="tips">点击卡片任意位置可关闭 上下划动查看完整答案</p>
      <p style="text-indent: 2em;" class="text">
        创建新OKR目标时，需要选择OKR目标的执行周期（第一象限），并设置中长期规划（第三象限）与短期计划（第二象限）的执行周期，但限制条件是OKR目标执行周期 > 中长期规划周期 > 短期计划周期（第一象限 > 第三象限 >
        第二象限）。
      </p>
      <p style="text-indent: 2em;" class="text">
        目标和关键结果一旦制定，不能修改，只可修改各关键结果的信心指数。第二、三象限的任务列表，可进行增删操作，可标记完成情况。第四象限的状态指标，可进行增删，可修改状态指标的颜色值。</p>
      <p style="text-indent: 2em;" class="text">
        OKR计划结束之后，用户需要根据各个关键结果的完成情况进行总结。
      </p>
      <p class="contentTitle">个人OKR的两种模式</p>
      <p style="text-indent: 2em;" class="text">1. 个人模式</p>
      <p style="text-indent: 2em;" class="text">2. 团队模式</p>
      <p style="text-indent: 2em;" class="text">
        考虑到在团队中，用户为了达成团队的大目标，也需要根据团队的大目标去制定个人的小目标，所以我们在个人OKR中分了个人模式与团队模式。“个人OKR”中的团队模式和后面要展示的“团队OKR”页面不同，团队OKR是整个团队的OKR，而“个人OKR”中的团队模式指的是团队之中个人的OKR。
      </p>
      <p style="text-indent: 2em;" class="text">举个例子：</p>
      <p style="text-indent: 2em;" class="text">我作为一个学生，为了达成学业目标，我可以在个人模式下制定一个OKR计划。</p>
      <p style="text-indent: 2em;" class="text">我作为一个互联网+大学生创新创业大赛团队的成员，为了团队取得荣誉，我可以在团队模式下制定一个关于该团队的OKR计划。</p>
      <p style="text-indent: 2em;" class="text">两种模式相互独立，互不影响。</p>
      <p class="contentTitle">团队OKR</p>
      <p style="text-indent: 2em;" class="text">该页面会以树状图的形式展示整个团队的OKR，以互联网公司为例，可创建如下的树状图。</p>
      <p class="tips">点击图片可查看大图</p>
      <img style="width: 100%;" src="http://139.159.210.77:1701/media/static/树状图示例.png" alt=""
        @click.stop="previewImage(3)">
      <p class="contentTitle">树状图创建流程：</p>
      <p style="text-indent: 2em;" class="text">发起者创建团队OKR -> 生成邀请码，邀请部门负责人加入，创建“节点” -> 各部门负责人根据团队OKR创建本部门OKR ->
        部门负责人邀请本部门成员加入OKR计划 -> 生成团队OKR树状图。</p>
      <p class="contentTitle">其他细节：</p>
      <p style="text-indent: 2em;" class="text">个人可以通过邀请码加入团队。</p>
      <p style="text-indent: 2em;" class="text">
        团队OKR以树状图的方式呈现，团队的创建者作为树的根节点。</p>
      <p style="text-indent: 2em;" class="text">只有节点的管理员才能对节点进行增加操作，而且新增的节点只能成为该管理员所管理节点的子节点。</p>
      <p style="text-indent: 2em;" class="text">不能进行跨层级授权，也不能重复给同一个成员授权。</p>
      <p style="text-indent: 2em;" class="text">只有节点管理员可修改该部门节点的OKR内容。</p>
      <p style="text-indent: 2em;" class="text">点击节点后可以展现该节点OKR象限的内容，所有成员都可以看见每个节点的OKR的内容。</p>
    </div>
  </uni-popup>

  <uni-popup ref="whatIf" type="center" :is-mask-click=false>
    <div class="card whatCard" @click="handleClose(6)">
      <h1 class="answerTitle">什么是OKR？</h1>
      <p class="tips">点击卡片任意位置可关闭 上下划动查看完整答案</p>
      <p style="text-indent: 2em;" class="text">
        OKR即目标与关键成果法，是一套明确和跟踪目标及其完成情况的管理工具和方法，由英特尔公司发明，OKR发展到现在，已经成为一种标准化的目标管理方法。O是Objectives，指目标，KR是Key
        Results，指关键结果。目标用来明确方向，关键结果则用来量化目标，使团队和个人聚焦在一个有挑战性的目标上。目标设定的是一段时间的目标，通常为一个季度；关键结果用来判定到期时目标是否达成。
      </p>
      <p style="text-indent: 2em;" class="text">
        OKR是个非常通用的工具，适用于组织中的任何人、任何角色，甚至适用于私人生活。OKR已经取得了大量的成功，很多团队和组织都通过学习OKR课程来提高执行能力。OKR设定目标的方法已经被广泛应用于谷歌、Zynga、General
        Assembly等公司，近来更呈星火燎原之势延伸至整个硅谷，大多数实施OKR的公司都能实现高速增长。</p>
    </div>
  </uni-popup>

  <!-- <div class="textBox">
    <view class="title">你将获得</view>
    <view class="flexBox">
      <img class="png" src="http://139.159.210.77:1701/media/static/灯泡.png" alt="">
      <span>明确OKR工作法的实施流程</span>
    </view>
    <view class="flexBox">
      <img class="png" src="http://139.159.210.77:1701/media/static/灯泡.png" alt="">
      <span>学会激发团队潜能，协助团队达成目标</span>
    </view>
    <view class="flexBox">
      <img class="png" src="http://139.159.210.77:1701/media/static/灯泡.png" alt="">
      <span>掌握促进个人完成工作和学习目标的方法</span>
    </view>
  </div> -->

  <image class="youCanGet" src="../static/首页你将获得1.png" alt="" mode="widthFix"></image>

  <p class="squazeTips">划动屏幕可控制立方体旋转 点击对应的面可查看答案</p>
  <div class="squaze" v-show="squazeShow">
    <div class="my-box" :class="{ 'my-animation': isAnimating, '.no-animation': isNoAnimation }"
      @touchstart="handleTouchStart" @touchmove="handleTouchMove" @touchend="handleTouchEnd"
      :style="{ transform: `rotateX(${dx}deg) rotateY(${dy}deg` }">
      <div class="box box-1" @click="team">OKR案例</div>
      <div class="box box-2" @click="why">为什么要使用OKR</div>
      <div class="box box-3" @click="how">避开OKR常见的坑</div>
      <div class="box box-4" @click="okrErrors">OKR怎么用</div>
      <div class="box box-5" @click="personalOkr">小程序使用指南</div>
      <div class="box box-6" @click="what">什么是OKR</div>
    </div>
  </div>
</template>

<style>
.title {
  font-size: 6vw;
  font-weight: bold;
  margin-bottom: 1vw;
}

.png {
  width: 7vw;
  height: 7vw;
  vertical-align: middle;
}

.textBox {
  width: 85vw;
  padding: 10px;
  margin: 3vw auto;
  border-radius: 5px;
  box-shadow: 3px 3px 15px #535353;
  color: white;
  text-shadow: 2px 2px 3px #000000;
  background: rgba(63, 194, 237, 0.5) url(http://139.159.210.77:1701/media/static/靶子.png) no-repeat center;
}


.flexBox {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.squaze {
  width: 100vw;
  height: 100vw;
  padding: 0;
  position: relative;
  cursor: pointer;
}

.my-box {
  width: 50vw;
  height: 50vw;
  position: absolute;
  top: calc(50% - 25vw);
  left: calc(50% - 25vw);
  /*3D旋转*/
  transform-style: preserve-3d;
  transform-origin: 50% 50% 100px;
  Animation: myrotate 15s ease-in-out infinite;
  user-select: none;
  cursor: move;
}

.my-animation {
  animation-play-state: paused;
}

.no-animation {
  animation: none;
}

.my-box::after {
  position: relative;
}

.box {
  width: 100%;
  height: 100%;
  position: absolute;
  font-size: 5vw;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
}

.color {
  opacity: 1;
}

.box-1 {
  top: 0;
  left: 0;
  /* background-color: rgba(234, 252, 71, 0.9); */
  background-color: rgb(202, 130, 248, 0.9);
  box-shadow: 0 0 50px 5px rgb(229, 255, 0, 0.5);
  /* box-shadow: 0 0 50px 5px #80d6ff; */
  transform: rotateY(180deg);
}

.box-2 {
  top: 0;
  left: -100%;
  /* background-color: rgb(1, 255, 221, 0.9); */
  background-color: rgb(237, 247, 152, 0.9);
  box-shadow: 0 0 50px 5px rgb(1, 255, 221, 0.5);
  /* box-shadow: 0 0 50px 5px #edf798; */
  transform-origin: left;
  transform: rotateY(-90deg) translateZ(-50vw);

}

.box-3 {
  top: 100%;
  left: 0;
  /* background-color: rgba(203, 73, 255, 0.9); */
  background-color: rgb(250, 181, 122, 0.9);
  box-shadow: 0 0 50px 5px rgb(183, 0, 255, 0.5);
  /* box-shadow: 0 0 50px 5px #fab57a; */
  transform-origin: top;
  transform: rotateX(-90deg) translateY(-50vw);

}

.box-4 {
  top: 0;
  left: 100%;
  /* background-color: rgba(57, 76, 246, 0.9); */
  background-color: rgba(243, 116, 116, 0.9);
  box-shadow: 0 0 50px 5px rgb(0, 26, 255, 0.5);
  /* box-shadow: 0 0 50px 5px #f06868; */
  transform-origin: right;
  transform: rotateY(90deg) translateZ(-50vw);
}

.box-5 {
  top: -100%;
  left: 0;
  /* background-color: rgba(250, 135, 89, 0.9); */
  background-color: rgb(163, 222, 131, 0.9);
  box-shadow: 0 0 50px 5px rgb(255, 72, 0, 0.5);
  /* box-shadow: 0 0 50px 5px #a3de83; */
  transform-origin: bottom;
  transform: rotateX(90deg) translateY(50vw);
}

.box-6 {
  top: 0;
  left: 0;
  /* background-color: rgba(1, 255, 192, 0.9); */
  background-color: rgb(128, 214, 255, 0.9);
  box-shadow: 0 0 100px 10px rgb(229, 255, 0, 0.5);
  /* box-shadow: 0 0 50px 5px #ca82f8; */
  transform: translateZ(50vw);
}


@keyframes myrotate {
  0% {
    transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
  }

  100% {
    transform: rotateX(-360deg) rotateY(-360deg) rotateZ(-360deg);
  }
}

.squazeTips {
  font-size: 26rpx;
  color: #999;
  margin: 0 0 0 10px;
}

.card {
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
  padding: 15px;
  color: white;
  text-shadow: 2px 2px 4px #000000;
  overflow-y: auto;
}

.answerTitle {
  font-size: 20px;
  margin: 10px 0;
  text-shadow: 2px 2px 4px #000000;
}

.tips {
  font-size: 26rpx;
  color: #fff;
  margin: 15px 0;
}

.teamCard {
  background-image: linear-gradient(200deg, #78f, #f78);
}

.whyCard {
  background-image: linear-gradient(200deg, #f7797d, #fbd786);
}

.howCard {
  background-image: linear-gradient(200deg, #a770ef, #cf8bf3, #fdb99b);
}

.errorsCard {
  background-image: linear-gradient(200deg, #7f7fd5, #86a8e7, #91eae4);
}

.personalCard {
  background-image: linear-gradient(200deg, #00c9ff, #92fe9d);
}

.whatCard {
  background-image: linear-gradient(200deg, #c471ed, #12c2e9);
}

.contentTitle {
  font-size: 18px;
  margin: 10px 0;
  text-shadow: 2px 2px 4px #000000;
}

.text {
  line-height: 1.5em;
}

.youCanGet{
  width: 100vw;
}
</style>