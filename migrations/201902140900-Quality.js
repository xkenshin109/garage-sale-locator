let quality = require('../seeds/Quality');
const Promise = require('bluebird');
const upsert = require('../utils/upsert');
module.exports = {
    up: function(knex){
        return knex.schema.createTable('Quality',function(table){
            table.increments();
            table.string('name');
            table.string('description');
            table.timestamps(true,true);
        })
            .then(()=>{
                return Promise.mapSeries(quality,q=>{
                   return upsert(knex,'Quality',q);
                });
            });
    },
    down:function(knex){
        return knex.schema.dropTable('Quality');
    }
};
