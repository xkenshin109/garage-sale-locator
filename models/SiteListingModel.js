"use strict";
const moment = require('moment');
module.exports = function(app){
    return app.databases.zergdb.Model.extend({
        tableName: 'SiteListing',
        newListing: function(){
            let today = moment();
            if(moment(this.get('start_datetime'))<= today && moment(this.get('end_datetime'))>= today){
                this.putActiveQueue();
            }
            return;
        },
        putActiveQueue: function(){
            return app.models['ActiveQueue'].forge({
                SiteListing_id: this.get('id'),
                RemoveTime: moment().format('YYYY-MM-DD HH:mm:ss')
            }).save()
                .then((res)=>{
                    return res;
                });
        }
    })
};
