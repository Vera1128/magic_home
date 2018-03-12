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
      showLoadingPage: false
    },
    matchSuccess: false,  //匹配成功
    progressWidth: 0,
    //对手的信息
    opponent: {
      'headImg': './images/danni.jpeg',
      'nickname': '丹妮',
      'coinNum': 2000,
      'selected': false
    },
    //我的信息
    self: {
      'headImg': 'images/yangyang.jpeg',
      'nickname': '小娜',
      'coinNum': 1000,
      'selected': true
    }
  },
  mounted: function mounted() {
    document.getElementById('content').style.display = 'block';
    setTimeout(()=>{
      this.progressWidth = '100%';
      setTimeout(() => {
        this.matchSuccess = true;
      }, 500);
    }, 500);
  },
  methods: {

  }
});