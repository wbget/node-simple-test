/**
 * Created by webb on 2017/9/5
 */
'use strict';
const fs = require('fs');
const path = require('path');

/**
 * 读取文件目录
 * @param dir 路径
 * @param extname 后缀名
 * @param readFun function{filePath, fileName} 读取方法
 */


module.exports.readDir = function (dir, extname, readFun) {
    const files = fs.readdirSync(dir);
    files.forEach(function (f) {
        if (path.extname(f) !== extname) return;
        let filePath = path.join(dir, f);
        let fileName = path.basename(f, extname);
        try {
            readFun(filePath, fileName);
        } catch (ex) {
            throw ex;
        }
    });
};