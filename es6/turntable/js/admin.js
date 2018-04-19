const URL = 'http://172.104.74.252:6543/';
var vue = new Vue({
  el: '#content',
  data: {
    //data
    name: '',
    lotteryList: [],
    awardsGroup: ['教主带你打台球', '酸奶公仔', 'King叔请你吃蛋糕', '任选一位HR小姐姐吃饭', '笔记本', '谢谢参与', '100个在线抓娃娃币', 'TouchPal充电宝']
  },
  created: function () {
    myLib.ajax({
      type: 'get',
      dataType: 'json',
      url: `${URL}get_lottery_record`,
      success: (res) => {
        if (res.code === 2000) {
          res.records.forEach((item, index) => {
            let lottery = {};
            lottery.name = item.name;
            let lottery_id = item.lottery_id;
            if (lottery_id <= 1) lottery.lottery = this.awardsGroup[0];
            else if (lottery_id <= 41) lottery.lottery = this.awardsGroup[1];
            else if (lottery_id <= 43) lottery.lottery = this.awardsGroup[2];
            else if (lottery_id <= 55) lottery.lottery = this.awardsGroup[3];
            else if (lottery_id <= 95) lottery.lottery = this.awardsGroup[4];
            else if (lottery_id <= 97) lottery.lottery = this.awardsGroup[5];
            else if (lottery_id <= 99) lottery.lottery = this.awardsGroup[7];
            this.lotteryList.push(lottery);
          })
        }
        else {
          alert('服务器错误');
        }
      },
      error: () => {
      }
    });
  },
  mounted: function mounted() {
    document.getElementById('content').style.display = 'block';
  },
  methods: {
    commitName () {
      console.log(this.name);
      myLib.ajax({
        type: 'get',
        dataType: 'json',
        url: `${URL}add_lottery_time?name=${this.name}`,
        success: (res) => {
          if (res.code === 2000) {
            alert(`已成功为${this.name}添加了一次抽奖机会，他的总抽奖机会为${res.total_times}次,剩余抽奖机会为${res.left_times}次`);
          }
          else {
            alert('服务器错误');
          }
        },
        error: () => {
        }
      });
    }
  }
});