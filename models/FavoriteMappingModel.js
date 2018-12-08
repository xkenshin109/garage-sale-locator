"use strict";
module.exports = function(app){
    return app.databases.zergdb.Model.extend({
        tableName: 'FavoriteMapping',
        site: function(){
            return this.belongsTo(app.models['SiteListing'],this.get('SiteListing_id'));
        }
    })
};
