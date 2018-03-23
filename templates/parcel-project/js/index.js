/**
 * Created by yangyang.xu on 2018/1/15.
 */
import main from './main';
import '../css/index.scss';

main();
myLib.remAdjust(20, 360);
var vue = new Vue({
  el: '#content',
  data: {
    //data
    state: {
      showLoadingPage: true
    },
    matchSuccess: false,  //匹配成功
    turnToWho: 0,  //轮到谁选择 0表示是自己 1表示是对手
    progressWidth: 0,
    showPoker: false,
    countDown: 10,
    countDownTimer: null,
    //对手的信息
    opponent: {
      'headImg': './images/danni.jpeg',
      'nickname': '丹妮',
      'coinNum': 2000,
      'selected': false  //用来标识现在轮到谁猜
    },
    //我的信息
    self: {
      'headImg': 'images/yangyang.jpeg',
      'nickname': '小娜',
      'coinNum': 1000,
      'selected': true
    },
    //每次发的两张牌的信息
    pokerLeftIndex: 0,
    pokerRightIndex: 12,
    pokerGroup: [require('../images/1.png'), require('../images/2.png'), require('../images/3.png'), require('../images/4.png'), require('../images/5.png'), require('../images/6.png'), require('../images/7.png'), require('../images/8.png'), require('../images/9.png'), require('../images/10.png'), require('../images/11.png'), require('../images/12.png'), require('../images/13.png')]
  },
  mounted: function mounted() {
    document.getElementById('content').style.display = 'block';
    // 匹配阶段
    setTimeout(()=>{
      this.progressWidth = '100%';
      setTimeout(() => {
        this.matchSuccess = true;
      }, 500);
    }, 500);
  },
  methods: {
    afterEnterVsScale () {
      setTimeout(() => {
        // 动画结束 匹配成功开始游戏
        this.startPlay();
        this.state.showLoadingPage = false;
      }, 500);
    },
    startPlay () {
      // step1 发牌
      this.showPoker = true;
      this.pokerGroup.left = Math.floor(Math.random() * 13 + 1);
      this.pokerGroup.right = Math.floor(Math.random() * 13 + 1);
      while (this.pokerGroup.right === this.pokerGroup.left) {
        this.pokerGroup.right = Math.floor(Math.random() * 13 + 1);
      }
      setTimeout(() => {
        // step2 确定谁先猜
        this.turnToWho = Math.random() >= 0.5 ? 0 : 1;
        if (this.turnToWho) {
          this.opponent.selected = true;
          this.self.selected = false;
        }
        // step3 启动倒计时
        this.startCountDown();
      }, 500);
    },
    startCountDown () {
      this.countDownTimer = setInterval(() => {
        this.countDown--;
        if (!this.countDown) clearInterval(this.countDownTimer);
      }, 1000);
    },
    selectLarge () {
      if (self.selected) {
        
      }
    },
    selectSmaller () {
      if (self.selected) {

      }
    }
  }
});