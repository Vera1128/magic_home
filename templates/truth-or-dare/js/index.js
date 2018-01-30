'use strict';

/**
 * Created by yangyang.xu on 2017/12/1.
 */
myLib.remAdjust(20, 360);
var vue = new Vue({
  el: '#content',
  data: {
    //data
    state: {
      isPressedBtn: false,
      isLockedBtn: false,
      showAnswerOne: false,
      answerOne: [true, false, false]
    },
    //真心话1的回答的前次选择
    selectPreIndex1: 0,
    //真心话1的回答的本次选择
    selectNowIndex1: 0,
    answerOne: ['可以暧昧的聊天', '可以的啦~', '我不能接受'],
    gameIndex: 0,
    btnText: '准备好啦！开始吧！',
    listAll: [{
      isSelf: false,
      htmlDOM: '<div class="avatar">' + '<img class="head-img" src="img/head-img1.jpeg"/>' + '</div>' + '<div class="text-container">Hi，yangyang你准备好和我玩真心话大冒险了吗？' + '</div>'
    }, {
      isSelf: true,
      htmlDOM: '<div class="text-container">准备好啦，开始吧~' + '</div>' + '<div class="avatar">' + '<img class="head-img" src="img/head-img2.jpeg"/>' + '</div>'
    }, {
      isSelf: false,
      htmlDOM: '<div class="avatar">' + '<img class="head-img" src="img/head-img1.jpeg"/>' + '</div>' + '<div class="text-container">你想要问我什么问题呢？我都可以回答你的哦~' + '</div>'
    }, {
      isSelf: true,
      htmlDOM: '<div class="text-container">喜欢女生矜持些还是活泼些？<br>·矜持些<br>·活泼些<br>·都喜欢<br>' + '</div>' + '<div class="avatar">' + '<img class="head-img" src="img/head-img2.jpeg"/>' + '</div>'
    }, {
      isSelf: false,
      htmlDOM: '<div class="avatar">' + '<img class="head-img" src="img/head-img1.jpeg"/>' + '</div>' + '<div class="text-container">活泼些' + '</div>'
    }, {
      isSelf: false,
      htmlDOM: '<div class="avatar">' + '<img class="head-img" src="img/head-img1.jpeg"/>' + '</div>' + '<div class="text-container">你能接受暧昧的关系么？' + '</div>'
    }, {
      isSelf: false,
      htmlDOM: '<div class="avatar">' + '<img class="head-img" src="img/head-img1.jpeg"/>' + '</div>' + '<div class="text-container">嘿嘿' + '</div>'
    }, {
      isSelf: false,
      htmlDOM: '<div class="avatar">' + '<img class="head-img" src="img/head-img1.jpeg"/>' + '</div>' + '<div class="text-container">我先扔咯' + '</div>'
    }, {
      isSelf: false,
      htmlDOM: '<div class="avatar">' + '<img class="head-img" src="img/head-img1.jpeg"/>' + '</div>' + '<img src="img/6.gif"/> '
    }],
    list: [{
      isSelf: false,
      htmlDOM: '<div class="avatar">' + '<img class="head-img" src="img/head-img1.jpeg"/>' + '</div>' + '<div class="text-container">Hi，yangyang你准备好和我玩真心话大冒险了吗？' + '</div>'
    }]
  },
  mounted: function mounted() {
    document.getElementById('content').style.display = 'block';
  },
  methods: {
    clickBtn: function clickBtn() {
      var _this = this;

      if (this.state.isLockedBtn) return;
      this.state.isLockedBtn = true;
      if (this.gameIndex == 0) {
        this.list.push(this.listAll[1]);
        this.btnText = '对方正在输入……';
        this.timer1 = setTimeout(function () {
          _this.state.isLockedBtn = false;
          _this.list.push(_this.listAll[2]);
          Vue.nextTick(function () {
            document.getElementsByClassName('chat-list')[0].scrollTop = 1000;
          });
          _this.btnText = '随机提问';
          // 进入提问1阶段
          _this.gameIndex = 1;
        }, 2000);
      } else if (this.gameIndex == 1) {
        this.list.push(this.listAll[3]);
        Vue.nextTick(function () {
          document.getElementsByClassName('chat-list')[0].scrollTop = 1000;
        });
        this.btnText = '对方正在输入……';
        this.timer2 = setTimeout(function () {
          _this.list.push(_this.listAll[4]);
          Vue.nextTick(function () {
            document.getElementsByClassName('chat-list')[0].scrollTop = 1000;
          });
          _this.btnText = '正在等待对方向你提问';
          _this.timer3 = setTimeout(function () {
            // 进入提问2阶段
            _this.gameIndex = 2;
            _this.state.isLockedBtn = false;
            _this.list.push(_this.listAll[5]);
            Vue.nextTick(function () {
              document.getElementsByClassName('chat-list')[0].scrollTop = 1000;
            });
            _this.btnText = '发送真心话';
            _this.state.showAnswerOne = true;
          }, 2000);
        }, 2000);
      } else if (this.gameIndex == 2) {
        var htmlDOM = '<div class="text-container">' + this.answerOne[this.selectNowIndex1] + '</div>' + '<div class="avatar">' + '<img class="head-img" src="img/head-img2.jpeg"/>' + '</div>';
        this.list.push({
          isSelf: true,
          htmlDOM: htmlDOM
        });
        this.state.showAnswerOne = false;
        Vue.nextTick(function () {
          document.getElementsByClassName('chat-list')[0].scrollTop = 1000;
        });
        this.btnText = '对方正在输入……';
        this.timer4 = setTimeout(function () {
          _this.list.push(_this.listAll[6]);
          Vue.nextTick(function () {
            document.getElementsByClassName('chat-list')[0].scrollTop = 1000;
          });
          _this.btnText = '进入玩骰子大冒险游戏环节';
          _this.list.push(_this.listAll[7]);
          _this.timer5 = setTimeout(function () {
            _this.list.push(_this.listAll[8]);
            Vue.nextTick(function () {
              document.getElementsByClassName('chat-list')[0].scrollTop = 10000;
            });
          }, 2000);
        }, 1000);
      }
    },
    answerSelect: function answerSelect(quizIndex, answerIndex) {
      if (quizIndex == 1) {
        if (answerIndex != this.selectPreIndex1) {
          Vue.set(this.state.answerOne, answerIndex, true);
          Vue.set(this.state.answerOne, this.selectPreIndex1, false);
          this.selectPreIndex1 = answerIndex;
          this.selectNowIndex1 = answerIndex;
        }
      }
    },
    touchStart: function touchStart() {
      if (this.state.isLockedBtn) return;
      this.state.isPressedBtn = true;
    },
    touchEnd: function touchEnd() {
      if (this.state.isLockedBtn) return;
      this.state.isPressedBtn = false;
    }
  }
});