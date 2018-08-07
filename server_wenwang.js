/**
 * Created by yangyang.xu on 2017/11/22.
 */
var http = require('http');
var https = require('https');
var url = require('url');
var express = require('express');
var app = express();
var io = require('socket.io');
// Cheerio 是一个Node.js的库， 它可以从html的片断中构建DOM结构，然后提供像jquery一样的css选择器查询
var cheerio = require('cheerio');
var iconv = require('iconv-lite');
var fs = require('fs');
var htmlData = [];
var htmlDataLength = 0;
var count = 0;
var shu = 0;
var resultText = [];

// 定义网络爬虫的目标地址：自如友家的主页
var url = `https://wenwang.supfree.net/libai.asp?type=11&shu=${shu}`;

https.get(url, function(res) {
  var html = '';
  // 获取页面数据
  res.on('data', function(data) {
    html += data;
    htmlData.push(data);
    htmlDataLength += data.length;
    count ++;
  });
  // 数据获取结束
  res.on('end', function() {
    // 通过过滤页面信息获取实际需求的轮播图信息
    // filterSlideList(html);
    callback(htmlData, url);
    // 打印信息
  });
}).on('error', function() {
  console.log('获取数据出错！');
});

function callback(htmlData, url){
  var bufferHtmlData = Buffer.concat(htmlData,htmlDataLength);
  var charset = '';
  var decodeHtmlData;
  var htmlHeadTitle = '';
  var htmlHeadCharset = '';
  var htmlHeadContent = '';
  var index = 0;

  var $ = cheerio.load(bufferHtmlData, {decodeEntities: false});

  $('meta','head').each(function(i, e) {

    htmlHeadCharset = $(e).attr('charset');
    htmlHeadContent = $(e).attr('content');

    if(typeof(htmlHeadCharset) != 'undefined'){

      charset = htmlHeadCharset;
    }

    if(typeof(htmlHeadContent) != 'undefined'){

      if(htmlHeadContent.match(/charset=/ig)){

        index = htmlHeadContent.indexOf('=');
        charset = htmlHeadContent.substring(index+1);
      }
    }
  });

  //此处为什么需要对整个网页进行转吗，是因为cheerio这个组件不能够返回buffer,iconv则无法转换之
  if(charset.match(/gb/ig)){

    decodeHtmlData = iconv.decode(bufferHtmlData,'gbk');
  }
  else{//因为有可能返回的网页中不存在charset字段，因此默认都是按照utf8进行处理

    decodeHtmlData = iconv.decode(bufferHtmlData,'utf8');
  }

  var $ = cheerio.load(decodeHtmlData, {decodeEntities: false});

  var targetDOM = $('.bblue');
  // console.log(url);
  // console.log(targetDOM['0'].children[0].data);
  resultText.push(targetDOM['0'].children[0].data);
  htmlData = [];
  htmlDataLength = 0;
  count = 0;
  shu++;
  console.log(shu);
  if (shu < 1000) {
    https.get(`https://wenwang.supfree.net/libai.asp?type=11&shu=${shu}`, function(res) {
      var html = '';
      // 获取页面数据
      res.on('data', function(data) {
        htmlData.push(data);
        htmlDataLength += data.length;
        count ++;
      });
      // 数据获取结束
      res.on('end', function() {
        // 通过过滤页面信息获取实际需求的轮播图信息
        // filterSlideList(html);
        callback(htmlData, `https://wenwang.supfree.net/libai.asp?type=11&shu=${shu}`);
        // 打印信息
      });
    }).on('error', function() {
      console.log('获取数据出错！');
    });
  } else {
    console.log('hhhh');
    // 将数据写入文件
    var data = {
      '晴雨': {
        type: 11,
        result_text: resultText
      }
    };
    var str = JSON.stringify(data, null, 4);//因为nodejs的写入文件只认识字符串或者二进制数，所以把json对象转换成字符串重新写入json文件中
    fs.writeFile('./wenwang11.json',str,function(err){
      if(err){
        console.error(err);
      }
      console.log('----------数据写入成功-------------');
    })
  }
}

var server = app.listen(8877, function () {
  console.log('端口号为8877的服务开启中……');
})

// http.createServer(function (request, response) {
//   var pathname = url.parse(request.url).pathname;
//   console.log("Request for " + pathname + " received.");
//   // 发送 HTTP 头部
//   // HTTP 状态值: 200 : OK
//   // 内容类型: text/plain
//   response.writeHead(200, {'Content-Type': 'text/plain'});
//
//   // 发送响应数据 "Hello World"
//   response.end('Hello World\n');
//
// }).listen(8888);
//
// console.log('server running at http://127.0.0.1:8888/');