"use strict";
module.exports = function(app){
    return app.databases.zergdb.Model.extend({
        tableName: 'Account'
    })
};
