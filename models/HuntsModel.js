"use strict";
const moment = require('moment');
module.exports = function(app){
    return app.databases.hunterDb.Model.extend({
        tableName: 'Hunts',
        favorites: function(){
            return this.hasMany(app.models['FavoriteMapping']);
        },
        favorite: function(account_id){
            return app.models['FavoriteMapping']
                .where({SiteListing_id: this.get('id'),Account_id: account_id})
                .fetch()
                .then((val)=>{
                   return val !== null;
                });
        },
        newListing: function(){
            let today = moment();
            if(moment(this.get('start_datetime'))<= today && moment(this.get('end_datetime'))>= today){
                this.putActiveQueue();
            }
            return;
        }
    })
};
