"use strict";
module.exports = function(app){
    return app.databases.hunterDb.Model.extend({
        tableName: 'FavoriteMapping',
        hunt: function(){
            return this.belongsTo(app.models['Hunts'],this.get('Hunts_id'));
        }
    })
};
