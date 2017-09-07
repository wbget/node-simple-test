/**
 * Created by webb on 2017/9/4
 */
'use strict';
module.exports = async (ctx, next) => {
    ctx.response.type = 'text/html';
    ctx.response.body = app.utils.nunjucks.render('index.html', {
        host: app.config.default.host + ':'+ app.config.default.port
    });
};