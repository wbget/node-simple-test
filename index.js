/**
 * Created by webb on 2017/9/4
 */
'use strict';
//init

const Koa = require('koa');
const router = require('koa-router')();
const fs = require('fs');
const bodyParser = require('koa-bodyparser');
const path = require('path');
const file = require('./utils/file')

const app = new Koa();
global.app = app;// 为了方便易用，把app直接放到全局。

app.config = {};// 初始化配置
file.readDir(path.join(__dirname, 'config'), '.json', function (filePath, fileName) {
    app.config[fileName] = JSON.parse(fs.readFileSync(filePath));
});

app.utils = {};// 初始化工具
file.readDir(path.join(__dirname, 'utils'), '.js', function(filePath, fileName){
    app.utils[fileName] = require(filePath);
});

app.router = router;// 初始化路由
file.readDir(path.join(__dirname, 'controller'), '.js', function(filePath){
    require(filePath)(app);
})

app.use(bodyParser());// 初始化中间件
app.use(router.routes());

app.listen(app.config.default.port);
console.log('client-build start at port: ' + app.config.default.port);