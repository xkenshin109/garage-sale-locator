const seeds = require('../seeds/HuntItem');
const Promise = require('bluebird');
const upsert = require('../utils/upsert');
module.exports = {
    up: function(knex){
        return knex.schema.createTable('HuntItem',function(table){
            table.increments();
            table.string('name');
            table.integer('Quality_id').unsigned().notNullable().references('id').inTable('Quality');
            table.integer('Hunts_id').unsigned().notNullable().references('id').inTable('Hunts');
            table.binary('photo_one').nullable();
            table.binary('photo_two').nullable();
            table.decimal('price',20,8).notNullable();
            table.timestamps(true,true);
        })
            .then(()=>{
                return Promise.mapSeries(seeds,s=>{
                   return upsert(knex,'HuntItem',s);
                });
            });
    },
    down:function(knex){
        return knex.schema.dropTable('HuntItem');
    }
};
