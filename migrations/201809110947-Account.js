let seeds = require('../seeds/Account');
const Promise = require('bluebird');
const upsert = require('../utils/upsert');
module.exports = {
    up: function(knex){
        return knex.schema.createTable('Account',function(table){
            table.increments();
            table.string('name',100).notNullable();
            table.string('display_name',100).notNullable();
            table.string('password',20).notNullable();
            table.string('email',100).notNullable();
            table.binary('profile_pic').nullable();
            table.timestamps(true,true);
        })
            .then(()=>{
                return Promise.mapSeries(seeds,s=>{
                   return upsert(knex,'Account',s);
                });
            });
    },
    down:function(knex){
        return knex.schema.dropTable('Account');
    }
};
