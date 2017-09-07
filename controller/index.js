/**
 * Created by webb on 2017/9/5
 */
'use strict';
const index = require('../service/index');

module.exports = app => {
    app.router.get('/', index);
};