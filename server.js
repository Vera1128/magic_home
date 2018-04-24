/**
 * Created by yangyang.xu on 2017/11/22.
 */
var http = require('http');
var url = require('url');
var express = require('express');
var app = express();
var io = require('socket.io');
var mysql = require('mysql');

app.get('/', function (req, res) {
  res.send('Hello World!');
})

app.post('/', function (req, res) {
  console.log('主页 POST 请求');
  res.send('Hello POST');
})

app.get('/del_user', function (req, res) {
  console.log('/del_user 响应 DELETE 请求');
  res.send('删除页面');
})

app.get('/artical_list', function (req, res) {
  console.log('/list_user 响应 GET 请求');
  //允许跨域请求 在前端页面完成也可
  // res.header('Access-Control-Allow-Origin', '*');
  var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'CooTek1128',
    database: 'Yangyang_db'
  })
  var sql = 'SELECT * FROM artical_list_db';
  connection.query(sql, function (err, result) {
    if (err) {
      console.log('------error-------');
      console.log(err.message);
      console.log('------error-------');
      return;
    }
    const testData = result;
    var response = {
      "result": testData
    };
    res.end(JSON.stringify(response));
  });
  connection.end();
})


var server = app.listen(8877, function () {
  console.log('端口号为8877的服务开启中……');
})

//创建一个socket.io实例，传递给服务器
var socket = io.listen(server);

//添加一个连接监听器
socket.on('connection', function (client) {
  var interval = setInterval(function () {
    client.send('This is a message from the server!' + new Date().getTime());
  }, 5000);
  //成功！现在开始监听接收到的消息
  client.on('message', function (event) {
    console.log('Received message from client!', event);
  });
  client.on('disconnect', function () {
    clearInterval(interval);
    console.log('Server has disconnected');
  });
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