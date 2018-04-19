'use strict';

var URL = 'http://172.104.74.252:6543/';

var vue = new Vue({
  el: '#content',
  data: {
    //data
    addTransition: false,
    oPointer: null,
    oTurntable: null,
    cat: 51.4,
    num: 0,
    offOn: true,
    rdm: 0,
    transformNum: 0,
    left_times: 0,
    name: '',
    showMask: true,
    showHeadTips: false,
    awardsGroup: ['教主带你打台球', '酸奶公仔', 'King叔请你吃蛋糕', '任选一位HR小姐姐吃饭', '笔记本', '谢谢参与', '100个在线抓娃娃币', 'TouchPal充电宝'],
    award: '',
    lotteryId: 0,
    time: 1
  },
  created: function created() {},
  mounted: function mounted() {
    this.oPointer = document.querySelector('.pointer');
  },
  methods: {
    startGetReward: function startGetReward() {
      var _this = this;

      this.name = localStorage.getItem('username');
      if (this.name) {
        // 获取抽奖次数
        this.getLotteryTimes();
        if (this.left_times >= 1) {
          // 开始抽奖
          myLib.ajax({
            type: 'get',
            dataType: 'json',
            url: URL + 'start_lottery?name=' + this.name,
            success: function success(res) {
              if (res.code === 2000) {
                var lottery_id = res.lottery_id;
                console.log(res.lottery_id);
                if (lottery_id <= 1) _this.lotteryId = 0;else if (lottery_id <= 41) _this.lotteryId = 1;else if (lottery_id <= 43) _this.lotteryId = 2;else if (lottery_id <= 55) _this.lotteryId = 3;else if (lottery_id <= 95) _this.lotteryId = 4;else if (lottery_id <= 97) _this.lotteryId = 5;else if (lottery_id <= 99) _this.lotteryId = 7;
                if (_this.offOn) {
                  _this.addTransition = false;
                  _this.oPointer.style.webkitTransform = "rotate(" + 0 + "deg)";
                  _this.oPointer.style.MozTransform = "rotate(" + 0 + "deg)";
                  _this.oPointer.style.msTransform = "rotate(" + 0 + "deg)";
                  _this.oPointer.style.OTransform = "rotate(" + 0 + "deg)";
                  _this.oPointer.style.transform = "rotate(" + 0 + "deg)";
                  Vue.nextTick(function () {
                    _this.offOn = !_this.offOn;
                    _this.ratating();
                  });
                }
                _this.getLotteryTimes();
              } else {
                alert('服务器错误');
              }
            },
            error: function error() {}
          });
        }
      }
    },
    ratating: function ratating() {
      var _this2 = this;

      this.rdm = Math.floor(Math.random() * 4 + 2);
      this.transformNum = this.rdm * 360 + this.lotteryId * 45 + Math.floor(Math.random() * 43 + 1);
      setTimeout(function () {
        _this2.addTransition = true;
        _this2.oPointer.style.transform = "rotate(" + _this2.transformNum + "deg)";
        _this2.oPointer.style.webkitTransform = "rotate(" + _this2.transformNum + "deg)";
        _this2.oPointer.style.MozTransform = "rotate(" + _this2.transformNum + "deg)";
        _this2.oPointer.style.msTransform = "rotate(" + _this2.transformNum + "deg)";
        _this2.oPointer.style.OTransform = "rotate(" + _this2.transformNum + "deg)";
        setTimeout(function () {
          _this2.offOn = !_this2.offOn;
          alert(_this2.awardsGroup[_this2.lotteryId]);
        }, 4000);
      });
    },
    commitName: function commitName() {
      if (!this.name) {
        return;
      }
      localStorage.setItem('username', this.name);
      console.log(localStorage.getItem('username'));
      this.getLotteryTimes();
    },
    getLotteryTimes: function getLotteryTimes() {
      var _this3 = this;

      myLib.ajax({
        type: 'get',
        dataType: 'json',
        url: URL + 'get_lottery_times?name=' + this.name,
        success: function success(res) {
          if (res.code === 2000) {
            _this3.showMask = false;
            _this3.showHeadTips = true;
            _this3.left_times = res.left_times;
          } else {
            alert('服务器错误');
          }
        },
        error: function error() {}
      });
    }
  }
});