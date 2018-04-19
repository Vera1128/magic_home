'use strict';

var URL = 'http://172.104.74.252:6543/';
var vue = new Vue({
  el: '#content',
  data: {
    //data
    name: '',
    lotteryList: [],
    awardsGroup: ['教主带你打台球', '酸奶公仔', 'King叔请你吃蛋糕', '任选一位HR小姐姐吃饭', '笔记本', '谢谢参与', '100个在线抓娃娃币', 'TouchPal充电宝']
  },
  created: function created() {
    var _this = this;

    myLib.ajax({
      type: 'get',
      dataType: 'json',
      url: URL + 'get_lottery_record',
      success: function success(res) {
        if (res.code === 2000) {
          res.records.forEach(function (item, index) {
            var lottery = {};
            lottery.name = item.name;
            var lottery_id = item.lottery_id;
            if (lottery_id <= 1) lottery.lottery = _this.awardsGroup[0];else if (lottery_id <= 41) lottery.lottery = _this.awardsGroup[1];else if (lottery_id <= 43) lottery.lottery = _this.awardsGroup[2];else if (lottery_id <= 55) lottery.lottery = _this.awardsGroup[3];else if (lottery_id <= 95) lottery.lottery = _this.awardsGroup[4];else if (lottery_id <= 97) lottery.lottery = _this.awardsGroup[5];else if (lottery_id <= 99) lottery.lottery = _this.awardsGroup[7];
            _this.lotteryList.push(lottery);
          });
        } else {
          alert('服务器错误');
        }
      },
      error: function error() {}
    });
  },
  mounted: function mounted() {
    document.getElementById('content').style.display = 'block';
  },
  methods: {
    commitName: function commitName() {
      var _this2 = this;

      console.log(this.name);
      myLib.ajax({
        type: 'get',
        dataType: 'json',
        url: URL + 'add_lottery_time?name=' + this.name,
        success: function success(res) {
          if (res.code === 2000) {
            alert('\u5DF2\u6210\u529F\u4E3A' + _this2.name + '\u6DFB\u52A0\u4E86\u4E00\u6B21\u62BD\u5956\u673A\u4F1A\uFF0C\u4ED6\u7684\u603B\u62BD\u5956\u673A\u4F1A\u4E3A' + res.total_times + '\u6B21,\u5269\u4F59\u62BD\u5956\u673A\u4F1A\u4E3A' + res.left_times + '\u6B21');
          } else {
            alert('服务器错误');
          }
        },
        error: function error() {}
      });
    }
  }
});