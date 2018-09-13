'use strict';

/**
 * Created by yangyang.xu on 2018/4/24.
 */
var URI = 'http://121.52.235.231:41211';
var vue = new Vue({
  el: '#content',
  data: {
    //data
    state: {
      enableOnScroll: true,
      listFinish: false,
      showBottomLoading: false,
      showQueryGid: true,
      showMask: false
    },
    whiteListGroup: [],
    // 0为白名单列表 1为操作纪律列表
    selectListIndex: 0,
    startTime: '',
    endTime: '',
    note: '',
    endCursor: 0,
    queryGid: '',
    phoneStr: '',
    operationQuery: [],
    changeInfoGid: 0
  },
  created: function created() {
    this.init();
  },
  mounted: function mounted() {
    window.onscroll = this.scroll;
  },

  methods: {
    init: function init() {
      var _this = this;

      $.ajax({
        type: 'get',
        dataType: 'json',
        url: URI + ('/ad_whitelist_uploader/gid_query?cursor=' + this.endCursor),
        success: function success(res) {
          _this.endCursor = res.end_cursor;
          var gid_info = res.gid_info;
          gid_info.forEach(function (item, index) {
            var obj = {};
            var key = Object.keys(item)[0];
            obj.gid = key;
            obj.last_operator = item[key].last_operator;
            obj.create_time = item[key].create_time;
            obj.last_operatored_time = item[key].last_operatored_time;
            obj.count = item[key].count;
            obj.note = item[key].note;
            obj.gid_status = item[key].gid_status;
            _this.whiteListGroup.push(obj);
          });
          document.getElementById('content').style.display = 'block';
        },
        error: function error() {
          console.log('加此log用于测试');
        }
      });
    },

    //  上拉刷新 分页展示数据
    scroll: function scroll(e) {
      var _this2 = this;

      var distance = document.body.scrollHeight - document.body.offsetHeight - window.scrollY;
      if (distance < 10 && this.state.enableOnScroll && !this.state.listFinish) {
        this.state.enableOnScroll = false;
        this.state.showBottomLoading = true;
        setTimeout(function () {
          _this2.getNextPage();
        }, 500);
      }
    },
    getNextPage: function getNextPage() {
      var _this3 = this;

      $.ajax({
        type: 'get',
        dataType: 'json',
        url: URI + ('/ad_whitelist_uploader/gid_query?cursor=' + this.endCursor),
        success: function success(res) {
          console.log(JSON.stringify(res));
          _this3.endCursor = res.end_cursor;
          if (res.gid_info.length < 1) {
            _this3.state.listFinish = true;
          } else {
            var gid_info = res.gid_info;
            gid_info.forEach(function (item, index) {
              var obj = {};
              var key = Object.keys(item)[0];
              obj.gid = key;
              obj.last_operator = item[key].last_operator;
              obj.create_time = item[key].create_time;
              obj.last_operatored_time = item[key].last_operatored_time;
              obj.count = item[key].count;
              obj.note = item[key].note;
              obj.gid_status = item[key].gid_status;
              _this3.whiteListGroup.push(obj);
            });
            _this3.state.enableOnScroll = true;
            _this3.state.showBottomLoading = false;
          }
        },
        error: function error() {
          console.log('加此log用于测试');
        }
      });
    },
    uploadWhiteList: function uploadWhiteList() {
      var file = document.getElementById('file').files[0];
      console.log(file);
      if (!file) {
        alert('请选择文件上传');
      } else {
        var formData = new FormData();
        formData.append('file', file);
        formData.append('note', this.note || '无');
        $.ajax({
          type: 'post',
          dataType: 'json',
          data: formData,
          cache: false,
          contentType: false,
          processData: false,
          url: URI + '/ad_whitelist_uploader/file_upload',
          success: function success(res) {
            if (res.gid == 0) {
              alert('上传的文件内无合法号码');
              return;
            }
            alert('\u6DFB\u52A0\u6210\u529F\uFF0Cgid\u4E3A' + res.gid);
            location.reload();
          },
          error: function error() {}
        });
      }
    },
    changeQueryType: function changeQueryType(value) {
      console.log(value);
      if (value == '1') {
        this.state.showQueryGid = false;
      } else {
        this.state.showQueryGid = true;
      }
    },
    goToOperationList: function goToOperationList() {
      this.selectListIndex = 1;
      window.onscroll = null;
    },
    backToWhiteList: function backToWhiteList() {
      this.selectListIndex = 0;
      window.onscroll = this.scroll;
    },
    closeMask: function closeMask() {
      this.state.showMask = false;
    },
    openMask: function openMask(gid) {
      this.state.showMask = true;
      this.changeInfoGid = gid;
    },
    queryOperationList: function queryOperationList(flag) {
      var _this4 = this;

      if (flag == '2') {
        if (!this.startTime || !this.endTime) {
          alert('请填写完整的开始时间/结束时间!');
          return;
        }
        this.operationQuery = [];
        $.ajax({
          url: URI + '/ad_whitelist_uploader/operation_query',
          type: 'post',
          data: JSON.stringify({
            query_type: 2,
            begin_time: this.startTime,
            end_time: this.endTime
          }),
          dataType: 'json',
          success: function success(res) {
            console.log(JSON.stringify(res));
            res.forEach(function (item, index) {
              var obj = {};
              var key = Object.keys(item)[0];
              obj.gid = key;
              obj.operator = item[key].operator;
              obj.operated_time = item[key].create_time;
              switch (item[key].operated_status) {
                case 0:
                  obj.operation = '创建';
                  break;
                case 1:
                  obj.operation = '失效';
                  break;
                case 2:
                  obj.operation = '生效';
                  break;
                default:
                  obj.operation = '追加';
              }
              _this4.operationQuery.push(obj);
            });
          }
        });
      } else {
        if (!this.queryGid) {
          alert('请输入gid');
          return;
        }
        this.operationQuery = [];
        $.ajax({
          url: URI + '/ad_whitelist_uploader/operation_query',
          type: 'post',
          data: JSON.stringify({
            query_type: 1,
            gid: this.queryGid
          }),
          dataType: 'json',
          success: function success(res) {
            console.log(JSON.stringify(res));
            res.forEach(function (item, index) {
              var obj = {};
              var key = Object.keys(item)[0];
              obj.gid = key;
              obj.operator = item[key].operator;
              obj.operated_time = item[key].create_time;
              switch (item[key].operated_status) {
                case 0:
                  obj.operation = '创建';
                  break;
                case 1:
                  obj.operation = '失效';
                  break;
                case 2:
                  obj.operation = '生效';
                  break;
                default:
                  obj.operation = '追加';
              }
              _this4.operationQuery.push(obj);
              console.log(_this4.operationQuery);
            });
          }
        });
      }
    },
    changeGidInfo: function changeGidInfo(flag, gid) {
      var _this5 = this;

      if (flag != '3') {
        if (flag == '1' && confirm('是否确认使该gid失效') || flag == '2' && confirm('是否确认使该gid还原')) {
          $.ajax({
            url: URI + '/ad_whitelist_uploader/change_gid_info',
            type: 'post',
            data: JSON.stringify({
              change_type: flag,
              gid: gid
            }),
            dataType: 'json',
            success: function success(res) {
              console.log(res);
            }
          });
        }
      } else {
        if (!this.phoneStr) {
          alert('请填写需要追加的手机号');
          return;
        }
        $.ajax({
          url: URI + '/ad_whitelist_uploader/change_gid_info',
          type: 'post',
          data: JSON.stringify({
            change_type: 3,
            gid: this.changeInfoGid,
            phones_str: this.phoneStr
          }),
          dataType: 'json',
          success: function success(res) {
            console.log(res);
            if (res.error_code == 2000) {
              alert('追加成功');
            } else {
              alert('追加失败 请稍后再试');
            }
            _this5.closeMask();
            location.reload();
          },
          error: function error() {}
        });
      }
    },

    // operation_query接口数据格式化
    queryResult: function queryResult() {
      // hard code
      var data = {
        '1': {
          'operator': 'yang',
          'operated_time': '2018-05-20',
          'operated_status': 0
        },
        '2': {
          'operator': '1',
          'operated_time': '2018-05-20',
          'operated_status': 1
        },
        '3': {
          'operator': '2',
          'operated_time': '2018-05-20',
          'operated_status': 2
        },
        '4': {
          'operator': '3',
          'operated_time': '2018-05-20',
          'operated_status': 3
        }
      };
      var keys = Object.keys(data);
      for (var i = 0; i < keys.length; i++) {
        var obj = {};
        obj.gid = keys[i];
        obj.operator = data[keys[i]].operator;
        obj.operated_time = data[keys[i]].operated_time;
        switch (data[keys[i]].operated_status) {
          case 0:
            obj.operation = '创建';
            break;
          case 1:
            obj.operation = '失效';
            break;
          case 2:
            obj.operation = '生效';
            break;
          default:
            obj.operation = '追加';
        }
        this.operationQuery.push(obj);
      }
    },

    // gid_query接口数据格式化
    gidResult: function gidResult() {
      // hard code
      var data = {
        '1': {
          'last_operator': 'yang',
          'last_operated_time': '2018-05-20',
          'gid_status': 0,
          'count': 20,
          'note': 'hhaha这是杨杨的测试数据'
        },
        '2': {
          'last_operator': 'yang1',
          'last_operated_time': '2018-05-20',
          'gid_status': 1,
          'count': 10,
          'note': 'hhaha这是yang1的测试数据'
        },
        '3': {
          'last_operator': 'yang2',
          'last_operated_time': '2018-05-20',
          'gid_status': 1,
          'count': 2,
          'note': 'hhaha这是yang2的测试数据'
        },
        '4': {
          'last_operator': 'yang3',
          'last_operated_time': '2018-05-20',
          'gid_status': 0,
          'count': 100,
          'note': 'hhaha这是yang3的测试数据'
        }
      };
      var keys = Object.keys(data);
      for (var i = 0; i < keys.length; i++) {
        var obj = {};
        obj.gid = keys[i];
        obj.last_operator = data[keys[i]].last_operator;
        obj.last_operated_time = data[keys[i]].last_operated_time;
        obj.count = data[keys[i]].count;
        obj.note = data[keys[i]].note;
        obj.gid_status = data[keys[i]].gid_status;
        this.whiteListGroup.push(obj);
      }
    }
  }
});