"use strict";
let glob = require('glob');
let path = require('path');
let _ = require('lodash');

module.exports = function(app){
    let ret = {};

    _.forOwn(app.config.database,function(db,name){
        if(process.env.NODE_ENV === 'production' && process.env.INSTANCE_CONNECTION_NAME ){
            db.user = process.env.SQL_USER;
            db.password = process.env.SQL_PASSWORD;
            db.database = process.env.SQL_DATABASE;
            db.socketPath = `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`
        }
        let knex = require('knex')(db);
        let bookshelf = require('bookshelf')(knex);
        ret[name] = bookshelf;
    });
    return ret;
};
