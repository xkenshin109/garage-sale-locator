"use strict";
module.exports = function(app){
    return app.databases.zergdb.Model.extend({
        tableName: 'ActiveQueue',
        siteListing: function(){
            return this.belongsTo(app.models['SiteListing'],this.get('SiteListing_id'));
        }
    })
};
