"use strict";

/**
 * Created by yangyang.xu on 2017/12/1.
 */
myLib.remAdjust(20, 360);
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
    transformNum: 0
  },
  mounted: function mounted() {
    this.oPointer = document.getElementsByTagName("img")[0];
    this.oTurntable = document.getElementsByTagName("img")[1];
  },
  methods: {
    startGetReward: function startGetReward() {
      var _this = this;

      if (this.offOn) {
        this.addTransition = false;
        Vue.nextTick(function () {
          _this.offOn = !_this.offOn;
          _this.ratating();
        });
      }
    },
    ratating: function ratating() {
      var _this2 = this;

      while (Math.floor(this.rdm / 360) < 2) {
        this.rdm = Math.floor(Math.random() * 3600);
      }
      this.rdm = Math.floor(Math.random() * 3600);
      console.log(this.rdm);
      this.transformNum += this.rdm;
      this.addTransition = true;
      Vue.nextTick(function () {
        _this2.oTurntable.style.transform = "rotate(" + _this2.transformNum + "deg)";
        setTimeout(function () {
          _this2.offOn = !_this2.offOn;
          _this2.num = _this2.transformNum % 360;
          if (_this2.num <= _this2.cat * 1) {
            alert("4999元");
          } else if (_this2.num <= _this2.cat * 2) {
            alert("50元");
          } else if (_this2.num <= _this2.cat * 3) {
            alert("10元");
          } else if (_this2.num <= _this2.cat * 4) {
            alert("5元");
          } else if (_this2.num <= _this2.cat * 5) {
            alert("免息服务");
          } else if (_this2.num <= _this2.cat * 6) {
            alert("提高白条");
          } else if (_this2.num <= _this2.cat * 7) {
            alert("未中奖");
          }
        }, 4000);
      });
    }
  }
});