"use strict";
module.exports = function(app){
    return app.databases.hunterDb.Model.extend({
        tableName: 'HuntItem'
    })
};
