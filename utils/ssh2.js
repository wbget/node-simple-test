/**
 * Created by webb on 2017/9/4
 */
'use strict';

const fs = require('fs');

const Client = require('ssh2').Client;

function conn(config) {
    const promise = new Promise(function (resolve, reject) {
        var conn = new Client();
        conn.on('ready', function () {
            resolve(conn);
        }).connect(config);
        conn.on('error', function (err) {
            //失败后调用
            reject(err);
        });
    });
    return promise;
};

function exec(conn, cmd) {
    const promise = new Promise(function (resolve, reject) {
        conn.exec(cmd, function (err, stream) {
            if (err) reject(err);
            stream.on('close', function (code, signal) {
                console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
                conn.end();
                resolve(true);
            }).on('data', function (data) {
                console.log('STDOUT: ' + data);
            }).stderr.on('data', function (data) {
                console.log('STDERR: ' + data);
            });
        });
        }
    );
    return promise;
};

module.exports.test = function (cmd) {
    return conn(app.config.server.test).then(conn => {
        return exec(conn, cmd);
    });
};
module.exports.release = function (cmd) {
    return conn(app.config.server.release).then(conn => {
        return exec(conn, cmd);
    });
};