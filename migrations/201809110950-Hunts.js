const seeds = require('../seeds/Hunts');
const Promise = require('bluebird');
const upsert = require('../utils/upsert');
module.exports = {
    up: function(knex){
        return knex.schema.createTable('Hunts',function(table){
            table.increments();
            table.string('address').notNullable();
            table.string('description');
            table.decimal('longitude',12,8);
            table.decimal('latitude',12,8);
            table.integer('Account_id').unsigned().notNullable().references('id').inTable('Account');
            table.datetime('start_date');
            table.datetime('end_date');
            table.boolean('active').nullable().default(1);
            table.binary('photo_one').nullable();
            table.timestamps(true,true);
        })
            .then(()=>{
                return Promise.mapSeries(seeds,s=>{
                   return upsert(knex,'Hunts',s);
                });
            });
    },
    down:function(knex){
        return knex.schema.dropTable('Hunts');
    }
};
