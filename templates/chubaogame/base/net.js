/**
 * Created by yangyang.xu on 2018/3/12.
 * 按需求将网站转换成前后端分离 此js用于将统一的访问前缀抽出 便于统一修改
 * 页面中跳转多使用a标签的href，所以直接用Vue将baseNetService与href绑定
 */
var vue = new Vue({
  el: '#content',
  data: {
    //data
    baseNetService: 'http://localhost:8086/templates/chubaogame',
    test: 'hh'
  },
  created: function created() {
  },
  mounted: function mounted() {
  },
  methods: {
  }
});