"use strict";
let glob = require('glob');
let path = require('path');
let _ = require('lodash');

module.exports = function(app){
    let ret = {};

    _.forOwn(app.config.database,function(db,name){
        console.log(process.env.INSTANCE_CONNECTION_NAME);
        if(process.env.NODE_ENV === 'production' && process.env.INSTANCE_CONNECTION_NAME ){
            console.log(process.env.SQL_USER);
            console.log(process.env.SQL_PASSWORD);
            console.log(process.env.SQL_DATABASE);

            db.user = process.env.SQL_USER;
            db.password = process.env.SQL_PASSWORD;
            db.connection.database = process.env.SQL_DATABASE;
            db.connection.socketPath = `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`
        }
        let knex = require('knex')(db);
        let bookshelf = require('bookshelf')(knex);
        ret[name] = bookshelf;
    });
    return ret;
};
