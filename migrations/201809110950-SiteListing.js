module.exports = {
    up: function(knex){
        return knex.schema.createTable('SiteListing',function(table){
            table.increments();
            table.string('address');
            table.decimal('longitude',12,8);
            table.decimal('latitude',12,8);
            table.integer('Account_id').unsigned().notNullable().references('id').inTable('Account');
            table.datetime('start_datetime');
            table.datetime('end_datetime');
            table.boolean('active').nullable().default(1);
            table.timestamps(true,true);
        });
    },
    down:function(knex){
        return knex.schema.dropTable('SiteListing');
    }
};
