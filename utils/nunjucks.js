/**
 * Created by webb on 2017/9/5
 */
'use strict';

const nunjucks = require('nunjucks');
nunjucks.configure('views', {autoescape: true});

module.exports = nunjucks;