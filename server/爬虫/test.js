/**
 * Created by yangyang.xu on 2018/8/7.
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
// url参数
// typeValue = ['', '移居', '会事', '谋事', '父母', '房屋', '分家', '疾病', '天花'];
// typeValue = ['', '求财', '借财', '购畜', '开店', '回乡', '放帐', '坟墓', '赌钱'];
// typeValue = ['', '秋收', '寻馆', '求子', '出行', '取鱼', '夜梦', '入赘', '口舌'];
// typeValue = ['', '脱货', '见官', '春蚕', '解粮', '起造', '生意', '文书', '诉讼'];
// typeValue = ['', '升迁', '寻人', '纳监', '和事', '婚姻', '怀孕', '交易', '取妾'];
// typeValue = ['', '田产', '家信', '买官', '告状', '买卖', '求官', '跟官', '讨仆'];
typeValue = ['', '寿命', '家宅', '合伙', '失物', '走失', '行人', '手艺', '解人'];

function pushData() {
  fs.readFile(`./wenwangAll.json`,function(err,data){
    if(err){
      return console.error(err);
    }
    var dataTarget = data.toString();//将二进制的数据转换为字符串
    dataTarget = JSON.parse(dataTarget);//将字符串转换为json对象

    var keys = Object.keys(dataTarget);
    var keysLength = keys.length;
    var flag = false;
    for (var i = 0; i < keysLength; i++) {
      var all = dataTarget[keys[i]];
      for (var j = 0; j < all.length - 1; j++) {
        if (all[j].result_text == all[j + 1].result_text) {
          flag = true;
        }
      }
    }
    console.log(flag);
  })
}
pushData();

var server = app.listen(8878, function () {
  console.log('端口号为8879的服务开启中……');
})
