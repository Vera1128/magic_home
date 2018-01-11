/**
 * Created by yangyang.xu on 2017/12/1.
 */
myLib.remAdjust(20, 360);
var vue = new Vue({
  el: '#content',
  data: {
    //data
  },
  mounted: function mounted() {
    document.getElementById('content').style.display = 'block';
    Dialer_native.init((params) => {

    });
  },
  methods: {

  }
});