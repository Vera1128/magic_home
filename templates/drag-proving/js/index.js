'use strict';

/**
 * Created by yangyang.xu on 2017/12/1.
 */
myLib.remAdjust(20, 360);
var vue = new Vue({
  el: '#content',
  data: {
    //data
    curW: 0,
    isMove: false, //是否在运动
    isDragOk: false, //是否拖动成功
    maxWidth: 0, //拖动的最大宽度
    element: {},
    text: '拖动滑块验证',
    currentPos: {
      x: 0,
      y: 0
    }
  },
  mounted: function mounted() {
    var self = this;
    this.element = document.querySelector('.handler');
    this.getMaxWidth();
    window.addEventListener('resize', function () {
      self.getMaxWidth();
    });
    window.addEventListener('orientationchange', function () {
      self.getMaxWidth();
    });

    this.element.addEventListener('touchstart', self.touchstartFun, false);
    document.querySelector('body').addEventListener('touchmove', self.touchmoveFun, false);
    document.querySelector('body').addEventListener('touchend', self.touchendFun, false);

    this.element.addEventListener('mousedown', self.touchstartFun, false);
    document.querySelector('body').addEventListener('mousemove', self.touchmoveFun, false);
    document.querySelector('body').addEventListener('mouseup', self.touchendFun, false);

    (function drawAnimate() {
      if (self.curW <= self.maxWidth) {
        window.requestAnimFrame(drawAnimate, 1000 / 60);
        self.curW = self.currentPos.x;
      } else {
        self.curW = self.currentPos.x = self.maxWidth;
      }
    })();
  },

  methods: {
    touchstartFun: function touchstartFun(e) {
      if (this.isDragOk) {
        e.preventDefault();
        return;
      }
      this.isMove = true;
      this.curW = this.currentPos.x = this.getCurrentPosition(e).x;
    },
    touchmoveFun: function touchmoveFun(e) {
      if (this.isMove && this.curW > 0 && this.curW < this.maxWidth) {
        this.currentPos.x = this.getCurrentPosition(e).x;
      } else if (this.isMove && this.curW >= this.maxWidth) {
        this.curW = this.currentPos.x = this.maxWidth;
        this.isDragOk = true;
        this.text = "验证通过";
      }
    },
    touchendFun: function touchendFun(e) {
      this.isMove = false;
      if (this.curW < this.maxWidth) {
        this.curW = this.currentPos.x = 0;
      }
    },
    getCurrentPosition: function getCurrentPosition(event) {
      var xPos, yPos, rect;
      rect = document.getElementById('drag').getBoundingClientRect();
      //event = event.originalEvent;
      //判断是touch，还是鼠标事件
      if (event.type.indexOf('touch') !== -1) {
        xPos = event.touches[0].clientX - rect.left;
        yPos = event.touches[0].clientY - rect.top;
      }

      //鼠标事件
      else {
          xPos = event.clientX - rect.left;
          yPos = event.clientY - rect.top;
        }
      return {
        x: xPos,
        y: yPos
      };
    },
    getMaxWidth: function getMaxWidth() {
      this.maxWidth = document.querySelector("#drag").clientWidth - document.querySelector(".handler").scrollWidth;
    }
  }
});