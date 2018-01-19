/**
 * Created by yangyang.xu on 2017/12/1.
 */
myLib.remAdjust(20, 360);

var vue = new Vue({
  el: '#content',
  data: {
    //data
    data_list: [],
    without_data: false,
    disableScroll: false,
    //假设拉取5次的时候数据已被拉取完毕
    index: 0,
    scroll: null
  },
  created: function created() {
  },
  mounted: function mounted() {
    document.getElementById('content').style.display = 'block';
    myLib.ajax({
      type: 'get',
      dataType: 'json',
      url: '/artical_list',
      success: (res) => {
        if (res.result.length) this.data_list = this.data_list.concat(res.result);
        else this.without_data = true;
        //注意放在回调里面
        Vue.nextTick(() => {
          var listWrapper = document.querySelector('.list-wrapper-hook'),
            listContent = document.querySelector('.list-content-hook'),
            alert = document.querySelector('.alert-hook'),
            topTip = document.querySelector('.refresh-hook'),
            bottomTip = document.querySelector('.loading-hook');
          /*
           * 此处可优化,定义一个变量,记录用户滑动的状态,初始值为0,滑动中为1,滑动结束、数据请求成功重置为0
           * 防止用户刷新列表http请求过多
           */
          this.scroll = new window.BScroll(listWrapper, {
            probeType: 3
          });
          // 滑动中
          this.scroll.on('scroll', (position)=>{
            if(position.y > 30) {
              topTip.innerText = '释放立即刷新';
            }
          });
          /*
           * @ touchend:滑动结束的状态
           * @ maxScrollY:屏幕最大滚动高度
           */
          // 滑动结束
          this.scroll.on('touchend', (position)=>{
            if (position.y > 30) {
              setTimeout(()=>{
                /*
                 * 这里发送ajax刷新数据
                 * 刷新后,后台只返回第1页的数据,无论用户是否已经上拉加载了更多
                 */
                // 恢复文本值
                topTip.innerText = '下拉刷新';
                // 刷新成功后的提示
                refreshAlert('刷新成功');
                // 刷新列表后,重新计算滚动区域高度
                this.scroll.refresh();
              }, 1000);
            }else if(position.y < (this.scroll.maxScrollY - 30)) {
              bottomTip.innerText = '加载中...';
                // 向列表添加数据
                setTimeout(()=>{
                  // 恢复文本值
                  bottomTip.innerText = '查看更多';
                  // reloadData();
                  myLib.ajax({
                    type: 'get',
                    dataType: 'json',
                    url: '/artical_list',
                    success: (res) => {
                      // 向列表添加数据
                      if (res.result.length) this.data_list = this.data_list.concat(res.result);
                      //注意放在回调里
                      Vue.nextTick(() => {
                        this.scroll.refresh();
                      })
                    },
                    error: () => {
                    }
                  })
                  // 加载更多后,重新计算滚动区域高度
                }, 1000);
              }
          });
          // 刷新成功提示方法
          function refreshAlert(text) {
            text = text || '操作成功';
            alert.innerHtml = text;
            alert.style.display = 'block';
            setTimeout(function(){
              alert.style.display = 'none';
            },1000);
          }
        })
      },
      error: () => {
      }
    });
  },
  methods: {

  }
});