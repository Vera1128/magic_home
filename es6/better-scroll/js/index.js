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
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.wrapper, {
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
    })
  },
  methods: {

  }
});