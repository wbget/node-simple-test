/**
 * Created by webb on 2017/9/4
 */
'use strict';

const spawn = require('child_process').spawn;


module.exports = function (command, args){
    const promise = new Promise(function(resovle, reject){
        let sh = spawn(command, args);

        sh.stdout.on('data', function (data) {
            console.log('standard output:\n' + data);
        });

        sh.stderr.on('data', function (data) {
            console.log('standard error output:\n' + data);
        });

        sh.on('error', function (error, code) {
            reject(error);
            console.log('child process error ,error:' + code);
        });

        sh.on('exit', function (code, signal) {
            resovle(true);
            console.log('child process eixt ,exit:' + code);
        });
    });
    return promise;
};