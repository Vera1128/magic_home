const URL = 'http://172.104.74.252:6543/';

var vue  =  new Vue({
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
  created: function created() {

  },
  mounted: function mounted() {
    this.oPointer = document.querySelector('.pointer');
  },
  methods: {
    startGetReward () {
      this.name = localStorage.getItem('username');
      if (this.name) {
        // 获取抽奖次数
        this.getLotteryTimes();
        if (this.left_times >= 1) {
          // 开始抽奖
          myLib.ajax({
            type: 'get',
            dataType: 'json',
            url: `${URL}start_lottery?name=${this.name}`,
            success: (res) => {
              if (res.code === 2000) {
                var lottery_id = res.lottery_id;
                console.log(res.lottery_id);
                if (lottery_id <= 1) this.lotteryId = 0;
                else if (lottery_id <= 41) this.lotteryId = 1;
                else if (lottery_id <= 43) this.lotteryId = 2;
                else if (lottery_id <= 55) this.lotteryId = 3;
                else if (lottery_id <= 95) this.lotteryId = 4;
                else if (lottery_id <= 97) this.lotteryId = 5;
                else if (lottery_id <= 99) this.lotteryId = 7;
                if(this.offOn){
                  this.addTransition = false;
                  this.oPointer.style.webkitTransform = "rotate(" + 0 + "deg)";
                  this.oPointer.style.MozTransform = "rotate(" + 0 + "deg)";
                  this.oPointer.style.msTransform = "rotate(" + 0 + "deg)";
                  this.oPointer.style.OTransform = "rotate(" + 0 + "deg)";
                  this.oPointer.style.transform = "rotate(" + 0 + "deg)";
                  Vue.nextTick(() => {
                    this.offOn = !this.offOn;
                    this.ratating();
                  })
                }
                this.getLotteryTimes();
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
    },
    ratating () {
      this.rdm = Math.floor(Math.random() * 4 + 2);
      this.transformNum = this.rdm * 360 + this.lotteryId * 45 + Math.floor(Math.random() * 43 + 1);
      setTimeout(() => {
        this.addTransition = true;
        this.oPointer.style.transform = "rotate(" + this.transformNum + "deg)";
        this.oPointer.style.webkitTransform = "rotate(" + this.transformNum + "deg)";
        this.oPointer.style.MozTransform = "rotate(" + this.transformNum + "deg)";
        this.oPointer.style.msTransform = "rotate(" + this.transformNum + "deg)";
        this.oPointer.style.OTransform = "rotate(" + this.transformNum + "deg)";
        setTimeout(() => {
          this.offOn = !this.offOn;
          alert(this.awardsGroup[this.lotteryId]);
        },4000);
      });
    },
    commitName () {
      if (!this.name) {
        return;
      }
      localStorage.setItem('username', this.name);
      console.log(localStorage.getItem('username'));
      this.getLotteryTimes();
    },
    getLotteryTimes () {
      myLib.ajax({
        type: 'get',
        dataType: 'json',
        url: `${URL}get_lottery_times?name=${this.name}`,
        success: (res) => {
          if (res.code === 2000) {
            this.showMask = false;
            this.showHeadTips = true;
            this.left_times = res.left_times;
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