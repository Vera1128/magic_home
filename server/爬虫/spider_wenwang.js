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
var resultGroup = [];
var typeGroupIndex = 0;
var typeGroup = [
  {
    type: 11,
    type_value: '晴雨'
  },
  {
    type: 12,
    type_value: '升学'
  },
  {
    type: 13,
    type_value: '求学'
  },
  {
    type: 14,
    type_value: '取讨'
  },
  {
    type: 15,
    type_value: '招婿'
  },
  {
    type: 16,
    type_value: '命运'
  },
  {
    type: 17,
    type_value: '请医'
  },
  {
    type: 18,
    type_value: '考试'
  }
];
var typeGroupLength = typeGroup.length;

// 定义网络爬虫的目标地址
var url = `https://wenwang.supfree.net/libai.asp?type=${typeGroup[typeGroupIndex].type}&shu=${shu}`;
spiderData(url);
function spiderData(url) {
  htmlData = [];
  htmlDataLength = 0;
  count = 0;
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
      callback(htmlData, url);
    });
  }).on('error', function() {
    console.log('获取数据出错！');
  });
}

function callback(htmlData, url){
  console.log(url);
  var bufferHtmlData = Buffer.concat(htmlData,htmlDataLength);
  var decodeHtmlData = iconv.decode(bufferHtmlData,'gb2312');
  var $ = cheerio.load(decodeHtmlData, {decodeEntities: false});

  var targetDOM1 = $('.bblue');
  var targetDOM2 = $('.botitle16');
  var resultNum = targetDOM2['1'].children[0].data.replace(/[^0-9]/ig,"");
  console.log(resultNum);
  var resultText = targetDOM1['0'].children[0].data;
  console.log(resultText);
  resultGroup.push(
    {
      result_num: resultNum,
      result_text: resultText
    }
  )
  shu++;
  console.log(shu);
  if (shu < 8) {
    url = `https://wenwang.supfree.net/libai.asp?type=${typeGroup[typeGroupIndex].type}&shu=${shu}`;
    spiderData(url);
  } else {
    // 将数据写入文件
    for(var i = 1; i < 125; i++) {
      for (var j = 0; j < 8; j++) {
        resultGroup.push(resultGroup[j]);
      }
    }
    if (typeGroupIndex < 1) {
      var pushData = {
        [type_value]: resultGroup
      }
      var str = JSON.stringify(pushData, null, 4);//因为nodejs的写入文件只认识字符串或者二进制数，所以把json对象转换成字符串重新写入json文件中
      fs.writeFile(`./wenwang100.json`, str, function(err){
        if(err){
          console.error(err);
        }
        console.log('----------新增成功-------------');
        if (typeGroupIndex < typeGroupLength - 1) {
          // 开始下一个type
          resultGroup = [];
          typeGroupIndex++;
          shu = 0;
          url = `https://wenwang.supfree.net/libai.asp?type=${typeGroup[typeGroupIndex].type}&shu=${shu}`;
          spiderData(url);
        }
      })
    } else if (typeGroupIndex < typeGroupLength){
      fs.readFile(`./wenwang100.json`,function(err,data){
        if(err){
          return console.error(err);
        }
        var dataTarget = data.toString();//将二进制的数据转换为字符串
        dataTarget = JSON.parse(dataTarget);//将字符串转换为json对象

        var type_value = typeGroup[typeGroupIndex].type_value;
        dataTarget[type_value] = resultGroup;
        var str = JSON.stringify(dataTarget, null, 4);//因为nodejs的写入文件只认识字符串或者二进制数，所以把json对象转换成字符串重新写入json文件中
        fs.writeFile('./wenwang100.json',str,function(err){
          if(err){
            console.error(err);
          }
          console.log('----------新增成功-------------');
          if (typeGroupIndex < typeGroupLength -1) {
            // 开始下一个type
            resultGroup = [];
            typeGroupIndex++;
            shu = 0;
            url = `https://wenwang.supfree.net/libai.asp?type=${typeGroup[typeGroupIndex].type}&shu=${shu}`;
            spiderData(url);
          }
        })
      })
    }
  }
}

var server = app.listen(8878, function () {
  console.log('端口号为8878的服务开启中……');
})