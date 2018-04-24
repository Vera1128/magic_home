/**
 * Created by yangyang.xu on 2018/4/24.
 */
// const URI = 'https://dialer-manager.cootekservice.com';
const URI = 'http://121.52.235.231:41211/';
var vue = new Vue({
  el: '#content',
  data: {
    //data
    state: {
      enableOnScroll: true,
      listFinish: false,
      showBottomLoading: false,
      showQueryGid: true
    },
    whiteListGroup: [
      {
        id: 18,
        owner: 'yangyang3',
        date: '2018-04-24 23:00:00',
        num: 10,
        note: 'hahh这是我的测试数据',
        operation: 1
      },
      {
        id: 19,
        owner: 'yangyang4',
        date: '2018-04-24 23:00:00',
        num: 10,
        note: 'hahh这是我的测试数据',
        operation: 1
      },
      {
        id: 20,
        owner: 'yangyang1',
        date: '2018-04-24 23:00:00',
        num: 10,
        note: 'hahh这是我的测试数据',
        operation: 1
      },
      {
        id: 21,
        owner: 'yangyang2',
        date: '2018-04-24 23:00:00',
        num: 10,
        note: 'hahh这是我的测试数据',
        operation: 1
      },
      {
        id: 22,
        owner: 'yangyang3',
        date: '2018-04-24 23:00:00',
        num: 10,
        note: 'hahh这是我的测试数据',
        operation: 1
      },
      {
        id: 23,
        owner: 'yangyang4',
        date: '2018-04-24 23:00:00',
        num: 10,
        note: 'hahh这是我的测试数据',
        operation: 1
      },
      {
        id: 24,
        owner: 'yangyang1',
        date: '2018-04-24 23:00:00',
        num: 10,
        note: 'hahh这是我的测试数据',
        operation: 1
      },
      {
        id: 25,
        owner: 'yangyang2',
        date: '2018-04-24 23:00:00',
        num: 10,
        note: 'hahh这是我的测试数据',
        operation: 1
      },
      {
        id: 26,
        owner: 'yangyang3',
        date: '2018-04-24 23:00:00',
        num: 10,
        note: 'hahh这是我的测试数据',
        operation: 1
      },
      {
        id: 27,
        owner: 'yangyang4',
        date: '2018-04-24 23:00:00',
        num: 10,
        note: 'hahh这是我的测试数据',
        operation: 1
      }
    ],
    // 0为白名单列表 1为操作纪律列表
    selectListIndex: 0,
    startTime: '',
    endTime: '',
    note: '',
    endCursor: 0,
    phoneStr: ''
  },
  created () {
    myLib.ajax({
      type: 'get',
      dataType: 'json',
      url: URI + `/ad_whitelist_uploader/gid_query?cursor=${this.endCursor}`,
      success: (res) => {

      },
      error: () => {
        console.log('加此log用于测试');
      }
    });
  },
  mounted () {
    document.getElementById('content').style.display = 'block';
    window.onscroll = this.scroll;
  },
  methods: {
//  上拉刷新 分页展示数据
    scroll (e) {
      var distance = document.body.scrollHeight - document.body.offsetHeight - window.scrollY;
      if (distance < 10 && this.state.enableOnScroll && !this.state.listFinish) {
        this.state.enableOnScroll = false;
        this.state.showBottomLoading = true;
        setTimeout(() => {
          this.getNextPage();
        }, 500);
      }
    },
    getNextPage () {
      myLib.ajax({
        type: 'get',
        dataType: 'json',
        url: URI + `/ad_whitelist_uploader/gid_query?cursor=${this.endCursor}`,
        success: (res) => {

        },
        error: () => {
          console.log('加此log用于测试');
        }
      });
      // myLib.ajax({
      //   url: URI + '/fellow_townsman/ops_get_spider_info?_token=' + TOKEN,
      //   type: 'post',
      //   dataType: 'json',
      //   data: JSON.stringify({
      //     obj_user_id: '',
      //     id: '' + videoList[videoList.length - 1].id
      //   }),
      //   success: function success (res) {
      //     if (res.result.video_list.length < 1) {
      //       listFinish = true;
      //       $('#loading-gif').hide();
      //       $('#no-more-text').show();
      //     } else {
      //       var innerHTML = document.querySelector('#video-list').innerHTML;
      //       currentVideoList = res.result.video_list;
      //       currentVideoList.forEach(function (item, index) {
      //         innerHTML += '<tr class="success">' +
      //           '<td class="td-center text-center" style="width: 10%">' + (videoList.length + index + 1) + '</td>' +
      //           '<td class="td-center text-center" style="width: 10%">' + item.platform + '</td>' +
      //           '<td class="td-center text-center" style="width: 20%">' + item.create_time + '</td>' +
      //           '<td class="td-center text-center" style="width: 30%">' + '<img src="' + item.images + '" class="video-image"></td>' +
      //           '<td class="td-center text-center">' + '<button class="btn btn-primary" onclick="previewSpiderVideo(\'' + item.video + '\', \'' + item.id + '\')">查看视频</button></td></tr>';
      //       });
      //       document.querySelector('#video-list').innerHTML = innerHTML;
      //       videoList = videoList.concat(res.result.video_list);
      //       $('.bottom-loading').hide();
      //       $('#loading-gif').hide();
      //       enableOnScroll = true;
      //     }
      //   },
      //   error: function error (res) {}
      // });
    },
    uploadWhiteList () {
      var file = document.getElementById('file').files[0];
      if (!file) {
        alert('请选择文件上传');
      }
      else {
        var formData = new FormData();
        formData.append('file', file);
        formData.append('note', this.note || '无');
        myLib.ajax({
          type: 'post',
          dataType: 'json',
          data: formData,
          cache: false,
          contentType: false,
          processData: false,
          url: URI + '/ad_whitelist_uploader/file_upload',
          success: (res) => {

          },
          error: () => {

          }
        })
      }
    },
    changeQueryType (value) {
      console.log(value);
      if (value == '1') {
        this.state.showQueryGid = false;
      } else {
        this.state.showQueryGid = true;
      }
    },
    goToOperationList () {
      this.selectListIndex = 1;
    },
    backToWhiteList () {
      this.selectListIndex = 0;
    }
  }
});