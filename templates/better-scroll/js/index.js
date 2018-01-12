'use strict';

/**
 * Created by yangyang.xu on 2017/12/1.
 */
myLib.remAdjust(20, 360);
var vue = new Vue({
  el: '#content',
  data: {
    //data
    scroll: null
  },
  mounted: function mounted() {
    var _this = this;

    this.$nextTick(function () {
      _this.scroll = new BScroll(_this.$refs.wrapper, {
        click: true,
        scrollbar: true,
        pullDownRefresh: {
          threshold: 90,
          stop: 40
        },
        pullUpLoad: {
          threshold: 0,
          moreTxt: 'Load more',
          noMoreTxt: 'There is no more data'
        },
        startY: 0
      });
    });
  },
  methods: {}
});